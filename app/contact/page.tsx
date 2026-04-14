"use client";
import { CLD } from "@/lib/cloudinary";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight, Mail, Phone, MapPin, Clock, Send,
  CheckCircle2, ChevronDown
} from "lucide-react";
import Navbar from "@/components/navbar";
import StickyButtons from "@/components/sticky-buttons";
import Footer from "@/components/footer";

gsap.registerPlugin(ScrollTrigger);

const P = "#5b9bff";

const contactInfo = [
  { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "888.521.8522", sub: "Mon–Fri, 9am–6pm EST" },
  { icon: <Mail className="w-5 h-5" />, label: "Email", value: "Cs@Tlcdme.Com", sub: "We reply within 24 hours" },
  { icon: <MapPin className="w-5 h-5" />, label: "Address", value: "X-Ortho Headquarters", sub: "United States" },
  { icon: <Clock className="w-5 h-5" />, label: "Hours", value: "Mon – Fri: 9am – 6pm", sub: "Weekends by appointment" },
];

const subjects = [
  "Product Information", "Order & Billing", "Clinical Support",
  "Insurance & Coverage", "Partnership Inquiry", "Other",
];

const BLUE_GRAD = "linear-gradient(180deg, #1a6fd4 0%, #0d4fa8 35%, #1565c8 55%, #0a3d8a 80%, #1251b0 100%)";



