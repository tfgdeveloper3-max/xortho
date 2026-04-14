"use client";
import { CLD } from "@/lib/cloudinary";

import MyButton from "@/components/my-button";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Star, ShieldCheck, Gauge, Footprints, Wind, ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/navbar";
import StickyButtons from "@/components/sticky-buttons";
import Footer from "@/components/footer";

gsap.registerPlugin(ScrollTrigger);

// ── Shared dark theme tokens ──────────────────────────────────────────────────
const DARK_BG = "#020916";
const DARK_CARD = "linear-gradient(145deg, rgba(8,12,42,0.96) 0%, rgba(14,24,72,0.88) 100%)";
const DARK_BORDER = "rgba(91,155,255,0.12)";
const DARK_BORDER_H = "rgba(91,155,255,0.28)";
const BLUE_GRAD = "linear-gradient(180deg, #1a6fd4 0%, #0d4fa8 35%, #1565c8 55%, #0a3d8a 80%, #1251b0 100%)";
const GRID_OVERLAY = { backgroundImage: "linear-gradient(rgba(17,17,132,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.04) 1px,transparent 1px)", backgroundSize: "52px 52px" } as React.CSSProperties;
// ─────────────────────────────────────────────────────────────────────────────

const features = [
  { label: "Flex Polymer Strut Design", desc: "Softer materials with flexible medial & lateral struts conform gently to the leg — less pressure points, more comfort throughout recovery." },
  { label: "Removable Anterior Shield", desc: "Protects the dorsum of the foot and allows optimal comfort in flexing the talocrural/ankle joint. Removable for improved compliance." },
  { label: "Calf Adjustment", desc: "Exclusive adaptation for accommodating larger/wider calves — ensuring a secure, customized fit for every patient, every time." },
  { label: "Removable Toe Guard", desc: "Provides toe protection and is easily removed when preferred for patient comfort. Ideal for acute injury or post-surgical use." },
];

const benefits = [
  { icon: <ShieldCheck className="w-5 h-5" />, title: "World Class Shell", desc: "Short leg cast-like stability and protection beyond any walking boot available. Unparalleled adjustability reduces pressure points and accommodates swelling variance." },
  { icon: <Gauge className="w-5 h-5" />, title: "Revolutionary Compression", desc: "Compartmentalized air cells deliver focused medial & lateral malleolar compression. Low-force bulb with intuitive inflate/deflate valve — rapid adjustment, far less effort." },
  { icon: <Footprints className="w-5 h-5" />, title: "Real Rocker Sole", desc: "The most fluid rocker action ever built — supports gait from heel strike to toe off for natural ambulation. HQ rubber sole resists debris clogging." },
  { icon: <Wind className="w-5 h-5" />, title: "T-Shirt Soft Liner", desc: "Seamless micro-fiber liner is low-friction and wicking — t-shirt soft against skin. Reduces sweat build-up and maximizes patient comfort and compliance." },
];

const steps = [
  { num: "01", title: "Loosen All Straps", desc: "Fully loosen the 4 straps and deflate air bladders by pressing the release valve before putting on the boot." },
  { num: "02", title: "Insert & Secure", desc: "Slide foot in with heel firmly seated. Fasten straps bottom-up — foot first, then ankle, then calf — for even progressive support." },
  { num: "03", title: "Inflate to Fit", desc: "Use the soft pneumatic bulb to inflate air cells to your comfort level. The intuitive inflate/deflate valve makes adjustment fast and easy." },
  { num: "04", title: "Walk Naturally", desc: "The real rocker sole supports a smooth heel-to-toe gait — walk confidently while your injury heals." },
];

const reviews = [
  { name: "Mark T.", location: "California", days: "2 days ago", rating: 5, text: "I was worried about wearing a boot all day, but this one surprised me. The air pump made a huge difference, and it stayed comfortable even after hours of walking." },
  { name: "Sarah L.", location: "Texas", days: "4 days ago", rating: 5, text: "My foot swelling changed daily, and this boot adjusted easily every time. No pressure points, no pain—just solid support." },
  { name: "Emily K.", location: "Florida", days: "1 days ago", rating: 4, text: "It looks bulky, but it's actually very lightweight. I felt stable walking, and the rocker sole really helped my stride." },
];

const galleryImages = [
  { src: CLD.xoStraps, label: "Straps" },
  { src: CLD.xoRocker, label: "Rocker Sole" },
  { src: CLD.xoCage, label: "Outer Cage" },
  { src: CLD.xoFrontView, label: "Front View" },
  { src: CLD.xoFullBoot, label: "Full Boot" },
  { src: CLD.xoShell, label: "Shell" },
];

