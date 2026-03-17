"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

const BASE = "https://res.cloudinary.com/di7znsrrr";
const CLD = {
    logo: `${BASE}/image/upload/logo`,
    sectionhero: `${BASE}/video/upload/section-hero`,
    XoBootHero: `${BASE}/image/upload/XoBoot-Hero`,
    kneeProduct2: `${BASE}/image/upload/knee-product-2`,
};

export default function ComingSoon() {
    const logoRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const scanRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const scan = scanRef.current;
        if (scan) {
            gsap.fromTo(scan,
                { top: "0%", opacity: 0 },
                {
                    top: "100%", opacity: 0.6, duration: 4, ease: "none", repeat: -1, repeatDelay: 2,
                    onRepeat: () => { gsap.set(scan, { top: "0%", opacity: 0 }); }
                }
            );
        }
        const tl = gsap.timeline({ delay: 0.2 });
        tl.fromTo(logoRef.current,
            { opacity: 0, y: -40, scale: 0.85, filter: "blur(12px)" },
            { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "expo.out" }
        );
        tl.fromTo(".anim",
            { opacity: 0, y: 50, filter: "blur(8px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0, ease: "expo.out", stagger: 0.12 },
            "-=0.6"
        );
        tl.fromTo(formRef.current,
            { opacity: 0, y: 30, scale: 0.97 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.4)" },
            "-=0.3"
        );
        gsap.fromTo(".float-boot", { opacity: 0, x: 80 }, { opacity: 0.80, x: 0, duration: 2.0, ease: "expo.out", delay: 1.2 });
        gsap.fromTo(".float-knee", { opacity: 0, x: -80 }, { opacity: 0.72, x: 0, duration: 2.0, ease: "expo.out", delay: 1.4 });
        gsap.to(".float-boot", { y: -22, duration: 4.5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2 });
        gsap.to(".float-knee", { y: -16, duration: 3.8, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.4 });
        gsap.to(".center-glow", { opacity: 0.28, duration: 2.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to(".bracket", { opacity: 0.7, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.4 });
    }, []);

    return (
        <main className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
            style={{ background: "#020916" }}>

            <video src={CLD.sectionhero} autoPlay loop muted playsInline
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{ opacity: 0.22, zIndex: 0 }} />

            <div className="absolute inset-0 pointer-events-none" style={{
                zIndex: 1,
                backgroundImage: "linear-gradient(rgba(17,17,132,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.06) 1px,transparent 1px)",
                backgroundSize: "52px 52px"
            }} />

            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "radial-gradient(ellipse at 50% 40%, transparent 18%, rgba(2,9,22,0.88) 100%)" }} />
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "linear-gradient(to bottom, rgba(2,9,22,0.45) 0%, transparent 25%, transparent 70%, rgba(2,9,22,0.65) 100%)" }} />
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "linear-gradient(to right, rgba(2,9,22,0.60) 0%, transparent 22%, transparent 78%, rgba(2,9,22,0.60) 100%)" }} />

            <div className="center-glow absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "radial-gradient(ellipse at 50% 52%, rgba(22,81,209,0.40) 0%, rgba(91,155,255,0.10) 40%, transparent 65%)", opacity: 0.28 }} />

            <div ref={scanRef} className="absolute inset-x-0 pointer-events-none" style={{
                zIndex: 2, height: 1,
                background: "linear-gradient(90deg, transparent, rgba(91,155,255,0.6) 30%, rgba(91,155,255,0.9) 50%, rgba(91,155,255,0.6) 70%, transparent)",
                boxShadow: "0 0 12px rgba(91,155,255,0.5)", opacity: 0
            }} />

            <div className="absolute top-0 inset-x-0 h-px pointer-events-none" style={{
                zIndex: 3,
                background: "linear-gradient(90deg, transparent, rgba(91,155,255,0.6), transparent)"
            }} />
            <div className="absolute bottom-0 inset-x-0 h-px pointer-events-none" style={{
                zIndex: 3,
                background: "linear-gradient(90deg, transparent, rgba(91,155,255,0.3), transparent)"
            }} />

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

            <div className="float-boot absolute pointer-events-none hidden xl:block"
                style={{ right: "-3%", bottom: "-2%", zIndex: 4, opacity: 0 }}>
                <div style={{ position: "absolute", inset: -60, background: "radial-gradient(ellipse at center, rgba(22,81,209,0.45) 0%, transparent 65%)", filter: "blur(50px)", zIndex: 0 }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={CLD.XoBootHero} alt="" style={{
                    position: "relative", zIndex: 1, width: 560, height: 560, objectFit: "contain",
                    filter: "drop-shadow(0 0 80px rgba(22,81,209,0.85)) drop-shadow(0 0 30px rgba(91,155,255,0.65)) brightness(1.1)"
                }} />
            </div>

            <div className="float-knee absolute pointer-events-none hidden xl:block"
                style={{ left: "1%", top: "12%", zIndex: 4, opacity: 0 }}>
                <div style={{ position: "absolute", inset: -50, background: "radial-gradient(ellipse at center, rgba(22,81,209,0.40) 0%, transparent 65%)", filter: "blur(40px)", zIndex: 0 }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={CLD.kneeProduct2} alt="" style={{
                    position: "relative", zIndex: 1, width: 380, height: 380, objectFit: "contain",
                    filter: "drop-shadow(0 0 70px rgba(22,81,209,0.85)) drop-shadow(0 0 24px rgba(91,155,255,0.65)) brightness(1.12)"
                }} />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center px-5 w-full max-w-3xl mx-auto gap-7 py-24">

                <div ref={logoRef} style={{ opacity: 0 }}>
                    <Image src={CLD.logo} alt="X-Ortho" width={130} height={130} className="object-contain mx-auto"
                        style={{ filter: "drop-shadow(0 0 40px rgba(91,155,255,0.55)) drop-shadow(0 0 80px rgba(22,81,209,0.3))" }} />
                </div>

                <div ref={textRef} className="flex flex-col items-center gap-5">
                    <div className="anim inline-flex items-center gap-2.5 text-[10px] uppercase tracking-[0.45em] font-bold px-5 py-2 rounded-full"
                        style={{
                            opacity: 0, background: "linear-gradient(135deg, rgba(22,81,209,0.2), rgba(91,155,255,0.1))",
                            border: "1px solid rgba(91,155,255,0.3)", color: "#5b9bff",
                            boxShadow: "0 0 20px rgba(22,81,209,0.2), inset 0 1px 0 rgba(255,255,255,0.06)"
                        }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5b9bff] animate-pulse" style={{ boxShadow: "0 0 8px rgba(91,155,255,0.8)" }} />
                        X-Ortho · Coming Soon
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5b9bff] animate-pulse" style={{ boxShadow: "0 0 8px rgba(91,155,255,0.8)" }} />
                    </div>

                    <h1 className="anim font-nexa uppercase leading-[0.88]"
                        style={{ opacity: 0, fontSize: "clamp(2.2rem,6vw,5.5rem)", fontWeight: 800, letterSpacing: "-2px" }}>
                        <span className="block text-[#f0f4ff]"
                            style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.6))" }}>
                            Something
                        </span>
                        <span className="block" style={{
                            background: "linear-gradient(180deg, #e8e8e8 0%, #a8a8a8 30%, #d0d0d0 50%, #787878 65%, #c0c0c0 80%, #8a8a8a 100%)",
                            WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent", backgroundClip: "text",
                            filter: "drop-shadow(0 1px 0 rgba(255,255,255,0.6)) drop-shadow(0 -1px 0 rgba(0,0,0,0.5)) drop-shadow(0 4px 12px rgba(0,0,0,0.7))", paddingTop: "10px"
                        }}>Big</span>
                        <span className="block" style={{
                            background: "linear-gradient(180deg, #1a6fd4 0%, #0d4fa8 35%, #1565c8 55%, #0a3d8a 80%, #1251b0 100%)",
                            WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent", backgroundClip: "text",
                            filter: "drop-shadow(0 1px 0 rgba(91,155,255,0.6)) drop-shadow(0 -1px 0 rgba(0,0,30,0.7)) drop-shadow(0 4px 12px rgba(0,0,0,0.7))", paddingTop: "10px"
                        }}>Is Coming.</span>
                    </h1>

                    <p className="anim text-white/50 text-sm md:text-base leading-relaxed max-w-lg border-l-[3px] pl-4 text-left"
                        style={{ opacity: 0, borderColor: "rgba(91,155,255,0.3)" }}>
                        X-Ortho is launching soon —{" "}
                        <span className="text-white/75 font-semibold">Better DME. Better Functionality. Better Outcomes.</span>{" "}
                        Be the first to know when we go live.
                    </p>

                    <div className="anim grid grid-cols-3 gap-3 w-full max-w-lg" style={{ opacity: 0 }}>
                        {["Better DME", "Better Functionality", "Better Outcomes"].map((t, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 px-3 py-4 rounded-2xl relative overflow-hidden group transition-all duration-300"
                                style={{ background: "linear-gradient(145deg, rgba(22,81,209,0.18) 0%, rgba(6,10,35,0.7) 100%)", border: "1px solid rgba(91,155,255,0.22)", boxShadow: "0 4px 20px rgba(22,81,209,0.15), inset 0 1px 0 rgba(91,155,255,0.12)", backdropFilter: "blur(12px)" }}>
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                    style={{ background: "radial-gradient(ellipse at center, rgba(22,81,209,0.2) 0%, transparent 70%)" }} />
                                <div className="w-2 h-2 rounded-full" style={{ background: "#5b9bff", boxShadow: "0 0 10px rgba(91,155,255,0.9), 0 0 20px rgba(91,155,255,0.4)" }} />
                                <span className="text-[10px] uppercase tracking-wider font-bold text-white/60 leading-tight text-center">{t}</span>
                            </div>
                        ))}
                    </div>

                    <div className="anim w-full flex items-center gap-3 max-w-lg" style={{ opacity: 0 }}>
                        <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(91,155,255,0.25))" }} />
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "rgba(91,155,255,0.5)" }} />
                        <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(91,155,255,0.25))" }} />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <p className="text-[10px] uppercase tracking-[0.4em] font-bold" style={{ color: "rgba(255,255,255,0.18)" }}>Available Exclusively Through</p>
                    <div className="flex items-center gap-4 flex-wrap justify-center">
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>TLC DME LLC</span>
                        <div className="w-px h-3 bg-white/15" />
                        <a href="tel:8885218522" className="text-xs font-semibold transition-all duration-200" style={{ color: "rgba(91,155,255,0.55)" }}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#5b9bff"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(91,155,255,0.55)"; }}>
                            (888) 521-8522
                        </a>
                        <div className="w-px h-3 bg-white/15" />
                        <a href="https://tlcdme.com" target="_blank" rel="noopener noreferrer"
                            className="text-xs font-semibold transition-all duration-200" style={{ color: "rgba(91,155,255,0.55)" }}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#5b9bff"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(91,155,255,0.55)"; }}>
                            tlcdme.com
                        </a>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-6 inset-x-0 flex justify-center pointer-events-none" style={{ zIndex: 3 }}>
                <p className="text-[10px] uppercase tracking-[0.4em] font-bold" style={{ color: "rgba(255,255,255,0.08)" }}>
                    © {new Date().getFullYear()} X-Ortho · TLC DME LLC · Better DME · Better Outcomes
                </p>
            </div>
        </main>
    );
}