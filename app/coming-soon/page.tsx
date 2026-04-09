"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { CLD } from "@/lib/cloudinary";

// ── PDF-exact product data ──
const PRODUCTS = {
    "boot-short": {
        name: "XO Boot Pneumatic",
        sub: "Short Walker",
        image: CLD.xoBootShort,
        tagline: "Better Design. Better Engineering. Better Quality.\nBetter Functionality. Better Patient Experience.\nBetter Outcomes. Better DME.",
        section1: {
            title: "World Class Aerodynamic Structure",
            body: "Technologically advanced aerodynamic & ergonomic engineering enhances structural integrity generating cast like stability & protection. Crafted with innovative materials to reduce weight & allow struts to flex, combined with a calf adjustment function to adapt to various anatomical differences. Safe step rocker absorbs shock & offloads pressure generating a fluid natural gait with increased traction control.",
            features: [
                { img: CLD.xoShell, title: "Flex Strut Armor", desc: "Flexible Lightweight\nDurable Protection" },
                { img: CLD.xoFrontView, title: "Anterior Shield", desc: "Removeable Pliable\nDorsal Protection" },
                { img: CLD.xoCage, title: "Posterior Calf Adjustment", desc: "Accommodates Larger\nWider Lower Legs" },
                { img: CLD.xoRocker, title: "Safe Step Rocker", desc: "Shock Absorption\nFluid Heel Toe Gait" },
            ],
        },
        section2: {
            title: "Revolutionary Compression System",
            body: "Purposefully placed compartmentalized air cells provide greater surface area contact, combined with a low force bulb & intuitive inflation deflation valve allows for controlled customization of compression. T-shirt soft interior liner regulates temperature & enhances comfort. EZ grip strapping system has textured tips with a hybrid hook loop strap & 360 swivel d-rings for quicker donning & doffing.",
            features: [
                { img: CLD.xoInsole, title: "Air Chamber System", desc: "Compartmentalized\nCustomization" },
                { img: CLD.xoEzBulb, title: "Pneumatic System", desc: "Effortless & Rapid\nInflate & Deflate" },
                { img: CLD.xoStraps, title: "Strapping System", desc: "EZ Grip Textured\nTips & 360 Swivel" },
                { img: CLD.sleeves, title: "AFO Undersleeve", desc: "Gentle Compression\nSkin Barrier & Hygiene" },
            ],
        },
    },
    "boot-tall": {
        name: "XO Boot Pneumatic",
        sub: "Tall Walker",
        image: CLD.xoBootTall,
        tagline: "Better Design. Better Engineering. Better Quality.\nBetter Functionality. Better Patient Experience.\nBetter Outcomes. Better DME.",
        section1: {
            title: "World Class Aerodynamic Structure",
            body: "Technologically advanced aerodynamic & ergonomic engineering enhances structural integrity generating cast like stability & protection. Crafted with innovative materials to reduce weight & allow struts to flex, combined with a calf adjustment function to adapt to various anatomical differences. Safe step rocker absorbs shock & offloads pressure generating a fluid natural gait with increased traction control.",
            features: [
                { img: CLD.xoShell, title: "Flex Strut Armor", desc: "Flexible Lightweight\nDurable Protection" },
                { img: CLD.xoFrontView, title: "Anterior Shield", desc: "Removeable Pliable\nDorsal Protection" },
                { img: CLD.xoCage, title: "Posterior Calf Adjustment", desc: "Accommodates Larger\nWider Lower Legs" },
                { img: CLD.xoRocker, title: "Safe Step Rocker", desc: "Shock Absorption\nFluid Heel Toe Gait" },
            ],
        },
        section2: {
            title: "Revolutionary Compression System",
            body: "Purposefully placed compartmentalized air cells provide greater surface area contact, combined with a low force bulb & intuitive inflation deflation valve allows for controlled customization of compression. T-shirt soft interior liner regulates temperature & enhances comfort. EZ grip strapping system has textured tips with a hybrid hook loop strap & 360 swivel d-rings for quicker donning & doffing.",
            features: [
                { img: CLD.xoInsole, title: "Air Chamber System", desc: "Compartmentalized\nCustomization" },
                { img: CLD.xoEzBulb, title: "Pneumatic System", desc: "Effortless & Rapid\nInflate & Deflate" },
                { img: CLD.xoStraps, title: "Strapping System", desc: "EZ Grip Textured\nTips & 360 Swivel" },
                { img: CLD.sleeves, title: "AFO Undersleeve", desc: "Gentle Compression\nSkin Barrier & Hygiene" },
            ],
        },
    },
    "knee": {
        name: "XO Knee Support",
        sub: "ROM Cryo",
        image: CLD.xoKneeHinged,
        tagline: "Better Design. Better Engineering. Better Quality.\nBetter Functionality. Better Patient Experience.\nBetter Outcomes. Better DME.",
        section1: {
            title: "Dual-Axis Hinge System",
            body: "The XO Knee Support ROM Cryo features a dual-axis hinge that mirrors the natural movement of the knee joint. PDAC approved with HCPCS codes L1832 & L1833. Engineered for Osteoarthritis support with removable Cryo Gel Pad for effective cold therapy. Low profile design fits comfortably under clothing for all-day wear.",
            features: [
                { img: CLD.kneeHinge1, title: "Dual-Axis Hinge", desc: "Mirrors Natural\nKnee Movement" },
                { img: CLD.kneeFront, title: "ROM Adjustment", desc: "Flexion & Extension\nAngle Control" },
                { img: CLD.kneeOpen, title: "Open Patella", desc: "Reduced Pressure\non Kneecap" },
                { img: CLD.kneeCryoPad, title: "Cryo Gel Pad", desc: "Integrated\nCold Therapy" },
            ],
        },
        section2: {
            title: "Advanced Support System",
            body: "An advanced pulley system allows for tailored compression. Low profile design allows support to fit comfortably under clothing. Vertical stays provide structural integrity while allowing the flexibility needed. A simple strap design allows for a universal fit.",
            features: [
                { img: CLD.kneeSleeve, title: "Compression Sleeve", desc: "Graduated\nCompression Support" },
                { img: CLD.kneeStrap1, title: "Strap System", desc: "Universal\nFit Design" },
                { img: CLD.kneeProduct2, title: "Full Assembly", desc: "PDAC Approved\nL1832 & L1833" },
                { img: CLD.kneeBlueprint, title: "Blueprint Design", desc: "Clinically\nEngineered Structure" },
            ],
        },
    },
    "back": {
        name: "XO Back Support",
        sub: "Lumbar Belt",
        image: CLD.xoBackSupport,
        tagline: "Better Design. Better Engineering. Better Quality.\nBetter Functionality. Better Patient Experience.\nBetter Outcomes. Better DME.",
        section1: {
            title: "Advanced Lumbar Support",
            body: "Low profile design allows support to fit comfortably under clothing. Vertical stays provide structural integrity while allowing the flexibility needed for daily activities. Advanced pulley compression system delivers precise, customizable support exactly where patients need it most.",
            features: [
                { img: CLD.backBelt, title: "Lumbar Support", desc: "Full Posterior\nCoverage" },
                { img: CLD.backBeltSide, title: "Side Panels", desc: "Lateral\nCompression Support" },
                { img: CLD.backBeltFront, title: "Front Closure", desc: "Easy Donning\n& Doffing" },
                { img: CLD.backBeltWorn, title: "Worn View", desc: "Low Profile\nUnder Clothing" },
            ],
        },
        section2: {
            title: "Compression & Fit System",
            body: "Advanced pulley compression system with universal fit strap design. Lumbar support stays provide structural integrity. Compatible with Gel Cryo Pad for effective cold therapy. Designed for all-day comfort and compliance.",
            features: [
                { img: CLD.backBeltBlueprint, title: "Blueprint Design", desc: "Engineered\nLumbar Support" },
                { img: CLD.backBelt, title: "Pulley System", desc: "Advanced\nCompression Control" },
                { img: CLD.backBeltSide, title: "Vertical Stays", desc: "Structural\nIntegrity Support" },
                { img: CLD.backBeltFront, title: "Universal Fit", desc: "Adjustable\nStrap System" },
            ],
        },
    },
};

