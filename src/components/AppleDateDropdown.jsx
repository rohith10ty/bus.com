import { useState, useRef, useEffect, useMemo } from 'react';
import { Calendar, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export default function AppleDateDropdown({
  value,
  onChange,
  label = 'DEPARTURE DATE'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const initialDate = useMemo(() => {
    if (value) {
      const [y, m, d] = value.split('-').map(Number);
      if (y && m && d) return new Date(y, m - 1, d);
    }
    return new Date();
  }, [value]);

  const [viewYear, setViewYear] = useState(() => initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(() => initialDate.getMonth());

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  // Sync view when value changes during render (React recommended pattern)
  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    if (value) {
      const [y, m] = value.split('-').map(Number);
      if (y && m) {
        setViewYear(y);
        setViewMonth(m - 1);
      }
    }
  }

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Escape key listener
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const daysInMonth = useMemo(() => {
    return new Date(viewYear, viewMonth + 1, 0).getDate();
  }, [viewYear, viewMonth]);

  const firstDayOfWeek = useMemo(() => {
    return new Date(viewYear, viewMonth, 1).getDay();
  }, [viewYear, viewMonth]);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSelectDay = (day) => {
    const mm = String(viewMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const iso = `${viewYear}-${mm}-${dd}`;
    onChange(iso);
    setIsOpen(false);
  };

  const handleQuickPreset = (daysOffset) => {
    const d = new Date();
    d.setDate(d.getDate() + daysOffset);
    const iso = d.toISOString().split('T')[0];
    onChange(iso);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
    setIsOpen(false);
  };

  const isDayDisabled = (day) => {
    const checkDate = new Date(viewYear, viewMonth, day);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  const isDaySelected = (day) => {
    if (!value) return false;
    const [y, m, d] = value.split('-').map(Number);
    return y === viewYear && m - 1 === viewMonth && d === day;
  };

  const isDayToday = (day) => {
    const now = new Date();
    return (
      now.getFullYear() === viewYear &&
      now.getMonth() === viewMonth &&
      now.getDate() === day
    );
  };

  const formatDisplayDate = (isoStr) => {
    if (!isoStr) return 'Select Date';
    try {
      const [y, m, d] = isoStr.split('-').map(Number);
      const date = new Date(y, m - 1, d);
      return date.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger Card */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-slate-50 hover:bg-slate-100/90 border rounded-2xl p-3.5 transition-all cursor-pointer ${
          isOpen ? 'border-red-500 ring-2 ring-red-500/10 bg-white' : 'border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {label}
          </label>
          <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => handleQuickPreset(0)}
              className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-50 text-red-700 hover:bg-red-100 cursor-pointer"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => handleQuickPreset(1)}
              className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700 hover:bg-slate-300 cursor-pointer"
            >
              Tomorrow
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 mt-1">
          <div className="flex items-center gap-2 overflow-hidden flex-1">
            <Calendar className="w-4 h-4 text-red-600 shrink-0" />
            <span className="font-black text-slate-900 text-base truncate">
              {formatDisplayDate(value)}
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-red-600' : ''
            }`}
          />
        </div>

        <span className="text-[11px] text-slate-500 pl-6 block mt-0.5 truncate">
          Apple-style calendar dropdown
        </span>
      </div>

      {/* Dropdown Popover Positioned Centered Directly Below the Date Trigger */}
      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 w-[310px] sm:w-[335px] max-w-[calc(100vw-2rem)] rounded-3xl p-5 bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-2xl animate-in fade-in zoom-in-95 duration-150 select-none">
          {/* Header with Navigation */}
          <div className="flex items-center justify-between mb-3 px-1">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="w-7 h-7 rounded-full flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="font-black text-xs sm:text-sm text-slate-900">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>

            <button
              type="button"
              onClick={handleNextMonth}
              className="w-7 h-7 rounded-full flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Presets Strip */}
          <div className="flex items-center gap-1 mb-3 pb-2 border-b border-slate-100 overflow-x-auto scrollbar-none text-[11px] font-bold">
            <button
              type="button"
              onClick={() => handleQuickPreset(0)}
              className="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 cursor-pointer whitespace-nowrap"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => handleQuickPreset(1)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer whitespace-nowrap"
            >
              Tomorrow
            </button>
            <button
              type="button"
              onClick={() => handleQuickPreset(2)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer whitespace-nowrap"
            >
              +2 Days
            </button>
            <button
              type="button"
              onClick={() => handleQuickPreset(7)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer whitespace-nowrap"
            >
              +1 Week
            </button>
          </div>

          {/* Weekdays Row */}
          <div className="grid grid-cols-7 mb-2 text-center text-[10px] font-black uppercase text-slate-400">
            {WEEKDAY_NAMES.map((name) => (
              <div key={name} className="py-0.5">
                {name}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Empty prefix slots */}
            {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
              <div key={`empty-${idx}`} className="w-8 h-8 sm:w-9 sm:h-9" />
            ))}

            {/* Day numbers */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const disabled = isDayDisabled(day);
              const selected = isDaySelected(day);
              const todayDay = isDayToday(day);

              return (
                <button
                  key={`day-${day}`}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleSelectDay(day)}
                  className={`w-8 h-8 sm:w-9 sm:h-9 mx-auto rounded-xl flex items-center justify-center text-xs font-bold transition-all relative ${
                    disabled
                      ? 'text-slate-300 opacity-30 cursor-not-allowed pointer-events-none'
                      : selected
                      ? 'bg-red-600 text-white font-black shadow-md shadow-red-600/30 scale-105 cursor-pointer z-10'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 cursor-pointer'
                  }`}
                >
                  {day}
                  {todayDay && !selected && (
                    <span className="absolute bottom-1 w-1 h-1 bg-red-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
