"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

const BASE = "https://res.cloudinary.com/di7znsrrr";
const CLD = {
    logo: `${BASE}/image/upload/logo`,
    heroBg: `${BASE}/video/upload/Hero-Bg`,
    xoBootShort: `${BASE}/image/upload/xo-boot-short`,
    xoBootTall: `${BASE}/image/upload/xo-boot-tall`,
    xoBackSupport: `${BASE}/image/upload/xo-back`,
    xoKneeHinged: `${BASE}/image/upload/xo-knee-hinged`,
};

export default function ComingSoon() {
    const scanRef = useRef<HTMLDivElement>(null);
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
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

        const tl = gsap.timeline({ delay: 0.05 });
        tl.fromTo(".cs-logo",
            { opacity: 0, y: -20, filter: "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.4, ease: "expo.out" }
        );
        tl.fromTo(".cs-anim",
            { opacity: 0, y: 16, filter: "blur(4px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.35, ease: "expo.out", stagger: 0.04 },
            "-=0.3"
        );

        // Preload images first then animate
        const imgSrcs = [CLD.xoBootShort, CLD.xoBootTall, CLD.xoBackSupport, CLD.xoKneeHinged];
        let loaded = 0;
        imgSrcs.forEach(src => {
            const img = new window.Image();
            img.onload = () => {
                loaded++;
                if (loaded === imgSrcs.length) {
                    gsap.fromTo(".img-boot-short", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out", delay: 0 });
                    gsap.fromTo(".img-boot-tall", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out", delay: 0.08 });
                    gsap.fromTo(".img-back", { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out", delay: 0 });
                    gsap.fromTo(".img-knee", { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out", delay: 0.08 });
                }
            };
            img.src = src;
        });

        gsap.to(".img-boot-short", { y: -12, duration: 3.8, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.5 });
        gsap.to(".img-boot-tall", { y: -10, duration: 4.2, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.8 });
        gsap.to(".img-back", { y: -14, duration: 4.0, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.6 });
        gsap.to(".img-knee", { y: -11, duration: 3.6, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.0 });

        gsap.to(".center-glow", { opacity: 0.30, duration: 2.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to(".bracket", { opacity: 0.7, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.4 });
    }, []);

    const handleSubmit = () => {
        if (!email) return;
        setSubmitted(true);
    };

    return (
        <main className="relative w-full min-h-screen flex flex-col overflow-hidden" style={{ background: "#020916" }}>

            <video src={CLD.heroBg} autoPlay loop muted playsInline
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{ opacity: 0.20, zIndex: 0 }} />

            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, backgroundImage: "linear-gradient(rgba(17,17,132,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.06) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "radial-gradient(ellipse at 50% 40%, transparent 18%, rgba(2,9,22,0.88) 100%)" }} />
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "linear-gradient(to bottom, rgba(2,9,22,0.5) 0%, transparent 20%, transparent 75%, rgba(2,9,22,0.7) 100%)" }} />
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "linear-gradient(to right, rgba(2,9,22,0.65) 0%, transparent 20%, transparent 80%, rgba(2,9,22,0.65) 100%)" }} />
            <div className="center-glow absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "radial-gradient(ellipse at 50% 50%, rgba(22,81,209,0.38) 0%, rgba(91,155,255,0.10) 40%, transparent 65%)", opacity: 0.20 }} />

            <div ref={scanRef} className="absolute inset-x-0 pointer-events-none" style={{ zIndex: 2, height: 1, background: "linear-gradient(90deg, transparent, rgba(91,155,255,0.6) 30%, rgba(91,155,255,0.9) 50%, rgba(91,155,255,0.6) 70%, transparent)", boxShadow: "0 0 12px rgba(91,155,255,0.5)", opacity: 0 }} />

            <div className="absolute top-0 inset-x-0 h-px pointer-events-none" style={{ zIndex: 3, background: "linear-gradient(90deg, transparent, rgba(91,155,255,0.6), transparent)" }} />
            <div className="absolute bottom-0 inset-x-0 h-px pointer-events-none" style={{ zIndex: 3, background: "linear-gradient(90deg, transparent, rgba(91,155,255,0.3), transparent)" }} />

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

            {/* Boot Short — upper left */}
            <div className="img-boot-short absolute pointer-events-none hidden lg:block" style={{ left: "3%", top: "8%", zIndex: 4, opacity: 0, width: 220 }}>
                <div style={{ position: "absolute", inset: -40, background: "radial-gradient(ellipse at center, rgba(22,81,209,0.30) 0%, transparent 70%)", filter: "blur(30px)" }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={CLD.xoBootShort} alt="XO Boot Short" style={{ position: "relative", zIndex: 1, width: "100%", objectFit: "contain", filter: "drop-shadow(0 0 40px rgba(22,81,209,0.7)) drop-shadow(0 0 16px rgba(91,155,255,0.5)) brightness(1.08)" }} />
            </div>

            {/* Boot Tall — lower left */}
            <div className="img-boot-tall absolute pointer-events-none hidden lg:block" style={{ left: "1%", bottom: "5%", zIndex: 4, opacity: 0, width: 200 }}>
                <div style={{ position: "absolute", inset: -40, background: "radial-gradient(ellipse at center, rgba(22,81,209,0.28) 0%, transparent 70%)", filter: "blur(30px)" }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={CLD.xoBootTall} alt="XO Boot Tall" style={{ position: "relative", zIndex: 1, width: "100%", objectFit: "contain", filter: "drop-shadow(0 0 40px rgba(22,81,209,0.65)) drop-shadow(0 0 16px rgba(91,155,255,0.45)) brightness(1.08)" }} />
            </div>

            {/* Back Support — upper right */}
            <div className="img-back absolute pointer-events-none hidden lg:block" style={{ right: "2%", top: "10%", zIndex: 4, opacity: 0, width: 240 }}>
                <div style={{ position: "absolute", inset: -40, background: "radial-gradient(ellipse at center, rgba(22,81,209,0.28) 0%, transparent 70%)", filter: "blur(30px)" }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={CLD.xoBackSupport} alt="XO Back Support" style={{ position: "relative", zIndex: 1, width: "100%", objectFit: "contain", filter: "drop-shadow(0 0 40px rgba(22,81,209,0.65)) drop-shadow(0 0 16px rgba(91,155,255,0.45)) brightness(1.08)" }} />
            </div>

            {/* Knee Support — lower right */}
            <div className="img-knee absolute pointer-events-none hidden lg:block" style={{ right: "3%", bottom: "6%", zIndex: 4, opacity: 0, width: 200 }}>
                <div style={{ position: "absolute", inset: -40, background: "radial-gradient(ellipse at center, rgba(22,81,209,0.28) 0%, transparent 70%)", filter: "blur(30px)" }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={CLD.xoKneeHinged} alt="XO Knee Support" style={{ position: "relative", zIndex: 1, width: "100%", objectFit: "contain", filter: "drop-shadow(0 0 40px rgba(22,81,209,0.65)) drop-shadow(0 0 16px rgba(91,155,255,0.45)) brightness(1.08)" }} />
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
                    style={{ opacity: 0, background: "linear-gradient(135deg, rgba(22,81,209,0.2), rgba(91,155,255,0.1))", border: "1px solid rgba(91,155,255,0.3)", color: "#5b9bff", boxShadow: "0 0 20px rgba(22,81,209,0.2), inset 0 1px 0 rgba(255,255,255,0.06)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5b9bff] animate-pulse" style={{ boxShadow: "0 0 8px rgba(91,155,255,0.8)" }} />
                    X-Ortho · Coming Soon
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5b9bff] animate-pulse" style={{ boxShadow: "0 0 8px rgba(91,155,255,0.8)" }} />
                </div>

                {/* Headline */}
                <h1 className="cs-anim font-nexa uppercase leading-[0.9]"
                    style={{ opacity: 0, fontSize: "clamp(2.2rem,6vw,5rem)", fontWeight: 800, letterSpacing: "-2px" }}>
                    <span className="block" style={{
                        backgroundImage: "linear-gradient(180deg, #1a6fd4 0%, #0d4fa8 35%, #1565c8 55%, #0a3d8a 80%, #1251b0 100%)",
                        WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent", backgroundClip: "text",
                        filter: "drop-shadow(0 1px 0 rgba(91,155,255,0.5)) drop-shadow(0 -1px 0 rgba(0,0,30,0.6)) drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
                    }}>X-Ortho</span>
                    <span className="block text-[#f0f4ff]" style={{ fontSize: "45%", letterSpacing: "-0.10px", fontWeight: 700, opacity: 0.85 }}>
                        <span className="block" style={{ marginBottom: "8px" }}>The Most Advanced.</span>
                        <span className="block" style={{
                            backgroundImage: "linear-gradient(180deg, #f0f0f0 0%, #b8b8b8 20%, #e8e8e8 35%, #787878 50%, #d0d0d0 65%, #909090 80%, #c8c8c8 100%)",
                            WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text",
                            filter: "drop-shadow(0 1px 0 rgba(255,255,255,0.9)) drop-shadow(0 -1px 0 rgba(0,0,0,0.6)) drop-shadow(1px 0 0 rgba(255,255,255,0.3)) drop-shadow(-1px 0 0 rgba(0,0,0,0.3)) drop-shadow(0 2px 6px rgba(0,0,0,0.8))",
                            marginBottom: "8px"
                        }}>Most Sophisticated.</span>
                        <span className="block">Most Anticipated.</span>
                    </span>
                </h1>

                {/* Tagline pills */}
                <div className="cs-anim flex flex-wrap justify-center gap-2 max-w-lg" style={{ opacity: 0 }}>
                    {["Better Design", "Better Quality", "Better Functionality", "Better Clinical Outcomes", "Better Financial Outcomes", "Better DME"].map((t, i) => (
                        <span key={i} className="text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full"
                            style={{ background: "linear-gradient(135deg, rgba(22,81,209,0.20), rgba(6,10,35,0.7))", border: "1px solid rgba(91,155,255,0.22)", color: "rgba(91,155,255,0.85)", backdropFilter: "blur(8px)" }}>
                            {t}
                        </span>
                    ))}
                </div>

                {/* Description */}
                <p className="cs-anim text-white/50 text-sm leading-relaxed max-w-lg border-l-[3px] pl-4 text-left"
                    style={{ opacity: 0, borderColor: "rgba(91,155,255,0.3)" }}>
                    XO products were purposefully and intentionally crafted by Biomechanical Engineers with feedback from{" "}
                    <span className="text-white/70 font-semibold">Orthopedic, Podiatric, and Urgent Care</span>{" "}
                    Medical Professionals.
                </p>

                {/* 3 Value props */}
                <div className="cs-anim grid grid-cols-3 gap-3 w-full max-w-lg" style={{ opacity: 0 }}>
                    {[
                        { icon: "⚕", t: "Improve Clinical Care" },
                        { icon: "★", t: "Enhance Patient Satisfaction" },
                        { icon: "↑", t: "Increase Ancillary Revenue" },
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center gap-1.5 px-3 py-3.5 rounded-2xl relative overflow-hidden"
                            style={{ background: "linear-gradient(145deg, rgba(22,81,209,0.18) 0%, rgba(6,10,35,0.7) 100%)", border: "1px solid rgba(91,155,255,0.22)", boxShadow: "0 4px 20px rgba(22,81,209,0.15), inset 0 1px 0 rgba(91,155,255,0.12)", backdropFilter: "blur(12px)" }}>
                            <span className="text-lg" style={{
                                backgroundImage: "linear-gradient(180deg, #f0f0f0 0%, #b8b8b8 20%, #e8e8e8 35%, #787878 50%, #d0d0d0 65%, #909090 80%, #c8c8c8 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                filter: "drop-shadow(0 1px 0 rgba(255,255,255,0.9)) drop-shadow(0 -1px 0 rgba(0,0,0,0.6)) drop-shadow(1px 0 0 rgba(255,255,255,0.3)) drop-shadow(-1px 0 0 rgba(0,0,0,0.3)) drop-shadow(0 2px 6px rgba(0,0,0,0.8))"
                            }}>{item.icon}</span>
                            <span className="text-[10px] uppercase tracking-wider font-bold text-white/60 leading-tight text-center">{item.t}</span>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="cs-anim w-full flex items-center gap-3 max-w-lg" style={{ opacity: 0 }}>
                    <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(91,155,255,0.25))" }} />
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "rgba(91,155,255,0.5)" }} />
                    <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(91,155,255,0.25))" }} />
                </div>

                {/* Contact CTA */}
                <div className="cs-anim flex flex-col items-center gap-3 w-full max-w-lg" style={{ opacity: 0 }}>
                    <p className="text-white/35 text-xs leading-relaxed text-center">
                        Email <a href="mailto:info@xortho.com" className="text-[#5b9bff] hover:text-white transition-colors font-semibold">info@xortho.com</a>{" "}
                        or call{" "}
                        <a href="tel:8559678461" className="text-[#5b9bff] hover:text-white transition-colors font-semibold">855.XORTHO1</a>{" "}
                        to receive a customized proposal including HCPCS coding, pricing, profit index, and samples.
                    </p>
                    <div className="flex items-center gap-4 flex-wrap justify-center">
                        <span className="text-[10px] uppercase tracking-[0.35em] font-bold" style={{ color: "rgba(255,255,255,0.20)" }}>Available Exclusively Through</span>
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>TLC DME LLC</span>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="absolute bottom-5 inset-x-0 flex justify-center pointer-events-none" style={{ zIndex: 3 }}>
                <p className="text-[10px] uppercase tracking-[0.4em] font-bold" style={{
                    backgroundImage: "linear-gradient(180deg, #f0f0f0 0%, #b8b8b8 20%, #e8e8e8 35%, #787878 50%, #d0d0d0 65%, #909090 80%, #c8c8c8 100%)",
                    WebkitBackgroundClip: "text" as string,
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 1px 0 rgba(255,255,255,0.9)) drop-shadow(0 -1px 0 rgba(0,0,0,0.6)) drop-shadow(1px 0 0 rgba(255,255,255,0.3)) drop-shadow(-1px 0 0 rgba(0,0,0,0.3)) drop-shadow(0 2px 6px rgba(0,0,0,0.8))"
                }}>
                    © {new Date().getFullYear()} X-Ortho · TLC DME LLC · Better DME · Better Outcomes
                </p>
            </div>
        </main>
    );
}