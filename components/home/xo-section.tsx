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

  useEffect(() => {
    const section = sectionRef.current;
    const xo = xoRef.current;
    if (!section || !xo) return;

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

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-white flex items-center justify-center py-8 md:py-12 lg:py-16"
    >
      {/* XO Image */}
      <div
        ref={xoRef}
        className="relative w-full h-full z-10 flex items-center justify-center pointer-events-none select-none py-8 md:py-12 lg:py-16"
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