// ── Tab content — dark-themed ────────────────────────────────────────────────
const tabContent: Record<string, React.ReactNode> = {
  Description: (
    <div className="flex flex-col gap-4">
      <p className="text-white/60 text-base leading-relaxed italic border-l-4 pl-4" style={{ borderColor: "rgba(91,155,255,0.3)" }}>
        "Wow, this is the nicest boot I've ever seen!" — Direct quote from a well-known national competitor.
      </p>
      <p className="text-white/60 text-base leading-relaxed">
        The XO Boot Pneumatic is engineered for unparalleled strength, performance and comfort — strategically crafted to deliver exceptional clinical outcomes. Designed by TLC DME with Biomechanical Engineers and feedback from Orthopedic, Urgent Care and Podiatry clients, the XO Boot sets a new standard in walking boot technology.
      </p>
      <ul className="flex flex-col gap-2 mt-1">
        {["Uniquely designed aerodynamic shell — stronger, lighter weight, more durable support",
          "Innovative adjustable components ensure best possible patient comfort and compliance",
          "Ground-breaking Pneumatic System with compartmentalized air delivery and focused compression",
        ].map((b, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-white/55">
            <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#5b9bff" }} />{b}
          </li>
        ))}
      </ul>
    </div>
  ),
  Benefits: (
    <ul className="flex flex-col gap-3">
      {[
        "World class aerodynamic shell — short leg cast-like stability beyond any walking boot available",
        "Revolutionary compression system with compartmentalized air cells for focused medial & lateral malleolar compression",
        "Real rocker sole supports natural gait from heel strike to toe off",
        "Flex polymer struts with softer materials — flexible medial & lateral, less pressure points",
        "Removable anterior shield protects dorsum of foot, allows optimal ankle joint flexion",
        "Exclusive calf adjustment accommodates larger/wider calves",
        "Seamless micro-fiber liner — T-shirt soft, low-friction, wicking for maximum comfort",
        "4-strap system with 360° swivel D-rings and HQ easy grip rubber tips",
        "AFO undersleeve included — eliminates hot spots, wicks perspiration",
      ].map((b, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-white/55">
          <span className="mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#5b9bff" }} />{b}
        </li>
      ))}
    </ul>
  ),
  Specifications: (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          ["Style Options", "Tall or Short"], ["Sizes", "Small, Medium, Large"],
          ["Men — Small", "Shoe size 5 – 6.5"], ["Men — Medium", "Shoe size 6.5 – 11"],
          ["Men — Large", "Shoe size 11 – 15"], ["Women — Small", "Shoe size 4 – 9.5"],
          ["Women — Medium", "Shoe size 9.5 – 13"], ["Women — Large", "Shoe size 13 – 16.5"],
          ["Calf Fit", "Accommodates larger/wider calves"], ["Straps", "4-strap system"],
          ["D-Rings", "Full 360° swivel"], ["Air System", "Pneumatic pump with EZ bulb & valve"],
          ["Sole", "Real rocker bottom — HQ rubber"], ["Liner", "Seamless micro-fiber, removable"],
          ["Toe Guard", "Removable anterior shield"], ["AFO Undersleeve", "2 included per boot"],
        ].map(([key, val]) => (
          <div key={key} className="flex flex-col gap-0.5 p-3 rounded-xl" style={{ background: "rgba(91,155,255,0.06)", border: `1px solid ${DARK_BORDER}` }}>
            <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "rgba(91,155,255,0.5)" }}>{key}</span>
            <span className="text-sm font-semibold text-[#f0f4ff]">{val}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-white/30 italic">The XO Boot Pneumatic is available exclusively through TLC DME LLC. Call (888) 521-8522 or visit tlcdme.com</p>
    </div>
  ),
  "Wear Instructions": (
    <ol className="flex flex-col gap-4">
      {[
        { n: "01", t: "Loosen All Straps", d: "Before putting on the boot, fully loosen all straps and deflate the air bladders by pressing the release valve." },
        { n: "02", t: "Insert Foot", d: "Slide your foot into the boot with your heel firmly seated at the back. Ensure your ankle is centered within the boot shell." },
        { n: "03", t: "Secure Lower Straps First", d: "Fasten straps from the bottom up — foot strap first, then ankle, then calf — for even, progressive support." },
        { n: "04", t: "Inflate for Compression", d: "Use the pneumatic pump to inflate the air bladders to your desired comfort level. Pump until snug but not painful." },
        { n: "05", t: "Attach Toe Guard (if needed)", d: "For post-surgical use or additional protection, clip the removable toe guard onto the front of the boot." },
      ].map((s) => (
        <li key={s.n} className="flex gap-4">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
            style={{ background: "linear-gradient(135deg,#1651D1,#5b9bff)" }}>{s.n}</div>
          <div>
            <p className="font-bold text-[#f0f4ff] text-sm mb-0.5">{s.t}</p>
            <p className="text-sm text-white/45 leading-relaxed">{s.d}</p>
          </div>
        </li>
      ))}
    </ol>
  ),
  FAQ: (
    <div className="flex flex-col gap-3">
      {[
        { q: "Is the XO Boot available in Tall and Short versions?", a: "Yes. The XO Boot Pneumatic is available in both Tall and Short styles, each in Small, Medium, and Large sizing for men and women." },
        { q: "Where can I get the XO Boot?", a: "The XO Boot Pneumatic is available exclusively through TLC DME LLC. Contact us at (888) 521-8522 or visit tlcdme.com." },
        { q: "How does the pneumatic compression system work?", a: "A larger soft bulb fills the air cells faster and easier. The intuitive inflate/deflate valve allows quick, focused compression. Air cells provide circumferential pressure with effective medial & lateral malleolar custom compression." },
        { q: "What is the AFO Undersleeve?", a: "Two AFO undersleeves are included with each boot. They increase patient comfort by eliminating hot spots due to friction, wick away perspiration, and help keep skin clean." },
        { q: "Can I adjust the straps myself at home?", a: "Yes. The Easy Grip rubber strap tips allow easy adjustment for application and for patient re-fitting at home. The 360° swivel D-rings provide smooth, customized strap movement." },
        { q: "How do I clean the boot?", a: "Wipe the shell with a damp cloth. The liner is removable and can be hand-washed — allow to air dry completely. The removable insole can also be washed separately." },
      ].map((item, i) => (
        <FAQItem key={i} q={item.q} a={item.a} />
      ))}
    </div>
  ),
};

// ── Dark FAQ accordion ────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = answerRef.current;
    if (!el) return;
    if (open) gsap.fromTo(el, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.38, ease: "power3.out" });
    else gsap.to(el, { height: 0, opacity: 0, duration: 0.28, ease: "power2.in" });
  }, [open]);

  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        border: open ? `1px solid ${DARK_BORDER_H}` : `1px solid ${DARK_BORDER}`,
        boxShadow: open ? "0 8px 32px rgba(22,81,209,0.18)" : "none",
      }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left group"
        style={{ background: open ? "linear-gradient(135deg,rgba(22,81,209,0.22),rgba(91,155,255,0.10))" : "rgba(8,12,42,0.8)", transition: "background 0.3s ease" }}>
        <span className="font-bold text-sm text-[#f0f4ff] group-hover:text-[#5b9bff] transition-colors duration-200">{q}</span>
        <div className="flex-shrink-0 ml-4 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
          style={{ background: open ? "linear-gradient(135deg,#1651D1,#5b9bff)" : "rgba(91,155,255,0.12)", boxShadow: open ? "0 0 16px rgba(91,155,255,0.4)" : "none", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}>
          <span className="text-sm font-bold leading-none text-white">+</span>
        </div>
      </button>
      <div ref={answerRef} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
        <div className="px-5 py-4 text-sm text-white/50 leading-relaxed"
          style={{ background: "linear-gradient(135deg,rgba(22,81,209,0.10),rgba(6,10,35,0.8))", borderTop: `1px solid ${DARK_BORDER}` }}>
          {a}
        </div>
      </div>
    </div>
  );
}

