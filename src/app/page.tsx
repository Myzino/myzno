"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [waveColor, setWaveColor] = useState("rgba(255, 0, 0, 0.4)"); // Initial color
  const [count, setCount] = useState(0);
  // Use refs to avoid hydration errors
  const pointsRef = useRef<{x: number, y: number}[]>([]);
  const requestRef = useRef<number | null>(null);
  const homeRef = useRef<HTMLElement | null>(null);
  const lastMousePosRef = useRef<{x: number, y: number}>({x: 0, y: 0});
  
  // Counter effect
  useEffect(() => {
    const repeat = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
    return () => clearInterval(repeat);
  }, []);
  
  // Color changing effect
  useEffect(() => {
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
  }, []);

  // Wavy line cursor effect
  useEffect(() => {
    // Only run this on client side
    if (typeof window === 'undefined') return;
    
    // Get the home section when the component mounts
    homeRef.current = document.getElementById("home");
    
    // Create canvas for drawing the wavy line
    const setupCanvas = () => {
      if (!homeRef.current) return;
      
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
      canvas.style.pointerEvents = "none"; // Allow clicks to pass through
      canvas.style.zIndex = "1000";
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      homeRef.current.appendChild(canvas);
      return canvas;
    };
    
    const canvas = setupCanvas();
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Initialize the points array for the wavy line
    pointsRef.current = [];
    
    // Min distance between points (to prevent too many points when mouse moves slowly)
    const minDistance = 3;
    
    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      // Get the current mouse position
      const currentPoint = { x: e.clientX, y: e.clientY };
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
      if (distance >= minDistance) {
        pointsRef.current.push(currentPoint);
        
        // Keep only the last 8 points for a shorter trail
        if (pointsRef.current.length > 8) {
          pointsRef.current.shift();
        }
      }
    };
    
    // Drawing function
    const drawWavyLine = () => {
      if (!ctx || !canvas) return;
      
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
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
      
      // The latest point (cursor endpoint) is the last in the array
      const lastIndex = pointsRef.current.length - 1;
      
      // Start from the latest point (cursor endpoint)
      ctx.moveTo(pointsRef.current[lastIndex].x, pointsRef.current[lastIndex].y);
      
      // Draw a wavy line with tighter spacing
      for (let i = lastIndex - 1; i >= 0; i--) {
        // For very short trails, skip the waviness
        if (pointsRef.current.length <= 3) {
          ctx.lineTo(pointsRef.current[i].x, pointsRef.current[i].y);
        } else {
          // Calculate control points for a smoother curve
          // For odd indices, add slight waviness
          if (i % 2 === 1) {
            const prevPoint = pointsRef.current[i + 1];
            const currentPoint = pointsRef.current[i];
            const nextPoint = pointsRef.current[Math.max(0, i - 1)];
            
            // Calculate the direction vector
            const dirX = nextPoint.x - prevPoint.x;
            const dirY = nextPoint.y - prevPoint.y;
            const length = Math.sqrt(dirX * dirX + dirY * dirY);
            
            // Normalize the perpendicular vector and scale by amplitude
            const amplitude = 3; // Very small amplitude for tightness
            const perpX = -dirY / length * amplitude;
            const perpY = dirX / length * amplitude;
            
            // Add the perpendicular offset to the control point
            ctx.quadraticCurveTo(
              currentPoint.x + perpX,
              currentPoint.y + perpY,
              (currentPoint.x + nextPoint.x) / 2,
              (currentPoint.y + nextPoint.y) / 2
            );
          } else {
            // For even indices, use a direct curve to keep the line tight
            ctx.quadraticCurveTo(
              pointsRef.current[i].x,
              pointsRef.current[i].y,
              pointsRef.current[i].x,
              pointsRef.current[i].y
            );
          }
        }
      }
      
      // Style the line
      ctx.lineWidth = 3;
      ctx.strokeStyle = waveColor;
      ctx.stroke();
      
      // Smaller glow effect
      ctx.lineWidth = 5;
      ctx.strokeStyle = waveColor.replace("0.4", "0.2");
      ctx.stroke();
      
      // Animate
      requestRef.current = requestAnimationFrame(drawWavyLine);
    };
    
    // Start the animation
    requestRef.current = requestAnimationFrame(drawWavyLine);
    
    // Add event listener for mouse movement
    if (homeRef.current) {
      homeRef.current.addEventListener("mousemove", handleMouseMove);
    }
    
    // Handle window resize
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    window.addEventListener("resize", handleResize);
    
    // Cleanup function
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (homeRef.current) {
        homeRef.current.removeEventListener("mousemove", handleMouseMove);
      }
      window.removeEventListener("resize", handleResize);
      const canvasToRemove = document.getElementById("wave-canvas");
      if (canvasToRemove) {
        canvasToRemove.remove();
      }
    };
  }, [waveColor]); // Dependency on waveColor to update the line color

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
            <button onClick={() => setCount(prev => prev + 1)}>Click Me {count}</button>
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
              and innovate. Let's collaborate to bring ideas to life!
            </p>
            <div className="social-links">
              <a href="https://x.com/Jepriii08" target="_blank">
                <i className="fa fa-twitter" />
              </a>
              <a href="https://www.facebook.com/Benkiekun/" target="_blank">
                <i className="fa fa-facebook" />
              </a>
              <a href="https://github.com/Myzino" target="_blank">
                <i className="fa fa-github" />
              </a>
              <a href="https://www.instagram.com/jepjep_xviii/" target="_blank">
                <i className="fa fa-instagram" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}