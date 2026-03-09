import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

// ── Reusable fade + slide up ──────────────────────────────────────────────────
export function useScrollFade(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 40%",
          scrub: false,
          toggleActions: "play none none none",
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);
}

// ── Staggered children animation ─────────────────────────────────────────────
export function useStaggerChildren(
  ref: RefObject<HTMLElement | null>,
  selector = "> *"
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll(selector);

    gsap.fromTo(
      children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);
}

// ── Image scale reveal ────────────────────────────────────────────────────────
export function useImageReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.92, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);
}

// ── Parallax ─────────────────────────────────────────────────────────────────
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  speed = 0.3
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      y: () => -(el.offsetHeight * speed),
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);
}

// ── Legacy helpers (keep for xboot-section compatibility) ────────────────────
export function animateSection(el: HTMLElement) {
  gsap.fromTo(
    el,
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
    }
  );
}

export function animateHealingImage(el: HTMLElement) {
  gsap.fromTo(
    el,
    { opacity: 0, scale: 0.95 },
    {
      opacity: 1, scale: 1, duration: 1.2, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
    }
  );
}