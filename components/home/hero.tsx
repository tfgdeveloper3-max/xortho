"use client";
import { CLD } from "@/lib/cloudinary";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ArrowRight, ChevronRight, X } from "lucide-react";

interface HeroProps {
  noAnimation?: boolean;
  playAnimation?: boolean;
}

const products = [
  {
    id: "xboot", label: "Orthopedic\nXboot", abbr: "XB", short: "Boot", tag: "Orthopedic Boot",
    image: CLD.shoe, title: "Orthopedic Xboot", subtitle: "Advanced Recovery Boot",
    href: "/products/xboot",
    description: "An advanced pulley system allows for tailored compression. Low profile design fits comfortably under clothing — ideal for active patients or lifestyles.",
    features: ["Tailored compression pulley system", "Vertical stays for structural integrity", "Universal strap design", "Optimal Gel Cryo Pad for cold therapy"],
  },
  {
    id: "back", label: "Back\nSupport", abbr: "BS", short: "Back", tag: "Lumbar Belt",
    image: CLD.backBelt, title: "Back Support 627/642", subtitle: "Lumbar Compression Belt",
    href: "/products/back",
    description: "Low profile design allows support to fit comfortably under clothing. Vertical stays provide structural integrity while allowing the flexibility needed.",
    features: ["Advanced pulley compression system", "Universal fit strap design", "Lumbar support stays", "Gel Cryo Pad compatible"],
  },
  {
    id: "knee", label: "Knee\nBrace", abbr: "KB", short: "Knee", tag: "Osteoarthritis",
    image: CLD.kneeBrace, title: "Knee Brace OA", subtitle: "Osteoarthritis Support",
    href: "/products/knee-brace",
    description: "An advanced pulley system allows for tailored compression. Low profile design allows support to fit comfortably under clothing for all-day wear.",
    features: ["Tailored compression control", "Low-profile under-clothing fit", "Vertical structural stays", "Gel Cryo cold therapy pad"],
  },
];

