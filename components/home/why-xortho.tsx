"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 3L4 8v6c0 5.5 4.3 10.7 10 12 5.7-1.3 10-6.5 10-12V8L14 3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
                <path d="M9 14l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: "Better DME",
        subtitle: "World-Class Design",
        desc: "Every X-Ortho product is engineered with Biomechanical Engineers and clinical feedback — stronger, lighter, more durable than any comparable DME on the market.",
        accent: "rgba(22,81,209,0.9)",
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.8" fill="none" />
                <path d="M14 9v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M6 14h2M20 14h2M14 6v2M14 20v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
        title: "Better Functionality",
        subtitle: "Engineered for Recovery",
        desc: "From pneumatic compression to dual-axis hinges, every feature is purpose-built — removing friction, enhancing compliance, and accelerating patient outcomes.",
        accent: "rgba(91,155,255,0.9)",
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 4C8.5 4 4 8.5 4 14s4.5 10 10 10 10-4.5 10-10S19.5 4 14 4z" stroke="currentColor" strokeWidth="1.8" fill="none" />
                <path d="M10 14c0 2.2 1.8 4 4 4s4-1.8 4-4-1.8-4-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                <path d="M14 10v1M14 17v1M10 14H9M19 14h-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
        title: "Better Outcomes",
        subtitle: "Clinical Excellence",
        desc: "Designed with and for Orthopedic, Urgent Care, and Podiatry clients. PDAC-approved products that clinicians trust and patients prefer.",
        accent: "rgba(26,111,212,0.9)",
    },
];

export default function WhyXOrtho() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".why-header",
                { opacity: 0, y: 30, filter: "blur(8px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0, ease: "expo.out", scrollTrigger: { trigger: ".why-header", start: "top 85%", once: true } }
            );
            gsap.fromTo(".why-card",
                { opacity: 0, y: 40, filter: "blur(6px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out", stagger: 0.15, scrollTrigger: { trigger: ".why-cards", start: "top 82%", once: true } }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full py-24 md:py-32 overflow-hidden" style={{ background: "#020916" }}>
            {/* Grid */}
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(17,17,132,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.04) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(22,81,209,0.16) 0%, transparent 65%)" }} />

            <div className="container mx-auto px-5 md:px-[100px] relative z-10">
                {/* Header */}
                <div className="why-header text-center mb-16" style={{ opacity: 0 }}>
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold block mb-3"
                        style={{ background: "linear-gradient(180deg, #1a6fd4 0%, #0d4fa8 35%, #1565c8 55%, #0a3d8a 80%, #1251b0 100%)", WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 1px 0 rgba(91,155,255,0.5)) drop-shadow(0 -1px 0 rgba(0,0,30,0.6)) drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}>
                        The X-Ortho Standard
                    </span>
                    <h2 className="font-nexa uppercase text-[#f0f4ff] leading-tight"
                        style={{ fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 800, letterSpacing: "-1px", filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.5))" }}>
                        Why{" "}
                        <span style={{ background: "linear-gradient(180deg, #e8e8e8 0%, #a8a8a8 30%, #d0d0d0 50%, #787878 65%, #c0c0c0 80%, #8a8a8a 100%)", WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 1px 0 rgba(255,255,255,0.6)) drop-shadow(0 -1px 0 rgba(0,0,0,0.4)) drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}>
                            X-Ortho
                        </span>
                    </h2>
                    <p className="text-white/40 text-sm md:text-base mt-4 max-w-lg mx-auto leading-relaxed">
                        Crafted with Biomechanical Engineers. Trusted by Orthopedic, Urgent Care and Podiatry professionals. Available exclusively through TLC DME LLC.
                    </p>
                </div>

                {/* Cards */}
                <div className="why-cards grid grid-cols-1 md:grid-cols-3 gap-5">
                    {pillars.map((p, i) => (
                        <div key={i} className="why-card group relative rounded-3xl p-8 flex flex-col gap-5 cursor-default transition-all duration-500 hover:-translate-y-2"
                            style={{
                                opacity: 0,
                                background: "linear-gradient(145deg, rgba(8,12,42,0.96) 0%, rgba(14,24,72,0.88) 100%)",
                                border: "1px solid rgba(91,155,255,0.12)",
                                boxShadow: "0 4px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(91,155,255,0.08)",
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 60px rgba(22,81,209,0.2), 0 0 0 1px rgba(91,155,255,0.25)";
                                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(91,155,255,0.28)";
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 32px rgba(0,0,0,0.3)";
                                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(91,155,255,0.12)";
                            }}>

                            {/* Glow on hover */}
                            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{ background: "radial-gradient(ellipse at 30% 30%, rgba(22,81,209,0.12) 0%, transparent 65%)" }} />

                            {/* Icon */}
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 relative"
                                style={{ background: "rgba(22,81,209,0.15)", border: "1px solid rgba(91,155,255,0.2)", color: "#5b9bff" }}>
                                {p.icon}
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                                    style={{ background: "rgba(22,81,209,0.25)", boxShadow: "0 0 28px rgba(91,155,255,0.45)" }} />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] uppercase tracking-[0.35em] font-bold"
                                        style={{ color: "rgba(91,155,255,0.6)" }}>
                                        {p.subtitle}
                                    </span>
                                </div>
                                <h3 className="font-nexa font-black uppercase text-white text-xl leading-tight" style={{ letterSpacing: "-0.3px" }}>
                                    {p.title}
                                </h3>
                                <p className="text-white/45 text-sm leading-relaxed">{p.desc}</p>
                            </div>

                            {/* Bottom accent line */}
                            <div className="absolute bottom-0 left-8 right-8 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)` }} />

                            {/* Number */}
                            <div className="absolute top-6 right-7 font-black text-[#ffffff06] select-none pointer-events-none"
                                style={{ fontSize: "5rem", lineHeight: 1, fontFamily: "monospace" }}>
                                {String(i + 1).padStart(2, "0")}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom tagline */}
                <div className="text-center mt-14">
                    <p className="text-white/20 text-xs uppercase tracking-[0.4em] font-bold">
                        Better DME · Better Functionality · Better Outcomes
                    </p>
                </div>
            </div>
        </section>
    );
}