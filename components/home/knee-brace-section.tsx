"use client";

import Image from "next/image";
import MyButton from "../my-button";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function KneeBraceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const normalRef = useRef<HTMLDivElement>(null);
  const painRef = useRef<HTMLDivElement>(null);
  const healedImgRef = useRef<HTMLDivElement>(null);
  const braceRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const painGlowRef = useRef<HTMLDivElement>(null);
  const healedGlowRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const loopRef = useRef<gsap.core.Tween | null>(null);
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
      gsap.set([
        normalRef.current, painRef.current, healedImgRef.current,
        braceRef.current, healedGlowRef.current, painGlowRef.current,
      ], { opacity: 0, clearProps: "transform,clipPath,scale,y,x" });
      gsap.set(contentRef.current, { opacity: 0, y: 40 });
      gsap.set(indicatorRef.current, { width: "0%" });
    }

    function buildHealTimeline(): gsap.core.Timeline {
      const tl = gsap.timeline({ paused: true });

      tl.fromTo(normalRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 2.0 }, 0);
      tl.to(normalRef.current, { opacity: 0, duration: 1.2 }, 1.5);
      tl.fromTo(painRef.current, { opacity: 0, scale: 1.02 }, { opacity: 1, scale: 1, duration: 2.0 }, 2.0);
      tl.fromTo(painGlowRef.current, { opacity: 0 }, { opacity: 1, duration: 1.2 }, 2.0);
      tl.to(painRef.current, { scale: 1.03, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, 2.8);

      tl.fromTo(braceRef.current,
        { opacity: 0, y: 30, scale: 0.97, clipPath: "inset(20% 0% 0% 0%)" },
        { opacity: 1, y: 0, scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 3.0, ease: "power1.out" }, 4.0);

      tl.to(painRef.current, { opacity: 0, duration: 1.2 }, 5.5);
      tl.to(painGlowRef.current, { opacity: 0, duration: 1.2 }, 5.5);

      tl.fromTo(healedImgRef.current, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 2.5, ease: "power1.out" }, 6.0);
      tl.fromTo(healedGlowRef.current, { opacity: 0 }, { opacity: 1, duration: 1.8 }, 6.0);

      tl.fromTo(indicatorRef.current, { width: "0%" }, { width: "100%", duration: 12.0, ease: "none" }, 0);

      return tl;
    }

    function startLoop() {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;

      resetAll();
      gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 1.4, ease: "power2.out", delay: 0.3 });

      const tl = buildHealTimeline();
      tlRef.current = tl;

      const PAIN_START = 2 / 12;
      const HEALING_START = 6 / 12;

      const proxy = { p: 0 };

      let prevP = 0;
      function updatePhase(p: number) {
        const goingForward = p >= prevP;
        prevP = p;
        if (goingForward) {
          // Forward: pain starts at PAIN_START, healing at HEALING_START
          if (p >= HEALING_START) setPhase("healing");
          else if (p >= PAIN_START) setPhase("pain");
          else setPhase("idle");
        } else {
          // Backward: only clear phase when well past the boundary (add hysteresis)
          if (p < HEALING_START - 0.05) setPhase("pain");
          if (p < PAIN_START - 0.05) setPhase("idle");
        }
      }

      function playForward() {
        loopRef.current = gsap.to(proxy, {
          p: 1, duration: 12, ease: "sine.inOut",
          onUpdate: (): void => { tl.progress(proxy.p); updatePhase(proxy.p); },
          onComplete: (): void => { playBackward(); },
        });
      }

      function playBackward() {
        loopRef.current = gsap.to(proxy, {
          p: 0, duration: 12, ease: "sine.inOut",
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

  const isPain = phase === "pain";
  const isHealing = phase === "healing";

  const contentGlow = isPain
    ? "0 0 60px 10px rgba(239,68,68,0.18), 0 0 120px 30px rgba(239,68,68,0.08)"
    : isHealing
    ? "0 0 60px 10px rgba(34,197,94,0.18), 0 0 120px 30px rgba(34,197,94,0.08)"
    : "none";

  const contentBorder = isPain
    ? "1px solid rgba(239,68,68,0.20)"
    : isHealing
    ? "1px solid rgba(34,197,94,0.20)"
    : "1px solid transparent";

  const labelColor = isPain ? "#ef4444" : isHealing ? "#22c55e" : "#ef4444";
  const labelText = isPain ? "⚠ Pain Phase" : isHealing ? "✦ Recovery Phase" : "Pain → Recovery";

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center bg-white"
      style={{ overflow: "hidden" }}
    >
      <div className="absolute bottom-0 w-full h-[55%] md:top-0 md:right-0 md:w-[65%] md:h-full bg-[#F2F4F8] z-10 md:[clip-path:polygon(20%_0,100%_0,100%_100%,0%_100%)] pointer-events-none" />
      <div ref={painGlowRef} className="absolute inset-0 pointer-events-none z-0"
        style={{ opacity: 0, background: "radial-gradient(ellipse at 30% 55%, rgba(255,80,0,0.18) 0%, rgba(255,80,0,0.06) 50%, transparent 75%)" }} />
      <div ref={healedGlowRef} className="absolute inset-0 pointer-events-none z-0"
        style={{ opacity: 0, background: "radial-gradient(ellipse at 30% 55%, rgba(34,197,94,0.18) 0%, rgba(34,197,94,0.06) 50%, transparent 75%)" }} />

      <div className="container mx-auto relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Image side */}
          <div className="relative w-[98%] h-[380px] md:h-[620px] mx-auto md:mx-0">
            <div ref={normalRef} className="absolute inset-0 opacity-0">
              <Image src="/images/knee_brace/knee-normal.png" alt="Normal knee" fill className="object-contain object-center" priority />
            </div>
            <div ref={painRef} className="absolute inset-0 opacity-0">
              <Image src="/images/knee_brace/knee-pain.png" alt="Knee pain" fill className="object-contain object-center" />
            </div>
            <div ref={braceRef} className="absolute inset-0 opacity-0" style={{ zIndex: 3 }}>
              <div className="relative w-full h-full" style={{ mixBlendMode: "multiply" }}>
                <Image src="/images/knee_brace/knee-brace.png" alt="Knee Brace" fill className="object-contain object-center" />
              </div>
            </div>
            <div ref={healedImgRef} className="absolute inset-0 opacity-0" style={{ zIndex: 2 }}>
              <Image src="/images/knee_brace/knee-healed.png" alt="Healed knee" fill className="object-contain object-center" />
            </div>
          </div>

          {/* Content side with dynamic glow */}
          <div
            ref={contentRef}
            className="flex flex-col gap-6 md:pl-10 py-20 relative z-20 px-5 md:px-[100px] rounded-3xl transition-all duration-700"
            style={{
              opacity: 0,
              transform: "translateY(40px)",
              boxShadow: contentGlow,
              border: contentBorder,
            }}
          >
            <span
              className="text-xs uppercase tracking-widest font-semibold transition-all duration-500"
              style={{ color: labelColor }}
            >
              {labelText}
            </span>

            <h2 className="text-4xl md:text-5xl font-bold uppercase text-primary leading-tight">
              Knee Brace <br /><span className="text-primary">Osteoarthritis</span>
            </h2>

            <div
              className="flex flex-col text-[#4A5568] text-base md:text-xl leading-relaxed gap-1 transition-all duration-500 rounded-2xl"
              style={{
                background: isPain ? "rgba(239,68,68,0.04)" : isHealing ? "rgba(34,197,94,0.04)" : "transparent",
                padding: isPain || isHealing ? "16px" : "0",
                border: isPain
                  ? "1px solid rgba(239,68,68,0.12)"
                  : isHealing
                  ? "1px solid rgba(34,197,94,0.12)"
                  : "1px solid transparent",
              }}
            >
              {isPain && (
                <p className="text-sm font-semibold text-red-500 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" />
                  Active pain — knee stabilization needed
                </p>
              )}
              {isHealing && (
                <p className="text-sm font-semibold text-green-500 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
                  Recovery in progress — brace applied
                </p>
              )}
              <p>An advanced pulley system allows for tailored compression.</p>
              <p>Low profile design allows support to fit comfortably under clothing.</p>
              <p>Vertical stays provide structural integrity while allowing flexibility.</p>
              <p>A simple strap design allows for a universal fit.</p>
              <p>Optimal Gel Cryo Pad available for effective cold therapy.</p>
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