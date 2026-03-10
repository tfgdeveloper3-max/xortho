"use client"

import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react"

const productLinks = [
  {
    id: "xboot",
    title: "Orthopedic Xboot",
    subtitle: "Advanced Recovery Boot",
    image: "/images/leg/shoe.png",
    href: "/products/xboot",
    tag: "Orthopedic Boot",
    description: "Tailored compression with pulley system. Low profile fits comfortably under clothing.",
  },
  {
    id: "back",
    title: "Back Support 627/642",
    subtitle: "Lumbar Compression Belt",
    image: "/images/belt/back-belt3.png",
    href: "/products/back",
    tag: "Lumbar Belt",
    description: "Vertical stays provide structural integrity while allowing the flexibility needed for daily life.",
  },
  {
    id: "knee",
    title: "Knee Brace OA",
    subtitle: "Osteoarthritis Support",
    image: "/images/knee_brace/knee-brace.png",
    href: "/products/knee",
    tag: "Osteoarthritis",
    description: "Low profile design for all-day wear. Advanced pulley for tailored compression control.",
  },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const [hoveredProduct, setHoveredProduct] = useState<string>("xboot")
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const isHome = pathname === "/"

  const activeProduct = productLinks.find(p => p.id === hoveredProduct) ?? productLinks[0]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setProductsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setProductsOpen(false)
      setHoveredProduct("xboot")
    }, 150)
  }

  const handleProductsClick = () => {
    setProductsOpen((prev) => {
      if (prev) setHoveredProduct("xboot")
      return !prev
    })
  }

  // Smart nav: if on home page scroll to section, else go to home#section
  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    if (href.startsWith("#")) {
      if (isHome) {
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: "smooth" })
      } else {
        router.push("/" + href)
      }
    } else {
      router.push(href)
    }
  }

  const navLinks = [
    { label: "Home", href: "/", hasDropdown: false },
    { label: "About", href: "#about", hasDropdown: false },
    { label: "Products", href: "#products", hasDropdown: true },
    { label: "Contact", href: "#contact", hasDropdown: false },
  ]

  return (
    <>
      <style>{`
        .mobile-submenu {
          transition: max-height 0.35s ease, opacity 0.3s ease;
          overflow: hidden;
        }
        .prod-row {
          transition: all 0.22s ease;
        }
        .prod-img-slide {
          transition: opacity 0.4s cubic-bezier(0.4,0,0.2,1), transform 0.4s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>

      {/* FULL SCREEN DROPDOWN OVERLAY */}
      <div
        className={`fixed inset-0 z-40 flex flex-col`}
        style={{
          background: "rgba(3,6,20,0.98)",
          backdropFilter: "blur(40px)",
          opacity: productsOpen ? 1 : 0,
          pointerEvents: productsOpen ? "auto" : "none",
          transition: "opacity 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(91,155,255,0.4), transparent)" }} />

        <div className="flex flex-1 w-full px-20 sm:px-24 md:px-28 lg:px-32 pt-28 pb-12 gap-16 overflow-hidden">

          {/* LEFT — Large image display */}
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div style={{
                width: 400, height: 400, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(22,81,209,0.25) 0%, transparent 70%)",
                transition: "opacity 0.4s ease",
                opacity: productsOpen ? 1 : 0,
              }} />
            </div>

            <div className="relative w-full flex items-center justify-center" style={{ height: 380 }}>
              {productLinks.map((p) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={p.id} src={p.image} alt={p.title}
                  className="prod-img-slide absolute"
                  style={{
                    width: 340, height: 340, objectFit: "contain",
                    opacity: hoveredProduct === p.id ? 1 : 0,
                    transform: hoveredProduct === p.id ? "scale(1) translateY(0px)" : "scale(0.85) translateY(24px)",
                    filter: "drop-shadow(0 16px 60px rgba(91,155,255,0.55)) drop-shadow(0 0 20px rgba(22,81,209,0.4))",
                  }} />
              ))}
            </div>

            <div className="text-center mt-2" style={{ transition: "opacity 0.3s ease" }}>
              <span className="text-[10px] uppercase tracking-[0.35em] font-bold px-3 py-1 rounded-full"
                style={{ background: "rgba(22,81,209,0.25)", color: "#5b9bff" }}>
                {activeProduct.tag}
              </span>
              <p className="text-white/50 text-sm mt-2">{activeProduct.description}</p>
            </div>
          </div>

          <div className="w-px self-stretch my-4" style={{ background: "rgba(91,155,255,0.1)" }} />

          {/* RIGHT — product list */}
          <div className="flex flex-col justify-center w-[380px] flex-shrink-0 gap-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#5b9bff] animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#5b9bff]/50">Our Products</span>
              <div className="flex-1 h-px ml-2" style={{ background: "rgba(91,155,255,0.1)" }} />
              <button
                onClick={() => { setProductsOpen(false); router.push("/products") }}
                className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/25 hover:text-[#5b9bff] transition-colors duration-200">
                View All Products <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {productLinks.map((p) => {
              const isActive = hoveredProduct === p.id
              return (
                <button key={p.id}
                  onClick={() => { setProductsOpen(false); router.push(p.href) }}
                  onMouseEnter={() => setHoveredProduct(p.id)}
                  className="prod-row flex items-center gap-5 px-5 py-4 rounded-2xl cursor-pointer text-left"
                  style={{
                    background: isActive ? "rgba(22,81,209,0.15)" : "rgba(255,255,255,0.02)",
                    border: isActive ? "1px solid rgba(91,155,255,0.35)" : "1px solid rgba(255,255,255,0.04)",
                    boxShadow: isActive ? "0 4px 32px rgba(22,81,209,0.2)" : "none",
                  }}>

                  <div className="flex-shrink-0 flex items-center justify-center rounded-xl"
                    style={{
                      width: 56, height: 56,
                      background: isActive ? "rgba(22,81,209,0.3)" : "rgba(255,255,255,0.05)",
                      border: isActive ? "1px solid rgba(91,155,255,0.45)" : "1px solid rgba(255,255,255,0.07)",
                      transition: "all 0.25s ease",
                      boxShadow: isActive ? "0 0 16px rgba(22,81,209,0.4)" : "none",
                    }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.title} style={{
                      width: 38, height: 38, objectFit: "contain",
                      filter: isActive ? "drop-shadow(0 0 8px rgba(91,155,255,0.8)) brightness(1.15)" : "brightness(0.55)",
                      transition: "filter 0.25s ease",
                    }} />
                  </div>

                  <div className="flex flex-col flex-1 min-w-0">
                    <p className="font-bold text-base leading-tight transition-colors duration-200"
                      style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.65)" }}>
                      {p.title}
                    </p>
                    <p className="text-[12px] mt-0.5 transition-colors duration-200"
                      style={{ color: isActive ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.25)" }}>
                      {p.subtitle}
                    </p>
                  </div>

                  <ArrowRight className="w-5 h-5 flex-shrink-0 transition-all duration-300"
                    style={{
                      color: isActive ? "#5b9bff" : "rgba(255,255,255,0.12)",
                      transform: isActive ? "translateX(4px)" : "translateX(0)",
                    }} />
                </button>
              )
            })}
          </div>
        </div>

        <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(91,155,255,0.2), transparent)" }} />
      </div>

      {/* NAVBAR */}
      <div id="main-navbar" className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ${
        isScrolled && !productsOpen ? "bg-white/95 backdrop-blur-md shadow-md py-2" : "bg-transparent py-3"
      }`}>
        <div className="w-full px-20 sm:px-24 md:px-28 lg:px-32 flex items-center justify-between gap-4">

          {/* Logo */}
          <button onClick={() => router.push("/")}
            className={`relative flex-shrink-0 transition-all duration-300 ${isScrolled && !productsOpen ? "w-16" : "w-28"}`}
            style={{
              filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.6)) drop-shadow(0 0 20px rgba(180,200,255,0.25)) drop-shadow(2px 4px 8px rgba(0,0,0,0.8))",
            }}>
            <Image src="/images/logo.png" alt="Xortho Logo" width={160} height={160} className="w-full h-auto object-contain" />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 pr-6 lg:pr-10">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.label} className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}>
                  <button onClick={handleProductsClick} className={`relative flex items-center gap-1.5 px-4 py-2 text-sm font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer
                    ${productsOpen ? "text-[#5b9bff]" : isScrolled ? "text-[#1a1a2e] hover:text-[#1651D1]" : "text-white/90 hover:text-white"}`}>
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${productsOpen ? "rotate-180" : ""}`} />
                    <span className="absolute bottom-1 left-4 right-8 h-[2px] rounded-full transition-transform duration-300 origin-left"
                      style={{ background: "#5b9bff", transform: productsOpen ? "scaleX(1)" : "scaleX(0)" }} />
                  </button>
                </div>
              ) : (
                <button key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-4 py-2 text-sm font-semibold tracking-wide uppercase transition-all duration-300 group
                    ${productsOpen ? "text-white/40 hover:text-white" : isScrolled ? "text-[#1a1a2e] hover:text-[#1651D1]" : "text-white/90 hover:text-white"}`}>
                  {link.label}
                  <span className="absolute bottom-1 left-4 right-4 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ background: isScrolled && !productsOpen ? "#1651D1" : "white" }} />
                </button>
              )
            )}
          </nav>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300"
            style={{
              background: isScrolled ? "rgba(22,81,209,0.1)" : "rgba(255,255,255,0.15)",
              border: isScrolled ? "1px solid rgba(22,81,209,0.3)" : "1px solid rgba(255,255,255,0.3)"
            }}>
            {mobileOpen
              ? <X className="w-4 h-4" style={{ color: isScrolled ? "#1651D1" : "white" }} />
              : <Menu className="w-4 h-4" style={{ color: isScrolled ? "#1651D1" : "white" }} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-0 left-0 right-0 z-40 transition-all duration-400 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ paddingTop: "64px" }}>
        <div className="mx-4 rounded-2xl overflow-hidden shadow-2xl"
          style={{ background: "rgba(4,8,24,0.97)", backdropFilter: "blur(24px)", border: "1px solid rgba(22,81,209,0.3)" }}>
          <nav className="flex flex-col py-2">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.label}>
                  <button onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    className="w-full flex items-center justify-between px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    {link.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileProductsOpen ? "rotate-180 text-[#5b9bff]" : ""}`} />
                  </button>
                  <div className="mobile-submenu"
                    style={{ maxHeight: mobileProductsOpen ? "400px" : "0px", opacity: mobileProductsOpen ? 1 : 0, borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(22,81,209,0.04)" }}>
                    {productLinks.map((p) => (
                      <button key={p.id}
                        onClick={() => { setMobileOpen(false); setMobileProductsOpen(false); router.push(p.href) }}
                        className="w-full flex items-center gap-4 px-6 py-3 hover:bg-white/5 transition-all duration-200 group text-left">
                        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg"
                          style={{ background: "rgba(22,81,209,0.2)", border: "1px solid rgba(91,155,255,0.25)" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.image} alt={p.title} className="w-7 h-7 object-contain"
                            style={{ filter: "drop-shadow(0 2px 6px rgba(91,155,255,0.4))" }} />
                        </div>
                        <div>
                          <p className="text-white/90 text-xs font-bold uppercase tracking-wide group-hover:text-[#5b9bff] transition-colors">{p.title}</p>
                          <p className="text-white/35 text-[10px] mt-0.5">{p.subtitle}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-[#5b9bff] ml-auto transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  {link.label}
                </button>
              )
            )}
          </nav>
        </div>
      </div>
    </>
  )
}