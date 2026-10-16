import { useState } from 'react';
import {
  ArrowRightLeft,
  Search,
  AlertCircle,
  ShieldCheck,
  Check
} from 'lucide-react';
import CityCombobox from './CityCombobox';
import AppleDateDropdown from './AppleDateDropdown';

export default function BookingPortal({
  searchParams,
  onUpdateSearch,
  activeFilter,
  onFilterChange
}) {
  const [error, setError] = useState('');
  const [fromCity, setFromCity] = useState(searchParams.from || '');
  const [toCity, setToCity] = useState(searchParams.to || '');
  const [prevFrom, setPrevFrom] = useState(searchParams.from);
  const [prevTo, setPrevTo] = useState(searchParams.to);

  // Sync state during render when props change externally
  if (searchParams.from !== prevFrom) {
    setPrevFrom(searchParams.from);
    setFromCity(searchParams.from || '');
  }
  if (searchParams.to !== prevTo) {
    setPrevTo(searchParams.to);
    setToCity(searchParams.to || '');
  }

  const handleSwap = () => {
    setError('');
    const newFrom = toCity;
    const newTo = fromCity;
    setFromCity(newFrom);
    setToCity(newTo);
    onUpdateSearch({
      ...searchParams,
      from: newFrom,
      to: newTo
    });
  };

  const handleCommitSearch = (e) => {
    if (e) e.preventDefault();

    // If both specified and identical, show error
    if (fromCity && toCity && fromCity.trim().toLowerCase() === toCity.trim().toLowerCase()) {
      setError('Origin and destination cities cannot be identical.');
      return;
    }

    setError('');
    onUpdateSearch({
      ...searchParams,
      from: fromCity.trim(),
      to: toCity.trim()
    });

    // Smooth scroll to search results section
    const el = document.getElementById('bus-results');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="booking-portal" className="relative pt-12 sm:pt-14 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-30">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/90 space-y-6">
        {/* Top Header of the Portal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-red-600 block">
              Direct Bus Booking Engine
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              Search & Reserve Buses Across India
            </h2>
          </div>

          {/* Operator Filter Tabs: All, RTCs, Private */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
            {[
              { id: 'All', label: 'All Operators' },
              { id: 'RTC', label: 'Government RTCs (KSRTC/APSRTC/TSRTC)' },
              { id: 'Private', label: 'Private Fleets (VRL/SRS/Zingbus)' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => onFilterChange(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Search Inputs Grid */}
        <form onSubmit={handleCommitSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* FROM City Search & Dropdown Combobox */}
          <div className="md:col-span-4 relative">
            <CityCombobox
              label="Leaving From"
              sublabel="All Major Bus Terminals & Lounges"
              value={fromCity}
              onChange={(city) => {
                setFromCity(city);
                if (city && toCity && city.toLowerCase() === toCity.toLowerCase()) {
                  setError('Origin and destination cities cannot be identical.');
                } else {
                  setError('');
                }
                onUpdateSearch({ ...searchParams, from: city });
              }}
              placeholder="Select origin city..."
              otherValue={toCity}
            />
          </div>

          {/* City Swap Button */}
          <div className="md:col-span-1 flex justify-center -my-2 md:my-0 z-10">
            <button
              type="button"
              onClick={handleSwap}
              title="Swap Origin & Destination"
              className="w-10 h-10 rounded-full bg-slate-900 hover:bg-red-600 text-white flex items-center justify-center shadow-md transition-transform active:scale-90 cursor-pointer"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* TO City Search & Dropdown Combobox */}
          <div className="md:col-span-4 relative">
            <CityCombobox
              label="Going To"
              sublabel="All Major Dropping Stations"
              value={toCity}
              onChange={(city) => {
                setToCity(city);
                if (city && fromCity && city.toLowerCase() === fromCity.toLowerCase()) {
                  setError('Origin and destination cities cannot be identical.');
                } else {
                  setError('');
                }
                onUpdateSearch({ ...searchParams, to: city });
              }}
              placeholder="Select destination (or leave empty)..."
              isDestination={true}
              otherValue={fromCity}
            />
          </div>

          {/* Departure Date with Apple Calendar Dropdown Below */}
          <div className="md:col-span-3">
            <AppleDateDropdown
              value={searchParams.date}
              onChange={(d) => onUpdateSearch({ ...searchParams, date: d })}
              label="Departure Date"
            />
          </div>
        </form>

        {/* Validation Error Banner */}
        {error && (
          <div className="flex items-center gap-2 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 px-4 py-2.5 rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Clean Spacious Footer Bar with Guarantees + Main Action Search Button */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs font-bold text-slate-500 flex-wrap">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-red-600" />
              <span>Instant Berth Lock</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="w-4 h-4 text-slate-900" />
              <span>Direct RTC Confirmation</span>
            </span>
            <span className="inline-flex items-center gap-1.5 hidden md:inline-flex">
              <Check className="w-4 h-4 text-slate-900" />
              <span>Zero Cancellation Fees On Select RTCs</span>
            </span>
          </div>

          <button
            type="button"
            onClick={handleCommitSearch}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-black text-sm bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/20 transition-all cursor-pointer select-none"
          >
            <Search className="w-4 h-4" />
            <span>Search Live Coaches</span>
          </button>
        </div>
      </div>
    </section>
  );
}
