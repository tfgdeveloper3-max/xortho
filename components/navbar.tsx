"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <>
            {/* Your Navbar */}
            <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/80 backdrop-blur-md shadow-sm py-3"
                : "bg-transparent py-5"
                }`}>
                <div className="container mx-auto px-5 md:px-[100px] flex items-center justify-between">
                    <div className={`relative transition-all duration-300 ${isScrolled ? "w-20" : "w-28"}`}>
                        <Image
                            src="/images/Logo.svg"
                            alt="Logo"
                            width={120}
                            height={120}
                            className="w-full h-auto object-contain"
                        />
                    </div>

                    {/* Hamburger - Hide when menu is open */}
                    {!isMenuOpen && (
                        <div 
                            onClick={toggleMenu}
                            className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] aspect-square rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg shadow-primary/20"
                        >
                            <Image
                                src="/images/Navbar-Hamburger-Icon.svg"
                                alt="Hamburger"
                                width={50}
                                height={50}
                                className="w-[60px] h-[60px] md:w-[60px] md:h-[60px]"
                            />
                        </div>
                    )}

                    {/* Close Button - Show when menu is open */}
                    {isMenuOpen && (
                        <div
                            onClick={toggleMenu}
                            className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] aspect-square rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 hover:rotate-90 cursor-pointer shadow-lg shadow-primary/20 bg-white/20 backdrop-blur-sm"
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </div>
                    )}
                </div>
            </div>

            {/* Fullscreen Menu */}
            <div 
                className={`fixed inset-0 bg-gradient-to-br from-[#2C2895] to-[#5227FF] z-40 transition-transform duration-500 ease-out ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Menu Content */}
                <div className="flex flex-col items-center justify-center h-full px-8">
                    <nav className="flex flex-col gap-8 text-center">
                        <a 
                            href="#home" 
                            onClick={toggleMenu}
                            className="text-4xl md:text-6xl font-bold text-white hover:text-white/80 transition-colors transform hover:scale-105"
                        >
                            Home
                        </a>
                        <a 
                            href="#about" 
                            onClick={toggleMenu}
                            className="text-4xl md:text-6xl font-bold text-white hover:text-white/80 transition-colors transform hover:scale-105"
                        >
                            About
                        </a>
                        <a 
                            href="#services" 
                            onClick={toggleMenu}
                            className="text-4xl md:text-6xl font-bold text-white hover:text-white/80 transition-colors transform hover:scale-105"
                        >
                            Services
                        </a>
                        <a 
                            href="#contact" 
                            onClick={toggleMenu}
                            className="text-4xl md:text-6xl font-bold text-white hover:text-white/80 transition-colors transform hover:scale-105"
                        >
                            Contact
                        </a>
                    </nav>

                    {/* Social Links */}
                    <div className="mt-16 flex gap-6 text-white/80">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            Twitter
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}