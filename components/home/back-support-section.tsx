import Image from "next/image";
import MyButton from "../my-button";

export default function BackSupportSection() {
    return (
        <section className="relative w-full min-h-screen flex items-start overflow-hidden bg-white">
            <div className="container mx-auto px-5 md:px-[100px] relative z-10 w-full">
                <div className="flex flex-col md:grid md:grid-cols-[40%_60%] gap-0 md:gap-10 items-start">

                    {/* Left Column: Content */}
                    <div className="flex flex-col gap-4 md:gap-6 px-4 md:px-0 md:pr-10 order-2 md:order-1 py-10 md:py-20">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-primary leading-tight">
                            Back Support <br />
                            <span className="text-primary">627<span className="font-sans">/</span>642</span>
                        </h2>

                        <div className="flex flex-col text-[#4A5568] text-sm sm:text-base md:text-xl leading-relaxed gap-1">
                            <p>An advanced pulley system allows for tailored compression.</p>
                            <p>Low profile design allows support to fit comfortably under clothing; ideal for active patients or lifestyles.</p>
                            <p>Vertical stays provide structural integrity while allowing for the flexibility needed.</p>
                            <p>A simple strap design allows for a universal fit.</p>
                            <p>Optimal Gel Cryo Pad available for effective cold therapy.</p>
                        </div>

                        <div className="pt-2 md:pt-4">
                            <MyButton />
                        </div>
                    </div>

                    {/* Right Column: Image */}
                    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[700px] order-1 md:order-2 mt-10 md:mt-20">
                        <Image
                            src="/images/Back.png"
                            alt="Back Support 627/642"
                            fill
                            className="object-contain object-center mask-[linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
                            priority
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}