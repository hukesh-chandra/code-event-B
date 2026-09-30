import React, { useState } from 'react';
import { Category } from '../types';
import { CATEGORY_COLORS } from '../utils/constants';
import { 
  Wrench, 
  BookOpen, 
  Code2, 
  Users2, 
  HeartHandshake, 
  Flame,
  Sparkles
} from 'lucide-react';

interface QuestImageProps {
  src?: string;
  alt: string;
  category?: Category;
  className?: string;
  overlayGradient?: boolean;
}

export const getCategoryIcon = (category?: Category, className: string = "w-6 h-6") => {
  switch (category) {
    case 'Workshop':
      return <Wrench className={className} />;
    case 'Library':
      return <BookOpen className={className} />;
    case 'Coding':
      return <Code2 className={className} />;
    case 'Club':
      return <Users2 className={className} />;
    case 'Wellness':
      return <HeartHandshake className={className} />;
    case 'Secret':
      return <Flame className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

export const QuestImage: React.FC<QuestImageProps> = ({
  src,
  alt,
  category = 'Secret',
  className = 'w-full h-full object-cover',
  overlayGradient = true,
}) => {
  const [hasError, setHasError] = useState(false);
  const color = CATEGORY_COLORS[category] || CATEGORY_COLORS.Secret;

  if (!src || hasError) {
    return (
      <div 
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#181828] via-[#12121E] to-[#0A0A10] border border-[#2A2A3D] select-none ${className}`}
        style={{ minHeight: '140px' }}
      >
        {/* Subtle cursed energy grid background */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#7C3AED_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Ambient glow matching category color */}
        <div 
          className="absolute w-28 h-28 rounded-full blur-2xl opacity-20 pointer-events-none" 
          style={{ backgroundColor: color.hex }}
        />

        {/* Japanese cursed seal watermark */}
        <div className="absolute top-2 right-2 text-xs font-mono tracking-widest text-[#8B8BA3]/25 uppercase font-bold">
          呪術高専
        </div>

        {/* Center category emblem */}
        <div className="relative z-10 flex flex-col items-center text-center p-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-2 shadow-lg transition-transform"
            style={{ 
              backgroundColor: `${color.hex}22`,
              border: `1px solid ${color.hex}66`,
              color: color.hex,
              boxShadow: `0 0 15px ${color.hex}33`
            }}
          >
            {getCategoryIcon(category, "w-6 h-6")}
          </div>
          <span className="text-xs uppercase font-bold tracking-wider text-[#E8E8F0]/90">
            {category} Archive
          </span>
          <span className="text-[11px] text-[#8B8BA3] mt-0.5 line-clamp-1 max-w-[200px]">
            {alt}
          </span>
        </div>

        {/* Decorative corner runes */}
        <div className="absolute bottom-1 left-2 text-[9px] font-mono text-purple-400/40">
          [CURSE_LOC]
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#14141F] ${className}`}>
      <img
        src={src}
        alt={alt}
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        loading="lazy"
      />
      {overlayGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B12] via-[#0B0B12]/40 to-transparent pointer-events-none" />
      )}
    </div>
  );
};
