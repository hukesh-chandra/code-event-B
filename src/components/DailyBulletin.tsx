import React, { useState, useEffect } from 'react';
import { getDailyQuests, getSecondsUntilMidnight, formatCountdown, getTodayDateString } from '../utils/dailyQuests';
import { QuestCard } from './QuestCard';
import { Clock, Flame, Sparkles, Shield, AlertTriangle } from 'lucide-react';

export const DailyBulletin: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState(getSecondsUntilMidnight());
  const dailyQuests = getDailyQuests(getTodayDateString());

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(getSecondsUntilMidnight());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const time = formatCountdown(secondsLeft);

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#181528] via-[#12121e] to-[#0d0d16] border-2 border-[#7C3AED]/50 p-4 sm:p-6 mb-10 shadow-2xl shadow-purple-950/40">
      
      {/* Background cursed energy aura */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7C3AED]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-72 h-72 bg-[#F5B301]/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Top Banner Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#2A2A3D]">
        
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-widest bg-[#E11D48]/20 border border-[#E11D48]/50 text-rose-400">
              <Flame className="w-3 h-3 text-[#E11D48]" />
              Priority Directive
            </span>
            <span className="text-xs font-mono text-purple-400/80">
              本日の呪術任務 (Daily Scrolls)
            </span>
          </div>

          <h2 className="font-bebas text-2xl sm:text-3xl lg:text-4xl tracking-wider text-[#E8E8F0] flex items-center gap-2">
            DAILY ROTATING MISSION BULLETIN
          </h2>
          
          <p className="text-xs sm:text-sm text-[#8B8BA3] max-w-xl">
            Sorcery council orders seeded for today's celestial alignment. Clear these high-priority missions before midnight resets the barrier.
          </p>
        </div>

        {/* Countdown to Midnight Box */}
        <div className="flex items-center gap-3 bg-[#0B0B12]/80 border border-[#2A2A3D] px-4 py-3 rounded-xl self-start md:self-auto cursed-glow-sm">
          <Clock className="w-5 h-5 text-[#F5B301] animate-pulse" />
          <div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-[#8B8BA3] flex items-center gap-1">
              <span>Midnight Reset Countdown</span>
            </div>
            <div className="flex items-center gap-1 font-mono font-bold text-lg sm:text-xl text-[#F5B301]">
              <span className="bg-[#14141F] px-1.5 py-0.5 rounded border border-[#2A2A3D]">{time.hours}</span>
              <span className="text-[#8B8BA3]">:</span>
              <span className="bg-[#14141F] px-1.5 py-0.5 rounded border border-[#2A2A3D]">{time.minutes}</span>
              <span className="text-[#8B8BA3]">:</span>
              <span className="bg-[#14141F] px-1.5 py-0.5 rounded border border-[#2A2A3D]">{time.seconds}</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3 Featured Quests Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {dailyQuests.map((quest) => (
          <QuestCard 
            key={`daily-${quest.id}`} 
            quest={quest} 
            featured={true} 
          />
        ))}
      </div>

      {/* Bottom status note */}
      <div className="relative z-10 mt-5 pt-3 border-t border-[#2A2A3D]/40 flex flex-wrap items-center justify-between gap-2 text-xs text-[#8B8BA3] font-mono">
        <span className="flex items-center gap-1.5 text-purple-300">
          <Sparkles className="w-3.5 h-3.5 text-[#F5B301]" />
          3 Deterministically Synchronized Daily Scrolls
        </span>
        <span className="text-[11px] text-zinc-400">
          Rotation Seed: {getTodayDateString()} (Auto-refresh at 00:00 AM)
        </span>
      </div>
    </section>
  );
};
