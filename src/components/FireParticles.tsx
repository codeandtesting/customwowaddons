"use client";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    particlesJS: (id: string, config: object) => void;
  }
}

export default function FireParticles() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Load particles.js from CDN
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.async = true;
    script.onload = () => {
      if (window.particlesJS) {
        window.particlesJS("hero-particles", {
          particles: {
            number: { value: 120, density: { enable: true, value_area: 900 } },
            color: {
              value: ["#EDE1D5", "#E6B033", "#D4932F", "#FFFEFC", "#D4AF37"],
            },
            shape: {
              type: "circle",
              stroke: { width: 0, color: "#000000" },
            },
            opacity: {
              value: 0.6,
              random: true,
              anim: {
                enable: true,
                speed: 0.8,
                opacity_min: 0.05,
                sync: false,
              },
            },
            size: {
              value: 2.2,
              random: true,
              anim: {
                enable: true,
                speed: 1.5,
                size_min: 0.3,
                sync: false,
              },
            },
            line_linked: {
              enable: false,
            },
            move: {
              enable: true,
              speed: 3.5,
              direction: "top-right",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: { enable: false, rotateX: 600, rotateY: 1200 },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: false },
              onclick: { enable: false },
              resize: true,
            },
          },
          retina_detect: true,
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      // cleanup
      const el = document.getElementById("hero-particles");
      if (el) {
        const canvases = el.querySelectorAll("canvas");
        canvases.forEach((c) => c.remove());
      }
    };
  }, []);

  return (
    <div
      id="hero-particles"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 2,
        pointerEvents: "none",
      }}
    />
  );
}
