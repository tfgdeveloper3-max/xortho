export default function XOSection() {
    return (
        <section className="relative w-full md:min-h-screen h-[50vh] overflow-hidden bg-white flex items-start justify-center md:py-0">

            {/* Background Video */}
            <div className="absolute inset-0 w-full h-full z-0 bg-[#2C2895]/50 flex items-center justify-center">
                <video
                    src="/video/Product-Preview.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-[300px] h-full object-cover mix-blend-darken"
                />
            </div>

            {/* Overlay Text */}
            <div className="absolute inset-0 w-full h-full bg-white mix-blend-screen z-10 flex items-start justify-center pointer-events-none select-none pt-20 md:pt-35">
                <h1 className="font-black text-black text-[40vw] md:text-[50vw] leading-none tracking-tighter flex items-center justify-center">
                    XO
                </h1>
            </div>

        </section>
    );
}