type ProductId = keyof typeof PRODUCTS;

const blueMetallic: React.CSSProperties = {
    backgroundImage: "linear-gradient(180deg, #1a6fd4 0%, #0d4fa8 35%, #1565c8 55%, #0a3d8a 80%, #1251b0 100%)",
    WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent", backgroundClip: "text",
    filter: "drop-shadow(0 1px 0 rgba(91,155,255,0.5)) drop-shadow(0 -1px 0 rgba(0,0,30,0.6))",
};
const silverMetallic: React.CSSProperties = {
    backgroundImage: "linear-gradient(180deg, #f0f0f0 0%, #b8b8b8 20%, #e8e8e8 35%, #787878 50%, #d0d0d0 65%, #909090 80%, #c8c8c8 100%)",
    WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent", backgroundClip: "text",
    filter: "drop-shadow(0 1px 0 rgba(255,255,255,0.9)) drop-shadow(0 -1px 0 rgba(0,0,0,0.6))",
};

// ── PDF-EXACT PRODUCT DETAIL ──
function ProductDetail({ id, onBack }: { id: ProductId; onBack: () => void }) {
    const p = PRODUCTS[id];
    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" style={{ background: "#020916" }}>
            <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(17,17,132,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.05) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
            <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(22,81,209,0.18) 0%, transparent 65%)" }} />
            <div className="fixed top-0 inset-x-0 h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(91,155,255,0.6), transparent)", zIndex: 60 }} />

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <Image src={CLD.footerLogo} alt="X-ORTHO" width={220} height={80}
                        style={{ height: 70, width: "auto", filter: "drop-shadow(0 0 30px rgba(91,155,255,0.6))" }} />
                    <button onClick={onBack}
                        className="text-sm uppercase tracking-[0.3em] font-bold px-6 py-3 rounded-full transition-all"
                        style={{ border: "1px solid rgba(91,155,255,0.3)", color: "rgba(91,155,255,0.8)", background: "transparent" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(22,81,209,0.2)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}>
                        ← Back
                    </button>
                </div>

                {/* Main grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* LEFT - Fixed Gap using justify-start */}
                    <div className="flex flex-col items-center justify-start pt-4 pb-6 px-4 relative">
                        <div style={{
                            position: "absolute", top: "20%", left: "50%", transform: "translate(-50%,-50%)",
                            width: 450, height: 450, borderRadius: "50%",
                            background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(91,155,255,0.08) 45%, transparent 70%)",
                            filter: "blur(40px)", pointerEvents: "none",
                        }} />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.image} alt={p.name} style={{
                            width: "90%", maxWidth: 500, height: "auto", objectFit: "contain", position: "relative",
                            filter: "drop-shadow(0 0 60px rgba(91,155,255,0.85)) drop-shadow(0 40px 100px rgba(22,81,209,0.6))",
                        }} />
                        <div className="text-center mt-6 relative">
                            <h2 className="font-nexa font-black uppercase" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", letterSpacing: "-1px" }}>
                                <span style={blueMetallic}>{p.name}</span>
                            </h2>
                            <p className="mt-4 text-base leading-relaxed whitespace-pre-line" style={{ color: "rgba(255,255,255,0.60)" }}>
                                {p.tagline}
                            </p>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-col gap-10 py-4" style={{ borderLeft: "1px solid rgba(91,155,255,0.15)" }}>
                        {/* Section 1 */}
                        <div className="px-6 md:px-8">
                            <h3 className="font-nexa font-black uppercase text-center mb-4" style={{ fontSize: "1.5rem", ...blueMetallic }}>
                                {p.section1.title}
                            </h3>
                            <p className="text-sm text-center leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
                                {p.section1.body}
                            </p>
                            <div className="grid grid-cols-2 gap-5">
                                {p.section1.features.map((f, i) => (
                                    <div key={i} className="flex flex-col items-center gap-3 p-5 rounded-2xl"
                                        style={{ background: "rgba(8,12,42,0.7)", border: "1px solid rgba(91,155,255,0.15)" }}>
                                        <div className="relative flex items-center justify-center" style={{ width: 80, height: 80 }}>
                                            <div style={{ position: "absolute", width: 70, height: 70, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)", filter: "blur(8px)" }} />
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={f.img} alt={f.title} style={{ width: 64, height: 64, objectFit: "contain", position: "relative", filter: "drop-shadow(0 0 15px rgba(91,155,255,0.5))" }} />
                                        </div>
                                        <p className="font-bold text-center text-sm uppercase tracking-wide text-white leading-tight">{f.title}</p>
                                        <p className="text-center text-xs leading-snug whitespace-pre-line" style={{ color: "rgba(255,255,255,0.50)" }}>{f.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="mx-6 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(91,155,255,0.3), transparent)" }} />

                        {/* Section 2 */}
                        <div className="px-6 md:px-8">
                            <h3 className="font-nexa font-black uppercase text-center mb-4" style={{ fontSize: "1.5rem", ...blueMetallic }}>
                                {p.section2.title}
                            </h3>
                            <p className="text-sm text-center leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
                                {p.section2.body}
                            </p>
                            <div className="grid grid-cols-2 gap-5">
                                {p.section2.features.map((f, i) => (
                                    <div key={i} className="flex flex-col items-center gap-3 p-5 rounded-2xl"
                                        style={{ background: "rgba(8,12,42,0.7)", border: "1px solid rgba(91,155,255,0.15)" }}>
                                        <div className="relative flex items-center justify-center" style={{ width: 80, height: 80 }}>
                                            <div style={{ position: "absolute", width: 70, height: 70, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)", filter: "blur(8px)" }} />
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={f.img} alt={f.title} style={{ width: 64, height: 64, objectFit: "contain", position: "relative", filter: "drop-shadow(0 0 15px rgba(91,155,255,0.5))" }} />
                                        </div>
                                        <p className="font-bold text-center text-sm uppercase tracking-wide text-white leading-tight">{f.title}</p>
                                        <p className="text-center text-xs leading-snug whitespace-pre-line" style={{ color: "rgba(255,255,255,0.50)" }}>{f.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom tagline */}
                <div className="mt-12 pt-8 text-center" style={{ borderTop: "1px solid rgba(91,155,255,0.15)" }}>
                    <p className="font-nexa font-black uppercase text-lg" style={silverMetallic}>Better Design. Better Engineering. Better Quality.</p>
                    <p className="font-nexa font-black uppercase text-lg mt-2" style={blueMetallic}>Better Functionality. Better Patient Experience. Better Outcomes. Better DME.</p>
                    <p className="text-xs uppercase tracking-[0.35em] mt-4" style={{ color: "rgba(255,255,255,0.20)" }}>
                        © {new Date().getFullYear()} X-Ortho · TLC DME LLC · info@xortho.com · 855.XORTHO1
                    </p>
                </div>
            </div>
        </div>
    );
}

// ── CORNER IMAGES COMPONENT ──
function CornerImages({ onProductClick }: { onProductClick: (id: ProductId) => void }) {
    const imgRef = useRef<(HTMLDivElement | null)[]>([]);
    const [hovered, setHovered] = useState<number | null>(null);

    useEffect(() => {
        imgRef.current.forEach((el, i) => {
            if (!el) return;
            gsap.fromTo(el, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out", delay: 0.5 + i * 0.1 });
        });
    }, []);

    // Updated Positions & Mappings
    const corners = [
        { id: "boot-tall" as ProductId, src: CLD.xoBootTall, label: "Boot Tall", top: "8%", left: "3%", right: "auto", bottom: "auto" },
        { id: "boot-short" as ProductId, src: CLD.xoBootShort, label: "Boot Short", top: "auto", left: "3%", right: "auto", bottom: "18%" },
        { id: "back" as ProductId, src: CLD.xoBackComingSoon, label: "Back Belt", top: "8%", left: "auto", right: "3%", bottom: "auto" },
        { id: "knee" as ProductId, src: CLD.xoKneeHingedComingSoon, label: "Knee Support", top: "auto", left: "auto", right: "3%", bottom: "18%" },
    ];

    return (
        <>
            {corners.map((c, i) => (
                <div
                    key={c.id}
                    ref={el => { imgRef.current[i] = el; }}
                    onClick={() => onProductClick(c.id)}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    className="absolute cursor-pointer group"
                    style={{
                        top: c.top, left: c.left, right: c.right, bottom: c.bottom,
                        zIndex: 5,
                    }}>
                    {/* Increased Size: 160px -> 200px -> 260px */}
                    <div className="relative w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] md:w-[260px] md:h-[260px]">
                        {/* NEON GLOW CONTAINER */}
                        <div style={{
                            position: "absolute", inset: 0, borderRadius: "18px",
                            background: "linear-gradient(135deg, rgba(22,81,209,0.1), rgba(6,10,35,0.6))",
                            border: `1px solid ${hovered === i ? "rgba(91,155,255,0.9)" : "rgba(91,155,255,0.3)"}`,
                            backdropFilter: "blur(10px)",
                            transition: "all 0.4s ease",
                            boxShadow: hovered === i 
                                ? "0 0 15px rgba(91,155,255,0.6), 0 0 30px rgba(91,155,255,0.4), inset 0 0 15px rgba(91,155,255,0.1)" 
                                : "0 0 10px rgba(91,155,255,0.15), 0 0 20px rgba(22,81,209,0.1)",
                        }} />
                        {/* NEON GLOW IMAGE */}

                        <img
                            src={c.src}
                            alt={c.label}
                            style={{
                                width: "100%", height: "100%", objectFit: "contain", padding: 10,
                                position: "relative", zIndex: 1,
                                filter: `drop-shadow(0 0 20px rgba(91,155,255,${hovered === i ? 1 : 0.6})) drop-shadow(0 0 40px rgba(22,81,209,${hovered === i ? 0.8 : 0.4}))`,
                                transition: "all 0.4s ease",
                                transform: hovered === i ? "scale(1.05)" : "scale(1)",
                            }}
                        />
                        <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] sm:text-xs uppercase tracking-[0.2em] font-bold"
                            style={{
                                color: `rgba(91,155,255,${hovered === i ? 1 : 0.6})`,
                                transition: "color 0.3s ease",
                                textShadow: `0 0 10px rgba(91,155,255,${hovered === i ? 0.8 : 0})`
                            }}>
                            {c.label}
                        </p>
                    </div>
                </div>
            ))}
        </>
    );
}

// ── MAIN COMING SOON ──
export default function ComingSoon() {
    const scanRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mounted, setMounted] = useState(false);
    const [activeProduct, setActiveProduct] = useState<ProductId | null>(null);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        const scan = scanRef.current;
        if (scan) {
            gsap.fromTo(scan, { top: "0%", opacity: 0 }, {
                top: "100%", opacity: 0.5, duration: 4, ease: "none", repeat: -1, repeatDelay: 2,
                onRepeat: () => { gsap.set(scan, { top: "0%", opacity: 0 }); }
            });
        }
        const tl = gsap.timeline({ delay: 0.05 });
        tl.fromTo(".cs-logo", { opacity: 0, y: -20, filter: "blur(6px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.4, ease: "expo.out" });
        tl.fromTo(".cs-anim", { opacity: 0, y: 16, filter: "blur(4px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.35, ease: "expo.out", stagger: 0.04 }, "-=0.3");
        gsap.to(".center-glow", { opacity: 0.30, duration: 2.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to(".bracket", { opacity: 0.7, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.4 });
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
        const orbs = Array.from({ length: 6 }, (_, i) => ({
            x: Math.random() * W, y: Math.random() * H, r: 180 + Math.random() * 220,
            vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
            hue: i % 2 === 0 ? 220 : 210, alpha: 0.04 + Math.random() * 0.05,
        }));
        const stars = Array.from({ length: 120 }, () => ({
            x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.2,
            alpha: 0.2 + Math.random() * 0.6, speed: 0.002 + Math.random() * 0.006, offset: Math.random() * Math.PI * 2,
        }));
        let frame = 0; let rafId: number;
        const draw = () => {
            rafId = requestAnimationFrame(draw);
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = "#03102a"; ctx.fillRect(0, 0, W, H);
            orbs.forEach(o => {
                o.x += o.vx; o.y += o.vy;
                if (o.x < -o.r) o.x = W + o.r; if (o.x > W + o.r) o.x = -o.r;
                if (o.y < -o.r) o.y = H + o.r; if (o.y > H + o.r) o.y = -o.r;
                const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
                g.addColorStop(0, `hsla(${o.hue},70%,60%,${o.alpha * 0.7})`);
                g.addColorStop(1, `hsla(${o.hue},80%,55%,0)`);
                ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
            });
            frame++;
            stars.forEach(st => {
                const a = st.alpha * (0.5 + 0.5 * Math.sin(frame * st.speed + st.offset));
                ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(180,210,255,${a})`; ctx.fill();
            });
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

            {/* 1. CENTER LOGO AT TOP (400px) */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 cs-logo" style={{ opacity: 0 }}>
                <Image src={CLD.footerLogo} alt="X-Ortho" width={660} height={220}
                    className="object-contain w-[250px] sm:w-[300px] md:w-[600px] h-auto"
                    style={{ filter: "drop-shadow(0 0 40px rgba(91,155,255,0.5)) drop-shadow(0 0 80px rgba(22,81,209,0.3))" }} />
            </div>

            {/* 4. STATIC CORNER IMAGES (New Mappings + Increased Size) */}
            <CornerImages onProductClick={setActiveProduct} />

            {/* 6. BETTER TEXT CENTER (Attractive Alternating Metallic Text) */}
            <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10] text-center cs-anim pointer-events-none select-none" style={{ opacity: 0 }}>
                <div className="font-nexa uppercase flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2" 
                     style={{ fontSize: "clamp(1.2rem, 4vw, 2.2rem)", fontWeight: 900, letterSpacing: "0.1em" }}>
                    <span style={blueMetallic}>Better Design</span>
                    <span style={silverMetallic}>Better Quality</span>
                    <span style={blueMetallic}>Better Functionality</span>
                    <span style={silverMetallic}>Better Clinical Outcomes</span>
                    <span style={blueMetallic}>Better Financial Outcomes</span>
                    <span style={{ ...silverMetallic, filter: "drop-shadow(0 0 12px rgba(255,255,255,0.4))" }}>Better DME</span>
                </div>
            </div>

            {/* Contact bottom (Horizontally Centered) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center gap-1.5 w-auto text-center pointer-events-auto pb-2 px-4">
                <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-white/40 text-[10px] sm:text-[11px] px-2">
                    <span className="whitespace-nowrap">Email <a href="mailto:info@xortho.com" className="text-[#5b9bff]/80 hover:text-[#5b9bff] transition-colors font-semibold">info@xortho.com</a></span>
                    <span className="hidden sm:inline">or call</span>
                    <span className="sm:hidden text-white/20">|</span>
                    <span className="whitespace-nowrap"><a href="tel:8559678461" className="text-[#5b9bff]/80 hover:text-[#5b9bff] transition-colors font-semibold">855.XORTHO1</a></span>
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