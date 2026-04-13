"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { CLD } from "@/lib/cloudinary";

const PRODUCTS = {
    "boot-short": {
        name: "XO Boot Pneumatic", sub: "Short Walker", image: CLD.xoBootShort,
        tagline: "Better Design. Better Engineering. Better Quality.\nBetter Functionality. Better Patient Experience.\nBetter Outcomes. Better DME.",

        section1: {
            title: "World Class Aerodynamic Structure",
            body: "Technologically advanced aerodynamic & ergonomic engineering enhances structural integrity generating cast like stability & protection. Crafted with innovative materials to reduce weight & allow struts to flex, combined with a calf adjustment function to adapt to various anatomical differences. Safe step rocker absorbs shock & offloads pressure generating a fluid natural gait with increased traction control.",
            features: [
                { img: CLD.xoCage, title: "Flex Strut Armor", desc: "Flexible Lightweight\nDurable Protection" },
                { img: CLD.xoShell, title: "Anterior Shield", desc: "Removeable Pliable\nDorsal Protection" },
                { img: CLD.xoFrontView, title: "Posterior Calf Adjustment", desc: "Accommodates Larger\nWider Lower Legs" },
                { img: CLD.xoRocker, title: "Safe Step Rocker", desc: "Shock Absorption\nFluid Heel Toe Gait" },
            ],
        },
        section2: {
            title: "Revolutionary Compression System",
            body: "Purposefully placed compartmentalized air cells provide greater surface area contact, combined with a low force bulb & intuitive inflation deflation valve allows for controlled customization of compression. T-shirt soft interior liner regulates temperature & enhances comfort. EZ grip strapping system has textured tips with a hybrid hook loop strap & 360 swivel d-rings for quicker donning & doffing.",
            features: [
                { img: CLD.xoLiner, title: "Air Chamber System", desc: "Compartmentalized\nCustomization" },
                { img: CLD.xoRevolutionary, title: "Pneumatic System", desc: "Effortless & Rapid\nInflate & Deflate" },
                { img: CLD.xoStraps, title: "Strapping System", desc: "EZ Grip Textured\nTips & 360 Swivel" },
                { img: CLD.sleeves, title: "AFO Undersleeve", desc: "Gentle Compression\nSkin Barrier & Hygiene" },
            ],
        },
    },
    "boot-tall": {
        name: "XO Boot Pneumatic", sub: "Tall Walker", image: CLD.xoBootTall,
        tagline: "Better Design. Better Engineering. Better Quality.\nBetter Functionality. Better Patient Experience.\nBetter Outcomes. Better DME.",
        section1: {
            title: "World Class Aerodynamic Structure",
            body: "Technologically advanced aerodynamic & ergonomic engineering enhances structural integrity generating cast like stability & protection. Crafted with innovative materials to reduce weight & allow struts to flex, combined with a calf adjustment function to adapt to various anatomical differences. Safe step rocker absorbs shock & offloads pressure generating a fluid natural gait with increased traction control.",
            features: [
                { img: CLD.xoCage, title: "Flex Strut Armor", desc: "Flexible Lightweight\nDurable Protection" },
                { img: CLD.xoShell, title: "Anterior Shield", desc: "Removeable Pliable\nDorsal Protection" },
                { img: CLD.xoFrontView, title: "Posterior Calf Adjustment", desc: "Accommodates Larger\nWider Lower Legs" },
                { img: CLD.xoRocker, title: "Safe Step Rocker", desc: "Shock Absorption\nFluid Heel Toe Gait" },
            ],
        },
        section2: {
            title: "Revolutionary Compression System",
            body: "Purposefully placed compartmentalized air cells provide greater surface area contact, combined with a low force bulb & intuitive inflation deflation valve allows for controlled customization of compression. T-shirt soft interior liner regulates temperature & enhances comfort. EZ grip strapping system has textured tips with a hybrid hook loop strap & 360 swivel d-rings for quicker donning & doffing.",
            features: [
                { img: CLD.xoLiner, title: "Air Chamber System", desc: "Compartmentalized\nCustomization" },
                { img: CLD.xoRevolutionary, title: "Pneumatic System", desc: "Effortless & Rapid\nInflate & Deflate" },
                { img: CLD.xoStraps, title: "Strapping System", desc: "EZ Grip Textured\nTips & 360 Swivel" },
                { img: CLD.sleeves, title: "AFO Undersleeve", desc: "Gentle Compression\nSkin Barrier & Hygiene" },
            ],
        },
    },
};

