// "use client";

// import MyButton from "../my-button";
// import { useRef } from "react";
// import { useScrollFade } from "@/components/animation/animations";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useEffect } from "react";

// gsap.registerPlugin(ScrollTrigger);

// export default function CTASection() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const videoRef = useRef<HTMLDivElement>(null);
//   const textRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const section = sectionRef.current;
//     const video = videoRef.current;
//     const text = textRef.current;
//     if (!section || !video || !text) return;

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: section,
//         start: "top 80%",
//         end: "top 30%",
//         toggleActions: "play none none none",
//       }
//     });

//     // Video slides in from left
//     tl.fromTo(video,
//       { opacity: 0, x: -60, scale: 0.95 },
//       { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: "power3.out" },
//       0
//     );

//     // Text slides in from right
//     tl.fromTo(text,
//       { opacity: 0, x: 60 },
//       { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" },
//       0.2
//     );

//     return () => ScrollTrigger.getAll().forEach(t => t.kill());
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative w-full min-h-[80vh] flex items-center bg-gradient-to-b from-[#F8F9FC] to-[#E8E9EB] overflow-hidden"
//     >
//       <div className="container mx-auto px-5 md:px-[100px]">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

//           {/* Left: Video */}
//           <div
//             ref={videoRef}
//             className="relative w-full aspect-video md:aspect-4/3 flex items-end justify-start opacity-0"
//           >
//             <video
//               src="/video/CTA.mp4"
//               autoPlay loop muted playsInline
//               className="w-full h-full object-contain transform md:scale-150"
//             />
//           </div>

//           {/* Right: Content */}
//           <div
//             ref={textRef}
//             className="flex flex-col gap-8 text-center md:text-left items-center md:items-start relative z-20 md:pl-10 pb-10 opacity-0"
//           >
//             <h2 className="text-4xl md:text-6xl font-bold uppercase text-primary">
//               See The Future <br />
//               <span className="text-primary">In Action</span>
//             </h2>
//             <MyButton />
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import MyButton from "../my-button";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    gsap.fromTo(text,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 30%",
          toggleActions: "play none none none",
        }
      }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-[#F8F9FC] to-[#E8E9EB] overflow-hidden"
    >
      <div
        ref={textRef}
        className="flex flex-col gap-8 text-center items-center relative z-20 opacity-0 px-5"
      >
        <h2 className="text-4xl md:text-6xl font-bold uppercase text-primary">
          See The Future <br />
          <span className="text-primary">In Action</span>
        </h2>
        <MyButton />
      </div>
    </section>
  );
}