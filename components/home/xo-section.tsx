import Image from "next/image";

export default function XOSection() {
    return (
        <section className="relative w-full h-screen overflow-hidden bg-white flex items-center justify-center">

            {/* Background Video */}
            <div className="absolute inset-0 w-full h-full z-0 bg-[#2C2895]/50 flex items-center justify-center">
                <video
                    src="/video/Product-Preview.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-[200px] md:w-[300px] h-full object-cover mix-blend-darken"
                />
            </div>

            {/* Overlay Image */}
            <div className="absolute inset-0 w-full h-full bg-white mix-blend-screen z-10 flex items-center justify-center pointer-events-none select-none">
                <Image
                    src="/images/XO.png"
                    alt="XO"
                    width={1000}
                    height={600}
                    className="w-[140%] h-[140%] sm:w-[130%] sm:h-[130%] md:w-[120%] md:h-[120%] object-contain"
                />
            </div>

        </section>
    );
}