"use client";
import { CLD } from "@/lib/cloudinary";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ArrowRight, Check, X, ZoomIn, ZoomOut, RotateCcw, ChevronUp } from "lucide-react";
import Navbar from "@/components/navbar";
import StickyButtons from "@/components/sticky-buttons";
import Footer from "@/components/footer";
import { useCallback } from "react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const products = [
  {
    id: "xboot",
    tag: "Pneumatic Walking Boot",
    title: "XO Boot Pneumatic",
    subtitle: "Better DME. Better Functionality. Better Outcomes.",
    image: CLD.shoe,
    painImage: CLD.legPain,
    healImage: CLD.legHealed,
    imgStyle: { height: 360, width: "60%", marginLeft: "80px", marginBottom: "130px" },
    description: "Engineered for superior strength, performance and comfort — crafted to deliver exceptional clinical outcomes. Designed with Biomechanical Engineers and feedback from Orthopedic, Urgent Care and Podiatry clients.",
    features: [
      "World class aerodynamic shell design",
      "Revolutionary compartmentalized pneumatic compression",
      "Real rocker sole — most fluid gait action built",
      "Removable anterior shield for patient compliance",
      "4-strap system with 360° swivel D-rings",
      "Seamless micro-fiber liner — T-shirt soft",
      "AFO undersleeve included (2 per boot)",
    ],
    stats: [{ label: "Pain Relief", value: "94%" }, { label: "Recovery Speed", value: "2.4×" }, { label: "Satisfaction", value: "98%" }],
    indicator: "Ankle → Recovery",
  },
  // Back Support — temporarily hidden
  /*{
    id: "back",
    tag: "Lumbar Belt",
    title: "Back Support 627/642",
    subtitle: "Lumbar Compression Belt",
    image: CLD.backBelt,
    painImage: CLD.backPain,
    healImage: CLD.backHealed,
    imgStyle: { height: 360, width: "96%" },
    description: "Low profile design allows support to fit comfortably under clothing. Vertical stays provide structural integrity while allowing the flexibility needed for daily activities.",
    features: ["Advanced pulley compression system", "Universal fit strap design", "Lumbar support stays", "Gel Cryo Pad compatible", "Breathable mesh construction", "Adjustable tension control"],
    stats: [{ label: "Pain Reduction", value: "91%" }, { label: "Mobility Retained", value: "96%" }, { label: "Daily Comfort", value: "99%" }],
    indicator: "Back Pain → Recovery",
  },*/
  {
    id: "knee",
    tag: "Knee Support ROM Cryo",
    title: "XO Knee Support ROM Cryo",
    subtitle: "Better DME. Better Functionality. Better Outcomes.",
    image: CLD.kneeProduct2,
    painImage: CLD.kneePain,
    healImage: CLD.kneeHealed,
    imgStyle: { height: 340, width: "75%", marginLeft: "12%" },
    description: "Designed and crafted by TLC DME with Biomechanical Engineers and feedback from Orthopedic, Urgent Care and Podiatry clients. PDAC approved — billable with HCPCS codes L1832 & L1833.",
    features: [
      "Dual-Axis hinge mirrors natural knee movement",
      "Open patella & open back — less friction, all-day comfort",
      "Removable Cryo Gel Pad for cold or heat therapy",
      "Wrap-around strapping with medical grade hook & loop",
      "Side stabilizers & patella buttress for proper alignment",
      "KO Undersleeve included — microfiber, wicking",
      "PDAC approved — HCPCS L1832 & L1833",
    ],
    stats: [{ label: "Comfort Rating", value: "98%" }, { label: "Range of Motion", value: "2.1×" }, { label: "PDAC Approved", value: "✓" }],
    indicator: "Knee Pain → Recovery",
  },
];

