import MyButton from "../my-button";

export default function CTASection() {
    return (
        <section className="relative w-full min-h-[80vh] flex items-center bg-linear-to-b from-[#F8F9FC] to-[#E8E9EB] overflow-hidden">

            <div className="container mx-auto px-5 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                    {/* Left Column: Video */}
                    <div className="relative w-full aspect-video md:aspect-4/3 flex items-end justify-start">
                        <video
                            src="/video/CTA.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-contain transform md:scale-150"
                        />
                    </div>

                    {/* Right Column: Content */}
                    <div className="flex flex-col gap-8 text-center md:text-left items-center md:items-start relative z-20 md:pl-10 pb-10">
                        <h2 className="text-4xl md:text-6xl font-bold uppercase text-primary">
                            See The Future <br />
                            <span className="text-primary">In Action</span>
                        </h2>

                        <div className="pt-2">
                            <MyButton />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}