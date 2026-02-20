"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

function HamburgerMenu() {
    return (
        <div className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] aspect-square rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg shadow-primary/20">
            <Image
                src="/images/Navbar-Hamburger-Icon.svg"
                alt="Hamburger"
                width={50}
                height={50}
                className="w-[60px] h-[60px] md:w-[60px] md:h-[60px]"
            />
        </div>
    )
}

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)

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

    return (
        <>
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

                    <HamburgerMenu />
                </div>
            </div>
        </>
    )
}