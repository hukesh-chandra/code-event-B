import React, { useState, useMemo } from 'react';
import { LOCATIONS, Location } from '../data/locations';
import { QUESTS } from '../data/quests';
import { Quest, Category } from '../types';
import { CATEGORY_COLORS, GRADE_CONFIG } from '../utils/constants';
import { isQuestAccepted, acceptQuest } from '../utils/storageA';
import { QuestImage, getCategoryIcon } from '../components/QuestImage';
import { 
  MapPin, 
  Sparkles, 
  Gift, 
  Check, 
  X, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Flame, 
  ExternalLink,
  Layers,
  Compass,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const MapPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<Category | 'All'>('All');
  const [bgMapError, setBgMapError] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [acceptedQuestIds, setAcceptedQuestIds] = useState<string[]>([]);

  // Update accepted quests on mount and storage events
  React.useEffect(() => {
    const updateAccepted = () => {
      const raw = localStorage.getItem('cu_accepted_quests');
      try {
        setAcceptedQuestIds(raw ? JSON.parse(raw) : []);
      } catch (e) {
        setAcceptedQuestIds([]);
      }
    };
    updateAccepted();
    window.addEventListener('cu_storage_update', updateAccepted);
    window.addEventListener('storage', updateAccepted);
    return () => {
      window.removeEventListener('cu_storage_update', updateAccepted);
      window.removeEventListener('storage', updateAccepted);
    };
  }, []);

  // Map each location to its quests
  const locationQuestMap = useMemo(() => {
    const map = new Map<string, Quest[]>();
    for (const loc of LOCATIONS) {
      map.set(loc.id, []);
    }
    for (const q of QUESTS) {
      const list = map.get(q.locationId);
      if (list) {
        list.push(q);
      }
    }
    return map;
  }, []);

  // Filtered locations or quests
  const activeLocationQuests = useMemo(() => {
    if (!selectedLocation) return [];
    const allForLoc = locationQuestMap.get(selectedLocation.id) || [];
    if (selectedCategoryFilter === 'All') return allForLoc;
    return allForLoc.filter((q) => q.category === selectedCategoryFilter);
  }, [selectedLocation, locationQuestMap, selectedCategoryFilter]);

  const handlePinClick = (loc: Location) => {
    setSelectedLocation(loc);
  };

  const handleAcceptSingle = (e: React.MouseEvent, questId: string) => {
    e.stopPropagation();
    acceptQuest(questId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Page Title & Mission Intel Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono tracking-widest text-[#F5B301] font-bold uppercase bg-[#F5B301]/10 px-2 py-0.5 rounded border border-[#F5B301]/30">
              JUJUTSU CARTOGRAPHY RADAR
            </span>
            <span className="text-xs font-mono text-[#8B8BA3]">
              27 Campus Anchor Points
            </span>
          </div>
          <h1 className="font-bebas text-3xl sm:text-4xl lg:text-5xl tracking-wider text-[#E8E8F0]">
            CAMPUS CURSED ENERGY RADAR MAP
          </h1>
        </div>

        {/* Legend / Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#14141F] p-1.5 rounded-xl border border-[#2A2A3D]">
          <button
            onClick={() => setSelectedCategoryFilter('All')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
              selectedCategoryFilter === 'All'
                ? 'bg-[#7C3AED] text-white font-bold'
                : 'text-[#8B8BA3] hover:text-[#E8E8F0]'
            }`}
          >
            All Categories
          </button>
          {(['Workshop', 'Library', 'Coding', 'Club', 'Wellness', 'Secret'] as Category[]).map((cat) => {
            const isSelected = selectedCategoryFilter === cat;
            const col = CATEGORY_COLORS[cat];
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategoryFilter(isSelected ? 'All' : cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
                  isSelected
                    ? `${col.bg} text-white shadow-md font-bold`
                    : 'text-[#8B8BA3] hover:text-[#E8E8F0] hover:bg-[#181828]'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: col.hex }}
                />
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Map Container & Side Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Map Viewport */}
        <div className={`transition-all duration-300 ${selectedLocation ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
          <div className="relative rounded-2xl bg-[#0D0D16] border-2 border-[#2A2A3D] overflow-hidden shadow-2xl">
            
            {/* Map Header Toolbar with Controls */}
            <div className="absolute top-3 left-3 z-30 flex items-center gap-2 bg-[#0B0B12]/80 backdrop-blur-md border border-[#2A2A3D] px-3 py-1.5 rounded-xl text-xs font-mono text-zinc-300">
              <Compass className="w-4 h-4 text-[#F5B301] animate-spin-slow" />
              <span>CHANDIGARH UNIVERSITY SECTOR GRID</span>
            </div>

            {/* Zoom Controls */}
            <div className="absolute top-3 right-3 z-30 flex items-center gap-1 bg-[#0B0B12]/85 backdrop-blur-md border border-[#2A2A3D] p-1 rounded-xl">
              <button
                onClick={() => setZoomLevel((z) => Math.min(1.5, z + 0.15))}
                className="p-1.5 rounded-lg text-[#8B8BA3] hover:text-white hover:bg-[#181828] transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.85, z - 0.15))}
                className="p-1.5 rounded-lg text-[#8B8BA3] hover:text-white hover:bg-[#181828] transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1.5 rounded-lg text-[#8B8BA3] hover:text-white hover:bg-[#181828] transition-colors"
                title="Reset Zoom"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Stylized SVG Map Canvas */}
            <div 
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden cursor-crosshair select-none"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center',
                transition: 'transform 0.25s ease-out'
              }}
            >
              {/* Optional Background Image Slot (/photos/campus-map.jpg) with graceful fallback */}
              {!bgMapError && (
                <img
                  src="/photos/campus-map.jpg"
                  alt="Campus Map Schematic"
                  onError={() => setBgMapError(true)}
                  className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
                />
              )}

              {/* High-Fidelity Stylized SVG Map Schematics */}
              <svg
                viewBox="0 0 1000 750"
                className="w-full h-full absolute inset-0 pointer-events-none"
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Subtle grid pattern */}
                  <pattern id="campus-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2A2A3D" strokeWidth="0.75" strokeOpacity="0.4" />
                  </pattern>
                  <radialGradient id="barrier-aura" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Base grid */}
                <rect width="1000" height="750" fill="url(#campus-grid)" />
                <rect width="1000" height="750" fill="url(#barrier-aura)" />

                {/* Outer Perimeter Ring Road */}
                <rect
                  x="60"
                  y="60"
                  width="880"
                  height="630"
                  rx="40"
                  fill="none"
                  stroke="#2A2A3D"
                  strokeWidth="6"
                  strokeDasharray="16 8"
                  opacity="0.6"
                />

                {/* Main Avenue Roads */}
                {/* North Avenue connecting Gates 3 & 4 */}
                <line x1="80" y1="100" x2="920" y2="100" stroke="#33334A" strokeWidth="4" />
                {/* South Avenue connecting Gates 1 & 2 */}
                <line x1="80" y1="675" x2="920" y2="675" stroke="#33334A" strokeWidth="4" />
                {/* Central Spine Boulevard */}
                <line x1="500" y1="100" x2="500" y2="675" stroke="#33334A" strokeWidth="5" strokeDasharray="10 5" />
                {/* Academic East-West Crossings */}
                <line x1="200" y1="225" x2="850" y2="225" stroke="#252538" strokeWidth="3" />
                <line x1="180" y1="412" x2="750" y2="412" stroke="#252538" strokeWidth="3" />
                <line x1="160" y1="562" x2="800" y2="562" stroke="#252538" strokeWidth="3" />

                {/* Zone Background Rectangles */}
                {/* North Academic Sector (B Blocks + DACA) */}
                <rect x="260" y="180" x2="700" width="420" height="90" rx="14" fill="#14141F" stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.4" />
                <text x="275" y="200" fill="#7C3AED" fontSize="11" fontFamily="monospace" fontWeight="bold" opacity="0.6">B-BLOCK CLUSTER // DACA // WORKSHOP</text>

                {/* Central Academic Sector (A & C Blocks) */}
                <rect x="210" y="370" width="240" height="85" rx="12" fill="#14141F" stroke="#2A2A3D" strokeWidth="1.5" />
                <text x="225" y="390" fill="#8B8BA3" fontSize="11" fontFamily="monospace" opacity="0.6">A-BLOCK CORE</text>

                <rect x="520" y="370" width="240" height="85" rx="12" fill="#14141F" stroke="#2A2A3D" strokeWidth="1.5" />
                <text x="535" y="390" fill="#8B8BA3" fontSize="11" fontFamily="monospace" opacity="0.6">C-BLOCK CLUSTER</text>

                {/* South Academic & Library Sector (D Blocks + D6) */}
                <rect x="170" y="520" width="560" height="85" rx="12" fill="#14141F" stroke="#2A2A3D" strokeWidth="1.5" />
                <text x="185" y="540" fill="#8B8BA3" fontSize="11" fontFamily="monospace" opacity="0.6">D-BLOCK AVENUE // D6 LIBRARY // D4 CANTEEN</text>

                {/* Central Plaza (Food Republic & Fountain Park) */}
                <circle cx="500" cy="337" r="45" fill="#161625" stroke="#F5B301" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.8" />
                <text x="445" y="342" fill="#F5B301" fontSize="10" fontFamily="monospace" opacity="0.8">CENTRAL PLAZA</text>

                <circle cx="500" cy="450" r="35" fill="#121822" stroke="#14B8A6" strokeWidth="1.5" opacity="0.7" />

                {/* Sports Complex Field */}
                <rect x="740" y="490" width="130" height="80" rx="20" fill="#121a1e" stroke="#14B8A6" strokeWidth="1.5" strokeDasharray="8 4" opacity="0.7" />
                <text x="755" y="535" fill="#14B8A6" fontSize="10" fontFamily="monospace">ATHLETIC FIELD</text>

                {/* Workshop Industrial Zone */}
                <rect x="800" y="210" width="100" height="90" rx="10" fill="#141a28" stroke="#3B82F6" strokeWidth="1.5" opacity="0.7" />
                <text x="815" y="255" fill="#3B82F6" fontSize="10" fontFamily="monospace">FORGE / LAB</text>

                {/* Jujutsu Protective Ward Symbols */}
                <g opacity="0.25">
                  <circle cx="80" cy="675" r="35" fill="none" stroke="#E11D48" strokeWidth="1.5" />
                  <circle cx="920" cy="675" r="35" fill="none" stroke="#E11D48" strokeWidth="1.5" />
                  <circle cx="80" cy="75" r="35" fill="none" stroke="#E11D48" strokeWidth="1.5" />
                  <circle cx="920" cy="75" r="35" fill="none" stroke="#E11D48" strokeWidth="1.5" />
                </g>
              </svg>

              {/* PINS OVERLAY FROM LOCATIONS */}
              {LOCATIONS.map((loc) => {
                const questsAtLoc = locationQuestMap.get(loc.id) || [];
                const hasQuests = questsAtLoc.length > 0;
                
                // Filter matching check
                const matchingQuests = selectedCategoryFilter === 'All'
                  ? questsAtLoc
                  : questsAtLoc.filter((q) => q.category === selectedCategoryFilter);

                const isVisibleWithFilter = selectedCategoryFilter === 'All' || matchingQuests.length > 0;
                const isSelected = selectedLocation?.id === loc.id;

                // Determine pin color based on primary quest's category (or first matching)
                const primeCategory = matchingQuests[0]?.category || questsAtLoc[0]?.category || 'Secret';
                const catColor = CATEGORY_COLORS[primeCategory] || CATEGORY_COLORS.Secret;

                // If no quests exist at this location, it's an "unlabeled-quest location" -> dim dot per contract!
                if (!hasQuests) {
                  return (
                    <div
                      key={loc.id}
                      onClick={() => handlePinClick(loc)}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
                      style={{
                        left: `${loc.mapPos.x}%`,
                        top: `${loc.mapPos.y}%`,
                      }}
                      title={`${loc.name} (${loc.type}) - No active cursed anomalies`}
                    >
                      {/* Dim Dot as specified in Contract */}
                      <div className="flex flex-col items-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-600/70 border border-zinc-500/50 group-hover:scale-150 group-hover:bg-zinc-300 transition-all shadow-sm" />
                        <span className="text-[9px] font-mono text-zinc-500 group-hover:text-zinc-300 whitespace-nowrap mt-1 pointer-events-none transition-colors">
                          {loc.name}
                        </span>
                      </div>
                    </div>
                  );
                }

                // If filtered out by category, render dimmer
                if (!isVisibleWithFilter) {
                  return (
                    <div
                      key={loc.id}
                      onClick={() => handlePinClick(loc)}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer opacity-30 hover:opacity-100 transition-opacity"
                      style={{
                        left: `${loc.mapPos.x}%`,
                        top: `${loc.mapPos.y}%`,
                      }}
                    >
                      <div className="w-3 h-3 rounded-full bg-zinc-700 border border-zinc-600" />
                    </div>
                  );
                }

                return (
                  <div
                    key={loc.id}
                    onClick={() => handlePinClick(loc)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                    style={{
                      left: `${loc.mapPos.x}%`,
                      top: `${loc.mapPos.y}%`,
                    }}
                  >
                    {/* Cursed Pulse Ring */}
                    <div
                      className={`absolute -inset-2 rounded-full animate-ping opacity-35 pointer-events-none ${
                        isSelected ? 'opacity-70' : ''
                      }`}
                      style={{ backgroundColor: catColor.hex }}
                    />

                    {/* Interactive Pin Marker */}
                    <div
                      className={`relative flex items-center justify-center rounded-xl p-1.5 transition-all duration-300 shadow-xl ${
                        isSelected
                          ? 'scale-125 ring-4 ring-white z-30'
                          : 'group-hover:scale-115'
                      }`}
                      style={{
                        backgroundColor: isSelected ? catColor.hex : '#0B0B12',
                        border: `2px solid ${catColor.hex}`,
                        boxShadow: `0 0 16px ${catColor.hex}66`,
                      }}
                    >
                      <div style={{ color: isSelected ? '#FFFFFF' : catColor.hex }}>
                        {getCategoryIcon(primeCategory, "w-4 h-4")}
                      </div>

                      {/* Quest Count Badge */}
                      {questsAtLoc.length > 1 && (
                        <span 
                          className="absolute -top-2 -right-2 w-4 h-4 rounded-full text-[9px] font-bold font-mono flex items-center justify-center text-white shadow"
                          style={{ backgroundColor: catColor.hex }}
                        >
                          {questsAtLoc.length}
                        </span>
                      )}
                    </div>

                    {/* Pin Label */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 pointer-events-none flex flex-col items-center">
                      <span 
                        className={`text-[10px] font-mono font-bold whitespace-nowrap px-1.5 py-0.5 rounded shadow-md transition-all ${
                          isSelected
                            ? 'bg-[#E8E8F0] text-[#0B0B12] scale-105'
                            : 'bg-[#0B0B12]/90 text-[#E8E8F0] border border-[#2A2A3D] group-hover:border-purple-400'
                        }`}
                      >
                        {loc.name}
                      </span>
                    </div>

                  </div>
                );
              })}

            </div>

            {/* Bottom Map Info Footer */}
            <div className="p-3 bg-[#0B0B12]/90 border-t border-[#2A2A3D] flex flex-wrap items-center justify-between gap-2 text-xs text-[#8B8BA3] font-mono">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]" />
                  Click any pin to inspect sector quests
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-zinc-600" />
                  Dim dots = Quiet zones
                </span>
              </div>
              <span>Coordinate System: 100x100 Rel %</span>
            </div>

          </div>

          {/* Quick Location Directory Grid */}
          <div className="mt-6 bg-[#14141F] border border-[#2A2A3D] rounded-xl p-4">
            <div className="text-xs font-mono uppercase text-[#8B8BA3] mb-3 flex items-center justify-between">
              <span>Campus Sector Directory ({LOCATIONS.length} Landmarks)</span>
              <span className="text-[11px] text-purple-400">Click any sector to lock radar</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {LOCATIONS.map((loc) => {
                const count = (locationQuestMap.get(loc.id) || []).length;
                const isSelected = selectedLocation?.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className={`p-2 rounded-lg text-left text-xs font-mono transition-all border ${
                      isSelected
                        ? 'bg-[#7C3AED]/20 border-[#7C3AED] text-purple-300 font-bold'
                        : 'bg-[#0B0B12] border-[#2A2A3D] text-[#8B8BA3] hover:text-[#E8E8F0] hover:border-purple-500/40'
                    }`}
                  >
                    <div className="truncate font-medium text-[#E8E8F0]">
                      {loc.name}
                    </div>
                    <div className="text-[10px] text-[#8B8BA3] flex items-center justify-between mt-0.5">
                      <span>{loc.type}</span>
                      <span className={count > 0 ? 'text-[#F5B301] font-bold' : 'text-zinc-600'}>
                        {count > 0 ? `${count}Q` : '—'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side Panel: Quest Details & Accept Action */}
        {selectedLocation && (
          <div className="lg:col-span-4 bg-[#14141F] border border-[#7C3AED]/50 rounded-2xl p-5 shadow-2xl animate-fade-in relative">
            
            {/* Close button */}
            <button
              onClick={() => setSelectedLocation(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#0B0B12] border border-[#2A2A3D] text-[#8B8BA3] hover:text-[#E8E8F0] transition-colors"
              aria-label="Close detail panel"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Location Header */}
            <div className="pr-10 mb-4 pb-3 border-b border-[#2A2A3D]">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#F5B301] mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#F5B301]" />
                <span>Sector: {selectedLocation.type}</span>
              </div>
              <h2 className="font-bebas text-2xl sm:text-3xl text-[#E8E8F0] tracking-wide">
                {selectedLocation.name}
              </h2>
              <p className="text-[11px] font-mono text-[#8B8BA3] mt-0.5">
                Grid: X:{selectedLocation.mapPos.x}% | Y:{selectedLocation.mapPos.y}%
              </p>
            </div>

            {/* Quests at this Location */}
            {activeLocationQuests.length > 0 ? (
              <div className="space-y-4 max-h-[calc(100vh-20rem)] overflow-y-auto pr-1">
                <div className="text-xs font-mono text-purple-300 uppercase tracking-wider flex items-center justify-between">
                  <span>Active Cursed Missions ({activeLocationQuests.length})</span>
                </div>

                {activeLocationQuests.map((quest) => {
                  const isAccepted = acceptedQuestIds.includes(quest.id);
                  const catColor = CATEGORY_COLORS[quest.category] || CATEGORY_COLORS.Secret;
                  const gradeStyle = GRADE_CONFIG[quest.grade];

                  return (
                    <div
                      key={quest.id}
                      className="p-3.5 rounded-xl bg-[#0B0B12] border border-[#2A2A3D] hover:border-purple-500/50 transition-all flex flex-col justify-between group"
                    >
                      {/* Quest Category & Grade */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-mono font-bold"
                          style={{
                            backgroundColor: `${catColor.hex}22`,
                            color: catColor.hex,
                            border: `1px solid ${catColor.hex}50`,
                          }}
                        >
                          {quest.category}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${gradeStyle.badgeBg} ${gradeStyle.color}`}>
                          {quest.grade} ({gradeStyle.kanji})
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h4 className="font-bebas text-lg text-[#E8E8F0] group-hover:text-purple-300 transition-colors">
                        {quest.title}
                      </h4>
                      <p className="text-xs text-[#8B8BA3] mt-1 line-clamp-3 leading-relaxed">
                        {quest.description}
                      </p>

                      {/* XP & Bounty Badges */}
                      <div className="mt-3 pt-2 border-t border-[#2A2A3D]/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="text-[#F5B301] font-mono font-bold flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#F5B301]" />
                          +{quest.xp} XP
                        </span>
                        <span className="text-purple-300 font-mono text-[11px] truncate max-w-[150px]">
                          🎁 {quest.bounty}
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-3.5 flex items-center gap-2">
                        <button
                          onClick={(e) => handleAcceptSingle(e, quest.id)}
                          disabled={isAccepted}
                          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                            isAccepted
                              ? 'bg-emerald-950/70 border border-emerald-500/50 text-emerald-400 cursor-default'
                              : 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white cursed-glow-sm'
                          }`}
                        >
                          {isAccepted ? (
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
                          className="p-1.5 rounded-lg bg-[#14141F] border border-[#2A2A3D] text-[#8B8BA3] hover:text-[#E8E8F0] transition-colors"
                          title="Full Mission Dossier"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* No Quests at this Location (or filtered out) */
              <div className="py-8 px-4 text-center bg-[#0B0B12] rounded-xl border border-[#2A2A3D]">
                <Info className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
                <h4 className="font-bebas text-lg text-[#E8E8F0]">
                  NO ACTIVE SEALS DETECTED
                </h4>
                <p className="text-xs text-[#8B8BA3] mt-1 leading-relaxed">
                  {selectedCategoryFilter !== 'All'
                    ? `No ${selectedCategoryFilter} quests found at ${selectedLocation.name}. Clear category filter above to see all.`
                    : `This campus landmark currently has no designated cursed missions. Cursed energy levels remain nominal.`}
                </p>
                {selectedCategoryFilter !== 'All' && (
                  <button
                    onClick={() => setSelectedCategoryFilter('All')}
                    className="mt-3 px-3 py-1 rounded bg-[#7C3AED]/20 text-purple-300 border border-[#7C3AED]/40 text-xs font-mono"
                  >
                    View All Quests Here
                  </button>
                )}
              </div>
            )}

            {/* View on Mission Board CTA */}
            <div className="mt-5 pt-3 border-t border-[#2A2A3D] text-center">
              <Link
                to={`/board`}
                className="text-xs font-mono text-[#F5B301] hover:underline inline-flex items-center gap-1"
              >
                <span>Browse all 30 missions in Mission Board →</span>
              </Link>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
