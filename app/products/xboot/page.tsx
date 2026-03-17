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
  { src: CLD.XoBootHero, label: "Full Boot" },
  { src: CLD.xoShell, label: "Shell" },
];

const tabContent: Record<string, React.ReactNode> = {
  Description: (
    <div className="flex flex-col gap-4">
      <p className="text-[#3a4a6b] text-base leading-relaxed italic border-l-4 border-[#111184]/20 pl-4">
        "Wow, this is the nicest boot I've ever seen!" — Direct quote from a well-known national competitor.
      </p>
      <p className="text-[#3a4a6b] text-base leading-relaxed">
        The XO Boot Pneumatic is engineered for unparalleled strength, performance and comfort — strategically crafted to deliver exceptional clinical outcomes. Designed by TLC DME with Biomechanical Engineers and feedback from Orthopedic, Urgent Care and Podiatry clients, the XO Boot sets a new standard in walking boot technology.
      </p>
      <ul className="flex flex-col gap-2 mt-1">
        {["Uniquely designed aerodynamic shell — stronger, lighter weight, more durable support",
          "Innovative adjustable components ensure best possible patient comfort and compliance",
          "Ground-breaking Pneumatic System with compartmentalized air delivery and focused compression"
        ].map((b, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-[#3a4a6b]">
            <span className="mt-1.5 w-2 h-2 rounded-full bg-[#111184] flex-shrink-0" />{b}
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
        <li key={i} className="flex items-start gap-3 text-[#3a4a6b] text-sm">
          <span className="mt-1 w-2 h-2 rounded-full bg-[#111184] flex-shrink-0" />
          {b}
        </li>
      ))}
    </ul>
  ),
  Specifications: (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          ["Style Options", "Tall or Short"],
          ["Sizes", "Small, Medium, Large"],
          ["Men — Small", "Shoe size 5 – 6.5"],
          ["Men — Medium", "Shoe size 6.5 – 11"],
          ["Men — Large", "Shoe size 11 – 15"],
          ["Women — Small", "Shoe size 4 – 9.5"],
          ["Women — Medium", "Shoe size 9.5 – 13"],
          ["Women — Large", "Shoe size 13 – 16.5"],
          ["Calf Fit", "Accommodates larger/wider calves"],
          ["Straps", "4-strap system"],
          ["D-Rings", "Full 360° swivel"],
          ["Air System", "Pneumatic pump with EZ bulb & valve"],
          ["Sole", "Real rocker bottom — HQ rubber"],
          ["Liner", "Seamless micro-fiber, removable"],
          ["Toe Guard", "Removable anterior shield"],
          ["AFO Undersleeve", "2 included per boot"],
        ].map(([key, val]) => (
          <div key={key} className="flex flex-col gap-0.5 p-3 rounded-xl" style={{ background: "#f4f6ff", border: "1px solid rgba(17,17,132,0.07)" }}>
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#111184]/50">{key}</span>
            <span className="text-sm font-semibold text-[#0d1535]">{val}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-[#6b7fa8] italic">The XO Boot Pneumatic is available exclusively through TLC DME LLC. Call (888) 521-8522 or visit tlcdme.com</p>
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
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-xs font-bold" style={{ background: "linear-gradient(135deg,#0f0f7a,#111184)" }}>{s.n}</div>
          <div>
            <p className="font-bold text-[#0d1535] text-sm mb-0.5">{s.t}</p>
            <p className="text-sm text-[#6b7fa8] leading-relaxed">{s.d}</p>
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

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = answerRef.current;
    if (!el) return;
    if (open) {
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.38, ease: "power3.out" });
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.28, ease: "power2.in" });
    }
  }, [open]);

  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        border: open ? "1px solid rgba(17,17,132,0.22)" : "1px solid rgba(17,17,132,0.08)",
        boxShadow: open ? "0 8px 32px rgba(17,17,132,0.10)" : "0 1px 4px rgba(17,17,132,0.04)",
        transition: "box-shadow 0.3s ease, border 0.3s ease",
      }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left group"
        style={{
          background: open
            ? "linear-gradient(135deg, #eef0ff 0%, #e6e8ff 100%)"
            : "linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%)",
          transition: "background 0.3s ease",
        }}>
        <span className="font-bold text-[#0d1535] text-sm group-hover:text-[#111184] transition-colors duration-200">{q}</span>
        <div className="flex-shrink-0 ml-4 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: open ? "#111184" : "rgba(17,17,132,0.08)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}>
          <span className="text-sm font-bold leading-none" style={{ color: open ? "#fff" : "#111184" }}>+</span>
        </div>
      </button>
      <div ref={answerRef} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
        <div className="px-5 py-4 text-sm text-[#6b7fa8] leading-relaxed"
          style={{ background: "linear-gradient(135deg, #f4f6ff 0%, #eef0ff 100%)", borderTop: "1px solid rgba(17,17,132,0.07)" }}>
          {a}
        </div>
      </div>
    </div>
  );
}

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
    autoRef.current = setInterval(() => {
      setActiveImg(prev => (prev + 1) % TOTAL);
    }, 3000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [isPlaying, TOTAL]);
  const manualSelect = (i: number) => {
    setActiveImg(i);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 6000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ps-breadcrumb", { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: ".ps-breadcrumb", start: "top 85%", once: true } });
      gsap.fromTo(".ps-gallery", { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 1.0, ease: "expo.out", scrollTrigger: { trigger: ".ps-gallery", start: "top 80%", once: true } });
      gsap.fromTo(".ps-info-item", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: ".ps-info", start: "top 78%", once: true } });
      gsap.fromTo(".ps-tabs", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", scrollTrigger: { trigger: ".ps-tabs", start: "top 88%", once: true } });
      gsap.fromTo(".ps-li", { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: ".ps-li", start: "top 80%", once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white py-20" style={{ borderTop: "1px solid rgba(17,17,132,0.07)" }}>
      <div className="container mx-auto px-5 md:px-[80px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          <div className="ps-gallery flex gap-4" style={{ opacity: 0 }}>
            <div className="flex flex-col gap-2 flex-shrink-0">
              {galleryImages.map((img, i) => (
                <button key={i} onClick={() => manualSelect(i)}
                  className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300"
                  style={{
                    border: activeImg === i ? "2px solid #111184" : "2px solid transparent",
                    boxShadow: activeImg === i ? "0 0 0 3px rgba(17,17,132,0.18), 0 4px 16px rgba(17,17,132,0.15)" : "0 1px 4px rgba(0,0,0,0.08)",
                    background: activeImg === i ? "linear-gradient(135deg,#eef0ff,#e0e4ff)" : "#f4f6ff",
                    transform: activeImg === i ? "scale(1.08)" : "scale(1)",
                  }}
                  onMouseEnter={e => { if (activeImg !== i) (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)"; }}
                  onMouseLeave={e => { if (activeImg !== i) (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt={img.label} className="w-full h-full object-contain p-1"
                    style={{ filter: activeImg === i ? "brightness(1.05)" : "brightness(0.85)", transition: "filter 0.2s" }} />
                </button>
              ))}
            </div>
            <div className="flex-1 relative rounded-2xl overflow-hidden cursor-zoom-in group"
              style={{ background: "linear-gradient(145deg,#f4f6ff,#eef0ff)", border: "1px solid rgba(17,17,132,0.10)", minHeight: 420, boxShadow: "0 4px 24px rgba(17,17,132,0.08)", transition: "box-shadow 0.3s ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 48px rgba(17,17,132,0.16)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(17,17,132,0.08)"; }}
              onClick={() => setZoom(true)}>
              {galleryImages.map((img, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={img.src} alt={img.label}
                  className="absolute inset-0 w-full h-full object-contain p-6"
                  style={{ opacity: activeImg === i ? 1 : 0, transform: activeImg === i ? "scale(1)" : "scale(0.96)", transition: "opacity 0.4s ease, transform 0.4s ease", minHeight: 420 }} />
              ))}
              <div className="absolute top-3 right-3 bg-white/80 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#111184] z-10">
                Click to zoom
              </div>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest z-10"
                style={{ background: "rgba(17,17,132,0.08)", color: "#111184" }}>
                {galleryImages[activeImg].label}
              </div>
              <button onClick={e => { e.stopPropagation(); manualSelect((activeImg - 1 + TOTAL) % TOTAL); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ background: "rgba(17,17,132,0.10)", border: "1px solid rgba(17,17,132,0.15)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(17,17,132,0.22)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(17,17,132,0.10)"; }}>
                <ArrowLeft className="w-4 h-4 text-[#111184]" />
              </button>
              <button onClick={e => { e.stopPropagation(); manualSelect((activeImg + 1) % TOTAL); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ background: "rgba(17,17,132,0.10)", border: "1px solid rgba(17,17,132,0.15)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(17,17,132,0.22)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(17,17,132,0.10)"; }}>
                <ArrowRight className="w-4 h-4 text-[#111184]" />
              </button>
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-between px-4 z-20"
                onClick={e => e.stopPropagation()}>
                <div className="flex items-center gap-2">
                  {galleryImages.map((_, i) => (
                    <button key={i} onClick={() => manualSelect(i)}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: activeImg === i ? 24 : 8,
                        height: 8,
                        background: activeImg === i ? "linear-gradient(90deg,#0f0f7a,#1651D1)" : "rgba(17,17,132,0.18)",
                        boxShadow: activeImg === i ? "0 0 8px rgba(17,17,132,0.35)" : "none",
                      }} />
                  ))}
                </div>
                <button onClick={() => setIsPlaying(p => !p)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.75)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(17,17,132,0.15)",
                    color: "#111184",
                  }}>
                  {isPlaying ? <><span style={{ fontSize: 10 }}>⏸</span> Pause</> : <><span style={{ fontSize: 10 }}>▶</span> Play</>}
                </button>
              </div>
            </div>
          </div>
          <div className="ps-info flex flex-col gap-5">
            <div className="ps-info-item" style={{ opacity: 0 }}>
              <span className="text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full" style={{ background: "rgba(17,17,132,0.08)", color: "#111184" }}>Pneumatic Walking Boot</span>
              <h1 className="mt-3 text-3xl md:text-4xl font-bold text-[#0d1535] leading-tight">XO Boot Pneumatic</h1>
              <p className="text-[#111184] font-semibold mt-1">Better DME. Better Functionality. Better Outcomes.</p>
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
                <li key={i} className="ps-li flex items-center gap-2.5 text-sm text-[#3a4a6b]">
                  <Check className="w-4 h-4 text-[#111184] flex-shrink-0" /> {b}
                </li>
              ))}
            </ul>
            {/* Sizing — compact display in product panel */}
            <div className="ps-info-item" style={{ opacity: 0 }}>
              <p className="text-[10px] uppercase tracking-widest font-bold text-[#111184]/50 mb-2">Sizing — Tall or Short · SM, MD, LG</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Men — Small", val: "5 – 6.5" },
                  { label: "Women — Small", val: "4 – 9.5" },
                  { label: "Men — Medium", val: "6.5 – 11" },
                  { label: "Women — Medium", val: "9.5 – 13" },
                  { label: "Men — Large", val: "11 – 15" },
                  { label: "Women — Large", val: "13 – 16.5" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between px-3 py-2 rounded-xl"
                    style={{ background: "rgba(17,17,132,0.04)", border: "1px solid rgba(17,17,132,0.08)" }}>
                    <span className="text-[10px] font-semibold text-[#0d1535]">{s.label}</span>
                    <span className="text-[10px] font-bold text-[#111184]">{s.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ps-info-item h-px w-full" style={{ background: "rgba(17,17,132,0.07)", opacity: 0 }} />
            <div className="ps-info-item rounded-2xl p-5 text-sm" style={{ opacity: 0, background: "linear-gradient(135deg,rgba(17,17,132,0.06) 0%,rgba(91,155,255,0.06) 100%)", border: "1px solid rgba(17,17,132,0.12)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)" }}>
              <p className="font-bold text-[#111184] mb-1">Available Exclusively Through TLC DME LLC</p>
              <p className="text-[#6b7fa8] leading-relaxed">The XO Boot Pneumatic is distributed exclusively through TLC DME LLC — DME Specialists, DME Solutions. Contact us for pricing, availability, and bulk orders: <span className="font-semibold text-[#111184]">(888) 521-8522</span> · tlcdme.com</p>
            </div>
            <a href="/contact" className="ps-info-item cursor-pointer group duration-300 transition-all w-fit rounded-full bg-[#111184]/30 hover:bg-[#111184]/50 backdrop-blur-2xl border border-white/30 p-1.5 relative overflow-hidden" style={{ opacity: 0 }}>
              <div className="absolute top-0 left-[5%] group-hover:left-[80%] duration-300 transition-all h-full w-10 bg-[#111184]/50 rounded-[200%] blur" />
              <div className="flex items-center bg-white rounded-full px-5 py-3 relative z-10">
                <span className="text-base font-semibold">Ask About This Product</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </a>
          </div>
        </div>
        <div className="ps-tabs" style={{ opacity: 0 }}>
          <div className="flex gap-1 flex-wrap mb-0">
            {tabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="px-5 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-200"
                style={{
                  background: activeTab === tab ? "linear-gradient(135deg,#0f0f7a,#1651D1)" : "#e8eaff",
                  color: activeTab === tab ? "#fff" : "#111184",
                  borderRadius: "8px 8px 0 0",
                  boxShadow: activeTab === tab ? "0 -4px 16px rgba(17,17,132,0.25)" : "none",
                  transition: "all 0.25s ease",
                }}>
                {tab}
              </button>
            ))}
          </div>
          <div className="p-6 rounded-b-2xl rounded-tr-2xl" style={{ background: "linear-gradient(160deg,#f4f6ff 0%,#eef0ff 100%)", border: "1px solid rgba(17,17,132,0.10)", minHeight: 180, boxShadow: "0 8px 32px rgba(17,17,132,0.06)" }}>
            {tabContent[activeTab]}
          </div>
        </div>
      </div>
      {zoom && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center"
          style={{ background: "rgba(2,9,22,0.85)", backdropFilter: "blur(16px)" }}
          onClick={() => { setZoom(false); setIsPlaying(false); }}>
          <div className="relative rounded-3xl overflow-hidden flex items-center justify-center"
            style={{
              width: "min(90vw,800px)", height: "70vh",
              background: "linear-gradient(145deg,rgba(6,10,35,0.96) 0%,rgba(12,22,65,0.92) 100%)",
              border: "1px solid rgba(91,155,255,0.2)",
              boxShadow: "0 0 80px rgba(22,81,209,0.3)",
            }}
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
              style={{
                maxWidth: "85%", maxHeight: "85%", objectFit: "contain",
                filter: "drop-shadow(0 0 40px rgba(22,81,209,0.35))"
              }} />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest"
              style={{ background: "rgba(22,81,209,0.25)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(91,155,255,0.2)" }}>
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

// function CustomSection() {
//   const [activeTab, setActiveTab] = useState("Description");
//   const [activeImg, setActiveImg] = useState(0);
//   const [zoom, setZoom] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const sectionRef = useRef<HTMLElement>(null);
//   const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
//   const tabs = ["Description", "Benefits", "Specifications", "Wear Instructions", "FAQ"];
//   const TOTAL = galleryImages.length;
//   useEffect(() => {
//     if (!isPlaying) { if (autoRef.current) clearInterval(autoRef.current); return; }
//     autoRef.current = setInterval(() => {
//       setActiveImg(prev => (prev + 1) % TOTAL);
//     }, 3500);
//     return () => { if (autoRef.current) clearInterval(autoRef.current); };
//   }, [isPlaying, TOTAL]);

//   const manualSelect = (i: number) => {
//     setActiveImg(i);
//     setIsPlaying(false);
//     setTimeout(() => setIsPlaying(true), 6000);
//   };

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.fromTo(".cs-header > *", { opacity: 0, y: 32, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.15, ease: "expo.out", scrollTrigger: { trigger: ".cs-header", start: "top 82%", once: true } });
//       gsap.fromTo(".cs-mainimg", { opacity: 0, scale: 0.93 }, { opacity: 1, scale: 1, duration: 1.0, ease: "expo.out", scrollTrigger: { trigger: ".cs-mainimg", start: "top 80%", once: true } });
//       gsap.fromTo(".cs-thumb", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power3.out", scrollTrigger: { trigger: ".cs-thumb", start: "top 85%", once: true } });
//       gsap.fromTo(".cs-tabsection", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: ".cs-tabsection", start: "top 88%", once: true } });
//     }, sectionRef);
//     return () => ctx.revert();
//   }, []);

//   return (
//     <section ref={sectionRef} className="w-full py-24 overflow-hidden relative" style={{ background: "linear-gradient(160deg, #020916 0%, #060d2e 50%, #020916 100%)" }}>
//       <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(17,17,132,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.05) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

//       <div className="container mx-auto px-5 md:px-[80px] relative z-10">
//         <div className="cs-header text-center mb-16">
//           <span className="text-[10px] uppercase tracking-[0.4em] font-bold" style={{ color: "#5b9bff" }}>Product Gallery</span>
//           <h2 className="mt-3 text-3xl md:text-5xl font-bold text-white leading-tight">
//             Every Angle.{" "}
//             <span
//               key={activeImg}
//               style={{
//                 color: "#5b9bff",
//                 display: "inline-block",
//                 animation: "fadeSlideUp 0.4s ease forwards",
//               }}>
//               {galleryImages[activeImg].label}
//             </span>
//           </h2>
//           <style>{`
//             @keyframes fadeSlideUp {
//               from { opacity: 0; transform: translateY(10px); }
//               to   { opacity: 1; transform: translateY(0);    }
//             }
//           `}</style>
//         </div>
//         <div className="mb-16">
//           <div className="cs-mainimg relative w-full rounded-3xl overflow-hidden mb-4 cursor-zoom-in"
//             style={{ opacity: 0, height: 500, background: "linear-gradient(145deg,rgba(6,10,35,0.96),rgba(12,22,65,0.92))", border: "1px solid rgba(91,155,255,0.15)", boxShadow: "0 0 80px rgba(22,81,209,0.15)" }}
//             onClick={() => setZoom(true)}>
//             {(["tl", "tr", "bl", "br"] as const).map(c => (
//               <div key={c} style={{
//                 position: "absolute", width: 24, height: 24,
//                 top: c.startsWith("t") ? 16 : "auto", bottom: c.startsWith("b") ? 16 : "auto",
//                 left: c.endsWith("l") ? 16 : "auto", right: c.endsWith("r") ? 16 : "auto",
//                 borderTop: c.startsWith("t") ? "2px solid rgba(91,155,255,0.5)" : "none",
//                 borderBottom: c.startsWith("b") ? "2px solid rgba(91,155,255,0.5)" : "none",
//                 borderLeft: c.endsWith("l") ? "2px solid rgba(91,155,255,0.5)" : "none",
//                 borderRight: c.endsWith("r") ? "2px solid rgba(91,155,255,0.5)" : "none",
//               }} />
//             ))}
//             <img src={galleryImages[activeImg].src} alt={galleryImages[activeImg].label}
//               className="w-full h-full object-contain p-10 transition-all duration-500"
//               style={{ filter: "drop-shadow(0 20px 60px rgba(22,81,209,0.4))" }} />
//             <button onClick={e => { e.stopPropagation(); manualSelect((activeImg - 1 + TOTAL) % TOTAL); }}
//               className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
//               style={{ background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.70)", backdropFilter: "blur(8px)", boxShadow: "0 0 18px rgba(0,0,0,0.4)" }}
//               onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(255,255,255,0.30)"; b.style.boxShadow = "0 0 24px rgba(91,155,255,0.6)"; }}
//               onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(255,255,255,0.15)"; b.style.boxShadow = "0 0 18px rgba(0,0,0,0.4)"; }}>
//               <ArrowLeft className="w-5 h-5 text-white" />
//             </button>
//             <button onClick={e => { e.stopPropagation(); manualSelect((activeImg + 1) % TOTAL); }}
//               className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
//               style={{ background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.70)", backdropFilter: "blur(8px)", boxShadow: "0 0 18px rgba(0,0,0,0.4)" }}
//               onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(255,255,255,0.30)"; b.style.boxShadow = "0 0 24px rgba(91,155,255,0.6)"; }}
//               onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(255,255,255,0.15)"; b.style.boxShadow = "0 0 18px rgba(0,0,0,0.4)"; }}>
//               <ArrowRight className="w-5 h-5 text-white" />
//             </button>
//             <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-3 z-20"
//               style={{ background: "linear-gradient(to top, rgba(2,9,22,0.85) 0%, transparent 100%)" }}
//               onClick={e => e.stopPropagation()}>
//               <div className="flex items-center gap-2">
//                 {galleryImages.map((_, i) => (
//                   <button key={i} onClick={() => manualSelect(i)}
//                     className="rounded-full transition-all duration-300"
//                     style={{
//                       width: activeImg === i ? 28 : 8,
//                       height: 8,
//                       background: activeImg === i ? "linear-gradient(90deg,#fff,#a0c4ff)" : "rgba(255,255,255,0.35)",
//                       boxShadow: activeImg === i ? "0 0 10px rgba(255,255,255,0.5)" : "none",
//                     }} />
//                 ))}
//               </div>
//               <span className="text-[10px] uppercase tracking-widest font-bold text-white/70">
//                 {galleryImages[activeImg].label}
//               </span>
//               <button onClick={() => setIsPlaying(p => !p)}
//                 className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-200"
//                 style={{
//                   background: "rgba(255,255,255,0.12)",
//                   border: "2px solid rgba(255,255,255,0.60)",
//                   color: "#fff",
//                   backdropFilter: "blur(8px)",
//                 }}>
//                 {isPlaying ? <><span style={{ fontSize: 10 }}>⏸</span> Pause</> : <><span style={{ fontSize: 10 }}>▶</span> Play</>}
//               </button>
//             </div>
//           </div>
//           <div className="grid grid-cols-6 gap-3">
//             {galleryImages.map((img, i) => (
//               <button key={i} onClick={() => manualSelect(i)}
//                 className="cs-thumb relative rounded-2xl overflow-hidden transition-all duration-200"
//                 style={{
//                   opacity: 0,
//                   height: 80,
//                   background: "rgba(6,10,35,0.8)",
//                   border: activeImg === i ? "2px solid #5b9bff" : "1px solid rgba(91,155,255,0.12)",
//                   boxShadow: activeImg === i ? "0 0 20px rgba(91,155,255,0.35)" : "none",
//                 }}>
//                 <img src={img.src} alt={img.label} className="w-full h-full object-contain p-2"
//                   style={{ filter: activeImg === i ? "brightness(1.1)" : "brightness(0.6)", transition: "filter 0.2s" }} />
//               </button>
//             ))}
//           </div>
//         </div>
//         <div className="cs-tabsection" style={{ opacity: 0 }}>
//           <div className="flex gap-1 flex-wrap mb-0">
//             {tabs.map((tab) => (
//               <button key={tab} onClick={() => setActiveTab(tab)}
//                 className="px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-200"
//                 style={{
//                   background: activeTab === tab ? "linear-gradient(135deg,#1651D1,#5b9bff)" : "rgba(255,255,255,0.05)",
//                   color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.45)",
//                   borderRadius: "8px 8px 0 0",
//                   borderTop: activeTab === tab ? "none" : "1px solid rgba(91,155,255,0.1)",
//                   borderLeft: activeTab === tab ? "none" : "1px solid rgba(91,155,255,0.1)",
//                   borderRight: activeTab === tab ? "none" : "1px solid rgba(91,155,255,0.1)",
//                   borderBottom: "none",
//                 }}>
//                 {tab}
//               </button>
//             ))}
//           </div>
//           <div className="p-8 rounded-b-2xl rounded-tr-2xl"
//             style={{ background: "rgba(6,10,35,0.9)", border: "1px solid rgba(91,155,255,0.12)", backdropFilter: "blur(20px)", minHeight: 200 }}>
//             <div className="text-white/80">
//               {activeTab === "Description" && (
//                 <div className="flex flex-col gap-4">
//                   <p className="text-[#5b9bff] text-sm italic border-l-4 border-[#5b9bff]/30 pl-4">
//                     "Wow, this is the nicest boot I've ever seen!" — Direct quote from a well-known national competitor.
//                   </p>
//                   <p className="text-white/70 text-base leading-relaxed">
//                     The XO Boot Pneumatic is engineered for unparalleled strength, performance and comfort — strategically crafted to deliver exceptional clinical outcomes. Designed by TLC DME with Biomechanical Engineers and feedback from Orthopedic, Urgent Care and Podiatry clients.
//                   </p>
//                   <ul className="flex flex-col gap-2">
//                     {["Uniquely designed aerodynamic shell — stronger, lighter, more durable support",
//                       "Innovative adjustable components ensure best possible patient comfort and compliance",
//                       "Ground-breaking Pneumatic System with compartmentalized air delivery and focused compression"
//                     ].map((b, i) => (
//                       <li key={i} className="flex items-start gap-3 text-white/65 text-sm">
//                         <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#5b9bff] flex-shrink-0" />{b}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//               {activeTab === "Benefits" && (
//                 <ul className="flex flex-col gap-3">
//                   {[
//                     "World class aerodynamic shell — short leg cast-like stability beyond any walking boot available",
//                     "Revolutionary compression system with compartmentalized air cells for focused medial & lateral malleolar compression",
//                     "Real rocker sole — most fluid gait action ever built, from heel strike to toe off",
//                     "Flex polymer struts with softer materials — flexible medial & lateral, less pressure points",
//                     "Removable anterior shield for dorsum protection and optimal ankle joint flexion",
//                     "Exclusive calf adjustment accommodates larger/wider calves",
//                     "Seamless micro-fiber liner — T-shirt soft, low-friction, wicking",
//                     "4-strap system with 360° swivel D-rings and HQ easy grip rubber tips",
//                     "AFO undersleeve included (2 per boot) — eliminates hot spots, wicks perspiration",
//                   ].map((b, i) => (
//                     <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
//                       <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#5b9bff] flex-shrink-0" />{b}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//               {activeTab === "Specifications" && (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   {[
//                     ["Product Code", "XB-627 / XB-642"], ["Sizes Available", "XS, S, M, L, XL, XXL"],
//                     ["Calf Circumference", "Up to Size 15"], ["Material", "Flex Polymer / Medical Grade"],
//                     ["Air Compression", "Pneumatic Pump System"], ["Sole Type", "Rocker-Bottom"],
//                     ["Toe Guard", "Removable"], ["Weight", "Lightweight Open Frame"],
//                   ].map(([key, val]) => (
//                     <div key={key} className="p-3 rounded-xl" style={{ background: "rgba(22,81,209,0.08)", border: "1px solid rgba(91,155,255,0.12)" }}>
//                       <span className="text-[10px] uppercase tracking-widest font-bold text-[#5b9bff]/60 block">{key}</span>
//                       <span className="text-sm font-semibold text-white mt-0.5 block">{val}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//               {activeTab === "Wear Instructions" && (
//                 <ol className="flex flex-col gap-4">
//                   {[
//                     { n: "01", t: "Loosen All Straps", d: "Before putting on the boot, fully loosen all straps and deflate the air bladders by pressing the release valve." },
//                     { n: "02", t: "Insert Foot", d: "Slide your foot into the boot with your heel firmly seated at the back. Ensure your ankle is centered within the boot shell." },
//                     { n: "03", t: "Secure Lower Straps First", d: "Fasten straps from the bottom up — foot strap first, then ankle, then calf — for even, progressive support." },
//                     { n: "04", t: "Inflate for Compression", d: "Use the pneumatic pump to inflate the air bladders to your desired comfort level. Pump until snug but not painful." },
//                     { n: "05", t: "Attach Toe Guard (if needed)", d: "For post-surgical use or additional protection, clip the removable toe guard onto the front of the boot." },
//                   ].map(s => (
//                     <li key={s.n} className="flex gap-4">
//                       <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-xs font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg,#1651D1,#5b9bff)" }}>{s.n}</div>
//                       <div><p className="font-bold text-white text-sm mb-0.5">{s.t}</p><p className="text-sm text-white/50 leading-relaxed">{s.d}</p></div>
//                     </li>
//                   ))}
//                 </ol>
//               )}
//               {activeTab === "FAQ" && (
//                 <div className="flex flex-col gap-3">
//                   {[
//                     { q: "Can I wear the boot over socks?", a: "Yes. We recommend wearing a thin moisture-wicking sock underneath for comfort and hygiene." },
//                     { q: "How long should I wear it each day?", a: "Follow your clinician's guidance. Typically worn full-time during the acute recovery phase and gradually reduced as healing progresses." },
//                     { q: "Is the boot waterproof?", a: "The boot shell is water-resistant but not waterproof. Do not immerse in water or wear in the shower." },
//                     { q: "Can I drive while wearing the boot?", a: "We do not recommend driving while wearing the boot, especially if it is on the right foot. Consult your clinician." },
//                     { q: "How do I clean the boot?", a: "Wipe the shell with a damp cloth and mild soap. The liner is removable and can be hand-washed. Allow to air dry completely." },
//                   ].map((item, i) => <DarkFAQItem key={i} q={item.q} a={item.a} />)}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       {zoom && (
//         <div className="fixed inset-0 z-[99999] flex items-center justify-center" style={{ background: "rgba(0,0,0,0.92)" }} onClick={() => setZoom(false)}>
//           <img src={galleryImages[activeImg].src} alt="" className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl"
//             style={{ filter: "drop-shadow(0 0 60px rgba(91,155,255,0.4))" }} />
//           <button className="absolute top-6 right-6 text-white text-3xl font-bold">✕</button>
//         </div>
//       )}
//     </section>
//   );
// }

// function DarkFAQItem({ q, a }: { q: string; a: string }) {
//   const [open, setOpen] = useState(false);
//   const answerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const el = answerRef.current;
//     if (!el) return;
//     if (open) {
//       gsap.fromTo(el, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.38, ease: "power3.out" });
//     } else {
//       gsap.to(el, { height: 0, opacity: 0, duration: 0.28, ease: "power2.in" });
//     }
//   }, [open]);

//   return (
//     <div className="rounded-2xl overflow-hidden transition-all duration-300"
//       style={{
//         border: open ? "1px solid rgba(91,155,255,0.40)" : "1px solid rgba(91,155,255,0.10)",
//         boxShadow: open ? "0 0 32px rgba(22,81,209,0.25), 0 4px 20px rgba(0,0,0,0.3)" : "none",
//         transition: "box-shadow 0.3s ease, border 0.3s ease",
//       }}>
//       <button onClick={() => setOpen(!open)}
//         className="w-full flex items-center justify-between px-5 py-4 text-left group"
//         style={{
//           background: open
//             ? "linear-gradient(135deg, rgba(22,81,209,0.28) 0%, rgba(91,155,255,0.12) 100%)"
//             : "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(91,155,255,0.04) 100%)",
//           transition: "background 0.3s ease",
//         }}>
//         <span className="font-bold text-white text-sm group-hover:text-[#5b9bff] transition-colors duration-200">{q}</span>
//         <div className="flex-shrink-0 ml-4 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
//           style={{
//             background: open ? "linear-gradient(135deg,#1651D1,#5b9bff)" : "rgba(91,155,255,0.12)",
//             boxShadow: open ? "0 0 16px rgba(91,155,255,0.5)" : "none",
//             transform: open ? "rotate(45deg)" : "rotate(0deg)",
//           }}>
//           <span className="text-sm font-bold leading-none text-white">+</span>
//         </div>
//       </button>
//       <div ref={answerRef} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
//         <div className="px-5 py-4 text-sm text-white/55 leading-relaxed"
//           style={{
//             background: "linear-gradient(135deg, rgba(22,81,209,0.10) 0%, rgba(6,10,35,0.8) 100%)",
//             borderTop: "1px solid rgba(91,155,255,0.12)",
//           }}>
//           {a}
//         </div>
//       </div>
//     </div>
//   );
// }

function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderX, setSliderX] = useState(50);
  const dragging = useRef(false);

  const calcPercent = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return 50;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    return Math.min(Math.max(pct, 2), 98);
  };

  const onMouseDown = () => { dragging.current = true; };
  const onMouseMove = (e: React.MouseEvent) => { if (dragging.current) setSliderX(calcPercent(e.clientX)); };
  const onMouseUp = () => { dragging.current = false; };
  const onTouchMove = (e: React.TouchEvent) => { setSliderX(calcPercent(e.touches[0].clientX)); };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-3xl overflow-hidden select-none cursor-col-resize"
      style={{ height: 640, background: "#ffffff", boxShadow: "0 8px 48px rgba(17,17,132,0.22), 0 0 0 1px rgba(17,17,132,0.10)", border: "1px solid rgba(17,17,132,0.10)" }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
      onTouchEnd={() => { dragging.current = false; }}
    >
      <div className="absolute pointer-events-none" style={{ left: "-5%", top: "50%", transform: "translateY(-50%)", width: "55%", height: "80%", background: "radial-gradient(ellipse, rgba(17,17,132,0.13) 0%, transparent 70%)", filter: "blur(32px)", zIndex: 0 }} />
      <div className="absolute pointer-events-none" style={{ right: "-5%", top: "50%", transform: "translateY(-50%)", width: "55%", height: "80%", background: "radial-gradient(ellipse, rgba(17,17,132,0.10) 0%, transparent 70%)", filter: "blur(32px)", zIndex: 0 }} />
      <div className="absolute pointer-events-none" style={{ bottom: "0%", left: "50%", transform: "translateX(-50%)", width: "70%", height: "40%", background: "radial-gradient(ellipse, rgba(17,17,132,0.14) 0%, transparent 70%)", filter: "blur(24px)", zIndex: 0 }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={CLD.bootProduct}
        alt="Product"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        style={{ zIndex: 1, padding: "20px" }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={CLD.bootBlueprint}
        alt="Blueprint"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        style={{ clipPath: `inset(0 0 0 ${sliderX}%)`, zIndex: 2, filter: "brightness(0.88)", padding: "20px" }}
      />
      <div
        className="absolute top-0 bottom-0 z-10 pointer-events-none"
        style={{ left: `${sliderX}%`, width: 2, background: "linear-gradient(to bottom, transparent 0%, #111184 15%, #111184 85%, transparent 100%)", boxShadow: "0 0 12px rgba(17,17,132,0.5)" }}
      />
      <div
        className="absolute top-1/2 z-20 flex items-center justify-center"
        style={{ left: `${sliderX}%`, transform: "translate(-50%, -50%)", width: 46, height: 46, borderRadius: "50%", background: "white", boxShadow: "0 4px 24px rgba(17,17,132,0.40), 0 0 0 2px rgba(17,17,132,0.15)", cursor: "col-resize" }}
        onMouseDown={onMouseDown}
        onTouchStart={() => { dragging.current = true; }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 5L3 10L7 15" stroke="#111184" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 5L17 10L13 15" stroke="#111184" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="absolute bottom-5 left-5 z-10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
        style={{ background: "rgba(17,17,132,0.10)", color: "#111184", border: "1px solid rgba(17,17,132,0.20)" }}>
        Product
      </div>
      <div className="absolute bottom-5 right-5 z-10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
        style={{ background: "rgba(17,17,132,0.85)", color: "white" }}>
        Blueprint
      </div>
    </div>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      style={{
        position: "fixed", bottom: "32px", right: "32px", zIndex: 9999,
        width: "48px", height: "48px", borderRadius: "50%",
        background: "linear-gradient(135deg,#2C2895 0%,#4340c4 100%)",
        border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 24px rgba(44,40,149,0.35)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.12)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 32px rgba(44,40,149,0.55)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 24px rgba(44,40,149,0.35)";
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}

export default function XbootDetailPage() {
  const heroRef = useRef<HTMLElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState(1);
  const [activeBenefit, setActiveBenefit] = useState(0);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    gsap.fromTo(el.querySelectorAll(".hanim"),
      { opacity: 0, y: 44, filter: "blur(8px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "expo.out", stagger: 0.12, delay: 0.08 });
    gsap.to(heroImgRef.current, { y: -18, duration: 3.8, ease: "sine.inOut", yoyo: true, repeat: -1 });
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

      {/* HERO SECTION */}

      <section ref={heroRef} className="relative w-full flex items-center overflow-hidden" style={{ minHeight: "100vh", background: "#020916" }}>
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" style={{ zIndex: 0 }}>
          <source src={CLD.sectionhero} type="video/mp4" />
        </video>
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "linear-gradient(135deg,rgba(2,9,22,0.90) 0%,rgba(2,9,22,0.55) 55%,transparent 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, backgroundImage: "linear-gradient(rgba(17,17,132,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.04) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
        <div className="relative w-full container mx-auto px-5 md:px-[100px]" style={{ zIndex: 2, paddingTop: "max(140px,14vh)", paddingBottom: 100 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col gap-5">
              <div className="hanim" style={{ opacity: 0 }}>
                <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.38em] font-bold px-3.5 py-1.5 rounded-full border"
                  style={{ background: "rgba(22,81,209,0.12)", border: "1px solid rgba(22,81,209,0.3)" }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ opacity: 0, background: "linear-gradient(180deg, #1a6fd4 0%, #0d4fa8 35%, #1565c8 55%, #0a3d8a 80%, #1251b0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 16px rgba(22,81,209,0.4))", letterSpacing: "0.3em" }} />
                  <span style={{ background: "linear-gradient(180deg, #1a6fd4 0%, #0d4fa8 35%, #1565c8 55%, #0a3d8a 80%, #1251b0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.8))" }}>Pneumatic Walking Boot</span>
                </span>
              </div>
              <div className="hanim" style={{ opacity: 0 }}>
                <h1 className="font-nexa uppercase leading-[0.95] text-[#f0f4ff]" style={{ fontSize: "clamp(3rem,7vw,6rem)", fontWeight: 800, letterSpacing: "-3px" }}>
                  XO Boot<br />
                  <span style={{
                    backgroundImage: "linear-gradient(180deg, #f0f0f0 0%, #b8b8b8 20%, #e8e8e8 35%, #787878 50%, #d0d0d0 65%, #909090 80%, #c8c8c8 100%)",
                    WebkitBackgroundClip: "text" as string,
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 1px 0 rgba(255,255,255,0.9)) drop-shadow(0 -1px 0 rgba(0,0,0,0.6)) drop-shadow(1px 0 0 rgba(255,255,255,0.3)) drop-shadow(-1px 0 0 rgba(0,0,0,0.3)) drop-shadow(0 2px 6px rgba(0,0,0,0.8))"
                  }}>Pneumatic</span>
                </h1>
              </div>
              <p className="hanim text-xs font-semibold uppercase tracking-widest" style={{ opacity: 0, background: "linear-gradient(180deg, #1a6fd4 0%, #0d4fa8 35%, #1565c8 55%, #0a3d8a 80%, #1251b0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.9))", letterSpacing: "0.12em" }}>Better DME · Better Functionality · Better Outcomes</p>
              <p className="hanim text-base leading-relaxed text-white/55 border-l-[3px] border-[#7b7bff]/25 pl-3.5" style={{ opacity: 0 }}>
                Engineered for superior strength, performance and comfort — strategically crafted to deliver exceptional clinical outcomes. The XO Boot is designed with Biomechanical Engineers and feedback from Orthopedic, Urgent Care and Podiatry clients.
              </p>
              <div className="hanim flex items-center gap-4 flex-wrap" style={{ opacity: 0 }}>
                <a href="/contact" className="cursor-pointer group duration-300 transition-all w-fit rounded-full bg-[#1651D1]/30 hover:bg-[#1651D1]/50 backdrop-blur-2xl border border-white/30 p-1.5 relative overflow-hidden">
                  <div className="absolute top-0 left-[5%] group-hover:left-[80%] duration-300 transition-all h-full w-10 bg-[#1651D1]/50 rounded-[200%] blur" />
                  <div className="flex items-center bg-white rounded-full px-4 py-2 md:px-5 md:py-3 relative z-10">
                    <span className="text-base font-semibold">Contact for Pricing</span> <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </a>
                <a href="/products" className="text-sm font-semibold flex items-center gap-1.5 transition-all duration-300 group/ap"
                  style={{ background: "linear-gradient(180deg, #e8e8e8 0%, #a8a8a8 30%, #d0d0d0 50%, #787878 65%, #c0c0c0 80%, #8a8a8a 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.9)) opacity(0.7)" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "linear-gradient(180deg, #1a6fd4 0%, #0d4fa8 35%, #1565c8 55%, #0a3d8a 80%, #1251b0 100%)"; el.style.webkitBackgroundClip = "text"; el.style.webkitTextFillColor = "transparent"; el.style.backgroundClip = "text"; el.style.filter = "drop-shadow(0 1px 4px rgba(0,0,0,0.9))"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "linear-gradient(180deg, #e8e8e8 0%, #a8a8a8 30%, #d0d0d0 50%, #787878 65%, #c0c0c0 80%, #8a8a8a 100%)"; el.style.webkitBackgroundClip = "text"; el.style.webkitTextFillColor = "transparent"; el.style.backgroundClip = "text"; el.style.filter = "drop-shadow(0 1px 4px rgba(0,0,0,0.9)) opacity(0.7)"; }}>
                  All Products <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <div ref={heroImgRef} className="hanim relative flex items-center justify-center" style={{ opacity: 0, height: 580, paddingLeft: 80, paddingBottom: 80 }}>
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center 60%,rgba(17,17,132,0.35) 0%,transparent 65%)", filter: "blur(24px)" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CLD.XoBootHero} alt="XO Boot Pneumatic"
                style={{ position: "relative", zIndex: 1, maxHeight: "100%", maxWidth: "90%", objectFit: "contain", filter: "drop-shadow(0 32px 64px rgba(17,17,132,0.50)) drop-shadow(0 4px 16px rgba(0,0,0,0.40))" }} />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none" style={{ zIndex: 2, background: "linear-gradient(to bottom,transparent,#020916)" }} />
      </section>

      {/* BLUE PRINT SECTION  */}

      <section className="relative w-full py-20 md:py-28 overflow-hidden" style={{ background: "#f5f7ff" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 68% 52%, rgba(180,180,230,0.55) 0%, transparent 58%)" }} />
        <div className="container mx-auto px-5 md:px-[100px] relative z-10">
          <div className="sr text-center mb-12" style={{ opacity: 0 }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d1535] leading-tight">
              World Class <span className="text-[#111184]">Aerodynamic Shell</span>
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-[#6b7fa8] leading-relaxed">
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
                    style={{
                      background: on ? "linear-gradient(135deg,#0f0f7a,#1651D1)" : "#ffffff",
                      boxShadow: on ? "0 8px 28px rgba(17,17,132,0.28)" : "0 2px 12px rgba(0,0,0,0.06)",
                      minHeight: 72,
                    }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: on ? "rgba(255,255,255,0.18)" : "#e8eeff" }}>
                      <Check className={`w-5 h-5 ${on ? "text-white" : "text-[#111184]"}`} />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-bold leading-snug ${on ? "text-white" : "text-[#0d1535]"}`}>{f.label}</p>
                      {on && <p className="text-xs leading-relaxed text-white/80 mt-1.5">{f.desc}</p>}
                    </div>
                  </button>
                );
              })}
            </div>
            <BeforeAfterSlider />
          </div>
        </div>
      </section>

      {/* ══ Client Design — PowerStep Style (Client Request) ══ */}
      <PowerStepSection />

      {/* ══ Custom Design — Custom Dark Attractive ══ */}
      {/* <CustomSection /> */}

      {/* ══ SIZING CHART SECTION ══ */}
      <section className="relative w-full py-20 overflow-hidden bg-white" style={{ borderTop: "1px solid rgba(17,17,132,0.06)" }}>
        <div className="container mx-auto px-5 md:px-[100px]">
          <div className="sr text-center mb-12" style={{ opacity: 0 }}>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#111184]">Sizing Guide</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold text-[#0d1535] leading-tight">
              Find Your <span className="text-[#111184]">Perfect Fit</span>
            </h2>
            <p className="mt-4 max-w-lg mx-auto text-sm text-[#6b7fa8]">Available in Tall or Short style — Small, Medium, and Large for both men and women.</p>
          </div>
          <div className="sr grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto" style={{ opacity: 0 }}>
            {/* Men */}
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(17,17,132,0.10)", boxShadow: "0 4px 24px rgba(17,17,132,0.07)" }}>
              <div className="px-6 py-4" style={{ background: "linear-gradient(135deg,#0f0f7a,#1651D1)" }}>
                <p className="text-white font-bold text-sm uppercase tracking-widest">Men</p>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "#f4f6ff" }}>
                    <th className="px-6 py-3 text-left font-bold text-[#0d1535] text-xs uppercase tracking-widest">Size</th>
                    <th className="px-6 py-3 text-left font-bold text-[#0d1535] text-xs uppercase tracking-widest">Shoe Size</th>
                  </tr>
                </thead>
                <tbody>
                  {[["Small", "5 – 6.5"], ["Medium", "6.5 – 11"], ["Large", "11 – 15"]].map(([s, r], i) => (
                    <tr key={i} style={{ borderTop: "1px solid rgba(17,17,132,0.06)", background: i % 2 === 0 ? "#fff" : "#fafbff" }}>
                      <td className="px-6 py-4 font-semibold text-[#0d1535]">{s}</td>
                      <td className="px-6 py-4 text-[#6b7fa8]">{r}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Women */}
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(17,17,132,0.10)", boxShadow: "0 4px 24px rgba(17,17,132,0.07)" }}>
              <div className="px-6 py-4" style={{ background: "linear-gradient(135deg,#1651D1,#5b9bff)" }}>
                <p className="text-white font-bold text-sm uppercase tracking-widest">Women</p>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "#f4f6ff" }}>
                    <th className="px-6 py-3 text-left font-bold text-[#0d1535] text-xs uppercase tracking-widest">Size</th>
                    <th className="px-6 py-3 text-left font-bold text-[#0d1535] text-xs uppercase tracking-widest">Shoe Size</th>
                  </tr>
                </thead>
                <tbody>
                  {[["Small", "4 – 9.5"], ["Medium", "9.5 – 13"], ["Large", "13 – 16.5"]].map(([s, r], i) => (
                    <tr key={i} style={{ borderTop: "1px solid rgba(17,17,132,0.06)", background: i % 2 === 0 ? "#fff" : "#fafbff" }}>
                      <td className="px-6 py-4 font-semibold text-[#0d1535]">{s}</td>
                      <td className="px-6 py-4 text-[#6b7fa8]">{r}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="sr text-center mt-8 text-xs text-[#9ca3af]" style={{ opacity: 0 }}>
            The XO Boot Pneumatic is available exclusively through TLC DME LLC · (888) 521-8522 · tlcdme.com
          </p>
        </div>
      </section>

      {/* REVOLUTIONARY COMPRESSION SYSTEM SECTION */}

      <section className="relative w-full overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(108deg, #ffffff 46%, #f0f0f8 46%)" }} />
        <div className="container mx-auto px-5 md:px-[100px] relative z-10 py-20 md:py-28">
          <div className="sr grid grid-cols-1 md:grid-cols-2 gap-14 items-center" style={{ opacity: 0 }}>
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d1535] leading-tight">
                Revolutionary <span className="text-[#111184]">Compression System</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#4A5568] leading-relaxed">
                Provides optimal surface area contact allowing for customized compression. The liner seamless micro-fiber material is low-friction and wicking — T-Shirt soft — enhancing patient comfort and compliance. Low-force pneumatic bulb and original user-friendly valve allow for rapid inflation & deflation with far less effort. Unique air cell configuration delivers effective medial & lateral malleolar custom compression.
              </p>
              {/* Component image cards */}
              <div className="grid grid-cols-2 gap-4 mt-2">
                {[
                  { img: CLD.xoEzBulb, label: "EZ Adjust Bulb & Valve", desc: "Larger soft bulb fills air cells faster & easier. Intuitive, easy read inflate-deflate valve." },
                  { img: CLD.xoLiner, label: "Liner Compression System", desc: "Micro-fiber soft lining; less sweat retention. Unique air pressure cells for effective medial & lateral malleolar custom compression." },
                ].map((c, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden flex flex-col"
                    style={{ border: "1px solid rgba(17,17,132,0.09)", boxShadow: "0 2px 12px rgba(17,17,132,0.06)" }}>
                    <div className="flex items-center justify-center bg-[#f4f6ff]" style={{ height: 140, overflow: "hidden" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.img} alt={c.label} className="w-full h-full object-contain" />
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-bold text-[#111184] uppercase tracking-widest mb-1">{c.label}</p>
                      <p className="text-xs text-[#6b7fa8] leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex items-center justify-center" style={{ minHeight: 400 }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
                style={{ width: "80%", height: "28%", background: "radial-gradient(ellipse, rgba(17,17,132,0.22) 0%, transparent 70%)", filter: "blur(22px)" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CLD.xoRevolutionary} alt="Both boots side view"
                style={{ maxHeight: 600, maxWidth: "110%", objectFit: "contain", position: "relative", zIndex: 1, filter: "drop-shadow(0 18px 48px rgba(17,17,132,0.24)) drop-shadow(0 4px 18px rgba(0,0,0,0.15))" }} />
            </div>
          </div>
        </div>
      </section>

      {/* UNIQUE SCRAPPING SYSTEM & GRIPS  */}

      <section className="relative w-full overflow-hidden min-h-[560px] flex items-stretch">
        <div className="absolute inset-0 z-0 bg-white" />
        <div className="absolute inset-0 z-0 bg-[#eeeef6]"
          style={{ clipPath: "polygon(0 0, 38.5% 0, 54.1% 100%, 0 100%)" }} />

        <div className="container mx-auto px-5 md:px-[100px] relative z-10 py-20 md:py-28 w-full">
          <div className="sr grid grid-cols-1 md:grid-cols-2 gap-14 items-center" style={{ opacity: 0 }}>
            <div className="relative flex items-center justify-center" style={{ minHeight: 420 }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
                style={{ width: "80%", height: "30%", background: "radial-gradient(ellipse, rgba(17,17,132,0.18) 0%, transparent 70%)", filter: "blur(20px)", zIndex: 0 }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CLD.bootProduct} alt="Boot both sides"
                style={{ height: 420, maxWidth: "100%", objectFit: "contain", position: "relative", zIndex: 1, filter: "drop-shadow(0 20px 48px rgba(17,17,132,0.25)) drop-shadow(0 4px 18px rgba(0,0,0,0.15))" }} />
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d1535] leading-tight">
                Unique Strapping<br />
                <span className="text-[#111184]">System & Grips</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#4A5568] leading-relaxed">
                Tall style designed with only 4 straps for less irritation and enhanced comfort. D-rings swivel a full 360° for greater adjustability and a customized fit. Strap tips are constructed of HQ easy grip rubber — less "stick", easier to open, and better control when applying or re-fitting at home. The intuitive inflate/deflate valve system simplifies adjustments for both patients and clinicians.
              </p>
              {/* Component image cards */}
              <div className="grid grid-cols-2 gap-4 mt-2">
                {[
                  { img: CLD.xoStraps, label: "4 Strap System", desc: "Less straps (4) for easier application and more comfort. Unique full swivel D-rings, less irritation." },
                  { img: CLD.xoGripTips, label: "Easy Grip Tip", desc: "Unique rubber grip tips allow easy adjust for application and for patient re-fitting at home." },
                ].map((c, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden flex flex-col"
                    style={{ border: "1px solid rgba(17,17,132,0.09)", boxShadow: "0 2px 12px rgba(17,17,132,0.06)" }}>
                    <div className="flex items-center justify-center bg-[#f4f6ff]" style={{ height: 140, overflow: "hidden" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.img} alt={c.label} className="w-full h-full object-contain" />
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-bold text-[#111184] uppercase tracking-widest mb-1">{c.label}</p>
                      <p className="text-xs text-[#6b7fa8] leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REAL ROCKER SOLE SECTION  */}

      <section className="relative w-full overflow-hidden min-h-[480px] flex items-stretch">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-white"
            style={{ clipPath: "polygon(0 0, 54% 0, 42% 100%, 0 100%)" }} />
          <div className="absolute inset-0 bg-[#f0f0f8]"
            style={{ clipPath: "polygon(54% 0, 100% 0, 100% 100%, 42% 100%)" }} />
        </div>

        <div className="container mx-auto px-5 md:px-[100px] relative z-10 py-20 md:py-28 w-full">
          <div className="sr grid grid-cols-1 md:grid-cols-2 gap-14 items-center" style={{ opacity: 0 }}>
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d1535] leading-tight">
                <span className="text-[#111184]">Real Rocker Sole</span> & Natural Gait Support
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#4A5568] leading-relaxed">
                The most fluid rocker action ever built to support gait pattern from heel strike to toe off, for more natural ambulation. Sole tread design provides greater traction and less slippage. The insole foam rubber composite gives a softer plantar surface and is removable for easy washing. HQ rubber sole resists clogging from debris — built to perform in every environment.
              </p>
              {/* Component image cards */}
              <div className="grid grid-cols-2 gap-4 mt-2">
                {[
                  { img: CLD.xoRocker, label: "Rocker Sole", desc: "Better absorbs heel shock & allows fluid gait. HQ rubber sole for traction; resists clogging from debris." },
                  { img: CLD.xoInsole, label: "Inner Sole", desc: "Insole foam rubber composite for softer plantar surface; removable for easy washing." },
                ].map((c, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden flex flex-col"
                    style={{ border: "1px solid rgba(17,17,132,0.09)", boxShadow: "0 2px 12px rgba(17,17,132,0.06)" }}>
                    <div className="flex items-center justify-center bg-[#f0f0f8]" style={{ height: 140, overflow: "hidden" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.img} alt={c.label} className="w-full h-full object-contain" />
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-bold text-[#111184] uppercase tracking-widest mb-1">{c.label}</p>
                      <p className="text-xs text-[#6b7fa8] leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex items-center justify-center" style={{ minHeight: 360 }}>
              <div className="absolute pointer-events-none"
                style={{ bottom: "5%", left: "50%", transform: "translateX(-50%)", width: "70%", height: "40%", background: "radial-gradient(ellipse, rgba(17,17,132,0.22) 0%, transparent 70%)", filter: "blur(22px)", zIndex: 0 }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CLD.xbootBottom} alt="Rocker bottom sole"
                style={{ maxHeight: 380, maxWidth: "85%", objectFit: "contain", position: "relative", zIndex: 1, filter: "drop-shadow(0 20px 48px rgba(17,17,132,0.28)) drop-shadow(0 4px 16px rgba(0,0,0,0.12))" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ AFO UNDERSLEEVE SECTION ══ */}

      <section className="relative w-full py-16 overflow-hidden" style={{ background: "#020916" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(17,17,132,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.05) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="container mx-auto px-5 md:px-[100px] relative z-10">
          <div className="sr" style={{ opacity: 0 }}>
            <div className="rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10"
              style={{ background: "linear-gradient(135deg,rgba(22,81,209,0.18) 0%,rgba(6,10,35,0.9) 100%)", border: "1px solid rgba(91,155,255,0.18)" }}>
              {/* Icon */}
              <div className="flex-shrink-0 w-28 h-28 rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 0 40px rgba(91,155,255,0.3)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={CLD.sleeves} alt="AFO Undersleeve" className="w-full h-full object-cover" />
              </div>
              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#5b9bff]">Included With Every Boot</span>
                <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white leading-tight">AFO Undersleeve <span className="text-[#5b9bff]">— 2 Included</span></h2>
                <p className="mt-3 text-white/60 text-base leading-relaxed max-w-2xl">
                  Two AFO undersleeves are included with each boot. Increases patient comfort by eliminating hot spots due to friction and wicks away perspiration — helping keep skin clean and reducing odor. Proprietary micro-fiber material provides a cool, comfortable feel with light even compression, enhancing overall wearability.
                </p>
              </div>
              {/* 2 feature pills */}
              <div className="flex-shrink-0 flex flex-col gap-3">
                {[
                  { t: "Eliminates Hot Spots", d: "Friction-free fit" },
                  { t: "Wicking Material", d: "Keeps skin dry & clean" },
                  { t: "2 Per Boot", d: "Always included" },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{ background: "rgba(91,155,255,0.10)", border: "1px solid rgba(91,155,255,0.18)" }}>
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#5b9bff" }} />
                    <div>
                      <p className="text-white text-xs font-bold">{f.t}</p>
                      <p className="text-white/45 text-[10px]">{f.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BETTER DME SECTION  */}

      <section className="relative w-full py-20 md:py-28 overflow-hidden" style={{ background: "linear-gradient(160deg,#eeeeff 0%,#e6e6fa 45%,#f5f7ff 100%)" }}>
        <div className="container mx-auto px-5 md:px-[100px]">
          <div className="sr text-center mb-14" style={{ opacity: 0 }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d1535] leading-tight">
              Better DME. <span className="text-[#111184]">Better Outcomes.</span>
            </h2>
          </div>
          <div className="sr grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ opacity: 0 }}>
            {benefits.map((b, i) => {
              const on = activeBenefit === i;
              return (
                <div key={i} onClick={() => setActiveBenefit(i)}
                  className="rounded-2xl p-6 flex flex-col gap-3 cursor-pointer transition-all duration-300"
                  style={{ background: on ? "linear-gradient(145deg,#0f0f7a,#111184)" : "#ffffff", boxShadow: on ? "0 12px 36px rgba(17,17,132,0.26)" : "0 2px 14px rgba(0,0,0,0.06)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: on ? "rgba(255,255,255,0.16)" : "#e8eeff", color: on ? "#fff" : "#111184" }}>
                    {b.icon}
                  </div>
                  <p className={`text-sm font-bold leading-snug ${on ? "text-white" : "text-[#0d1535]"}`}>{b.title}</p>
                  <p className={`text-xs leading-relaxed ${on ? "text-white/74" : "text-[#6b7fa8]"}`}>{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FITTING YOUR XO BOOT SECTION  */}

      <section className="relative w-full py-20 md:py-28 overflow-hidden bg-white">
        <div className="container mx-auto px-5 md:px-[100px]">
          <div className="sr grid grid-cols-1 md:grid-cols-2 gap-14 items-center" style={{ opacity: 0 }}>
            <div className="relative flex items-center justify-center" style={{ minHeight: 400 }}>
              <div className="absolute pointer-events-none"
                style={{ bottom: "8%", left: "50%", transform: "translateX(-50%)", width: "55%", height: "35%", background: "radial-gradient(ellipse, rgba(17,17,132,0.20) 0%, transparent 70%)", filter: "blur(20px)" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CLD.xbootLowRocker} alt="How it works"
                style={{ position: "relative", zIndex: 1, maxHeight: 400, objectFit: "contain", filter: "drop-shadow(0 8px 28px rgba(0,0,0,0.12))" }} />
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d1535] leading-tight">
                Fitting Your <span className="text-[#111184]">XO Boot</span>
              </h2>
              <div className="flex flex-col gap-3 mt-1">
                {steps.map((s) => (
                  <div key={s.num} className="flex gap-4 p-5 rounded-2xl"
                    style={{ background: "#f8faff", border: "1px solid rgba(17,17,132,0.07)", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-sm font-bold"
                      style={{ background: "linear-gradient(135deg,#0f0f7a,#111184)", boxShadow: "0 4px 14px rgba(17,17,132,0.28)" }}>
                      {s.num}.
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0d1535] mb-1">{s.title}</p>
                      <p className="text-sm text-[#6b7fa8] leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ══ CUSTOMER REVIEWS ══ */}
      <section className="relative w-full py-20 md:py-28 overflow-hidden" style={{ background: "linear-gradient(160deg,#eeeeff 0%,#e6e6fa 45%,#f5f7ff 100%)" }}>
        <div className="container mx-auto px-5 md:px-[100px]">
          <div className="sr text-center mb-14" style={{ opacity: 0 }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d1535] leading-tight">
              What Our <span className="text-[#111184]">Customers</span> Say
            </h2>
          </div>
          <div className="sr grid grid-cols-1 md:grid-cols-3 gap-5" style={{ opacity: 0 }}>
            {reviews.map((r, i) => (
              <div key={i} className="rounded-2xl p-6 flex flex-col gap-4 bg-white transition-all duration-300"
                style={{ boxShadow: "0 4px 18px rgba(0,0,0,0.06)" }}
                onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = "translateY(-4px)"; d.style.boxShadow = "0 14px 40px rgba(17,17,132,0.11)"; }}
                onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = ""; d.style.boxShadow = "0 4px 18px rgba(0,0,0,0.06)"; }}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ background: "linear-gradient(135deg,#0f0f7a,#111184)" }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0d1535]">{r.name}, <span className="font-normal text-[#6b7fa8]">{r.location}</span></p>
                    <p className="text-xs text-[#9ca3af]">{r.days}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className={`w-4 h-4 ${s < r.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
                  ))}
                </div>
                <p className="text-sm text-[#4A5568] leading-relaxed">{r.text}</p>
                <button className="text-sm font-bold text-[#111184] text-left">Read more</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION  */}

      <section className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(150deg,#f0f0ff 0%,#e8e8ff 50%,#f5f8ff 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center,rgba(17,17,132,0.07) 0%,transparent 65%)" }} />
        <div className="relative z-10 max-w-xl mx-auto px-6 flex flex-col items-center text-center gap-6">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "rgba(17,17,132,0.45)" }} />
          <h2 className="font-nexa uppercase leading-tight" style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 800, color: "#0d1535", letterSpacing: "-0.5px" }}>
            Provide Your Patients <span style={{ color: "#111184" }}>With The Best.</span>
          </h2>
          <p className="text-[#3a4a6b] text-base leading-relaxed">The XO Boot Pneumatic is available exclusively through TLC DME LLC. Contact our team for pricing, availability, and distribution inquiries.</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a href="/contact" className="cursor-pointer group duration-300 transition-all w-fit rounded-full bg-[#1651D1]/30 hover:bg-[#1651D1]/50 backdrop-blur-2xl border border-white/30 p-1.5 relative overflow-hidden">
              <div className="absolute top-0 left-[5%] group-hover:left-[80%] duration-300 transition-all h-full w-10 bg-[#1651D1]/50 rounded-[200%] blur" />
              <div className="flex items-center bg-white rounded-full px-4 py-2 md:px-5 md:py-3 relative z-10">
                <span className="text-base font-semibold">Speak With Specialist</span> <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </a>
            <a href="/" className="text-sm font-semibold uppercase tracking-widest" style={{ color: "rgba(17,17,132,0.38)", transition: "color 0.25s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#111184"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(17,17,132,0.38)"; }}>
              Back to Home
            </a>
          </div>
        </div>
      </section>

      <BackToTop />
      <Footer />
    </>
  );
}