type ProductId = "boot-short" | "boot-tall";

const blueMetallic: React.CSSProperties = {
    backgroundImage: "linear-gradient(180deg, #1a6fd4 0%, #0d4fa8 35%, #1565c8 55%, #0a3d8a 80%, #1251b0 100%)",
    WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent", backgroundClip: "text",
    filter: "drop-shadow(0 1px 0 rgba(91,155,255,0.5)) drop-shadow(0 -1px 0 rgba(0,0,30,0.6))",
};
const silverMetallic: React.CSSProperties = {
    backgroundImage: "linear-gradient(180deg, #f0f0f0 0%, #b8b8b8 20%, #e8e8e8 35%, #e8e8e8ff 50%, #d0d0d0 65%, #909090 80%, #c8c8c8 100%)",
    WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent", backgroundClip: "text",
};

// ── PRODUCT DETAIL PAGE ──
function ProductDetail({ id, onBack }: { id: ProductId; onBack: () => void }) {
    const p = PRODUCTS[id];
    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" style={{ background: "#020916" }}>
            <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(17,17,132,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.05) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
            <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(22,81,209,0.18) 0%, transparent 65%)" }} />
            <div className="fixed top-0 inset-x-0 h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(91,155,255,0.6), transparent)", zIndex: 60 }} />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-6 sm:py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 sm:mb-10">
                    {/* Desktop Logo */}
                    <Image src={CLD.footerLogo} alt="X-ORTHO" width={220} height={80}
                        className="h-10 sm:h-14 md:h-16 w-auto object-contain hidden sm:block"
                        style={{ filter: "drop-shadow(0 0 30px rgba(91,155,255,0.6))" }} />
                    {/* Mobile Logo */}
                    <Image src={CLD.logo} alt="X-ORTHO" width={80} height={80}
                        className="h-10 w-auto object-contain block sm:hidden"
                        style={{ filter: "drop-shadow(0 0 30px rgba(91,155,255,0.6))" }} />
                    <button onClick={onBack}
                        className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all"
                        style={{ border: "1px solid rgba(91,155,255,0.3)", color: "rgba(91,155,255,0.8)", background: "transparent" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(22,81,209,0.2)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}>
                        ← Back
                    </button>
                </div>

                {/* Main grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

                    {/* LEFT — product image + tagline */}
                    <div className="flex flex-col items-center justify-start pb-6 px-2 sm:px-4 relative">
                        <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: "min(500px,90vw)", height: "min(500px,90vw)", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(91,155,255,0.08) 45%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.image} alt={p.name} className="w-full relative"
                            style={{
                                maxWidth: "min(580px,92vw)",
                                height: "auto",
                                objectFit: "contain",
                                filter: "drop-shadow(0 0 60px rgba(91,155,255,0.85)) drop-shadow(0 40px 100px rgba(22,81,209,0.6))"
                            }} />
                        <div className="text-center mt-4 sm:mt-6 relative">
                            <h2 className="font-nexa font-black uppercase" style={{ fontSize: "clamp(1.6rem,4vw,3.5rem)", letterSpacing: "-1px" }}>
                                <span style={blueMetallic}>{p.name}</span>
                            </h2>
                            <p className="mt-3 sm:mt-5 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line" style={{ color: "rgba(255,255,255,0.65)" }}>{p.tagline}</p>
                        </div>
                    </div>

                    {/* RIGHT — features */}
                    <div className="flex flex-col gap-6 md:gap-10 py-2 md:py-4" style={{ borderTop: "1px solid rgba(91,155,255,0.10)" }}>

                        {/* Section 1 */}
                        <div className="px-0 sm:px-4 md:px-6">
                            <h3 className="font-nexa font-black uppercase text-center mb-3 sm:mb-5"
                                style={{ fontSize: "clamp(1rem,2.5vw,1.75rem)", ...blueMetallic }}>
                                {p.section1.title}
                            </h3>
                            <p className="text-xs sm:text-sm md:text-[15px] text-center leading-relaxed mb-4 sm:mb-8"
                                style={{ color: "rgba(255,255,255,0.60)" }}>
                                {p.section1.body}
                            </p>
                            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-6">
                                {p.section1.features.map((f, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2 sm:gap-4 p-3 sm:p-5 md:p-6 rounded-2xl"
                                        style={{ background: "rgba(8,12,42,0.7)", border: "1px solid rgba(91,155,255,0.15)" }}>
                                        <div className="relative flex items-center justify-center" style={{ width: "clamp(90px,14vw,150px)", height: "clamp(90px,14vw,150px)" }}>
                                            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)", filter: "blur(8px)" }} />
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={f.img} alt={f.title} className="relative"
                                                style={{ width: "85%", height: "85%", objectFit: "contain", filter: "drop-shadow(0 0 15px rgba(91,155,255,0.5))" }} />
                                        </div>
                                        <p className="font-bold text-center text-xs sm:text-sm uppercase tracking-wide text-white leading-tight">{f.title}</p>
                                        <p className="text-center text-[10px] sm:text-xs leading-snug whitespace-pre-line" style={{ color: "rgba(255,255,255,0.55)" }}>{f.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="h-px mx-0 sm:mx-4 md:mx-6" style={{ background: "linear-gradient(90deg, transparent, rgba(91,155,255,0.3), transparent)" }} />

                        {/* Section 2 */}
                        <div className="px-0 sm:px-4 md:px-6">
                            <h3 className="font-nexa font-black uppercase text-center mb-3 sm:mb-5"
                                style={{ fontSize: "clamp(1rem,2.5vw,1.75rem)", ...blueMetallic }}>
                                {p.section2.title}
                            </h3>
                            <p className="text-xs sm:text-sm md:text-[15px] text-center leading-relaxed mb-4 sm:mb-8"
                                style={{ color: "rgba(255,255,255,0.60)" }}>
                                {p.section2.body}
                            </p>
                            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-6">
                                {p.section2.features.map((f, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2 sm:gap-4 p-3 sm:p-5 md:p-6 rounded-2xl"
                                        style={{ background: "rgba(8,12,42,0.7)", border: "1px solid rgba(91,155,255,0.15)" }}>
                                        <div className="relative flex items-center justify-center" style={{ width: "clamp(90px,14vw,150px)", height: "clamp(90px,14vw,150px)" }}>
                                            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)", filter: "blur(8px)" }} />
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={f.img} alt={f.title} className="relative"
                                                style={{ width: "85%", height: "85%", objectFit: "contain", filter: "drop-shadow(0 0 15px rgba(91,155,255,0.5))" }} />
                                        </div>
                                        <p className="font-bold text-center text-xs sm:text-sm uppercase tracking-wide text-white leading-tight">{f.title}</p>
                                        <p className="text-center text-[10px] sm:text-xs leading-snug whitespace-pre-line" style={{ color: "rgba(255,255,255,0.55)" }}>{f.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom tagline */}
                <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 text-center" style={{ borderTop: "1px solid rgba(91,155,255,0.15)" }}>
                    <p className="font-nexa font-black uppercase text-base sm:text-xl" style={silverMetallic}>Better Design. Better Engineering. Better Quality.</p>
                    <p className="font-nexa font-black uppercase text-base sm:text-xl mt-1 sm:mt-2" style={blueMetallic}>Better Functionality. Better Patient Experience. Better Outcomes. Better DME.</p>
                    <p className="text-[9px] sm:text-xs uppercase tracking-[0.35em] mt-3 sm:mt-5" style={{ color: "rgba(255,255,255,0.20)" }}>
                        © {new Date().getFullYear()} X-Ortho · TLC DME LLC · info@xortho.com · 855.XORTHO1
                    </p>
                </div>
            </div>
        </div>
    );
}

// ── CORNER IMAGES ──
function CornerImages({ onProductClick }: { onProductClick: (id: ProductId) => void }) {
    const imgRef = useRef<(HTMLDivElement | null)[]>([]);
    const [hovered, setHovered] = useState<number | null>(null);

    useEffect(() => {
        imgRef.current.forEach((el, i) => {
            if (!el) return;
            gsap.fromTo(el, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out", delay: 0.5 + i * 0.1 });
        });
    }, []);

    /*
     * FIX: bottom corners were at bottom:5% which on a 650px tall mobile viewport
     * = 32px from bottom. The label hangs -26px below the box, so the label sits
     * right on top of the footer text.
     *
     * Solution: push bottom corners up enough so label clears the footer.
     * Footer height ≈ 44px  +  label height 26px  +  4px gap  = 74px from bottom.
     * Using bottom:12% keeps them clear at every mobile height while still looking
     * tucked into the corner on desktop (12% of 900px = 108px, still fine).
     */
    const corners = [
        { id: "boot-tall" as ProductId, src: CLD.xoBootTall, label: "Boot Tall", clickable: true, pos: { top: "5%", left: "4%", right: "auto", bottom: "auto" } },
        { id: "boot-short" as ProductId, src: CLD.xoBootShort, label: "Boot Short", clickable: true, pos: { top: "auto", left: "4%", right: "auto", bottom: "8%" } },
        { id: "back" as ProductId, src: CLD.xoBackComingSoon, label: "Back Support", clickable: false, pos: { top: "5%", left: "auto", right: "4%", bottom: "auto" } },
        { id: "knee" as ProductId, src: CLD.xoKneeHingedComingSoon, label: "Knee Support", clickable: false, pos: { top: "auto", left: "auto", right: "4%", bottom: "8%" } },
    ];

    return (
        <>
            {corners.map((c, i) => (
                <div
                    key={c.id + i}
                    ref={el => { imgRef.current[i] = el; }}
                    onClick={() => c.clickable && onProductClick(c.id)}
                    onMouseEnter={() => c.clickable && setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    className="absolute"
                    style={{ ...c.pos, zIndex: 5, cursor: c.clickable ? "pointer" : "default" }}
                >
                    {/* Reduced size by 20px from original */}
                    <div className="relative"
                        style={{ width: "clamp(48px,18vw,260px)", height: "clamp(48px,18vw,260px)" }}>
                        <div style={{
                            position: "absolute", inset: 0, borderRadius: "18px",
                            background: "linear-gradient(135deg, rgba(22,81,209,0.1), rgba(6,10,35,0.6))",
                            border: `1px solid ${hovered === i && c.clickable ? "rgba(91,155,255,0.9)" : "rgba(91,155,255,0.3)"}`,
                            backdropFilter: "blur(10px)", transition: "all 0.4s ease",
                            boxShadow: hovered === i && c.clickable
                                ? "0 0 15px rgba(91,155,255,0.6), 0 0 30px rgba(91,155,255,0.4)"
                                : "0 0 10px rgba(91,155,255,0.15)",
                        }} />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={c.src} alt={c.label} style={{
                            width: "100%", height: "100%", objectFit: "contain",
                            padding: 8,
                            position: "relative", zIndex: 1,
                            filter: `drop-shadow(0 0 20px rgba(91,155,255,${hovered === i && c.clickable ? 1 : 0.5})) drop-shadow(0 0 40px rgba(22,81,209,${hovered === i && c.clickable ? 0.8 : 0.3}))`,
                            transition: "all 0.4s ease",
                            transform: hovered === i && c.clickable ? "scale(1.05)" : "scale(1)",
                            opacity: c.clickable ? 1 : 0.7,
                        }} />
                        <p style={{
                            position: "absolute", bottom: "-26px", left: "50%", transform: "translateX(-50%)",
                            whiteSpace: "nowrap", fontSize: "clamp(9px,1.1vw,14px)",
                            textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 700,
                            color: `rgba(91,155,255,${hovered === i && c.clickable ? 1 : 0.55})`,
                            transition: "color 0.3s ease",
                        }}>{c.label}</p>
                    </div>
                </div>
            ))}
        </>
    );
}

// ── MAIN COMING SOON ──
export default function ComingSoon() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mounted, setMounted] = useState(false);
    const [activeProduct, setActiveProduct] = useState<ProductId | null>(null);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.05 });
        tl.fromTo(".cs-logo", { opacity: 0, y: -20, filter: "blur(6px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.4, ease: "expo.out" });
        tl.fromTo(".cs-anim", { opacity: 0, y: 16, filter: "blur(4px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.35, ease: "expo.out", stagger: 0.04 }, "-=0.3");
        gsap.to(".center-glow", { opacity: 0.30, duration: 2.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to(".bracket", { opacity: 0.7, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.4 });

        gsap.set(".better-pill-text", { color: "rgba(147,197,253,0.9)" });
        gsap.set(".better-pill-sweep", { top: "-200%" });
        const pillTl = gsap.timeline({ repeat: -1, repeatDelay: 3.5 });
        const pills = gsap.utils.toArray<Element>(".better-pill");
        const sweeps = gsap.utils.toArray<Element>(".better-pill-sweep");
        const texts = gsap.utils.toArray<Element>(".better-pill-text");
        pills.forEach((_, i) => {
            const subTl = gsap.timeline();
            subTl.to(sweeps[i], { top: "200%", duration: 1.2, ease: "sine.inOut" });
            subTl.to(pills[i], { background: "linear-gradient(135deg,rgba(180,180,180,0.30),rgba(120,120,120,0.20))", border: "1px solid rgba(200,200,200,0.45)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)", duration: 0.4, ease: "power2.out" }, "-=0.3");
            subTl.to(texts[i], { color: "#dde6f0", duration: 0.4 }, "<");
            subTl.set(sweeps[i], { top: "-200%" });
            pillTl.add(subTl, i > 0 ? "+=0.35" : "0");
        });
        pillTl.eventCallback("onRepeat", () => {
            (pills as Element[]).forEach(p => gsap.set(p, { background: "linear-gradient(135deg,rgba(22,81,209,0.18),rgba(6,10,35,0.55))", border: "1px solid rgba(91,155,255,0.45)", boxShadow: "0 0 12px rgba(91,155,255,0.25),inset 0 1px 0 rgba(255,255,255,0.08)" }));
            (texts as Element[]).forEach(t => gsap.set(t, { color: "rgba(147,197,253,0.9)" }));
        });
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        let W = canvas.width = window.innerWidth;
        let H = canvas.height = window.innerHeight;
        const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
        window.addEventListener("resize", resize);
        const orbs = Array.from({ length: 6 }, (_, i) => ({ x: Math.random() * W, y: Math.random() * H, r: 180 + Math.random() * 220, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, hue: i % 2 === 0 ? 220 : 210, alpha: 0.04 + Math.random() * 0.05 }));
        const stars = Array.from({ length: 120 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.2, alpha: 0.2 + Math.random() * 0.6, speed: 0.002 + Math.random() * 0.006, offset: Math.random() * Math.PI * 2 }));
        let frame = 0; let rafId: number;
        const draw = () => {
            rafId = requestAnimationFrame(draw);
            ctx.clearRect(0, 0, W, H); ctx.fillStyle = "#03102a"; ctx.fillRect(0, 0, W, H);
            orbs.forEach(o => { o.x += o.vx; o.y += o.vy; if (o.x < -o.r) o.x = W + o.r; if (o.x > W + o.r) o.x = -o.r; if (o.y < -o.r) o.y = H + o.r; if (o.y > H + o.r) o.y = -o.r; const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r); g.addColorStop(0, `hsla(${o.hue},70%,60%,${o.alpha * 0.7})`); g.addColorStop(1, `hsla(${o.hue},80%,55%,0)`); ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill(); });
            frame++;
            stars.forEach(st => { const a = st.alpha * (0.5 + 0.5 * Math.sin(frame * st.speed + st.offset)); ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(180,210,255,${a})`; ctx.fill(); });
            ctx.strokeStyle = "rgba(17,17,132,0.06)"; ctx.lineWidth = 1;
            for (let x = 0; x < W; x += 52) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
            for (let y = 0; y < H; y += 52) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
        };
        draw();
        return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", resize); };
    }, []);

    if (activeProduct) return <ProductDetail id={activeProduct} onBack={() => setActiveProduct(null)} />;

    return (
        <main className="relative w-full overflow-hidden bg-[#020916]" style={{ height: "100dvh" }}>
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0, width: "100%", height: "100%" }} />
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "radial-gradient(ellipse at 50% 40%, transparent 35%, rgba(2,9,22,0.65) 100%)" }} />
            <div className="center-glow absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "radial-gradient(ellipse at 50% 50%, rgba(22,81,209,0.22) 0%, transparent 60%)", opacity: 0.15 }} />
            <div className="absolute top-0 inset-x-0 h-px pointer-events-none" style={{ zIndex: 3, background: "linear-gradient(90deg, transparent, rgba(91,155,255,0.6), transparent)" }} />
            <div className="absolute bottom-0 inset-x-0 h-px pointer-events-none" style={{ zIndex: 3, background: "linear-gradient(90deg, transparent, rgba(91,155,255,0.3), transparent)" }} />
            {(["tl", "tr", "bl", "br"] as const).map(c => (
                <div key={c} className="bracket absolute pointer-events-none" style={{ zIndex: 3, width: 40, height: 40, opacity: 0.5, top: c.startsWith("t") ? 16 : "auto", bottom: c.startsWith("b") ? 16 : "auto", left: c.endsWith("l") ? 16 : "auto", right: c.endsWith("r") ? 16 : "auto", borderTop: c.startsWith("t") ? "2px solid rgba(91,155,255,0.7)" : "none", borderBottom: c.startsWith("b") ? "2px solid rgba(91,155,255,0.7)" : "none", borderLeft: c.endsWith("l") ? "2px solid rgba(91,155,255,0.7)" : "none", borderRight: c.endsWith("r") ? "2px solid rgba(91,155,255,0.7)" : "none", borderRadius: c === "tl" ? "12px 0 0 0" : c === "tr" ? "0 12px 0 0" : c === "bl" ? "0 0 0 12px" : "0 0 12px 0" }} />
            ))}

            <div className="absolute top-2 sm:top-3 md:top-4 left-1/2 -translate-x-1/2 z-20 cs-logo" style={{ opacity: 0 }}>
                {/* Desktop Logo */}
                <Image src={CLD.footerLogo} alt="X-Ortho" width={500} height={200}
                    className="object-contain h-auto hidden sm:block"
                    style={{
                        width: "clamp(200px,42vw,440px)",
                        filter: "drop-shadow(0 0 40px rgba(91,155,255,0.5)) drop-shadow(0 0 80px rgba(22,81,209,0.3))"
                    }} />
                {/* Mobile Logo — compact icon so it doesn't fight the corner images */}
                <Image src={CLD.logo} alt="X-Ortho" width={160} height={160}
                    className="object-contain h-auto block sm:hidden"
                    style={{
                        width: "clamp(60px,18vw,100px)",
                        filter: "drop-shadow(0 0 40px rgba(91,155,255,0.5)) drop-shadow(0 0 80px rgba(22,81,209,0.3))"
                    }} />
            </div>

            {/* 4 corner product images */}
            <CornerImages onProductClick={setActiveProduct} />

            {/* Center — pills + video */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none select-none"
                style={{
                    paddingTop: "clamp(100px,18vh,180px)",
                    paddingBottom: "clamp(60px,10vh,100px)",
                }}>

                {/* Pills grid */}
                <div className="cs-anim w-full flex justify-center" style={{ opacity: 0 }}>
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:gap-3"
                        style={{ width: "clamp(180px,50vw,540px)" }}>
                        {["Better Design", "Better Engineering", "Better Quality", "Better Functionality", "Better Patient Experience", "Better Outcomes", "Better DME"].map((t, i) => (
                            <span key={i} className={`better-pill relative overflow-hidden uppercase font-bold rounded-full text-center ${i >= 4 ? "col-span-2" : ""}`}
                                style={{
                                    padding: "clamp(6px,1vh,10px) clamp(8px,1.5vw,18px)",
                                    background: "linear-gradient(135deg,rgba(22,81,209,0.18),rgba(6,10,35,0.55))",
                                    border: "1px solid rgba(91,155,255,0.45)",
                                    boxShadow: "0 0 12px rgba(91,155,255,0.25),inset 0 1px 0 rgba(255,255,255,0.08)",
                                    backdropFilter: "blur(14px)",
                                    color: "rgba(147,197,253,0.95)",
                                }}>
                                <span className="better-pill-text relative z-10 block"
                                    style={{ fontSize: "clamp(8px,1vw,11px)", letterSpacing: "0.1em" }}>{t}</span>
                                <span className="better-pill-sweep absolute inset-x-0 pointer-events-none"
                                    style={{ height: "200%", top: "-200%", background: "linear-gradient(180deg,transparent 0%,rgba(180,180,180,0.15) 20%,rgba(220,220,220,0.55) 40%,rgba(255,255,255,0.85) 50%,rgba(220,220,220,0.55) 60%,rgba(180,180,180,0.15) 80%,transparent 100%)" }} />
                            </span>
                        ))}
                    </div>
                </div>

                {/* Video Section  */}

                {/* <div className="cs-anim mt-3 sm:mt-4 pointer-events-auto" style={{ opacity: 0, width: "clamp(240px,50vw,600px)" }}>
                    <div className="relative w-full rounded-xl overflow-hidden"
                        style={{
                            height: "clamp(260px,18vh,220px)",
                            border: "1px solid rgba(91,155,255,0.20)",
                            boxShadow: "0 0 24px rgba(22,81,209,0.18)",
                        }}>
                        <video
                            src={CLD.comingsoonpreview}
                            autoPlay loop muted playsInline
                            className="w-full h-full"
                            style={{ objectFit: "cover", objectPosition: "center" }}
                        />
                        <div className="absolute inset-0 pointer-events-none"
                            style={{ background: "linear-gradient(to bottom,rgba(2,9,22,0.1) 0%,transparent 30%,transparent 70%,rgba(2,9,22,0.3) 100%)" }} />
                    </div>
                </div> */}
            </div>

            {/* Contact — absolute bottom */}
            <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center gap-1 py-2 sm:py-3 px-4 text-center pointer-events-auto">
                <div className="flex flex-wrap items-center justify-center gap-x-1.5 sm:gap-x-2 gap-y-0.5 text-white/40 text-[9px] sm:text-[11px]">
                    <span>Email <a href="mailto:info@xortho.com" className="text-[#5b9bff]/80 hover:text-[#5b9bff] transition-colors font-semibold">info@xortho.com</a></span>
                    <span className="text-white/20">·</span>
                    <span><a href="tel:8559678461" className="text-[#5b9bff]/80 hover:text-[#5b9bff] transition-colors font-semibold">855.XORTHO1</a></span>
                    <span className="text-white/20">·</span>
                    <span>HCPCS coding · pricing · samples</span>
                </div>
                {mounted && (
                    <p className="text-[8px] uppercase tracking-[0.3em] font-bold" style={{ color: "rgba(255,255,255,0.12)" }}>
                        © {new Date().getFullYear()} X-Ortho · TLC DME LLC
                    </p>
                )}
            </div>
        </main>
    );
}
