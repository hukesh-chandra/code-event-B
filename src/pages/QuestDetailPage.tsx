import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { QUESTS } from '../data/quests';
import { LOCATIONS } from '../data/locations';
import { CATEGORY_COLORS, GRADE_CONFIG } from '../utils/constants';
import { isQuestAccepted, acceptQuest, abandonQuest } from '../utils/storageA';
import { QuestImage, getCategoryIcon } from '../components/QuestImage';
import { 
  ArrowLeft, 
  MapPin, 
  Sparkles, 
  Gift, 
  Check, 
  Flame, 
  ShieldAlert, 
  Camera, 
  Terminal, 
  Award,
  Layers,
  Share2,
  AlertOctagon
} from 'lucide-react';

export const QuestDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const quest = QUESTS.find((q) => q.id === id);

  const [accepted, setAccepted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (quest) {
      setAccepted(isQuestAccepted(quest.id));
    }
    const handleStorage = () => {
      if (quest) {
        setAccepted(isQuestAccepted(quest.id));
      }
    };
    window.addEventListener('cu_storage_update', handleStorage);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('cu_storage_update', handleStorage);
      window.removeEventListener('storage', handleStorage);
    };
  }, [quest]);

  if (!quest) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-rose-950/40 border border-rose-800/40 flex items-center justify-center mx-auto mb-4 text-rose-400">
          <AlertOctagon className="w-8 h-8" />
        </div>
        <h2 className="font-bebas text-3xl text-[#E8E8F0] tracking-wide">
          CURSED SCROLL NOT FOUND
        </h2>
        <p className="text-xs text-[#8B8BA3] mt-2 max-w-sm mx-auto">
          The requested mission ID does not exist in the Jujutsu High archive, or the barrier seal has expired.
        </p>
        <Link
          to="/board"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-mono text-xs uppercase font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Mission Board</span>
        </Link>
      </div>
    );
  }

  const location = LOCATIONS.find((l) => l.id === quest.locationId);
  const locationName = location ? location.name : quest.locationId;
  const photoUrl = quest.photo || (location ? location.photo : undefined);

  const categoryStyle = CATEGORY_COLORS[quest.category] || CATEGORY_COLORS.Secret;
  const gradeStyle = GRADE_CONFIG[quest.grade] || GRADE_CONFIG['Grade 4'];

  const handleToggleAccept = () => {
    if (accepted) {
      abandonQuest(quest.id);
      setAccepted(false);
    } else {
      acceptQuest(quest.id);
      setAccepted(true);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Other quests in the same location or category
  const relatedQuests = QUESTS.filter(
    (q) => q.id !== quest.id && (q.locationId === quest.locationId || q.category === quest.category)
  ).slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#8B8BA3] hover:text-[#E8E8F0] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Discovery</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14141F] border border-[#2A2A3D] text-xs font-mono text-[#8B8BA3] hover:text-white transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copied ? 'Link Copied!' : 'Share Scroll'}</span>
        </button>
      </div>

      {/* Main Mission Dossier Card */}
      <div className="rounded-2xl overflow-hidden scroll-parchment border-2 border-[#2A2A3D] shadow-2xl relative">
        
        {/* Japanese Top Talisman Bar */}
        <div className="bg-[#0E0E18] px-6 py-2.5 border-b border-[#2A2A3D] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-[#E11D48] font-bold">呪術密令</span>
            <span className="text-zinc-500">•</span>
            <span className="text-[#8B8BA3]">OFFICIAL JUJUTSU HIGH MISSION DECREE</span>
          </div>
          <span className="text-purple-400 font-bold tracking-widest">{quest.id}</span>
        </div>

        {/* Big Photo Slot */}
        <div className="relative w-full aspect-[21/9] sm:aspect-[16/7] bg-[#0A0A10] overflow-hidden">
          <QuestImage
            src={photoUrl}
            alt={quest.title}
            category={quest.category}
            className="w-full h-full object-cover"
          />

          {/* Floating Badges on Photo */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-lg"
              style={{
                backgroundColor: categoryStyle.hex,
                color: '#FFFFFF',
              }}
            >
              {getCategoryIcon(quest.category, 'w-3.5 h-3.5')}
              {quest.category}
            </span>

            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-bold border shadow-lg ${gradeStyle.badgeBg} ${gradeStyle.color}`}>
              {quest.grade} ({gradeStyle.kanji})
            </span>
          </div>

          {/* Seal Stamp */}
          <div className="absolute top-4 right-4 z-10">
            <div className="w-12 h-12 rounded-lg border-2 border-[#E11D48] bg-[#E11D48]/20 flex flex-col items-center justify-center rotate-6 shadow-xl backdrop-blur-sm">
              <span className="text-sm font-black text-[#E11D48] leading-tight">封印</span>
              <span className="text-[8px] font-mono text-[#E11D48]">LEVEL 1</span>
            </div>
          </div>

          {/* Bottom gradient overlay with location */}
          <div className="absolute bottom-4 left-4 z-10">
            <Link
              to="/map"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B0B12]/90 backdrop-blur-md border border-[#2A2A3D] text-xs font-mono text-zinc-300 hover:text-white hover:border-[#F5B301] transition-colors"
            >
              <MapPin className="w-4 h-4 text-[#F5B301]" />
              <span>{locationName}</span>
              <span className="text-[10px] text-zinc-500">({location?.type})</span>
            </Link>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Mission Title */}
          <div>
            <h1 className="font-bebas text-3xl sm:text-5xl tracking-wide text-[#E8E8F0] leading-tight">
              {quest.title}
            </h1>
            <p className="text-xs font-mono text-[#8B8BA3] mt-1">
              Designated Campus Exorcism Assignment • Sector: {locationName}
            </p>
          </div>

          {/* Full Mission Description */}
          <div className="p-5 rounded-xl bg-[#0B0B12] border border-[#2A2A3D] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#7C3AED]" />
            <h3 className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold mb-2">
              Mission Directives & Intelligence
            </h3>
            <p className="text-sm sm:text-base text-[#E8E8F0] leading-relaxed">
              {quest.description}
            </p>
          </div>

          {/* Key Mission Attributes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* XP Reward Card */}
            <div className="p-4 rounded-xl bg-[#14141F] border border-[#2A2A3D] relative overflow-hidden">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono uppercase text-[#8B8BA3]">Cursed Energy</span>
                <Sparkles className="w-4 h-4 text-[#F5B301]" />
              </div>
              <div className="font-bebas text-3xl text-[#F5B301]">
                +{quest.xp.toLocaleString()} XP
              </div>
              <p className="text-[11px] text-[#8B8BA3] mt-1 font-mono">
                Awarded directly upon completion
              </p>
            </div>

            {/* Bounty Reward Card */}
            <div className="p-4 rounded-xl bg-[#14141F] border border-[#2A2A3D] relative overflow-hidden">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono uppercase text-[#8B8BA3]">Physical Bounty</span>
                <Gift className="w-4 h-4 text-purple-400" />
              </div>
              <div className="font-mono text-sm sm:text-base font-bold text-purple-200 mt-1 line-clamp-1">
                {quest.bounty}
              </div>
              <p className="text-[11px] text-[#8B8BA3] mt-1 font-mono">
                Claimable at CU student guild
              </p>
            </div>

            {/* Proof Type Card */}
            <div className="p-4 rounded-xl bg-[#14141F] border border-[#2A2A3D] relative overflow-hidden">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono uppercase text-[#8B8BA3]">Verification Proof</span>
                {quest.proofType === 'photo' && <Camera className="w-4 h-4 text-blue-400" />}
                {quest.proofType === 'code' && <Terminal className="w-4 h-4 text-emerald-400" />}
                {quest.proofType === 'none' && <ShieldAlert className="w-4 h-4 text-zinc-400" />}
              </div>
              <div className="font-mono text-base font-bold uppercase text-zinc-200 mt-1">
                {quest.proofType === 'photo' && 'Photo Evidence'}
                {quest.proofType === 'code' && 'Code / Hash Proof'}
                {quest.proofType === 'none' && 'Honor System'}
              </div>
              <p className="text-[11px] text-[#8B8BA3] mt-1 font-mono">
                {quest.proofType === 'photo' && 'Upload timestamped photo at location'}
                {quest.proofType === 'code' && 'Submit git hash, DOI, or cipher token'}
                {quest.proofType === 'none' && 'Self-attested upon full completion'}
              </p>
            </div>

          </div>

          {/* Location Context Banner with Map Link */}
          <div className="p-4 rounded-xl bg-[#0B0B12] border border-[#2A2A3D] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#F5B301]/10 border border-[#F5B301]/30 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#F5B301]" />
              </div>
              <div>
                <div className="text-xs font-mono text-[#8B8BA3] uppercase">Deployment Landmark</div>
                <div className="text-sm font-bold text-[#E8E8F0]">
                  {locationName} <span className="font-normal text-zinc-400">({location?.type})</span>
                </div>
              </div>
            </div>

            <Link
              to="/map"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#14141F] border border-[#2A2A3D] text-xs font-mono text-[#F5B301] hover:text-amber-300 hover:border-[#F5B301]/50 transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              <span>View On Campus Map Radar</span>
              <MapPin className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Action Row: Primary Accept Mission Button */}
          <div className="pt-4 border-t border-[#2A2A3D] flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-2 text-xs font-mono text-[#8B8BA3]">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>Status: {accepted ? 'Contract Bound & Active' : 'Unsealed & Available'}</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {accepted && (
                <button
                  onClick={handleToggleAccept}
                  className="px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-rose-400 hover:border-rose-800 text-xs font-mono uppercase transition-colors"
                >
                  Abandon Mission
                </button>
              )}

              <button
                onClick={handleToggleAccept}
                className={`flex-1 sm:flex-none px-8 py-3.5 rounded-xl font-bebas text-xl tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                  accepted
                    ? 'bg-emerald-950/80 border border-emerald-500/60 text-emerald-400 shadow-lg shadow-emerald-950/50'
                    : 'bg-gradient-to-r from-[#7C3AED] via-[#6D28D9] to-[#5B21B6] hover:from-[#8B5CF6] hover:to-[#6D28D9] text-white cursed-glow hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {accepted ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span>MISSION ACCEPTED ✓</span>
                  </>
                ) : (
                  <>
                    <Flame className="w-5 h-5 text-[#F5B301]" />
                    <span>ACCEPT THIS MISSION</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Related Quests Nearby Section */}
      {relatedQuests.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bebas text-2xl text-[#E8E8F0] tracking-wide">
              RELATED MISSIONS IN THIS SECTOR
            </h3>
            <Link to="/board" className="text-xs font-mono text-purple-400 hover:underline">
              View all scrolls →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedQuests.map((rq) => {
              const rLoc = LOCATIONS.find((l) => l.id === rq.locationId);
              const rCat = CATEGORY_COLORS[rq.category];
              return (
                <Link
                  key={rq.id}
                  to={`/quest/${rq.id}`}
                  className="p-4 rounded-xl bg-[#14141F] border border-[#2A2A3D] hover:border-purple-500/50 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                      <span className="font-bold" style={{ color: rCat.hex }}>
                        {rq.category}
                      </span>
                      <span className="text-[#F5B301]">+{rq.xp} XP</span>
                    </div>
                    <h4 className="font-bebas text-lg text-[#E8E8F0] group-hover:text-purple-300 transition-colors line-clamp-1">
                      {rq.title}
                    </h4>
                    <p className="text-xs text-[#8B8BA3] mt-1 line-clamp-2">
                      {rq.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#2A2A3D]/50 text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#F5B301]" />
                    <span className="truncate">{rLoc?.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
