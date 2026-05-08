"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { CLD } from "@/lib/cloudinary";

const SITE_PASSWORD = "xortho2025";
const SESSION_KEY = "xo_auth";

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
            <div className={`relative z-10 flex flex-col items-center gap-6 px-6 ${shake ? "animate-shake" : ""}`}
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
                    <p style={{ fontFamily: "inherit", fontSize: "clamp(10px,1.1vw,13px)", textTransform: "uppercase", letterSpacing: "0.28em", color: "rgba(91,155,255,0.6)", fontWeight: 700 }}>Private Access Only</p>
                    <div style={{ width: "100%", position: "relative" }}>
                        <input ref={inputRef} type="password" placeholder="Enter password" value={value}
                            onChange={e => { setValue(e.target.value); setError(false); }}
                            onKeyDown={e => e.key === "Enter" && attempt()}
                            style={{ width: "100%", background: "rgba(4,8,28,0.7)", border: `1px solid ${error ? "rgba(255,80,80,0.6)" : "rgba(91,155,255,0.25)"}`, borderRadius: "10px", padding: "12px 16px", color: "#e5e7eb", fontSize: "15px", outline: "none", letterSpacing: "0.1em", transition: "border-color 0.2s", boxSizing: "border-box" as const }} />
                        {error && <p style={{ position: "absolute", bottom: "-22px", left: 0, fontSize: "11px", color: "rgba(255,100,100,0.85)", letterSpacing: "0.05em" }}>Incorrect password</p>}
                    </div>
                    <button onClick={attempt}
                        style={{ marginTop: error ? "12px" : "0", width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid rgba(91,155,255,0.35)", background: "linear-gradient(135deg, rgba(22,81,209,0.35), rgba(6,10,35,0.6))", color: "rgba(147,197,253,0.95)", fontSize: "13px", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.2em", cursor: "pointer", transition: "background 0.2s, border-color 0.2s" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg, rgba(22,81,209,0.55), rgba(6,10,35,0.7))"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg, rgba(22,81,209,0.35), rgba(6,10,35,0.6))"; }}>Enter</button>
                </div>
                <p style={{ fontSize: "10px", letterSpacing: "0.25em", color: "rgba(255,255,255,0.12)", textTransform: "uppercase" }}>© {new Date().getFullYear()} X-Ortho · TLC DME LLC</p>
            </div>
        </div>
    );
}

