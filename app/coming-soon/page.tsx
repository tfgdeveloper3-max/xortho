"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import Image from "next/image";

const BASE = "https://res.cloudinary.com/di7znsrrr";
const CLD = {
    footerLogo: `${BASE}/image/upload/footer-logo`,
    sectionhero: `${BASE}/video/upload/section_hero`,
    xoBootShort: `${BASE}/image/upload/xo-boot-short`,
    xoBootTall: `${BASE}/image/upload/xo-boot-tall`,
    xoBackSupport: `${BASE}/image/upload/xo-back`,
    xoKneeHinged: `${BASE}/image/upload/xo-knee-hinged`,
};

// Left side morphing images
const MORPH_IMAGES = [
    { src: CLD.xoBootShort, label: "XO Boot Short" },
    { src: CLD.xoBootTall, label: "XO Boot Tall" },
    { src: CLD.xoKneeHinged, label: "XO Knee Support" },
    { src: CLD.xoBackSupport, label: "XO Back Support" },
];

// 3D Viewer for right side
function Viewer3D() {
    const imgRef = useRef<HTMLImageElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const rotX = useRef(0);
    const rotY = useRef(0);
    const velX = useRef(0);
    const velY = useRef(0);
    const dragging = useRef(false);
    const lastPos = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number>(0);

    const applyTransform = useCallback(() => {
        if (!imgRef.current) return;
        imgRef.current.style.transform = `rotateX(${rotX.current.toFixed(2)}deg) rotateY(${rotY.current.toFixed(2)}deg)`;
    }, []);

    const inertia = useCallback(() => {
        velX.current *= 0.88;
        velY.current *= 0.88;
        rotY.current += velX.current;
        rotX.current = Math.max(-40, Math.min(40, rotX.current + velY.current));
        applyTransform();
        if (Math.abs(velX.current) > 0.01 || Math.abs(velY.current) > 0.01)
            rafRef.current = requestAnimationFrame(inertia);
    }, [applyTransform]);

    const startDrag = (x: number, y: number) => {
        dragging.current = true;
        lastPos.current = { x, y };
        velX.current = 0; velY.current = 0;
        cancelAnimationFrame(rafRef.current);
        if (stageRef.current) stageRef.current.style.cursor = "grabbing";
    };
    const moveDrag = (x: number, y: number) => {
        if (!dragging.current) return;
        velX.current = (x - lastPos.current.x) * 0.4;
        velY.current = -(y - lastPos.current.y) * 0.4;
        rotY.current += velX.current;
        rotX.current = Math.max(-40, Math.min(40, rotX.current + velY.current));
        lastPos.current = { x, y };
        applyTransform();
    };
    const endDrag = () => {
        dragging.current = false;
        if (stageRef.current) stageRef.current.style.cursor = "grab";
        rafRef.current = requestAnimationFrame(inertia);
    };

    // Auto slow rotate
    useEffect(() => {
        let id: number;
        const autoRotate = () => {
            if (!dragging.current) {
                rotY.current += 0.3;
                applyTransform();
            }
            id = requestAnimationFrame(autoRotate);
        };
        id = requestAnimationFrame(autoRotate);
        return () => { cancelAnimationFrame(id); cancelAnimationFrame(rafRef.current); };
    }, [applyTransform]);

    return (
        <div ref={stageRef}
            className="relative w-full h-full flex items-center justify-center rounded-3xl overflow-hidden select-none"
            style={{
                cursor: "grab", perspective: "900px",
                background: "linear-gradient(145deg, rgba(6,10,35,0.8) 0%, rgba(12,22,65,0.6) 100%)",
                border: "1px solid rgba(91,155,255,0.15)",
                boxShadow: "0 0 60px rgba(22,81,209,0.15), inset 0 1px 0 rgba(255,255,255,0.04)"
            }}
            onMouseDown={e => startDrag(e.clientX, e.clientY)}
            onMouseMove={e => moveDrag(e.clientX, e.clientY)}
            onMouseUp={endDrag} onMouseLeave={endDrag}
            onTouchStart={e => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchMove={e => moveDrag(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchEnd={endDrag}>
            {/* Glow */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at center bottom, rgba(22,81,209,0.25) 0%, transparent 65%)" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={imgRef} src={CLD.xoBootTall} alt="XO Boot Tall 3D"
                draggable={false}
                style={{
                    width: "82%", maxHeight: "82%", objectFit: "contain",
                    transformStyle: "preserve-3d", willChange: "transform",
                    filter: "drop-shadow(0 20px 60px rgba(22,81,209,0.55)) drop-shadow(0 4px 20px rgba(0,0,0,0.5))"
                }} />
            <div className="absolute bottom-4 inset-x-0 text-center pointer-events-none">
                <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "rgba(91,155,255,0.4)" }}>
                    Drag to rotate
                </span>
            </div>
        </div>
    );
}

// Left morphing carousel
function MorphCarousel() {
    const [current, setCurrent] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrent(p => (p + 1) % MORPH_IMAGES.length);
        }, 2500);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, []);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-5">
            {/* Image display */}
            <div className="relative w-full flex-1 flex items-center justify-center" style={{ minHeight: 0 }}>
                {MORPH_IMAGES.map((img, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={i} src={img.src} alt={img.label}
                        style={{
                            position: "absolute", width: "85%", maxHeight: "85%", objectFit: "contain",
                            opacity: current === i ? 1 : 0,
                            transform: current === i ? "scale(1) translateY(0)" : "scale(0.92) translateY(16px)",
                            transition: "opacity 0.6s ease, transform 0.6s ease",
                            filter: "drop-shadow(0 20px 50px rgba(22,81,209,0.5)) drop-shadow(0 4px 16px rgba(0,0,0,0.4))",
                        }} />
                ))}
            </div>
            {/* Label */}
            <p className="text-[11px] uppercase tracking-[0.35em] font-bold" style={{ color: "rgba(91,155,255,0.6)" }}>
                {MORPH_IMAGES[current].label}
            </p>
            {/* Dots */}
            <div className="flex items-center gap-2">
                {MORPH_IMAGES.map((_, i) => (
                    <button key={i} onClick={() => setCurrent(i)}
                        className="rounded-full transition-all duration-300"
                        style={{
                            width: current === i ? 20 : 6, height: 6,
                            background: current === i ? "linear-gradient(90deg,#1651D1,#5b9bff)" : "rgba(255,255,255,0.2)"
                        }} />
                ))}
            </div>
        </div>
    );
}

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
        tl.fromTo(".cs-logo", { opacity: 0, y: -20, filter: "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.4, ease: "expo.out" });
        tl.fromTo(".cs-anim", { opacity: 0, y: 16, filter: "blur(4px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.35, ease: "expo.out", stagger: 0.04 }, "-=0.3");
        tl.fromTo(".cs-panels", { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.2");

        gsap.to(".center-glow", { opacity: 0.30, duration: 2.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to(".bracket", { opacity: 0.7, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.4 });
    }, []);

    return (
        <main className="relative w-full h-screen h-[100dvh] overflow-y-auto lg:overflow-hidden bg-[#020916]">

            <video src={CLD.sectionhero} autoPlay loop muted playsInline
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{ opacity: 0.15, zIndex: 0 }} />

            <div className="absolute inset-0 pointer-events-none" style={{
                zIndex: 1,
                backgroundImage: "linear-gradient(rgba(17,17,132,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.05) 1px,transparent 1px)",
                backgroundSize: "52px 52px"
            }} />
            <div className="absolute inset-0 pointer-events-none" style={{
                zIndex: 1,
                background: "radial-gradient(ellipse at 50% 40%, transparent 25%, rgba(2,9,22,0.85) 100%)"
            }} />
            <div className="center-glow absolute inset-0 pointer-events-none" style={{
                zIndex: 1,
                background: "radial-gradient(ellipse at 50% 50%, rgba(22,81,209,0.30) 0%, transparent 60%)", opacity: 0.18
            }} />

            <div ref={scanRef} className="absolute inset-x-0 pointer-events-none" style={{
                zIndex: 2, height: 1,
                background: "linear-gradient(90deg, transparent, rgba(91,155,255,0.6) 30%, rgba(91,155,255,0.9) 50%, rgba(91,155,255,0.6) 70%, transparent)",
                boxShadow: "0 0 12px rgba(91,155,255,0.5)", opacity: 0
            }} />

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

            {/* ══ LAYOUT ══ */}
            <div className="relative z-10 flex flex-col lg:flex-row w-full h-full px-4 md:px-8 py-6 gap-6 items-center justify-between">
                
                {/* LEFT — Morphing images */}
                <div className="cs-panels relative w-full lg:w-[28%] h-[35vh] lg:h-full rounded-3xl overflow-hidden shrink-0"
                    style={{
                        opacity: 0,
                        background: "linear-gradient(145deg, rgba(6,10,35,0.85) 0%, rgba(12,22,65,0.65) 100%)",
                        border: "1px solid rgba(91,155,255,0.14)", boxShadow: "0 8px 40px rgba(22,81,209,0.12)"
                    }}>
                    <div className="absolute top-4 left-5 z-10 pointer-events-none">
                        <span className="text-[10px] uppercase tracking-[0.35em] font-bold" style={{ color: "rgba(91,155,255,0.5)" }}>
                            X-Ortho Products
                        </span>
                    </div>
                    <MorphCarousel />
                </div>

                {/* CENTER — Text and Logo */}
                <div className="flex flex-col items-center justify-between flex-1 h-full py-2 min-w-0">
                    
                    {/* Top half center (Logo, text) */}
                    <div className="flex flex-col items-center gap-4 pt-4 lg:pt-8 w-full">

                        {/* Logo big */}
                        <div className="cs-logo" style={{ opacity: 0 }}>
                            <Image src={CLD.footerLogo} alt="X-Ortho" width={380} height={280} className="object-contain"
                                style={{ filter: "drop-shadow(0 0 50px rgba(91,155,255,0.6)) drop-shadow(0 0 100px rgba(22,81,209,0.35))" }} />
                        </div>

                        {/* Badge */}
                        <div className="cs-anim inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-bold px-4 py-1.5 rounded-full"
                            style={{ opacity: 0, background: "rgba(22,81,209,0.15)", border: "1px solid rgba(91,155,255,0.28)", color: "#5b9bff" }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#5b9bff] animate-pulse" />
                            Coming Soon
                        </div>

                        {/* Headline — "Most" lines */}
                        <h1 className="cs-anim font-nexa uppercase text-left leading-tight"
                            style={{ opacity: 0, fontSize: "clamp(1.2rem, 2.5vw, 2.8rem)", fontWeight: 800, letterSpacing: "-1px" }}>
                            <span className="block text-white/90">The </span>
                            <span className="block" style={{
                                backgroundImage: "linear-gradient(180deg, #1a6fd4 0%, #0d4fa8 35%, #1565c8 55%, #0a3d8a 80%, #1251b0 100%)",
                                WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent", backgroundClip: "text",
                                filter: "drop-shadow(0 1px 0 rgba(91,155,255,0.5)) drop-shadow(0 -1px 0 rgba(0,0,30,0.6))"
                            }}>Most Advanced.</span>
                            <span className="block" style={{
                                backgroundImage: "linear-gradient(180deg, #f0f0f0 0%, #b8b8b8 20%, #e8e8e8 35%, #787878 50%, #d0d0d0 65%, #909090 80%, #c8c8c8 100%)",
                                WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent", backgroundClip: "text",
                                filter: "drop-shadow(0 1px 0 rgba(255,255,255,0.6)) drop-shadow(0 -1px 0 rgba(0,0,0,0.5)) drop-shadow(0 2px 6px rgba(0,0,0,0.8))"
                            }}>Most Sophisticated.</span>
                            <span className="block" style={{
                                backgroundImage: "linear-gradient(180deg, #1a6fd4 0%, #0d4fa8 35%, #1565c8 55%, #0a3d8a 80%, #1251b0 100%)",
                                WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent", backgroundClip: "text",
                                filter: "drop-shadow(0 1px 0 rgba(91,155,255,0.5)) drop-shadow(0 -1px 0 rgba(0,0,30,0.6))"
                            }}>Most Anticipated.</span>
                        </h1>

                        {/* Better pills */}
                        <div className="cs-anim flex flex-wrap justify-center gap-2 max-w-lg mt-2" style={{ opacity: 0 }}>
                            {["Better Design", "Better Quality", "Better Functionality", "Better Clinical Outcomes", "Better Financial Outcomes", "Better DME"].map((t, i) => (
                                <span key={i} className="text-[9px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(22,81,209,0.20), rgba(6,10,35,0.7))",
                                        border: "1px solid rgba(91,155,255,0.22)", color: "rgba(91,155,255,0.85)", backdropFilter: "blur(8px)"
                                    }}>
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* BOTTOM — Contact */}
                    <div className="flex flex-col items-center gap-3 pb-2 pt-6">
                        <p className="text-white/30 text-[11px] text-center max-w-md">
                            Email{" "}
                            <a href="mailto:info@xortho.com" className="text-[#5b9bff]/70 hover:text-[#5b9bff] transition-colors font-semibold">info@xortho.com</a>
                            {" "}or call{" "}
                            <a href="tel:8559678461" className="text-[#5b9bff]/70 hover:text-[#5b9bff] transition-colors font-semibold">855.XORTHO1</a>
                            <br className="hidden md:block"/> for a customized proposal · HCPCS coding · pricing · samples
                        </p>

                        <p className="text-[9px] uppercase tracking-[0.35em] font-bold mt-2" style={{ color: "rgba(255,255,255,0.12)" }}>
                            © {new Date().getFullYear()} X-Ortho · TLC DME LLC
                        </p>
                    </div>
                </div>

                {/* RIGHT — 3D Viewer */}
                <div className="cs-panels relative w-full lg:w-[28%] h-[35vh] lg:h-full rounded-3xl overflow-hidden shrink-0" style={{ opacity: 0 }}>
                    <div className="absolute top-4 left-5 z-10 pointer-events-none">
                        <span className="text-[10px] uppercase tracking-[0.35em] font-bold" style={{ color: "rgba(91,155,255,0.5)" }}>
                            XO Boot · Interactive 3D
                        </span>
                    </div>
                    <Viewer3D />
                </div>

            </div>
        </main>
    );
}