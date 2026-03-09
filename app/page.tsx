"use client";

import { useState, useEffect, useRef } from "react";
import XOAnimation from "@/components/xoAnimation";
import Hero from "@/components/home/hero";
import XbootSection from "@/components/home/xboot-section";
import BackSupportSection from "@/components/home/back-support-section";
import KneeBraceSection from "@/components/home/knee-brace-section";
import TrustSection from "@/components/home/trust-section";
import XOSection from "@/components/home/xo-section";
import CTASection from "@/components/home/cta-section";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import SectionTransition from "@/components/section-transition";
import StickyButtons from "@/components/sticky-buttons";

export default function Home() {
  const [phase, setPhase] = useState<"xo" | "done">("xo");
  const [triggerHeroAnim, setTriggerHeroAnim] = useState(false);
  const heroPreviewRef = useRef<HTMLDivElement>(null);

  // Once XO phase starts, clone the hero video into the XO overlay preview div
  useEffect(() => {
    if (phase !== "xo") return;

    // Wait a tick for DOM to be ready
    const t = setTimeout(() => {
      const target = document.getElementById("xo-hero-preview");
      if (!target) return;

      // Create a video element matching the hero background
      const video = document.createElement("video");
      video.src = "/video/Hero-Bg.mp4";
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.style.cssText = `
        position: absolute; inset: 0;
        width: 100%; height: 100%;
        object-fit: cover;
        opacity: 0.82;
      `;

      // Dark overlay on top of video
      const overlay = document.createElement("div");
      overlay.style.cssText = `
        position: absolute; inset: 0;
        background: linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.2), transparent);
        z-index: 1;
      `;

      target.style.position = "absolute";
      target.style.inset = "0";
      target.style.overflow = "hidden";
      target.style.background = "#000";
      target.appendChild(video);
      target.appendChild(overlay);
      video.play().catch(() => {});
    }, 100);

    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase === "done") {
      setTimeout(() => setTriggerHeroAnim(true), 50);
    }
  }, [phase]);

  return (
    <>
      {phase === "xo" && (
        <XOAnimation onComplete={() => setPhase("done")} />
      )}

      <div style={{ display: phase === "done" ? "block" : "none" }}>
        <StickyButtons />

        <div
          id="main-navbar"
          style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 99999 }}
        >
          <Navbar />
        </div>

        <SectionTransition onNavbarVisible={() => {}}>
          <Hero playAnimation={triggerHeroAnim} />
          <XbootSection />
          <BackSupportSection />
          <KneeBraceSection />
          <TrustSection />
          <XOSection />
          <div className="bg-white" style={{ minHeight: "100vh" }}>
            <CTASection />
            <Footer />
          </div>
        </SectionTransition>
      </div>
    </>
  );
}