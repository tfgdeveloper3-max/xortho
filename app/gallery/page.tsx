"use client";
import { CLD } from "@/lib/cloudinary";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Navbar from "@/components/navbar";
import StickyButtons from "@/components/sticky-buttons";

gsap.registerPlugin(ScrollTrigger);

const galleryData = [
    {
        id: "xboot",
        title: "XO Boot Pneumatic",
        tag: "Pneumatic Walking Boot",
        href: "/products/xboot",
        images: [
            { src: CLD.shoe, label: "XO Boot" },
            { src: CLD.xoFullBoot, label: "Full Boot" },
            { src: CLD.xoFrontView, label: "Front View" },
            { src: CLD.xoCage, label: "Outer Cage" },
            { src: CLD.xoShell, label: "Aerodynamic Shell" },
            { src: CLD.xoStraps, label: "Strap System" },
            { src: CLD.xoGripTips, label: "Grip Tips" },
            { src: CLD.xoEzBulb, label: "EZ Adjust Bulb" },
            { src: CLD.xoLiner, label: "Liner" },
            { src: CLD.xoRocker, label: "Rocker Sole" },
            { src: CLD.xoInsole, label: "Inner Sole" },
            { src: CLD.bootBlueprint, label: "Blueprint" },
            { src: CLD.xbootBothSide, label: "Both Sides" },
            { src: CLD.xbootBottom, label: "Bottom View" },
        ],
    },
    {
        id: "knee",
        title: "XO Knee Support ROM Cryo",
        tag: "Knee Support ROM Cryo",
        href: "/products/knee",
        images: [
            { src: CLD.kneeFront, label: "Knee Front" },
            { src: CLD.kneeProduct2, label: "Side View" },
            { src: CLD.kneeHinge1, label: "Hinge In Support" },
            { src: CLD.kneeHinge2, label: "Dual-Axis Hinge" },
            { src: CLD.kneeHingeSingle, label: "Hinge Detail" },
            { src: CLD.kneeStrap1, label: "Strap System" },
            { src: CLD.kneeOpen, label: "Open View" },
            { src: CLD.kneeCryoPad, label: "Cryo Gel Pad" },
            { src: CLD.kneeSleeve, label: "KO Undersleeve" },
            { src: CLD.kneeBlueprint, label: "Blueprint" },
            { src: CLD.kneeBrace, label: "Classic View" },
        ],
    },
];

