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
  { label: "Removable Anterior Plate", desc: "Engineered exoskeleton shell with removable anterior plate for anterior access and enhanced protection during all phases of recovery." },
  { label: "Calf Adjustment Device", desc: "Innovative calf adjustment system accommodates patients up to size 15, providing a secure and customized fit for larger patients." },
  { label: "Removable Toe Protector", desc: "Optional removable toe guard provides additional forefoot protection — ideal for acute injuries or post-surgical recovery." },
  { label: "Flex Polymer Strut Design", desc: "Flexible polymer struts allow gentle medial and lateral flexion while maintaining critical structural support throughout recovery." },
];

const benefits = [
  { icon: <ShieldCheck className="w-5 h-5" />, title: "Maximum Stability", desc: "A rigid outer shell and reinforced structure stabilize the ankle and lower leg, reducing unwanted movement and promoting proper alignment during recovery." },
  { icon: <Gauge className="w-5 h-5" />, title: "Adjustable Air Compression", desc: "Built-in pneumatic air chambers allow customized pressure through an easy-to-use pump, helping reduce swelling while ensuring a secure, personalized fit." },
  { icon: <Footprints className="w-5 h-5" />, title: "Natural Walking Motion", desc: "The rocker-bottom sole encourages a smooth heel-to-toe gait, minimizing strain on the knee, hip, and lower back." },
  { icon: <Wind className="w-5 h-5" />, title: "Lightweight & Breathable", desc: "Open-frame design improves airflow and keeps the boot lightweight without compromising strength or durability." },
];

const steps = [
  { num: "01", title: "Secure the Boot", desc: "Adjustable straps wrap comfortably around the foot, ankle, and calf for even support." },
  { num: "02", title: "Inflate for Comfort", desc: "Use the pneumatic pump to inflate internal air bladders until the desired compression is achieved." },
  { num: "03", title: "Walk with Confidence", desc: "The shock-absorbing rocker sole supports controlled movement while protecting the injured area." },
];

const reviews = [
  { name: "Mark T.", location: "California", days: "2 days ago", rating: 5, text: "I was worried about wearing a boot all day, but this one surprised me. The air pump made a huge difference, and it stayed comfortable even after hours of walking." },
  { name: "Sarah L.", location: "Texas", days: "4 days ago", rating: 5, text: "My foot swelling changed daily, and this boot adjusted easily every time. No pressure points, no pain—just solid support." },
  { name: "Emily K.", location: "Florida", days: "1 days ago", rating: 4, text: "It looks bulky, but it's actually very lightweight. I felt stable walking, and the rocker sole really helped my stride." },
];

const galleryImages = [
  { src: CLD.xbootBothSide, label: "Both Sides" },
  { src: CLD.xbootToeGuard, label: "Toe Guard" },
  { src: CLD.xbootBottom, label: "Bottom View" },
  { src: CLD.xbootLowRocker, label: "Rocker Sole" },
  { src: CLD.bootProduct, label: "Product View" },
  { src: CLD.bootBlueprint, label: "Blueprint" },
];

