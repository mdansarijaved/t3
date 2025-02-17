"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function Canvas() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const element = canvasRef.current;
    gsap.from(element, {
      x: "-100vw",
      duration: 2,
      scrollTrigger: {
        trigger: element,
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse",
        // markers: true, // Uncomment for debugging
      },
    });
  }, {});

  return (
    <div className="min-h-screen w-screen bg-red-400">
      <div className="flex h-screen items-center justify-start">
        <div ref={canvasRef} className="h-32 w-32 rounded-lg bg-blue-400"></div>
      </div>
    </div>
  );
}

export default Canvas;