export default function Hero({ noAnimation = false, playAnimation = false }: HeroProps) {
  const router = useRouter();
  const heroRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const line4Ref = useRef<HTMLSpanElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const [activated, setActivated] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const selected = products.find((p) => p.id === selectedId) ?? null;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Hide/show navbar when overlay opens/closes
  useEffect(() => {
    const navbar = document.querySelector<HTMLElement>("#main-navbar");
    if (!navbar) return;
    if (activated) {
      navbar.style.transition = "opacity 0.3s ease";
      navbar.style.opacity = "0";
      navbar.style.pointerEvents = "none";
    } else {
      navbar.style.transition = "opacity 0.3s ease";
      navbar.style.opacity = "1";
      navbar.style.pointerEvents = "auto";
    }
  }, [activated]);

  // Hero entrance
  useEffect(() => {
    if (!playAnimation) return;
    const hero = heroRef.current;
    if (!hero) return;
    const tl = gsap.timeline({ delay: 0.1 });
    tl.fromTo(hero, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.inOut" }, 0);
    tl.fromTo(
      [line1Ref.current, line2Ref.current, line3Ref.current, line4Ref.current],
      { opacity: 0, y: 30, filter: "blur(6px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "power3.out", stagger: 0.15 }, 0.1
    );
    tl.fromTo(btnRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.8);
    if (sidebarRef.current) {
      gsap.fromTo(sidebarRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 1.0, ease: "power3.out", delay: 1.2 });
    }
  }, [playAnimation]);

  // Grid open/close animation
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    if (activated) {
      el.style.display = "flex";
      gsap.fromTo(el, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" });
      const cards = el.querySelectorAll(".prod-card");
      gsap.fromTo(cards,
        { opacity: 0, y: 16, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out", stagger: 0.07, delay: 0.15 }
      );
    } else {
      gsap.to(el, {
        opacity: 0, scale: 0.96, duration: 0.28, ease: "power2.in",
        onComplete: () => { el.style.display = "none"; }
      });
      setSelectedId(null);
    }
  }, [activated]);

  // Detail panel animation
  useEffect(() => {
    const el = detailRef.current;
    if (!el || !selectedId) return;
    gsap.fromTo(el,
      { opacity: 0, y: 12, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.38, ease: "back.out(1.4)" }
    );
  }, [selectedId]);

  const openProduct = (id: string) => {
    if (!activated) setActivated(true);
    setTimeout(() => setSelectedId(id), activated ? 0 : 250);
  };

  // Navigate to product detail page
  const goToProduct = (href: string) => {
    setActivated(false);
    setTimeout(() => router.push(href), 300);
  };

  // Scroll to products section or navigate to /products
  const scrollToProducts = () => {
    const el = document.getElementById("products");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/products");
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes pgAnim { from { width: 35%; } to { width: 85%; } }
      `}</style>

      <section
        ref={heroRef}
        id="home"
        className="relative w-full min-h-screen flex items-center bg-black overflow-hidden"
        style={{ opacity: 1 }}
      >
        <video src={CLD.heroBg} autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent z-10 pointer-events-none" />

        {/* MAIN LAYOUT */}
        <div className="relative z-20 w-full flex items-center justify-between">

          {/* LEFT: Text + Buttons */}
          <div className="flex flex-col gap-3 px-4 sm:px-8 md:px-[100px] pt-20 flex-1 min-w-0">
            <span ref={line1Ref} className="block text-xs sm:text-sm font-bold uppercase"
              style={{ opacity: 0, color: "#4a8fff", textShadow: "0 1px 3px rgba(200,215,240,0.4), 0 0 20px rgba(91,155,255,0.3)", letterSpacing: "0.3em" }}>
              Orthopedic Solutions
            </span>

            <h1 className="font-nexa uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
              style={{ fontWeight: 800, letterSpacing: "-0.5px", lineHeight: "1.1" }}>
              <span ref={line2Ref} className="block" style={{ opacity: 0, color: "#f0f4ff", textShadow: "2px 2px 0px rgba(80,100,160,0.15), 0 4px 16px rgba(60,80,140,0.25)" }}>
                Tender Loving Care,
              </span>
              <span ref={line3Ref} className="block" style={{ opacity: 0, color: "#2c6fd4", textShadow: "1px 1px 0px rgba(180,200,240,0.3), 0 3px 12px rgba(40,80,180,0.2), 0 0 30px rgba(91,155,255,0.15)" }}>
                Trust Loyalty
              </span>
              <span ref={line4Ref} className="block" style={{ opacity: 0, color: "#f0f4ff", textShadow: "2px 2px 0px rgba(80,100,160,0.15), 0 4px 16px rgba(60,80,140,0.25)" }}>
                Commitment
              </span>
            </h1>

            <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-md"
              style={{ textShadow: "1px 1px 0 rgba(120,150,200,0.2), 0 2px 10px rgba(60,90,160,0.18)", borderLeft: "3px solid rgba(44,111,212,0.7)", paddingLeft: "14px" }}>
              Discover a wide range of trusted orthopedic products designed to support recovery, reduce pain, and improve everyday comfort. From braces to mobility aids, we help you move better and live healthier.
            </p>

            <div ref={btnRef} className="flex flex-col gap-3" style={{ opacity: 0 }}>
              <button
                onClick={scrollToProducts}
                className="cursor-pointer group duration-300 transition-all w-fit rounded-full bg-[#1651D1]/30 hover:bg-[#1651D1]/50 backdrop-blur-2xl border border-white/30 p-1.5 relative overflow-hidden">
                <div className="absolute top-0 left-[5%] group-hover:left-[80%] duration-300 transition-all h-full w-10 bg-[#1651D1]/50 rounded-[200%] blur" />
                <div className="flex items-center bg-white rounded-full px-3 py-2 md:px-5 md:py-3 relative z-10">
                  <span className="text-sm md:text-lg font-semibold">View Product Details</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </button>

              <button onClick={() => setActivated((v) => !v)} className="group w-fit flex items-center gap-3 cursor-pointer">
                <div className="relative flex-shrink-0 transition-all duration-400"
                  style={{
                    width: 54, height: 28, borderRadius: 14,
                    background: activated ? "linear-gradient(135deg, #1651D1, #5b9bff)" : "rgba(255,255,255,0.12)",
                    border: activated ? "1.5px solid #5b9bff" : "1.5px solid rgba(255,255,255,0.5)",
                    boxShadow: activated ? "0 0 20px rgba(22,81,209,0.75)" : "none",
                  }}>
                  <div className="absolute top-[4px] rounded-full bg-white transition-all duration-300"
                    style={{ width: 18, height: 18, left: activated ? 30 : 5, boxShadow: activated ? "0 0 8px rgba(91,155,255,0.9)" : "none" }} />
                </div>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] transition-all duration-300"
                  style={{ color: activated ? "#5b9bff" : "rgba(255,255,255,0.9)", textShadow: activated ? "0 0 20px rgba(91,155,255,0.6)" : "0 1px 4px rgba(0,0,0,0.8)" }}>
                  {activated ? "Deactivate" : "Activate Xortho"}
                </span>
              </button>
            </div>
          </div>

          {/* RIGHT: Sidebar Buttons */}
          <div ref={sidebarRef}
            className="hidden md:flex flex-shrink-0 flex-col items-center gap-4 pr-6 md:pr-12 pt-20 self-stretch justify-center"
            style={{ opacity: 0 }}>
            <div className="flex flex-col items-center gap-1 mb-1">
              <span className="text-[9px] uppercase tracking-[0.2em] font-semibold"
                style={{ color: "rgba(255,255,255,0.92)", textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}>Products</span>
              <div className="w-px h-5" style={{ background: "rgba(255,255,255,0.6)" }} />
            </div>
            {products.map((p) => {
              const isSel = selectedId === p.id && activated;
              return (
                <button key={p.id} onClick={() => openProduct(p.id)} title={p.label.replace("\n", " ")}
                  className="flex flex-col items-center gap-1 cursor-pointer group">
                  <div className="flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
                    style={{
                      width: isSel ? 58 : 52, height: isSel ? 58 : 52,
                      background: isSel ? "linear-gradient(135deg, #1651D1, #5b9bff)" : "rgba(0,0,0,0.58)",
                      border: isSel ? "2px solid #5b9bff" : "2px solid rgba(255,255,255,0.72)",
                      boxShadow: isSel ? "0 0 22px rgba(22,81,209,0.85)" : "0 4px 16px rgba(0,0,0,0.5)",
                      backdropFilter: "blur(12px)",
                    }}>
                    <span className="text-[11px] font-black tracking-wide text-white">{p.abbr}</span>
                  </div>
                  <span className="text-[9px] font-semibold uppercase tracking-widest transition-colors duration-300"
                    style={{ color: isSel ? "#5b9bff" : "rgba(255,255,255,0.88)", textShadow: "0 1px 4px rgba(0,0,0,0.85)" }}>
                    {p.short}
                  </span>
                </button>
              );
            })}
            <div className="flex flex-col items-center gap-1 mt-3" style={{ opacity: 0.65 }}>
              <div className="w-px h-8 bg-white" />
              <span className="text-white text-[8px] uppercase tracking-widest font-semibold"
                style={{ textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}>scroll</span>
            </div>
          </div>
        </div>

        {/* Mobile bottom buttons */}
        <div className="md:hidden absolute bottom-8 left-0 right-0 z-30 flex items-center justify-center gap-4 px-4">
          {products.map((p) => {
            const isSel = selectedId === p.id && activated;
            return (
              <button key={p.id} onClick={() => openProduct(p.id)}
                className="flex flex-col items-center gap-1 cursor-pointer">
                <div className="flex items-center justify-center rounded-full transition-all duration-300"
                  style={{
                    width: isSel ? 52 : 46, height: isSel ? 52 : 46,
                    background: isSel ? "linear-gradient(135deg, #1651D1, #5b9bff)" : "rgba(0,0,0,0.58)",
                    border: isSel ? "2px solid #5b9bff" : "2px solid rgba(255,255,255,0.72)",
                    boxShadow: isSel ? "0 0 18px rgba(22,81,209,0.85)" : "0 4px 12px rgba(0,0,0,0.5)",
                    backdropFilter: "blur(12px)",
                  }}>
                  <span className="text-[10px] font-black tracking-wide text-white">{p.abbr}</span>
                </div>
                <span className="text-[8px] font-semibold uppercase tracking-widest"
                  style={{ color: isSel ? "#5b9bff" : "rgba(255,255,255,0.8)", textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}>
                  {p.short}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── FULL SCREEN SCI-FI GRID OVERLAY ── */}
      <div
        ref={gridRef}
        className="fixed inset-0 z-[60] items-center justify-center"
        style={{ display: "none", opacity: 0, background: "rgba(2,4,16,0.92)", backdropFilter: "blur(12px)" }}
      >
        <div className="relative w-full max-w-2xl mx-4 sm:mx-auto p-[1.5px] rounded-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(91,155,255,0.7), rgba(22,81,209,0.25), rgba(91,155,255,0.7))",
            boxShadow: "0 0 60px rgba(22,81,209,0.5), 0 0 120px rgba(22,81,209,0.2)",
          }}>

          {/* Corner brackets */}
          {["tl", "tr", "bl", "br"].map((c) => (
            <div key={c} className="absolute w-4 h-4 z-10"
              style={{
                top: c.startsWith("t") ? -1 : "auto", bottom: c.startsWith("b") ? -1 : "auto",
                left: c.endsWith("l") ? -1 : "auto", right: c.endsWith("r") ? -1 : "auto",
                borderTop: c.startsWith("t") ? "2px solid #5b9bff" : "none",
                borderBottom: c.startsWith("b") ? "2px solid #5b9bff" : "none",
                borderLeft: c.endsWith("l") ? "2px solid #5b9bff" : "none",
                borderRight: c.endsWith("r") ? "2px solid #5b9bff" : "none",
                borderRadius: c === "tl" ? "12px 0 0 0" : c === "tr" ? "0 12px 0 0" : c === "bl" ? "0 0 0 12px" : "0 0 12px 0",
              }} />
          ))}

          <div className="rounded-2xl overflow-hidden"
            style={{ background: "rgba(3,6,20,0.88)", backdropFilter: "blur(24px)" }}>

            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid rgba(91,155,255,0.12)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#5b9bff] animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#5b9bff]/90 font-bold">Xortho Product Suite</span>
              <div className="flex-1 h-px ml-2" style={{ background: "rgba(91,155,255,0.12)" }} />
              <button onClick={() => { setSelectedId(null); setActivated(false); }}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors ml-1">
                <X className="w-3 h-3 text-white" />
              </button>
            </div>

            {/* Product cards */}
            <div className="flex">
              {products.map((p, i) => {
                const isSel = selectedId === p.id;
                return (
                  <button key={p.id}
                    onClick={() => setSelectedId((prev) => prev === p.id ? null : p.id)}
                    className="prod-card group flex-1 relative flex flex-col items-center justify-center gap-2 py-6 sm:py-8 px-4 sm:px-6 cursor-pointer transition-all duration-300"
                    style={{
                      borderRight: i < products.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                      background: isSel ? "linear-gradient(180deg, rgba(22,81,209,0.38) 0%, rgba(22,81,209,0.10) 100%)" : "transparent",
                      borderBottom: isSel ? "2px solid #5b9bff" : "2px solid transparent",
                      opacity: 0,
                    }}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ background: "linear-gradient(180deg, rgba(22,81,209,0.14) 0%, transparent 100%)" }} />

                    <div className="flex items-center justify-center rounded-xl transition-all duration-300"
                      style={{
                        width: isMobile ? 56 : 80, height: isMobile ? 56 : 80,
                        background: isSel ? "rgba(22,81,209,0.35)" : "rgba(255,255,255,0.07)",
                        border: isSel ? "1px solid rgba(91,155,255,0.65)" : "1px dashed rgba(255,255,255,0.18)",
                        boxShadow: isSel ? "0 0 20px rgba(22,81,209,0.6)" : "none",
                      }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.image} alt={p.title}
                        style={{
                          width: isMobile ? 38 : 58, height: isMobile ? 38 : 58, objectFit: "contain",
                          filter: isSel ? "drop-shadow(0 0 8px rgba(91,155,255,0.9)) brightness(1.15)" : "brightness(0.65) grayscale(0.25)",
                          transition: "filter 0.3s",
                        }} />
                    </div>

                    <span className="text-[12px] sm:text-[14px] font-bold uppercase tracking-wider leading-tight text-center whitespace-pre-line transition-colors duration-300"
                      style={{ color: isSel ? "#5b9bff" : "rgba(255,255,255,0.75)" }}>
                      {p.label}
                    </span>
                    {isSel && <div className="w-1.5 h-1.5 rounded-full bg-[#5b9bff] animate-pulse" />}
                  </button>
                );
              })}
            </div>

            {/* Detail panel */}
            {selectedId && selected && (
              <div ref={detailRef}
                style={{ opacity: 0, borderTop: "1px solid rgba(22,81,209,0.3)", background: "linear-gradient(180deg, rgba(22,81,209,0.14) 0%, rgba(3,6,20,0.6) 100%)" }}>
                <div className="flex gap-4 p-5 sm:p-6">
                  <div className="flex-shrink-0 flex items-center justify-center rounded-xl"
                    style={{ width: isMobile ? 80 : 108, height: isMobile ? 80 : 108, background: "rgba(22,81,209,0.22)", border: "1px solid rgba(91,155,255,0.35)", boxShadow: "0 0 24px rgba(22,81,209,0.35)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={selected.image} alt={selected.title}
                      style={{ width: isMobile ? 60 : 84, height: isMobile ? 60 : 84, objectFit: "contain", filter: "drop-shadow(0 4px 12px rgba(91,155,255,0.6))" }} />
                  </div>

                  <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded"
                          style={{ background: "rgba(22,81,209,0.32)", color: "#5b9bff" }}>{selected.tag}</span>
                        <h4 className="text-white font-bold text-lg mt-1.5 leading-tight">{selected.title}</h4>
                        <p className="text-white/50 text-xs mt-0.5 hidden sm:block">{selected.subtitle}</p>
                      </div>
                      <button onClick={() => setSelectedId(null)}
                        className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center flex-shrink-0 transition-colors">
                        <X className="w-3.5 h-3.5 text-white" />
                      </button>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed line-clamp-2">{selected.description}</p>
                    <div className="flex flex-col gap-1.5 mt-0.5">
                      {selected.features.slice(0, isMobile ? 2 : 3).map((f, i) => (
                        <span key={i} className="flex items-center gap-1.5 text-[13px] text-white/70">
                          <span className="w-1 h-1 rounded-full flex-shrink-0 bg-[#5b9bff]" />{f}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-[10px] text-white/35 uppercase tracking-widest mb-1">
                        <span>Pain</span><span>Recovery</span>
                      </div>
                      <div className="w-full h-[2px] rounded-full overflow-hidden bg-white/10">
                        <div className="h-full rounded-full"
                          style={{ width: "75%", background: "linear-gradient(to right, #ef4444, #f97316, #eab308, #5b9bff)", animation: "pgAnim 3s ease-in-out infinite alternate" }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── View Full Details → routes to product page ── */}
                <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                  <button
                    onClick={() => goToProduct(selected.href)}
                    className="w-full rounded-full py-3 text-white text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    style={{ background: "linear-gradient(135deg, #1651D1, #5b9bff)" }}>
                    View Full Details <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}