"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Image as ImageIcon, Shield, ArrowLeft } from "lucide-react";
import { GREEN } from "../../../lib/data";

const SLIDES = [
  {
    title: "Find skilled workers near you instantly",
    subtitle:
      "Browse hundreds of verified artisans in your area. Just one tap away.",
    Icon: MapPin,
    color: "#2563EB",
    bg: "#EFF6FF",
    accent: "#DBEAFE",
  },
  {
    title: "See real portfolio work before hiring",
    subtitle:
      "Browse before-and-after photos from completed jobs. No surprises.",
    Icon: ImageIcon,
    color: "#7C3AED",
    bg: "#F5F3FF",
    accent: "#EDE9FE",
  },
  {
    title: "Rate and report for full accountability",
    subtitle: "Your reviews build trust and keep quality high for everyone.",
    Icon: Shield,
    color: GREEN,
    bg: "#ECFDF5",
    accent: "#D1FAE5",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [slide, setSlide] = useState(0);
  const cur = SLIDES[slide];

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: cur.bg, transition: "background 0.4s" }}
    >
      <div className="w-full max-w-lg">
        <div className="flex justify-end mb-8">
          <button
            onClick={() => router.push("/signup")}
            className="text-sm font-bold px-4 py-2 rounded-full bg-white/80 shadow-sm text-slate-500"
          >
            Skip
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
          <div className="flex justify-center mb-8">
            <div
              className="w-44 h-44 rounded-full flex items-center justify-center"
              style={{ background: cur.accent }}
            >
              <div className="w-32 h-32 rounded-full flex items-center justify-center bg-white shadow-lg">
                <cur.Icon
                  size={56}
                  strokeWidth={1.4}
                  style={{ color: cur.color }}
                />
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 leading-tight">
              {cur.title}
            </h2>
            <p className="text-slate-500 leading-relaxed">{cur.subtitle}</p>
          </div>

          <div className="flex justify-center gap-2 mb-8">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === slide ? 32 : 8,
                  height: 8,
                  background: i === slide ? cur.color : "#CBD5E1",
                }}
              />
            ))}
          </div>

          <div className="flex gap-3">
            {slide > 0 && (
              <button
                onClick={() => setSlide(slide - 1)}
                className="w-14 h-14 rounded-2xl border-2 flex items-center justify-center flex-shrink-0 transition-all"
                style={{ borderColor: cur.color }}
              >
                <ArrowLeft size={20} style={{ color: cur.color }} />
              </button>
            )}
            <button
              onClick={() => {
                if (slide < SLIDES.length - 1) setSlide(slide + 1);
                else router.push("/signup");
              }}
              className="flex-1 h-14 font-extrabold text-base rounded-2xl text-white transition-all hover:opacity-90 active:scale-95 shadow-lg"
              style={{ background: cur.color }}
            >
              {slide === SLIDES.length - 1 ? "Get Started →" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
