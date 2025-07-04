"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

export default function Home() {
  const [waveColor, setWaveColor] = useState("rgba(255, 0, 0, 0.4)");
  const [count, setCount] = useState(0);
  const [isClient, setIsClient] = useState(false); // Hydration safety
  
  // Enhanced refs with better typing
  const pointsRef = useRef<{x: number, y: number}[]>([]);
  const requestRef = useRef<number | null>(null);
  const homeRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastMousePosRef = useRef<{x: number, y: number}>({x: 0, y: 0});
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Ensure we only run client-side code after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Scalable configuration based on viewport
  const getScaledConfig = useCallback(() => {
    if (!isClient || typeof window === 'undefined') {
      return {
        minDistance: 3,
        maxPoints: 8,
        lineWidth: 3,
        glowWidth: 5,
        amplitude: 3,
        pixelRatio: 1
      };
    }
    
    const pixelRatio = window.devicePixelRatio || 1;
    const zoomLevel = window.outerWidth / window.innerWidth;
    const scaleFactor = Math.min(pixelRatio, zoomLevel);
    
    return {
      minDistance: Math.max(2, 3 * scaleFactor),
      maxPoints: Math.max(6, Math.floor(8 * scaleFactor)),
      lineWidth: Math.max(2, 3 * scaleFactor),
      glowWidth: Math.max(3, 5 * scaleFactor),
      amplitude: Math.max(2, 3 * scaleFactor),
      pixelRatio
    };
  }, [isClient]);
  
  // Counter effect - safe for SSR
  useEffect(() => {
    if (!isClient) return;
    
    const repeat = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
    return () => clearInterval(repeat);
  }, [isClient]);
  
  // Color changing effect - safe for SSR
  useEffect(() => {
    if (!isClient) return;
    
    const colors = [
      "rgba(255, 0, 0, 0.4)", // Red
      "rgba(0, 255, 0, 0.4)", // Green
      "rgba(0, 0, 255, 0.4)", // Blue
      "rgba(238, 130, 238, 0.4)", // Violet
    ];
    let colorIndex = 0;
  
    const colorChangeInterval = setInterval(() => {
      colorIndex = (colorIndex + 1) % colors.length;
      setWaveColor(colors[colorIndex]);
    }, 5000);

    return () => clearInterval(colorChangeInterval);
  }, [isClient]);

  // Debounced resize handler
  const handleResize = useCallback(() => {
    if (!isClient || !canvasRef.current) return;
    
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    
    resizeTimeoutRef.current = setTimeout(() => {
      if (canvasRef.current) {
        const config = getScaledConfig();
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        
        // Update canvas dimensions with device pixel ratio
        canvas.width = rect.width * config.pixelRatio;
        canvas.height = rect.height * config.pixelRatio;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        
        // Scale the context
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.scale(config.pixelRatio, config.pixelRatio);
        }
      }
    }, 100);
  }, [getScaledConfig, isClient]);

  // Enhanced canvas setup with proper scaling
  const setupCanvas = useCallback(() => {
    if (!isClient || !homeRef.current) return null;
    
    // Remove any existing canvas
    const existingCanvas = document.getElementById("wave-canvas");
    if (existingCanvas) {
      existingCanvas.remove();
    }
    
    const canvas = document.createElement("canvas");
    canvas.id = "wave-canvas";
    canvas.style.position = "absolute";
    canvas.style.left = "0";
    canvas.style.top = "0";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "1000";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    
    const config = getScaledConfig();
    const rect = homeRef.current.getBoundingClientRect();
    
    // Set canvas size with device pixel ratio
    canvas.width = rect.width * config.pixelRatio;
    canvas.height = rect.height * config.pixelRatio;
    
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(config.pixelRatio, config.pixelRatio);
    }
    
    homeRef.current.appendChild(canvas);
    canvasRef.current = canvas;
    return canvas;
  }, [getScaledConfig, isClient]);

  // Enhanced mouse move handler with scaling
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isClient || !homeRef.current) return;
    
    const config = getScaledConfig();
    const rect = homeRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to the home section
    const currentPoint = { 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    };
    
    lastMousePosRef.current = currentPoint;
    
    // If array is empty, add the first point
    if (pointsRef.current.length === 0) {
      pointsRef.current.push(currentPoint);
      return;
    }
    
    // Check if we've moved enough to add a new point
    const lastPoint = pointsRef.current[pointsRef.current.length - 1];
    const distance = Math.sqrt(
      Math.pow(currentPoint.x - lastPoint.x, 2) + 
      Math.pow(currentPoint.y - lastPoint.y, 2)
    );
    
    // Only add points if we've moved enough distance
    if (distance >= config.minDistance) {
      pointsRef.current.push(currentPoint);
      
      // Keep only the last n points for a shorter trail
      if (pointsRef.current.length > config.maxPoints) {
        pointsRef.current.shift();
      }
    }
  }, [getScaledConfig, isClient]);

  // Enhanced drawing function with scaling
  const drawWavyLine = useCallback(() => {
    if (!isClient || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const config = getScaledConfig();
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width / config.pixelRatio, canvas.height / config.pixelRatio);
    
    // Always ensure the last point is exactly at the cursor position
    if (pointsRef.current.length > 0) {
      pointsRef.current[pointsRef.current.length - 1] = lastMousePosRef.current;
    }
    
    // Need at least 2 points to draw a line
    if (pointsRef.current.length < 2) {
      requestRef.current = requestAnimationFrame(drawWavyLine);
      return;
    }
    
    ctx.beginPath();
    
    const lastIndex = pointsRef.current.length - 1;
    ctx.moveTo(pointsRef.current[lastIndex].x, pointsRef.current[lastIndex].y);
    
    // Draw a wavy line with adaptive spacing
    for (let i = lastIndex - 1; i >= 0; i--) {
      if (pointsRef.current.length <= 3) {
        ctx.lineTo(pointsRef.current[i].x, pointsRef.current[i].y);
      } else {
        if (i % 2 === 1) {
          const prevPoint = pointsRef.current[i + 1];
          const currentPoint = pointsRef.current[i];
          const nextPoint = pointsRef.current[Math.max(0, i - 1)];
          
          const dirX = nextPoint.x - prevPoint.x;
          const dirY = nextPoint.y - prevPoint.y;
          const length = Math.sqrt(dirX * dirX + dirY * dirY);
          
          if (length > 0) {
            const perpX = -dirY / length * config.amplitude;
            const perpY = dirX / length * config.amplitude;
            
            ctx.quadraticCurveTo(
              currentPoint.x + perpX,
              currentPoint.y + perpY,
              (currentPoint.x + nextPoint.x) / 2,
              (currentPoint.y + nextPoint.y) / 2
            );
          } else {
            ctx.lineTo(currentPoint.x, currentPoint.y);
          }
        } else {
          ctx.quadraticCurveTo(
            pointsRef.current[i].x,
            pointsRef.current[i].y,
            pointsRef.current[i].x,
            pointsRef.current[i].y
          );
        }
      }
    }
    
    // Style the line with scaled dimensions
    ctx.lineWidth = config.lineWidth;
    ctx.strokeStyle = waveColor;
    ctx.stroke();
    
    // Glow effect with scaled dimensions
    ctx.lineWidth = config.glowWidth;
    ctx.strokeStyle = waveColor.replace("0.4", "0.2");
    ctx.stroke();
    
    // Continue animation
    requestRef.current = requestAnimationFrame(drawWavyLine);
  }, [waveColor, getScaledConfig, isClient]);

  // Main wavy line effect - only runs after hydration
  useEffect(() => {
    if (!isClient) return;
    
    // Small delay to ensure DOM is fully ready
    const initTimeout = setTimeout(() => {
      homeRef.current = document.getElementById("home");
      if (!homeRef.current) return;
      
      const canvas = setupCanvas();
      if (!canvas) return;
      
      // Initialize points array
      pointsRef.current = [];
      
      // Start animation
      requestRef.current = requestAnimationFrame(drawWavyLine);
      
      // Add event listeners
      homeRef.current.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("resize", handleResize);
      
      // Listen for zoom changes
      const handleZoom = () => {
        handleResize();
      };
      
      window.addEventListener("wheel", handleZoom, { passive: true });
    }, 100);
    
    // Cleanup function
    return () => {
      clearTimeout(initTimeout);
      
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (homeRef.current) {
        homeRef.current.removeEventListener("mousemove", handleMouseMove);
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("wheel", handleResize);
      }
      
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      const canvasToRemove = document.getElementById("wave-canvas");
      if (canvasToRemove) {
        canvasToRemove.remove();
      }
    };
  }, [isClient, setupCanvas, drawWavyLine, handleMouseMove, handleResize]);

  return (
    <main>
      <section className="home section" id="home">
        <div className="container">
          <div className="intro">
            <Image
              src="/imgs/wow.jpg"
              alt="Jeffrey Sedoro"
              className="shadow-dark"
              width={300}
              height={200}
            />
            <h1>Jeffrey Sedoro</h1>
            <button onClick={() => setCount(prev => prev + 1)}>
              Click Me {isClient ? count : 0}
            </button>
            <p>
              A Bachelor of Science in Information Technology student with a
              passion for building innovative systems and bridging the gap
              between hardware and software applications. My projects are driven
              by a desire to create impactful solutions, such as IoT-enabled
              designs and RFID-based access control systems. I aspire to be a
              versatile problem solver, seamlessly integrating hardware and
              software to meet real-world challenges. Beyond coding, I enjoy
              exploring emerging technologies, diving into creative pursuits,
              and envisioning a future where I can design systems that inspire
              and innovate. Let&aqos;s collaborate to bring ideas to life!
            </p>
            <div className="social-links">
              <a href="https://x.com/Jepriii08" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-twitter" />
              </a>
              <a href="https://www.facebook.com/Benkiekun/" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-facebook" />
              </a>
              <a href="https://github.com/Myzino" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-github" />
              </a>
              <a href="https://www.instagram.com/jepjep_xviii/" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-instagram" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}