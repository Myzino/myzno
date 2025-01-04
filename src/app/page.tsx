"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const homeSection = document.getElementById("home");

    if (homeSection) {
      const createWave = (x: number, y: number) => {
        const wave = document.createElement("div");
        wave.className = "cursor-animation";
        wave.style.left = `${x}px`;
        wave.style.top = `${y}px`;
        homeSection.appendChild(wave);

        setTimeout(() => {
          homeSection.removeChild(wave);
        }, ); 
      };

      const handleMouseMove = (e: MouseEvent) => {
        createWave(e.clientX, e.clientY);
      };

      homeSection.addEventListener("mousemove", handleMouseMove);

      return () => {
        homeSection.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  return (
    <main>
      <section className="home section" id="home">
        <div className="container">
          <div className="intro">
          <Image
           src="/imgs/wow.jpg"
          alt="Jeffrey Sedoro"
          className="shadow-dark"
          width={500}
          height={400}/>
            <h1>Jeffrey Sedoro</h1>
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
              and innovate. Let’s collaborate to bring ideas to life!
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