// ── PowerStep (product info + tabs) — dark ────────────────────────────────────
function PowerStepSection() {
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState("Description");
  const [zoom, setZoom] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tabs = ["Description", "Benefits", "Specifications", "Wear Instructions", "FAQ"];
  const TOTAL = galleryImages.length;

  useEffect(() => {
    if (!isPlaying) { if (autoRef.current) clearInterval(autoRef.current); return; }
    autoRef.current = setInterval(() => setActiveImg(prev => (prev + 1) % TOTAL), 3000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [isPlaying, TOTAL]);

  const manualSelect = (i: number) => { setActiveImg(i); setIsPlaying(false); setTimeout(() => setIsPlaying(true), 6000); };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ps-gallery", { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 1.0, ease: "expo.out", scrollTrigger: { trigger: ".ps-gallery", start: "top 80%", once: true } });
      gsap.fromTo(".ps-info-item", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ".ps-info", start: "top 78%", once: true } });
      gsap.fromTo(".ps-tabs", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", scrollTrigger: { trigger: ".ps-tabs", start: "top 88%", once: true } });
      gsap.fromTo(".ps-li", { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: ".ps-li", start: "top 80%", once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-20" style={{ background: DARK_BG, borderTop: `1px solid ${DARK_BORDER}` }}>
      <div className="absolute inset-0 pointer-events-none" style={GRID_OVERLAY} />
      <div className="container mx-auto px-5 md:px-[80px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">

          {/* Gallery */}
          <div className="ps-gallery flex gap-4" style={{ opacity: 0 }}>
            {/* Thumbnails */}
            <div className="flex flex-col gap-2 flex-shrink-0">
              {galleryImages.map((img, i) => (
                <button key={i} onClick={() => manualSelect(i)}
                  className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300"
                  style={{
                    border: activeImg === i ? "2px solid rgba(91,155,255,0.9)" : "2px solid transparent",
                    boxShadow: activeImg === i ? "0 0 0 3px rgba(91,155,255,0.18), 0 4px 16px rgba(22,81,209,0.25)" : "0 1px 4px rgba(0,0,0,0.2)",
                    background: activeImg === i ? "rgba(22,81,209,0.18)" : "rgba(8,12,42,0.8)",
                    transform: activeImg === i ? "scale(1.08)" : "scale(1)",
                  }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt={img.label} className="w-full h-full object-contain p-1"
                    style={{ filter: activeImg === i ? "brightness(1.1)" : "brightness(0.7)", transition: "filter 0.2s" }} />
                </button>
              ))}
            </div>
            {/* Main image */}
            <div className="flex-1 relative rounded-2xl overflow-hidden cursor-zoom-in"
              style={{ background: "linear-gradient(145deg,rgba(6,10,35,0.96),rgba(12,22,65,0.92))", border: `1px solid ${DARK_BORDER}`, minHeight: 420, boxShadow: "0 4px 24px rgba(22,81,209,0.14)", transition: "box-shadow 0.3s ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 48px rgba(22,81,209,0.25)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(22,81,209,0.14)"; }}
              onClick={() => setZoom(true)}>
              {galleryImages.map((img, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={img.src} alt={img.label}
                  className="absolute inset-0 w-full h-full object-contain p-6"
                  style={{ opacity: activeImg === i ? 1 : 0, transform: activeImg === i ? "scale(1)" : "scale(0.96)", transition: "opacity 0.4s ease, transform 0.4s ease", minHeight: 420 }} />
              ))}
              <div className="absolute top-3 right-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest z-10"
                style={{ background: "rgba(91,155,255,0.15)", color: "#5b9bff", border: `1px solid ${DARK_BORDER}` }}>
                Click to zoom
              </div>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest z-10"
                style={{ background: "rgba(22,81,209,0.20)", color: "rgba(255,255,255,0.7)", border: `1px solid ${DARK_BORDER}` }}>
                {galleryImages[activeImg].label}
              </div>
              <button onClick={e => { e.stopPropagation(); manualSelect((activeImg - 1 + TOTAL) % TOTAL); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(91,155,255,0.25)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)"; }}>
                <ArrowLeft className="w-4 h-4 text-white" />
              </button>
              <button onClick={e => { e.stopPropagation(); manualSelect((activeImg + 1) % TOTAL); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(91,155,255,0.25)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)"; }}>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-between px-4 z-20" onClick={e => e.stopPropagation()}>
                <div className="flex items-center gap-2">
                  {galleryImages.map((_, i) => (
                    <button key={i} onClick={() => manualSelect(i)} className="rounded-full transition-all duration-300"
                      style={{ width: activeImg === i ? 24 : 8, height: 8, background: activeImg === i ? "linear-gradient(90deg,#1651D1,#5b9bff)" : "rgba(255,255,255,0.20)", boxShadow: activeImg === i ? "0 0 8px rgba(91,155,255,0.5)" : "none" }} />
                  ))}
                </div>
                <button onClick={() => setIsPlaying(p => !p)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest"
                  style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)", color: "#f0f4ff" }}>
                  {isPlaying ? <><span style={{ fontSize: 10 }}>⏸</span> Pause</> : <><span style={{ fontSize: 10 }}>▶</span> Play</>}
                </button>
              </div>
            </div>
          </div>

          {/* Info panel */}
          <div className="ps-info flex flex-col gap-5">
            <div className="ps-info-item" style={{ opacity: 0 }}>
              <span className="text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full"
                style={{ background: "rgba(22,81,209,0.15)", color: "#5b9bff", border: `1px solid ${DARK_BORDER}` }}>
                Pneumatic Walking Boot
              </span>
              <h1 className="mt-3 text-3xl md:text-4xl font-bold text-[#f0f4ff] leading-tight">XO Boot Pneumatic</h1>
              <p className="mt-1 font-semibold" style={{ backgroundImage: BLUE_GRAD, WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Better DME. Better Functionality. Better Outcomes.
              </p>
            </div>

            <ul className="ps-info-item flex flex-col gap-2 mt-1" style={{ opacity: 0 }}>
              {[
                "Aerodynamic shell — stronger, lighter, more durable",
                "Revolutionary compartmentalized pneumatic compression",
                "Removable anterior shield for patient compliance",
                "Real rocker sole — most fluid gait action ever built",
                "4-strap system with 360° swivel D-rings",
                "Seamless micro-fiber liner — T-shirt soft",
                "AFO undersleeve included (2 per boot)",
              ].map((b, i) => (
                <li key={i} className="ps-li flex items-center gap-2.5 text-sm text-white/60">
                  <Check className="w-4 h-4 flex-shrink-0" style={{ color: "#5b9bff" }} /> {b}
                </li>
              ))}
            </ul>

            {/* Sizing */}
            <div className="ps-info-item" style={{ opacity: 0 }}>
              <p className="text-[10px] uppercase tracking-widest font-bold mb-2" style={{ color: "rgba(91,155,255,0.5)" }}>Sizing — Tall or Short · SM, MD, LG</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Men — Small", val: "5 – 6.5" }, { label: "Women — Small", val: "4 – 9.5" },
                  { label: "Men — Medium", val: "6.5 – 11" }, { label: "Women — Medium", val: "9.5 – 13" },
                  { label: "Men — Large", val: "11 – 15" }, { label: "Women — Large", val: "13 – 16.5" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between px-3 py-2 rounded-xl"
                    style={{ background: "rgba(91,155,255,0.06)", border: `1px solid ${DARK_BORDER}` }}>
                    <span className="text-[10px] font-semibold text-[#f0f4ff]">{s.label}</span>
                    <span className="text-[10px] font-bold" style={{ color: "#5b9bff" }}>{s.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ps-info-item h-px w-full" style={{ background: DARK_BORDER, opacity: 0 }} />

            <div className="ps-info-item rounded-2xl p-5 text-sm" style={{ opacity: 0, background: "rgba(22,81,209,0.10)", border: `1px solid ${DARK_BORDER}` }}>
              <p className="font-bold mb-1" style={{ color: "#5b9bff" }}>Available Exclusively Through TLC DME LLC</p>
              <p className="text-white/45 leading-relaxed">The XO Boot Pneumatic is distributed exclusively through TLC DME LLC — DME Specialists, DME Solutions. Contact us for pricing, availability, and bulk orders: <span className="font-semibold" style={{ color: "#5b9bff" }}>(888) 521-8522</span> · tlcdme.com</p>
            </div>

            <a href="/contact" className="ps-info-item cursor-pointer group duration-300 transition-all w-fit rounded-full bg-[#1651D1]/30 hover:bg-[#1651D1]/50 backdrop-blur-2xl border border-white/20 p-1.5 relative overflow-hidden" style={{ opacity: 0 }}>
              <div className="absolute top-0 left-[5%] group-hover:left-[80%] duration-300 transition-all h-full w-10 bg-[#1651D1]/50 rounded-[200%] blur" />
              <div className="flex items-center bg-white rounded-full px-5 py-3 relative z-10">
                <span className="text-base font-semibold">Ask About This Product</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </a>
          </div>
        </div>

        {/* Tabs */}
        <div className="ps-tabs" style={{ opacity: 0 }}>
          <div className="flex gap-1 flex-wrap mb-0">
            {tabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="px-5 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-200"
                style={{
                  background: activeTab === tab ? "linear-gradient(135deg,#1651D1,#5b9bff)" : "rgba(8,12,42,0.8)",
                  color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.40)",
                  borderRadius: "8px 8px 0 0",
                  border: activeTab === tab ? "none" : `1px solid ${DARK_BORDER}`,
                  borderBottom: "none",
                  boxShadow: activeTab === tab ? "0 -4px 16px rgba(22,81,209,0.30)" : "none",
                }}>
                {tab}
              </button>
            ))}
          </div>
          <div className="p-6 rounded-b-2xl rounded-tr-2xl" style={{ background: "rgba(6,10,35,0.95)", border: `1px solid ${DARK_BORDER}`, minHeight: 180 }}>
            {tabContent[activeTab]}
          </div>
        </div>
      </div>

      {/* Zoom modal */}
      {zoom && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center"
          style={{ background: "rgba(2,9,22,0.90)", backdropFilter: "blur(16px)" }}
          onClick={() => { setZoom(false); setIsPlaying(false); }}>
          <div className="relative rounded-3xl overflow-hidden flex items-center justify-center"
            style={{ width: "min(90vw,800px)", height: "70vh", background: "linear-gradient(145deg,rgba(6,10,35,0.96),rgba(12,22,65,0.92))", border: `1px solid rgba(91,155,255,0.20)`, boxShadow: "0 0 80px rgba(22,81,209,0.30)" }}
            onClick={e => e.stopPropagation()}>
            <button onClick={e => { e.stopPropagation(); setActiveImg(p => (p - 1 + TOTAL) % TOTAL); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <ArrowLeft className="w-4 h-4 text-white" />
            </button>
            <button onClick={e => { e.stopPropagation(); setActiveImg(p => (p + 1) % TOTAL); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={galleryImages[activeImg].src} alt={galleryImages[activeImg].label}
              style={{ maxWidth: "85%", maxHeight: "85%", objectFit: "contain", filter: "drop-shadow(0 0 40px rgba(22,81,209,0.40))" }} />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest"
              style={{ background: "rgba(22,81,209,0.25)", color: "rgba(255,255,255,0.8)", border: `1px solid ${DARK_BORDER}` }}>
              {galleryImages[activeImg].label}
            </div>
            <button className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center z-20"
              style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.2)" }}
              onClick={() => { setZoom(false); setIsPlaying(false); }}>
              <span className="text-white text-sm font-bold">✕</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

// ── Before/After Slider — dark ────────────────────────────────────────────────
function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderX, setSliderX] = useState(50);
  const dragging = useRef(false);

  const calcPercent = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return 50;
    return Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 2), 98);
  };

  return (
    <div ref={containerRef}
      className="relative w-full rounded-3xl overflow-hidden select-none cursor-col-resize"
      style={{ height: 640, background: "linear-gradient(145deg,rgba(6,10,35,0.96),rgba(12,22,65,0.92))", boxShadow: `0 8px 48px rgba(22,81,209,0.22), 0 0 0 1px ${DARK_BORDER}`, border: `1px solid ${DARK_BORDER}` }}
      onMouseMove={e => { if (dragging.current) setSliderX(calcPercent(e.clientX)); }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchMove={e => setSliderX(calcPercent(e.touches[0].clientX))}
      onTouchEnd={() => { dragging.current = false; }}>
      <div className="absolute pointer-events-none" style={{ left: "-5%", top: "50%", transform: "translateY(-50%)", width: "55%", height: "80%", background: "radial-gradient(ellipse, rgba(22,81,209,0.18) 0%, transparent 70%)", filter: "blur(32px)", zIndex: 0 }} />
      <div className="absolute pointer-events-none" style={{ right: "-5%", top: "50%", transform: "translateY(-50%)", width: "55%", height: "80%", background: "radial-gradient(ellipse, rgba(22,81,209,0.12) 0%, transparent 70%)", filter: "blur(32px)", zIndex: 0 }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={CLD.bootProduct} alt="Product" className="absolute inset-0 w-full h-full object-contain pointer-events-none" style={{ zIndex: 1, padding: "20px" }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={CLD.bootBlueprint} alt="Blueprint" className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        style={{ clipPath: `inset(0 0 0 ${sliderX}%)`, zIndex: 2, filter: "brightness(0.85)", padding: "20px" }} />
      <div className="absolute top-0 bottom-0 z-10 pointer-events-none"
        style={{ left: `${sliderX}%`, width: 2, background: "linear-gradient(to bottom, transparent 0%, #5b9bff 15%, #5b9bff 85%, transparent 100%)", boxShadow: "0 0 12px rgba(91,155,255,0.6)" }} />
      <div className="absolute top-1/2 z-20 flex items-center justify-center"
        style={{ left: `${sliderX}%`, transform: "translate(-50%, -50%)", width: 46, height: 46, borderRadius: "50%", background: "rgba(8,12,42,0.9)", boxShadow: "0 4px 24px rgba(22,81,209,0.50), 0 0 0 2px rgba(91,155,255,0.4)", cursor: "col-resize" }}
        onMouseDown={() => { dragging.current = true; }}
        onTouchStart={() => { dragging.current = true; }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 5L3 10L7 15" stroke="#5b9bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 5L17 10L13 15" stroke="#5b9bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="absolute bottom-5 left-5 z-10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
        style={{ background: "rgba(91,155,255,0.15)", color: "#5b9bff", border: `1px solid ${DARK_BORDER}` }}>Product</div>
      <div className="absolute bottom-5 right-5 z-10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
        style={{ background: "rgba(22,81,209,0.55)", color: "white", border: `1px solid ${DARK_BORDER}` }}>Blueprint</div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
export default function XbootDetailPage() {
  const heroRef = useRef<HTMLElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState(1);
  const [activeBenefit, setActiveBenefit] = useState(0);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    gsap.fromTo(el.querySelectorAll(".hanim"), { opacity: 0, y: 44, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "expo.out", stagger: 0.12, delay: 0.08 });
    gsap.to(heroImgRef.current, { y: -18, duration: 3.8, ease: "sine.inOut", yoyo: true, repeat: -1 });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".sr").forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 86%", once: true } });
      });
    });
    return () => ctx.revert();
  }, []);

  // Shared dark feature/component card
  const DarkCompCard = ({ img, label, desc }: { img: string; label: string; desc: string }) => (
    <div className="rounded-2xl overflow-hidden flex flex-col" style={{ border: `1px solid ${DARK_BORDER}`, boxShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>
      <div className="flex items-center justify-center" style={{ height: 140, background: "rgba(6,10,35,0.8)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={label} className="w-full h-full object-contain" style={{ filter: "drop-shadow(0 0 12px rgba(91,155,255,0.3))" }} />
      </div>
      <div className="p-4" style={{ background: "rgba(8,12,42,0.95)" }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#5b9bff" }}>{label}</p>
        <p className="text-xs text-white/45 leading-relaxed">{desc}</p>
      </div>
    </div>
  );

  return (
    <>
      <StickyButtons />
      <div id="main-navbar" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100000 }}><Navbar /></div>

      {/* ══ HERO ══ — unchanged (already dark) */}
      <section ref={heroRef} className="relative w-full flex items-center overflow-hidden" style={{ minHeight: "100vh", background: DARK_BG }}>
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "linear-gradient(135deg,rgba(2,9,22,0.90) 0%,rgba(2,9,22,0.55) 55%,transparent 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, ...GRID_OVERLAY }} />
        <div className="relative w-full container mx-auto px-5 md:px-[100px]" style={{ zIndex: 2, paddingTop: "max(140px,14vh)", paddingBottom: 100 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col gap-5">
              <div className="hanim" style={{ opacity: 0 }}>
                <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.38em] font-bold px-3.5 py-1.5 rounded-full border"
                  style={{ background: "rgba(22,81,209,0.12)", border: "1px solid rgba(22,81,209,0.3)" }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#5b9bff" }} />
                  <span style={{ backgroundImage: BLUE_GRAD, WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Pneumatic Walking Boot</span>
                </span>
              </div>
              <div className="hanim" style={{ opacity: 0 }}>
                <h1 className="font-nexa uppercase leading-[0.95] text-[#f0f4ff]" style={{ fontSize: "clamp(2.5rem,7vw,5rem)", fontWeight: 800, letterSpacing: "-3px" }}>
                  XO Boot<br />
                  <span className="block" style={{ background: "linear-gradient(180deg, #1a6fd4 0%, #0d4fa8 35%, #1565c8 55%, #0a3d8a 80%, #1251b0 100%)", WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 16px rgba(22,81,209,0.4))", paddingTop: "10px" }}>Pneumatic</span>
                </h1>
              </div>
              <p className="hanim text-xs font-semibold uppercase tracking-widest" style={{ opacity: 0, backgroundImage: BLUE_GRAD, WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text", letterSpacing: "0.12em" }}>Better DME · Better Functionality · Better Outcomes</p>
              <p className="hanim text-base leading-relaxed text-white/55 border-l-[3px] pl-3.5" style={{ opacity: 0, borderColor: "rgba(91,155,255,0.25)" }}>
                Engineered for superior strength, performance and comfort — strategically crafted to deliver exceptional clinical outcomes. The XO Boot is designed with Biomechanical Engineers and feedback from Orthopedic, Urgent Care and Podiatry clients.
              </p>
              <div className="hanim flex items-center gap-4 flex-wrap" style={{ opacity: 0 }}>
                <a href="/contact" className="cursor-pointer group duration-300 transition-all w-fit rounded-full bg-[#1651D1]/30 hover:bg-[#1651D1]/50 backdrop-blur-2xl border border-white/30 p-1.5 relative overflow-hidden">
                  <div className="absolute top-0 left-[5%] group-hover:left-[80%] duration-300 transition-all h-full w-10 bg-[#1651D1]/50 rounded-[200%] blur" />
                  <div className="flex items-center bg-white rounded-full px-4 py-2 md:px-5 md:py-3 relative z-10">
                    <span className="text-base font-semibold">Contact for Pricing</span> <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </a>
                <a href="/products" className="text-sm font-semibold flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors">
                  All Products <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <div ref={heroImgRef} className="hanim relative flex items-center justify-center" style={{ opacity: 0, height: 580, paddingLeft: 80, paddingBottom: 80 }}>
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center 60%,rgba(22,81,209,0.30) 0%,transparent 65%)", filter: "blur(24px)" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CLD.XoBootHero} alt="XO Boot Pneumatic" style={{ position: "relative", zIndex: 1, maxHeight: "100%", maxWidth: "90%", objectFit: "contain", filter: "drop-shadow(0 32px 64px rgba(22,81,209,0.45)) drop-shadow(0 4px 16px rgba(0,0,0,0.40))" }} />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none" style={{ zIndex: 2, background: `linear-gradient(to bottom,transparent,${DARK_BG})` }} />
      </section>

      {/* ══ AERODYNAMIC SHELL (Blueprint slider) ══ — dark */}
      <section className="relative w-full py-20 md:py-28 overflow-hidden" style={{ background: DARK_BG }}>
        <div className="absolute inset-0 pointer-events-none" style={GRID_OVERLAY} />
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(91,155,255,0.2), transparent)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 68% 52%, rgba(22,81,209,0.10) 0%, transparent 60%)" }} />
        <div className="container mx-auto px-5 md:px-[100px] relative z-10">
          <div className="sr text-center mb-12" style={{ opacity: 0 }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f4ff] leading-tight">
              World Class{" "}
              <span style={{ backgroundImage: BLUE_GRAD, WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Aerodynamic Shell</span>
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-white/45 leading-relaxed">
              The most sophisticated shell design ever produced — short leg cast-like stability and protection beyond any walking boot available. Unparalleled adjustability features reduce pressure points, accommodate anatomical disparities and swelling variance.
            </p>
          </div>
          <div className="sr grid grid-cols-1 md:grid-cols-2 gap-8 items-center" style={{ opacity: 0 }}>
            <div className="flex flex-col gap-3">
              {features.map((f, i) => {
                const on = activeFeature === i;
                return (
                  <button key={i} onClick={() => setActiveFeature(i)}
                    className="w-full text-left rounded-2xl p-5 flex items-center gap-4 transition-all duration-300"
                    style={{ background: on ? "linear-gradient(135deg,#1651D1,#5b9bff)" : DARK_CARD, boxShadow: on ? "0 8px 28px rgba(22,81,209,0.35)" : "0 2px 12px rgba(0,0,0,0.3)", border: on ? "none" : `1px solid ${DARK_BORDER}`, minHeight: 72 }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: on ? "rgba(255,255,255,0.18)" : "rgba(91,155,255,0.12)" }}>
                      <Check className={`w-5 h-5 ${on ? "text-white" : "text-[#5b9bff]"}`} />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-bold leading-snug ${on ? "text-white" : "text-[#f0f4ff]"}`}>{f.label}</p>
                      {on && <p className="text-xs leading-relaxed text-white/75 mt-1.5">{f.desc}</p>}
                    </div>
                  </button>
                );
              })}
            </div>
            <BeforeAfterSlider />
          </div>
        </div>
      </section>

      {/* ══ POWERSTEP (gallery + tabs) ══ */}
      <PowerStepSection />

      {/* ══ SIZING CHART ══ — dark */}
      <section className="relative w-full py-20 overflow-hidden" style={{ background: DARK_BG, borderTop: `1px solid ${DARK_BORDER}` }}>
        <div className="absolute inset-0 pointer-events-none" style={GRID_OVERLAY} />
        <div className="container mx-auto px-5 md:px-[100px] relative z-10">
          <div className="sr text-center mb-12" style={{ opacity: 0 }}>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold" style={{ color: "#5b9bff" }}>Sizing Guide</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold text-[#f0f4ff] leading-tight">
              Find Your{" "}
              <span style={{ backgroundImage: BLUE_GRAD, WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Perfect Fit</span>
            </h2>
            <p className="mt-4 max-w-lg mx-auto text-sm text-white/40">Available in Tall or Short style — Small, Medium, and Large for both men and women.</p>
          </div>
          <div className="sr grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto" style={{ opacity: 0 }}>
            {[
              { label: "Men", gradient: "linear-gradient(135deg,#1651D1,#0d4fa8)", rows: [["Small", "5 – 6.5"], ["Medium", "6.5 – 11"], ["Large", "11 – 15"]] },
              { label: "Women", gradient: "linear-gradient(135deg,#1651D1,#5b9bff)", rows: [["Small", "4 – 9.5"], ["Medium", "9.5 – 13"], ["Large", "13 – 16.5"]] },
            ].map((t, ti) => (
              <div key={ti} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${DARK_BORDER}`, boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}>
                <div className="px-6 py-4" style={{ background: t.gradient }}>
                  <p className="text-white font-bold text-sm uppercase tracking-widest">{t.label}</p>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: "rgba(22,81,209,0.12)" }}>
                      <th className="px-6 py-3 text-left font-bold text-xs uppercase tracking-widest" style={{ color: "rgba(91,155,255,0.7)" }}>Size</th>
                      <th className="px-6 py-3 text-left font-bold text-xs uppercase tracking-widest" style={{ color: "rgba(91,155,255,0.7)" }}>Shoe Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.rows.map(([s, r], i) => (
                      <tr key={i} style={{ borderTop: `1px solid ${DARK_BORDER}`, background: i % 2 === 0 ? "rgba(8,12,42,0.8)" : "rgba(14,24,72,0.5)" }}>
                        <td className="px-6 py-4 font-semibold text-[#f0f4ff]">{s}</td>
                        <td className="px-6 py-4 text-white/45">{r}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
          <p className="sr text-center mt-8 text-xs text-white/25" style={{ opacity: 0 }}>
            The XO Boot Pneumatic is available exclusively through TLC DME LLC · (888) 521-8522 · tlcdme.com
          </p>
        </div>
      </section>

      {/* ══ REVOLUTIONARY COMPRESSION ══ — dark */}
      <section className="relative w-full overflow-hidden" style={{ background: DARK_BG, borderTop: `1px solid ${DARK_BORDER}` }}>
        <div className="absolute inset-0 pointer-events-none" style={GRID_OVERLAY} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 32% 50%, rgba(22,81,209,0.08) 0%, transparent 55%)" }} />
        <div className="container mx-auto px-5 md:px-[100px] relative z-10 py-20 md:py-28">
          <div className="sr grid grid-cols-1 md:grid-cols-2 gap-14 items-center" style={{ opacity: 0 }}>
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f4ff] leading-tight">
                Revolutionary{" "}
                <span style={{ backgroundImage: BLUE_GRAD, WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Compression System</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/50 leading-relaxed">
                Provides optimal surface area contact allowing for customized compression. The liner seamless micro-fiber material is low-friction and wicking — T-Shirt soft — enhancing patient comfort and compliance. Low-force pneumatic bulb and original user-friendly valve allow for rapid inflation & deflation with far less effort. Unique air cell configuration delivers effective medial & lateral malleolar custom compression.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <DarkCompCard img={CLD.xoEzBulb} label="EZ Adjust Bulb & Valve" desc="Larger soft bulb fills air cells faster & easier. Intuitive, easy read inflate-deflate valve." />
                <DarkCompCard img={CLD.xoLiner} label="Liner Compression System" desc="Micro-fiber soft lining; less sweat retention. Unique air pressure cells for effective medial & lateral malleolar custom compression." />
              </div>
            </div>
            <div className="relative flex items-center justify-center" style={{ minHeight: 400 }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{ width: "80%", height: "28%", background: "radial-gradient(ellipse, rgba(22,81,209,0.25) 0%, transparent 70%)", filter: "blur(22px)", zIndex: 0 }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CLD.xoRevolutionary} alt="Both boots side view" style={{ maxHeight: 600, maxWidth: "110%", objectFit: "contain", position: "relative", zIndex: 1, filter: "drop-shadow(0 18px 48px rgba(22,81,209,0.30)) drop-shadow(0 4px 18px rgba(0,0,0,0.3))" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STRAPPING SYSTEM ══ — dark */}
      <section className="relative w-full overflow-hidden min-h-[560px] flex items-stretch" style={{ background: DARK_BG, borderTop: `1px solid ${DARK_BORDER}` }}>
        <div className="absolute inset-0 pointer-events-none" style={GRID_OVERLAY} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 68% 50%, rgba(22,81,209,0.08) 0%, transparent 55%)" }} />
        <div className="container mx-auto px-5 md:px-[100px] relative z-10 py-20 md:py-28 w-full">
          <div className="sr grid grid-cols-1 md:grid-cols-2 gap-14 items-center" style={{ opacity: 0 }}>
            <div className="relative flex items-center justify-center" style={{ minHeight: 420 }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{ width: "80%", height: "30%", background: "radial-gradient(ellipse, rgba(22,81,209,0.22) 0%, transparent 70%)", filter: "blur(20px)", zIndex: 0 }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CLD.bootProduct} alt="Boot both sides" style={{ height: 420, maxWidth: "100%", objectFit: "contain", position: "relative", zIndex: 1, filter: "drop-shadow(0 20px 48px rgba(22,81,209,0.28)) drop-shadow(0 4px 18px rgba(0,0,0,0.3))" }} />
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f4ff] leading-tight">
                Unique Strapping<br />
                <span style={{ backgroundImage: BLUE_GRAD, WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text" }}>System & Grips</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/50 leading-relaxed">
                Tall style designed with only 4 straps for less irritation and enhanced comfort. D-rings swivel a full 360° for greater adjustability and a customized fit. Strap tips are constructed of HQ easy grip rubber — less "stick", easier to open, and better control when applying or re-fitting at home.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <DarkCompCard img={CLD.xoStraps} label="4 Strap System" desc="Less straps (4) for easier application and more comfort. Unique full swivel D-rings, less irritation." />
                <DarkCompCard img={CLD.xoGripTips} label="Easy Grip Tip" desc="Unique rubber grip tips allow easy adjust for application and for patient re-fitting at home." />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ROCKER SOLE ══ — dark */}
      <section className="relative w-full overflow-hidden min-h-[480px] flex items-stretch" style={{ background: DARK_BG, borderTop: `1px solid ${DARK_BORDER}` }}>
        <div className="absolute inset-0 pointer-events-none" style={GRID_OVERLAY} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 32% 50%, rgba(22,81,209,0.08) 0%, transparent 55%)" }} />
        <div className="container mx-auto px-5 md:px-[100px] relative z-10 py-20 md:py-28 w-full">
          <div className="sr grid grid-cols-1 md:grid-cols-2 gap-14 items-center" style={{ opacity: 0 }}>
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f4ff] leading-tight">
                <span style={{ backgroundImage: BLUE_GRAD, WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Real Rocker Sole</span> & Natural Gait Support
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/50 leading-relaxed">
                The most fluid rocker action ever built to support gait pattern from heel strike to toe off, for more natural ambulation. Sole tread design provides greater traction and less slippage. The insole foam rubber composite gives a softer plantar surface and is removable for easy washing. HQ rubber sole resists clogging from debris — built to perform in every environment.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <DarkCompCard img={CLD.xoRocker} label="Rocker Sole" desc="Better absorbs heel shock & allows fluid gait. HQ rubber sole for traction; resists clogging from debris." />
                <DarkCompCard img={CLD.xoInsole} label="Inner Sole" desc="Insole foam rubber composite for softer plantar surface; removable for easy washing." />
              </div>
            </div>
            <div className="relative flex items-center justify-center" style={{ minHeight: 360 }}>
              <div className="absolute pointer-events-none" style={{ bottom: "5%", left: "50%", transform: "translateX(-50%)", width: "70%", height: "40%", background: "radial-gradient(ellipse, rgba(22,81,209,0.25) 0%, transparent 70%)", filter: "blur(22px)", zIndex: 0 }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CLD.xbootBottom} alt="Rocker bottom sole" style={{ maxHeight: 380, maxWidth: "85%", objectFit: "contain", position: "relative", zIndex: 1, filter: "drop-shadow(0 20px 48px rgba(22,81,209,0.30)) drop-shadow(0 4px 16px rgba(0,0,0,0.3))" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ AFO UNDERSLEEVE ══ — already dark, keep as-is */}
      <section className="relative w-full py-16 overflow-hidden" style={{ background: DARK_BG }}>
        <div className="absolute inset-0 pointer-events-none" style={GRID_OVERLAY} />
        <div className="container mx-auto px-5 md:px-[100px] relative z-10">
          <div className="sr" style={{ opacity: 0 }}>
            <div className="rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10"
              style={{ background: "linear-gradient(135deg,rgba(22,81,209,0.18) 0%,rgba(6,10,35,0.9) 100%)", border: `1px solid rgba(91,155,255,0.18)` }}>
              <div className="flex-shrink-0 w-28 h-28 rounded-2xl overflow-hidden" style={{ boxShadow: "0 0 40px rgba(91,155,255,0.3)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={CLD.sleeves} alt="AFO Undersleeve" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#5b9bff]">Included With Every Boot</span>
                <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white leading-tight">AFO Undersleeve <span className="text-[#5b9bff]">— 2 Included</span></h2>
                <p className="mt-3 text-white/60 text-base leading-relaxed max-w-2xl">Two AFO undersleeves are included with each boot. Increases patient comfort by eliminating hot spots due to friction and wicks away perspiration — helping keep skin clean and reducing odor. Proprietary micro-fiber material provides a cool, comfortable feel with light even compression, enhancing overall wearability.</p>
              </div>
              <div className="flex-shrink-0 flex flex-col gap-3">
                {[{ t: "Eliminates Hot Spots", d: "Friction-free fit" }, { t: "Wicking Material", d: "Keeps skin dry & clean" }, { t: "2 Per Boot", d: "Always included" }].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: "rgba(91,155,255,0.10)", border: `1px solid rgba(91,155,255,0.18)` }}>
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#5b9bff" }} />
                    <div><p className="text-white text-xs font-bold">{f.t}</p><p className="text-white/45 text-[10px]">{f.d}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ BETTER DME / BENEFITS ══ — dark */}
      <section className="relative w-full py-20 md:py-28 overflow-hidden" style={{ background: DARK_BG, borderTop: `1px solid ${DARK_BORDER}` }}>
        <div className="absolute inset-0 pointer-events-none" style={GRID_OVERLAY} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(22,81,209,0.08) 0%, transparent 65%)" }} />
        <div className="container mx-auto px-5 md:px-[100px] relative z-10">
          <div className="sr text-center mb-14" style={{ opacity: 0 }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f4ff] leading-tight">
              Better DME.{" "}
              <span style={{ backgroundImage: BLUE_GRAD, WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Better Outcomes.</span>
            </h2>
          </div>
          <div className="sr grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ opacity: 0 }}>
            {benefits.map((b, i) => {
              const on = activeBenefit === i;
              return (
                <div key={i} onClick={() => setActiveBenefit(i)}
                  className="rounded-2xl p-6 flex flex-col gap-3 cursor-pointer transition-all duration-300"
                  style={{ background: on ? "linear-gradient(145deg,#1651D1,#5b9bff)" : DARK_CARD, boxShadow: on ? "0 12px 36px rgba(22,81,209,0.35)" : "0 2px 14px rgba(0,0,0,0.3)", border: on ? "none" : `1px solid ${DARK_BORDER}` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: on ? "rgba(255,255,255,0.18)" : "rgba(91,155,255,0.12)", color: on ? "#fff" : "#5b9bff" }}>{b.icon}</div>
                  <p className={`text-sm font-bold leading-snug ${on ? "text-white" : "text-[#f0f4ff]"}`}>{b.title}</p>
                  <p className={`text-xs leading-relaxed ${on ? "text-white/75" : "text-white/45"}`}>{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ FITTING ══ — dark */}
      <section className="relative w-full py-20 md:py-28 overflow-hidden" style={{ background: DARK_BG, borderTop: `1px solid ${DARK_BORDER}` }}>
        <div className="absolute inset-0 pointer-events-none" style={GRID_OVERLAY} />
        <div className="container mx-auto px-5 md:px-[100px] relative z-10">
          <div className="sr grid grid-cols-1 md:grid-cols-2 gap-14 items-center" style={{ opacity: 0 }}>
            <div className="relative flex items-center justify-center" style={{ minHeight: 400 }}>
              <div className="absolute pointer-events-none" style={{ bottom: "8%", left: "50%", transform: "translateX(-50%)", width: "55%", height: "35%", background: "radial-gradient(ellipse, rgba(22,81,209,0.22) 0%, transparent 70%)", filter: "blur(20px)" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CLD.xbootLowRocker} alt="How it works" style={{ position: "relative", zIndex: 1, maxHeight: 400, objectFit: "contain", filter: "drop-shadow(0 8px 28px rgba(22,81,209,0.25))" }} />
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f4ff] leading-tight">
                Fitting Your{" "}
                <span style={{ backgroundImage: BLUE_GRAD, WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text" }}>XO Boot</span>
              </h2>
              <div className="flex flex-col gap-3 mt-1">
                {steps.map((s) => (
                  <div key={s.num} className="flex gap-4 p-5 rounded-2xl" style={{ background: DARK_CARD, border: `1px solid ${DARK_BORDER}`, boxShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-sm font-bold" style={{ background: "linear-gradient(135deg,#1651D1,#5b9bff)", boxShadow: "0 4px 14px rgba(22,81,209,0.35)" }}>{s.num}.</div>
                    <div>
                      <p className="text-sm font-bold text-[#f0f4ff] mb-1">{s.title}</p>
                      <p className="text-sm text-white/45 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ REVIEWS ══ — dark */}
      <section className="relative w-full py-20 md:py-28 overflow-hidden" style={{ background: DARK_BG, borderTop: `1px solid ${DARK_BORDER}` }}>
        <div className="absolute inset-0 pointer-events-none" style={GRID_OVERLAY} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(22,81,209,0.07) 0%, transparent 65%)" }} />
        <div className="container mx-auto px-5 md:px-[100px] relative z-10">
          <div className="sr text-center mb-14" style={{ opacity: 0 }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f4ff] leading-tight">
              What Our{" "}
              <span style={{ backgroundImage: BLUE_GRAD, WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Customers</span> Say
            </h2>
          </div>
          <div className="sr grid grid-cols-1 md:grid-cols-3 gap-5" style={{ opacity: 0 }}>
            {reviews.map((r, i) => (
              <div key={i} className="rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300"
                style={{ background: DARK_CARD, border: `1px solid ${DARK_BORDER}`, boxShadow: "0 4px 18px rgba(0,0,0,0.3)" }}
                onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = "translateY(-4px)"; d.style.boxShadow = "0 14px 40px rgba(22,81,209,0.20)"; d.style.borderColor = DARK_BORDER_H; }}
                onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = ""; d.style.boxShadow = "0 4px 18px rgba(0,0,0,0.3)"; d.style.borderColor = DARK_BORDER; }}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg,#1651D1,#5b9bff)" }}>{r.name[0]}</div>
                  <div>
                    <p className="text-sm font-bold text-[#f0f4ff]">{r.name}, <span className="font-normal text-white/40">{r.location}</span></p>
                    <p className="text-xs text-white/25">{r.days}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, s) => (<Star key={s} className={`w-4 h-4 ${s < r.rating ? "fill-amber-400 text-amber-400" : "text-white/15"}`} />))}
                </div>
                <p className="text-sm text-white/50 leading-relaxed">{r.text}</p>
                <button className="text-sm font-bold text-left" style={{ color: "#5b9bff" }}>Read more</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ — dark */}
      <section className="relative py-24 overflow-hidden" style={{ background: DARK_BG }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(91,155,255,0.2), transparent)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(22,81,209,0.12) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={GRID_OVERLAY} />
        <div className="relative z-10 max-w-xl mx-auto px-6 flex flex-col items-center text-center gap-6">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "rgba(91,155,255,0.7)" }} />
          <h2 className="font-nexa uppercase leading-tight text-[#f0f4ff]" style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.5px" }}>
            Provide Your Patients{" "}
            <span style={{ backgroundImage: BLUE_GRAD, WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text" }}>With The Best.</span>
          </h2>
          <p className="text-white/45 text-base leading-relaxed">The XO Boot Pneumatic is available exclusively through TLC DME LLC. Contact our team for pricing, availability, and distribution inquiries.</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a href="/contact" className="cursor-pointer group duration-300 transition-all w-fit rounded-full bg-[#1651D1]/30 hover:bg-[#1651D1]/50 backdrop-blur-2xl border border-white/30 p-1.5 relative overflow-hidden">
              <div className="absolute top-0 left-[5%] group-hover:left-[80%] duration-300 transition-all h-full w-10 bg-[#1651D1]/50 rounded-[200%] blur" />
              <div className="flex items-center bg-white rounded-full px-4 py-2 md:px-5 md:py-3 relative z-10">
                <span className="text-base font-semibold">Speak With Specialist</span> <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </a>
            <a href="/" className="text-sm font-semibold uppercase tracking-widest text-white/25 hover:text-white/60 transition-colors">Back to Home</a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}