import React, { useState, useMemo } from 'react';
import { QUESTS } from '../data/quests';
import { LOCATIONS } from '../data/locations';
import { Category, Grade, Quest } from '../types';
import { CATEGORY_COLORS, GRADE_CONFIG, LOCATION_TYPES } from '../utils/constants';
import { getAcceptedQuestIds } from '../utils/storageA';
import { QuestCard } from '../components/QuestCard';
import { DailyBulletin } from '../components/DailyBulletin';
import { 
  Search, 
  Filter, 
  MapPin, 
  SlidersHorizontal, 
  Sparkles, 
  RotateCcw,
  CheckCircle2,
  Compass,
  Layers,
  ChevronDown
} from 'lucide-react';

export const BoardPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedGrade, setSelectedGrade] = useState<Grade | 'All'>('All');
  const [selectedLocationId, setSelectedLocationId] = useState<string>('All');
  const [selectedLocationType, setSelectedLocationType] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'xp-desc' | 'xp-asc' | 'grade-desc' | 'title'>('xp-desc');
  const [statusFilter, setStatusFilter] = useState<'all' | 'accepted' | 'unaccepted'>('all');

  const acceptedIds = getAcceptedQuestIds();

  const categories: (Category | 'All')[] = [
    'All',
    'Workshop',
    'Library',
    'Coding',
    'Club',
    'Wellness',
    'Secret',
  ];

  const grades: (Grade | 'All')[] = [
    'All',
    'Grade 4',
    'Grade 3',
    'Grade 2',
    'Grade 1',
    'Special Grade',
  ];

  // Grade numerical rank for sorting
  const gradeRankMap: Record<Grade, number> = {
    'Grade 4': 1,
    'Grade 3': 2,
    'Grade 2': 3,
    'Grade 1': 4,
    'Special Grade': 5,
  };

  // Filtered and sorted quests
  const filteredQuests = useMemo(() => {
    return QUESTS.filter((quest) => {
      // Search text filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const location = LOCATIONS.find((l) => l.id === quest.locationId);
        const locationName = location ? location.name.toLowerCase() : '';
        const matchesTitle = quest.title.toLowerCase().includes(query);
        const matchesDesc = quest.description.toLowerCase().includes(query);
        const matchesBounty = quest.bounty.toLowerCase().includes(query);
        const matchesLocation = locationName.includes(query);
        if (!matchesTitle && !matchesDesc && !matchesBounty && !matchesLocation) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'All' && quest.category !== selectedCategory) {
        return false;
      }

      // Grade filter
      if (selectedGrade !== 'All' && quest.grade !== selectedGrade) {
        return false;
      }

      // Location ID filter
      if (selectedLocationId !== 'All' && quest.locationId !== selectedLocationId) {
        return false;
      }

      // Location Type filter
      if (selectedLocationType !== 'All') {
        const loc = LOCATIONS.find((l) => l.id === quest.locationId);
        if (!loc || loc.type.toLowerCase() !== selectedLocationType.toLowerCase()) {
          return false;
        }
      }

      // Acceptance status filter
      if (statusFilter === 'accepted' && !acceptedIds.includes(quest.id)) {
        return false;
      }
      if (statusFilter === 'unaccepted' && acceptedIds.includes(quest.id)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'xp-desc') {
        return b.xp - a.xp;
      }
      if (sortBy === 'xp-asc') {
        return a.xp - b.xp;
      }
      if (sortBy === 'grade-desc') {
        return gradeRankMap[b.grade] - gradeRankMap[a.grade];
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedGrade,
    selectedLocationId,
    selectedLocationType,
    sortBy,
    statusFilter,
    acceptedIds,
  ]);

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'All' ||
    selectedGrade !== 'All' ||
    selectedLocationId !== 'All' ||
    selectedLocationType !== 'All' ||
    statusFilter !== 'all';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedGrade('All');
    setSelectedLocationId('All');
    setSelectedLocationType('All');
    setStatusFilter('all');
    setSortBy('xp-desc');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono tracking-widest text-purple-400 font-bold uppercase">
              JUJUTSU HIGH CLASSIFIED ARCHIVES
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#14141F] border border-[#2A2A3D] text-zinc-400">
              30 Active Seals
            </span>
          </div>
          <h1 className="font-bebas text-4xl sm:text-5xl lg:text-6xl tracking-wider text-[#E8E8F0] cursed-text-shadow">
            MISSION DISCOVERY BOARD
          </h1>
          <p className="text-xs sm:text-sm text-[#8B8BA3] max-w-2xl mt-1">
            Browse cursed scrolls materializing throughout Chandigarh University. Filter by grade danger levels, campus landmarks, or bounty classifications to accept your next exorcism assignment.
          </p>
        </div>

        {/* Quick Sorcerer Status Tracker */}
        <div className="flex items-center gap-3 bg-[#14141F] border border-[#2A2A3D] px-4 py-3 rounded-xl">
          <div className="text-right">
            <div className="text-[10px] font-mono uppercase text-[#8B8BA3]">Accepted In Deck</div>
            <div className="font-bebas text-xl text-emerald-400">
              {acceptedIds.length} / {QUESTS.length} Missions
            </div>
          </div>
          <div className="h-8 w-px bg-[#2A2A3D]" />
          <div className="text-right">
            <div className="text-[10px] font-mono uppercase text-[#8B8BA3]">Total XP Stored</div>
            <div className="font-bebas text-xl text-[#F5B301]">
              +{QUESTS.reduce((s, q) => s + (acceptedIds.includes(q.id) ? q.xp : 0), 0)} XP
            </div>
          </div>
        </div>
      </div>

      {/* Requirement 4: Daily Rotating Mission Bulletin Banner */}
      <DailyBulletin />

      {/* FILTER & DISCOVERY CONTROL CONSOLE */}
      <div className="bg-[#14141F] border border-[#2A2A3D] rounded-2xl p-5 mb-8 space-y-5 shadow-lg">
        
        {/* Row 1: Search box & Sort & Status Filter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Search Box */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-[#8B8BA3] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scrolls by title, description, bounty, or location..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B0B12] border border-[#2A2A3D] text-sm text-[#E8E8F0] placeholder-[#8B8BA3]/60 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#8B8BA3] hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0B12] border border-[#2A2A3D] text-xs font-mono text-[#E8E8F0] appearance-none focus:outline-none focus:border-[#7C3AED] cursor-pointer"
              >
                <option value="xp-desc">⚡ Sort by XP: High → Low</option>
                <option value="xp-asc">⚡ Sort by XP: Low → High</option>
                <option value="grade-desc">⚔ Sort by Grade Rank</option>
                <option value="title">🔤 Sort by Title (A-Z)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#8B8BA3] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Status Tabs (All / Accepted / Unaccepted) */}
          <div className="md:col-span-3 flex rounded-xl bg-[#0B0B12] p-1 border border-[#2A2A3D]">
            <button
              onClick={() => setStatusFilter('all')}
              className={`flex-1 py-1.5 text-xs font-mono rounded-lg transition-all ${
                statusFilter === 'all'
                  ? 'bg-[#7C3AED] text-white font-bold'
                  : 'text-[#8B8BA3] hover:text-[#E8E8F0]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('accepted')}
              className={`flex-1 py-1.5 text-xs font-mono rounded-lg transition-all ${
                statusFilter === 'accepted'
                  ? 'bg-emerald-900/60 text-emerald-300 font-bold border border-emerald-500/30'
                  : 'text-[#8B8BA3] hover:text-[#E8E8F0]'
              }`}
            >
              Accepted ({acceptedIds.length})
            </button>
            <button
              onClick={() => setStatusFilter('unaccepted')}
              className={`flex-1 py-1.5 text-xs font-mono rounded-lg transition-all ${
                statusFilter === 'unaccepted'
                  ? 'bg-[#181828] text-purple-300 font-bold'
                  : 'text-[#8B8BA3] hover:text-[#E8E8F0]'
              }`}
            >
              Unsealed
            </button>
          </div>

        </div>

        {/* Row 2: Category Chips */}
        <div>
          <div className="text-[11px] font-mono text-[#8B8BA3] uppercase tracking-wider mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              Category Classification
            </span>
            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-[10px] text-purple-400 hover:underline"
              >
                Clear Category
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              const colorInfo = cat !== 'All' ? CATEGORY_COLORS[cat] : null;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? cat === 'All'
                        ? 'bg-[#7C3AED] text-white cursed-glow-sm'
                        : `${colorInfo?.bg} text-white shadow-md font-bold`
                      : 'bg-[#0B0B12] text-[#8B8BA3] hover:text-[#E8E8F0] hover:bg-[#181828] border border-[#2A2A3D]'
                  }`}
                  style={
                    isSelected && colorInfo
                      ? {
                          boxShadow: `0 0 12px ${colorInfo.hex}50`,
                          borderColor: colorInfo.hex,
                        }
                      : {}
                  }
                >
                  {cat !== 'All' && (
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: isSelected ? '#FFFFFF' : colorInfo?.hex,
                      }}
                    />
                  )}
                  <span>{cat}</span>
                  <span className="text-[10px] font-mono opacity-60">
                    ({cat === 'All' ? QUESTS.length : QUESTS.filter((q) => q.category === cat).length})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 3: Secondary Dropdowns (Grade, Location, Location-Type) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#2A2A3D]/60">
          
          {/* Grade Dropdown */}
          <div>
            <label className="block text-[10px] font-mono uppercase text-[#8B8BA3] mb-1">
              Sorcerer Grade
            </label>
            <div className="relative">
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg bg-[#0B0B12] border border-[#2A2A3D] text-xs font-mono text-[#E8E8F0] appearance-none focus:outline-none focus:border-[#7C3AED] cursor-pointer"
              >
                <option value="All">All Grades (All Levels)</option>
                {grades.filter((g) => g !== 'All').map((g) => (
                  <option key={g} value={g}>
                    {g} ({GRADE_CONFIG[g as Grade]?.kanji})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#8B8BA3] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Location Dropdown */}
          <div>
            <label className="block text-[10px] font-mono uppercase text-[#8B8BA3] mb-1">
              Specific Campus Location
            </label>
            <div className="relative">
              <select
                value={selectedLocationId}
                onChange={(e) => setSelectedLocationId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0B0B12] border border-[#2A2A3D] text-xs font-mono text-[#E8E8F0] appearance-none focus:outline-none focus:border-[#7C3AED] cursor-pointer"
              >
                <option value="All">All Campus Locations ({LOCATIONS.length})</option>
                {LOCATIONS.map((loc) => {
                  const questCount = QUESTS.filter((q) => q.locationId === loc.id).length;
                  return (
                    <option key={loc.id} value={loc.id}>
                      {loc.name} — {loc.type} ({questCount} {questCount === 1 ? 'quest' : 'quests'})
                    </option>
                  );
                })}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#8B8BA3] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Location-Type Filter */}
          <div>
            <label className="block text-[10px] font-mono uppercase text-[#8B8BA3] mb-1">
              Location Type
            </label>
            <div className="relative">
              <select
                value={selectedLocationType}
                onChange={(e) => setSelectedLocationType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0B0B12] border border-[#2A2A3D] text-xs font-mono text-[#E8E8F0] appearance-none focus:outline-none focus:border-[#7C3AED] cursor-pointer"
              >
                {LOCATION_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type === 'All' ? 'All Location Types' : type}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#8B8BA3] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Active Filters Bar & Reset */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#2A2A3D]/40 text-xs">
            <div className="flex items-center gap-2 text-purple-300 font-mono">
              <Filter className="w-3.5 h-3.5 text-purple-400" />
              <span>
                Filtering active • Showing {filteredQuests.length} of {QUESTS.length} scrolls
              </span>
            </div>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-rose-950/40 text-rose-300 border border-rose-800/40 hover:bg-rose-900/60 font-mono text-[11px] transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset All Filters
            </button>
          </div>
        )}

      </div>

      {/* QUESTS GRID */}
      {filteredQuests.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8B8BA3]">
              Active Cursed Decrees ({filteredQuests.length})
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuests.map((quest) => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-2xl bg-[#14141F] border border-[#2A2A3D] max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-[#7C3AED]/10 border border-[#7C3AED]/30 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-purple-400" />
          </div>
          <h3 className="font-bebas text-2xl tracking-wide text-[#E8E8F0]">
            NO CURSED SCROLLS FOUND
          </h3>
          <p className="text-xs text-[#8B8BA3] mt-2 leading-relaxed">
            No missions match your selected filters. Either refine your search parameters or reset all filters to unseal more archives.
          </p>
          <button
            onClick={resetFilters}
            className="mt-5 px-5 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

    </div>
  );
};
