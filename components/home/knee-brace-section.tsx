import Image from "next/image";
import MyButton from "../my-button";

export default function KneeBraceSection() {
    return (
        <section className="relative w-full min-h-[50vh] flex items-start overflow-hidden bg-white">
            {/* Diagonal Background Shape */}
            <div
                className="absolute bottom-0 w-full h-[55%] md:top-0 md:right-0 md:w-[65%] md:h-full bg-[#F2F4F8] z-10 md:[clip-path:polygon(20%_0,100%_0,100%_100%,0%_100%)] pointer-events-none"
            />

            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

                    {/* Left Column: Image */}
                    <div className="relative w-[98%] h-[380px] md:h-[620px] flex items-start justify-start mx-auto md:mx-0">
                        <Image
                            src="/images/Knees.png"
                            alt="Knee Brace Osteoarthritis"
                            fill
                            className="object-contain relative z-0"
                            priority
                        />
                    </div>

                    {/* Right Column: Content */}
                    <div className="flex flex-col gap-6 md:pl-10 py-20 relative z-20 px-5 md:px-[100px]">
                        <h2 className="text-4xl md:text-5xl font-bold uppercase text-primary leading-tight">
                            Knee Brace <br />
                            <span className="text-primary">Osteoarthritis</span>
                        </h2>

                        <div className="flex flex-col text-[#4A5568] text-base md:text-xl leading-relaxed">
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