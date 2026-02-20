import MyButton from "../my-button";

export default function Hero() {
    return (
        <>
            <div className="min-h-screen w-full">
                <video src="/video/Hero-Bg.mp4" autoPlay loop muted className="object-cover object-center w-full h-screen absolute top-0 left-0" />
                <div className="min-h-screen w-full py-20 px-5 md:px-[100px] relative z-10 flex items-center justify-start">
                    <div className="flex flex-col gap-5 pt-20">
                        <h1
                            className="font-nexa text-transparent bg-clip-text bg-linear-to-t from-primary to-primary/70 uppercase text-3xl md:text-5xl lg:text-6xl"
                            style={{
                                fontWeight: 800,
                                letterSpacing: "-1px",  
                                lineHeight: "1.1"
                            }}
                        >
                            Tender Loving <br /> Care, <br />
                            Trust Loyalty <br /> Commitment
                        </h1>
                        <MyButton />
                    </div>
                </div>
            </div>
        </>
    )
}