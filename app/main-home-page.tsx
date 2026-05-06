"use client";

import { useState } from "react";
import Head from "next/head";
import XOAnimation from "@/components/xoAnimation";
import Hero from "@/components/home/hero";
import StatsStrip from "@/components/home/stats-strip";
import WhyXOrtho from "@/components/home/why-xortho";
import XbootSection from "@/components/home/xboot-section";
import KneeBraceSection from "@/components/home/knee-brace-section";
// import XOSection from "@/components/home/xo-section";
import CTASection from "@/components/home/cta-section";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import SectionTransition from "@/components/section-transition";
import StickyButtons from "@/components/sticky-buttons";
import { CLD } from "@/lib/cloudinary";

const PRELOAD_IMAGES = [
    CLD.shoe, CLD.backBelt, CLD.kneeBrace,
    CLD.legNormal, CLD.legPain, CLD.legHealed,
    CLD.backNormal, CLD.backPain, CLD.backHealed,
    CLD.kneeNormal, CLD.kneePain, CLD.kneeHealed,
    CLD.logo, CLD.xo, CLD.xo2,
];

export default function Home() {
    const [xoDone, setXoDone] = useState(false);

    return (
        <div style={{ background: "#020916" }}>
            <Head>
                {PRELOAD_IMAGES.map((url) => (
                    <link key={url} rel="preload" as="image" href={url} />
                ))}
            </Head>
            <div style={{ pointerEvents: xoDone ? "auto" : "none", position: "relative", zIndex: 1 }}>
                <StickyButtons />
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 99999 }}>
                    <Navbar />
                </div>
                <SectionTransition onNavbarVisible={() => { }}>
                    <Hero playAnimation={xoDone} />
                    <XbootSection />
                    {/* <BackSupportSection /> */}
                    <KneeBraceSection />
                    <StatsStrip />
                    <WhyXOrtho />
                    {/* <XOSection /> */}
                    <div className="bg-white" style={{ minHeight: "100vh" }}>
                        <CTASection />
                        <Footer />
                    </div>
                </SectionTransition>
            </div>
            <XOAnimation onComplete={() => setXoDone(true)} />
        </div>
    );
}



