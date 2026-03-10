"use client";

import { useState, useEffect } from "react";
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
  const [xoDone, setXoDone] = useState(false);
  const [triggerHeroAnim, setTriggerHeroAnim] = useState(false);

  // Inject hero video into XO preview div
  useEffect(() => {
    const t = setTimeout(() => {
      const target = document.getElementById("xo-hero-preview");
      if (!target) return;

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
  }, []);

  const handleXOComplete = () => {
    setXoDone(true);
    // small delay then trigger hero entrance animation
    setTimeout(() => setTriggerHeroAnim(true), 50);
  };

  return (
    <>
      {/* ✅ XO animation — absolutely on top, disappears when done */}
      {!xoDone && <XOAnimation onComplete={handleXOComplete} />}

      {/*
        ✅ KEY FIX: main content is ALWAYS rendered in DOM (never display:none)
        When XO is playing, it sits below under the fixed overlay.
        No mount/unmount = no white flash.
        We use visibility+opacity to prevent interaction before XO done.
      */}
      <div
        style={{
          visibility: xoDone ? "visible" : "hidden",
          // keep in render tree so no layout flash on reveal
        }}
      >
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