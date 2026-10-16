import { useState, useRef, useEffect, useMemo } from 'react';
import { MapPin, Search, ChevronDown, Check, X, Building2, Sparkles } from 'lucide-react';
import { CITIES, CITY_COORDINATES } from '../data/busesData';

// Helper to highlight matching letters in a string
function HighlightMatch({ text, query }) {
  if (!query || !query.trim()) return <span>{text}</span>;
  const q = query.trim().toLowerCase();
  const index = text.toLowerCase().indexOf(q);
  if (index === -1) return <span>{text}</span>;

  const before = text.substring(0, index);
  const match = text.substring(index, index + q.length);
  const after = text.substring(index + q.length);

  return (
    <span>
      {before}
      <span className="text-red-600 bg-red-50 font-black px-0.5 rounded">{match}</span>
      {after}
    </span>
  );
}

export default function CityCombobox({
  label,
  sublabel,
  value,
  onChange,
  placeholder = 'Select city...',
  isDestination = false,
  otherValue = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'rtc' | 'south' | 'north'
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter cities based on search query or active category
  const filteredCities = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (q) {
      return CITIES.filter((cityName) => {
        const info = CITY_COORDINATES[cityName] || {};
        const nameMatch = cityName.toLowerCase().includes(q);
        const stateMatch = info.state && info.state.toLowerCase().includes(q);
        const codeMatch = info.code && info.code.toLowerCase().includes(q);
        return nameMatch || stateMatch || codeMatch;
      });
    }

    if (activeTab === 'rtc') {
      return CITIES.filter((c) => {
        const s = CITY_COORDINATES[c]?.state;
        return s === 'Karnataka' || s === 'Andhra Pradesh' || s === 'Telangana';
      });
    }

    if (activeTab === 'south') {
      return CITIES.filter((c) => {
        const s = CITY_COORDINATES[c]?.state;
        return s === 'Karnataka' || s === 'Tamil Nadu' || s === 'Kerala' || s === 'Andhra Pradesh' || s === 'Telangana';
      });
    }

    if (activeTab === 'north') {
      return CITIES.filter((c) => {
        const s = CITY_COORDINATES[c]?.state;
        return s !== 'Karnataka' && s !== 'Tamil Nadu' && s !== 'Kerala' && s !== 'Andhra Pradesh' && s !== 'Telangana';
      });
    }

    return CITIES;
  }, [query, activeTab]);

  const handleSelect = (cityName) => {
    onChange(cityName);
    setIsOpen(false);
    setQuery('');
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange('');
    setQuery('');
  };

  const selectedInfo = value ? CITY_COORDINATES[value] : null;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger Button/Card */}
      <div
        onClick={() => {
          setIsOpen(!isOpen);
          setTimeout(() => inputRef.current?.focus(), 50);
        }}
        className={`bg-slate-50 hover:bg-slate-100/90 border rounded-2xl p-3.5 transition-all cursor-pointer ${
          isOpen ? 'border-red-500 ring-2 ring-red-500/10 bg-white' : 'border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {label}
          </label>
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="text-[10px] font-bold text-slate-400 hover:text-red-600 transition-colors p-0.5 rounded cursor-pointer"
              title="Clear selection"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 mt-1">
          <div className="flex items-center gap-2 overflow-hidden min-w-0 flex-1">
            <MapPin className={`w-4 h-4 shrink-0 ${value ? 'text-red-600' : 'text-slate-400'}`} />
            <div className="truncate">
              {value ? (
                <div className="flex items-baseline gap-2">
                  <span className="font-black text-slate-900 text-base">{value}</span>
                  {selectedInfo?.state && (
                    <span className="text-xs text-slate-500 font-semibold truncate hidden sm:inline">
                      {selectedInfo.state}
                    </span>
                  )}
                </div>
              ) : (
                <span className="font-semibold text-slate-400 text-base">{placeholder}</span>
              )}
            </div>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-red-600' : ''
            }`}
          />
        </div>

        <span className="text-[11px] text-slate-500 pl-6 block mt-0.5 truncate">
          {sublabel}
        </span>
      </div>

      {/* Dropdown Popover Directly Below */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-full min-w-[340px] sm:min-w-[420px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 p-3.5 max-h-[420px] flex flex-col animate-in fade-in zoom-in-95 duration-150">
          {/* Search Box with Search Icon and Clear button */}
          <div className="relative shrink-0 mb-2.5">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type matching letters (e.g. hyd, ben, del)..."
              className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/10 transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-2.5 top-2.5 p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Tabs when not actively searching */}
          {!query && (
            <div className="shrink-0 mb-2.5">
              <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl">
                {[
                  { id: 'all', label: `All (${CITIES.length})` },
                  { id: 'rtc', label: 'RTC Hubs' },
                  { id: 'south', label: 'South India' },
                  { id: 'north', label: 'North & West' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-1.5 px-1 rounded-lg text-[10.5px] sm:text-xs font-bold text-center transition-all cursor-pointer truncate ${
                      activeTab === tab.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick empty destination option for 'Going To' */}
          {isDestination && !query && (
            <button
              type="button"
              onClick={() => handleSelect('')}
              className={`shrink-0 w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold mb-2 flex items-center justify-between transition-colors cursor-pointer ${
                value === ''
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span className="truncate">All Destinations (Explore nationwide buses)</span>
              </div>
              {value === '' && <Check className="w-3.5 h-3.5 text-red-600 shrink-0" />}
            </button>
          )}

          {/* Cities List */}
          <div className="min-h-0 flex-1 overflow-y-auto space-y-0.5 pr-1">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1 flex justify-between shrink-0">
              <span>{query ? `Matching Places (${filteredCities.length})` : 'Popular Bus Stations'}</span>
              {query && <span>Press Esc to close</span>}
            </div>

            {filteredCities.length === 0 ? (
              <div className="p-4 text-xs text-slate-400 text-center">
                <p>No matching places found for "{query}".</p>
                <button
                  type="button"
                  onClick={() => handleSelect(query.replace(/\b\w/g, (c) => c.toUpperCase()))}
                  className="mt-2 text-xs font-bold text-red-600 hover:underline cursor-pointer"
                >
                  Search custom destination "{query}"
                </button>
              </div>
            ) : (
              filteredCities.map((cityName) => {
                const info = CITY_COORDINATES[cityName] || {};
                const isSelected = value === cityName;
                const isOther = otherValue === cityName;

                return (
                  <button
                    key={cityName}
                    type="button"
                    onClick={() => handleSelect(cityName)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-red-50 text-red-700'
                        : isOther
                        ? 'text-slate-400 bg-slate-50/50'
                        : 'text-slate-800 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-slate-600 font-mono text-[10px]">
                        {info.code ? info.code.slice(0, 3) : <Building2 className="w-3 h-3" />}
                      </div>
                      <div className="truncate">
                        <p className="leading-tight">
                          <HighlightMatch text={cityName} query={query} />
                        </p>
                        <p className="text-[10px] text-slate-400 font-normal truncate mt-0.5">
                          {info.state || 'India Transit Hub'} • Intercity RTC Terminal
                        </p>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-red-600 shrink-0 ml-2" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
