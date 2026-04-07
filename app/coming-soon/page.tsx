"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

import { CLD } from "@/lib/cloudinary";

const MORPH_IMAGES = [
    { src: CLD.xoBootShortComingSoon, label: "XO Boot Short" },
    { src: CLD.xoBootTallComingSoon, label: "XO Boot Tall" },
    { src: CLD.xoKneeHingedComingSoon, label: "XO Knee Support" },
    { src: CLD.xoBackComingSoon, label: "XO Back Support" },
];

function MorphCarousel() {
    const [current, setCurrent] = useState(0);
    const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
    const labelRef = useRef<HTMLParagraphElement>(null);

    // Preload all images first
    useEffect(() => {
        MORPH_IMAGES.forEach(img => {
            const i = new window.Image();
            i.src = img.src;
        });
    }, []);

    // GSAP morph on current change
    useEffect(() => {
        imgRefs.current.forEach((el, i) => {
            if (!el) return;
            if (i === current) {
                gsap.to(el, { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "power2.out" });
            } else {
                gsap.to(el, { opacity: 0, scale: 0.88, y: 14, duration: 0.5, ease: "power2.in" });
            }
        });
        if (labelRef.current) {
            gsap.fromTo(labelRef.current,
                { opacity: 0, y: 6 },
                { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", delay: 0.3 }
            );
        }
    }, [current]);

    useEffect(() => {
        const id = setInterval(() => {
            setCurrent(p => (p + 1) % MORPH_IMAGES.length);
        }, 2500);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-5">
            <div className="relative w-full flex-1 flex items-center justify-center" style={{ minHeight: 0 }}>
                <style>{`
                    @keyframes jelly {
                        0%   { transform: scale(1, 1); }
                        25%  { transform: scale(0.97, 1.03); }
                        50%  { transform: scale(1.03, 0.97); }
                        75%  { transform: scale(0.99, 1.01); }
                        100% { transform: scale(1, 1); }
                    }
                    .glow-jelly { animation: jelly 2.8s ease-in-out infinite; }
                `}</style>
                {/* Jelly glow orb behind product */}
                <div className="glow-jelly" style={{
                    position: "absolute", width: "55%", height: "55%", borderRadius: "50%",
                    background: "radial-gradient(ellipse at center, rgba(91,155,255,0.38) 0%, rgba(22,81,209,0.22) 45%, transparent 70%)",
                    filter: "blur(32px)", zIndex: 0,
                }} />
                {MORPH_IMAGES.map((img, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={i}
                        ref={el => { imgRefs.current[i] = el; }}
                        src={img.src} alt={img.label}
                        style={{
                            position: "absolute", width: "85%", maxHeight: "85%", objectFit: "contain",
                            opacity: i === 0 ? 1 : 0,
                            willChange: "transform, opacity",
                            zIndex: 1,
                            filter: "drop-shadow(0 0 40px rgba(91,155,255,0.8)) drop-shadow(0 20px 60px rgba(22,81,209,0.7)) drop-shadow(0 4px 20px rgba(0,0,0,0.5))",
                        }} />
                ))}
            </div>
            <p ref={labelRef} className="text-[11px] uppercase tracking-[0.35em] font-bold" style={{ color: "rgba(91,155,255,0.6)" }}>
                {MORPH_IMAGES[current].label}
            </p>
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
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // FIX 1: mounted state for hydration-safe year rendering
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

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

    // ── Canvas animated background ──
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let W = canvas.width = window.innerWidth;
        let H = canvas.height = window.innerHeight;
        const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
        window.addEventListener("resize", resize);

        const orbs = Array.from({ length: 6 }, (_, i) => ({
            x: Math.random() * W, y: Math.random() * H,
            r: 180 + Math.random() * 220,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            hue: i % 2 === 0 ? 220 : 210,
            alpha: 0.04 + Math.random() * 0.05,
        }));

        const stars = Array.from({ length: 120 }, () => ({
            x: Math.random() * W, y: Math.random() * H,
            r: Math.random() * 1.2,
            alpha: 0.2 + Math.random() * 0.6,
            speed: 0.002 + Math.random() * 0.006,
            offset: Math.random() * Math.PI * 2,
        }));

        let frame = 0;
        let rafId: number;

        const draw = () => {
            rafId = requestAnimationFrame(draw);
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = "#03102a";
            ctx.fillRect(0, 0, W, H);

            orbs.forEach(o => {
                o.x += o.vx; o.y += o.vy;
                if (o.x < -o.r) o.x = W + o.r;
                if (o.x > W + o.r) o.x = -o.r;
                if (o.y < -o.r) o.y = H + o.r;
                if (o.y > H + o.r) o.y = -o.r;
                const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
                // FIX 2: missing closing ) in hsla
                g.addColorStop(0, `hsla(${o.hue},70%,60%,${o.alpha * 0.7})`);
                g.addColorStop(1, `hsla(${o.hue},80%,55%,0)`);
                ctx.beginPath();
                ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
                ctx.fillStyle = g;
                ctx.fill();
            });

            frame++;
            stars.forEach(st => {
                const a = st.alpha * (0.5 + 0.5 * Math.sin(frame * st.speed + st.offset));
                ctx.beginPath();
                ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(180,210,255,${a})`;
                ctx.fill();
            });

            ctx.strokeStyle = "rgba(17,17,132,0.06)";
            ctx.lineWidth = 1;
            for (let x = 0; x < W; x += 52) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
            }
            for (let y = 0; y < H; y += 52) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
            }
        };

        draw();
        return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", resize); };
    }, []);

    return (
        // FIX 3: h-screen h-[100dvh] → style height:100dvh to avoid hydration mismatch
        <main className="relative w-full overflow-hidden bg-[#020916]" style={{ height: "100dvh" }}>

            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0, width: "100%", height: "100%" }} />

            <div className="absolute inset-0 pointer-events-none" style={{
                zIndex: 1,
                background: "radial-gradient(ellipse at 50% 40%, transparent 35%, rgba(2,9,22,0.65) 100%)"
            }} />
            <div className="center-glow absolute inset-0 pointer-events-none" style={{
                zIndex: 1,
                background: "radial-gradient(ellipse at 50% 50%, rgba(22,81,209,0.22) 0%, transparent 60%)", opacity: 0.15
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
            <div className="relative z-10 flex flex-col lg:flex-row w-full h-full px-4 sm:px-6 md:px-12 pt-4 pb-20 lg:pt-6 lg:pb-6 gap-2 sm:gap-4 lg:gap-8 items-center">

                {/* LEFT — Logo + Content */}
                <div className="flex flex-col justify-center flex-none lg:flex-1 h-auto lg:h-full py-1 lg:py-2 min-w-0 w-full pl-5">

                    <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5 pt-2 lg:pt-8 items-center lg:items-start text-center lg:text-left w-full">

                        {/* Logo */}
                        <div className="cs-logo w-full max-w-[280px] sm:max-w-[340px] md:max-w-[650px] mx-auto lg:mx-0 -mt-[10px] lg:-mt-[80px]" style={{ opacity: 0 }}>
                            <Image src={CLD.footerLogo} alt="X-Ortho" width={660} height={220} className="object-contain w-full h-auto"
                                style={{ filter: "drop-shadow(0 0 40px rgba(91,155,255,0.5)) drop-shadow(0 0 80px rgba(22,81,209,0.3))" }} />
                        </div>

                        {/* Headline */}
                        <h1 className="cs-anim font-nexa uppercase text-center lg:text-left leading-tight pt-2 lg:pt-10"
                            style={{ opacity: 0, fontSize: "clamp(1.15rem, 4vw, 3.2rem)", fontWeight: 800, letterSpacing: "-1px" }}>
                            <span className="block" style={{
                                backgroundImage: "linear-gradient(180deg, #1a6fd4 0%, #0d4fa8 35%, #1565c8 55%, #0a3d8a 80%, #1251b0 100%)",
                                WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent", backgroundClip: "text",
                                filter: "drop-shadow(0 1px 0 rgba(91,155,255,0.5)) drop-shadow(0 -1px 0 rgba(0,0,30,0.6))"
                            }}>Most Advanced.</span>
                            <span className="block" style={{
                                backgroundImage: "linear-gradient(180deg, #f0f0f0 0%, #ffffff 20%, #e8e8e8 35%, #ffffff 50%, #d0d0d0 65%, #e1e1e1 80%, #c8c8c8 100%)",
                                WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent", backgroundClip: "text",
                                filter: "drop-shadow(0 1px 0 rgba(255,255,255,0.6)) drop-shadow(0 -1px 0 rgba(0,0,0,0.5))"
                            }}>Most Sophisticated.</span>
                            <span className="block" style={{
                                backgroundImage: "linear-gradient(180deg, #1a6fd4 0%, #0d4fa8 35%, #1565c8 55%, #0a3d8a 80%, #1251b0 100%)",
                                WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent", backgroundClip: "text",
                                filter: "drop-shadow(0 1px 0 rgba(91,155,255,0.5)) drop-shadow(0 -1px 0 rgba(0,0,30,0.6))"
                            }}>Most Anticipated.</span>
                        </h1>

                        {/* Pills */}
                        <div className="cs-anim flex flex-wrap justify-center lg:justify-start gap-1.5 lg:gap-2 max-w-md mx-auto lg:mx-0 mt-1 lg:mt-2" style={{ opacity: 0 }}>
                            {["Better Design", "Better Quality", "Better Functionality", "Better Clinical Outcomes", "Better Financial Outcomes", "Better DME"].map((t, i) => (
                                <span key={i} className="text-[11px] lg:text-[12px] uppercase tracking-wider font-bold px-3 py-1.5 lg:px-4 lg:py-2 rounded-full"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(22,81,209,0.20), rgba(6,10,35,0.7))",
                                        border: "1px solid rgba(91,155,255,0.22)", color: "rgba(91,155,255,0.9)", backdropFilter: "blur(8px)"
                                    }}>
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT — Morphing carousel */}
                <div className="cs-panels relative w-full flex-1 lg:w-[42%] lg:h-[85vh] min-h-0 shrink-0 pr-0 lg:pr-[30px] mt-2 lg:mt-0" style={{ opacity: 0 }}>
                    <div className="absolute top-0 lg:top-4 left-0 lg:left-5 w-full lg:w-auto text-center lg:text-left z-10 pointer-events-none">
                        <span className="text-[10px] uppercase tracking-[0.35em] font-bold pl-0 lg:pl-[240px]" style={{ color: "rgba(91,155,255,0.5)" }}>
                            X-Ortho Products
                        </span>
                    </div>
                    <MorphCarousel />
                </div>

            </div>

            {/* Contact bottom */}
            <div className="absolute bottom-4 left-0 right-0 z-20 flex flex-col items-center justify-center gap-1.5 w-full text-center pointer-events-auto pb-2 px-4">
                <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-white/40 text-[10px] sm:text-[11px] px-2">
                    <span className="whitespace-nowrap">
                        Email <a href="mailto:info@xortho.com" className="text-[#5b9bff]/80 hover:text-[#5b9bff] transition-colors font-semibold">info@xortho.com</a>
                    </span>
                    <span className="hidden sm:inline">or call</span>
                    <span className="sm:hidden text-white/20">|</span>
                    <span className="whitespace-nowrap">
                        <a href="tel:8559678461" className="text-[#5b9bff]/80 hover:text-[#5b9bff] transition-colors font-semibold">855.XORTHO1</a>
                    </span>
                    <span className="hidden sm:inline">·</span>
                    <span className="sm:hidden text-white/20">|</span>
                    <span className="whitespace-nowrap">HCPCS coding · pricing · samples</span>
                </div>
                {mounted && (
                    <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.35em] font-bold mt-1" style={{ color: "rgba(255,255,255,0.15)" }}>
                        © {new Date().getFullYear()} X-Ortho · TLC DME LLC
                    </p>
                )}
            </div>
        </main>
    );
}