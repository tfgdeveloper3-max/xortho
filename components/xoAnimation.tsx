"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface XOAnimationProps {
  onComplete?: () => void;
  onProgress?: (progress: number) => void;
}

export default function XOAnimation({ onComplete, onProgress }: XOAnimationProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const xoImgRef = useRef<HTMLDivElement>(null);
  const heroScaleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current!;
    const canvas = canvasRef.current!;
    const xoDiv = xoImgRef.current;
    const heroScale = heroScaleRef.current;
    if (!wrapper || !canvas || !xoDiv || !heroScale) return;

    document.body.style.overflow = "hidden";

    let completed = false;
    let scrollLocked = true; // XO is solid, waiting for scroll
    let breakProgress = 0;   // 0 → 1 driven by scroll or auto

    const ctx = canvas.getContext("2d", { alpha: true })!;
    ctx.imageSmoothingEnabled = false;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Build shard positions from XO text
    const off = document.createElement("canvas");
    off.width = canvas.width;
    off.height = canvas.height;
    const octx = off.getContext("2d")!;
    const fontSize = Math.min(canvas.width * 0.42, 320);
    octx.fillStyle = "#ffffff";
    octx.font = `900 ${fontSize}px sans-serif`;
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    octx.fillText("XO", canvas.width / 2, canvas.height / 2);
    const { data } = octx.getImageData(0, 0, off.width, off.height);

    const BRAND_COLORS = [
      "#2C2895", "#1a1670", "#4340c4", "#6b68d4",
      "#9b99e8", "#a0a0b0", "#c8c8d8", "#7a7a9a",
      "#ffffff", "#e8e8ff",
    ];

    type Shard = {
      ox: number; oy: number;
      vx: number; vy: number;
      w: number; h: number;
      angle: number; angleV: number;
      color: string;
    };

    const shards: Shard[] = [];
    const GAP = 7;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    for (let y = 0; y < off.height; y += GAP) {
      for (let x = 0; x < off.width; x += GAP) {
        const i = (y * off.width + x) * 4;
        if (data[i + 3] > 120) {
          const dx = x - cx, dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const speed = 0.3 + Math.random() * 1.0;
          shards.push({
            ox: x, oy: y,
            vx: (dx / dist) * speed + (Math.random() - 0.5) * 0.3,
            vy: (dy / dist) * speed + (Math.random() - 0.5) * 0.3,
            w: Math.random() * 7 + 3,
            h: Math.random() * 2.5 + 1,
            angle: Math.random() * Math.PI * 2,
            angleV: (Math.random() - 0.5) * 0.12,
            color: BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)],
          });
        }
      }
    }

    const colorMap = new Map<string, Shard[]>();
    for (const s of shards) {
      if (!colorMap.has(s.color)) colorMap.set(s.color, []);
      colorMap.get(s.color)!.push(s);
    }

    function drawAllShards(progress: number, alpha: number) {
      const zoom = 1 + progress * 5;
      const spread = progress * 195;
      const angleProgress = progress * 20;
      ctx.shadowBlur = 0;

      colorMap.forEach((group, color) => {
        ctx.fillStyle = color;
        ctx.strokeStyle = "rgba(255,255,255,0.35)";
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = alpha;
        for (const s of group) {
          const x = cx + (s.ox - cx) * zoom + s.vx * spread;
          const y = cy + (s.oy - cy) * zoom + s.vy * spread;
          const currentAngle = s.angle + s.angleV * angleProgress;
          const scale = 1 + progress * 2.5;
          const sw = s.w * scale;
          const sh = s.h * scale;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(currentAngle);
          ctx.beginPath();
          ctx.moveTo(-sw, 0);
          ctx.lineTo(-sw * 0.3, -sh);
          ctx.lineTo(sw, 0);
          ctx.lineTo(sw * 0.3, sh);
          ctx.closePath();
          ctx.fill();
          if (alpha > 0.4) {
            ctx.beginPath();
            ctx.moveTo(-sw * 0.75, 0);
            ctx.lineTo(sw * 0.75, 0);
            ctx.stroke();
          }
          ctx.restore();
        }
      });
      ctx.globalAlpha = 1;
    }

    function complete() {
      if (completed) return;
      completed = true;
      document.body.style.overflow = "";
      gsap.to(wrapper, {
        opacity: 0, duration: 0.4, ease: "power2.inOut",
        onComplete: () => { if (onComplete) onComplete(); }
      });
    }

    // Scroll handler — drives break animation
    let autoBreakStarted = false;
    const progressObj = { value: 0 };

    function startBreakAnimation() {
      if (autoBreakStarted) return;
      autoBreakStarted = true;
      scrollLocked = false;

      gsap.to(progressObj, {
        value: 1,
        duration: 3.0,
        ease: "power1.inOut",
        onUpdate: () => {
          breakProgress = progressObj.value;
          if (onProgress) onProgress(breakProgress);
        },
        onComplete: complete,
      });
    }

    // Listen for first scroll/wheel/touch
    function onFirstScroll() {
      if (autoBreakStarted) return;
      startBreakAnimation();
      window.removeEventListener("wheel", onFirstScroll);
      window.removeEventListener("touchmove", onFirstScroll);
      window.removeEventListener("keydown", onFirstScroll);
    }

    window.addEventListener("wheel", onFirstScroll, { passive: true });
    window.addEventListener("touchmove", onFirstScroll, { passive: true });
    window.addEventListener("keydown", onFirstScroll, { passive: true });

    // XO solid fade-in
    gsap.fromTo(
      xoDiv,
      { opacity: 0, scale: 0.85, filter: "blur(20px)" },
      {
        opacity: 1, scale: 1, filter: "blur(0px)",
        duration: 1.6, delay: 0.3, ease: "power2.out",
      }
    );

    // Hero behind — starts zoomed in, zooms out as break progresses
    // Initial zoom: 1.35 scale, zooms to 1.0 as progress → 1
    gsap.set(heroScale, { scale: 1.35, opacity: 0 });

    let raf: number;
    let lastTime = 0;

    function render(now: number) {
      if (now - lastTime < 14) { raf = requestAnimationFrame(render); return; }
      lastTime = now;

      if (!completed) {
        const p = breakProgress;

        // XO text image: solid when p=0, blurs and fades as break starts
        if (xoDiv) {
          const blurAmt = p * 18;
          const xoAlpha = Math.max(1 - p * 3.5, 0);
          xoDiv.style.opacity = String(xoAlpha);
          xoDiv.style.filter = `blur(${blurAmt}px)`;
        }

        // Background (hero) — reveal and zoom out as break progresses
        if (heroScale) {
          const heroOpacity = Math.min(p * 3, 1); // fades in quickly
          const heroScaleVal = 1.35 - p * 0.35;   // zooms from 1.35 to 1.0
          heroScale.style.opacity = String(heroOpacity);
          heroScale.style.transform = `scale(${heroScaleVal})`;
        }

        // White overlay fades out as hero reveals
        const overlayOpacity = Math.max(1 - p * 2.5, 0);
        wrapper.style.background = `rgba(255,255,255,${overlayOpacity})`;

        // Canvas shards
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (p > 0.02) {
          const shardAlpha = p < 0.55
            ? 1
            : Math.max(1 - ((p - 0.55) / 0.45), 0);
          drawAllShards(p, shardAlpha);
        }
      }

      raf = requestAnimationFrame(render);
    }

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
      window.removeEventListener("wheel", onFirstScroll);
      window.removeEventListener("touchmove", onFirstScroll);
      window.removeEventListener("keydown", onFirstScroll);
    };
  }, [onComplete, onProgress]);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#ffffff",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Hero section rendered BEHIND, zoomed in, revealed during break */}
      <div
        ref={heroScaleRef}
        style={{
          position: "absolute", inset: 0, zIndex: 1,
          opacity: 0,
          transform: "scale(1.35)",
          transformOrigin: "center center",
          willChange: "transform, opacity",
        }}
        id="xo-hero-preview"
      />

      {/* XO logo image */}
      <div
        ref={xoImgRef}
        style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: 0, pointerEvents: "none", zIndex: 2,
        }}
      >
        <img
          src="/images/XO.png"
          alt="XO"
          style={{
            width: "clamp(220px, 40vw, 440px)",
            filter: "brightness(0) saturate(100%) invert(14%) sepia(89%) saturate(1496%) hue-rotate(229deg) brightness(85%) contrast(112%)",
          }}
        />
      </div>

      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 3 }} />
    </div>
  );
}