const tabContent: Record<string, React.ReactNode> = {
  Description: (
    <p className="text-[#3a4a6b] text-base leading-relaxed">
      The X-Ortho Orthopedic Xboot is an advanced walking boot engineered for superior ankle and lower leg support during recovery. Featuring a pneumatic air compression system, removable anterior plate, and rocker-bottom sole, this boot provides clinical-grade stabilization while maintaining patient comfort and mobility throughout all phases of recovery.
    </p>
  ),
  Benefits: (
    <ul className="flex flex-col gap-3">
      {[
        "Pneumatic air chambers provide customized, adjustable compression to reduce swelling",
        "Removable anterior plate allows clinical access while maintaining structural integrity",
        "Rocker-bottom sole promotes natural heel-to-toe gait pattern",
        "Flex polymer struts allow controlled medial/lateral motion",
        "Removable toe protector for post-surgical or acute injury protection",
        "Calf adjustment accommodates patients up to size 15",
        "Lightweight open-frame construction improves airflow and reduces fatigue",
      ].map((b, i) => (
        <li key={i} className="flex items-start gap-3 text-[#3a4a6b] text-sm">
          <span className="mt-1 w-2 h-2 rounded-full bg-[#111184] flex-shrink-0" />
          {b}
        </li>
      ))}
    </ul>
  ),
  Specifications: (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {[
        ["Product Code", "XB-627 / XB-642"],
        ["Sizes Available", "XS, S, M, L, XL, XXL"],
        ["Calf Circumference", "Up to Size 15"],
        ["Material", "Flex Polymer / Medical Grade"],
        ["Air Compression", "Pneumatic Pump System"],
        ["Sole Type", "Rocker-Bottom"],
        ["Toe Guard", "Removable"],
        ["Weight", "Lightweight Open Frame"],
      ].map(([key, val]) => (
        <div key={key} className="flex flex-col gap-0.5 p-3 rounded-xl" style={{ background: "#f4f6ff", border: "1px solid rgba(17,17,132,0.07)" }}>
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#111184]/50">{key}</span>
          <span className="text-sm font-semibold text-[#0d1535]">{val}</span>
        </div>
      ))}
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
        { q: "Can I wear the boot over socks?", a: "Yes. We recommend wearing a thin moisture-wicking sock underneath for comfort and hygiene." },
        { q: "How long should I wear it each day?", a: "Follow your clinician's guidance. Typically worn full-time during the acute recovery phase and gradually reduced as healing progresses." },
        { q: "Is the boot waterproof?", a: "The boot shell is water-resistant but not waterproof. Do not immerse in water or wear in the shower." },
        { q: "Can I drive while wearing the boot?", a: "We do not recommend driving while wearing the boot, especially if it is on the right foot. Consult your clinician." },
        { q: "How do I clean the boot?", a: "Wipe the shell with a damp cloth and mild soap. The liner is removable and can be hand-washed. Allow to air dry completely." },
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

{/* CLIENT DESIGN SECTION  */ }

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
        {/* <p className="ps-breadcrumb text-sm text-[#9ca3af] mb-8" style={{ opacity: 0 }}>
          <a href="/" className="hover:text-[#111184]">Home</a> /&nbsp;
          <a href="/products" className="hover:text-[#111184]">Products</a> /&nbsp;
          <span className="text-[#111184]">Orthopedic Xboot</span>
        </p> */}
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
              <span className="text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full" style={{ background: "rgba(17,17,132,0.08)", color: "#111184" }}>Orthopedic Boot</span>
              <h1 className="mt-3 text-3xl md:text-4xl font-bold text-[#0d1535] leading-tight">Orthopedic Xboot</h1>
              <p className="text-[#111184] font-semibold mt-1">Advanced Recovery Boot</p>
            </div>
            <ul className="ps-info-item flex flex-col gap-2 mt-1" style={{ opacity: 0 }}>
              {[
                "Pneumatic air compression for customized fit",
                "Removable anterior plate for clinical access",
                "Rocker-bottom sole for natural gait",
                "Accommodates patients up to size 15",
                "Lightweight open-frame construction",
              ].map((b, i) => (
                <li key={i} className="ps-li flex items-center gap-2.5 text-sm text-[#3a4a6b]">
                  <Check className="w-4 h-4 text-[#111184] flex-shrink-0" /> {b}
                </li>
              ))}
            </ul>
            <div className="ps-info-item h-px w-full" style={{ background: "rgba(17,17,132,0.07)", opacity: 0 }} />
            <div className="ps-info-item rounded-2xl p-5 text-sm" style={{ opacity: 0, background: "linear-gradient(135deg,rgba(17,17,132,0.06) 0%,rgba(91,155,255,0.06) 100%)", border: "1px solid rgba(17,17,132,0.12)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)" }}>
              <p className="font-bold text-[#111184] mb-1">For Clinical & Professional Use</p>
              <p className="text-[#6b7fa8] leading-relaxed">This product is distributed through authorized medical distributors and clinicians. Contact our team for pricing, availability, and bulk orders.</p>
            </div>
            <a href="/contact" className="ps-info-item cursor-pointer group duration-300 transition-all w-fit rounded-full bg-[#111184]/30 hover:bg-[#111184]/50 backdrop-blur-2xl border border-white/30 p-1.5 relative overflow-hidden" style={{ opacity: 0 }}>
              <div className="absolute top-0 left-[5%] group-hover:left-[80%] duration-300 transition-all h-full w-10 bg-[#111184]/50 rounded-[200%] blur" />
              <div className="flex items-center bg-white rounded-full px-5 py-3 relative z-10">
                <span className="text-base font-semibold">Request Information</span>
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
        <div className="fixed inset-0 z-[99999] flex items-center justify-center" style={{ background: "rgba(0,0,0,0.85)" }} onClick={() => setZoom(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={galleryImages[activeImg].src} alt="" className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl" />
          <button className="absolute top-6 right-6 text-white text-3xl font-bold" onClick={() => setZoom(false)}>✕</button>
        </div>
      )}
    </section>
  );
}

