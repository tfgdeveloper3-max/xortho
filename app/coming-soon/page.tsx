"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { CLD } from "@/lib/cloudinary";

const SITE_PASSWORD = "xortho2025";
const SESSION_KEY = "xo_auth";

/* ── PASSWORD GATE ── */
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
    const [value, setValue] = useState("");
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { inputRef.current?.focus(); }, []);

    const attempt = () => {
        if (value === SITE_PASSWORD) {
            sessionStorage.setItem(SESSION_KEY, "1");
            onUnlock();
        } else {
            setError(true);
            setShake(true);
            setValue("");
            setTimeout(() => setShake(false), 600);
            setTimeout(() => setError(false), 2500);
            inputRef.current?.focus();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center" style={{ background: "#020916" }}>
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(17,17,132,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.06) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(22,81,209,0.18) 0%, transparent 65%)" }} />

            <div className="relative z-10 flex flex-col items-center gap-6 px-6"
                style={{ animation: shake ? "shake 0.5s ease" : undefined }}>
                <style>{`
                    @keyframes shake {
                        0%,100%{transform:translateX(0)}
                        15%{transform:translateX(-8px)}
                        30%{transform:translateX(8px)}
                        45%{transform:translateX(-6px)}
                        60%{transform:translateX(6px)}
                        75%{transform:translateX(-3px)}
                        90%{transform:translateX(3px)}
                    }
                `}</style>

                <Image src={CLD.footerLogo} alt="X-Ortho" width={340} height={140} className="hidden sm:block"
                    style={{ width: "clamp(160px,28vw,320px)", filter: "drop-shadow(0 0 30px rgba(91,155,255,0.45))" }} />
                <Image src={CLD.logo} alt="X-Ortho" width={80} height={80} className="block sm:hidden"
                    style={{ width: "72px", filter: "drop-shadow(0 0 20px rgba(91,155,255,0.45))" }} />

                <div style={{
                    background: "rgba(8,12,42,0.80)", border: "1px solid rgba(91,155,255,0.20)",
                    boxShadow: "0 0 40px rgba(22,81,209,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
                    backdropFilter: "blur(16px)", borderRadius: "18px",
                    padding: "clamp(24px,4vw,40px) clamp(28px,5vw,52px)",
                    display: "flex", flexDirection: "column" as const, alignItems: "center", gap: "20px",
                    minWidth: "clamp(280px,38vw,420px)",
                }}>
                    <p style={{ fontSize: "clamp(10px,1.1vw,13px)", textTransform: "uppercase", letterSpacing: "0.28em", color: "rgba(91,155,255,0.6)", fontWeight: 700 }}>
                        Private Access Only
                    </p>

                    <div style={{ width: "100%", position: "relative" }}>
                        <input ref={inputRef} type="password" placeholder="Enter password" value={value}
                            onChange={e => { setValue(e.target.value); setError(false); }}
                            onKeyDown={e => e.key === "Enter" && attempt()}
                            style={{
                                width: "100%", background: "rgba(4,8,28,0.7)",
                                border: `1px solid ${error ? "rgba(255,80,80,0.6)" : "rgba(91,155,255,0.25)"}`,
                                borderRadius: "10px", padding: "12px 16px", color: "#e5e7eb", fontSize: "15px",
                                outline: "none", letterSpacing: "0.1em", transition: "border-color 0.2s",
                                boxSizing: "border-box" as const,
                            }} />
                        {error && <p style={{ position: "absolute", bottom: "-22px", left: 0, fontSize: "11px", color: "rgba(255,100,100,0.85)" }}>Incorrect password</p>}
                    </div>

                    <button onClick={attempt}
                        style={{
                            marginTop: error ? "12px" : "0", width: "100%", padding: "12px", borderRadius: "10px",
                            border: "1px solid rgba(91,155,255,0.35)",
                            background: "linear-gradient(135deg, rgba(22,81,209,0.35), rgba(6,10,35,0.6))",
                            color: "rgba(147,197,253,0.95)", fontSize: "13px", fontWeight: 700,
                            textTransform: "uppercase" as const, letterSpacing: "0.2em", cursor: "pointer",
                            transition: "background 0.2s, border-color 0.2s",
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg, rgba(22,81,209,0.55), rgba(6,10,35,0.7))"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg, rgba(22,81,209,0.35), rgba(6,10,35,0.6))"; }}
                    >Enter</button>
                </div>

                <p style={{ fontSize: "10px", letterSpacing: "0.25em", color: "rgba(255,255,255,0.12)", textTransform: "uppercase" }}>
                    © {new Date().getFullYear()} X-Ortho · TLC DME LLC
                </p>
            </div>
        </div>
    );
}

