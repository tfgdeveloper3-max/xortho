"use client";

import { useEffect, useRef } from "react";
import { CLD } from "@/lib/cloudinary";

interface XOAnimationProps {
  onComplete?: () => void;
  onProgress?: (progress: number) => void;
}

export default function XOAnimation({ onComplete, onProgress }: XOAnimationProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current!;
    const canvas = canvasRef.current!;
    const img = imgRef.current!;
    if (!wrapper || !canvas || !img) return;

    document.body.style.overflow = "hidden";

    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const ctx = canvas.getContext("2d", { alpha: false })!;
    const BG = "#020916";

    const COLORS = [
      "#ffffff", "#e8f4ff", "#c8e6ff", "#b0d8ff",
      "#7ab8ff", "#5b9bff", "#4A90E2", "#dff0ff",
    ];

    const IW = Math.min(W * 0.50, 520);
    const IH = IW * 0.45;
    const IX = (W - IW) / 2;
    const IY = (H - IH) / 2;

    function buildParticles() {
      const OW = 520, OH = 234;
      const oc = document.createElement("canvas");
      oc.width = OW; oc.height = OH;
      const oct = oc.getContext("2d")!;
      oct.drawImage(img, 0, 0, OW, OH);
      const d = oct.getImageData(0, 0, OW, OH).data;

      type P = {
        ox: number; oy: number;
        x: number; y: number;
        tx: number; ty: number;
        r: number;
        color: string;
        alpha: number;
        ed: number;
        speed: number;
      };

      const pts: P[] = [];
      const STEP = 4;
      const scaleX = IW / OW;
      const scaleY = IH / OH;

      for (let y = 0; y < OH; y += STEP) {
        for (let x = 0; x < OW; x += STEP) {
          const i = (y * OW + x) * 4;
          if (d[i + 3] < 60) continue;

          const ox = IX + x * scaleX;
          const oy = IY + y * scaleY;

          const cx = W / 2, cy = H / 2;
          const ddx = ox - cx, ddy = oy - cy;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy) || 1;
          const speed = 1.8 + Math.random() * 2.5;

          const r = 1.2 + Math.random() * 2.8;

          pts.push({
            ox, oy, x: ox, y: oy,
            tx: ox + (ddx / dist) * speed * (280 + Math.random() * 320),
            ty: oy + (ddy / dist) * speed * (280 + Math.random() * 280) + (Math.random() - 0.3) * 80,
            r,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            alpha: 1,
            ed: Math.random() * 0.6,
            speed,
          });
        }
      }
      return pts;
    }

    const T_HOLD = 1.8;
    const T_BREAK = 2.4;
    const T_DONE_P = 4.8;
    const T_FADE = 3.8;
    const T_DONE = 5.2;

    const eIn = (t: number) => t * t;
    const eOut = (t: number) => 1 - (1 - t) ** 3;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

    let pts: ReturnType<typeof buildParticles> = [];
    let startTime: number | null = null;
    let raf: number;
    let done = false;
    let builtParticles = false;
    let imgOpacity = 0;

    function frame(now: number) {
      if (!startTime) startTime = now;
      const e = (now - startTime) / 1000;

      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      if (e < T_HOLD) {
        imgOpacity = eOut(clamp(e / T_HOLD, 0, 1));
      } else if (e < T_BREAK) {
        imgOpacity = 1;
      } else if (e < T_BREAK + 0.8) {
        imgOpacity = clamp(1 - (e - T_BREAK) / 0.8, 0, 1);
      } else {
        imgOpacity = 0;
      }

      if (imgOpacity > 0) {
        ctx.save();
        ctx.shadowColor = "rgba(91,155,255,0.85)";
        ctx.shadowBlur = 60;
        ctx.globalAlpha = imgOpacity * 0.6;
        ctx.drawImage(img, IX, IY, IW, IH);
        ctx.shadowBlur = 120;
        ctx.globalAlpha = imgOpacity * 0.3;
        ctx.drawImage(img, IX, IY, IW, IH);
        ctx.restore();
        ctx.globalAlpha = imgOpacity;
        ctx.drawImage(img, IX, IY, IW, IH);
        ctx.globalAlpha = 1;
      }

      if (e >= T_BREAK && !builtParticles) {
        builtParticles = true;
        pts = buildParticles();
      }

      if (builtParticles) {
        for (const p of pts) {
          const t = clamp((e - T_BREAK - p.ed * 0.4) / (T_DONE_P - T_BREAK), 0, 1);
          const te = eIn(t);

          const px = lerp(p.ox, p.tx, te);
          const py = lerp(p.oy, p.ty, te);
          const alpha = clamp(1 - te * 1.2, 0, 1);

          if (alpha <= 0) continue;

          ctx.globalAlpha = alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(px, py, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      if (onProgress) onProgress(clamp(e / T_DONE, 0, 1));

      if (e >= T_FADE && e < T_DONE) {
        const ft = clamp((e - T_FADE) / (T_DONE - T_FADE), 0, 1);
        wrapper.style.opacity = String(1 - ft);
      }

      if (e >= T_DONE && !done) {
        done = true;
        document.body.style.overflow = "";
        wrapper.style.opacity = "0";
        wrapper.style.visibility = "hidden";
        wrapper.style.pointerEvents = "none";
        ctx.fillStyle = BG;
        ctx.fillRect(0, 0, W, H);
        requestAnimationFrame(() => {
          if (onComplete) onComplete();
        });
        return;
      }

      raf = requestAnimationFrame(frame);
    }

    function start() {
      raf = requestAnimationFrame(frame);
    }

    if (img.complete) start();
    else img.onload = start;

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [onComplete, onProgress]);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "#020916",
        pointerEvents: "none",
        opacity: 1,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={CLD.xo2}
        alt=""
        crossOrigin="anonymous"
        style={{ display: "none" }}
      />
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, display: "block" }}
      />
    </div>
  );
}