"use client";
import { CLD } from "@/lib/cloudinary";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Star, ShieldCheck, Gauge, Wind, Layers, ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/navbar";
import StickyButtons from "@/components/sticky-buttons";
import Footer from "@/components/footer";

gsap.registerPlugin(ScrollTrigger);

// ── Feature cards (Blueprint/Design section) ──
const features = [
  { label: "Advanced Dynamic Hinge", desc: "A Dual-Axis hinge moves on two independent planes promoting better stability and allowing for a more effective range of motion and natural movement of the knee. Easily removed when preferred." },
  { label: "Open Patella & Open Back", desc: "Open patella & back design alleviates friction and irritation. Breathable high-grade perforated Neoprene provides a cool, dry, comfortable fit designed for all-day wear." },
  { label: "Removable Cryo Gel Pad", desc: "Designed to seamlessly attach or be easily removed. The versatile gel pad can be cooled for effective cryotherapy or heated for soothing heat therapy — customizable comfort." },
  { label: "Wrap-Around Strapping System", desc: "Overlapping strapping system with medical grade hook and loop closures provides easily sized, customized support. Adjustable hook pads allow for easy placement and less wear on support material." },
];

// ── Better DME benefit cards ──
const benefits = [
  { icon: <ShieldCheck className="w-5 h-5" />, title: "Dual-Axis Hinge", desc: "More accurately mirrors the natural movement of the knee. Adjustable flexion and extension stops — easily removed for comfort during advanced stages of recovery." },
  { icon: <Gauge className="w-5 h-5" />, title: "Cryo Gel Pad", desc: "Removable Cryo Gel Pad allows for convenient and effective cold therapy for swelling and pain. Seamlessly attaches or removes for targeted pain relief." },
  { icon: <Wind className="w-5 h-5" />, title: "Breathable Neoprene", desc: "High grade perforated Neoprene with open patella and open back design. Cool, dry comfortable fit — less friction, less irritation, all-day wearability." },
  { icon: <Layers className="w-5 h-5" />, title: "KO Undersleeve", desc: "Proprietary microfiber material creates lite even compression, eliminates hot spots, wicks perspiration. Included with each XO Knee Support — enhances overall wearability." },
];

// ── Fitting steps ──
const steps = [
  { num: "01", title: "Slide on Undersleeve", desc: "Put on the KO Undersleeve first for a comfortable barrier between skin and the support. The microfiber material wicks perspiration and eliminates hot spots." },
  { num: "02", title: "Position the Support", desc: "Wrap the knee support around the knee with the open patella centered over the kneecap. Ensure the hinge aligns with the natural joint line." },
  { num: "03", title: "Secure the Straps", desc: "Apply straps from bottom up using the wrap-around system. Adjust hook pads for a customized fit — snug but not restrictive." },
  { num: "04", title: "Attach Gel Pad (if needed)", desc: "For cold or heat therapy, attach the Cryo Gel Pad to the designated area. Cool for cryotherapy or heat for soothing relief." },
];

// ── Reviews ──
const reviews = [
  { name: "James R.", location: "Ohio", days: "3 days ago", rating: 5, text: "The dual-axis hinge is a game changer. It feels natural when I walk and the gel pad really helps with swelling after activity." },
  { name: "Patricia M.", location: "Arizona", days: "5 days ago", rating: 5, text: "Wore it all day under my pants. Nobody could tell I had a brace on — very low profile. The strapping system made sizing easy." },
  { name: "Robert K.", location: "Georgia", days: "2 days ago", rating: 4, text: "The open back design is more comfortable than any brace I've tried before. Less heat build-up and the cryo pad speeds recovery." },
];

// ── Gallery images ──
const galleryImages = [
  { src: CLD.kneeFront, label: "Knee Front" },
  { src: CLD.kneeHinge1, label: "Hinge Detail" },
  { src: CLD.kneeProduct2, label: "Side View" },
  { src: CLD.kneeOpen, label: "Open View" },
  { src: CLD.kneeHinge2, label: "Hinge Close-up" },
  { src: CLD.kneeStrap1, label: "Strap Detail" },
];

