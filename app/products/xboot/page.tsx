"use client";

import MyButton from "@/components/my-button";
import { useEffect, useRef, useState } from "react";
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


/* ════════════════════════════════════════════════════════
   BEFORE / AFTER SLIDER COMPONENT
════════════════════════════════════════════════════════ */
function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderX, setSliderX] = useState(50); // percent
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
      {/* Blue glow left */}
      <div className="absolute pointer-events-none" style={{ left: "-5%", top: "50%", transform: "translateY(-50%)", width: "55%", height: "80%", background: "radial-gradient(ellipse, rgba(17,17,132,0.13) 0%, transparent 70%)", filter: "blur(32px)", zIndex: 0 }} />
      {/* Blue glow right */}
      <div className="absolute pointer-events-none" style={{ right: "-5%", top: "50%", transform: "translateY(-50%)", width: "55%", height: "80%", background: "radial-gradient(ellipse, rgba(17,17,132,0.10) 0%, transparent 70%)", filter: "blur(32px)", zIndex: 0 }} />
      {/* Bottom glow */}
      <div className="absolute pointer-events-none" style={{ bottom: "0%", left: "50%", transform: "translateX(-50%)", width: "70%", height: "40%", background: "radial-gradient(ellipse, rgba(17,17,132,0.14) 0%, transparent 70%)", filter: "blur(24px)", zIndex: 0 }} />

      {/* Product side — full width, behind (LEFT side) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/leg/boot_product.png"
        alt="Product"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        style={{ zIndex: 1, padding: "20px" }}
      />

      {/* Blueprint side — clipped to right of slider (RIGHT side) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/leg/blue_print.png"
        alt="Blueprint"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        style={{ clipPath: `inset(0 0 0 ${sliderX}%)`, zIndex: 2, filter: "brightness(0.88)", padding: "20px" }}
      />

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 z-10 pointer-events-none"
        style={{ left: `${sliderX}%`, width: 2, background: "linear-gradient(to bottom, transparent 0%, #111184 15%, #111184 85%, transparent 100%)", boxShadow: "0 0 12px rgba(17,17,132,0.5)" }}
      />

      {/* Drag handle */}
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

      {/* Labels */}
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

/* ════════════════════════════════════════════════════════
   BACK TO TOP
════════════════════════════════════════════════════════ */
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

/* ════════════════════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════════════════════ */
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

      {/* ══ HERO ══ */}
      <section ref={heroRef} className="relative w-full flex items-center overflow-hidden" style={{ minHeight: "100vh", background: "#020916" }}>
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none" style={{ zIndex: 0 }}>
          <source src="/video/section_hero.mp4" type="video/mp4" />
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
              <img src="/images/leg/shoe.png" alt="Orthopedic Xboot"
                style={{ position: "relative", zIndex: 1, maxHeight: "100%", maxWidth: "90%", objectFit: "contain", filter: "drop-shadow(0 32px 64px rgba(17,17,132,0.50)) drop-shadow(0 4px 16px rgba(0,0,0,0.40))" }} />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none" style={{ zIndex: 2, background: "linear-gradient(to bottom,transparent,#020916)" }} />
      </section>



      {/* ══════════════════════════════════════
          SECTION 2 — PNEUMATIC WALKING BOOT
          Before/After Drag Slider
      ══════════════════════════════════════ */}
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
            {/* Feature Cards — vertical style like reference image */}
            <div className="grid grid-cols-1 gap-3">
              {features.map((f, i) => {
                const on = activeFeature === i;
                return (
                  <button key={i} onClick={() => setActiveFeature(i)}
                    className="text-left rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300"
                    style={{
                      background: on ? "linear-gradient(135deg,#0f0f7a,#111184)" : "#ffffff",
                      boxShadow: on ? "0 8px 28px rgba(17,17,132,0.28)" : "0 2px 12px rgba(0,0,0,0.06)",
                      minHeight: 72,
                    }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: on ? "rgba(255,255,255,0.18)" : "#e8eeff" }}>
                      <Check className={`w-5 h-5 ${on ? "text-white" : "text-primary"}`} />
                    </div>
                    <div>
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


      {/* ══════════════════════════════════════
          SECTION 3 — ADVANCED ENGINEERING
          FIX: Text constrained to white area | Image enlarged
      ══════════════════════════════════════ */}
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
              <img src="/images/leg/XO_Both_Side_View_1_2.png" alt="Both boots side view"
                style={{ maxHeight: 600, maxWidth: "110%", objectFit: "contain", position: "relative", zIndex: 1, filter: "drop-shadow(0 18px 48px rgba(17,17,132,0.24)) drop-shadow(0 4px 18px rgba(0,0,0,0.15))" }} />
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          SECTION 4 — STRAPPING & COMPRESSION
      ══════════════════════════════════════ */}
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
              <img src="/images/leg/XO_Toe_Guard_2_1.png" alt="Boot both sides"
                style={{ height: 420, maxWidth: "100%", objectFit: "contain", position: "relative", zIndex: 1, filter: "drop-shadow(0 20px 48px rgba(17,17,132,0.25)) drop-shadow(0 4px 18px rgba(0,0,0,0.15))", paddingRight: "120px" }} />
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


      {/* ══════════════════════════════════════
          SECTION 4b — SUPERIOR COMFORT
      ══════════════════════════════════════ */}
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
              <img src="/images/leg/XO_Boot_High_Top_New_bottom_2_1.png" alt="Rocker bottom sole"
                style={{ maxHeight: 380, maxWidth: "85%", objectFit: "contain", position: "relative", zIndex: 1, filter: "drop-shadow(0 20px 48px rgba(17,17,132,0.28)) drop-shadow(0 4px 16px rgba(0,0,0,0.12))" }} />
            </div>
          </div>
        </div>
      </section>


      {/* ══ QUALITY CARE 4 CARDS ══ */}
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


      {/* ══ HOW IT WORKS ══ */}
      <section className="relative w-full py-20 md:py-28 overflow-hidden bg-white">
        <div className="container mx-auto px-5 md:px-[100px]">
          <div className="sr grid grid-cols-1 md:grid-cols-2 gap-14 items-center" style={{ opacity: 0 }}>
            <div className="relative flex items-center justify-center" style={{ minHeight: 400 }}>
              <div className="absolute pointer-events-none"
                style={{ bottom: "8%", left: "50%", transform: "translateX(-50%)", width: "55%", height: "35%", background: "radial-gradient(ellipse, rgba(17,17,132,0.20) 0%, transparent 70%)", filter: "blur(20px)" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/leg/XO_Low_Rocker_Bottom_4_1.png" alt="How it works"
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


      {/* ══ CTA ══ */}
      <section className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(150deg,#f0f0ff 0%,#e8e8ff 50%,#f5f8ff 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center,rgba(17,17,132,0.07) 0%,transparent 65%)" }} />
        <div className="relative z-10 max-w-xl mx-auto px-6 flex flex-col items-center text-center gap-6">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "rgba(17,17,132,0.45)" }} />
          <h2 className="font-nexa uppercase leading-tight" style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 800, color: "#0d1535", letterSpacing: "-0.5px" }}>
            Ready to start your <span style={{ color: "#111184" }}>recovery journey?</span>
          </h2>
          <p className="text-[#3a4a6b] text-base leading-relaxed">Connect with our team to find the right orthopedic solution for your needs.</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a href="/contact" className="cursor-pointer group duration-300 transition-all w-fit rounded-full bg-[#1651D1]/30 hover:bg-[#1651D1]/50 backdrop-blur-2xl border border-white/30 p-1.5 relative overflow-hidden">
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