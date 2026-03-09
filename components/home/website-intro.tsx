"use client";

import { useEffect, useRef } from "react";

interface WebsiteIntroProps {
  onVideoEnd?: () => void;
}

export default function WebsiteIntro({ onVideoEnd }: WebsiteIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
    const handleEnded = () => { if (onVideoEnd) onVideoEnd(); };
    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [onVideoEnd]);

  return (
    <div className="fixed inset-0 z-40 bg-black">
      <video
        ref={videoRef}
        src="/video/Hero-Bg.mp4"
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
}