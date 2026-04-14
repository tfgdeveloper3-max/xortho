"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/navbar";
import StickyButtons from "@/components/sticky-buttons";
import Footer from "@/components/footer";

gsap.registerPlugin(ScrollTrigger);

const BASE = "https://res.cloudinary.com/di7znsrrr";
const CLD = {
    logo: `${BASE}/image/upload/logo`,
    sectionhero: `${BASE}/video/upload/section_hero`,
    XoBootHero: `${BASE}/image/upload/XoBoot-Hero`,
    kneeProduct2: `${BASE}/image/upload/knee-product-2`,
};

const values = [
    { num: "01", title: "Better DME", desc: "Every X-Ortho product is engineered with Biomechanical Engineers and clinical feedback from our Orthopedic, Urgent Care and Podiatry clients — stronger, lighter, more durable than any comparable DME available." },
    { num: "02", title: "Better Functionality", desc: "From pneumatic compartmentalized compression to dual-axis hinges, every feature is purpose-built — removing friction, enhancing compliance, and accelerating patient outcomes." },
    { num: "03", title: "Better Outcomes", desc: "Strategically crafted to deliver exceptional clinical outcomes. Trusted by clinicians, preferred by patients. PDAC-approved products that move the standard of care forward." },
];

const timeline = [
    { label: "The Vision", title: "Born From Clinical Need", desc: "TLC DME was founded on a simple but powerful belief — that Durable Medical Equipment could be radically better. Working directly with Orthopedic, Urgent Care and Podiatry professionals, we identified the gaps: uncomfortable designs, poor compliance, and underwhelming outcomes." },
    { label: "The Engineering", title: "Built With Biomechanical Engineers", desc: "We partnered with Biomechanical Engineers to design products from the ground up. Every curve, every material, every mechanism was evaluated against one standard: does this deliver better outcomes for the patient and the clinician?" },
    { label: "The Standard", title: "X-Ortho — A New DME Standard", desc: "The X-Ortho product line represents the pinnacle of that commitment. \"Wow, this is the nicest boot I've ever seen!\" — a direct quote from our largest competitor, a multi-national global orthopedic corporation. We know you will agree." },
    { label: "Today", title: "Exclusive Through TLC DME LLC", desc: "The XO Boot Pneumatic and XO Knee Support ROM Cryo are available exclusively through TLC DME LLC — DME Specialists, DME Solutions. Contact us for pricing, availability, and distribution inquiries." },
];

const products = [
    {
        name: "XO Boot Pneumatic", tag: "Pneumatic Walking Boot", img: CLD.XoBootHero, href: "/products/xboot",
        bullets: ["World class aerodynamic shell — short leg cast-like stability", "Revolutionary compartmentalized pneumatic compression", "Real rocker sole for natural gait from heel strike to toe off", "Seamless micro-fiber liner — T-shirt soft, wicking", "4-strap system with 360° swivel D-rings & easy grip tips", "AFO Undersleeve included — eliminates hot spots"],
    },
    {
        name: "XO Knee Support ROM Cryo", tag: "Knee Support · PDAC L1832 & L1833", img: CLD.kneeProduct2, href: "/products/knee",
        bullets: ["Dual-Axis hinge mirrors natural knee movement", "Open patella & open back — all-day comfort", "Removable Cryo Gel Pad for cold or heat therapy", "Wrap-around strapping with medical grade hook & loop", "KO Undersleeve included — microfiber, wicking", "PDAC approved — HCPCS codes L1832 & L1833"],
    },
];

const BLUE_GRAD = "linear-gradient(180deg, #1a6fd4 0%, #0d4fa8 35%, #1565c8 55%, #0a3d8a 80%, #1251b0 100%)";
const BLUE_FILTER = "drop-shadow(0 1px 0 rgba(91,155,255,0.5)) drop-shadow(0 -1px 0 rgba(0,0,30,0.6)) drop-shadow(0 2px 4px rgba(0,0,0,0.5))";