// ── Tab content ──
const tabContent: Record<string, React.ReactNode> = {
  Description: (
    <div className="flex flex-col gap-4">
      <p className="text-[#3a4a6b] text-base leading-relaxed italic border-l-4 border-[#111184]/20 pl-4">
        "Better DME. Better Outcomes." — The X-Ortho standard for every product we craft.
      </p>
      <p className="text-[#3a4a6b] text-base leading-relaxed">
        The XO Knee Support ROM Cryo is designed and crafted by TLC DME with Biomechanical Engineers and feedback from Orthopedic, Urgent Care and Podiatry clients. Built to deliver exceptional clinical outcomes with advanced comfort and compliance features.
      </p>
      <ul className="flex flex-col gap-2 mt-1">
        {[
          "Dual-Axis hinge more accurately mirrors natural knee movement",
          "Open patella & open back design for less friction and all-day comfort",
          "Removable Cryo Gel Pad for targeted cold or heat therapy",
          "KO Undersleeve included — microfiber, wicking, eliminates hot spots",
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
        "Dual-Axis hinge moves on two independent planes for better stability and range of motion",
        "Open patella & open back design alleviates friction and irritation for all-day wear",
        "Side stabilizers and patella buttress maintain proper knee alignment during recovery",
        "Removable Gel Pad for convenient cold therapy (cryotherapy) or heat therapy",
        "Wrap-around strapping with medical grade hook & loop — no migrating, customized fit",
        "Adjustable hook pads for easy sizing — less wear on support material",
        "KO Undersleeve included — proprietary microfiber, lite compression, wicks perspiration",
        "High grade perforated Neoprene — breathable, cool, dry, comfortable",
        "PDAC approved — billable with HCPCS code L1832 & L1833",
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
          ["Product Name", "XO Knee Support ROM Cryo"],
          ["Sizes", "Two Sizes Only"],
          ["Size Range 1", "SM – 2XL"],
          ["Size Range 2", "3XL – 7XL"],
          ["HCPCS Codes", "L1832 & L1833"],
          ["Approval", "PDAC Approved"],
          ["Hinge Type", "Dual-Axis Removable"],
          ["Gel Pad", "Removable Cryo Gel Pad"],
          ["Patella", "Open Patella w/ Buttress"],
          ["Back Design", "Open Back Configuration"],
          ["Closure", "Medical Grade Hook & Loop"],
          ["Undersleeve", "KO Undersleeve Included"],
          ["Material", "High Grade Perforated Neoprene"],
          ["Strapping", "Wrap-Around Adjustable System"],
        ].map(([key, val]) => (
          <div key={key} className="flex flex-col gap-0.5 p-3 rounded-xl" style={{ background: "#f4f6ff", border: "1px solid rgba(17,17,132,0.07)" }}>
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#111184]/50">{key}</span>
            <span className="text-sm font-semibold text-[#0d1535]">{val}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-[#6b7fa8] italic">The XO Knee Support ROM Cryo is available exclusively through TLC DME LLC. Call (888) 521-8522 or visit tlcdme.com</p>
    </div>
  ),
  "Wear Instructions": (
    <ol className="flex flex-col gap-4">
      {[
        { n: "01", t: "Put on the KO Undersleeve", d: "Slide the included KO Undersleeve onto the leg first. It creates a comfortable barrier, wicks perspiration, and eliminates hot spots between skin and the support." },
        { n: "02", t: "Position the Support", d: "Wrap the support around the knee with the open patella window centered over the kneecap. Align the Dual-Axis hinge with the natural knee joint line on both sides." },
        { n: "03", t: "Fasten Straps", d: "Secure the wrap-around straps starting from the bottom. Use the adjustable hook pads to customize the fit — the medical grade hook and loop closures will not migrate." },
        { n: "04", t: "Attach Cryo Gel Pad (optional)", d: "Snap the Removable Cryo Gel Pad into position for cold or heat therapy. Cool the pad before use for cryotherapy, or warm it for soothing heat therapy." },
        { n: "05", t: "Adjust Hinge (if needed)", d: "Set the adjustable flexion and extension stops on the Dual-Axis hinge to your prescribed range of motion. The hinge can be fully removed when preferred for comfort." },
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
        { q: "What sizes does the XO Knee Support come in?", a: "Two sizes only: SM–2XL and 3XL–7XL. This covers the full range of patients for a comfortable, customizable fit." },
        { q: "What HCPCS codes does this brace qualify for?", a: "The XO Knee Support ROM Cryo is PDAC approved and can be billed with HCPCS codes L1832 and L1833." },
        { q: "Can the hinge be removed?", a: "Yes. The Dual-Axis hinge is easily removed when preferred, allowing the support to provide comfortable effective support during treatment and advanced stages of recovery." },
        { q: "How does the Cryo Gel Pad work?", a: "The removable gel pad can be cooled for cryotherapy to reduce swelling and pain, or heated for soothing heat therapy. It seamlessly attaches and removes from the support." },
        { q: "Is the KO Undersleeve included?", a: "Yes. Every XO Knee Support comes with a KO Undersleeve. The proprietary microfiber material creates lite even compression, eliminates hot spots, and wicks away perspiration." },
        { q: "Where can I get the XO Knee Support ROM Cryo?", a: "The XO Knee Support ROM Cryo is available exclusively through TLC DME LLC. Contact us at (888) 521-8522 or visit tlcdme.com." },
      ].map((item, i) => (
        <FAQItem key={i} q={item.q} a={item.a} />
      ))}
    </div>
  ),
};


// ── Before/After Slider ──
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
    <div ref={containerRef}
      className="relative w-full rounded-3xl overflow-hidden select-none cursor-col-resize"
      style={{ height: 520, background: "#ffffff", boxShadow: "0 8px 48px rgba(17,17,132,0.22), 0 0 0 1px rgba(17,17,132,0.10)", border: "1px solid rgba(17,17,132,0.10)" }}
      onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove} onTouchEnd={() => { dragging.current = false; }}>
      <div className="absolute pointer-events-none" style={{ left: "-5%", top: "50%", transform: "translateY(-50%)", width: "55%", height: "80%", background: "radial-gradient(ellipse, rgba(17,17,132,0.13) 0%, transparent 70%)", filter: "blur(32px)", zIndex: 0 }} />
      <div className="absolute pointer-events-none" style={{ right: "-5%", top: "50%", transform: "translateY(-50%)", width: "55%", height: "80%", background: "radial-gradient(ellipse, rgba(17,17,132,0.10) 0%, transparent 70%)", filter: "blur(32px)", zIndex: 0 }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={CLD.kneeProduct2} alt="Product" className="absolute inset-0 w-full h-full object-contain pointer-events-none" style={{ zIndex: 1, padding: "20px" }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={CLD.kneeBlueprint} alt="Blueprint" className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        style={{ clipPath: `inset(0 0 0 ${sliderX}%)`, zIndex: 2, filter: "brightness(0.88)", padding: "20px" }} />
      <div className="absolute top-0 bottom-0 z-10 pointer-events-none"
        style={{ left: `${sliderX}%`, width: 2, background: "linear-gradient(to bottom, transparent 0%, #111184 15%, #111184 85%, transparent 100%)", boxShadow: "0 0 12px rgba(17,17,132,0.5)" }} />
      <div className="absolute top-1/2 z-20 flex items-center justify-center"
        style={{ left: `${sliderX}%`, transform: "translate(-50%, -50%)", width: 46, height: 46, borderRadius: "50%", background: "white", boxShadow: "0 4px 24px rgba(17,17,132,0.40), 0 0 0 2px rgba(17,17,132,0.15)", cursor: "col-resize" }}
        onMouseDown={onMouseDown} onTouchStart={() => { dragging.current = true; }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 5L3 10L7 15" stroke="#111184" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 5L17 10L13 15" stroke="#111184" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="absolute bottom-5 left-5 z-10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
        style={{ background: "rgba(17,17,132,0.10)", color: "#111184", border: "1px solid rgba(17,17,132,0.20)" }}>Product</div>
      <div className="absolute bottom-5 right-5 z-10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
        style={{ background: "rgba(17,17,132,0.85)", color: "white" }}>Blueprint</div>
    </div>
  );
}

// ── FAQ Item ──
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
    <div className="rounded-2xl overflow-hidden"
      style={{
        border: open ? "1px solid rgba(17,17,132,0.22)" : "1px solid rgba(17,17,132,0.08)",
        boxShadow: open ? "0 8px 32px rgba(17,17,132,0.10)" : "0 1px 4px rgba(17,17,132,0.04)",
        transition: "box-shadow 0.3s ease, border 0.3s ease",
      }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left group"
        style={{
          background: open ? "linear-gradient(135deg, #eef0ff 0%, #e6e8ff 100%)" : "linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%)",
          transition: "background 0.3s ease",
        }}>
        <span className="font-bold text-[#0d1535] text-sm group-hover:text-[#111184] transition-colors duration-200">{q}</span>
        <div className="flex-shrink-0 ml-4 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
          style={{ background: open ? "#111184" : "rgba(17,17,132,0.08)", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}>
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

// ── PowerStep / Product Info Section ──
function ProductInfoSection() {
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState("Description");
  const [zoom, setZoom] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tabs = ["Description", "Benefits", "Specifications", "Wear Instructions", "FAQ"];
  const TOTAL = galleryImages.length;

  useEffect(() => {
    if (!isPlaying || zoom) { if (autoRef.current) { clearInterval(autoRef.current); autoRef.current = null; } return; }
    autoRef.current = setInterval(() => {
      setActiveImg(prev => (prev + 1) % TOTAL);
    }, 3000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [isPlaying, zoom, TOTAL]);

  const manualSelect = (i: number) => {
    setActiveImg(i);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 6000);
  };

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
    <section ref={sectionRef} className="w-full bg-white py-20" style={{ borderTop: "1px solid rgba(17,17,132,0.07)" }}>
      <div className="container mx-auto px-5 md:px-[80px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Gallery */}
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
              onClick={() => { setZoom(true); setIsPlaying(false); }}>
              {galleryImages.map((img, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={img.src} alt={img.label}
                  className="absolute inset-0 w-full h-full object-contain p-6"
                  style={{ opacity: activeImg === i ? 1 : 0, transform: activeImg === i ? "scale(1)" : "scale(0.96)", transition: "opacity 0.4s ease, transform 0.4s ease", minHeight: 420 }} />
              ))}
              <div className="absolute top-3 right-3 bg-white/80 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#111184] z-10">Click to zoom</div>
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
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-between px-4 z-20" onClick={e => e.stopPropagation()}>
                <div className="flex items-center gap-2">
                  {galleryImages.map((_, i) => (
                    <button key={i} onClick={() => manualSelect(i)} className="rounded-full transition-all duration-300"
                      style={{ width: activeImg === i ? 24 : 8, height: 8, background: activeImg === i ? "linear-gradient(90deg,#0f0f7a,#1651D1)" : "rgba(17,17,132,0.18)", boxShadow: activeImg === i ? "0 0 8px rgba(17,17,132,0.35)" : "none" }} />
                  ))}
                </div>
                <button onClick={() => setIsPlaying(p => !p)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest"
                  style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)", border: "1px solid rgba(17,17,132,0.15)", color: "#111184" }}>
                  {isPlaying ? <><span style={{ fontSize: 10 }}>⏸</span> Pause</> : <><span style={{ fontSize: 10 }}>▶</span> Play</>}
                </button>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="ps-info flex flex-col gap-5">
            <div className="ps-info-item" style={{ opacity: 0 }}>
              <span className="text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full inline-block"
                style={{ background: "rgba(17,17,132,0.08)", color: "#111184" }}>
                <span style={{ backgroundImage: "linear-gradient(135deg,#0f0f7a,#1651D1)", WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Knee Support ROM Cryo
                </span>
              </span>
              <h1 className="mt-3 text-3xl md:text-4xl font-bold leading-tight"
                style={{ backgroundImage: "linear-gradient(135deg,#0f0f7a,#1651D1)", WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                XO Knee Support ROM Cryo
              </h1>
              <p className="font-semibold mt-1"
                style={{ backgroundImage: "linear-gradient(135deg,#0f0f7a,#1651D1)", WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Better DME. Better Functionality. Better Outcomes.
              </p>
            </div>
            <ul className="ps-info-item flex flex-col gap-2 mt-1" style={{ opacity: 0 }}>
              {[
                "Dual-Axis hinge mirrors natural knee movement",
                "Open patella & open back design — less friction, all-day comfort",
                "Removable Cryo Gel Pad for cold or heat therapy",
                "Wrap-around strapping with medical grade hook & loop",
                "Side stabilizers & patella buttress for proper alignment",
                "KO Undersleeve included — microfiber, wicking",
                "PDAC approved — HCPCS L1832 & L1833",
              ].map((b, i) => (
                <li key={i} className="ps-li flex items-center gap-2.5 text-sm text-[#3a4a6b]">
                  <Check className="w-4 h-4 text-[#111184] flex-shrink-0" /> {b}
                </li>
              ))}
            </ul>

            {/* Sizing */}
            <div className="ps-info-item" style={{ opacity: 0 }}>
              <p className="text-[10px] uppercase tracking-widest font-bold text-[#111184]/50 mb-2">Sizing — Two Sizes Only</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Size 1", val: "SM – 2XL" },
                  { label: "Size 2", val: "3XL – 7XL" },
                  { label: "HCPCS Code", val: "L1832" },
                  { label: "HCPCS Code", val: "L1833" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between px-3 py-2 rounded-xl"
                    style={{ background: "rgba(17,17,132,0.04)", border: "1px solid rgba(17,17,132,0.08)" }}>
                    <span className="text-[10px] font-semibold text-[#0d1535]">{s.label}</span>
                    <span className="text-[10px] font-bold text-[#111184]">{s.val}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] mt-2 text-[#6b7fa8]">Approved by PDAC to be billed with HCPCS code L1832 &amp; L1833</p>
            </div>

            <div className="ps-info-item h-px w-full" style={{ background: "rgba(17,17,132,0.07)", opacity: 0 }} />
            <div className="ps-info-item rounded-2xl p-5 text-sm" style={{ opacity: 0, background: "linear-gradient(135deg,rgba(17,17,132,0.06) 0%,rgba(91,155,255,0.06) 100%)", border: "1px solid rgba(17,17,132,0.12)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)" }}>
              <p className="font-bold text-[#111184] mb-1">Available Exclusively Through TLC DME LLC</p>
              <p className="text-[#6b7fa8] leading-relaxed">The XO Knee Support ROM Cryo is distributed exclusively through TLC DME LLC — DME Specialists, DME Solutions. Contact us for pricing, availability, and bulk orders: <span className="font-semibold text-[#111184]">(888) 521-8522</span> · tlcdme.com</p>
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

        {/* Tabs */}
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

      {/* Zoom Modal */}
      {zoom && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center"
          style={{ background: "rgba(2,9,22,0.85)", backdropFilter: "blur(16px)" }}
          onClick={() => { setZoom(false); setIsPlaying(false); }}>
          <div className="relative rounded-3xl overflow-hidden flex items-center justify-center"
            style={{ width: "min(90vw,800px)", height: "70vh", background: "linear-gradient(145deg,rgba(6,10,35,0.96) 0%,rgba(12,22,65,0.92) 100%)", border: "1px solid rgba(91,155,255,0.2)", boxShadow: "0 0 80px rgba(22,81,209,0.3)" }}
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
              style={{ maxWidth: "85%", maxHeight: "85%", objectFit: "contain", filter: "drop-shadow(0 0 40px rgba(22,81,209,0.35))" }} />
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

// ── BackToTop ──
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
      style={{ position: "fixed", bottom: "32px", right: "32px", zIndex: 9999, width: "48px", height: "48px", borderRadius: "50%", background: "linear-gradient(135deg,#2C2895 0%,#4340c4 100%)", border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 24px rgba(44,40,149,0.35)", transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.12)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 32px rgba(44,40,149,0.55)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 24px rgba(44,40,149,0.35)"; }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
    </button>
  );
}

// ── Main Page ──
export default function KneeDetailPage() {
  const heroRef = useRef<HTMLElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);
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

      {/* ══ HERO ══ */}
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
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#1565c8" }} />
                  <span style={{ background: "linear-gradient(180deg, #1a6fd4 0%, #0d4fa8 35%, #1565c8 55%, #0a3d8a 80%, #1251b0 100%)", WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    Knee Support ROM Cryo
                  </span>
                </span>
              </div>
              <div className="hanim" style={{ opacity: 0 }}>
                <h1 className="font-nexa uppercase leading-[0.95] text-[#f0f4ff]" style={{ fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: 800, letterSpacing: "-2px" }}>
                  XO Knee<br />
                  <span style={{
                    backgroundImage: "linear-gradient(180deg, #f0f0f0 0%, #b8b8b8 20%, #e8e8e8 35%, #787878 50%, #d0d0d0 65%, #909090 80%, #c8c8c8 100%)",
                    WebkitBackgroundClip: "text" as string,
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 1px 0 rgba(255,255,255,0.9)) drop-shadow(0 -1px 0 rgba(0,0,0,0.6)) drop-shadow(1px 0 0 rgba(255,255,255,0.3)) drop-shadow(-1px 0 0 rgba(0,0,0,0.3)) drop-shadow(0 2px 6px rgba(0,0,0,0.8))"
                  }}>
                    Support
                  </span>
                </h1>
              </div>
              <p className="hanim text-xs font-semibold uppercase tracking-widest" style={{ opacity: 0, background: "linear-gradient(180deg, #1a6fd4 0%, #0d4fa8 35%, #1565c8 55%, #0a3d8a 80%, #1251b0 100%)", WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Better DME · Better Functionality · Better Outcomes
              </p>
              <p className="hanim text-base leading-relaxed text-white/55 border-l-[3px] border-[#7b7bff]/25 pl-3.5" style={{ opacity: 0 }}>
                Designed and crafted by TLC DME with Biomechanical Engineers and feedback from Orthopedic, Urgent Care and Podiatry clients. PDAC approved — billable with HCPCS codes L1832 & L1833.
              </p>
              <div className="hanim flex items-center gap-4 flex-wrap" style={{ opacity: 0 }}>
                <a href="/contact" className="cursor-pointer group duration-300 transition-all w-fit rounded-full bg-[#1651D1]/30 hover:bg-[#1651D1]/50 backdrop-blur-2xl border border-white/30 p-1.5 relative overflow-hidden">
                  <div className="absolute top-0 left-[5%] group-hover:left-[80%] duration-300 transition-all h-full w-10 bg-[#1651D1]/50 rounded-[200%] blur" />
                  <div className="flex items-center bg-white rounded-full px-4 py-2 md:px-5 md:py-3 relative z-10">
                    <span className="text-base font-semibold">Contact for Pricing</span> <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </a>
                <a href="/products" className="text-sm font-semibold flex items-center gap-1.5"
                  style={{ background: "linear-gradient(180deg, #e8e8e8 0%, #a8a8a8 30%, #d0d0d0 50%, #787878 65%, #c0c0c0 80%, #8a8a8a 100%)", WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                  onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.background = "linear-gradient(180deg, #1a6fd4 0%, #0d4fa8 35%, #1565c8 55%, #0a3d8a 80%, #1251b0 100%)"; a.style.webkitBackgroundClip = "text"; a.style.webkitTextFillColor = "transparent"; a.style.backgroundClip = "text"; }}
                  onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.background = "linear-gradient(180deg, #e8e8e8 0%, #a8a8a8 30%, #d0d0d0 50%, #787878 65%, #c0c0c0 80%, #8a8a8a 100%)"; a.style.webkitBackgroundClip = "text"; a.style.webkitTextFillColor = "transparent"; a.style.backgroundClip = "text"; }}>
                  All Products <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <div ref={heroImgRef} className="hanim relative flex items-center justify-center" style={{ opacity: 0, height: 560, paddingLeft: 60, paddingBottom: 60 }}>
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center 60%,rgba(17,17,132,0.35) 0%,transparent 65%)", filter: "blur(24px)" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CLD.kneeProduct2} alt="XO Knee Support ROM Cryo"
                style={{ position: "relative", zIndex: 1, maxHeight: "100%", maxWidth: "90%", objectFit: "contain", filter: "drop-shadow(0 32px 64px rgba(17,17,132,0.50)) drop-shadow(0 4px 16px rgba(0,0,0,0.40))" }} />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none" style={{ zIndex: 2, background: "linear-gradient(to bottom,transparent,#020916)" }} />
      </section>

      {/* ══ DESIGN FEATURES SECTION ══ */}
      <section className="relative w-full py-20 md:py-28 overflow-hidden" style={{ background: "#f5f7ff" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 68% 52%, rgba(180,180,230,0.55) 0%, transparent 58%)" }} />
        <div className="container mx-auto px-5 md:px-[100px] relative z-10">
          <div className="sr text-center mb-12" style={{ opacity: 0 }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d1535] leading-tight">
              Advanced <span className="text-[#111184]">Design Components</span>
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-[#6b7fa8] leading-relaxed">
              Every detail of the XO Knee Support ROM Cryo is engineered for maximum comfort, stability, and clinical outcomes — from the Dual-Axis hinge to the open patella design.
            </p>
          </div>
          <div className="sr grid grid-cols-1 md:grid-cols-2 gap-8 items-center" style={{ opacity: 0 }}>
            <div className="flex flex-col gap-3">
              {features.map((f, i) => {
                const on = activeFeature === i;
                return (
                  <button key={i} onClick={() => setActiveFeature(i)}
                    className="w-full text-left rounded-2xl p-5 flex items-center gap-4 transition-all duration-300"
                    style={{ background: on ? "linear-gradient(135deg,#0f0f7a,#1651D1)" : "#ffffff", boxShadow: on ? "0 8px 28px rgba(17,17,132,0.28)" : "0 2px 12px rgba(0,0,0,0.06)", minHeight: 72 }}>
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

      {/* ══ PRODUCT INFO + GALLERY + TABS ══ */}
      <ProductInfoSection />

      {/* ══ SIZING CHART ══ */}
      <section className="relative w-full py-20 overflow-hidden bg-white" style={{ borderTop: "1px solid rgba(17,17,132,0.06)" }}>
        <div className="container mx-auto px-5 md:px-[100px]">
          <div className="sr text-center mb-12" style={{ opacity: 0 }}>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#111184]">Sizing Guide</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold text-[#0d1535] leading-tight">
              Find Your <span className="text-[#111184]">Perfect Fit</span>
            </h2>
            <p className="mt-4 max-w-lg mx-auto text-sm text-[#6b7fa8]">Available in Two Sizes Only — covers SM through 7XL for full patient coverage.</p>
          </div>
          <div className="sr grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto" style={{ opacity: 0 }}>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(17,17,132,0.10)", boxShadow: "0 4px 24px rgba(17,17,132,0.07)" }}>
              <div className="px-6 py-4" style={{ background: "linear-gradient(135deg,#0f0f7a,#1651D1)" }}>
                <p className="text-white font-bold text-sm uppercase tracking-widest">Size 1</p>
              </div>
              <div className="px-6 py-5 flex flex-col gap-1" style={{ background: "#fff" }}>
                <p className="text-2xl font-black text-[#111184]">SM – 2XL</p>
                <p className="text-sm text-[#6b7fa8]">Standard range — small to 2X-large</p>
                <p className="text-xs font-bold text-[#111184] mt-2">HCPCS: L1832</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(17,17,132,0.10)", boxShadow: "0 4px 24px rgba(17,17,132,0.07)" }}>
              <div className="px-6 py-4" style={{ background: "linear-gradient(135deg,#1651D1,#5b9bff)" }}>
                <p className="text-white font-bold text-sm uppercase tracking-widest">Size 2</p>
              </div>
              <div className="px-6 py-5 flex flex-col gap-1" style={{ background: "#fff" }}>
                <p className="text-2xl font-black text-[#111184]">3XL – 7XL</p>
                <p className="text-sm text-[#6b7fa8]">Extended range — 3X-large to 7X-large</p>
                <p className="text-xs font-bold text-[#111184] mt-2">HCPCS: L1833</p>
              </div>
            </div>
          </div>
          <p className="sr text-center mt-8 text-xs text-[#9ca3af]" style={{ opacity: 0 }}>
            Approved by PDAC · HCPCS codes L1832 &amp; L1833 · Available exclusively through TLC DME LLC · (888) 521-8522 · tlcdme.com
          </p>
        </div>
      </section>

      {/* ══ ADVANCED DYNAMIC HINGE SECTION ══ */}
      <section className="relative w-full overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(108deg, #ffffff 46%, #f0f0f8 46%)" }} />
        <div className="container mx-auto px-5 md:px-[100px] relative z-10 py-20 md:py-28">
          <div className="sr grid grid-cols-1 md:grid-cols-2 gap-14 items-center" style={{ opacity: 0 }}>
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d1535] leading-tight">
                Advanced <span className="text-[#111184]">Dynamic Hinge</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#4A5568] leading-relaxed">
                A Dual-Axis hinge moves on two independent planes promoting better stability and allowing for a more effective range of motion and natural movement of the knee. Easily removed, when preferred, to provide comfortable effective support during treatment and advanced stages of recovery.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {[
                  { img: CLD.kneeHinge2, label: "Dual-Action Hinge", desc: "Adjustable flexion and extension stops. Full flex capability — inside support for easy insertion and removal." },
                  { img: CLD.kneeCryoPad, label: "Cryo Gel Pad", desc: "Removable gel pad for cryotherapy or heat therapy. Seamlessly attaches for targeted pain relief and recovery." },
                ].map((c, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden flex flex-col"
                    style={{ border: "1px solid rgba(17,17,132,0.09)", boxShadow: "0 2px 12px rgba(17,17,132,0.06)" }}>
                    <div className="flex items-center justify-center bg-[#f4f6ff]" style={{ height: 120, overflow: "hidden" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.img} alt={c.label} className="w-full h-full object-contain p-2" />
                    </div>
                    <div className="p-4" style={{ borderTop: "1px solid rgba(17,17,132,0.07)" }}>
                      <p className="text-xs font-bold uppercase tracking-widest mb-1"
                        style={{ backgroundImage: "linear-gradient(135deg,#0f0f7a,#1651D1)", WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                        {c.label}
                      </p>
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
              <img src={CLD.kneeHinge1} alt="XO Knee Support — Dynamic Hinge"
                style={{ maxHeight: 500, maxWidth: "110%", objectFit: "contain", position: "relative", zIndex: 1, filter: "drop-shadow(0 18px 48px rgba(17,17,132,0.24)) drop-shadow(0 4px 18px rgba(0,0,0,0.15))" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ STRAPPING & COMFORT SECTION ══ */}
      <section className="relative w-full overflow-hidden min-h-[560px] flex items-stretch">
        <div className="absolute inset-0 z-0 bg-white" />
        <div className="absolute inset-0 z-0 bg-[#eeeef6]" style={{ clipPath: "polygon(0 0, 38.5% 0, 54.1% 100%, 0 100%)" }} />
        <div className="container mx-auto px-5 md:px-[100px] relative z-10 py-20 md:py-28 w-full">
          <div className="sr grid grid-cols-1 md:grid-cols-2 gap-14 items-center" style={{ opacity: 0 }}>
            <div className="relative flex items-center justify-center" style={{ minHeight: 420 }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
                style={{ width: "80%", height: "30%", background: "radial-gradient(ellipse, rgba(17,17,132,0.18) 0%, transparent 70%)", filter: "blur(20px)", zIndex: 0 }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CLD.kneeStrap1} alt="XO Knee Support — Strapping System"
                style={{ height: 420, maxWidth: "100%", objectFit: "contain", position: "relative", zIndex: 1, filter: "drop-shadow(0 20px 48px rgba(17,17,132,0.25)) drop-shadow(0 4px 18px rgba(0,0,0,0.15))" }} />
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d1535] leading-tight">
                Strapping System<br /><span className="text-[#111184]">&amp; Comfort Design</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#4A5568] leading-relaxed">
                The open patella &amp; back design alleviates friction and irritation. High grade perforated Neoprene combines breathable construction for a cool, dry, comfortable fit designed for all-day wear. The overlapping strapping system with medical grade hook and loop closures provides easily sized, customized support.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {[
                  { img: CLD.kneeOpen, label: "Open Patella w/ Buttress", desc: "Open patella for less irritation. Patella buttress pad for greater comfort and secure fit." },
                  { img: CLD.kneeHingeSingle, label: "Medical Grade Closures", desc: "Hook and loop secures in place — no migrating. Hook tab easily adjusted, less wear on support material." },
                ].map((c, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden flex flex-col"
                    style={{ border: "1px solid rgba(17,17,132,0.09)", boxShadow: "0 2px 12px rgba(17,17,132,0.06)" }}>
                    <div className="flex items-center justify-center bg-[#f4f6ff]" style={{ height: 120, overflow: "hidden" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.img} alt={c.label} className="w-full h-full object-contain p-2" />
                    </div>
                    <div className="p-4" style={{ borderTop: "1px solid rgba(17,17,132,0.07)" }}>
                      <p className="text-xs font-bold uppercase tracking-widest mb-1"
                        style={{ backgroundImage: "linear-gradient(135deg,#0f0f7a,#1651D1)", WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                        {c.label}
                      </p>
                      <p className="text-xs text-[#6b7fa8] leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ KO UNDERSLEEVE SECTION ══ */}
      <section className="relative w-full py-16 overflow-hidden" style={{ background: "#020916" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(17,17,132,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.05) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="container mx-auto px-5 md:px-[100px] relative z-10">
          <div className="sr" style={{ opacity: 0 }}>
            <div className="rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10"
              style={{ background: "linear-gradient(135deg,rgba(22,81,209,0.18) 0%,rgba(6,10,35,0.9) 100%)", border: "1px solid rgba(91,155,255,0.18)" }}>
              <div className="flex-shrink-0 w-28 h-28 rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 0 40px rgba(91,155,255,0.3)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={CLD.kneeSleeve} alt="KO Undersleeve" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#5b9bff]">Included With Every Support</span>
                <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white leading-tight">KO Undersleeve <span className="text-[#5b9bff]">— Included</span></h2>
                <p className="mt-3 text-white/60 text-base leading-relaxed max-w-2xl">
                  Proprietary microfiber material creates lite even compression and a barrier between skin and the support to enhance comfort by eliminating hot spots due to friction. Wicks away perspiration and helps keep the support clean — enhancing overall wearability of the product.
                </p>
              </div>
              <div className="flex-shrink-0 flex flex-col gap-3">
                {[
                  { t: "Eliminates Hot Spots", d: "Friction-free barrier" },
                  { t: "Wicking Material", d: "Keeps skin dry & clean" },
                  { t: "Lite Compression", d: "Microfiber, always included" },
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

      {/* ══ BETTER DME SECTION ══ */}
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

      {/* ══ FITTING STEPS ══ */}
      <section className="relative w-full py-20 md:py-28 overflow-hidden bg-white">
        <div className="container mx-auto px-5 md:px-[100px]">
          <div className="sr grid grid-cols-1 md:grid-cols-2 gap-14 items-center" style={{ opacity: 0 }}>
            <div className="relative flex items-center justify-center" style={{ minHeight: 400 }}>
              <div className="absolute pointer-events-none"
                style={{ bottom: "8%", left: "50%", transform: "translateX(-50%)", width: "55%", height: "35%", background: "radial-gradient(ellipse, rgba(17,17,132,0.20) 0%, transparent 70%)", filter: "blur(20px)" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CLD.kneeProduct2} alt="Fitting the XO Knee Support"
                style={{ position: "relative", zIndex: 1, maxHeight: 400, objectFit: "contain", filter: "drop-shadow(0 8px 28px rgba(0,0,0,0.12))" }} />
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d1535] leading-tight">
                Fitting Your <span className="text-[#111184]">XO Knee Support</span>
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

      {/* ══ REVIEWS ══ */}
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(150deg,#f0f0ff 0%,#e8e8ff 50%,#f5f8ff 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center,rgba(17,17,132,0.07) 0%,transparent 65%)" }} />
        <div className="relative z-10 max-w-xl mx-auto px-6 flex flex-col items-center text-center gap-6">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "rgba(17,17,132,0.45)" }} />
          <h2 className="font-nexa uppercase leading-tight" style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 800, color: "#0d1535", letterSpacing: "-0.5px" }}>
            Provide Your Patients <span style={{ color: "#111184" }}>With The Best.</span>
          </h2>
          <p className="text-[#3a4a6b] text-base leading-relaxed">
            The XO Knee Support ROM Cryo is available exclusively through TLC DME LLC. Contact our team for pricing, availability, and distribution inquiries.
          </p>
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