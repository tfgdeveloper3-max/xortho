"use client";
import { CLD } from "@/lib/cloudinary";

import Image from "next/image";
import MyButton from "../my-button";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function XbootSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const normalRef = useRef<HTMLDivElement>(null);
  const painRef = useRef<HTMLDivElement>(null);
  const healedImgRef = useRef<HTMLDivElement>(null);
  const healedGlowRef = useRef<HTMLDivElement>(null);
  const painGlowRef = useRef<HTMLDivElement>(null);
  const bootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const loopRef = useRef<gsap.core.Tween | null>(null);
  const heartbeatRef = useRef<gsap.core.Tween | null>(null);
  const hasStartedRef = useRef(false);

  const [phase, setPhase] = useState<"idle" | "pain" | "healing">("idle");

  useEffect(() => {
    function getSectionIdx() {
      const section = sectionRef.current!;
      const wrapper = section?.parentElement;
      const container = wrapper?.parentElement;
      if (!container) return -1;
      return Array.from(container.children).indexOf(wrapper!);
    }

    function resetAll() {
      gsap.set([normalRef.current, painRef.current, healedImgRef.current, bootRef.current, healedGlowRef.current],
        { opacity: 0, clearProps: "transform,clipPath,scale,y,x" });
      gsap.set(indicatorRef.current, { width: "0%" });
    }

    function buildHealTimeline(): gsap.core.Timeline {
      const tl = gsap.timeline({ paused: true });
      tl.fromTo(normalRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 2.0 }, 0);
      tl.to(normalRef.current, { opacity: 0, duration: 1.2 }, 1.5);
      tl.fromTo(painRef.current, { opacity: 0 }, { opacity: 1, duration: 2.0 }, 2.0);
      tl.fromTo(bootRef.current, { opacity: 0, y: 60, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 3.0, ease: "power1.out" }, 4.0);
      tl.fromTo(healedImgRef.current, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 2.5, ease: "power1.out" }, 5.0);
      tl.fromTo(healedGlowRef.current, { opacity: 0 }, { opacity: 1, duration: 1.8 }, 5.0);
      tl.to(painRef.current, { opacity: 0, duration: 1.5 }, 5.5);
      tl.fromTo(indicatorRef.current, { width: "0%" }, { width: "100%", duration: 12.0, ease: "none" }, 0);
      return tl;
    }

    function startLoop() {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;
      resetAll();
      const tl = buildHealTimeline();
      tlRef.current = tl;
      const PAIN_START = 2.3 / 12;
      const HEALING_START = 7.2 / 12;
      const proxy = { p: 0 };
      let prevP = 0;
      function updatePhase(p: number) {
        const goingForward = p >= prevP;
        prevP = p;
        if (goingForward) {
          if (p >= HEALING_START) setPhase("healing");
          else if (p >= PAIN_START) setPhase("pain");
          else setPhase("idle");
        } else {
          if (p < HEALING_START - 0.05) setPhase("pain");
          if (p < PAIN_START - 0.05) setPhase("idle");
        }
      }
      function playForward() {
        loopRef.current = gsap.to(proxy, {
          p: 1, duration: 14, ease: "sine.inOut",
          onUpdate: (): void => { tl.progress(proxy.p); updatePhase(proxy.p); },
          onComplete: (): void => { playBackward(); },
        });
      }
      function playBackward() {
        loopRef.current = gsap.to(proxy, {
          p: 0, duration: 14, ease: "sine.inOut",
          onUpdate: (): void => { tl.progress(proxy.p); updatePhase(proxy.p); },
          onComplete: (): void => { setPhase("idle"); playForward(); },
        });
      }
      playForward();
    }

    function handleReveal(e: Event) {
      const custom = e as CustomEvent;
      if (custom.detail.index !== getSectionIdx()) return;
      startLoop();
    }

    window.addEventListener("sectionRevealed", handleReveal);
    return () => {
      tlRef.current?.kill();
      loopRef.current?.kill();
      window.removeEventListener("sectionRevealed", handleReveal);
    };
  }, []);

  useEffect(() => {
    heartbeatRef.current?.kill();
    if (phase === "pain") {
      const proxy = { v: 1 };
      const el = painRef.current;
      const setFilter = (v: number) => {
        if (!el) return;
        el.style.filter = `drop-shadow(0 0 ${18 * v}px rgba(239,68,68,${0.95 * v})) drop-shadow(0 0 ${40 * v}px rgba(239,68,68,${0.5 * v})) drop-shadow(0 0 ${70 * v}px rgba(239,68,68,${0.25 * v}))`;
      };
      setFilter(1);
      heartbeatRef.current = gsap.to(proxy, {
        v: 0.08, duration: 0.3, ease: "power2.in", yoyo: true, repeat: -1, repeatDelay: 0.55,
        onUpdate: () => setFilter(proxy.v),
      });
    } else {
      if (painRef.current) painRef.current.style.filter = "none";
    }
  }, [phase]);

  const isPain = phase === "pain";
  const isHealing = phase === "healing";
  const labelColor = isPain ? "#ef4444" : isHealing ? "#22c55e" : "#ef4444";
  const labelText = isPain ? "\u26a0 Pain Phase" : isHealing ? "\u2736 Recovery Phase" : "Pain \u2192 Recovery";

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex items-center bg-white" style={{ overflow: "hidden" }}>
      <div className="absolute bottom-0 w-full h-[55%] md:top-0 md:right-0 md:w-[60%] md:h-full bg-[#F2F4F8] z-0 md:[clip-path:polygon(10%_0,100%_0,100%_100%,0%_100%)]" />
      <div ref={painGlowRef} className="absolute inset-0 pointer-events-none z-0"
        style={{ opacity: 0, background: "radial-gradient(ellipse at 30% 55%, rgba(255,80,0,0.18) 0%, rgba(255,80,0,0.06) 50%, transparent 75%)" }} />
      <div ref={healedGlowRef} className="absolute inset-0 pointer-events-none z-0"
        style={{ opacity: 0, background: "radial-gradient(ellipse at 30% 55%, rgba(34,197,94,0.18) 0%, rgba(34,197,94,0.06) 50%, transparent 75%)" }} />

      <div className="container mx-auto px-5 md:px-[100px] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-0 items-center">
          <div className="relative w-full h-[550px] md:h-[750px]">
            <div className="absolute inset-0">
              <div className="absolute inset-0" style={{ zIndex: 0 }}>
                <Image src={CLD.legNormal} alt="" fill className="object-contain object-bottom" priority />
              </div>
              <div ref={normalRef} className="absolute inset-0 opacity-0" style={{ zIndex: 1 }}>
                <Image src={CLD.legNormal} alt="Normal leg" fill className="object-contain object-bottom" priority />
              </div>
              <div ref={painRef} className="absolute inset-0 opacity-0" style={{ zIndex: 2 }}>
                <Image src={CLD.legPain} alt="Pain leg" fill className="object-contain object-bottom" />
              </div>
              <div ref={bootRef} className="absolute inset-0 opacity-0" style={{ zIndex: 4 }}>
                <Image src={CLD.shoe} alt="XO Boot Pneumatic" fill className="object-contain object-bottom" />
              </div>
              <div ref={healedImgRef} className="absolute inset-0 opacity-0" style={{ zIndex: 3 }}>
                <Image src={CLD.legHealed} alt="Healed leg" fill className="object-contain object-bottom" />
              </div>
            </div>
          </div>

          <div ref={contentRef} className="flex flex-col gap-6 pl-8 md:pl-16 pr-4 md:pr-10 py-16 md:py-20">
            <span className="text-xs uppercase tracking-widest font-semibold transition-all duration-500"
              style={{
                color: labelColor,
                textShadow: isPain ? "0 0 12px rgba(239,68,68,0.8), 0 0 24px rgba(239,68,68,0.4)"
                  : isHealing ? "0 0 12px rgba(34,197,94,0.8), 0 0 24px rgba(34,197,94,0.4)" : "none",
              }}>
              {labelText}
            </span>

            <h2 className="text-4xl md:text-5xl font-bold uppercase text-primary leading-tight">
              XO Boot <br /><span className="text-primary">Pneumatic</span>
            </h2>

            <div className="flex flex-col text-base md:text-lg leading-relaxed gap-1 transition-all duration-500"
              style={{
                color: isPain ? "rgba(239,68,68,0.85)" : isHealing ? "rgba(34,197,94,0.85)" : "#4A5568",
                textShadow: isPain ? "0 0 8px rgba(239,68,68,0.25)" : isHealing ? "0 0 8px rgba(34,197,94,0.25)" : "none",
              }}>
              {isPain && (
                <p className="text-sm font-semibold text-red-500 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" />
                  Active pain — stabilization needed
                </p>
              )}
              {isHealing && (
                <p className="text-sm font-semibold text-green-500 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
                  Recovery in progress — boot applied
                </p>
              )}
              <p>World class aerodynamic shell — short leg cast-like stability beyond any walking boot available.</p>
              <p>Revolutionary compartmentalized pneumatic compression with EZ adjust bulb and intuitive inflate/deflate valve.</p>
              <p>Real rocker sole supports natural gait from heel strike to toe off.</p>
              <p>Seamless micro-fiber liner — T-shirt soft, wicking, designed for patient comfort and compliance.</p>
              <p>4-strap system with 360° swivel D-rings and easy grip rubber tips.</p>
            </div>

            <div className="pt-4"><MyButton /></div>

            <div className="flex flex-col gap-2 mt-2">
              <div className="flex justify-between text-xs text-gray-400 uppercase tracking-widest">
                <span style={{ color: isPain ? "#ef4444" : "#9ca3af" }}>Pain</span>
                <span style={{ color: isHealing ? "#22c55e" : "#9ca3af" }}>Recovery</span>
              </div>
              <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <div ref={indicatorRef} className="h-full rounded-full"
                  style={{ width: "0%", background: "linear-gradient(to right, #ef4444, #f97316, #eab308, #22c55e)" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}