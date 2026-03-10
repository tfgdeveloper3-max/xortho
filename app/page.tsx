"use client";

import { useState } from "react";
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

  return (
    // Dark root — if anything transparent, dark shows not white
    <div style={{ background: "#020916" }}>

      {/* Hero always rendered and visible — XO canvas sits on top */}
      <div style={{ pointerEvents: xoDone ? "auto" : "none", position: "relative", zIndex: 1 }}>
        <StickyButtons />
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 99999 }}>
          <Navbar />
        </div>
        <SectionTransition onNavbarVisible={() => {}}>
          <Hero playAnimation={xoDone} />
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

      {/* XO always mounted — never unmounted — just display:none when done */}
      <XOAnimation onComplete={() => setXoDone(true)} />
    </div>
  );
}