/* ── Main Page ── */
export default function ContactPage() {
  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [subjectOpen, setSubjectOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    gsap.fromTo(el.querySelectorAll(".hanim"),
      { opacity: 0, y: 44, filter: "blur(8px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "expo.out", stagger: 0.12, delay: 0.1 });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1600);
  };

  /* Shared dark input style */
  const inputBase: React.CSSProperties = {
    background: "rgba(8,12,42,0.8)",
    border: "1.5px solid rgba(91,155,255,0.15)",
    color: "#f0f4ff",
  };
  const focusInput = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.border = "1.5px solid rgba(91,155,255,0.7)";
    e.target.style.boxShadow = "0 0 0 3px rgba(91,155,255,0.10)";
  };
  const blurInput = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.border = "1.5px solid rgba(91,155,255,0.15)";
    e.target.style.boxShadow = "none";
  };

  return (
    <>
      <StickyButtons />
      <div id="main-navbar" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100000 }}>
        <Navbar />
      </div>

      {/* ══ HERO ══ — unchanged */}
      <section ref={heroRef} className="relative w-full flex items-center overflow-hidden" style={{ minHeight: "100vh", background: "#020916" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, background: "linear-gradient(135deg,rgba(2,9,22,0.92) 0%,rgba(2,9,22,0.60) 55%,transparent 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1, backgroundImage: "linear-gradient(rgba(17,17,132,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.05) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
        <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none" style={{ zIndex: 2, background: "linear-gradient(to bottom,transparent,#020916)" }} />
        <div className="relative container mx-auto px-5 md:px-[100px]" style={{ zIndex: 2, paddingTop: "max(140px,16vh)", paddingBottom: 80 }}>
          <div className="flex flex-col gap-5 max-w-2xl">
            <div className="hanim" style={{ opacity: 0 }}>
              <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.38em] font-bold px-3.5 py-1.5 rounded-full"
                style={{ background: "rgba(22,81,209,0.15)", color: "#5b9bff", border: "1px solid rgba(91,155,255,0.25)" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#5b9bff" }} />
                Get In Touch
              </span>
            </div>
            <div className="hanim" style={{ opacity: 0 }}>
              <h1 className="font-nexa uppercase leading-[0.95] text-[#f0f4ff]" style={{ fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 800, letterSpacing: "-3px" }}>
                Let's Start<br />
                <span style={{
                  backgroundImage: "linear-gradient(180deg, #f0f0f0 0%, #b8b8b8 20%, #e8e8e8 35%, #787878 50%, #d0d0d0 65%, #909090 80%, #c8c8c8 100%)",
                  WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text",
                  filter: "drop-shadow(0 1px 0 rgba(255,255,255,0.9)) drop-shadow(0 -1px 0 rgba(0,0,0,0.6)) drop-shadow(0 2px 6px rgba(0,0,0,0.8))"
                }}>Your</span><br />
                <span style={{
                  backgroundImage: BLUE_GRAD, WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text",
                  filter: "drop-shadow(0 1px 0 rgba(91,155,255,0.5)) drop-shadow(0 -1px 0 rgba(0,0,30,0.6)) drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
                }}>Recovery</span>
              </h1>
            </div>
            <p className="hanim text-base leading-relaxed text-white/55 border-l-[3px] pl-3.5" style={{ opacity: 0, borderColor: "rgba(91,155,255,0.30)" }}>
              Our clinical team is here to help you find the right orthopedic solution. Reach out — we respond within one business day.
            </p>
          </div>
        </div>
      </section>

      {/* ══ MAIN CONTENT ══ — dark */}
      <section className="relative w-full overflow-hidden" style={{ background: "#020916" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(17,17,132,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.04) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(22,81,209,0.10) 0%, transparent 55%)" }} />
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(91,155,255,0.2), transparent)" }} />

        <div className="container mx-auto px-5 md:px-[100px] py-20 md:py-28 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

            {/* ── LEFT: Contact Info ── */}
            <div className="lg:col-span-2 flex flex-col gap-6 sr" style={{ opacity: 0 }}>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#f0f4ff] leading-tight">
                  Contact{" "}
                  <span style={{ backgroundImage: BLUE_GRAD, WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    Information
                  </span>
                </h2>
                <p className="mt-2 text-sm text-white/40 leading-relaxed">
                  Multiple ways to reach our support and clinical teams.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {contactInfo.map((item, i) => (
                  <div key={i} className="relative flex items-start gap-4 p-5 rounded-2xl transition-all duration-300 overflow-hidden"
                    style={{ background: "linear-gradient(145deg, rgba(8,12,42,0.96), rgba(14,24,72,0.88))", border: "1px solid rgba(91,155,255,0.12)", boxShadow: "0 2px 12px rgba(0,0,0,0.3)" }}
                    onMouseEnter={e => {
                      const d = e.currentTarget as HTMLDivElement;
                      d.style.boxShadow = "0 8px 32px rgba(22,81,209,0.22), 0 0 0 1px rgba(91,155,255,0.25)";
                      d.style.transform = "translateY(-3px)";
                      d.style.borderColor = "rgba(91,155,255,0.28)";
                      const glow = d.querySelector(".card-glow") as HTMLDivElement;
                      if (glow) glow.style.opacity = "1";
                    }}
                    onMouseLeave={e => {
                      const d = e.currentTarget as HTMLDivElement;
                      d.style.boxShadow = "0 2px 12px rgba(0,0,0,0.3)";
                      d.style.transform = "";
                      d.style.borderColor = "rgba(91,155,255,0.12)";
                      const glow = d.querySelector(".card-glow") as HTMLDivElement;
                      if (glow) glow.style.opacity = "0";
                    }}>
                    <div className="card-glow absolute pointer-events-none" style={{ top: "-30%", left: "-10%", width: "60%", height: "160%", background: "radial-gradient(ellipse, rgba(22,81,209,0.18) 0%, transparent 70%)", filter: "blur(18px)", opacity: 0, transition: "opacity 0.35s ease" }} />
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10"
                      style={{ background: "linear-gradient(135deg,#1651D1,#5b9bff)", color: "white", boxShadow: "0 4px 14px rgba(22,81,209,0.4)" }}>
                      {item.icon}
                    </div>
                    <div className="relative z-10">
                      <p className="text-[10px] uppercase tracking-widest font-bold mb-0.5" style={{ color: "rgba(91,155,255,0.5)" }}>{item.label}</p>
                      <p className="text-sm font-bold text-[#f0f4ff]">{item.value}</p>
                      <p className="text-xs mt-0.5 text-white/40">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Urgent support card */}
              <div className="rounded-2xl p-6 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg,rgba(22,81,209,0.35),rgba(6,10,35,0.95))", border: "1px solid rgba(91,155,255,0.25)", boxShadow: "0 12px 40px rgba(22,81,209,0.20)" }}>
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
                <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(91,155,255,0.20) 0%, transparent 70%)", filter: "blur(16px)" }} />
                <div className="relative z-10 flex flex-col gap-3">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#5b9bff" }} />
                  <p className="text-white font-bold text-lg leading-snug">Need urgent clinical support?</p>
                  <p className="text-white/55 text-sm leading-relaxed">Our clinical team is available during business hours for urgent orthopedic consultations.</p>
                  <a href="tel:8885218522" className="cursor-pointer group duration-300 transition-all w-fit rounded-full bg-white/10 hover:bg-white/20 border border-white/20 p-1.5 relative overflow-hidden mt-1">
                    <div className="absolute top-0 left-[5%] group-hover:left-[80%] duration-300 transition-all h-full w-10 bg-white/20 rounded-[200%] blur" />
                    <div className="flex items-center bg-white rounded-full px-4 py-2 relative z-10">
                      <span className="text-sm font-semibold text-[#1651D1]">Call Now</span>
                      <ArrowRight className="ml-2 w-4 h-4 text-[#1651D1]" />
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Form ── */}
            <div className="lg:col-span-3 sr" style={{ opacity: 0 }}>
              <div className="rounded-3xl p-8 md:p-10"
                style={{ background: "linear-gradient(145deg, rgba(8,12,42,0.96), rgba(14,24,72,0.88))", boxShadow: "0 8px 48px rgba(0,0,0,0.4)", border: "1px solid rgba(91,155,255,0.15)" }}>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center text-center gap-5 py-16">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg,#1651D1,#5b9bff)", boxShadow: "0 8px 32px rgba(22,81,209,0.45)" }}>
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#f0f4ff] mb-2">Message Sent!</h3>
                      <p className="text-white/45 text-sm leading-relaxed max-w-xs mx-auto">
                        Thank you for reaching out. Our team will respond within one business day.
                      </p>
                    </div>
                    <button onClick={() => setSubmitted(false)}
                      className="cursor-pointer group duration-300 transition-all w-fit rounded-full bg-[#1651D1]/30 hover:bg-[#1651D1]/50 backdrop-blur-2xl border border-white/20 p-1.5 relative overflow-hidden">
                      <div className="absolute top-0 left-[5%] group-hover:left-[80%] duration-300 transition-all h-full w-10 bg-[#1651D1]/50 rounded-[200%] blur" />
                      <div className="flex items-center bg-white rounded-full px-4 py-2 md:px-5 md:py-3 relative z-10">
                        <span className="text-base font-semibold">Send Another</span>
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </div>
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-[#f0f4ff]">Send a Message</h2>
                      <p className="text-sm text-white/40 mt-1">Fill in your details and we'll get back to you shortly.</p>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(91,155,255,0.6)" }}>Full Name *</label>
                          <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                            placeholder="Your Name"
                            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 placeholder:text-white/20"
                            style={inputBase} onFocus={focusInput} onBlur={blurInput} />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(91,155,255,0.6)" }}>Email Address *</label>
                          <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                            placeholder="email@example.com"
                            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 placeholder:text-white/20"
                            style={inputBase} onFocus={focusInput} onBlur={blurInput} />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(91,155,255,0.6)" }}>Phone Number</label>
                        <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 placeholder:text-white/20"
                          style={inputBase} onFocus={focusInput} onBlur={blurInput} />
                      </div>

                      {/* Subject dropdown */}
                      <div className="flex flex-col gap-1.5 relative">
                        <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(91,155,255,0.6)" }}>Subject *</label>
                        <button type="button" onClick={() => setSubjectOpen(!subjectOpen)}
                          className="w-full px-4 py-3 rounded-xl text-sm text-left outline-none flex items-center justify-between transition-all duration-200"
                          style={{
                            background: "rgba(8,12,42,0.8)",
                            border: `1.5px solid ${subjectOpen ? "rgba(91,155,255,0.7)" : "rgba(91,155,255,0.15)"}`,
                            boxShadow: subjectOpen ? "0 0 0 3px rgba(91,155,255,0.10)" : "none",
                            color: subject ? "#f0f4ff" : "rgba(255,255,255,0.2)",
                          }}>
                          {subject || "Select a subject"}
                          <ChevronDown className="w-4 h-4 transition-transform duration-200" style={{ transform: subjectOpen ? "rotate(180deg)" : "rotate(0deg)", color: P }} />
                        </button>
                        {subjectOpen && (
                          <div className="absolute top-full left-0 right-0 mt-1 rounded-xl overflow-hidden z-20"
                            style={{ background: "rgba(8,12,42,0.98)", border: "1.5px solid rgba(91,155,255,0.25)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
                            {subjects.map((s) => (
                              <button key={s} type="button"
                                onClick={() => { setSubject(s); setSubjectOpen(false); }}
                                className="w-full px-4 py-3 text-sm text-left transition-colors duration-150"
                                style={{ color: subject === s ? "#5b9bff" : "#f0f4ff" }}
                                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(91,155,255,0.08)"; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}>
                                {s}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(91,155,255,0.6)" }}>Message *</label>
                        <textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                          placeholder="Tell us how we can help you..."
                          rows={5}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all duration-200 placeholder:text-white/20"
                          style={inputBase} onFocus={focusInput} onBlur={blurInput} />
                      </div>

                      <div className="flex items-center justify-between flex-wrap gap-4 mt-1">
                        <p className="text-xs text-white/25">* Required fields</p>
                        <button type="submit" disabled={loading}
                          className="cursor-pointer group duration-300 transition-all w-fit rounded-full bg-[#1651D1]/30 hover:bg-[#1651D1]/50 backdrop-blur-2xl border border-white/20 p-1.5 relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed">
                          <div className="absolute top-0 left-[5%] group-hover:left-[80%] duration-300 transition-all h-full w-10 bg-[#1651D1]/50 rounded-[200%] blur" />
                          <div className="flex items-center bg-white rounded-full px-5 py-2.5 relative z-10 gap-2">
                            {loading ? (
                              <>
                                <svg className="animate-spin w-4 h-4 text-[#1651D1]" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                                <span className="text-base font-semibold text-[#1651D1]">Sending...</span>
                              </>
                            ) : (
                              <>
                                <span className="text-base font-semibold">Send Message</span>
                                <Send className="w-4 h-4" />
                              </>
                            )}
                          </div>
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ STRIP ══ — dark */}
      <section className="relative w-full py-20 overflow-hidden" style={{ background: "#020916" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(17,17,132,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.04) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(91,155,255,0.2), transparent)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(22,81,209,0.08) 0%, transparent 65%)" }} />
        <div className="container mx-auto px-5 md:px-[100px] relative z-10">
          <div className="sr text-center mb-12" style={{ opacity: 0 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#f0f4ff]">
              Frequently Asked{" "}
              <span style={{ backgroundImage: BLUE_GRAD, WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Questions
              </span>
            </h2>
          </div>
          <div className="sr grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto" style={{ opacity: 0 }}>
            {[
              { q: "How quickly will I receive a response?", a: "Our team typically responds within one business day. For urgent matters, please call us directly." },
              { q: "Do you accept insurance?", a: "Yes, our products are PDAC approved and covered by most major insurance providers under relevant HCPCS codes." },
              { q: "Can I request a product demo?", a: "Absolutely. Contact us to schedule a clinical demonstration with one of our orthopedic specialists." },
              { q: "How do I place an order?", a: "Orders can be placed through our website, by phone, or by contacting your assigned sales representative." },
            ].map((item, i) => (
              <div key={i} className="relative rounded-2xl p-6 transition-all duration-300 overflow-hidden"
                style={{ background: "linear-gradient(145deg, rgba(8,12,42,0.96), rgba(14,24,72,0.88))", border: "1px solid rgba(91,155,255,0.12)", boxShadow: "0 2px 12px rgba(0,0,0,0.3)" }}
                onMouseEnter={e => {
                  const d = e.currentTarget as HTMLDivElement;
                  d.style.boxShadow = "0 12px 40px rgba(22,81,209,0.20), 0 0 0 1px rgba(91,155,255,0.25)";
                  d.style.transform = "translateY(-4px)";
                  d.style.borderColor = "rgba(91,155,255,0.28)";
                  const g1 = d.querySelector(".faq-glow-tl") as HTMLDivElement;
                  const g2 = d.querySelector(".faq-glow-br") as HTMLDivElement;
                  if (g1) g1.style.opacity = "1";
                  if (g2) g2.style.opacity = "1";
                }}
                onMouseLeave={e => {
                  const d = e.currentTarget as HTMLDivElement;
                  d.style.boxShadow = "0 2px 12px rgba(0,0,0,0.3)";
                  d.style.transform = "";
                  d.style.borderColor = "rgba(91,155,255,0.12)";
                  const g1 = d.querySelector(".faq-glow-tl") as HTMLDivElement;
                  const g2 = d.querySelector(".faq-glow-br") as HTMLDivElement;
                  if (g1) g1.style.opacity = "0";
                  if (g2) g2.style.opacity = "0";
                }}>
                <div className="faq-glow-tl absolute pointer-events-none" style={{ top: "-40%", left: "-20%", width: "70%", height: "130%", background: "radial-gradient(ellipse, rgba(22,81,209,0.18) 0%, transparent 65%)", filter: "blur(20px)", opacity: 0, transition: "opacity 0.4s ease" }} />
                <div className="faq-glow-br absolute pointer-events-none" style={{ bottom: "-40%", right: "-20%", width: "60%", height: "120%", background: "radial-gradient(ellipse, rgba(91,155,255,0.12) 0%, transparent 65%)", filter: "blur(20px)", opacity: 0, transition: "opacity 0.4s ease" }} />
                <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full transition-all duration-400"
                  style={{ background: "linear-gradient(to bottom, #1651D1, #5b9bff)", opacity: 0, transition: "opacity 0.3s ease" }}
                  ref={el => {
                    if (el) {
                      const parent = el.parentElement;
                      if (parent) {
                        parent.addEventListener("mouseenter", () => { el.style.opacity = "1"; });
                        parent.addEventListener("mouseleave", () => { el.style.opacity = "0"; });
                      }
                    }
                  }} />
                <div className="relative z-10">
                  <p className="text-sm font-bold text-[#f0f4ff] mb-2">{item.q}</p>
                  <p className="text-sm text-white/45 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ — dark */}
      <section className="relative py-24 overflow-hidden" style={{ background: "#020916" }}>
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(91,155,255,0.2), transparent)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(22,81,209,0.12) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(17,17,132,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(17,17,132,0.04) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
        <div className="relative z-10 max-w-xl mx-auto px-6 flex flex-col items-center text-center gap-6">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "rgba(91,155,255,0.7)" }} />
          <h2 className="font-nexa uppercase leading-tight text-[#f0f4ff]" style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.5px" }}>
            Explore our{" "}
            <span style={{ backgroundImage: BLUE_GRAD, WebkitBackgroundClip: "text" as string, WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              product range
            </span>
          </h2>
          <p className="text-white/45 text-base leading-relaxed">Browse our full lineup of orthopedic solutions designed for recovery and daily support.</p>
          <a href="/products" className="cursor-pointer group duration-300 transition-all w-fit rounded-full bg-[#1651D1]/30 hover:bg-[#1651D1]/50 backdrop-blur-2xl border border-white/30 p-1.5 relative overflow-hidden">
            <div className="absolute top-0 left-[5%] group-hover:left-[80%] duration-300 transition-all h-full w-10 bg-[#1651D1]/50 rounded-[200%] blur" />
            <div className="flex items-center bg-white rounded-full px-5 py-2.5 md:px-6 md:py-3 relative z-10">
              <span className="text-base font-semibold">View All Products</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}