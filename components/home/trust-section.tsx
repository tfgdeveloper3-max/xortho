"use client";

import { useRef } from "react";
import { useScrollFade } from "@/components/animation/animations";

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useScrollFade(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 bg-white opacity-0"
    >
      <div className="container mx-auto px-5 md:px-[100px] flex flex-col items-center gap-10">

        <div className="text-center max-w-4xl flex flex-col gap-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0D0F1A]">
            Orthopedic Solutions <br />
            <span className="text-primary">You Can Trust</span>
          </h2>

          <p className="text-[#4A5568] text-base md:text-lg leading-relaxed text-center mx-auto max-w-3xl">
            Xortho is an orthopedic products company focused on delivering high-quality, reliable, and efficient support solutions for patients and healthcare professionals. We design products that enhance mobility, comfort, and recovery—without compromising medical standards.
          </p>
        </div>


        <div
          ref={videoRef}
          className="w-full relative aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 mt-5"
        >
          <video
            src="/video/Trust.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/5 pointer-events-none" />
        </div>

      </div>
    </section>
  );
}