import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Scroll, 
  MapPin, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  Award, 
  BookOpen, 
  Code2, 
  Wrench, 
  Users2 
} from 'lucide-react';
import { QUESTS } from '../data/quests';
import { LOCATIONS } from '../data/locations';
import { getAcceptedQuestIds, getPlayerProfile } from '../utils/storageA';
import { GRADE_CONFIG } from '../utils/constants';

export const LandingPage: React.FC = () => {
  const [heroImgError, setHeroImgError] = useState(false);
  const acceptedIds = getAcceptedQuestIds();
  const player = getPlayerProfile();

  const totalXP = QUESTS.reduce((acc, q) => acc + q.xp, 0);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden">
      
      {/* Background ambient cursed atmosphere */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#7C3AED]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-[#E11D48]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-80 h-80 bg-[#F5B301]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Seal Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#14141F] border border-[#7C3AED]/50 cursed-glow-sm">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-ping" />
              <span className="text-xs font-mono tracking-widest text-purple-300 font-bold uppercase">
                Chandigarh University ✕ Jujutsu High
              </span>
            </div>

            {/* Title from Contract */}
            <div>
              <h1 className="font-bebas text-5xl sm:text-7xl lg:text-8xl tracking-wider text-[#E8E8F0] leading-[0.9] cursed-text-shadow">
                CURSED MISSION <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-purple-300 to-[#F5B301]">
                  BOARD
                </span>
              </h1>
              
              {/* Tagline from Contract */}
              <p className="font-mono text-sm sm:text-base lg:text-lg text-[#F5B301] tracking-widest font-bold mt-4 flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#F5B301]" />
                DISCOVER → ACCEPT → COMPLETE → LEVEL UP
              </p>
            </div>

            {/* Subtext */}
            <p className="text-sm sm:text-base text-[#8B8BA3] max-w-xl leading-relaxed">
              Step into Chandigarh University's clandestine sorcery grid. Campus tasks, academic milestones, and hidden lore have materialized as cursed missions. Accept official scrolls, scout campus grounds, and expand your domain.
            </p>

            {/* CTA from Contract */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/board"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#6D28D9] to-[#5B21B6] text-white font-bebas text-xl tracking-wider hover:from-[#8B5CF6] hover:to-[#6D28D9] cursed-glow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>ENTER JUJUTSU HIGH</span>
                <ArrowRight className="w-5 h-5 text-[#F5B301]" />
              </Link>

              <Link
                to="/map"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#14141F] border border-[#2A2A3D] text-[#E8E8F0] font-bebas text-xl tracking-wider hover:border-[#7C3AED]/70 hover:bg-[#181828] transition-all"
              >
                <MapPin className="w-5 h-5 text-[#F5B301]" />
                <span>EXPLORE CAMPUS MAP</span>
              </Link>
            </div>

            {/* Quick Live Stats */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#2A2A3D]/70 max-w-lg">
              <div className="p-3 rounded-lg bg-[#14141F]/80 border border-[#2A2A3D]">
                <div className="text-[10px] uppercase font-mono text-[#8B8BA3]">Total Missions</div>
                <div className="font-bebas text-2xl text-purple-300">{QUESTS.length} Scrolls</div>
              </div>
              <div className="p-3 rounded-lg bg-[#14141F]/80 border border-[#2A2A3D]">
                <div className="text-[10px] uppercase font-mono text-[#8B8BA3]">Accepted Quests</div>
                <div className="font-bebas text-2xl text-emerald-400">{acceptedIds.length} Active</div>
              </div>
              <div className="p-3 rounded-lg bg-[#14141F]/80 border border-[#2A2A3D]">
                <div className="text-[10px] uppercase font-mono text-[#8B8BA3]">Available XP</div>
                <div className="font-bebas text-2xl text-[#F5B301]">+{totalXP.toLocaleString()}</div>
              </div>
            </div>

          </div>

          {/* Right Hero Image Slot with Fallback */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#2A2A3D] bg-[#14141F] shadow-2xl shadow-purple-950/50 group">
              
              {/* Hero Image Slot: /photos/hero-campus.jpg with dark gradient fallback */}
              {!heroImgError ? (
                <div className="relative aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5] overflow-hidden">
                  <img
                    src="/photos/hero-campus.jpg"
                    alt="Chandigarh University Jujutsu High Campus"
                    onError={() => setHeroImgError(true)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B12] via-[#0B0B12]/40 to-transparent pointer-events-none" />
                </div>
              ) : (
                /* Fallback Dark Gradient Cursed Artwork */
                <div className="relative aspect-[4/5] sm:aspect-[4/4] lg:aspect-[4/5] flex flex-col items-center justify-between p-8 bg-gradient-to-br from-[#1c1830] via-[#12121e] to-[#0a0a10]">
                  {/* Cursed pattern background */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#7C3AED_1px,transparent_1px)] [background-size:20px_20px]" />

                  {/* Japanese high talisman header */}
                  <div className="relative z-10 w-full flex items-center justify-between border-b border-purple-500/20 pb-3">
                    <span className="font-mono text-xs text-purple-300 font-bold tracking-widest">
                      呪術高等専門学校
                    </span>
                    <span className="text-xs font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                      CU-PBI DIVISION
                    </span>
                  </div>

                  {/* Center Cursed Emblem */}
                  <div className="relative z-10 flex flex-col items-center text-center my-auto">
                    <div className="relative w-28 h-28 rounded-2xl bg-gradient-to-tr from-[#7C3AED] via-[#9333EA] to-[#E11D48] p-[2px] cursed-glow mb-4">
                      <div className="w-full h-full bg-[#0B0B12] rounded-2xl flex flex-col items-center justify-center">
                        <Flame className="w-12 h-12 text-[#F5B301] animate-pulse" />
                        <span className="font-serif text-sm font-black text-purple-300 tracking-wider mt-1">
                          呪術結界
                        </span>
                      </div>
                    </div>
                    <h3 className="font-bebas text-3xl tracking-wider text-[#E8E8F0]">
                      CHANDIGARH SORCERY ARCHIVE
                    </h3>
                    <p className="text-xs text-[#8B8BA3] max-w-xs mt-1">
                      Boundary barriers active across 27 designated campus landmarks and 4 outer perimeter gates.
                    </p>
                  </div>

                  {/* Bottom seal */}
                  <div className="relative z-10 w-full flex items-center justify-between text-[11px] font-mono text-zinc-400 border-t border-[#2A2A3D] pt-3">
                    <span>SEAL PROTOCOL: LEVEL 5</span>
                    <span className="text-[#E11D48] font-bold">封印維持中</span>
                  </div>
                </div>
              )}

              {/* Decorative Corner Seals */}
              <div className="absolute top-4 right-4 z-20">
                <div className="px-3 py-1 bg-[#E11D48] text-white font-mono text-xs font-bold rounded shadow-lg shadow-rose-900/50 flex items-center gap-1 rotate-2">
                  <span>特別任務</span>
                  <span>SPECIAL GRADE</span>
                </div>
              </div>

              {/* Bottom Quick-Launch Badge */}
              <div className="absolute bottom-4 left-4 right-4 z-20 p-3 rounded-xl bg-[#0B0B12]/85 backdrop-blur-md border border-[#2A2A3D] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono text-zinc-300">
                    27 Campus Locations Synced
                  </span>
                </div>
                <Link
                  to="/board"
                  className="text-xs font-bold text-[#F5B301] hover:text-amber-300 flex items-center gap-1 font-mono uppercase"
                >
                  <span>Open Ledger</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Grade Classification Overview Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full border-t border-[#2A2A3D]/70">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-mono text-purple-400 uppercase tracking-widest font-bold">
            Sorcerer Rank Hierarchy
          </span>
          <h2 className="font-bebas text-3xl sm:text-4xl tracking-wider text-[#E8E8F0] mt-1">
            MISSION GRADE CLASSIFICATION
          </h2>
          <p className="text-xs sm:text-sm text-[#8B8BA3]">
            Quests are graded by danger and technical difficulty. Higher grades grant larger XP reserves and elite bounties.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {(['Grade 4', 'Grade 3', 'Grade 2', 'Grade 1', 'Special Grade'] as const).map((grade) => {
            const config = GRADE_CONFIG[grade];
            const count = QUESTS.filter((q) => q.grade === grade).length;
            return (
              <div
                key={grade}
                className="p-4 rounded-xl bg-[#14141F] border border-[#2A2A3D] hover:border-purple-500/50 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-serif font-black text-purple-400/80 group-hover:text-purple-300">
                    {config.kanji}
                  </span>
                  <span className="text-xs font-mono text-[#8B8BA3]">
                    {count} Quests
                  </span>
                </div>
                <div className={`font-bebas text-xl ${config.color} tracking-wide`}>
                  {grade}
                </div>
                <p className="text-[11px] text-[#8B8BA3] mt-1 line-clamp-2">
                  {grade === 'Grade 4' && 'Basic campus rituals, library searches, and beginner trials.'}
                  {grade === 'Grade 3' && 'Refined focus, code debugging, and club challenges.'}
                  {grade === 'Grade 2' && 'Advanced engineering, sports endurance, and complex algorithms.'}
                  {grade === 'Grade 1' && 'Major technical milestones, digital mastery, and high XP.'}
                  {grade === 'Special Grade' && 'Maximum danger anomalies: Zero-day exorcism & boundary secrets.'}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Campus Zones Teaser Banner */}
      <section className="relative z-10 bg-[#14141F]/80 border-t border-[#2A2A3D] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/50 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-[#F5B301]" />
            </div>
            <div>
              <h3 className="font-bebas text-2xl text-[#E8E8F0] tracking-wide">
                INTERACTIVE JUJUTSU CAMPUS CARTOGRAPHY
              </h3>
              <p className="text-xs text-[#8B8BA3]">
                Navigate all 27 campus coordinates: Gates 1–4, Academic Blocks A–D, D6 Library, Workshop, and Canteens.
              </p>
            </div>
          </div>
          <Link
            to="/map"
            className="px-6 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bebas text-lg tracking-wider cursed-glow-sm transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <span>LAUNCH RADAR MAP</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
};