/* ── PRODUCT DATA ── */
const PRODUCTS = {
    "boot-short": {
        name: "XO Boot Pneumatic Short",
        image: CLD.xoBootShort,
        section1: {
            title: "World Class Aerodynamic Structure",
            body: "Technologically advanced aerodynamic & ergonomic engineering enhances structural integrity generating cast like stability & protection. Crafted with innovative materials to reduce weight & allow struts to flex, combined with a calf adjustment function to adapt to various anatomical differences. Safe step rocker absorbs shock & offloads pressure generating a fluid natural gait with increased traction control.",
            features: [
                { img: CLD.xoCage, title: "Flex Strut Armor", desc: "Flexible Lightweight\nDurable Protection" },
                { img: CLD.xoShell, title: "Anterior Shield", desc: "Removeable Pliable\nDorsal Protection" },
                { img: CLD.xocomingsoonfrontview, title: "Calf Adjustment", desc: "Accommodates Larger\nWider Lower Legs" },
                { img: CLD.xoRocker, title: "Safe Step Rocker", desc: "Shock Absorption\nFluid Heel Toe Gait" },
            ],
        },
        section2: {
            title: "Revolutionary Compression System",
            body: "Purposefully placed compartmentalized air cells provide greater surface area contact, combined with a low force bulb & intuitive inflation deflation valve allows for controlled customization of compression. T-shirt soft interior liner regulates temperature & enhances comfort. EZ grip strapping system has textured tips with a hybrid hook loop strap & 360 swivel d-rings for quicker donning & doffing.",
            features: [
                { img: CLD.xoLiner, title: "Compression System", desc: "Compartmentalized\nCustomization" },
                { img: CLD.xoRevolutionary, title: "Pneumatic System", desc: "Effortless & Rapid\nInflate & Deflate" },
                { img: CLD.xocomingsoonStrap, title: "Strapping System", desc: "EZ Grip Textured\nTips & 360 Swivel" },
                { img: CLD.sleeves, title: "AFO Undersleeve", desc: "Gentle Compression\nSkin Barrier & Hygiene" },
            ],
        },
    },
    "boot-tall": {
        name: "XO Boot Pneumatic Tall",
        image: CLD.xoBootTall,
        section1: {
            title: "World Class Aerodynamic Structure",
            body: "Technologically advanced aerodynamic & ergonomic engineering enhances structural integrity generating cast like stability & protection. Crafted with innovative materials to reduce weight & allow struts to flex, combined with a calf adjustment function to adapt to various anatomical differences. Safe step rocker absorbs shock & offloads pressure generating a fluid natural gait with increased traction control.",
            features: [
                { img: CLD.xoCage, title: "Flex Strut Armor", desc: "Flexible Lightweight\nDurable Protection" },
                { img: CLD.xoShell, title: "Anterior Shield", desc: "Removeable Pliable\nDorsal Protection" },
                { img: CLD.xocomingsoonfrontview, title: "Calf Adjustment", desc: "Accommodates Larger\nWider Lower Legs" },
                { img: CLD.xoRocker, title: "Safe Step Rocker", desc: "Shock Absorption\nFluid Heel Toe Gait" },
            ],
        },
        section2: {
            title: "Revolutionary Compression System",
            body: "Purposefully placed compartmentalized air cells provide greater surface area contact, combined with a low force bulb & intuitive inflation deflation valve allows for controlled customization of compression. T-shirt soft interior liner regulates temperature & enhances comfort. EZ grip strapping system has textured tips with a hybrid hook loop strap & 360 swivel d-rings for quicker donning & doffing.",
            features: [
                { img: CLD.xoLiner, title: "Compression System", desc: "Compartmentalized\nCustomization" },
                { img: CLD.xoRevolutionary, title: "Pneumatic System", desc: "Effortless & Rapid\nInflate & Deflate" },
                { img: CLD.xocomingsoonStrap, title: "Strapping System", desc: "EZ Grip Textured\nTips & 360 Swivel" },
                { img: CLD.sleeves, title: "AFO Undersleeve", desc: "Gentle Compression\nSkin Barrier & Hygiene" },
            ],
        },
    },
};

