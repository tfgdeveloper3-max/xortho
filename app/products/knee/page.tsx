"use client";
import { CLD } from "@/lib/cloudinary";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Star, ShieldCheck, Gauge, Activity, Zap, ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/navbar";
import StickyButtons from "@/components/sticky-buttons";
import Footer from "@/components/footer";

gsap.registerPlugin(ScrollTrigger);

const P = "#111184";
const PL = "#1a1aaa";
const PD = "#0d0d6b";

const features = [
  { label: "Unloader Hinge System", desc: "Dual-upright unloader hinges shift the load away from the affected knee compartment, directly reducing bone-on-bone pressure and joint pain with every step." },
  { label: "Pulley Strap Closure", desc: "Advanced pulley-assisted closure system delivers precise, consistent compression along the entire knee with a single pull — no Velcro fumbling or uneven tension." },
  { label: "Low-Profile Carbon Frame", desc: "Ultra-lightweight carbon composite frame maintains structural rigidity while keeping the total brace weight under 600 g, allowing all-day wear without fatigue." },
  { label: "Anatomic Condyle Pads", desc: "Contoured medial and lateral condyle pads distribute pressure evenly across the bony prominences, eliminating the pressure points that cause discomfort during extended use." },
];

const benefits = [
  { icon: <ShieldCheck className="w-5 h-5" />, title: "OA Pain Relief", desc: "Clinical-grade unloading reduces intra-articular pressure on the affected compartment, providing measurable pain reduction for medial or lateral osteoarthritis patients." },
  { icon: <Gauge className="w-5 h-5" />, title: "Adjustable Valgus / Varus", desc: "Clinician-adjustable correction angle allows the degree of unloading to be tuned to each patient's X-ray findings and symptom severity." },
  { icon: <Activity className="w-5 h-5" />, title: "Improved Mobility", desc: "By reducing pain and instability, patients achieve greater confidence in movement — enabling more consistent participation in physiotherapy and daily activities." },
  { icon: <Zap className="w-5 h-5" />, title: "Rapid Donning & Doffing", desc: "The pulley closure and single-buckle shin strap mean the brace can be put on or removed in under 60 seconds — critical for elderly patients with limited dexterity." },
];

const steps = [
  { num: "01", title: "Fit the Frame", desc: "Slide the brace up the leg and position the hinge centre directly over the lateral joint line of the knee." },
  { num: "02", title: "Tighten the Straps", desc: "Close the thigh and shin straps first, then pull the pulley cord to dial in the desired compression and correction angle." },
  { num: "03", title: "Calibrate the Unloader", desc: "Using the hex key provided, adjust the valgus/varus correction dial until the prescribed offload angle is achieved for maximum relief." },
];

const reviews = [
  { name: "Patricia H.", location: "Illinois", days: "1 day ago", rating: 5, text: "I was facing knee replacement surgery and decided to try this brace first. Within two weeks the pain had reduced enough to walk my dog again. Incredible result." },
  { name: "David N.", location: "Georgia", days: "6 days ago", rating: 5, text: "The pulley system is brilliant — I can get the exact compression I need every time without any fuss. My physio was impressed with how well it held the correction angle." },
  { name: "Susan O.", location: "Washington", days: "3 days ago", rating: 4, text: "Lighter than any OA brace I have tried. It fits under wide-leg trousers and I forget I am wearing it by mid-morning. My knee pain has reduced noticeably." },
];