/* ─────────────────────────────────────────────
   3D IMAGE VIEWER — smooth via rAF + GSAP
───────────────────────────────────────────── */
function ImageViewer3D({ product, onClose }: { product: (typeof products)[0]; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const rotX = useRef(0);
  const rotY = useRef(0);
  const velX = useRef(0);
  const velY = useRef(0);
  const zoom = useRef(1);
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const stageRef = useRef<HTMLDivElement>(null);

  const applyTransform = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;
    img.style.transform = `rotateX(${rotX.current.toFixed(3)}deg) rotateY(${rotY.current.toFixed(3)}deg) scale(${zoom.current.toFixed(4)})`;
  }, []);

  const inertiaLoop = useCallback(() => {
    velX.current *= 0.90;
    velY.current *= 0.90;
    rotY.current += velX.current;
    rotX.current = Math.max(-55, Math.min(55, rotX.current + velY.current));
    applyTransform();
    if (Math.abs(velX.current) > 0.008 || Math.abs(velY.current) > 0.008) {
      rafRef.current = requestAnimationFrame(inertiaLoop);
    }
  }, [applyTransform]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const container = containerRef.current;
    if (!overlay || !container) return;
    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
    gsap.fromTo(container, { opacity: 0, scale: 0.86, y: 48, filter: "blur(10px)" },
      { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "expo.out" });
    return () => { cancelAnimationFrame(rafRef.current); };
  }, []);

  const handleClose = useCallback(() => {
    const overlay = overlayRef.current;
    const container = containerRef.current;
    if (!overlay || !container) { onClose(); return; }
    cancelAnimationFrame(rafRef.current);
    gsap.to(container, { opacity: 0, scale: 0.88, y: 40, filter: "blur(8px)", duration: 0.4, ease: "power3.in" });
    gsap.to(overlay, { opacity: 0, duration: 0.4, ease: "power2.in", onComplete: onClose });
  }, [onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleClose]);

  const startDrag = useCallback((x: number, y: number) => {
    isDragging.current = true;
    lastPos.current = { x, y };
    velX.current = 0;
    velY.current = 0;
    cancelAnimationFrame(rafRef.current);
    if (imgRef.current) imgRef.current.style.transition = "none";
    if (stageRef.current) stageRef.current.style.cursor = "grabbing";
  }, []);

  const moveDrag = useCallback((x: number, y: number) => {
    if (!isDragging.current) return;
    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    velX.current = dx * 0.40;
    velY.current = -dy * 0.40;
    rotY.current += velX.current;
    rotX.current = Math.max(-55, Math.min(55, rotX.current + velY.current));
    lastPos.current = { x, y };
    applyTransform();
  }, [applyTransform]);

  const endDrag = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (stageRef.current) stageRef.current.style.cursor = "grab";
    rafRef.current = requestAnimationFrame(inertiaLoop);
  }, [inertiaLoop]);

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaMode === 1 ? e.deltaY * 20 : e.deltaY;
    const target = Math.max(0.4, Math.min(3.2, zoom.current - delta * 0.0007));
    gsap.to(zoom, { current: target, duration: 0.55, ease: "power2.out", onUpdate: applyTransform });
  }, [applyTransform]);

  const smoothZoom = useCallback((delta: number) => {
    const target = Math.max(0.4, Math.min(3.2, zoom.current + delta));
    gsap.to(zoom, { current: target, duration: 0.55, ease: "power2.out", onUpdate: applyTransform });
  }, [applyTransform]);

  const resetView = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    velX.current = 0;
    velY.current = 0;
    gsap.to(rotX, { current: 0, duration: 0.75, ease: "elastic.out(1, 0.55)", onUpdate: applyTransform });
    gsap.to(rotY, { current: 0, duration: 0.75, ease: "elastic.out(1, 0.55)", onUpdate: applyTransform });
    gsap.to(zoom, { current: 1, duration: 0.5, ease: "power3.out", onUpdate: applyTransform });
  }, [applyTransform]);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[99999] flex items-center justify-center" style={{ opacity: 0 }}>
      <div className="absolute inset-0" style={{ background: "rgba(2,4,16,0.90)", backdropFilter: "blur(24px)" }} onClick={handleClose} />
      <div ref={containerRef} className="relative flex flex-col items-center gap-5 z-10 px-4" style={{ opacity: 0, width: "min(92vw, 640px)" }}>
        <div className="w-full flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] font-bold block" style={{ color: "#5b9bff" }}>{product.tag}</span>
            <span className="text-white font-nexa font-bold text-lg uppercase">{product.title}</span>
          </div>
          <button onClick={handleClose} className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", transition: "background 0.25s, transform 0.25s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.18)"; (e.currentTarget as HTMLButtonElement).style.transform = "rotate(90deg)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLButtonElement).style.transform = "rotate(0deg)"; }}>
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
        <div ref={stageRef} className="relative w-full rounded-3xl overflow-hidden select-none"
          style={{
            height: 420,
            background: "linear-gradient(145deg, rgba(6,10,35,0.96) 0%, rgba(12,22,65,0.92) 100%)",
            border: "1px solid rgba(91,155,255,0.22)",
            boxShadow: "0 0 80px rgba(22,81,209,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
            cursor: "grab",
            perspective: "900px",
          }}
          onMouseDown={e => startDrag(e.clientX, e.clientY)}
          onMouseMove={e => moveDrag(e.clientX, e.clientY)}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onTouchStart={e => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchMove={e => moveDrag(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchEnd={endDrag}
          onWheel={onWheel}
        >
          {(["tl", "tr", "bl", "br"] as const).map(c => (
            <div key={c} style={{
              position: "absolute", width: 24, height: 24, zIndex: 2,
              top: c.startsWith("t") ? 16 : "auto", bottom: c.startsWith("b") ? 16 : "auto",
              left: c.endsWith("l") ? 16 : "auto", right: c.endsWith("r") ? 16 : "auto",
              borderTop: c.startsWith("t") ? "2px solid rgba(91,155,255,0.55)" : "none",
              borderBottom: c.startsWith("b") ? "2px solid rgba(91,155,255,0.55)" : "none",
              borderLeft: c.endsWith("l") ? "2px solid rgba(91,155,255,0.55)" : "none",
              borderRight: c.endsWith("r") ? "2px solid rgba(91,155,255,0.55)" : "none",
              borderRadius: c === "tl" ? "8px 0 0 0" : c === "tr" ? "0 8px 0 0" : c === "bl" ? "0 0 0 8px" : "0 0 8px 0",
            }} />
          ))}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "linear-gradient(rgba(22,81,209,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(22,81,209,0.07) 1px,transparent 1px)",
            backgroundSize: "44px 44px",
          }} />
          <div className="absolute bottom-0 inset-x-0 h-36 pointer-events-none" style={{
            background: "radial-gradient(ellipse at center bottom, rgba(22,81,209,0.28) 0%, transparent 70%)",
          }} />
          <div className="absolute bottom-4 inset-x-0 flex justify-center z-10 pointer-events-none">
            <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "rgba(91,155,255,0.4)" }}>
              Drag to rotate · Scroll to zoom
            </span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "900px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={product.image}
              alt={product.title}
              draggable={false}
              style={{
                maxHeight: "82%", maxWidth: "82%",
                objectFit: "contain",
                transformStyle: "preserve-3d",
                willChange: "transform",
                transition: "transform 0.08s linear",
                filter: "drop-shadow(0 28px 64px rgba(22,81,209,0.55)) drop-shadow(0 4px 20px rgba(0,0,0,0.5))",
                userSelect: "none",
              }}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          {[
            { icon: <ZoomIn className="w-4 h-4" />, label: "Zoom In", action: () => smoothZoom(0.25) },
            { icon: <ZoomOut className="w-4 h-4" />, label: "Zoom Out", action: () => smoothZoom(-0.25) },
            { icon: <RotateCcw className="w-4 h-4" />, label: "Reset", action: resetView },
          ].map(btn => (
            <button key={btn.label} onClick={btn.action}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{
                background: "rgba(22,81,209,0.18)", border: "1px solid rgba(91,155,255,0.28)",
                color: "rgba(255,255,255,0.8)", backdropFilter: "blur(8px)",
                transition: "background 0.25s, transform 0.2s, box-shadow 0.25s",
              }}
              onMouseEnter={e => { const b = e.currentTarget; b.style.background = "rgba(22,81,209,0.38)"; b.style.transform = "translateY(-2px)"; b.style.boxShadow = "0 6px 20px rgba(22,81,209,0.3)"; }}
              onMouseLeave={e => { const b = e.currentTarget; b.style.background = "rgba(22,81,209,0.18)"; b.style.transform = "translateY(0)"; b.style.boxShadow = "none"; }}
            >
              {btn.icon} {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   BACK TO TOP — GSAP animated
───────────────────────────────────────────── */
function BackToTop() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const visible = useRef(false);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    gsap.set(btn, { opacity: 0, y: 20, pointerEvents: "none" });

    const onScroll = () => {
      const shouldShow = window.scrollY > window.innerHeight * 0.5;
      if (shouldShow === visible.current) return;
      visible.current = shouldShow;
      gsap.to(btn, {
        opacity: shouldShow ? 1 : 0,
        y: shouldShow ? 0 : 20,
        duration: 0.5,
        ease: shouldShow ? "back.out(1.4)" : "power2.in",
        pointerEvents: shouldShow ? "auto" : "none",
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      ref={btnRef}
      onClick={() => gsap.to(window, { scrollTo: 0, duration: 1.2, ease: "power3.inOut" })}
      className="fixed z-[9997] flex items-center justify-center rounded-full"
      style={{
        bottom: 32, right: 32, width: 48, height: 48,
        background: "linear-gradient(135deg, #1651D1, #3b7ff5)",
        boxShadow: "0 6px 24px rgba(22,81,209,0.45)",
        border: "1px solid rgba(255,255,255,0.2)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.12) translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 36px rgba(22,81,209,0.55)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 24px rgba(22,81,209,0.45)"; }}
    >
      <ChevronUp className="w-5 h-5 text-white" />
    </button>
  );
}

/* ─────────────────────────────────────────────
   PRODUCT SECTION
───────────────────────────────────────────── */
function ProductSection({
  product, index, onImageClick,
}: {
  product: (typeof products)[0];
  index: number;
  onImageClick: (p: (typeof products)[0]) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [barAnimate, setBarAnimate] = useState(false);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const text = textRef.current;
    if (!section || !image || !text) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 72%", once: true, onEnter: () => setBarAnimate(true) },
      });
      tl.fromTo(text.querySelectorAll(".anim-item"),
        { opacity: 0, y: 36, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0, ease: "expo.out", stagger: 0.1 }
      );
      tl.fromTo(image,
        { opacity: 0, x: isEven ? 60 : -60, scale: 0.93 },
        { opacity: 1, x: 0, scale: 1, duration: 1.1, ease: "expo.out" },
        "-=0.7"
      );
    });

    return () => ctx.revert();
  }, [isEven]);

  const onCardEnter = () => {
    gsap.to(cardRef.current, { y: -6, boxShadow: "0 36px 88px rgba(22,81,209,0.20)", borderColor: "rgba(22,81,209,0.32)", duration: 0.4, ease: "power2.out" });
  };
  const onCardLeave = () => {
    gsap.to(cardRef.current, { y: 0, boxShadow: "0 24px 64px rgba(22,81,209,0.10)", borderColor: "rgba(22,81,209,0.13)", duration: 0.5, ease: "power2.out" });
  };

  return (
    <section ref={sectionRef} id={product.id} className="relative w-full overflow-hidden"
      style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
        background: isEven
          ? "linear-gradient(150deg,#f4f7ff 0%,#eaf0ff 55%,#f8faff 100%)"
          : "linear-gradient(150deg,#ffffff 0%,#f0f5ff 55%,#edf2ff 100%)",
      }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse at ${isEven ? "75% 50%" : "25% 50%"}, rgba(22,81,209,0.06) 0%, transparent 60%)`,
      }} />
      <div className="absolute top-8 inset-x-0 flex justify-center items-center gap-3 z-10">
        <div className="w-8 h-px bg-[#1651D1]/20" />
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#1651D1]/35">
          Product {String(index + 1).padStart(2, "0")}
        </span>
        <div className="w-8 h-px bg-[#1651D1]/20" />
      </div>
      <div className="relative z-10 w-full px-6 md:px-[80px] lg:px-[100px] py-20"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "center", direction: isEven ? "ltr" : "rtl" }}>
        <div ref={textRef} className="flex flex-col gap-6" style={{ direction: "ltr" }}>
          <div className="anim-item" style={{ opacity: 0 }}>
            <span className="text-[10px] uppercase tracking-[0.35em] font-bold px-3 py-1.5 rounded-full inline-block"
              style={{ background: "rgba(22,81,209,0.09)", color: "#1651D1", border: "1px solid rgba(22,81,209,0.18)" }}>
              {product.tag}
            </span>
          </div>
          <div className="anim-item" style={{ opacity: 0 }}>
            <h2 className="font-nexa uppercase leading-[1.05]"
              style={{ fontSize: "clamp(2rem,3vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.5px", color: "#0d1535" }}>
              {product.title}
            </h2>
            <p className="mt-1.5 text-sm font-semibold tracking-wide" style={{ color: "#1651D1" }}>{product.subtitle}</p>
          </div>
          <p className="anim-item text-[#3a4a6b] text-[15px] leading-relaxed" style={{ opacity: 0 }}>
            {product.description}
          </p>
          <div className="anim-item rounded-2xl p-5" style={{ opacity: 0, background: "rgba(255,255,255,0.75)", backdropFilter: "blur(14px)", border: "1px solid rgba(22,81,209,0.11)", boxShadow: "0 4px 20px rgba(22,81,209,0.06)" }}>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {product.features.map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(22,81,209,0.10)", border: "1px solid rgba(22,81,209,0.22)" }}>
                    <Check className="w-2.5 h-2.5 text-[#1651D1]" />
                  </div>
                  <span className="text-[#3a4a6b] text-[13px] leading-snug">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="anim-item" style={{ opacity: 0 }}>
            <div className="flex justify-between text-[10px] text-[#6b7fa8] uppercase tracking-widest mb-2">
              <span>Pain</span><span>Recovery</span>
            </div>
            <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(22,81,209,0.09)" }}>
              <div className="h-full rounded-full"
                style={{ width: barAnimate ? "80%" : "0%", background: "linear-gradient(to right,#ef4444,#f97316,#eab308,#1651D1)", transition: "width 2.2s cubic-bezier(0.34,1.2,0.64,1)" }} />
            </div>
            <p className="text-[10px] mt-1.5 font-semibold" style={{ color: "rgba(22,81,209,0.50)" }}>{product.indicator}</p>
          </div>
          <div className="anim-item flex items-center gap-4" style={{ opacity: 0 }}>
            <a href={product.id === "knee" ? "/products/knee" : `/products/${product.id}`} className="cursor-pointer group duration-300 transition-all w-fit rounded-full bg-[#1651D1]/30 hover:bg-[#1651D1]/50 backdrop-blur-2xl border border-white/30 p-1.5 relative overflow-hidden">
              <div className="absolute top-0 left-[5%] group-hover:left-[80%] duration-300 transition-all h-full w-10 bg-[#1651D1]/50 rounded-[200%] blur" />
              <div className="flex items-center bg-white rounded-full px-4 py-2 md:px-5 md:py-3 relative z-10">
                <span className="text-base font-semibold">See Product Details</span> <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </a>
            <a href="#contact" className="text-[13px] font-semibold uppercase tracking-wider flex items-center gap-1.5"
              style={{ color: "rgba(22,81,209,0.45)", transition: "color 0.25s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#1651D1"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(22,81,209,0.45)"; }}>
              Connect With Us <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div ref={imageRef} className="flex flex-col gap-4" style={{ direction: "ltr", opacity: 0 }}>
          <div ref={cardRef} onClick={() => onImageClick(product)}
            className="group relative w-full rounded-3xl overflow-hidden flex items-center justify-center"
            style={{
              height: 420, cursor: "pointer",
              background: "linear-gradient(145deg,rgba(255,255,255,0.90) 0%,rgba(234,240,255,0.75) 100%)",
              border: "1px solid rgba(22,81,209,0.13)",
              boxShadow: "0 24px 64px rgba(22,81,209,0.10), inset 0 1px 0 rgba(255,255,255,0.95)",
              backdropFilter: "blur(16px)",
            }}
            onMouseEnter={onCardEnter}
            onMouseLeave={onCardLeave}
          >
            {(["tl", "tr", "bl", "br"] as const).map(c => (
              <div key={c} style={{
                position: "absolute", width: 20, height: 20,
                top: c.startsWith("t") ? 16 : "auto", bottom: c.startsWith("b") ? 16 : "auto",
                left: c.endsWith("l") ? 16 : "auto", right: c.endsWith("r") ? 16 : "auto",
                borderTop: c.startsWith("t") ? "2px solid rgba(22,81,209,0.30)" : "none",
                borderBottom: c.startsWith("b") ? "2px solid rgba(22,81,209,0.30)" : "none",
                borderLeft: c.endsWith("l") ? "2px solid rgba(22,81,209,0.30)" : "none",
                borderRight: c.endsWith("r") ? "2px solid rgba(22,81,209,0.30)" : "none",
                borderRadius: c === "tl" ? "8px 0 0 0" : c === "tr" ? "0 8px 0 0" : c === "bl" ? "0 0 0 8px" : "0 0 8px 0",
              }} />
            ))}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 opacity-0 group-hover:opacity-100"
              style={{ transition: "opacity 0.35s ease" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#1651D1] animate-pulse" />
              <span className="text-[9px] uppercase tracking-widest font-bold text-[#1651D1]">Click · View 3D</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.image} alt={product.title} draggable={false}
              style={{
                ...product.imgStyle,
                objectFit: "contain", display: "block",
                transition: "transform 0.55s cubic-bezier(0.34,1.2,0.64,1), filter 0.4s ease",
                filter: "drop-shadow(0 16px 40px rgba(22,81,209,0.18)) drop-shadow(0 4px 12px rgba(0,0,0,0.07))",
              }}
              onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = "scale(1.06)"; (e.target as HTMLImageElement).style.filter = "drop-shadow(0 20px 52px rgba(22,81,209,0.30)) drop-shadow(0 4px 16px rgba(0,0,0,0.10))"; }}
              onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = "scale(1)"; (e.target as HTMLImageElement).style.filter = "drop-shadow(0 16px 40px rgba(22,81,209,0.18)) drop-shadow(0 4px 12px rgba(0,0,0,0.07))"; }}
            />
            <div className="scanline-anim" style={{
              position: "absolute", left: 24, right: 24, height: 1,
              background: "linear-gradient(90deg,transparent,rgba(22,81,209,0.32),transparent)",
              pointerEvents: "none",
            }} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center gap-1 rounded-2xl py-4 text-center"
                style={{ background: "rgba(255,255,255,0.80)", backdropFilter: "blur(12px)", border: "1px solid rgba(22,81,209,0.10)", boxShadow: "0 2px 10px rgba(22,81,209,0.05)", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(22,81,209,0.12)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 10px rgba(22,81,209,0.05)"; }}>
                <span className="text-xl font-black text-[#1651D1]">{stat.value}</span>
                <span className="text-[9px] text-[#6b7fa8] uppercase tracking-wider leading-tight px-2">{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3 items-center">
            {[
              { label: "Before", src: product.painImage, border: "rgba(239,68,68,0.16)", bg: "rgba(255,245,245,0.85)", labelClass: "absolute top-2 left-3 text-[9px] uppercase tracking-widest font-bold text-red-400/60", imgFilter: "grayscale(0.25) brightness(0.85)" },
              { label: "After", src: product.healImage, border: "rgba(22,81,209,0.15)", bg: "rgba(234,240,255,0.85)", labelClass: "absolute top-2 left-3 text-[9px] uppercase tracking-widest font-bold", imgFilter: "drop-shadow(0 0 8px rgba(22,81,209,0.22))" },
            ].map((item, i) => (
              <div key={i} className="flex-1 rounded-2xl overflow-hidden relative" style={{ border: `1px solid ${item.border}`, background: item.bg, height: 88 }}>
                <span className={item.labelClass} style={i === 1 ? { color: "rgba(22,81,209,0.50)" } : undefined}>
                  {item.label}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt={item.label} className="absolute inset-0 w-full h-full object-contain p-3 pt-7"
                  style={{ filter: item.imgFilter, transition: "filter 0.3s ease" }}
                  onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
            ))}
            <ArrowRight className="w-4 h-4 flex-shrink-0 text-[#1651D1]/30" style={{ order: 1 }} />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(22,81,209,0.12),transparent)" }} />

      <style jsx>{`
        .scanline-anim { animation: scanline 3.5s cubic-bezier(0.4,0,0.6,1) infinite; }
        @keyframes scanline {
          0%   { top:  8%; opacity: 0; }
          6%   { opacity: 0.9; }
          94%  { opacity: 0.6; }
          100% { top: 92%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function ProductsPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [viewerProduct, setViewerProduct] = useState<(typeof products)[0] | null>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    gsap.fromTo(el.querySelectorAll(".hero-anim"),
      { opacity: 0, y: 36, filter: "blur(8px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "expo.out", stagger: 0.14, delay: 0.1 }
    );
  }, []);

  useEffect(() => {
    document.body.style.overflow = viewerProduct ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [viewerProduct]);

  return (
    <>
      <StickyButtons />
      <BackToTop />

      {viewerProduct && <ImageViewer3D product={viewerProduct} onClose={() => setViewerProduct(null)} />}

      <div id="main-navbar" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 99999 }}>
        <Navbar />
      </div>

      {/* ══ HERO ══ */}
      <section ref={heroRef} className="relative w-full flex items-center overflow-hidden" style={{ minHeight: "100vh", background: "#020916" }}>
        <video src={CLD.heroBg} autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
          style={{ zIndex: 0 }} />
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "linear-gradient(135deg,rgba(2,9,22,0.90) 0%,rgba(2,9,22,0.55) 55%,transparent 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, backgroundImage: "linear-gradient(rgba(17,17,132,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.04) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
        <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none" style={{ zIndex: 2, background: "linear-gradient(to bottom,transparent,#020916)" }} />

        <div className="relative z-20 flex flex-col gap-3 px-4 sm:px-8 md:px-[100px] pt-20">
          <span className="hero-anim block text-xs sm:text-sm font-bold uppercase"
            style={{ opacity: 0, background: "linear-gradient(180deg, #1a6fd4 0%, #0d4fa8 35%, #1565c8 55%, #0a3d8a 80%, #1251b0 100%)", WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text", letterSpacing: "0.3em" }}>
            X-Ortho Product Line
          </span>
          <h1 className="hero-anim font-nexa uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
            style={{ opacity: 0, fontWeight: 800, letterSpacing: "-0.5px", lineHeight: 1.1 }}>
            <span className="block" style={{ color: "#f0f4ff" }}>X-Ortho</span>
            <span className="block" style={{ background: "linear-gradient(180deg, #e8e8e8 0%, #a8a8a8 30%, #d0d0d0 50%, #787878 65%, #c0c0c0 80%, #8a8a8a 100%)", WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Product Range</span>
            <span className="block" style={{ color: "#f0f4ff" }}>&amp; Solutions</span>
          </h1>
          <p className="hero-anim text-white/55 text-sm sm:text-base md:text-lg leading-relaxed max-w-md border-l-[3px] border-[#7b7bff]/25 pl-3.5"
            style={{ opacity: 0 }}>
            Discover our trusted range of orthopedic products — engineered for superior strength, performance and comfort, crafted to deliver exceptional clinical outcomes.
          </p>
          <div className="hero-anim flex items-center gap-4 flex-wrap" style={{ opacity: 0 }}>
            <a href="/gallery" className="cursor-pointer group duration-300 transition-all w-fit rounded-full bg-[#1651D1]/30 hover:bg-[#1651D1]/50 backdrop-blur-2xl border border-white/30 p-1.5 relative overflow-hidden">
              <div className="absolute top-0 left-[5%] group-hover:left-[80%] duration-300 transition-all h-full w-10 bg-[#1651D1]/50 rounded-[200%] blur" />
              <div className="flex items-center bg-white rounded-full px-4 py-2 md:px-5 md:py-3 relative z-10">
                <span className="text-base font-semibold">View Product Gallery</span> <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </a>
            <a href="/"
              className="text-sm font-semibold flex items-center gap-1.5"
              style={{ background: "linear-gradient(180deg, #e8e8e8 0%, #a8a8a8 30%, #d0d0d0 50%, #787878 65%, #c0c0c0 80%, #8a8a8a 100%)", WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.background = "linear-gradient(180deg, #1a6fd4 0%, #0d4fa8 35%, #1565c8 55%, #0a3d8a 80%, #1251b0 100%)"; a.style.webkitBackgroundClip = "text"; a.style.webkitTextFillColor = "transparent"; a.style.backgroundClip = "text"; }}
              onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.background = "linear-gradient(180deg, #e8e8e8 0%, #a8a8a8 30%, #d0d0d0 50%, #787878 65%, #c0c0c0 80%, #8a8a8a 100%)"; a.style.webkitBackgroundClip = "text"; a.style.webkitTextFillColor = "transparent"; a.style.backgroundClip = "text"; }}>
              Back to Home <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ══ PRODUCT SECTIONS ══ */}
      {products.map((product, index) => (
        <ProductSection key={product.id} product={product} index={index} onImageClick={setViewerProduct} />
      ))}

      {/* BOTTOM CTA */}
      <section className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(150deg,#f0f5ff 0%,#e8efff 50%,#f5f8ff 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center,rgba(22,81,209,0.07) 0%,transparent 65%)" }} />
        <div className="relative z-10 max-w-xl mx-auto px-6 flex flex-col items-center text-center gap-6">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "rgba(22,81,209,0.45)" }} />
          <h2 className="font-nexa uppercase leading-tight"
            style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 800, color: "#0d1535", letterSpacing: "-0.5px" }}>
            Provide Your Patients <span style={{ color: "#1651D1" }}>With The Best.</span>
          </h2>
          <p className="text-[#3a4a6b] text-base leading-relaxed">
            The XO Boot Pneumatic is available exclusively through TLC DME LLC. Contact our team for pricing, availability, and distribution inquiries.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a href="#contact" className="cursor-pointer group duration-300 transition-all w-fit rounded-full bg-[#1651D1]/30 hover:bg-[#1651D1]/50 backdrop-blur-2xl border border-white/30 p-1.5 relative overflow-hidden">
              <div className="absolute top-0 left-[5%] group-hover:left-[80%] duration-300 transition-all h-full w-10 bg-[#1651D1]/50 rounded-[200%] blur" />
              <div className="flex items-center bg-white rounded-full px-4 py-2 md:px-5 md:py-3 relative z-10">
                <span className="text-base font-semibold">Speak With Our Team</span> <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </a>
            <a href="/" className="text-sm font-semibold uppercase tracking-widest" style={{ color: "rgba(22,81,209,0.38)", transition: "color 0.25s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#1651D1"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(22,81,209,0.38)"; }}>
              Back to Home
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}