import Image from "next/image";
import Link from "next/link";
import { CLD } from "@/lib/cloudinary";

export default function Footer() {
    return (
        <div className="px-3 pb-3 pt-4" style={{ background: "#020916" }}>
            <footer className="w-full text-white py-20 rounded-2xl rounded-tr-[80px] md:rounded-tr-[150px]"
                style={{ background: "linear-gradient(135deg, rgba(6,14,50,0.98) 0%, rgba(12,26,82,0.95) 100%)", border: "1px solid rgba(91,155,255,0.12)" }}>
                <div className="container mx-auto px-5 md:px-[100px]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                        {/* Left Column: Logo & Description */}
                        <div className="flex flex-col gap-6 max-w-lg">
                            <Image
                                src={CLD.footerLogo}
                                alt="Xortho Logo"
                                width={280}
                                height={100}
                                className="w-[200px] md:w-[280px] h-auto object-contain"
                            />
                            <p className="text-white/50 text-sm md:text-base leading-relaxed">
                                TLC DME is a next-generation Durable Medical Equipment platform built to simplify workflows, accelerate approvals, and give providers full control—without complexity.
                            </p>
                        </div>

                        {/* Right Column: Links Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-20 pt-4 lg:pt-0">

                            {/* Account Links */}
                            <div className="flex flex-col gap-6">
                                <h3 className="text-xl font-bold text-white">Account</h3>
                                <div className="flex flex-col gap-4 text-white/50 text-sm md:text-base">
                                    <Link href="#" className="hover:text-white transition-colors">Place An Order</Link>
                                    <Link href="#" className="hover:text-white transition-colors">Submit A Payment</Link>
                                    <Link href="#" className="hover:text-white transition-colors">Testimonials</Link>
                                    <Link href="#" className="hover:text-white transition-colors">Blog</Link>
                                    <Link href="/coming-soon" className="hover:text-white transition-colors">Coming Soon</Link>
                                </div>
                            </div>

                            {/* Contact Us Links */}
                            <div className="flex flex-col gap-6">
                                <h3 className="text-xl font-bold text-white">Contact us</h3>
                                <div className="flex flex-col gap-4 text-white/50 text-sm md:text-base">
                                    <Link href="#" className="hover:text-white transition-colors">Request Service</Link>
                                    <div className="hover:text-white transition-colors cursor-pointer">888.521.8522</div>
                                    <div className="hover:text-white transition-colors cursor-pointer break-all">Cs@Tlcdme.Com</div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="w-full h-px mt-16" style={{ background: "rgba(91,155,255,0.15)" }} />

                    <div className="pt-8 text-center text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>
                        © {new Date().getFullYear()} Xortho. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}