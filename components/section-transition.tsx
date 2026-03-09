"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
    children: React.ReactNode[];
    onNavbarVisible?: (visible: boolean) => void;
}

export default function SectionTransition({ children, onNavbarVisible }: Props) {
    const sectionsRef = useRef<HTMLDivElement[]>([]);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const targetYRef = useRef(0);

    // ── RAF-based smooth scroll ───────────────────────────────────
    useEffect(() => {
        let currentY = window.scrollY;
        targetYRef.current = window.scrollY;
        let rafId = 0;
        const LERP = 0.08;

        function loop() {
            const diff = targetYRef.current - currentY;
            if (Math.abs(diff) > 0.5) {
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
        function onTouchStart(e: TouchEvent) {
            touchStartY = e.touches[0].clientY;
        }
        function onTouchMove(e: TouchEvent) {
            e.preventDefault();
            const delta = (touchStartY - e.touches[0].clientY) * 1.5;
            touchStartY = e.touches[0].clientY;
            const maxY = document.body.scrollHeight - window.innerHeight;
            targetYRef.current = Math.max(0, Math.min(targetYRef.current + delta, maxY));
        }

        rafId = requestAnimationFrame(loop);
        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: false });

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
        };
    }, []);

    // ── Navbar + back-to-top visibility ──────────────────────────
    useEffect(() => {
        function onScroll() {
            setShowBackToTop(window.scrollY > window.innerHeight * 0.5);
            onNavbarVisible?.(window.scrollY < 80);
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        onNavbarVisible?.(true);
        return () => window.removeEventListener("scroll", onScroll);
    }, [onNavbarVisible]);

    // ── IntersectionObserver → sectionRevealed ───────────────────
    useEffect(() => {
        const sections = sectionsRef.current.filter(Boolean);
        const observers: IntersectionObserver[] = [];

        sections.forEach((el, i) => {
            const obs = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            window.dispatchEvent(
                                new CustomEvent("sectionRevealed", { detail: { index: i } })
                            );
                        }
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
            <style>{`
                html, body { overflow-x: hidden; }
            `}</style>
            <div style={{ width: "100%", background: "#fff" }}>
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

            {showBackToTop && (
                <button
                    onClick={() => { targetYRef.current = 0; }}
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
            )}
        </>
    );
}