const PRODUCTS: Record<string, {
    name: string; image: string;
    section1: { title: string; body: string; features: { img: string; title: string; desc: string }[] };
    section2: { title: string; body: string; features: { img: string; title: string; desc: string }[] };
}> = {
    "boot-short": {
        name: "XO Boot Pneumatic Short", image: CLD.xoBootShort,
        section1: {
            title: "World Class Aerodynamic Structure", body: "Technologically advanced aerodynamic & ergonomic engineering enhances structural integrity generating cast like stability & protection. Crafted with innovative materials to reduce weight & allow struts to flex, combined with a calf adjustment function to adapt to various anatomical differences. Safe step rocker absorbs shock & offloads pressure generating a fluid natural gait with increased traction control.", features: [
                { img: CLD.xoCage, title: "Flex Strut Armor", desc: "Flexible Lightweight\nDurable Protection" },
                { img: CLD.xoShell, title: "Anterior Shield", desc: "Removeable Pliable\nDorsal Protection" },
                { img: CLD.xocomingsoonfrontview, title: "Calf Adjustment", desc: "Accommodates Larger\nWider Lower Legs" },
                { img: CLD.xoRocker, title: "Safe Step Rocker", desc: "Shock Absorption\nFluid Heel Toe Gait" },
            ]
        },
        section2: {
            title: "Revolutionary Compression System", body: "Purposefully placed compartmentalized air cells provide greater surface area contact, combined with a low force bulb & intuitive inflation deflation valve allows for controlled customization of compression. T-shirt soft interior liner regulates temperature & enhances comfort. EZ grip strapping system has textured tips with a hybrid hook loop strap & 360 swivel d-rings for quicker donning & doffing.", features: [
                { img: CLD.xoLiner, title: "Compression System", desc: "Compartmentalized\nCustomization" },
                { img: CLD.xoRevolutionary, title: "Pneumatic System", desc: "Effortless & Rapid\nInflate & Deflate" },
                { img: CLD.xocomingsoonStrap, title: "Strapping System", desc: "EZ Grip Textured\nTips & 360 Swivel" },
                { img: CLD.sleeves, title: "AFO Undersleeve", desc: "Gentle Compression\nSkin Barrier & Hygiene" },
            ]
        },
    },
    "boot-tall": {
        name: "XO Boot Pneumatic Tall", image: CLD.xoBootTall,
        section1: {
            title: "World Class Aerodynamic Structure", body: "Technologically advanced aerodynamic & ergonomic engineering enhances structural integrity generating cast like stability & protection. Crafted with innovative materials to reduce weight & allow struts to flex, combined with a calf adjustment function to adapt to various anatomical differences. Safe step rocker absorbs shock & offloads pressure generating a fluid natural gait with increased traction control.", features: [
                { img: CLD.xoCage, title: "Flex Strut Armor", desc: "Flexible Lightweight\nDurable Protection" },
                { img: CLD.xoShell, title: "Anterior Shield", desc: "Removeable Pliable\nDorsal Protection" },
                { img: CLD.xocomingsoonfrontview, title: "Calf Adjustment", desc: "Accommodates Larger\nWider Lower Legs" },
                { img: CLD.xoRocker, title: "Safe Step Rocker", desc: "Shock Absorption\nFluid Heel Toe Gait" },
            ]
        },
        section2: {
            title: "Revolutionary Compression System", body: "Purposefully placed compartmentalized air cells provide greater surface area contact, combined with a low force bulb & intuitive inflation deflation valve allows for controlled customization of compression. T-shirt soft interior liner regulates temperature & enhances comfort. EZ grip strapping system has textured tips with a hybrid hook loop strap & 360 swivel d-rings for quicker donning & doffing.", features: [
                { img: CLD.xoLiner, title: "Compression System", desc: "Compartmentalized\nCustomization" },
                { img: CLD.xoRevolutionary, title: "Pneumatic System", desc: "Effortless & Rapid\nInflate & Deflate" },
                { img: CLD.xocomingsoonStrap, title: "Strapping System", desc: "EZ Grip Textured\nTips & 360 Swivel" },
                { img: CLD.sleeves, title: "AFO Undersleeve", desc: "Gentle Compression\nSkin Barrier & Hygiene" },
            ]
        },
    },
    "back": {
        name: "XO Back LSO Cryo", image: CLD.xoBackComingSoon,
        section1: {
            title: "Pain Relief and Stabilization", body: "Provides pain-relieving stabilization. Restricts and controls gross trunk movement. Manages intersegmental motion of vertebrae in multiple planes. Delivers deep penetrating cold and hot therapy via a removable gel pad.", features: [
                { img: CLD.backBelt, title: "Stabilization", desc: "Pain Relieving\nTrunk Control" },
                { img: CLD.backBeltWorn, title: "Gross Movement", desc: "Restricts & Controls\nTrunk Motion" },
                { img: CLD.backBeltBlueprint, title: "Vertebrae Motion", desc: "Manages Intersegmental\nMotion in Planes" },
                { img: CLD.backBeltSide, title: "Hot & Cold Therapy", desc: "Removable Gel Pad\nDeep Penetrating Relief" },
            ]
        },
        section2: {
            title: "Superior Biomechanical Advantage", body: "Contoured carbon fiber flexible posterior panel. Next-generation 6 post dual string pulley system. Self-adjusts to each patient’s unique lordotic curve. Delivers more compression with far less effort. Simultaneously closes top & bottom of the low-profile orthosis. Reduces spine load by 30%-40%.", features: [
                { img: CLD.backBeltFront, title: "Carbon Fiber Panel", desc: "Contoured Flexible\nPosterior Panel" },
                { img: CLD.backBeltBlueprint, title: "Pulley System", desc: "6 Post Dual String\nNext-Generation" },
                { img: CLD.backBeltWorn, title: "Lordotic Curve", desc: "Self-Adjusts to\nUnique Patient Curve" },
                { img: CLD.backBelt, title: "Spine Load", desc: "Reduces Load\nBy 30%-40%" },
            ]
        },
    },
    "knee": {
        name: "XO Knee ROM Cryo", image: CLD.xoKneeHingedComingSoon,
        section1: {
            title: "Applications for Knee Injuries", body: "Versatile specialized state-of-the-art solution for most injuries. State-of-the-art design adopted by leading professionals and athletes. Suitable for most knee injuries.", features: [
                { img: CLD.kneeBrace, title: "State-of-the-Art", desc: "Adopted by Leading\nProfessionals & Athletes" },
                { img: CLD.kneeFront, title: "Versatile Solution", desc: "Specialized Design\nFor Most Injuries" },
                { img: CLD.kneeOpen, title: "Most Knee Injuries", desc: "Suitable & Adaptable\nBroad Application" },
                { img: CLD.kneeSleeve, title: "Knee Sleeve", desc: "Comfortable Fit\nEnhanced Support" },
            ]
        },
        section2: {
            title: "Advanced Dual Axis Hinges & Cryotherapy", body: "Moves on two planes of motion independently. Accurately mirrors natural knee motion. ROM Unicentric Hinges control flexion and extension. Adjustable in 15-degree increments from full lockout to full range of motion. Removable medical-grade gel pad for cold and hot therapy. Provides pain relief through effective temperature management.", features: [
                { img: CLD.kneeHinge1, title: "Dual Axis Hinges", desc: "Two Planes of Motion\nMirrors Natural Knee" },
                { img: CLD.kneeHinge2, title: "ROM Unicentric", desc: "Controls Flexion\n& Extension" },
                { img: CLD.kneeStrap1, title: "15° Increments", desc: "Full Lockout to\nFull Range of Motion" },
                { img: CLD.kneeCryoPad, title: "Cryotherapy", desc: "Medical-Grade Gel Pad\nCold & Hot Therapy" },
            ]
        },
    }
};

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
    color: "rgba(206, 200, 200, 0.77)",
    textShadow: "0 0 6px rgba(200,200,200,0.25), 0 1px 0 rgba(255,255,255,0.15)",
};

