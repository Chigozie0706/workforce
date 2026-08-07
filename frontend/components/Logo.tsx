import { Wrench } from "lucide-react";

const BLUE = "#1558B0";

export function Logo({
  size = "md",
  light = false,
}: {
  size?: "sm" | "md" | "lg";
  light?: boolean;
}) {
  const box = size === "lg" ? 48 : size === "md" ? 36 : 32;
  const icon = size === "lg" ? 22 : size === "md" ? 18 : 16;
  const text = size === "lg" ? "text-2xl" : "text-lg";

  return (
    <div className="flex items-center gap-2.5">
      <div
        className="rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          width: box,
          height: box,
          background: light ? "rgba(255,255,255,0.2)" : BLUE,
        }}
      >
        <Wrench size={icon} className="text-white" />
      </div>
      <span
        className={`font-extrabold ${text} ${light ? "text-white" : "text-slate-900"}`}
      >
        SkillConnect
      </span>
    </div>
  );
}