/* ── SHARED STYLES ── */
const blueMetallic: React.CSSProperties = {
    backgroundImage: "linear-gradient(180deg, #1a6fd4 0%, #0d4fa8 35%, #1565c8 55%, #0a3d8a 80%, #1251b0 100%)",
    WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent", backgroundClip: "text",
    filter: "drop-shadow(0 1px 0 rgba(91,155,255,0.5)) drop-shadow(0 -1px 0 rgba(0,0,30,0.6))",
};
const silverMetallic: React.CSSProperties = {
    backgroundImage: "linear-gradient(180deg, #ffffff 0%, #c8c8c8 20%, #f0f0f0 35%, #a0a0a0 50%, #e0e0e0 65%, #888888 80%, #d0d0d0 100%)",
    WebkitBackgroundClip: "text" as const, WebkitTextFillColor: "transparent", backgroundClip: "text",
    filter: "drop-shadow(0 1px 0 rgba(255,255,255,0.6)) drop-shadow(0 -1px 0 rgba(0,0,0,0.5))",
};
const silverTextSoft: React.CSSProperties = {
    color: "rgba(206,200,200,0.77)",
    textShadow: "0 0 6px rgba(200,200,200,0.25), 0 1px 0 rgba(255,255,255,0.15)",
};

/* ── PRODUCT DETAIL PAGE ── */
function ProductDetail({ onBack }: { onBack: () => void }) {
    const short = PRODUCTS["boot-short"];
    const tall = PRODUCTS["boot-tall"];

    useEffect(() => {
        window.scrollTo(0, 0);
        window.history.pushState({ detail: "boots" }, "");
        const handlePopState = () => onBack();
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, [onBack]);

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" style={{ background: "#020916" }}>
            <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(17,17,132,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.05) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
            <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(22,81,209,0.18) 0%, transparent 65%)" }} />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-14 py-6 sm:py-8">
                <div className="flex items-center justify-center relative mb-8 sm:mb-10">
                    <button onClick={onBack}
                        className="absolute left-0 px-3 py-1.5 rounded-full transition-all"
                        style={{ border: "1px solid rgba(91,155,255,0.25)", color: "rgba(91,155,255,0.7)", background: "transparent", fontSize: "15px" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(22,81,209,0.15)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                    >←</button>

                    <Image src={CLD.footerLogo} alt="X-ORTHO" width={380} height={300}
                        className="h-16 sm:h-20 md:h-24 w-auto object-contain hidden sm:block"
                        style={{ filter: "drop-shadow(0 0 15px rgba(91,155,255,0.35))" }} />
                    <Image src={CLD.logo} alt="X-ORTHO" width={80} height={80}
                        className="h-10 w-auto object-contain block sm:hidden"
                        style={{ filter: "drop-shadow(0 0 12px rgba(91,155,255,0.35))" }} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-10 md:mb-14">
                    {([short, tall] as const).map((product) => (
                        <div key={product.name} className="flex flex-col items-center">
                            <div className="relative flex items-center justify-center" style={{ width: "100%", height: "clamp(260px,38vw,480px)" }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={product.image} alt={product.name}
                                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", filter: "drop-shadow(0 0 60px rgba(91,155,255,0.85)) drop-shadow(0 30px 80px rgba(22,81,209,0.6))" }} />
                            </div>
                            <h2 className="font-nexa font-black uppercase mt-4 text-center"
                                style={{ fontSize: "clamp(1rem,2.2vw,1.8rem)", letterSpacing: "0.05em", ...silverMetallic }}>{product.name}</h2>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {[
                        { title: short.section1.title, body: short.section1.body, features: short.section1.features },
                        { title: tall.section2.title, body: tall.section2.body, features: tall.section2.features },
                    ].map((section, si) => (
                        <div key={si}>
                            <h3 className="font-nexa font-black uppercase text-center mb-3 sm:mb-5"
                                style={{ fontSize: "clamp(0.8rem,1.5vw,1.3rem)", ...blueMetallic }}>{section.title}</h3>
                            <p className="font-nexa text-[11px] sm:text-[13px] text-left leading-relaxed mb-4 sm:mb-6"
                                style={{ color: "rgba(255,255,255,0.60)" }}>{section.body}</p>
                            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                {section.features.map((f, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl"
                                        style={{ background: "rgba(8,12,42,0.7)", border: "1px solid rgba(91,155,255,0.15)" }}>
                                        <div className="relative flex items-center justify-center"
                                            style={{ width: "clamp(80px,12vw,160px)", height: "clamp(80px,12vw,160px)" }}>
                                            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)", filter: "blur(8px)" }} />
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={f.img} alt={f.title} className="relative"
                                                style={{ width: "90%", height: "90%", objectFit: "contain", filter: "drop-shadow(0 0 15px rgba(91,155,255,0.5))" }} />
                                        </div>
                                        <p className="font-nexa font-black text-center uppercase tracking-wide leading-tight whitespace-nowrap"
                                            style={{ ...silverTextSoft, fontSize: "15px" }}>{f.title}</p>
                                        <p className="font-nexa text-center leading-snug whitespace-pre-line"
                                            style={{ fontSize: "14px", color: "rgba(255,255,255,0.85)" }}>{f.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 text-center" style={{ borderTop: "1px solid rgba(91,155,255,0.15)" }}>
                    <p className="font-nexa font-black uppercase text-lg sm:text-2xl md:text-3xl" style={silverMetallic}>Better Design. Better Engineering. Better Quality.</p>
                    <p className="font-nexa font-black uppercase text-lg sm:text-2xl md:text-3xl mt-1 sm:mt-2" style={silverMetallic}>Better Functionality. Better Patient Experience.</p>
                    <p className="font-nexa font-black uppercase text-lg sm:text-2xl md:text-3xl mt-1 sm:mt-2" style={silverMetallic}>Better Outcomes. Better DME.</p>
                    <p className="font-nexa text-[9px] sm:text-xs uppercase tracking-[0.35em] mt-3 sm:mt-5" style={{ color: "rgba(255,255,255,0.20)" }}>
                        © {new Date().getFullYear()} X-Ortho · TLC DME LLC · info@xortho.com · 855.XORTHO1
                    </p>
                </div>
            </div>
        </div>
    );
}

/* ── DISPLAY PICKER ── */
function DisplayPicker({ onSelect }: { onSelect: (v: 1 | 2) => void }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.1 });
        tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 });
        tl.fromTo(".picker-card", { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.4)", stagger: 0.12 }, "-=0.2");
        tl.fromTo(".picker-label", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.06 }, "-=0.3");
    }, []);

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center" style={{ background: "#020916" }}>
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(17,17,132,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.06) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(22,81,209,0.15) 0%, transparent 65%)" }} />

            <div ref={containerRef} className="relative z-10 flex flex-col items-center gap-10 px-6 w-full" style={{ opacity: 0 }}>
                <Image src={CLD.footerLogo} alt="X-Ortho" width={340} height={140} className="hidden sm:block"
                    style={{ width: "clamp(160px,26vw,300px)", filter: "drop-shadow(0 0 30px rgba(91,155,255,0.4))" }} />
                <Image src={CLD.logo} alt="X-Ortho" width={80} height={80} className="block sm:hidden"
                    style={{ width: "72px", filter: "drop-shadow(0 0 20px rgba(91,155,255,0.4))" }} />

                <p className="picker-label" style={{ fontSize: "clamp(10px,1.1vw,13px)", textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(91,155,255,0.55)", fontWeight: 700, opacity: 0 }}>
                    Select Layout
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full" style={{ maxWidth: "700px" }}>
                    {([
                        { num: 1 as const, sub: "Scrollable · Large Images", heights: ["28px", "28px", "20px", "20px"] },
                        { num: 2 as const, sub: "2 × 2 Grid · Same Size", heights: ["24px", "24px", "24px", "24px"] },
                    ]).map(({ num, sub, heights }) => (
                        <button key={num} onClick={() => onSelect(num)} className="picker-card"
                            style={{
                                flex: 1, minWidth: "240px", maxWidth: "300px",
                                padding: "clamp(28px,4vh,48px) clamp(24px,3vw,40px)",
                                background: "rgba(8,12,42,0.75)", border: "1px solid rgba(91,155,255,0.22)",
                                borderRadius: "20px",
                                boxShadow: "0 0 30px rgba(22,81,209,0.10), inset 0 1px 0 rgba(255,255,255,0.05)",
                                backdropFilter: "blur(14px)", cursor: "pointer",
                                display: "flex", flexDirection: "column", alignItems: "center", gap: "14px",
                                transition: "border-color 0.25s, box-shadow 0.25s, transform 0.25s",
                                opacity: 0,
                            }}
                            onMouseEnter={e => {
                                const b = e.currentTarget;
                                b.style.borderColor = "rgba(91,155,255,0.55)";
                                b.style.boxShadow = "0 0 40px rgba(22,81,209,0.30), inset 0 1px 0 rgba(255,255,255,0.08)";
                                b.style.transform = "translateY(-4px)";
                            }}
                            onMouseLeave={e => {
                                const b = e.currentTarget;
                                b.style.borderColor = "rgba(91,155,255,0.22)";
                                b.style.boxShadow = "0 0 30px rgba(22,81,209,0.10), inset 0 1px 0 rgba(255,255,255,0.05)";
                                b.style.transform = "translateY(0)";
                            }}
                        >
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", width: "72px" }}>
                                {heights.map((h, i) => (
                                    <div key={i} style={{ height: h, borderRadius: "5px", background: i < 2 ? "rgba(91,155,255,0.55)" : "rgba(91,155,255,0.25)" }} />
                                ))}
                            </div>
                            <p style={{
                                fontWeight: 800, fontSize: "clamp(15px,1.6vw,20px)", textTransform: "uppercase", letterSpacing: "0.18em",
                                backgroundImage: "linear-gradient(180deg,#ffffff 0%,#c8c8c8 40%,#a0a0a0 100%)",
                                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                            }}>Display {num}</p>
                            <p className="picker-label" style={{ fontSize: "clamp(9px,0.9vw,11px)", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(147,197,253,0.5)", fontWeight: 600, opacity: 0 }}>
                                {sub}
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ── SHARED PRODUCT ITEMS ── */
const cornerItems = [
    { src: CLD.xoBootShort, label: "XO Boot Pneumatic Short", clickable: true },
    { src: CLD.xoBootTall, label: "XO Boot Pneumatic Tall", clickable: true },
    { src: CLD.xoBackComingSoon, label: "XO Back LSO Cryo", clickable: false },
    { src: CLD.xoKneeHingedComingSoon, label: "XO Knee ROM Cryo", clickable: false },
];

/* ── MAIN ── */
export default function ComingSoon() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mounted, setMounted] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [mainKey, setMainKey] = useState(0);
    const [unlocked, setUnlocked] = useState(false);
    const [displayChoice, setDisplayChoice] = useState<1 | 2 | null>(null);

    const handleBack = () => { setShowDetail(false); setMainKey(k => k + 1); };

    useEffect(() => {
        const wasUnlocked = sessionStorage.getItem(SESSION_KEY) === "1";
        setUnlocked(wasUnlocked);
        setMounted(true);
    }, []);

    // ★★★ FIX: displayChoice added to dependency array ★★★
    useEffect(() => {
        if (!mounted || !unlocked || showDetail || !displayChoice) return;

        // Kill any previous GSAP animations on these elements to prevent conflicts
        gsap.killTweensOf(".cs-logo, .cs-img, .cs-anim, .center-glow");

        const tl = gsap.timeline({ delay: 0.05 });
        tl.fromTo(".cs-logo", { opacity: 0, y: -20, filter: "blur(6px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.4, ease: "expo.out" });
        tl.fromTo(".cs-img", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out", stagger: 0.1 }, "-=0.2");
        tl.fromTo(".cs-anim", { opacity: 0, y: 16, filter: "blur(4px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.35, ease: "expo.out", stagger: 0.04 }, "-=0.3");
        gsap.to(".center-glow", { opacity: 0.30, duration: 2.5, ease: "sine.inOut", yoyo: true, repeat: -1 });

    }, [showDetail, mainKey, unlocked, mounted, displayChoice]);

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

    if (!mounted) return <div style={{ width: "100vw", height: "100dvh", background: "#020916" }} />;
    if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;
    if (!displayChoice) return <DisplayPicker onSelect={v => setDisplayChoice(v)} />;
    if (showDetail) return <ProductDetail onBack={handleBack} />;

    const bgLayers = (
        <>
            <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0, width: "100%", height: "100%" }} />
            <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1, background: "radial-gradient(ellipse at 50% 40%, transparent 35%, rgba(2,9,22,0.65) 100%)" }} />
            <div className="center-glow fixed inset-0 pointer-events-none" style={{ zIndex: 1, background: "radial-gradient(ellipse at 50% 50%, rgba(22,81,209,0.22) 0%, transparent 60%)", opacity: 0.15 }} />
            <div className="fixed top-0 inset-x-0 h-px pointer-events-none" style={{ zIndex: 3, background: "linear-gradient(90deg, transparent, rgba(91,155,255,0.6), transparent)" }} />
        </>
    );

    const backButton = (
        <button onClick={() => setDisplayChoice(null)}
            style={{ position: "absolute", top: "clamp(12px,2vh,20px)", left: "clamp(12px,2vw,24px)", background: "transparent", border: "1px solid rgba(91,155,255,0.25)", borderRadius: "999px", color: "rgba(91,155,255,0.7)", fontSize: "13px", fontWeight: 700, padding: "6px 14px", cursor: "pointer", letterSpacing: "0.1em", textTransform: "uppercase", zIndex: 20 }}>
            ← Layouts
        </button>
    );

    const logoBlock = (
        <div className="cs-logo w-full flex justify-center mb-8 sm:mb-10 md:mb-14" style={{ opacity: 0 }}>
            <Image src={CLD.footerLogo} alt="X-Ortho" width={500} height={200} className="object-contain h-auto hidden sm:block"
                style={{ width: "clamp(200px,38vw,480px)", filter: "drop-shadow(0 0 40px rgba(91,155,255,0.5)) drop-shadow(0 0 80px rgba(22,81,209,0.3))" }} />
            <Image src={CLD.logo} alt="X-Ortho" width={160} height={160} className="object-contain h-auto block sm:hidden"
                style={{ width: "clamp(70px,20vw,110px)", filter: "drop-shadow(0 0 40px rgba(91,155,255,0.5)) drop-shadow(0 0 80px rgba(22,81,209,0.3))" }} />
        </div>
    );

    const footer = (
        <div className="cs-anim w-full flex flex-col items-center gap-1 pt-10 sm:pt-14 mt-4 text-center" style={{ opacity: 0 }}>
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-white/40 text-[16px]">
                <span>Email <a href="mailto:info@xortho.com" className="font-nexa text-[#5b9bff]/80 hover:text-[#5b9bff] transition-colors font-semibold">info@xortho.com</a></span>
                <span className="text-white/20">·</span>
                <span><a href="tel:8559678461" className="font-nexa text-[#5b9bff]/80 hover:text-[#5b9bff] transition-colors font-semibold">855.XORTHO1</a></span>
            </div>
            <p className="font-nexa text-[14px] uppercase tracking-[0.3em] font-bold" style={{ color: "rgba(255,255,255,0.12)" }}>© {new Date().getFullYear()} X-Ortho · TLC DME LLC</p>
        </div>
    );

    /* ── DISPLAY 1: 3-column ── */
    if (displayChoice === 1) return (
        <main key={mainKey} className="relative w-full bg-[#020916]" style={{ minHeight: "100dvh", overflowX: "hidden" }}>
            {bgLayers}
            <div className="relative z-10 flex flex-col items-center w-full px-4 sm:px-6 lg:px-10" style={{ paddingTop: "clamp(16px,3vh,32px)", paddingBottom: "clamp(40px,6vh,80px)" }}>
                {backButton}
                {logoBlock}

                <div className="w-full flex items-start justify-center" style={{ gap: "clamp(12px,2.5vw,40px)", maxWidth: "min(98vw, 1100px)" }}>
                    <div className="cs-img flex flex-col items-center flex-1" style={{ opacity: 0, cursor: "pointer" }} onClick={() => setShowDetail(true)}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={cornerItems[0].src} alt={cornerItems[0].label}
                            style={{ width: "100%", maxHeight: "clamp(180px,28vw,420px)", objectFit: "contain", filter: "drop-shadow(0 0 18px rgba(91,155,255,0.75)) drop-shadow(0 0 36px rgba(22,81,209,0.5))", transition: "filter 0.35s ease, transform 0.35s ease" }}
                            onMouseEnter={e => { const t = e.target as HTMLImageElement; t.style.filter = "drop-shadow(0 0 28px rgba(91,155,255,1)) drop-shadow(0 0 55px rgba(22,81,209,0.9))"; t.style.transform = "scale(1.06)"; }}
                            onMouseLeave={e => { const t = e.target as HTMLImageElement; t.style.filter = "drop-shadow(0 0 18px rgba(91,155,255,0.75)) drop-shadow(0 0 36px rgba(22,81,209,0.5))"; t.style.transform = "scale(1)"; }} />
                        <p style={{ marginTop: "clamp(6px,1vh,12px)", fontSize: "clamp(9px,1vw,13px)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, color: "rgba(220,220,220,0.8)", textAlign: "center" }}>{cornerItems[0].label}</p>
                    </div>
                    <div className="cs-img flex flex-col items-center flex-1" style={{ opacity: 0, gap: "clamp(8px,1.5vw,24px)" }}>
                        {[cornerItems[2], cornerItems[3]].map((item, i) => (
                            <div key={i} className="flex flex-col items-center w-full">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={item.src} alt={item.label}
                                    style={{ width: "100%", maxHeight: "clamp(100px,13vw,200px)", objectFit: "contain", opacity: 0.72, filter: "drop-shadow(0 0 14px rgba(91,155,255,0.6)) drop-shadow(0 0 28px rgba(22,81,209,0.4))" }} />
                                <p style={{ marginTop: "clamp(4px,0.8vh,10px)", fontSize: "clamp(8px,0.85vw,12px)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, color: "rgba(180,180,180,0.5)", textAlign: "center" }}>{item.label}</p>
                            </div>
                        ))}
                    </div>
                    <div className="cs-img flex flex-col items-center flex-1" style={{ opacity: 0, cursor: "pointer" }} onClick={() => setShowDetail(true)}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={cornerItems[1].src} alt={cornerItems[1].label}
                            style={{ width: "100%", maxHeight: "clamp(180px,28vw,420px)", objectFit: "contain", filter: "drop-shadow(0 0 18px rgba(91,155,255,0.75)) drop-shadow(0 0 36px rgba(22,81,209,0.5))", transition: "filter 0.35s ease, transform 0.35s ease" }}
                            onMouseEnter={e => { const t = e.target as HTMLImageElement; t.style.filter = "drop-shadow(0 0 28px rgba(91,155,255,1)) drop-shadow(0 0 55px rgba(22,81,209,0.9))"; t.style.transform = "scale(1.06)"; }}
                            onMouseLeave={e => { const t = e.target as HTMLImageElement; t.style.filter = "drop-shadow(0 0 18px rgba(91,155,255,0.75)) drop-shadow(0 0 36px rgba(22,81,209,0.5))"; t.style.transform = "scale(1)"; }} />
                        <p style={{ marginTop: "clamp(6px,1vh,12px)", fontSize: "clamp(9px,1vw,13px)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, color: "rgba(220,220,220,0.8)", textAlign: "center" }}>{cornerItems[1].label}</p>
                    </div>
                </div>
                {footer}
            </div>
        </main>
    );

    /* ── DISPLAY 2: 2×2 grid ── */
    return (
        <main key={mainKey} className="relative w-full bg-[#020916]" style={{ minHeight: "100dvh", overflowX: "hidden" }}>
            {bgLayers}
            <div className="relative z-10 flex flex-col items-center w-full px-4 sm:px-6 lg:px-10" style={{ paddingTop: "clamp(16px,3vh,32px)", paddingBottom: "clamp(40px,6vh,80px)" }}>
                {backButton}
                {logoBlock}

                <div className="grid grid-cols-2 w-full" style={{ gap: "clamp(12px,2.5vw,40px)", maxWidth: "min(96vw, 1000px)" }}>
                    {cornerItems.map((item, i) => (
                        <div key={i} className="cs-img flex flex-col items-center"
                            style={{ opacity: 0, cursor: item.clickable ? "pointer" : "default" }}
                            onClick={() => item.clickable && setShowDetail(true)}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.src} alt={item.label}
                                style={{ width: "100%", height: "clamp(160px,22vw,360px)", objectFit: "contain", opacity: item.clickable ? 1 : 0.72, filter: "drop-shadow(0 0 18px rgba(91,155,255,0.75)) drop-shadow(0 0 36px rgba(22,81,209,0.5))", transition: "filter 0.35s ease, transform 0.35s ease" }}
                                onMouseEnter={e => { if (!item.clickable) return; const t = e.target as HTMLImageElement; t.style.filter = "drop-shadow(0 0 28px rgba(91,155,255,1)) drop-shadow(0 0 55px rgba(22,81,209,0.9))"; t.style.transform = "scale(1.06)"; }}
                                onMouseLeave={e => { const t = e.target as HTMLImageElement; t.style.filter = "drop-shadow(0 0 18px rgba(91,155,255,0.75)) drop-shadow(0 0 36px rgba(22,81,209,0.5))"; t.style.transform = "scale(1)"; }} />
                            <p style={{ marginTop: "clamp(6px,1vh,14px)", fontSize: "clamp(9px,1vw,14px)", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, color: item.clickable ? "rgba(220,220,220,0.8)" : "rgba(180,180,180,0.5)", whiteSpace: "nowrap", textAlign: "center" }}>{item.label}</p>
                        </div>
                    ))}
                </div>
                {footer}
            </div>
        </main>
    );
}