function ProductDetail({ onBack, productIds }: { onBack: () => void; productIds: string[] }) {
    const isSingle = productIds.length === 1;

    useEffect(() => {
        window.scrollTo(0, 0);
        window.history.pushState({ detail: "product" }, "");
        const handlePopState = () => { onBack(); };
        window.addEventListener("popstate", handlePopState);
        return () => { window.removeEventListener("popstate", handlePopState); };
    }, [onBack]);

    const sectionsToRender = productIds.flatMap((id, idx) => {
        const p = PRODUCTS[id];
        if (productIds.length === 2) {
            return idx === 0 ? [p.section1] : [p.section2];
        }
        return [p.section1, p.section2];
    });

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" style={{ background: "#020916" }}>
            <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(17,17,132,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.05) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
            <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(22,81,209,0.18) 0%, transparent 65%)" }} />
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-14 py-6 sm:py-8">
                <div className="flex items-center justify-center relative mb-8 sm:mb-10">
                    <button onClick={onBack} className="absolute left-0 font-nexa uppercase tracking-[0.15em] font-bold px-3 py-1.5 rounded-full transition-all"
                        style={{ border: "1px solid rgba(91,155,255,0.25)", color: "rgba(91,155,255,0.7)", background: "transparent", fontSize: "15px" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(22,81,209,0.15)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}>←</button>
                    <Image src={CLD.footerLogo} alt="X-Ortho" width={450} height={200} className="object-contain h-auto hidden sm:block"
                        style={{ width: "clamp(180px,36vw,400px)", filter: "drop-shadow(0 0 40px rgba(91,155,255,0.5)) drop-shadow(0 0 80px rgba(22,81,209,0.3))" }} />
                    <Image src={CLD.logo} alt="X-ORTHO" width={200} height={200} className="block sm:hidden"
                        style={{ width: "90px", height: "90px", objectFit: "contain", filter: "drop-shadow(0 0 12px rgba(91,155,255,0.35))" }} />
                </div>

                <div className={`grid grid-cols-1 ${isSingle ? '' : 'md:grid-cols-2'} gap-8 md:gap-12 mb-10 md:mb-14`}>
                    {productIds.map(id => {
                        const product = PRODUCTS[id];
                        return (
                            <div key={id} className={`flex flex-col items-center ${isSingle ? 'md:col-span-2' : ''}`}>
                                <div className="relative flex items-center justify-center" style={{ width: "100%", height: "clamp(260px,38vw,480px)" }}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={product.image} alt={product.name} style={{ maxWidth: isSingle ? "50%" : "100%", maxHeight: "100%", objectFit: "contain", filter: "drop-shadow(0 0 60px rgba(91,155,255,0.85)) drop-shadow(0 30px 80px rgba(22,81,209,0.6))" }} />
                                </div>
                                <h2 className="font-nexa font-black uppercase mt-4 text-center" style={{ fontSize: "clamp(1rem,2.2vw,1.8rem)", letterSpacing: "0.05em", ...silverMetallic }}>{product.name}</h2>
                            </div>
                        );
                    })}
                </div>

                {/* --- ALIGNMENT FIX: Added flex flex-col and mt-auto to feature grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {sectionsToRender.map((section, si) => (
                        <div key={si} className="flex flex-col">
                            <div>
                                <h3 className="font-nexa font-black uppercase text-center mb-3 sm:mb-5" style={{ fontSize: "clamp(0.8rem,1.5vw,1.3rem)", ...blueMetallic }}>{section.title}</h3>
                                <p className="font-nexa text-[11px] sm:text-[13px] text-left leading-relaxed mb-4 sm:mb-6" style={{ color: "rgba(255,255,255,0.60)" }}>{section.body}</p>
                            </div>
                            {/* mt-auto will push this grid to the bottom, forcing both sides to align */}
                            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-auto">
                                {section.features.map((f, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl" style={{ background: "rgba(8,12,42,0.7)", border: "1px solid rgba(91,155,255,0.15)" }}>
                                        <div className="relative flex items-center justify-center" style={{ width: "clamp(100px,15vw,200px)", height: "clamp(100px,15vw,200px)" }}>
                                            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)", filter: "blur(8px)" }} />
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={f.img} alt={f.title} className="relative" style={{ width: "92%", height: "92%", objectFit: "contain", filter: "drop-shadow(0 0 15px rgba(91,155,255,0.5))" }} />
                                        </div>
                                        <p className="font-nexa font-black text-center uppercase tracking-wide leading-tight whitespace-nowrap" style={{ ...silverTextSoft, fontSize: "15px" }}>{f.title}</p>
                                        <p className="font-nexa text-center leading-snug whitespace-pre-line" style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px" }}>{f.desc}</p>
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
                    <p className="font-nexa text-[9px] sm:text-xs uppercase tracking-[0.35em] mt-3 sm:mt-5" style={silverMetallic}>© {new Date().getFullYear()} X-Ortho · TLC DME LLC · info@xortho.com · 855.XORTHO1</p>
                </div>
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════
   ORBITAL SHOWCASE (WITH SLOW SPEED + FIXED MOUSE DRAG)
   ══════════════════════════════════════════════════════════════ */
function OrbitalShowcase({ products, onItemClick, centerY = 50 }: {
    products: { src: string; label: string; clickable: boolean; ids: string[] }[];
    onItemClick: (i: number) => void;
    centerY?: number;
}) {
    const ringRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const labelNameRef = useRef<HTMLParagraphElement>(null);
    const labelSubRef = useRef<HTMLSpanElement>(null);
    const labelWrapRef = useRef<HTMLDivElement>(null);
    const angleRef = useRef(0);
    const frontIdxRef = useRef(0);
    const frontClickableRef = useRef(false);
    const prevFrontRef = useRef(-1);
    const pauseUntilRef = useRef(0);
    const radiusRef = useRef({ x: 300, y: 48 });
    const mouseTarget = useRef({ x: 0, y: 0 });
    const mouseSmooth = useRef({ x: 0, y: 0 });
    const snapTargetRef = useRef<number | null>(null);

    // Drag states
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const dragStartAngle = useRef(0);
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            const rx = w < 640 ? Math.min(w * 0.38, 170) : Math.min(w * 0.33, 340);
            const ry = rx * 0.16;
            radiusRef.current = { x: rx, y: ry };
            if (ringRef.current) {
                ringRef.current.style.width = `${rx * 2}px`;
                ringRef.current.style.height = `${ry * 2}px`;
            }
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    useEffect(() => {
        const handle = (e: MouseEvent) => {
            mouseTarget.current.x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
            mouseTarget.current.y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
        };
        window.addEventListener("mousemove", handle);
        return () => window.removeEventListener("mousemove", handle);
    }, []);

    // Global Drag Listeners (FIXED DIRECTION & SMOOTH RESUME)
    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return;
            const deltaX = e.clientX - dragStartX.current;
            angleRef.current = dragStartAngle.current + deltaX * 0.004; // Fixed direction (+deltaX)
        };
        const onMouseUp = () => {
            if (isDragging.current) {
                isDragging.current = false;
                setDragging(false);
                // Pause auto-rotation for 4 seconds after dragging so it doesn't jump
                pauseUntilRef.current = performance.now() + 4000;
                prevFrontRef.current = -1; // Force re-snap to nearest item
            }
        };
        const onTouchMove = (e: TouchEvent) => {
            if (!isDragging.current) return;
            const deltaX = e.touches[0].clientX - dragStartX.current;
            angleRef.current = dragStartAngle.current + deltaX * 0.004; // Fixed direction (+deltaX)
        };
        const onTouchEnd = () => {
            if (isDragging.current) {
                isDragging.current = false;
                setDragging(false);
                pauseUntilRef.current = performance.now() + 4000;
                prevFrontRef.current = -1;
            }
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("touchmove", onTouchMove);
        window.addEventListener("touchend", onTouchEnd);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);
        };
    }, []);

    const handleDragStart = (clientX: number) => {
        isDragging.current = true;
        dragStartX.current = clientX;
        dragStartAngle.current = angleRef.current;
        setDragging(true);
        snapTargetRef.current = null;
        pauseUntilRef.current = 0;
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (labelNameRef.current && labelSubRef.current && labelWrapRef.current) {
                labelNameRef.current.textContent = products[0].label;
                labelSubRef.current.textContent = products[0].clickable ? "VIEW DETAILS →" : "COMING SOON";
                labelSubRef.current.style.color = products[0].clickable ? "rgba(91,155,255,0.8)" : "rgba(91,155,255,0.45)";
                frontClickableRef.current = products[0].clickable;
                gsap.fromTo(labelWrapRef.current,
                    { opacity: 0, x: -40, filter: "blur(10px)" },
                    { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.7, ease: "expo.out" }
                );
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [products]);

    useEffect(() => {
        let raf: number;
        const speed = 0.0015;
        const pauseDuration = 5000;
        const n = products.length;
        const TWO_PI = Math.PI * 2;
        const SNAP_SPEED = 0.1;

        const animate = () => {
            const now = performance.now();
            mouseSmooth.current.x += (mouseTarget.current.x - mouseSmooth.current.x) * 0.06;
            mouseSmooth.current.y += (mouseTarget.current.y - mouseSmooth.current.y) * 0.06;

            if (snapTargetRef.current !== null) {
                const diff = snapTargetRef.current - angleRef.current;
                angleRef.current += diff * SNAP_SPEED;
                if (Math.abs(diff) < 0.0005) {
                    angleRef.current = snapTargetRef.current;
                    snapTargetRef.current = null;
                }
            } else if (!isDragging.current && now >= pauseUntilRef.current) {
                angleRef.current += speed;
            }

            const a = angleRef.current;
            const { x: rx, y: ry } = radiusRef.current;
            const mx = mouseSmooth.current.x;
            const my = mouseSmooth.current.y;
            let maxF = -1, maxI = 0;

            for (let i = 0; i < n; i++) {
                const el = itemRefs.current[i];
                if (!el) continue;

                const ia = a + (i * TWO_PI) / n;
                const px = Math.sin(ia) * rx;
                const py = (Math.cos(ia) - 1) * ry;
                const f = (Math.cos(ia) + 1) / 2;
                if (f > maxF) { maxF = f; maxI = i; }

                const breathe = 0.85 + 0.15 * Math.sin(a * 2);
                const sc = 0.3 + 0.7 * f;
                const op = 0.03 + 0.97 * f;
                const bl = Math.max(0, 16 * (1 - f));
                const glow = 45 * f * breathe;
                const glowAlpha = (0.06 + 0.66 * f).toFixed(2);
                const depth = 1 - f;
                const parallaxX = mx * 18 * depth;
                const parallaxY = my * 12 * depth;

                const totalX = px + parallaxX;
                const totalY = py + parallaxY;
                el.style.transform = `translate(calc(-50% + ${totalX}px), calc(-50% + ${totalY}px)) scale(${sc})`;
                el.style.opacity = `${op}`;
                el.style.filter = `blur(${bl}px) drop-shadow(0 0 ${glow}px rgba(91,155,255,${glowAlpha}))`;
                el.style.zIndex = `${Math.round(f * 100)}`;
            }

            if (maxI !== prevFrontRef.current && maxF > 0.95) {
                prevFrontRef.current = maxI;
                pauseUntilRef.current = now + pauseDuration;
                frontIdxRef.current = maxI;
                frontClickableRef.current = products[maxI].clickable;

                if (!isDragging.current) {
                    const exactCenter = -(maxI * TWO_PI) / n;
                    const currentA = angleRef.current;
                    let diff = ((exactCenter - currentA) % TWO_PI + TWO_PI) % TWO_PI;
                    if (diff > Math.PI) diff -= TWO_PI;
                    snapTargetRef.current = currentA + diff;
                }

                const wrap = labelWrapRef.current;
                const name = labelNameRef.current;
                const sub = labelSubRef.current;
                if (wrap && name && sub) {
                    gsap.timeline()
                        .to(wrap, { opacity: 0, x: -30, filter: "blur(8px)", duration: 0.2, ease: "power2.in" })
                        .call(() => {
                            name.textContent = products[maxI].label;
                            sub.textContent = products[maxI].clickable ? "VIEW DETAILS →" : "COMING SOON";
                            sub.style.color = products[maxI].clickable ? "rgba(91,155,255,0.8)" : "rgba(91,155,255,0.45)";
                        })
                        .set(wrap, { x: 30 })
                        .to(wrap, { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.45, ease: "expo.out" });
                }
            }

            raf = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(raf);
    }, [products, centerY]);

    const handleLabelClick = () => {
        if (frontClickableRef.current) onItemClick(frontIdxRef.current);
    };

    return (
        <div style={{ position: "absolute", inset: 0 }}
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        >
            <div style={{ position: "absolute", inset: 0, pointerEvents: "auto", cursor: dragging ? "grabbing" : "grab", zIndex: 0 }} />

            <div ref={labelWrapRef} className="absolute flex flex-col gap-3"
                style={{
                    left: "clamp(12px,3.5vw,55px)", top: `${centerY}%`, transform: "translateY(-50%)",
                    zIndex: 200, maxWidth: "clamp(110px,22vw,320px)", opacity: 0, pointerEvents: "auto", cursor: "default",
                }}
                onClick={handleLabelClick}
            >
                <div style={{ width: "clamp(24px,3vw,50px)", height: "3px", borderRadius: "2px", background: "linear-gradient(90deg, rgba(91,155,255,0.8), rgba(91,155,255,0.1))", marginBottom: "-4px" }} />
                <p ref={labelNameRef} className="font-nexa font-black uppercase" style={{
                    fontSize: "clamp(1.2rem,2.8vw,2.8rem)", lineHeight: 1, letterSpacing: "0.03em", whiteSpace: "pre-line",
                    backgroundImage: "linear-gradient(180deg, #ffffff 0%, #d4d4d4 20%, #f5f5f5 35%, #b0b0b0 55%, #e8e8e8 70%, #999999 85%, #cccccc 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    filter: "drop-shadow(0 1px 0 rgba(255,255,255,0.55)) drop-shadow(0 -1px 0 rgba(0,0,0,0.45))",
                }} />
                <span ref={labelSubRef} className="font-nexa font-bold uppercase" style={{
                    fontSize: "clamp(8px,0.75vw,11px)", letterSpacing: "0.28em", color: "rgba(91,155,255,0.8)",
                }} />
            </div>

            <div ref={ringRef} className="absolute pointer-events-none"
                style={{
                    left: "50%", top: `${centerY}%`, transform: "translate(-50%, -50%)",
                    border: "1px dashed rgba(91,155,255,0.07)", borderRadius: "50%",
                    boxShadow: "0 0 40px rgba(91,155,255,0.02), inset 0 0 40px rgba(91,155,255,0.02)", zIndex: 1
                }} />

            {Array.from({ length: 24 }).map((_, i) => {
                const tickAngle = (i / 24) * Math.PI * 2;
                const tx = Math.sin(tickAngle);
                const ty = Math.cos(tickAngle);
                const isMajor = i % 6 === 0;
                return (
                    <div key={i} className="absolute pointer-events-none"
                        style={{ left: "50%", top: `${centerY}%`, transform: "translate(-50%, -50%)", width: "100%", height: "100%", zIndex: 1 }}>
                        <div style={{
                            position: "absolute", left: `${50 + tx * 49.5}%`, top: `${50 + (ty - 1) * 49.5}%`,
                            width: isMajor ? "3px" : "1.5px", height: isMajor ? "3px" : "1.5px", borderRadius: "50%",
                            background: isMajor ? "rgba(91,155,255,0.15)" : "rgba(91,155,255,0.06)", transform: "translate(-50%,-50%)"
                        }} />
                    </div>
                );
            })}

            <div className="absolute pointer-events-none"
                style={{
                    left: "50%", top: `${centerY}%`, transform: "translate(-50%, -50%)",
                    width: "160px", height: "160px", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(22,81,209,0.10) 0%, transparent 70%)",
                    filter: "blur(35px)", zIndex: 1
                }} />

            {products.map((p, i) => (
                <div key={i}
                    ref={el => { itemRefs.current[i] = el; }}
                    className="absolute flex flex-col items-center"
                    style={{
                        left: "50%",
                        top: `${centerY}%`,
                        width: "clamp(130px,26vw,340px)",
                        willChange: "transform,opacity,filter",
                        cursor: p.clickable ? "pointer" : "default",
                        transform: "translate(-50%, -50%) scale(1)",
                        pointerEvents: "auto"
                    }}
                    onClick={() => { if (frontIdxRef.current === i && p.clickable && !dragging) onItemClick(i); }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.src} alt={p.label} className="w-full pointer-events-none"
                        style={{ height: "clamp(140px,30vw,420px)", objectFit: "contain" }} />
                    <p className="font-nexa font-bold uppercase text-center whitespace-nowrap pointer-events-none"
                        style={{ marginTop: "8px", fontSize: "clamp(7px,0.9vw,13px)", letterSpacing: "0.1em", color: "rgba(220,220,220,0.8)" }}>
                        {p.label}
                    </p>
                </div>
            ))}
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════
   MAIN
   ══════════════════════════════════════════════════════════════ */
export default function ComingSoon() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mounted, setMounted] = useState(false);
    const [activeProductIds, setActiveProductIds] = useState<string[] | null>(null);
    const [mainKey, setMainKey] = useState(0);
    const [unlocked, setUnlocked] = useState(false);
    const betterRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const style = document.createElement("style");
        style.id = "xo-overflow-fix";
        style.textContent = `html{overflow:hidden;height:100%}body{overflow-y:auto;height:100%;margin:0;padding:0}`;
        document.head.appendChild(style);
        return () => { document.getElementById("xo-overflow-fix")?.remove(); };
    }, []);

    const bgLayers = (
        <>
            <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0, width: "100%", height: "100%" }} />
            <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1, background: "radial-gradient(ellipse at 50% 40%, transparent 35%, rgba(2,9,22,0.65) 100%)" }} />
            <div className="center-glow fixed inset-0 pointer-events-none" style={{ zIndex: 1, background: "radial-gradient(ellipse at 50% 50%, rgba(22,81,209,0.22) 0%, transparent 60%)", opacity: 0.15 }} />
            <div className="fixed top-0 inset-x-0 h-px pointer-events-none" style={{ zIndex: 3, background: "linear-gradient(90deg, transparent, rgba(91,155,255,0.6), transparent)" }} />
        </>
    );

    const handleBack = () => { setActiveProductIds(null); setMainKey(k => k + 1); };

    useEffect(() => {
        setUnlocked(sessionStorage.getItem(SESSION_KEY) === "1");
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !unlocked || activeProductIds) return;
        const tl = gsap.timeline({ delay: 0.05 });
        tl.fromTo(".cs-logo", { opacity: 0, y: -20, filter: "blur(6px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.4, ease: "expo.out" });
        tl.fromTo(".cs-anim", { opacity: 0, y: 16, filter: "blur(4px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "expo.out" }, "-=0.15");
        gsap.to(".center-glow", { opacity: 0.30, duration: 2.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
    }, [activeProductIds, mainKey, unlocked, mounted]);

    useEffect(() => {
        if (!mounted || !unlocked || activeProductIds) return;
        const el = betterRef.current;
        const ft = footerRef.current;
        if (!el && !ft) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gsap.to(entry.target, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "expo.out" });
                } else {
                    const isBetter = entry.target === el;
                    gsap.to(entry.target, { opacity: 0, y: isBetter ? 50 : 20, filter: isBetter ? "blur(8px)" : "blur(0px)", duration: 0.4, ease: "power2.in" });
                }
            });
        }, { threshold: 0.12 });
        if (el) { gsap.set(el, { opacity: 0, y: 50, filter: "blur(8px)" }); observer.observe(el); }
        if (ft) { gsap.set(ft, { opacity: 0, y: 20 }); observer.observe(ft); }
        return () => observer.disconnect();
    }, [activeProductIds, mainKey, unlocked, mounted]);

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

    if (!mounted) return <div style={{ width: "100%", height: "100dvh", background: "#020916" }} />;
    if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;
    if (activeProductIds) return <ProductDetail onBack={handleBack} productIds={activeProductIds} />;

    const products = [
        { src: CLD.xoBootShort, label: "XO Boot\nPneumatic Short", clickable: true, ids: ["boot-short", "boot-tall"] },
        { src: CLD.xoBootTall, label: "XO Boot\nPneumatic Tall", clickable: true, ids: ["boot-short", "boot-tall"] },
        { src: CLD.xoBackComingSoon, label: "XO Back\nLSO Cryo", clickable: true, ids: ["back"] },
        { src: CLD.xoKneeHingedComingSoon, label: "XO Knee\nROM Cryo", clickable: true, ids: ["knee"] },
    ];

    return (
        <main key={mainKey} style={{ margin: 0, padding: 0, background: "#020916" }}>
            {bgLayers}
            <div style={{ position: "relative", width: "100%", minHeight: "150vh", display: "flex", flexDirection: "column", margin: 0, padding: 0 }}>
                <div className="cs-logo" style={{ width: "100%", display: "flex", justifyContent: "center", paddingTop: "clamp(8px, 3vh, 32px)", zIndex: 30, position: "relative", opacity: 0, flexShrink: 0 }}>
                    <Image src={CLD.footerLogo} alt="X-Ortho" width={500} height={200} className="object-contain h-auto hidden sm:block"
                        style={{ width: "clamp(180px,32vw,400px)", filter: "drop-shadow(0 0 40px rgba(91,155,255,0.5)) drop-shadow(0 0 80px rgba(22,81,209,0.3))" }} />
                    <Image src={CLD.logo} alt="X-Ortho" width={160} height={160} className="object-contain h-auto block sm:hidden"
                        style={{ width: "clamp(60px,16vw,100px)", filter: "drop-shadow(0 0 40px rgba(91,155,255,0.5)) drop-shadow(0 0 80px rgba(22,81,209,0.3))" }} />
                </div>

                <div className="cs-anim" style={{ position: "relative", width: "100%", flex: 1, minHeight: 0, opacity: 0, margin: 0, padding: 0 }}>
                    <OrbitalShowcase
                        products={products}
                        onItemClick={(i) => { if (products[i].clickable) setActiveProductIds(products[i].ids); }}
                        centerY={50}
                    />
                </div>

                <div ref={betterRef} className="text-center" style={{ width: "100%", borderTop: "1px solid rgba(91,155,255,0.15)", paddingTop: "clamp(24px, 3.5vh, 48px)", flexShrink: 0, margin: 0 }}>
                    <p className="font-nexa font-black uppercase text-lg sm:text-2xl md:text-3xl" style={silverMetallic}>Better Design. Better Engineering. Better Quality.</p>
                    <p className="font-nexa font-black uppercase text-lg sm:text-2xl md:text-3xl mt-1 sm:mt-2" style={silverMetallic}>Better Functionality. Better Patient Experience.</p>
                    <p className="font-nexa font-black uppercase text-lg sm:text-2xl md:text-3xl mt-1 sm:mt-2" style={silverMetallic}>Better Outcomes. Better DME.</p>
                </div>

                <div ref={footerRef} className="text-center" style={{ width: "100%", paddingBottom: "clamp(16px, 3vh, 40px)", flexShrink: 0, margin: 0 }}>
                    <p className="font-nexa text-[9px] sm:text-xs uppercase tracking-[0.35em]" style={silverMetallic}>© {new Date().getFullYear()} X-Ortho · TLC DME LLC · info@xortho.com · 855.XORTHO1</p>
                </div>
            </div>
        </main>
    );
}