{/* CUSTOM DESIGN SECTION  */ }

function CustomSection() {
  const [activeTab, setActiveTab] = useState("Description");
  const [activeImg, setActiveImg] = useState(0);
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
    }, 3500);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [isPlaying, TOTAL]);

  const manualSelect = (i: number) => {
    setActiveImg(i);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 6000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cs-header > *", { opacity: 0, y: 32, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.15, ease: "expo.out", scrollTrigger: { trigger: ".cs-header", start: "top 82%", once: true } });
      gsap.fromTo(".cs-mainimg", { opacity: 0, scale: 0.93 }, { opacity: 1, scale: 1, duration: 1.0, ease: "expo.out", scrollTrigger: { trigger: ".cs-mainimg", start: "top 80%", once: true } });
      gsap.fromTo(".cs-thumb", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power3.out", scrollTrigger: { trigger: ".cs-thumb", start: "top 85%", once: true } });
      gsap.fromTo(".cs-tabsection", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: ".cs-tabsection", start: "top 88%", once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-24 overflow-hidden relative" style={{ background: "linear-gradient(160deg, #020916 0%, #060d2e 50%, #020916 100%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(17,17,132,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.05) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

      <div className="container mx-auto px-5 md:px-[80px] relative z-10">
        <div className="cs-header text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold" style={{ color: "#5b9bff" }}>Product Gallery</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-white leading-tight">
            Every Angle.{" "}
            <span
              key={activeImg}
              style={{
                color: "#5b9bff",
                display: "inline-block",
                animation: "fadeSlideUp 0.4s ease forwards",
              }}>
              {galleryImages[activeImg].label}
            </span>
          </h2>
          <style>{`
            @keyframes fadeSlideUp {
              from { opacity: 0; transform: translateY(10px); }
              to   { opacity: 1; transform: translateY(0);    }
            }
          `}</style>
        </div>
        <div className="mb-16">
          <div className="cs-mainimg relative w-full rounded-3xl overflow-hidden mb-4 cursor-zoom-in"
            style={{ opacity: 0, height: 500, background: "linear-gradient(145deg,rgba(6,10,35,0.96),rgba(12,22,65,0.92))", border: "1px solid rgba(91,155,255,0.15)", boxShadow: "0 0 80px rgba(22,81,209,0.15)" }}
            onClick={() => setZoom(true)}>
            {(["tl", "tr", "bl", "br"] as const).map(c => (
              <div key={c} style={{
                position: "absolute", width: 24, height: 24,
                top: c.startsWith("t") ? 16 : "auto", bottom: c.startsWith("b") ? 16 : "auto",
                left: c.endsWith("l") ? 16 : "auto", right: c.endsWith("r") ? 16 : "auto",
                borderTop: c.startsWith("t") ? "2px solid rgba(91,155,255,0.5)" : "none",
                borderBottom: c.startsWith("b") ? "2px solid rgba(91,155,255,0.5)" : "none",
                borderLeft: c.endsWith("l") ? "2px solid rgba(91,155,255,0.5)" : "none",
                borderRight: c.endsWith("r") ? "2px solid rgba(91,155,255,0.5)" : "none",
              }} />
            ))}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={galleryImages[activeImg].src} alt={galleryImages[activeImg].label}
              className="w-full h-full object-contain p-10 transition-all duration-500"
              style={{ filter: "drop-shadow(0 20px 60px rgba(22,81,209,0.4))" }} />
            <button onClick={e => { e.stopPropagation(); manualSelect((activeImg - 1 + TOTAL) % TOTAL); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.70)", backdropFilter: "blur(8px)", boxShadow: "0 0 18px rgba(0,0,0,0.4)" }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(255,255,255,0.30)"; b.style.boxShadow = "0 0 24px rgba(91,155,255,0.6)"; }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(255,255,255,0.15)"; b.style.boxShadow = "0 0 18px rgba(0,0,0,0.4)"; }}>
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <button onClick={e => { e.stopPropagation(); manualSelect((activeImg + 1) % TOTAL); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.70)", backdropFilter: "blur(8px)", boxShadow: "0 0 18px rgba(0,0,0,0.4)" }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(255,255,255,0.30)"; b.style.boxShadow = "0 0 24px rgba(91,155,255,0.6)"; }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "rgba(255,255,255,0.15)"; b.style.boxShadow = "0 0 18px rgba(0,0,0,0.4)"; }}>
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-3 z-20"
              style={{ background: "linear-gradient(to top, rgba(2,9,22,0.85) 0%, transparent 100%)" }}
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-2">
                {galleryImages.map((_, i) => (
                  <button key={i} onClick={() => manualSelect(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: activeImg === i ? 28 : 8,
                      height: 8,
                      background: activeImg === i ? "linear-gradient(90deg,#fff,#a0c4ff)" : "rgba(255,255,255,0.35)",
                      boxShadow: activeImg === i ? "0 0 10px rgba(255,255,255,0.5)" : "none",
                    }} />
                ))}
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-white/70">
                {galleryImages[activeImg].label}
              </span>
              <button onClick={() => setIsPlaying(p => !p)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "2px solid rgba(255,255,255,0.60)",
                  color: "#fff",
                  backdropFilter: "blur(8px)",
                }}>
                {isPlaying ? <><span style={{ fontSize: 10 }}>⏸</span> Pause</> : <><span style={{ fontSize: 10 }}>▶</span> Play</>}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-3">
            {galleryImages.map((img, i) => (
              <button key={i} onClick={() => manualSelect(i)}
                className="cs-thumb relative rounded-2xl overflow-hidden transition-all duration-200"
                style={{
                  opacity: 0,
                  height: 80,
                  background: "rgba(6,10,35,0.8)",
                  border: activeImg === i ? "2px solid #5b9bff" : "1px solid rgba(91,155,255,0.12)",
                  boxShadow: activeImg === i ? "0 0 20px rgba(91,155,255,0.35)" : "none",
                }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.label} className="w-full h-full object-contain p-2"
                  style={{ filter: activeImg === i ? "brightness(1.1)" : "brightness(0.6)", transition: "filter 0.2s" }} />
              </button>
            ))}
          </div>
        </div>
        <div className="cs-tabsection" style={{ opacity: 0 }}>
          <div className="flex gap-1 flex-wrap mb-0">
            {tabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-200"
                style={{
                  background: activeTab === tab ? "linear-gradient(135deg,#1651D1,#5b9bff)" : "rgba(255,255,255,0.05)",
                  color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.45)",
                  borderRadius: "8px 8px 0 0",
                  borderTop: activeTab === tab ? "none" : "1px solid rgba(91,155,255,0.1)",
                  borderLeft: activeTab === tab ? "none" : "1px solid rgba(91,155,255,0.1)",
                  borderRight: activeTab === tab ? "none" : "1px solid rgba(91,155,255,0.1)",
                  borderBottom: "none",
                }}>
                {tab}
              </button>
            ))}
          </div>
          <div className="p-8 rounded-b-2xl rounded-tr-2xl"
            style={{ background: "rgba(6,10,35,0.9)", border: "1px solid rgba(91,155,255,0.12)", backdropFilter: "blur(20px)", minHeight: 200 }}>
            <div className="text-white/80">
              {activeTab === "Description" && (
                <p className="text-white/70 text-base leading-relaxed">
                  The X-Ortho Orthopedic Xboot is an advanced walking boot engineered for superior ankle and lower leg support during recovery. Featuring a pneumatic air compression system, removable anterior plate, and rocker-bottom sole, this boot provides clinical-grade stabilization while maintaining patient comfort and mobility throughout all phases of recovery.
                </p>
              )}
              {activeTab === "Benefits" && (
                <ul className="flex flex-col gap-3">
                  {[
                    "Pneumatic air chambers provide customized, adjustable compression to reduce swelling",
                    "Removable anterior plate allows clinical access while maintaining structural integrity",
                    "Rocker-bottom sole promotes natural heel-to-toe gait pattern",
                    "Flex polymer struts allow controlled medial/lateral motion",
                    "Removable toe protector for post-surgical or acute injury protection",
                    "Calf adjustment accommodates patients up to size 15",
                    "Lightweight open-frame construction improves airflow and reduces fatigue",
                  ].map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#5b9bff] flex-shrink-0" />{b}
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === "Specifications" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    ["Product Code", "XB-627 / XB-642"], ["Sizes Available", "XS, S, M, L, XL, XXL"],
                    ["Calf Circumference", "Up to Size 15"], ["Material", "Flex Polymer / Medical Grade"],
                    ["Air Compression", "Pneumatic Pump System"], ["Sole Type", "Rocker-Bottom"],
                    ["Toe Guard", "Removable"], ["Weight", "Lightweight Open Frame"],
                  ].map(([key, val]) => (
                    <div key={key} className="p-3 rounded-xl" style={{ background: "rgba(22,81,209,0.08)", border: "1px solid rgba(91,155,255,0.12)" }}>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-[#5b9bff]/60 block">{key}</span>
                      <span className="text-sm font-semibold text-white mt-0.5 block">{val}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "Wear Instructions" && (
                <ol className="flex flex-col gap-4">
                  {[
                    { n: "01", t: "Loosen All Straps", d: "Before putting on the boot, fully loosen all straps and deflate the air bladders by pressing the release valve." },
                    { n: "02", t: "Insert Foot", d: "Slide your foot into the boot with your heel firmly seated at the back. Ensure your ankle is centered within the boot shell." },
                    { n: "03", t: "Secure Lower Straps First", d: "Fasten straps from the bottom up — foot strap first, then ankle, then calf — for even, progressive support." },
                    { n: "04", t: "Inflate for Compression", d: "Use the pneumatic pump to inflate the air bladders to your desired comfort level. Pump until snug but not painful." },
                    { n: "05", t: "Attach Toe Guard (if needed)", d: "For post-surgical use or additional protection, clip the removable toe guard onto the front of the boot." },
                  ].map(s => (
                    <li key={s.n} className="flex gap-4">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-xs font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg,#1651D1,#5b9bff)" }}>{s.n}</div>
                      <div><p className="font-bold text-white text-sm mb-0.5">{s.t}</p><p className="text-sm text-white/50 leading-relaxed">{s.d}</p></div>
                    </li>
                  ))}
                </ol>
              )}
              {activeTab === "FAQ" && (
                <div className="flex flex-col gap-3">
                  {[
                    { q: "Can I wear the boot over socks?", a: "Yes. We recommend wearing a thin moisture-wicking sock underneath for comfort and hygiene." },
                    { q: "How long should I wear it each day?", a: "Follow your clinician's guidance. Typically worn full-time during the acute recovery phase and gradually reduced as healing progresses." },
                    { q: "Is the boot waterproof?", a: "The boot shell is water-resistant but not waterproof. Do not immerse in water or wear in the shower." },
                    { q: "Can I drive while wearing the boot?", a: "We do not recommend driving while wearing the boot, especially if it is on the right foot. Consult your clinician." },
                    { q: "How do I clean the boot?", a: "Wipe the shell with a damp cloth and mild soap. The liner is removable and can be hand-washed. Allow to air dry completely." },
                  ].map((item, i) => <DarkFAQItem key={i} q={item.q} a={item.a} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {zoom && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center" style={{ background: "rgba(0,0,0,0.92)" }} onClick={() => setZoom(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={galleryImages[activeImg].src} alt="" className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl"
            style={{ filter: "drop-shadow(0 0 60px rgba(91,155,255,0.4))" }} />
          <button className="absolute top-6 right-6 text-white text-3xl font-bold">✕</button>
        </div>
      )}
    </section>
  );
}

function DarkFAQItem({ q, a }: { q: string; a: string }) {
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
        border: open ? "1px solid rgba(91,155,255,0.40)" : "1px solid rgba(91,155,255,0.10)",
        boxShadow: open ? "0 0 32px rgba(22,81,209,0.25), 0 4px 20px rgba(0,0,0,0.3)" : "none",
        transition: "box-shadow 0.3s ease, border 0.3s ease",
      }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left group"
        style={{
          background: open
            ? "linear-gradient(135deg, rgba(22,81,209,0.28) 0%, rgba(91,155,255,0.12) 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(91,155,255,0.04) 100%)",
          transition: "background 0.3s ease",
        }}>
        <span className="font-bold text-white text-sm group-hover:text-[#5b9bff] transition-colors duration-200">{q}</span>
        <div className="flex-shrink-0 ml-4 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: open ? "linear-gradient(135deg,#1651D1,#5b9bff)" : "rgba(91,155,255,0.12)",
            boxShadow: open ? "0 0 16px rgba(91,155,255,0.5)" : "none",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}>
          <span className="text-sm font-bold leading-none text-white">+</span>
        </div>
      </button>
      <div ref={answerRef} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
        <div className="px-5 py-4 text-sm text-white/55 leading-relaxed"
          style={{
            background: "linear-gradient(135deg, rgba(22,81,209,0.10) 0%, rgba(6,10,35,0.8) 100%)",
            borderTop: "1px solid rgba(91,155,255,0.12)",
          }}>
          {a}
        </div>
      </div>
    </div>
  );
}

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

      {/* HERO SECTION  */}

      <section ref={heroRef} className="relative w-full flex items-center overflow-hidden" style={{ minHeight: "100vh", background: "#020916" }}>
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" style={{ zIndex: 0 }}>
          <source src={CLD.sectionhero} type="video/mp4" />
        </video>
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "linear-gradient(135deg,rgba(2,9,22,0.90) 0%,rgba(2,9,22,0.55) 55%,transparent 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, backgroundImage: "linear-gradient(rgba(17,17,132,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.04) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
        <a href="/products" className="hanim absolute flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-white/30 hover:text-white/70 transition-colors"
          style={{ zIndex: 100001, opacity: 0, top: "max(140px,13vh)", left: "clamp(20px,7vw,100px)" }}>
          <ArrowLeft className="w-3.5 h-3.5" /> All Products
        </a>
        <div className="relative w-full container mx-auto px-5 md:px-[100px]" style={{ zIndex: 2, paddingTop: "max(140px,14vh)", paddingBottom: 80 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col gap-5">
              <div className="hanim" style={{ opacity: 0 }}>
                <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.38em] font-bold px-3.5 py-1.5 rounded-full bg-[#7b7bff]/10 text-[#7b7bff] border border-[#7b7bff]/20">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#7b7bff]" />
                  Orthopedic Boot
                </span>
              </div>
              <div className="hanim" style={{ opacity: 0 }}>
                <h1 className="font-nexa uppercase leading-[0.95] text-[#f0f4ff]" style={{ fontSize: "clamp(3rem,7vw,6rem)", fontWeight: 800, letterSpacing: "-3px" }}>
                  Orthopedic<br /><span className="text-[#7b7bff]">Xboot</span>
                </h1>
              </div>
              <p className="hanim text-xs font-semibold uppercase tracking-widest text-[#7b7bff]" style={{ opacity: 0 }}>Advanced Recovery Boot</p>
              <p className="hanim text-base leading-relaxed text-white/55 border-l-[3px] border-[#7b7bff]/25 pl-3.5" style={{ opacity: 0 }}>
                Recover safely and comfortably with a medical-grade pneumatic walking boot designed to stabilize the foot and ankle while allowing natural, supported movement during healing.
              </p>
              <div className="hanim flex items-center gap-4 flex-wrap" style={{ opacity: 0 }}>
                <a href="#contact" className="cursor-pointer group duration-300 transition-all w-fit rounded-full bg-[#1651D1]/30 hover:bg-[#1651D1]/50 backdrop-blur-2xl border border-white/30 p-1.5 relative overflow-hidden">
                  <div className="absolute top-0 left-[5%] group-hover:left-[80%] duration-300 transition-all h-full w-10 bg-[#1651D1]/50 rounded-[200%] blur" />
                  <div className="flex items-center bg-white rounded-full px-4 py-2 md:px-5 md:py-3 relative z-10">
                    <span className="text-base font-semibold">Request Info</span> <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </a>
                <a href="/products" className="text-sm font-semibold text-[#7b7bff]/45 hover:text-[#7b7bff] transition-colors flex items-center gap-1.5">
                  All Products <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <div ref={heroImgRef} className="hanim relative flex items-center justify-center" style={{ opacity: 0, height: 580, paddingLeft: 50, paddingBottom: 50 }}>
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center 60%,rgba(17,17,132,0.35) 0%,transparent 65%)", filter: "blur(24px)" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CLD.shoe} alt="Orthopedic Xboot"
                style={{ position: "relative", zIndex: 1, maxHeight: "100%", maxWidth: "90%", objectFit: "contain", filter: "drop-shadow(0 32px 64px rgba(17,17,132,0.50)) drop-shadow(0 4px 16px rgba(0,0,0,0.40))" }} />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none" style={{ zIndex: 2, background: "linear-gradient(to bottom,transparent,#020916)" }} />
      </section>

      {/* PRODUCT OVERVIEW SECTION  */}

      <section className="relative w-full py-20 md:py-28 overflow-hidden" style={{ background: "#f5f7ff" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 68% 52%, rgba(180,180,230,0.55) 0%, transparent 58%)" }} />
        <div className="container mx-auto px-5 md:px-[100px] relative z-10">
          <div className="sr text-center mb-12" style={{ opacity: 0 }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d1535] leading-tight">
              Pneumatic <span className="text-[#111184]">Walking Boot</span>
            </h2>
            <p className="mt-4 max-w-lg mx-auto text-sm sm:text-base text-[#6b7fa8] leading-relaxed">
              Recover safely and comfortably with a medical-grade pneumatic walking boot designed to stabilize the foot and ankle while allowing natural, supported movement during healing.
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
                      background: on ? "linear-gradient(135deg,#0f0f7a,#111184)" : "#ffffff",
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

      {/* CLIENT DESIGN — PowerStep Style */}
      <PowerStepSection />

      {/* CUSTOM DESIGN — Custom Dark Attractive */}
      <CustomSection />
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

      {/* ADVANCED ENGINEERING & ADAPTIVE FIT DESIGN SECTION  */}

      <section className="relative w-full overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(108deg, #ffffff 46%, #f0f0f8 46%)" }} />
        <div className="container mx-auto px-5 md:px-[100px] relative z-10 py-20 md:py-28">
          <div className="sr grid grid-cols-1 md:grid-cols-2 gap-14 items-center" style={{ opacity: 0 }}>
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d1535] leading-tight">
                Advanced Engineering &<br /><span className="text-[#111184]">Adaptive Fit Design</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#4A5568] leading-relaxed">
                This is a completely new design, engineered by TLC in collaboration with biomechanical engineers, orthopedic specialists, DPMs, and refined through UC feedback. The device is PDAC approved under L4361 and is available in both Tall and Short options. It now comes in three sizes (reduced from five) while accommodating patients up to size 15, compared to the previous size 13 limit. The exoskeleton design features a removable anterior plate and a removable toe cover for enhanced protection, along with a flexible strut system made from softer materials that allow gentle medial and lateral flexion. An adjustable calf system ensures a more comfortable and secure fit for larger patients.
              </p>
            </div>
            <div className="relative flex items-center justify-center" style={{ minHeight: 400 }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
                style={{ width: "80%", height: "28%", background: "radial-gradient(ellipse, rgba(17,17,132,0.22) 0%, transparent 70%)", filter: "blur(22px)" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CLD.xbootBothSide} alt="Both boots side view"
                style={{ maxHeight: 600, maxWidth: "110%", objectFit: "contain", position: "relative", zIndex: 1, filter: "drop-shadow(0 18px 48px rgba(17,17,132,0.24)) drop-shadow(0 4px 18px rgba(0,0,0,0.15))" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ENHANCED STABILITY, STRAPPING & COMPRESSION CONTROL SECTION  */}

      <section className="relative w-full overflow-hidden min-h-[560px] flex items-stretch">
        <div className="absolute inset-0 z-0 bg-white" />
        <div className="absolute inset-0 z-0 bg-[#eeeef6]"
          style={{ clipPath: "polygon(0 0, 36.3% 0, 54.1% 100%, 0 100%)" }} />

        <div className="container mx-auto px-5 md:px-[100px] relative z-10 py-20 md:py-28 w-full">
          <div className="sr grid grid-cols-1 md:grid-cols-2 gap-14 items-center" style={{ opacity: 0 }}>
            <div className="relative flex items-center justify-center" style={{ minHeight: 420 }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
                style={{ width: "80%", height: "30%", background: "radial-gradient(ellipse, rgba(17,17,132,0.18) 0%, transparent 70%)", filter: "blur(20px)", zIndex: 0 }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CLD.xbootToeGuard} alt="Boot both sides"
                style={{ height: 420, maxWidth: "100%", objectFit: "contain", position: "relative", zIndex: 1, filter: "drop-shadow(0 20px 48px rgba(17,17,132,0.25)) drop-shadow(0 4px 18px rgba(0,0,0,0.15))", paddingRight: "150px" }} />
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d1535] leading-tight">
                Enhanced Stability,<br />
                Strapping &<br />
                Compression Control
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#4A5568] leading-relaxed">
                The Tall version now utilizes four straps instead of five, improving ease of use without compromising stability. Each strap features a high-quality rubber edge that does not stick, making it easier to open and adjust. The D-rings swivel a full 360 degrees, providing smoother strap movement compared to previous designs. A newly engineered bladder system uses compartmentalized air chambers to prevent air migration while increasing surface area contact, allowing for more controlled and consistent compression from acute injury through post-rehabilitation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SUPERIOR COMFORT, EASE OF USE & NATURAL GAIT SUPPORT SECTION  */}

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
                <span className="text-[#111184]">Superior Comfort,</span> Ease Of Use &amp; Natural Gait Support
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#4A5568] leading-relaxed">
                Compression is further enhanced by a softer, more responsive pump bulb that fills the bladders faster and with less effort. The intuitive inflate/deflate valve system simplifies adjustments for both patients and clinicians. Inside, the softgoods are redesigned with a fabric that feels like a favorite t-shirt rather than closed-cell foam, extending contoured coverage around the foundation to eliminate friction points. A newly optimized rocker bottom creates the most fluid motion ever built, supporting a natural gait pattern from heel strike through toe-off.
              </p>
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

      {/* BENEFITS SECTION  */}

      <section className="relative w-full py-20 md:py-28 overflow-hidden" style={{ background: "linear-gradient(160deg,#eeeeff 0%,#e6e6fa 45%,#f5f7ff 100%)" }}>
        <div className="container mx-auto px-5 md:px-[100px]">
          <div className="sr text-center mb-14" style={{ opacity: 0 }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d1535] leading-tight">
              Quality Care, Delivered <span className="text-[#111184]">Efficiently</span>
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

      {/* HOW IT WORKS SECTION  */}

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
                How It <span className="text-[#111184]">Works</span>
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

      {/* CTA SECTION  */}

      <section className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(150deg,#f0f0ff 0%,#e8e8ff 50%,#f5f8ff 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center,rgba(17,17,132,0.07) 0%,transparent 65%)" }} />
        <div className="relative z-10 max-w-xl mx-auto px-6 flex flex-col items-center text-center gap-6">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "rgba(17,17,132,0.45)" }} />
          <h2 className="font-nexa uppercase leading-tight" style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 800, color: "#0d1535", letterSpacing: "-0.5px" }}>
            Ready to start your <span style={{ color: "#111184" }}>recovery journey?</span>
          </h2>
          <p className="text-[#3a4a6b] text-base leading-relaxed">Connect with our team to find the right orthopedic solution for your needs.</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a href="#contact" className="cursor-pointer group duration-300 transition-all w-fit rounded-full bg-[#1651D1]/30 hover:bg-[#1651D1]/50 backdrop-blur-2xl border border-white/30 p-1.5 relative overflow-hidden">
              <div className="absolute top-0 left-[5%] group-hover:left-[80%] duration-300 transition-all h-full w-10 bg-[#1651D1]/50 rounded-[200%] blur" />
              <div className="flex items-center bg-white rounded-full px-4 py-2 md:px-5 md:py-3 relative z-10">
                <span className="text-base font-semibold">Contact Us</span> <ArrowRight className="ml-2 w-4 h-4" />
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