"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CLD } from "@/lib/cloudinary";

gsap.registerPlugin(ScrollTrigger);

export default function XOSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const xoRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const xo = xoRef.current;
    const video = videoRef.current;
    if (!section || !xo || !video) return;

    gsap.fromTo(xo,
      { opacity: 0, scale: 1.08 },
      {
        opacity: 1, scale: 1,
        duration: 1.4, ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        }
      }
    );

    gsap.fromTo(video,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2, delay: 0.3, ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        }
      }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-white flex items-center justify-center py-8 md:py-12 lg:py-16"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 bg-[#2C2895]/50 flex items-center justify-center">
        <video
          ref={videoRef}
          src={CLD.productPreview}
          autoPlay loop muted playsInline
          className="w-[200px] md:w-[300px] h-full object-cover mix-blend-darken"
          style={{ opacity: 0 }}
        />
      </div>

      {/* XO Overlay Image */}
      <div
        ref={xoRef}
        className="absolute inset-0 w-full h-full bg-white mix-blend-screen z-10 flex items-center justify-center pointer-events-none select-none py-8 md:py-12 lg:py-16"
        style={{ opacity: 0 }}
      >
        <Image
          src={CLD.xo}
          alt="XO"
          width={1000}
          height={600}
          className="w-[120%] h-[120%] object-contain"
        />
      </div>
    </section>
  );
}