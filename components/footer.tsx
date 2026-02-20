import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <div className="px-3 pb-3">
            <footer className="w-full bg-primary text-white py-20 rounded-2xl rounded-tr-[80px] md:rounded-tr-[150px]">
                <div className="container mx-auto px-5 md:px-[100px]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                        {/* Left Column: Logo & Description */}
                        <div className="flex flex-col gap-6 max-w-lg">
                            <div className="flex items-center gap-4">
                                <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0">
                                    <Image
                                        src="/images/Logo.svg"
                                        alt="Xortho Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                                    TLC DME is a next-generation Durable Medical Equipment platform built to simplify workflows, accelerate approvals, and give providers full control—without complexity.
                                </p>
                            </div>
                        </div>

                        {/* Right Column: Links Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-20 pt-4 lg:pt-0">

                            {/* Account Links */}
                            <div className="flex flex-col gap-6">
                                <h3 className="text-xl font-bold">Account</h3>
                                <div className="flex flex-col gap-4 text-gray-300 text-sm md:text-base">
                                    <Link href="#" className="hover:text-white transition-colors">Place An Order</Link>
                                    <Link href="#" className="hover:text-white transition-colors">Submit A Payment</Link>
                                    <Link href="#" className="hover:text-white transition-colors">Testimonials</Link>
                                    <Link href="#" className="hover:text-white transition-colors">Blog</Link>
                                </div>
                            </div>

                            {/* Contact Us Links */}
                            <div className="flex flex-col gap-6">
                                <h3 className="text-xl font-bold">Contact us</h3>
                                <div className="flex flex-col gap-4 text-gray-300 text-sm md:text-base">
                                    <Link href="#" className="hover:text-white transition-colors">Request Service</Link>
                                    <div className="hover:text-white transition-colors cursor-pointer">888.521.8522</div>
                                    <div className="hover:text-white transition-colors cursor-pointer break-all">Cs@Tlcdme.Com</div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="w-full h-px bg-white/10 mt-16" />

                    <div className="pt-8 text-center text-gray-400 text-sm">
                        ©️ {new Date().getFullYear()} Xortho. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}