// Shared dark section divider line
const SectionDivider = () => (
    <div className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(91,155,255,0.2), transparent)" }} />
);

// Shared dark grid overlay
const GridOverlay = () => (
    <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(17,17,132,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.04) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
);

export default function AboutPage() {
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = heroRef.current;
        if (!el) return;
        gsap.fromTo(el.querySelectorAll(".hanim"),
            { opacity: 0, y: 44, filter: "blur(8px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "expo.out", stagger: 0.13, delay: 0.1 }
        );
        gsap.fromTo(".hero-boot", { opacity: 0, x: 80 }, { opacity: 0.55, x: 0, duration: 2, ease: "expo.out", delay: 0.8 });
        gsap.fromTo(".hero-knee", { opacity: 0, x: -60 }, { opacity: 0.38, x: 0, duration: 2, ease: "expo.out", delay: 1.1 });
        gsap.to(".hero-boot", { y: -20, duration: 4.5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2 });
        gsap.to(".hero-knee", { y: -14, duration: 3.8, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.4 });
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>(".sr").forEach(el => {
                gsap.fromTo(el, { opacity: 0, y: 36 },
                    { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 86%", once: true } });
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <>
            <StickyButtons />
            <div id="main-navbar" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100000 }}>
                <Navbar />
            </div>

            {/* ══ HERO ══ */}
            <section ref={heroRef} className="relative w-full flex items-center overflow-hidden" style={{ minHeight: "100vh", background: "#020916" }}>
                <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "linear-gradient(135deg,rgba(2,9,22,0.92) 0%,rgba(2,9,22,0.55) 55%,transparent 100%)" }} />
                <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, backgroundImage: "linear-gradient(rgba(17,17,132,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.04) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
                <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none" style={{ zIndex: 2, background: "linear-gradient(to bottom,transparent,#020916)" }} />

                <div className="relative z-20 w-full container mx-auto px-5 md:px-[100px]" style={{ paddingTop: "max(140px,14vh)", paddingBottom: 100 }}>
                    <div className="hanim mb-4" style={{ opacity: 0 }}>
                        <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.38em] font-bold px-4 py-1.5 rounded-full"
                            style={{ background: "rgba(22,81,209,0.15)", border: "1px solid rgba(91,155,255,0.25)", color: "#5b9bff", marginTop: "40px" }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#5b9bff] animate-pulse" style={{ boxShadow: "0 0 8px rgba(91,155,255,0.8)" }} />
                            TLC DME LLC · X-Ortho
                        </span>
                    </div>
                    <h1 className="hanim font-nexa uppercase text-[#f0f4ff] leading-[0.92]"
                        style={{ opacity: 0, paddingTop: "20px", fontSize: "clamp(2.5rem,7vw,5rem)", fontWeight: 800, letterSpacing: "-4px" }}>
                        About<br />
                        <span style={{ backgroundImage: BLUE_GRAD, WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text", filter: BLUE_FILTER }}>
                            X-Ortho
                        </span>
                    </h1>
                    <p className="hanim text-white/50 text-sm md:text-base leading-relaxed mt-5 max-w-md border-l-[3px] border-[#1651D1]/30 pl-4" style={{ opacity: 0 }}>
                        Designed and crafted by TLC DME with Biomechanical Engineers and feedback from Orthopedic, Urgent Care and Podiatry clients — engineered for superior strength, performance and comfort.
                    </p>
                    <div className="hanim flex items-center gap-4 mt-7 flex-wrap" style={{ opacity: 0 }}>
                        <a href="/products" className="cursor-pointer group duration-300 transition-all w-fit rounded-full bg-[#1651D1]/30 hover:bg-[#1651D1]/50 backdrop-blur-2xl border border-white/30 p-1.5 relative overflow-hidden">
                            <div className="absolute top-0 left-[5%] group-hover:left-[80%] duration-300 transition-all h-full w-10 bg-[#1651D1]/50 rounded-[200%] blur" />
                            <div className="flex items-center bg-white rounded-full px-5 py-3 relative z-10">
                                <span className="text-base font-semibold">Explore Products</span>
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </div>
                        </a>
                        <a href="/contact" className="text-sm font-semibold flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors">
                            Contact Us <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                    </div>
                    <div className="hanim flex items-center gap-8 mt-10 flex-wrap" style={{ opacity: 0 }}>
                        {[{ val: "2", label: "Products" }, { val: "PDAC", label: "Approved" }, { val: "L1832 & L1833", label: "HCPCS Codes" }].map((s, i) => (
                            <div key={i} className="flex flex-col gap-0.5">
                                <span className="font-nexa font-black uppercase text-xl" style={{ backgroundImage: BLUE_GRAD, WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text", filter: BLUE_FILTER }}>{s.val}</span>
                                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ MISSION QUOTE ══ */}
            <section className="relative w-full py-20 md:py-24 overflow-hidden" style={{ background: "#020916" }}>
                <GridOverlay />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(22,81,209,0.12) 0%, transparent 65%)" }} />
                <SectionDivider />
                <div className="container mx-auto px-5 md:px-[100px] relative z-10">
                    <div className="sr max-w-4xl mx-auto text-center" style={{ opacity: 0 }}>
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="h-px w-12" style={{ background: "rgba(91,155,255,0.3)" }} />
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#5b9bff]">Our Mission</span>
                            <div className="h-px w-12" style={{ background: "rgba(91,155,255,0.3)" }} />
                        </div>
                        <blockquote className="font-nexa uppercase text-[#f0f4ff] leading-tight mb-4"
                            style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)", fontWeight: 800, letterSpacing: "-1px" }}>
                            &ldquo;Wow, this is the nicest boot<br className="hidden md:block" /> I&rsquo;ve ever seen!&rdquo;
                        </blockquote>
                        <p className="text-[#5b9bff]/60 text-xs uppercase tracking-[0.35em] font-bold mb-6">— Direct quote from our largest competitor</p>
                        <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                            X-Ortho is engineered for superior strength, performance and comfort; strategically crafted to deliver exceptional clinical outcomes. Better DME. Better Functionality. Better Outcomes.
                        </p>
                    </div>
                </div>
            </section>

            {/* ══ OUR STORY TIMELINE ══ */}
            {/* CHANGED: bg-white → #020916 dark. Card backgrounds updated to dark glass. Text colors updated. */}
            <section className="relative w-full py-20 md:py-28 overflow-hidden" style={{ background: "#020916" }}>
                <GridOverlay />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(22,81,209,0.10) 0%, transparent 60%)" }} />
                <SectionDivider />
                <div className="container mx-auto px-5 md:px-[100px] relative z-10">
                    <div className="sr text-center mb-16" style={{ opacity: 0 }}>
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold block mb-3" style={{ backgroundImage: BLUE_GRAD, WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                            Our Journey
                        </span>
                        <h2 className="font-nexa uppercase leading-tight text-[#f0f4ff]" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 800, letterSpacing: "-1px" }}>
                            The{" "}
                            <span style={{ backgroundImage: BLUE_GRAD, WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text", filter: BLUE_FILTER }}>X-Ortho Story</span>
                        </h2>
                    </div>
                    <div className="relative max-w-4xl mx-auto">
                        {/* Timeline vertical line */}
                        <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2 pointer-events-none"
                            style={{ background: "linear-gradient(to bottom, transparent, rgba(91,155,255,0.25) 10%, rgba(91,155,255,0.25) 90%, transparent)" }} />
                        {timeline.map((t, i) => (
                            <div key={i} className={`sr relative flex gap-8 md:gap-0 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`} style={{ opacity: 0 }}>
                                {/* Dot */}
                                <div className="absolute left-[10px] md:left-1/2 md:-translate-x-1/2 top-6 w-4 h-4 rounded-full flex-shrink-0 z-10"
                                    style={{ background: "linear-gradient(135deg,#1651D1,#5b9bff)", boxShadow: "0 0 16px rgba(22,81,209,0.6)" }} />
                                <div className={`ml-10 md:ml-0 flex-1 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                                    {/* Card — dark glass matching Values section */}
                                    <div className="rounded-2xl p-6 transition-all duration-300"
                                        style={{
                                            background: "linear-gradient(145deg, rgba(8,12,42,0.96) 0%, rgba(14,24,72,0.88) 100%)",
                                            border: "1px solid rgba(91,155,255,0.12)",
                                            boxShadow: i % 2 === 0
                                                ? "0 4px 20px rgba(0,0,0,0.4), -8px 0 32px rgba(22,81,209,0.08)"
                                                : "0 4px 20px rgba(0,0,0,0.4), 8px 0 32px rgba(22,81,209,0.08)",
                                        }}
                                        onMouseEnter={e => {
                                            const d = e.currentTarget as HTMLDivElement;
                                            d.style.boxShadow = "0 0 20px rgba(91,155,255,0.55), 0 0 40px rgba(91,155,255,0.25), inset 0 1px 0 rgba(255,255,255,0.08)";
                                            d.style.borderColor = "rgba(91,155,255,0.85)";
                                        }}
                                        onMouseLeave={e => {
                                            const d = e.currentTarget as HTMLDivElement;
                                            d.style.boxShadow = i % 2 === 0
                                                ? "0 4px 20px rgba(0,0,0,0.4), -8px 0 32px rgba(22,81,209,0.08)"
                                                : "0 4px 20px rgba(0,0,0,0.4), 8px 0 32px rgba(22,81,209,0.08)";
                                            d.style.borderColor = "rgba(91,155,255,0.12)";
                                        }}>
                                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold block mb-2"
                                            style={{ backgroundImage: BLUE_GRAD, WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                                            {t.label}
                                        </span>
                                        <h3 className="font-bold text-[#f0f4ff] text-lg mb-2 leading-tight">{t.title}</h3>
                                        <p className="text-white/45 text-sm leading-relaxed">{t.desc}</p>
                                    </div>
                                </div>
                                <div className="hidden md:block flex-1" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ PRODUCTS OVERVIEW ══ */}
            {/* CHANGED: bg-white → #020916 dark. Product cards updated to dark glass. Text colors updated. */}
            <section className="relative w-full py-20 md:py-28 overflow-hidden" style={{ background: "#020916", borderTop: "1px solid rgba(91,155,255,0.08)" }}>
                <GridOverlay />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(22,81,209,0.08) 0%, transparent 65%)" }} />
                <div className="container mx-auto px-5 md:px-[100px] relative z-10">
                    <div className="sr text-center mb-14" style={{ opacity: 0 }}>
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold block mb-3" style={{ backgroundImage: BLUE_GRAD, WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                            X-Ortho Product Line
                        </span>
                        <h2 className="font-nexa uppercase text-[#f0f4ff] leading-tight" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 800, letterSpacing: "-1px" }}>
                            Our{" "}
                            <span style={{ backgroundImage: BLUE_GRAD, WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text", filter: BLUE_FILTER }}>Products</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {products.map((p, i) => (
                            <div key={i} className="sr group rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
                                style={{
                                    opacity: 0,
                                    background: "linear-gradient(145deg, rgba(8,12,42,0.96) 0%, rgba(14,24,72,0.88) 100%)",
                                    border: "1px solid rgba(91,155,255,0.12)",
                                    boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                                }}
                                onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.boxShadow = "0 20px 56px rgba(22,81,209,0.22)"; d.style.borderColor = "rgba(91,155,255,0.30)"; }}
                                onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.boxShadow = "0 4px 24px rgba(0,0,0,0.4)"; d.style.borderColor = "rgba(91,155,255,0.12)"; }}>
                                {/* Product image area — dark with subtle blue glow */}
                                <div className="relative flex items-center justify-center" style={{ height: 240, background: "linear-gradient(145deg, rgba(6,10,35,0.9), rgba(14,24,72,0.7))" }}>
                                    <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(22,81,209,0.14) 0%, transparent 70%)" }} />
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={p.img} alt={p.name} className="transition-transform duration-500 group-hover:scale-105"
                                        style={{ maxHeight: "88%", maxWidth: "65%", objectFit: "contain", filter: "drop-shadow(0 16px 40px rgba(22,81,209,0.35))" }} />
                                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                                        style={{ background: "rgba(22,81,209,0.20)", border: "1px solid rgba(91,155,255,0.30)", color: "#5b9bff" }}>
                                        {p.tag}
                                    </div>
                                </div>
                                {/* Card body */}
                                <div className="p-7 flex flex-col gap-4" style={{ background: "transparent" }}>
                                    <h3 className="font-nexa font-black uppercase text-[#f0f4ff] text-xl leading-tight">{p.name}</h3>
                                    <ul className="flex flex-col gap-2">
                                        {p.bullets.map((b, j) => (
                                            <li key={j} className="flex items-start gap-2.5 text-sm text-white/50">
                                                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: "#5b9bff" }} />
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                    <a href={p.href} className="cursor-pointer group/btn duration-300 transition-all w-fit rounded-full bg-[#1651D1]/30 hover:bg-[#1651D1]/50 backdrop-blur-2xl border border-white/20 p-1.5 relative overflow-hidden mt-2">
                                        <div className="absolute top-0 left-[5%] group-hover/btn:left-[80%] duration-300 transition-all h-full w-10 bg-[#1651D1]/50 rounded-[200%] blur" />
                                        <div className="flex items-center bg-white rounded-full px-5 py-2.5 relative z-10">
                                            <span className="text-sm font-semibold">See Product Details</span>
                                            <ArrowRight className="ml-2 w-4 h-4" />
                                        </div>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ VALUES ══ — unchanged, already dark */}
            <section className="relative w-full mb-30 py-20 md:py-28 overflow-hidden" style={{ background: "#020916" }}>
                <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(91,155,255,0.2), transparent)" }} />
                <div className="container mx-auto px-5 md:px-[100px] relative z-10">
                    <div className="sr text-center mb-14" style={{ opacity: 0 }}>
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold block mb-3"
                            style={{ backgroundImage: BLUE_GRAD, WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text", filter: BLUE_FILTER }}>
                            The X-Ortho Standard
                        </span>
                        <h2 className="font-nexa uppercase text-[#f0f4ff] leading-tight" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 800, letterSpacing: "-1px" }}>
                            What We{" "}
                            <span style={{ backgroundImage: BLUE_GRAD, WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text", filter: BLUE_FILTER }}>Stand For</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {values.map((v, i) => (
                            <div key={i} className="sr group relative rounded-3xl p-8 flex flex-col gap-4 transition-all duration-500 hover:-translate-y-2"
                                style={{ opacity: 0, background: "linear-gradient(145deg, rgba(8,12,42,0.96) 0%, rgba(14,24,72,0.88) 100%)", border: "1px solid rgba(91,155,255,0.12)", boxShadow: "0 4px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(91,155,255,0.08)" }}
                                onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.boxShadow = "0 20px 60px rgba(22,81,209,0.2), 0 0 0 1px rgba(91,155,255,0.25)"; d.style.borderColor = "rgba(91,155,255,0.28)"; }}
                                onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.boxShadow = "0 4px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(91,155,255,0.08)"; d.style.borderColor = "rgba(91,155,255,0.12)"; }}>
                                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{ background: "radial-gradient(ellipse at 30% 30%, rgba(22,81,209,0.12) 0%, transparent 65%)" }} />
                                <span className="text-[10px] uppercase tracking-[0.4em] font-bold" style={{ color: "rgba(91,155,255,0.5)" }}>0{i + 1}</span>
                                <h3 className="font-nexa font-black uppercase text-white text-xl leading-tight">{v.title}</h3>
                                <p className="text-white/45 text-sm leading-relaxed">{v.desc}</p>
                                <div className="absolute bottom-0 left-8 right-8 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ background: "linear-gradient(90deg, transparent, rgba(22,81,209,0.8), transparent)" }} />
                                <div className="absolute top-6 right-7 font-black text-[#ffffff04] select-none pointer-events-none" style={{ fontSize: "5rem", lineHeight: 1, fontFamily: "monospace" }}>
                                    {String(i + 1).padStart(2, "0")}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ TLC DME INFO ══ — unchanged, already dark */}
            <section className="relative overflow-hidden mb-10 mx-4 md:mx-8" style={{ background: "#020916", paddingTop: 80, paddingBottom: 80, borderRadius: "3rem", marginTop: 24 }}>
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(17,17,132,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.04) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(22,81,209,0.10) 0%, transparent 65%)" }} />
                <div className="container mx-auto px-5 md:px-[100px] relative z-10">
                    <div className="sr rounded-3xl p-8 md:p-14 flex flex-col md:flex-row items-center gap-10"
                        style={{ opacity: 0, background: "linear-gradient(135deg,rgba(22,81,209,0.18) 0%,rgba(6,10,35,0.9) 100%)", border: "1px solid rgba(91,155,255,0.18)", boxShadow: "0 0 80px rgba(22,81,209,0.12), inset 0 1px 0 rgba(91,155,255,0.08)" }}>
                        <div className="flex-shrink-0">
                            <Image src={CLD.logo} alt="X-Ortho" width={100} height={100} className="object-contain" style={{ filter: "drop-shadow(0 0 24px rgba(91,155,255,0.4))" }} />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#5b9bff] block mb-2">Available Exclusively Through</span>
                            <h2 className="font-nexa font-black uppercase text-white text-2xl md:text-3xl leading-tight mb-3">TLC DME LLC</h2>
                            <p className="text-white/55 text-sm md:text-base leading-relaxed max-w-xl">
                                TLC DME is a next-generation Durable Medical Equipment platform built to serve workflows, accelerate approvals, and give providers full control — without complexity. DME Specialists. DME Solutions.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 flex-shrink-0">
                            <a href="tel:8885218522" className="flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-200"
                                style={{ background: "rgba(91,155,255,0.10)", border: "1px solid rgba(91,155,255,0.18)" }}
                                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(91,155,255,0.18)"; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(91,155,255,0.10)"; }}>
                                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#5b9bff" }} />
                                <span className="text-white font-bold text-sm">(888) 521-8522</span>
                            </a>
                            <a href="https://tlcdme.com" target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-200"
                                style={{ background: "rgba(91,155,255,0.10)", border: "1px solid rgba(91,155,255,0.18)" }}
                                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(91,155,255,0.18)"; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(91,155,255,0.10)"; }}>
                                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#5b9bff" }} />
                                <span className="text-white font-bold text-sm">tlcdme.com</span>
                            </a>
                            <a href="/contact" className="cursor-pointer group duration-300 transition-all w-fit rounded-full bg-[#1651D1]/30 hover:bg-[#1651D1]/50 backdrop-blur-2xl border border-white/30 p-1.5 relative overflow-hidden">
                                <div className="absolute top-0 left-[5%] group-hover:left-[80%] duration-300 transition-all h-full w-10 bg-[#1651D1]/50 rounded-[200%] blur" />
                                <div className="flex items-center bg-white rounded-full px-5 py-2.5 relative z-10">
                                    <span className="text-sm font-semibold">Contact Us</span>
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <div className="pt-6"><Footer /></div>
        </>
    );
}