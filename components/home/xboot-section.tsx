import Image from "next/image";
import MyButton from "../my-button";

export default function XbootSection() {
    return (
        <section className="relative w-full min-h-screen flex items-start overflow-hidden bg-white">
            {/* Diagonal Background Shape */}
            <div
                className="absolute bottom-0 w-full h-[55%] md:top-0 md:right-0 md:w-[60%] md:h-full bg-[#F2F4F8] z-0 md:[clip-path:polygon(10%_0,100%_0,100%_100%,0%_100%)]"
            />

            <div className="container mx-auto px-5 md:px-[100px] relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-0 items-start">

                    {/* Left Column: Image */}
                    <div className="relative w-full h-[400px] md:h-[600px] flex items-start justify-start">
                        <div className="relative w-[80%] h-full">
                            <Image
                                src="/images/Leg.png"
                                alt="Orthopedic Xboot"
                                fill
                                className="object-contain object-left mask-[linear-gradient(to_top,white_70%,transparent_100%)]"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="flex flex-col gap-6 pl-8 md:pl-16 pr-4 md:pr-10 py-16 md:py-20">
                        <h2 className="text-4xl md:text-5xl font-bold uppercase text-primary leading-tight">
                            Orthopedic <br />
                            <span className="text-primary">Xboot</span>
                        </h2>

                        <div className="flex flex-col text-[#4A5568] text-base md:text-lg leading-relaxed gap-1">
                            <p>An advanced pulley system allows for tailored compression.</p>
                            <p>Low profile design allows support to fit comfortably under clothing; ideal for active patients or lifestyles.</p>
                            <p>Vertical stays provide structural integrity while allowing for the flexibility needed.</p>
                            <p>A simple strap design allows for a universal fit.</p>
                            <p>Optimal Gel Cryo Pad available for effective cold therapy.</p>
                        </div>

                        <div className="pt-4">
                            <MyButton />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}