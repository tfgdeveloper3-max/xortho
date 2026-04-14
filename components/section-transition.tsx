"use client";

import { useEffect, useRef } from "react";

interface Props {
    children: React.ReactNode[];
    onNavbarVisible?: (visible: boolean) => void;
}

export default function SectionTransition({ children, onNavbarVisible }: Props) {
    const sectionsRef = useRef<HTMLDivElement[]>([]);

    const targetYRef = useRef(0);

    useEffect(() => {
        let currentY = window.scrollY;
        targetYRef.current = window.scrollY;
        let rafId = 0;
        const LERP = 0.18; // was 0.08 — much faster now

        function loop() {
            const diff = targetYRef.current - currentY;
            if (Math.abs(diff) > 0.3) {
                currentY += diff * LERP;
                window.scrollTo(0, currentY);
            } else {
                currentY = targetYRef.current;
            }
            rafId = requestAnimationFrame(loop);
        }

        function onWheel(e: WheelEvent) {
            e.preventDefault();
            const maxY = document.body.scrollHeight - window.innerHeight;
            targetYRef.current = Math.max(0, Math.min(targetYRef.current + e.deltaY * 1.2, maxY));
        }

        let touchStartY = 0;
        function onTouchStart(e: TouchEvent) { touchStartY = e.touches[0].clientY; }
        function onTouchMove(e: TouchEvent) {
            e.preventDefault();
            const delta = (touchStartY - e.touches[0].clientY) * 1.5;
            touchStartY = e.touches[0].clientY;
            const maxY = document.body.scrollHeight - window.innerHeight;
            targetYRef.current = Math.max(0, Math.min(targetYRef.current + delta, maxY));
        }

        function onScrollToTop() {
            targetYRef.current = 0;
            currentY = 0;
        }

        rafId = requestAnimationFrame(loop);
        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: false });
        window.addEventListener("scrollToTop", onScrollToTop);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("scrollToTop", onScrollToTop);
        };
    }, []);

    useEffect(() => {
        function onScroll() {
            onNavbarVisible?.(window.scrollY < 80);
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        onNavbarVisible?.(true);
        return () => window.removeEventListener("scroll", onScroll);
    }, [onNavbarVisible]);

    useEffect(() => {
        const sections = sectionsRef.current.filter(Boolean);
        const observers: IntersectionObserver[] = [];
        sections.forEach((el, i) => {
            const obs = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting)
                            window.dispatchEvent(new CustomEvent("sectionRevealed", { detail: { index: i } }));
                    });
                },
                { threshold: 0.35 }
            );
            obs.observe(el);
            observers.push(obs);
        });
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent("sectionRevealed", { detail: { index: 0 } }));
        }, 300);
        return () => observers.forEach((obs) => obs.disconnect());
    }, []);

    return (
        <>
            <style>{`html, body { overflow-x: hidden; }`}</style>
            <div style={{ width: "100%", background: "#020916" }}>
                {Array.isArray(children) &&
                    children.map((child, i) => (
                        <div
                            key={i}
                            data-section={i}
                            ref={(el) => { if (el) sectionsRef.current[i] = el; }}
                        >
                            {child}
                        </div>
                    ))}
            </div>


        </>
    );
}