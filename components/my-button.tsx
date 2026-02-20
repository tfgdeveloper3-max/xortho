import { ArrowRight } from "lucide-react";

export default function MyButton() {
    return (
        <>
            <button className="cursor-pointer group duration-300 transition-all w-fit rounded-full bg-[#1651D1]/30 hover:bg-[#1651D1]/50 backdrop-blur-2xl border border-secondary/50 p-1.5 md:p-2 relative overflow-hidden drop-shadow-2xl drop-shadow-secondary/50 hover:drop-shadow-secondary/80">
                {/* Eclipse Shape */}
                <div className="absolute top-0 left-[5%] group-hover:left-[80%] duration-300 transition-all h-full w-10 bg-[#1651D1]/50 rounded-[200%] blur"></div>
                <div className="flex items-center bg-white rounded-full px-4 py-2 md:px-5 md:py-3 relative z-1">
                    <span className="text-base md:text-lg font-semibold">Learn More</span> <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                </div>
            </button>
        </>
    )
}