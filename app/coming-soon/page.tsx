"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

const BASE = "https://res.cloudinary.com/di7znsrrr";
const CLD = {
    logo: `${BASE}/image/upload/logo`,
    sectionhero: `${BASE}/video/upload/section_hero`,
    xoBootShort: `${BASE}/image/upload/xo-boot-short`,
    xoBootTall: `${BASE}/image/upload/xo-boot-tall`,
    xoBackSupport: `${BASE}/image/upload/xo-back`,
    xoKneeHinged: `${BASE}/image/upload/xo-knee-hinged`,
};

export default function ComingSoon() {
    const scanRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        // Scanline
        const scan = scanRef.current;
        if (scan) {
            gsap.fromTo(scan,
                { top: "0%", opacity: 0 },
                {
                    top: "100%", opacity: 0.5, duration: 4, ease: "none", repeat: -1, repeatDelay: 2,
                    onRepeat: () => { gsap.set(scan, { top: "0%", opacity: 0 }); }
                }
            );
        }

        // Entrance animations
        const tl = gsap.timeline({ delay: 0.2 });
        tl.fromTo(".cs-logo",
            { opacity: 0, y: -30, filter: "blur(10px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0, ease: "expo.out" }
        );
        tl.fromTo(".cs-anim",
            { opacity: 0, y: 30, filter: "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "expo.out", stagger: 0.1 },
            "-=0.5"
        );

        // Product images — slide in from sides
        gsap.fromTo(".img-boot-short",
            { opacity: 0, x: -60 },
            { opacity: 1, x: 0, duration: 1.4, ease: "expo.out", delay: 0.8 }
        );
        gsap.fromTo(".img-boot-tall",
            { opacity: 0, x: -60 },
            { opacity: 1, x: 0, duration: 1.4, ease: "expo.out", delay: 1.1 }
        );
        gsap.fromTo(".img-back",
            { opacity: 0, x: 60 },
            { opacity: 1, x: 0, duration: 1.4, ease: "expo.out", delay: 0.9 }
        );
        gsap.fromTo(".img-knee",
            { opacity: 0, x: 60 },
            { opacity: 1, x: 0, duration: 1.4, ease: "expo.out", delay: 1.2 }
        );

        // Float animations
        gsap.to(".img-boot-short", { y: -12, duration: 3.8, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.8 });
        gsap.to(".img-boot-tall", { y: -10, duration: 4.2, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.2 });
        gsap.to(".img-back", { y: -14, duration: 4.0, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.0 });
        gsap.to(".img-knee", { y: -11, duration: 3.6, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.4 });

        // Center glow pulse
        gsap.to(".center-glow", { opacity: 0.30, duration: 2.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to(".bracket", { opacity: 0.7, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.4 });
    }, []);

    return (
        <main className="relative w-full min-h-screen flex flex-col overflow-hidden" style={{ background: "#020916" }}>

            {/* ── Video bg ── */}
            <video src={CLD.sectionhero} autoPlay loop muted playsInline
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{ opacity: 0.20, zIndex: 0 }} />

            {/* ── Grid ── */}
            <div className="absolute inset-0 pointer-events-none" style={{
                zIndex: 1,
                backgroundImage: "linear-gradient(rgba(17,17,132,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.06) 1px,transparent 1px)",
                backgroundSize: "52px 52px"
            }} />

            {/* ── Vignette ── */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "radial-gradient(ellipse at 50% 40%, transparent 18%, rgba(2,9,22,0.88) 100%)" }} />
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "linear-gradient(to bottom, rgba(2,9,22,0.5) 0%, transparent 20%, transparent 75%, rgba(2,9,22,0.7) 100%)" }} />
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "linear-gradient(to right, rgba(2,9,22,0.65) 0%, transparent 20%, transparent 80%, rgba(2,9,22,0.65) 100%)" }} />

            {/* ── Center glow ── */}
            <div className="center-glow absolute inset-0 pointer-events-none" style={{
                zIndex: 1,
                background: "radial-gradient(ellipse at 50% 50%, rgba(22,81,209,0.38) 0%, rgba(91,155,255,0.10) 40%, transparent 65%)", opacity: 0.20
            }} />

            {/* ── Scanline ── */}
            <div ref={scanRef} className="absolute inset-x-0 pointer-events-none" style={{
                zIndex: 2, height: 1,
                background: "linear-gradient(90deg, transparent, rgba(91,155,255,0.6) 30%, rgba(91,155,255,0.9) 50%, rgba(91,155,255,0.6) 70%, transparent)",
                boxShadow: "0 0 12px rgba(91,155,255,0.5)", opacity: 0
            }} />

            {/* ── Edge lines ── */}
            <div className="absolute top-0 inset-x-0 h-px pointer-events-none" style={{ zIndex: 3, background: "linear-gradient(90deg, transparent, rgba(91,155,255,0.6), transparent)" }} />
            <div className="absolute bottom-0 inset-x-0 h-px pointer-events-none" style={{ zIndex: 3, background: "linear-gradient(90deg, transparent, rgba(91,155,255,0.3), transparent)" }} />

            {/* ── Corner brackets ── */}
            {(["tl", "tr", "bl", "br"] as const).map(c => (
                <div key={c} className="bracket absolute pointer-events-none" style={{
                    zIndex: 3, width: 48, height: 48, opacity: 0.5,
                    top: c.startsWith("t") ? 20 : "auto", bottom: c.startsWith("b") ? 20 : "auto",
                    left: c.endsWith("l") ? 20 : "auto", right: c.endsWith("r") ? 20 : "auto",
                    borderTop: c.startsWith("t") ? "2px solid rgba(91,155,255,0.7)" : "none",
                    borderBottom: c.startsWith("b") ? "2px solid rgba(91,155,255,0.7)" : "none",
                    borderLeft: c.endsWith("l") ? "2px solid rgba(91,155,255,0.7)" : "none",
                    borderRight: c.endsWith("r") ? "2px solid rgba(91,155,255,0.7)" : "none",
                    borderRadius: c === "tl" ? "14px 0 0 0" : c === "tr" ? "0 14px 0 0" : c === "bl" ? "0 0 0 14px" : "0 0 14px 0",
                }} />
            ))}

            {/* ══ PRODUCT IMAGES — positioned absolutely ══ */}

            {/* Boot Short — upper left */}
            <div className="img-boot-short absolute pointer-events-none hidden lg:block"
                style={{ left: "3%", top: "8%", zIndex: 4, opacity: 0, width: 220 }}>
                <div style={{ position: "absolute", inset: -40, background: "radial-gradient(ellipse at center, rgba(22,81,209,0.30) 0%, transparent 70%)", filter: "blur(30px)" }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={CLD.xoBootShort} alt="XO Boot Short" style={{
                    position: "relative", zIndex: 1, width: "100%", objectFit: "contain",
                    filter: "drop-shadow(0 0 40px rgba(22,81,209,0.7)) drop-shadow(0 0 16px rgba(91,155,255,0.5)) brightness(1.08)"
                }} />
            </div>

            {/* Boot Tall — lower left */}
            <div className="img-boot-tall absolute pointer-events-none hidden lg:block"
                style={{ left: "1%", bottom: "5%", zIndex: 4, opacity: 0, width: 200 }}>
                <div style={{ position: "absolute", inset: -40, background: "radial-gradient(ellipse at center, rgba(22,81,209,0.28) 0%, transparent 70%)", filter: "blur(30px)" }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={CLD.xoBootTall} alt="XO Boot Tall" style={{
                    position: "relative", zIndex: 1, width: "100%", objectFit: "contain",
                    filter: "drop-shadow(0 0 40px rgba(22,81,209,0.65)) drop-shadow(0 0 16px rgba(91,155,255,0.45)) brightness(1.08)"
                }} />
            </div>

            {/* Back Support — upper right */}
            <div className="img-back absolute pointer-events-none hidden lg:block"
                style={{ right: "2%", top: "10%", zIndex: 4, opacity: 0, width: 240 }}>
                <div style={{ position: "absolute", inset: -40, background: "radial-gradient(ellipse at center, rgba(22,81,209,0.28) 0%, transparent 70%)", filter: "blur(30px)" }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={CLD.xoBackSupport} alt="XO Back Support" style={{
                    position: "relative", zIndex: 1, width: "100%", objectFit: "contain",
                    filter: "drop-shadow(0 0 40px rgba(22,81,209,0.65)) drop-shadow(0 0 16px rgba(91,155,255,0.45)) brightness(1.08)"
                }} />
            </div>

            {/* Knee Support — lower right */}
            <div className="img-knee absolute pointer-events-none hidden lg:block"
                style={{ right: "3%", bottom: "6%", zIndex: 4, opacity: 0, width: 200 }}>
                <div style={{ position: "absolute", inset: -40, background: "radial-gradient(ellipse at center, rgba(22,81,209,0.28) 0%, transparent 70%)", filter: "blur(30px)" }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={CLD.xoKneeHinged} alt="XO Knee Support" style={{
                    position: "relative", zIndex: 1, width: "100%", objectFit: "contain",
                    filter: "drop-shadow(0 0 40px rgba(22,81,209,0.65)) drop-shadow(0 0 16px rgba(91,155,255,0.45)) brightness(1.08)"
                }} />
            </div>

            {/* ══ MAIN CENTER CONTENT ══ */}
            <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-5 py-16 max-w-2xl mx-auto w-full gap-5">

                {/* Logo + Tagline */}
                <div className="cs-logo flex flex-col items-center gap-3" style={{ opacity: 0 }}>
                    <Image src={CLD.logo} alt="X-Ortho" width={110} height={110} className="object-contain"
                        style={{ filter: "drop-shadow(0 0 40px rgba(91,155,255,0.55)) drop-shadow(0 0 80px rgba(22,81,209,0.3))" }} />
                    <p className="text-[11px] uppercase tracking-[0.4em] font-bold" style={{ color: "rgba(91,155,255,0.7)" }}>
                        Better DME. Better Outcomes.
                    </p>
                </div>

                {/* Badge */}
                <div className="cs-anim inline-flex items-center gap-2.5 text-[10px] uppercase tracking-[0.45em] font-bold px-5 py-2 rounded-full"
                    style={{
                        opacity: 0, background: "linear-gradient(135deg, rgba(22,81,209,0.2), rgba(91,155,255,0.1))",
                        border: "1px solid rgba(91,155,255,0.3)", color: "#5b9bff",
                        boxShadow: "0 0 20px rgba(22,81,209,0.2), inset 0 1px 0 rgba(255,255,255,0.06)"
                    }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5b9bff] animate-pulse" style={{ boxShadow: "0 0 8px rgba(91,155,255,0.8)" }} />
                    X-Ortho · Coming Soon
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5b9bff] animate-pulse" style={{ boxShadow: "0 0 8px rgba(91,155,255,0.8)" }} />
                </div>

                {/* Headline */}
                <h1 className="cs-anim font-nexa uppercase leading-[0.88]"
                    style={{ opacity: 0, fontSize: "clamp(3rem,9vw,7rem)", fontWeight: 800, letterSpacing: "-3px" }}>
                    <span className="block text-[#f0f4ff]"
                        style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.6))" }}>
                        Something
                    </span>
                    <span className="block" style={{
                        backgroundImage: "linear-gradient(180deg, #f0f0f0 0%, #b8b8b8 20%, #e8e8e8 35%, #787878 50%, #d0d0d0 65%, #909090 80%, #c8c8c8 100%)",
                        WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent", backgroundClip: "text",
                        filter: "drop-shadow(0 1px 0 rgba(255,255,255,0.6)) drop-shadow(0 -1px 0 rgba(0,0,0,0.5)) drop-shadow(0 4px 12px rgba(0,0,0,0.7))", paddingTop: "10px"
                    }}>Big</span>
                    <span className="block" style={{
                        backgroundImage: "linear-gradient(180deg, #1a6fd4 0%, #0d4fa8 35%, #1565c8 55%, #0a3d8a 80%, #1251b0 100%)",
                        WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent", backgroundClip: "text",
                        filter: "drop-shadow(0 1px 0 rgba(91,155,255,0.6)) drop-shadow(0 -1px 0 rgba(0,0,30,0.7)) drop-shadow(0 4px 12px rgba(0,0,0,0.7))", paddingTop: "10px"
                    }}>Is Coming.</span>
                </h1>

                {/* Sean's tagline */}
                <p className="cs-anim text-white/55 text-sm md:text-base leading-relaxed max-w-xl" style={{ opacity: 0 }}>
                    <span className="text-white/75 font-semibold">Better Design. Better Quality. Better Functionality.<br />
                        Better DME. Better Clinical &amp; Better Financial Outcomes.</span>
                </p>

                {/* Sean's description */}
                <p className="cs-anim text-white/40 text-sm leading-relaxed max-w-lg border-l-[3px] pl-4 text-left"
                    style={{ opacity: 0, borderColor: "rgba(91,155,255,0.3)" }}>
                    Crafted on behalf of TLC DME with feedback from Orthopedic, Podiatric, Urgent Care, and Biomechanical Engineers. The most anticipated orthopedic products coming soon.
                </p>

                {/* Divider */}
                <div className="cs-anim w-full flex items-center gap-3 max-w-lg" style={{ opacity: 0 }}>
                    <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(91,155,255,0.25))" }} />
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "rgba(91,155,255,0.5)" }} />
                    <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(91,155,255,0.25))" }} />
                </div>

            </div>

            {/* ── Copyright ── */}
            <div className="absolute bottom-5 inset-x-0 flex justify-center pointer-events-none" style={{ zIndex: 3 }}>
                <p className="text-[10px] uppercase tracking-[0.4em] font-bold" style={{
                    backgroundImage: "linear-gradient(180deg, #f0f0f0 0%, #b8b8b8 20%, #e8e8e8 35%, #787878 50%, #d0d0d0 65%, #909090 80%, #c8c8c8 100%)",
                    WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent", backgroundClip: "text",
                    filter: "drop-shadow(0 1px 0 rgba(255,255,255,0.6)) drop-shadow(0 -1px 0 rgba(0,0,0,0.5)) drop-shadow(0 4px 12px rgba(0,0,0,0.7))"
                }}>
                    © {new Date().getFullYear()} X-Ortho · TLC DME LLC · Better DME · Better Outcomes
                </p>
            </div>
        </main>
    );
}