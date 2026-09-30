import React, { useState } from "react";
import { Shield, BookOpen, Terminal, Sparkles, Flame, Coffee, Compass } from "lucide-react";
import { QuestCategory } from "../types";

interface CursedImageProps {
  src?: string;
  alt: string;
  className?: string;
  category?: QuestCategory;
  caption?: string;
}

export const CursedImage: React.FC<CursedImageProps> = ({
  src,
  alt,
  className = "",
  category,
  caption,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const getCategoryTheme = () => {
    switch (category) {
      case "Library":
        return {
          gradient: "from-emerald-950 via-slate-900 to-[#0B0B12]",
          accent: "text-emerald-400",
          border: "border-emerald-500/20",
          icon: BookOpen,
        };
      case "Coding":
        return {
          gradient: "from-rose-950 via-slate-900 to-[#0B0B12]",
          accent: "text-rose-400",
          border: "border-rose-500/20",
          icon: Terminal,
        };
      case "Workshop":
        return {
          gradient: "from-blue-950 via-slate-900 to-[#0B0B12]",
          accent: "text-blue-400",
          border: "border-blue-500/20",
          icon: Shield,
        };
      case "Wellness":
        return {
          gradient: "from-teal-950 via-slate-900 to-[#0B0B12]",
          accent: "text-teal-400",
          border: "border-teal-500/20",
          icon: Flame,
        };
      case "Secret":
        return {
          gradient: "from-amber-950 via-slate-900 to-[#0B0B12]",
          accent: "text-amber-400",
          border: "border-amber-500/20",
          icon: Sparkles,
        };
      case "Club":
      default:
        return {
          gradient: "from-purple-950 via-slate-900 to-[#0B0B12]",
          accent: "text-purple-400",
          border: "border-purple-500/20",
          icon: Compass,
        };
    }
  };

  const theme = getCategoryTheme();
  const IconComponent = theme.icon;

  if (!src || hasError) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br ${theme.gradient} flex flex-col items-center justify-center p-4 border ${theme.border} ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0B0B12]/40 to-[#0B0B12]/80 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center text-center gap-1.5">
          <div className={`p-2.5 rounded-xl bg-black/40 border border-white/10 ${theme.accent} shadow-inner`}>
            <IconComponent className="w-6 h-6 stroke-[1.5]" />
          </div>
          <span className="font-heading text-xs tracking-wider text-neutral-300 uppercase line-clamp-1">
            {caption || alt}
          </span>
          <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">
            Veil Territory
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#14141F] ${className}`}>
      {!isLoaded && (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} animate-pulse flex items-center justify-center`}
        >
          <IconComponent className={`w-5 h-5 ${theme.accent} opacity-40`} />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};