// ── Lightbox ──
function Lightbox({ images, startIdx, onClose }: {
    images: { src: string; label: string }[];
    startIdx: number;
    onClose: () => void;
}) {
    const [idx, setIdx] = useState(startIdx);
    const overlayRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    }, []);

    useEffect(() => {
        if (imgRef.current) {
            gsap.fromTo(imgRef.current, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
        }
    }, [idx]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
            if (e.key === "ArrowRight") setIdx(p => (p + 1) % images.length);
            if (e.key === "ArrowLeft") setIdx(p => (p - 1 + images.length) % images.length);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [images.length]);

    const close = () => {
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: "power2.in", onComplete: onClose });
    };

    return (
        <div ref={overlayRef} className="fixed inset-0 z-[99999] flex items-center justify-center"
            style={{ background: "rgba(2,9,22,0.95)", backdropFilter: "blur(20px)", opacity: 0 }}
            onClick={close}>
            <div className="relative flex flex-col items-center gap-4" style={{ width: "min(90vw,780px)" }}
                onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="w-full flex items-center justify-between px-1">
                    <span className="text-white/50 text-xs uppercase tracking-widest font-bold">
                        {idx + 1} / {images.length}
                    </span>
                    <span className="text-white font-bold text-sm">{images[idx].label}</span>
                    <button onClick={close} className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                        <X className="w-4 h-4 text-white" />
                    </button>
                </div>

                {/* Image */}
                <div className="relative w-full rounded-3xl overflow-hidden flex items-center justify-center"
                    style={{ height: "65vh", background: "linear-gradient(145deg,rgba(6,10,35,0.96),rgba(12,22,65,0.92))", border: "1px solid rgba(91,155,255,0.15)", boxShadow: "0 0 80px rgba(22,81,209,0.25)" }}>
                    {/* Prev */}
                    <button onClick={() => setIdx(p => (p - 1 + images.length) % images.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                        <ArrowLeft className="w-4 h-4 text-white" />
                    </button>
                    {/* Next */}
                    <button onClick={() => setIdx(p => (p + 1) % images.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                        <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img ref={imgRef} src={images[idx].src} alt={images[idx].label}
                        style={{ maxWidth: "82%", maxHeight: "82%", objectFit: "contain", filter: "drop-shadow(0 0 40px rgba(22,81,209,0.35))" }} />
                </div>

                {/* Dots */}
                <div className="flex items-center gap-1.5 flex-wrap justify-center">
                    {images.map((_, i) => (
                        <button key={i} onClick={() => setIdx(i)}
                            className="rounded-full transition-all duration-300"
                            style={{ width: idx === i ? 20 : 6, height: 6, background: idx === i ? "linear-gradient(90deg,#1651D1,#5b9bff)" : "rgba(255,255,255,0.2)" }} />
                    ))}
                </div>
            </div>
        </div>
    );
}



export default function GalleryPage() {
    const heroRef = useRef<HTMLElement>(null);
    const [lightbox, setLightbox] = useState<{ images: { src: string; label: string }[]; idx: number } | null>(null);

    useEffect(() => {
        const el = heroRef.current;
        if (!el) return;
        gsap.fromTo(el.querySelectorAll(".hanim"),
            { opacity: 0, y: 36, filter: "blur(8px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "expo.out", stagger: 0.12, delay: 0.08 }
        );
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>(".sr").forEach(el => {
                gsap.fromTo(el, { opacity: 0, y: 32 },
                    { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
            });
        });
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        document.body.style.overflow = lightbox ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [lightbox]);

    return (
        <>
            <StickyButtons />
            <div id="main-navbar" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100000 }}>
                <Navbar />
            </div>

            {lightbox && (
                <Lightbox images={lightbox.images} startIdx={lightbox.idx} onClose={() => setLightbox(null)} />
            )}

            {/* ══ HERO ══ */}
            <section ref={heroRef} className="relative w-full flex items-center overflow-hidden" style={{ minHeight: "100vh", background: "#020916" }}>
                <video src={CLD.heroBg} autoPlay loop muted playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none" style={{ zIndex: 0 }} />
                <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "linear-gradient(135deg,rgba(2,9,22,0.92) 0%,rgba(2,9,22,0.60) 55%,transparent 100%)" }} />
                <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, backgroundImage: "linear-gradient(rgba(17,17,132,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.04) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
                <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none" style={{ zIndex: 2, background: "linear-gradient(to bottom,transparent,#020916)" }} />

                <div className="relative z-20 w-full container mx-auto px-5 md:px-[100px]" style={{ paddingTop: "max(140px,14vh)", paddingBottom: 100 }}>
                    <div className="hanim" style={{ opacity: 0 }}>
                        <span className="text-[10px] uppercase tracking-[0.38em] font-bold block mb-3"
                            style={{ background: "linear-gradient(180deg, #1a6fd4 0%, #0d4fa8 35%, #1565c8 55%, #0a3d8a 80%, #1251b0 100%)", WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                            X-Ortho
                        </span>
                        <h1 className="font-nexa uppercase text-[#f0f4ff]" style={{ fontSize: "clamp(3rem,7vw,6rem)", fontWeight: 800, letterSpacing: "-3px", lineHeight: 0.95 }}>
                            Product<br />
                            <span style={{ background: "linear-gradient(180deg, #e8e8e8 0%, #a8a8a8 30%, #d0d0d0 50%, #787878 65%, #c0c0c0 80%, #8a8a8a 100%)", WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                                Gallery
                            </span>
                        </h1>
                    </div>
                    <p className="hanim text-white/45 text-sm md:text-base leading-relaxed mt-5 max-w-md border-l-[3px] border-[#7b7bff]/25 pl-3.5" style={{ opacity: 0 }}>
                        Every angle, every detail — explore the complete X-Ortho product range.
                    </p>
                    <div className="hanim pt-10 flex items-center gap-4 flex-wrap" style={{ opacity: 0 }}>
                        <a href="/products" className="cursor-pointer group duration-300 transition-all w-fit rounded-full bg-[#1651D1]/30 hover:bg-[#1651D1]/50 backdrop-blur-2xl border border-white/30 p-1.5 relative overflow-hidden">
                            <div className="absolute top-0 left-[5%] group-hover:left-[80%] duration-300 transition-all h-full w-10 bg-[#1651D1]/50 rounded-[200%] blur" />
                            <div className="flex items-center bg-white rounded-full px-4 py-2 md:px-5 md:py-3 relative z-10">
                                <span className="text-base font-semibold">View Products</span> <ArrowRight className="ml-2 w-4 h-4" />
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* ══ GALLERY ══ */}
            <div style={{ background: "#020916" }}>
                {galleryData.map((section, si) => (
                    <section key={section.id} className="relative py-16 md:py-24 overflow-hidden">
                        {/* Subtle grid */}
                        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(17,17,132,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.04) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
                        {/* Glow */}
                        <div className="absolute pointer-events-none" style={{ top: "20%", left: si % 2 === 0 ? "10%" : "60%", width: "40%", height: "60%", background: "radial-gradient(ellipse, rgba(22,81,209,0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />

                        <div className="container mx-auto px-5 md:px-[100px] relative z-10">
                            {/* Section header */}
                            <div className="sr flex items-center gap-5 mb-10" style={{ opacity: 0 }}>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#5b9bff]">{section.tag}</span>
                                    <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide">{section.title}</h2>
                                </div>
                                <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(91,155,255,0.3), transparent)" }} />
                                <a href={section.href}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-200 flex-shrink-0"
                                    style={{ background: "rgba(22,81,209,0.15)", border: "1px solid rgba(91,155,255,0.25)", color: "#5b9bff" }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(22,81,209,0.30)"; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(22,81,209,0.15)"; }}>
                                    View Details <ArrowRight className="w-3.5 h-3.5" />
                                </a>
                            </div>

                            {/* Image grid */}
                            <div className="sr grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4" style={{ opacity: 0 }}>
                                {section.images.map((img, i) => (
                                    <div key={i}
                                        className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
                                        style={{ aspectRatio: "1", background: "linear-gradient(145deg,rgba(6,10,35,0.9),rgba(12,22,65,0.8))", border: "1px solid rgba(91,155,255,0.10)", boxShadow: "0 2px 16px rgba(0,0,0,0.3)" }}
                                        onClick={() => setLightbox({ images: section.images, idx: i })}
                                        onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.border = "1px solid rgba(91,155,255,0.35)"; d.style.boxShadow = "0 8px 32px rgba(22,81,209,0.25), 0 0 0 1px rgba(91,155,255,0.2)"; d.style.transform = "translateY(-4px)"; }}
                                        onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.border = "1px solid rgba(91,155,255,0.10)"; d.style.boxShadow = "0 2px 16px rgba(0,0,0,0.3)"; d.style.transform = "translateY(0)"; }}>

                                        {/* Corner brackets */}
                                        {(["tl", "tr", "bl", "br"] as const).map(c => (
                                            <div key={c} className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{
                                                width: 14, height: 14, zIndex: 2,
                                                top: c.startsWith("t") ? 8 : "auto", bottom: c.startsWith("b") ? 8 : "auto",
                                                left: c.endsWith("l") ? 8 : "auto", right: c.endsWith("r") ? 8 : "auto",
                                                borderTop: c.startsWith("t") ? "1.5px solid rgba(91,155,255,0.8)" : "none",
                                                borderBottom: c.startsWith("b") ? "1.5px solid rgba(91,155,255,0.8)" : "none",
                                                borderLeft: c.endsWith("l") ? "1.5px solid rgba(91,155,255,0.8)" : "none",
                                                borderRight: c.endsWith("r") ? "1.5px solid rgba(91,155,255,0.8)" : "none",
                                            }} />
                                        ))}

                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={img.src} alt={img.label}
                                            className="w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-108"
                                            style={{ filter: "brightness(0.9)", transition: "transform 0.3s ease, filter 0.3s ease" }}
                                            onMouseEnter={e => { (e.target as HTMLImageElement).style.filter = "brightness(1.05) drop-shadow(0 0 12px rgba(91,155,255,0.3))"; }}
                                            onMouseLeave={e => { (e.target as HTMLImageElement).style.filter = "brightness(0.9)"; }} />

                                        {/* Label overlay */}
                                        <div className="absolute bottom-0 inset-x-0 py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                            style={{ background: "linear-gradient(to top, rgba(2,9,22,0.95) 0%, transparent 100%)" }}>
                                            <span className="text-[9px] text-white/80 font-bold uppercase tracking-widest block text-center">{img.label}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Section divider */}
                        {si < galleryData.length - 1 && (
                            <div className="container mx-auto px-5 md:px-[100px] mt-16">
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(91,155,255,0.2), transparent)" }} />
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(91,155,255,0.4)" }} />
                                    <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(91,155,255,0.2), transparent)" }} />
                                </div>
                            </div>
                        )}
                    </section>
                ))}




            </div>
        </>
    );
}