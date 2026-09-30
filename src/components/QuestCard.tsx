import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Quest } from '../types';
import { LOCATIONS } from '../data/locations';
import { CATEGORY_COLORS, GRADE_CONFIG } from '../utils/constants';
import { isQuestAccepted, acceptQuest } from '../utils/storageA';
import { QuestImage } from './QuestImage';
import { 
  MapPin, 
  Sparkles, 
  Gift, 
  Check, 
  ExternalLink,
  Flame,
  ShieldAlert
} from 'lucide-react';

interface QuestCardProps {
  quest: Quest;
  onAcceptStatusChange?: () => void;
  featured?: boolean;
}

export const QuestCard: React.FC<QuestCardProps> = ({
  quest,
  onAcceptStatusChange,
  featured = false,
}) => {
  const [accepted, setAccepted] = useState(isQuestAccepted(quest.id));
  const [justAccepted, setJustAccepted] = useState(false);

  useEffect(() => {
    const handleStorage = () => {
      setAccepted(isQuestAccepted(quest.id));
    };
    window.addEventListener('cu_storage_update', handleStorage);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('cu_storage_update', handleStorage);
      window.removeEventListener('storage', handleStorage);
    };
  }, [quest.id]);

  const location = LOCATIONS.find((l) => l.id === quest.locationId);
  const locationName = location ? location.name : quest.locationId;
  const photoUrl = quest.photo || (location ? location.photo : undefined);

  const categoryStyle = CATEGORY_COLORS[quest.category] || CATEGORY_COLORS.Secret;
  const gradeStyle = GRADE_CONFIG[quest.grade] || GRADE_CONFIG["Grade 4"];

  const handleAccept = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!accepted) {
      acceptQuest(quest.id);
      setAccepted(true);
      setJustAccepted(true);
      setTimeout(() => setJustAccepted(false), 2000);
      if (onAcceptStatusChange) onAcceptStatusChange();
    }
  };

  return (
    <div
      className={`group relative flex flex-col rounded-xl overflow-hidden scroll-parchment transition-all duration-300 hover:-translate-y-1 hover:border-[#7C3AED]/70 hover:shadow-xl hover:shadow-[#7C3AED]/20 ${
        featured 
          ? 'border-2 border-[#F5B301]/60 shadow-lg shadow-[#F5B301]/10 bg-gradient-to-b from-[#1b1928] to-[#12121c]' 
          : 'border border-[#2A2A3D]'
      }`}
    >
      {/* Decorative vertical Japanese calligraphy strip on the left edge */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-7 sm:w-8 flex flex-col items-center justify-between py-3 select-none z-20 border-r border-[#2A2A3D]/70 bg-[#0E0E18]/90"
        title={`${quest.grade} - 呪術高等専門学校`}
      >
        <span className="text-[10px] font-mono text-purple-400 font-bold opacity-60">CU</span>
        <div className="flex flex-col items-center space-y-1 my-auto">
          {/* Vertical Japanese Glyphs for Mission & Grade */}
          <span className="text-xs font-serif font-black text-[#8B8BA3] tracking-widest writing-vertical">
            {gradeStyle.kanji}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]/50 my-1" />
          <span className="text-[9px] font-serif text-[#8B8BA3]/60 writing-vertical">
            任務
          </span>
        </div>
        <span className="text-[9px] font-mono text-amber-500/70 font-bold">祓</span>
      </div>

      {/* Main card body with left padding for vertical strip */}
      <div className="pl-7 sm:pl-8 flex flex-col flex-1 relative">
        
        {/* Top Header Strip with Red Exorcism Seal */}
        <div className="p-3.5 pb-2 flex items-start justify-between gap-2 border-b border-[#2A2A3D]/50 relative">
          
          <div className="flex flex-wrap items-center gap-1.5 z-10">
            {/* Category Color Tag */}
            <span
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide"
              style={{
                backgroundColor: `${categoryStyle.hex}22`,
                color: categoryStyle.hex,
                border: `1px solid ${categoryStyle.hex}66`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: categoryStyle.hex }} />
              {quest.category}
            </span>

            {/* Grade Badge */}
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${gradeStyle.badgeBg} ${gradeStyle.color}`}
            >
              {quest.grade}
            </span>
          </div>

          {/* Red Exorcism / Talisman Seal (Jujutsu Stamp) */}
          <div 
            className="w-8 h-8 rounded border-2 border-[#E11D48] bg-[#E11D48]/15 flex items-center justify-center rotate-6 shadow-sm shadow-[#E11D48]/30 flex-shrink-0"
            title="Official Jujutsu High Exorcism Seal"
          >
            <span className="text-xs font-black text-[#E11D48] tracking-tighter">
              封印
            </span>
          </div>
        </div>

        {/* Thumbnail Image Slot with Fallback */}
        <Link to={`/quest/${quest.id}`} className="block relative h-36 sm:h-40 overflow-hidden bg-[#0A0A10]">
          <QuestImage
            src={photoUrl}
            alt={quest.title}
            category={quest.category}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* XP Overlay Badge on Image */}
          <div className="absolute bottom-2 right-2 z-10">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#0B0B12]/85 backdrop-blur-md border border-[#F5B301]/50 text-[#F5B301] font-bebas text-sm tracking-wider shadow-md">
              <Sparkles className="w-3 h-3 text-[#F5B301]" />
              +{quest.xp} XP
            </span>
          </div>

          {/* Proof type pill */}
          <div className="absolute top-2 left-2 z-10">
            <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#0B0B12]/80 text-[#8B8BA3] border border-[#2A2A3D]">
              Proof: {quest.proofType}
            </span>
          </div>
        </Link>

        {/* Quest Info Content */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            {/* Title */}
            <Link to={`/quest/${quest.id}`} className="group/title">
              <h3 className="font-bebas text-xl sm:text-2xl tracking-wide text-[#E8E8F0] group-hover/title:text-purple-300 transition-colors line-clamp-1">
                {quest.title}
              </h3>
            </Link>

            {/* Description */}
            <p className="text-xs text-[#8B8BA3] mt-1.5 line-clamp-2 leading-relaxed">
              {quest.description}
            </p>

            {/* Meta Tags: Location + Bounty */}
            <div className="mt-3.5 space-y-1.5 text-xs">
              {/* Location Pin */}
              <div className="flex items-center gap-1.5 text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-[#F5B301] flex-shrink-0" />
                <span className="truncate font-medium text-xs text-[#E8E8F0]/90">
                  {locationName}
                </span>
                <span className="text-[10px] text-[#8B8BA3] font-mono">
                  ({location?.type || 'Campus'})
                </span>
              </div>

              {/* Bounty Reward Tag */}
              <div className="flex items-center gap-1.5 text-purple-300">
                <Gift className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                <span className="truncate text-xs font-mono text-purple-200">
                  {quest.bounty}
                </span>
              </div>
            </div>
          </div>

          {/* Action Footer: Accept Button + Details Link */}
          <div className="mt-5 pt-3 border-t border-[#2A2A3D]/70 flex items-center justify-between gap-2">
            
            <button
              onClick={handleAccept}
              disabled={accepted}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                accepted
                  ? 'bg-emerald-950/70 border border-emerald-500/60 text-emerald-400 cursor-default shadow-sm shadow-emerald-500/10'
                  : 'bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:from-[#8B5CF6] hover:to-[#7C3AED] text-white cursed-glow-sm hover:cursed-glow active:scale-[0.98]'
              } ${justAccepted ? 'ring-2 ring-emerald-400 scale-102' : ''}`}
            >
              {accepted ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Accepted ✓</span>
                </>
              ) : (
                <>
                  <Flame className="w-3.5 h-3.5 text-[#F5B301]" />
                  <span>Accept Mission</span>
                </>
              )}
            </button>

            <Link
              to={`/quest/${quest.id}`}
              className="p-2 rounded-lg bg-[#14141F] border border-[#2A2A3D] text-[#8B8BA3] hover:text-[#E8E8F0] hover:border-purple-500/40 transition-colors flex items-center justify-center"
              title="View Mission Briefing"
              aria-label="View Mission Briefing"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
