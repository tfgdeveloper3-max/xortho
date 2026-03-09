"use client"

import { Calendar, MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"

export default function StickyButtons() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show only after scrolling past hero (100vh)
      setVisible(window.scrollY > window.innerHeight * 0.85)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <style>{`
        .sticky-btn {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          overflow: hidden;
          width: 44px;
          transition: width 0.35s cubic-bezier(0.4,0,0.2,1);
          border-radius: 10px 0 0 10px;
          cursor: pointer;
          text-decoration: none;
        }
        @media (min-width: 768px) {
          .sticky-btn { width: 52px; border-radius: 12px 0 0 12px; }
        }
        .sticky-btn:hover { width: 190px; }
        @media (max-width: 767px) {
          .sticky-btn:hover { width: 160px; }
        }
        .sticky-btn .btn-label {
          white-space: nowrap;
          opacity: 0;
          transform: translateX(10px);
          transition: opacity 0.25s ease 0.05s, transform 0.25s ease 0.05s;
          color: white;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding-left: 12px;
          padding-right: 4px;
          flex: 1;
        }
        .sticky-btn:hover .btn-label { opacity: 1; transform: translateX(0); }
        .sticky-btn .btn-icon {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (min-width: 768px) {
          .sticky-btn .btn-icon { width: 52px; height: 52px; }
        }
        .sticky-wrap {
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .sticky-wrap.hidden-btn {
          opacity: 0;
          transform: translateX(60px);
          pointer-events: none;
        }
        .sticky-wrap.shown-btn {
          opacity: 1;
          transform: translateX(0);
          pointer-events: auto;
        }
      `}</style>

      <div
        className={`fixed right-0 z-[9998] flex flex-col gap-2 sticky-wrap ${visible ? "shown-btn" : "hidden-btn"}`}
        style={{ bottom: "96px" }}
      >
        <a href="#contact" className="sticky-btn"
          style={{ background: "linear-gradient(135deg, #1651D1, #3b82f6)", boxShadow: "-4px 4px 24px rgba(22,81,209,0.45)" }}>
          <span className="btn-label">Schedule a Demo</span>
          <div className="btn-icon"><Calendar className="w-4 h-4 md:w-5 md:h-5 text-white" /></div>
        </a>

        <a href="#contact" className="sticky-btn"
          style={{ background: "linear-gradient(135deg, #0c2f8a, #1651D1)", boxShadow: "-4px 4px 24px rgba(22,81,209,0.35)" }}>
          <span className="btn-label">Contact Us</span>
          <div className="btn-icon"><MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-white" /></div>
        </a>
      </div>
    </>
  )
}