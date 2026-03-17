"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { value: "2", suffix: "", label: "X-Ortho Products" },
    { value: "PDAC", suffix: "", label: "Approved & Certified" },
    { value: "L1832", suffix: " & L1833", label: "HCPCS Codes" },
    { value: "TLC", suffix: " DME", label: "Exclusive Distributor" },
];

export default function StatsStrip() {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            once: true,
            onEnter: () => setVisible(true),
        });
    }, []);

    return (
        <div ref={ref} className="relative w-full overflow-hidden" style={{ background: "#020916" }}>
            {/* Top border glow */}
            <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(91,155,255,0.65), transparent)" }} />
            {/* Bottom border glow */}
            <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(91,155,255,0.2), transparent)" }} />
            {/* Grid pattern */}
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(17,17,132,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.04) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
            {/* Center glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(22,81,209,0.14) 0%, transparent 70%)" }} />

            <div className="relative z-10 container mx-auto px-5 md:px-[100px] py-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
                    {stats.map((s, i) => (
                        <div key={i} className="flex flex-col items-center justify-center py-6 px-4 relative group"
                            style={{ borderRight: i < stats.length - 1 ? "1px solid rgba(91,155,255,0.08)" : "none" }}>
                            {/* Hover glow */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{ background: "radial-gradient(ellipse at center, rgba(22,81,209,0.10) 0%, transparent 70%)" }} />

                            <div className={`w-1 h-1 rounded-full mb-2 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}
                                style={{ background: "#5b9bff", boxShadow: "0 0 8px rgba(91,155,255,0.8)", transitionDelay: `${i * 100}ms` }} />
                            <div className={`font-nexa font-black uppercase tracking-tight transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                                style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", transitionDelay: `${i * 100}ms`, background: "linear-gradient(180deg, #1a6fd4 0%, #0d4fa8 35%, #1565c8 55%, #0a3d8a 80%, #1251b0 100%)", WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 1px 0 rgba(91,155,255,0.5)) drop-shadow(0 -1px 0 rgba(0,0,30,0.6)) drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}>
                                {s.value}<span style={{ fontSize: "60%" }}>{s.suffix}</span>
                            </div>
                            <p className={`text-[10px] uppercase tracking-[0.3em] font-bold text-white/35 mt-1 text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                                style={{ transitionDelay: `${i * 100 + 80}ms` }}>
                                {s.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}