/* ── Before/After Slider ── */
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
      style={{ height: 580, background: "#ffffff", boxShadow: `0 8px 48px rgba(17,17,132,0.22), 0 0 0 1px rgba(17,17,132,0.10)`, border: `1px solid rgba(17,17,132,0.10)` }}
      onMouseMove={e => { if (dragging.current) setSliderX(calcPercent(e.clientX)); }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchMove={e => setSliderX(calcPercent(e.touches[0].clientX))}
      onTouchEnd={() => { dragging.current = false; }}>

      <div className="absolute pointer-events-none" style={{ left: "-5%", top: "50%", transform: "translateY(-50%)", width: "55%", height: "80%", background: `radial-gradient(ellipse, rgba(17,17,132,0.12) 0%, transparent 70%)`, filter: "blur(32px)", zIndex: 0 }} />
      <div className="absolute pointer-events-none" style={{ right: "-5%", top: "50%", transform: "translateY(-50%)", width: "55%", height: "80%", background: `radial-gradient(ellipse, rgba(17,17,132,0.09) 0%, transparent 70%)`, filter: "blur(32px)", zIndex: 0 }} />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={CLD.kneeBrace} alt="Product" className="absolute inset-0 w-full h-full object-contain pointer-events-none" style={{ zIndex: 1, padding: "28px" }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={CLD.kneeBraceBlueprint} alt="Blueprint" className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        style={{ clipPath: `inset(0 0 0 ${sliderX}%)`, zIndex: 2, filter: "brightness(0.88)", padding: "28px" }} />

      <div className="absolute top-0 bottom-0 z-10 pointer-events-none"
        style={{ left: `${sliderX}%`, width: 2, background: `linear-gradient(to bottom, transparent 0%, ${P} 15%, ${P} 85%, transparent 100%)`, boxShadow: `0 0 12px rgba(17,17,132,0.5)` }} />

      <div className="absolute top-1/2 z-20 flex items-center justify-center"
        style={{ left: `${sliderX}%`, transform: "translate(-50%,-50%)", width: 46, height: 46, borderRadius: "50%", background: "white", boxShadow: `0 4px 24px rgba(17,17,132,0.40), 0 0 0 2px rgba(17,17,132,0.15)`, cursor: "col-resize" }}
        onMouseDown={() => { dragging.current = true; }}
        onTouchStart={() => { dragging.current = true; }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 5L3 10L7 15" stroke={P} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 5L17 10L13 15" stroke={P} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="absolute bottom-5 left-5 z-10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
        style={{ background: `rgba(17,17,132,0.10)`, color: P, border: `1px solid rgba(17,17,132,0.20)` }}>Product</div>
      <div className="absolute bottom-5 right-5 z-10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
        style={{ background: `rgba(17,17,132,0.85)`, color: "white" }}>Blueprint</div>
    </div>
  );
}

/* ── Main Page ── */
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

export default function KneeBracePage() {
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
          <source src={CLD.sectionhero} type="video/mp4" />
        </video>
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "linear-gradient(135deg,rgba(2,9,22,0.90) 0%,rgba(2,9,22,0.55) 55%,transparent 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, backgroundImage: `linear-gradient(rgba(17,17,132,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.05) 1px,transparent 1px)`, backgroundSize: "52px 52px" }} />

        <div className="relative w-full container mx-auto px-5 md:px-[100px]" style={{ zIndex: 2, paddingTop: "max(140px,14vh)", paddingBottom: 80 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col gap-5">
              <div className="hanim" style={{ opacity: 0 }}>
                <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.38em] font-bold px-3.5 py-1.5 rounded-full"
                  style={{ background: "rgba(17,17,132,0.18)", color: "#8888ff", border: "1px solid rgba(17,17,132,0.35)" }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#8888ff" }} />
                  Osteoarthritis
                </span>
              </div>
              <div className="hanim" style={{ opacity: 0 }}>
                <h1 className="font-nexa uppercase leading-[0.95] text-[#f0f4ff]" style={{ fontSize: "clamp(2.6rem,6vw,5.5rem)", fontWeight: 800, letterSpacing: "-3px" }}>
                  Knee Brace<br /><span style={{ color: "#7b7bff" }}>OA</span>
                </h1>
              </div>
              <p className="hanim text-xs font-semibold uppercase tracking-widest" style={{ opacity: 0, color: "#7b7bff" }}>Osteoarthritis Support Brace</p>
              <p className="hanim text-base leading-relaxed text-white/55 border-l-[3px] pl-3.5" style={{ opacity: 0, borderColor: "rgba(17,17,132,0.45)" }}>
                Clinically designed to unload the affected knee compartment and reduce osteoarthritis pain, the Knee Brace OA combines a carbon composite frame with a precision pulley closure system for all-day support and comfort.
              </p>
              <div className="hanim flex items-center gap-4 flex-wrap" style={{ opacity: 0 }}>
                <a href="#contact" className="cursor-pointer group duration-300 transition-all w-fit rounded-full bg-[#1651D1]/30 hover:bg-[#1651D1]/50 backdrop-blur-2xl border border-white/30 p-1.5 relative overflow-hidden">
                  <div className="absolute top-0 left-[5%] group-hover:left-[80%] duration-300 transition-all h-full w-10 bg-[#1651D1]/50 rounded-[200%] blur" />
                  <div className="flex items-center bg-white rounded-full px-4 py-2 md:px-5 md:py-3 relative z-10">
                    <span className="text-base font-semibold">Request Info</span> <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </a>
                <a href="/products" className="text-sm font-semibold flex items-center gap-1.5 transition-colors" style={{ color: "rgba(136,136,255,0.5)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#8888ff"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(136,136,255,0.5)"; }}>
                  All Products <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div ref={heroImgRef} className="hanim relative flex items-center justify-center" style={{ opacity: 0, height: 580, paddingLeft: 50, paddingBottom: 50 }}>
              <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at center 60%,rgba(17,17,132,0.35) 0%,transparent 65%)`, filter: "blur(24px)" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CLD.kneeBrace} alt="Knee Brace OA"
                style={{ position: "relative", zIndex: 1, maxHeight: "100%", maxWidth: "90%", objectFit: "contain", filter: `drop-shadow(0 32px 64px rgba(17,17,132,0.50)) drop-shadow(0 4px 16px rgba(0,0,0,0.40))` }} />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none" style={{ zIndex: 2, background: "linear-gradient(to bottom,transparent,#020916)" }} />
      </section>


      {/* ══ SECTION 2 — FEATURES + SLIDER ══ */}
      <section className="relative w-full py-20 md:py-28 overflow-hidden" style={{ background: "#f5f5ff" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 68% 52%, rgba(17,17,132,0.08) 0%, transparent 58%)` }} />
        <div className="container mx-auto px-5 md:px-[100px] relative z-10">
          <div className="sr text-center mb-12" style={{ opacity: 0 }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d1535] leading-tight">
              Knee Brace <span style={{ color: P }}>OA</span>
            </h2>
            <p className="mt-4 max-w-lg mx-auto text-sm sm:text-base text-[#6b7fa8] leading-relaxed">
              Clinically designed to unload the affected knee compartment and reduce osteoarthritis pain with precision pulley closure.
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
                      background: on ? `linear-gradient(135deg,${PL},${P})` : "#ffffff",
                      boxShadow: on ? `0 8px 28px rgba(17,17,132,0.28)` : "0 2px 12px rgba(0,0,0,0.06)",
                      minHeight: 72,
                    }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: on ? "rgba(255,255,255,0.18)" : "rgba(17,17,132,0.08)" }}>
                      <Check className="w-5 h-5" style={{ color: on ? "#fff" : P }} />
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


      {/* ══ SECTION 3 — ENGINEERING ══ */}
      <section className="relative w-full overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(108deg, #ffffff 46%, #f0f0f8 46%)" }} />
        <div className="container mx-auto px-5 md:px-[100px] relative z-10 py-20 md:py-28">
          <div className="sr grid grid-cols-1 md:grid-cols-2 gap-14 items-center" style={{ opacity: 0 }}>
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d1535] leading-tight">
                Engineered for<br /><span style={{ color: P }}>Osteoarthritis Relief</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#4A5568] leading-relaxed">
                Developed alongside orthopaedic surgeons and rheumatologists, the Knee Brace OA is PDAC approved under L1851 and designed to delay or eliminate the need for surgical intervention in mild-to-moderate OA. The unloader hinge system was engineered using finite element analysis to achieve the optimal force vector for medial or lateral compartment offloading. Available in medial and lateral unloader configurations, the brace accommodates both varus and valgus deformities from 0° to 8° of correction — covering the vast majority of clinical presentations without custom fabrication.
              </p>
            </div>
            <div className="relative flex items-center justify-center" style={{ minHeight: 400 }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
                style={{ width: "80%", height: "28%", background: `radial-gradient(ellipse, rgba(17,17,132,0.18) 0%, transparent 70%)`, filter: "blur(22px)" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CLD.kneeBraceSide} alt="Knee brace side view"
                style={{ maxHeight: 560, maxWidth: "110%", objectFit: "contain", position: "relative", zIndex: 1, filter: `drop-shadow(0 18px 48px rgba(17,17,132,0.20)) drop-shadow(0 4px 18px rgba(0,0,0,0.12))` }} />
            </div>
          </div>
        </div>
      </section>


      {/* ══ SECTION 4 — STRAPPING ══ */}
      <section className="relative w-full overflow-hidden min-h-[560px] flex items-stretch">
        <div className="absolute inset-0 z-0 bg-white" />
        <div className="absolute inset-0 z-0 bg-[#eeeef6]" style={{ clipPath: "polygon(0 0, 38.5% 0, 54.1% 100%, 0 100%)" }} />
        <div className="container mx-auto px-5 md:px-[100px] relative z-10 py-20 md:py-28 w-full">
          <div className="sr grid grid-cols-1 md:grid-cols-2 gap-14 items-center" style={{ opacity: 0 }}>
            <div className="relative flex items-center justify-center" style={{ minHeight: 420 }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
                style={{ width: "80%", height: "30%", background: `radial-gradient(ellipse, rgba(17,17,132,0.15) 0%, transparent 70%)`, filter: "blur(20px)", zIndex: 0 }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CLD.kneeBraceStrap} alt="Knee brace strap detail"
                style={{ height: 420, maxWidth: "100%", objectFit: "contain", position: "relative", zIndex: 1, filter: `drop-shadow(0 20px 48px rgba(17,17,132,0.22)) drop-shadow(0 4px 18px rgba(0,0,0,0.12))` }} />
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d1535] leading-tight">
                Precision Closure,<br />
                Consistent<br />
                Compression
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#4A5568] leading-relaxed">
                The pulley strap closure replaces traditional Velcro with a mechanical advantage system that multiplies the user's input force, delivering firm, even compression across the entire knee with a single smooth pull. Four anatomically shaped straps — two above and two below the joint line — ensure the frame stays in place during walking, stair climbing, and lateral movement. Anti-migration tabs on the inner face of each strap anchor the brace against the limb, eliminating the distal sliding that affects conventional knee braces during dynamic activities.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ══ SECTION 4b — COMFORT ══ */}
      <section className="relative w-full overflow-hidden min-h-[480px] flex items-stretch">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-white" style={{ clipPath: "polygon(0 0, 54% 0, 42% 100%, 0 100%)" }} />
          <div className="absolute inset-0 bg-[#f0f0f8]" style={{ clipPath: "polygon(54% 0, 100% 0, 100% 100%, 42% 100%)" }} />
        </div>
        <div className="container mx-auto px-5 md:px-[100px] relative z-10 py-20 md:py-28 w-full">
          <div className="sr grid grid-cols-1 md:grid-cols-2 gap-14 items-center" style={{ opacity: 0 }}>
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d1535] leading-tight">
                <span style={{ color: P }}>Low Profile,</span> All-Day Wearability
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#4A5568] leading-relaxed">
                At just 8 mm in maximum profile, the carbon frame sits close to the leg and fits beneath standard-width trouser legs without bunching or discomfort. Perforated neoprene inner sleeves wick moisture away from the popliteal fossa and medial/lateral condyle areas — the regions most prone to heat build-up during extended wear. The hinge cover is moulded from a soft-touch thermoplastic that prevents the metal mechanism from contacting adjacent skin during deep knee flexion, making the brace comfortable during seated work, driving, and low-impact exercise.
              </p>
            </div>
            <div className="relative flex items-center justify-center" style={{ minHeight: 360 }}>
              <div className="absolute pointer-events-none"
                style={{ bottom: "5%", left: "50%", transform: "translateX(-50%)", width: "70%", height: "40%", background: `radial-gradient(ellipse, rgba(17,17,132,0.18) 0%, transparent 70%)`, filter: "blur(22px)", zIndex: 0 }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CLD.kneeBraceWorn} alt="Knee brace being worn"
                style={{ maxHeight: 380, maxWidth: "85%", objectFit: "contain", position: "relative", zIndex: 1, filter: `drop-shadow(0 20px 48px rgba(17,17,132,0.24)) drop-shadow(0 4px 16px rgba(0,0,0,0.12))` }} />
            </div>
          </div>
        </div>
      </section>


      {/* ══ QUALITY CARE 4 CARDS ══ */}
      <section className="relative w-full py-20 md:py-28 overflow-hidden" style={{ background: "linear-gradient(160deg,#eeeeff 0%,#e6e6fa 45%,#f5f5ff 100%)" }}>
        <div className="container mx-auto px-5 md:px-[100px]">
          <div className="sr text-center mb-14" style={{ opacity: 0 }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d1535] leading-tight">
              Quality Care, Delivered <span style={{ color: P }}>Efficiently</span>
            </h2>
          </div>
          <div className="sr grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ opacity: 0 }}>
            {benefits.map((b, i) => {
              const on = activeBenefit === i;
              return (
                <div key={i} onClick={() => setActiveBenefit(i)}
                  className="rounded-2xl p-6 flex flex-col gap-3 cursor-pointer transition-all duration-300"
                  style={{ background: on ? `linear-gradient(145deg,${PL},${P})` : "#ffffff", boxShadow: on ? `0 12px 36px rgba(17,17,132,0.26)` : "0 2px 14px rgba(0,0,0,0.06)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: on ? "rgba(255,255,255,0.16)" : "rgba(17,17,132,0.08)", color: on ? "#fff" : P }}>
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
                style={{ bottom: "8%", left: "50%", transform: "translateX(-50%)", width: "55%", height: "35%", background: `radial-gradient(ellipse, rgba(17,17,132,0.16) 0%, transparent 70%)`, filter: "blur(20px)" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CLD.kneeBrace} alt="How it works"
                style={{ position: "relative", zIndex: 1, maxHeight: 400, objectFit: "contain", filter: "drop-shadow(0 8px 28px rgba(0,0,0,0.12))" }} />
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d1535] leading-tight">
                How It <span style={{ color: P }}>Works</span>
              </h2>
              <div className="flex flex-col gap-3 mt-1">
                {steps.map((s) => (
                  <div key={s.num} className="flex gap-4 p-5 rounded-2xl"
                    style={{ background: "#f8f8ff", border: `1px solid rgba(17,17,132,0.07)`, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-sm font-bold"
                      style={{ background: `linear-gradient(135deg,${PL},${P})`, boxShadow: `0 4px 14px rgba(17,17,132,0.28)` }}>
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
      <section className="relative w-full py-20 md:py-28 overflow-hidden" style={{ background: "linear-gradient(160deg,#eeeeff 0%,#e6e6fa 45%,#f5f5ff 100%)" }}>
        <div className="container mx-auto px-5 md:px-[100px]">
          <div className="sr text-center mb-14" style={{ opacity: 0 }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0d1535] leading-tight">
              What Our <span style={{ color: P }}>Customers</span> Say
            </h2>
          </div>
          <div className="sr grid grid-cols-1 md:grid-cols-3 gap-5" style={{ opacity: 0 }}>
            {reviews.map((r, i) => (
              <div key={i} className="rounded-2xl p-6 flex flex-col gap-4 bg-white transition-all duration-300"
                style={{ boxShadow: "0 4px 18px rgba(0,0,0,0.06)" }}
                onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = "translateY(-4px)"; d.style.boxShadow = `0 14px 40px rgba(17,17,132,0.11)`; }}
                onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.transform = ""; d.style.boxShadow = "0 4px 18px rgba(0,0,0,0.06)"; }}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ background: `linear-gradient(135deg,${PL},${P})` }}>
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
                <button className="text-sm font-bold text-left" style={{ color: P }}>Read more</button>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══ CTA ══ */}
      <section className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(150deg,#f0f0ff 0%,#e8e8ff 50%,#f5f5ff 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at center,rgba(17,17,132,0.07) 0%,transparent 65%)` }} />
        <div className="relative z-10 max-w-xl mx-auto px-6 flex flex-col items-center text-center gap-6">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: `rgba(17,17,132,0.45)` }} />
          <h2 className="font-nexa uppercase leading-tight" style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 800, color: "#0d1535", letterSpacing: "-0.5px" }}>
            Ready to start your <span style={{ color: P }}>recovery journey?</span>
          </h2>
          <p className="text-[#3a4a6b] text-base leading-relaxed">Connect with our team to find the right orthopedic solution for your needs.</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a href="#contact" className="cursor-pointer group duration-300 transition-all w-fit rounded-full bg-[#1651D1]/30 hover:bg-[#1651D1]/50 backdrop-blur-2xl border border-white/30 p-1.5 relative overflow-hidden">
              <div className="absolute top-0 left-[5%] group-hover:left-[80%] duration-300 transition-all h-full w-10 bg-[#1651D1]/50 rounded-[200%] blur" />
              <div className="flex items-center bg-white rounded-full px-4 py-2 md:px-5 md:py-3 relative z-10">
                <span className="text-base font-semibold">Contact Us</span> <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </a>
            <a href="/" className="text-sm font-semibold uppercase tracking-widest transition-colors" style={{ color: `rgba(17,17,132,0.38)` }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = P; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = `rgba(17,17,132,0.38)`; }}>
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