"use client";
import gsap from "gsap";
import React from "react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function Gsapto() {
  useGSAP(() => {
    gsap.to(".circle", {
      x: 400,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  return (
    <div className="h-screen max-w-4xl">
      <div className="circle h-32 w-32 rounded-full bg-blue-500"></div>
    </div>
  );
}

export default Gsapto;
