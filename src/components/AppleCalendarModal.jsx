import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Calendar as CalendarIcon, Check } from 'lucide-react';

export default function AppleCalendarModal({
  isOpen,
  selectedDate, // ISO string 'YYYY-MM-DD'
  onSelectDate,
  onClose
}) {
  const initialDate = selectedDate ? new Date(selectedDate) : new Date();
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth()); // 0-indexed
  const [tempSelected, setTempSelected] = useState(selectedDate);

  if (!isOpen) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Days in month calculation
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const formatDateIso = (year, month, day) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  const handleDayClick = (day) => {
    const dateObj = new Date(currentYear, currentMonth, day);
    dateObj.setHours(0, 0, 0, 0);
    if (dateObj < today) return; // Disallow past dates
    const iso = formatDateIso(currentYear, currentMonth, day);
    setTempSelected(iso);
  };

  const handleQuickPreset = (daysOffset) => {
    const d = new Date();
    d.setDate(d.getDate() + daysOffset);
    const iso = d.toISOString().split('T')[0];
    setTempSelected(iso);
    setCurrentYear(d.getFullYear());
    setCurrentMonth(d.getMonth());
  };

  const handleConfirm = () => {
    if (tempSelected) {
      onSelectDate(tempSelected);
    }
    onClose();
  };

  // Human-readable format e.g. "Sat, 17 Oct 2026"
  const getReadableDate = (isoStr) => {
    if (!isoStr) return '';
    const d = new Date(isoStr);
    return d.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-md animate-fade-in">
      {/* Translucent Glassmorphic Apple-style Modal Card */}
      <div className="bg-white/85 backdrop-blur-2xl border border-white/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] rounded-3xl max-w-sm w-full p-6 text-slate-900 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-100/80 hover:bg-slate-200/90 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-xs">
            <CalendarIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 leading-none">
              Departure Calendar
            </h3>
            <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
              Select your travel journey date
            </p>
          </div>
        </div>

        {/* Apple Quick Presets */}
        <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100/80 rounded-2xl mb-5">
          <button
            type="button"
            onClick={() => handleQuickPreset(0)}
            className="py-1.5 text-[11px] font-bold rounded-xl text-slate-700 hover:bg-white hover:text-slate-900 hover:shadow-xs transition-all cursor-pointer"
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => handleQuickPreset(1)}
            className="py-1.5 text-[11px] font-bold rounded-xl text-slate-700 hover:bg-white hover:text-slate-900 hover:shadow-xs transition-all cursor-pointer"
          >
            Tomorrow
          </button>
          <button
            type="button"
            onClick={() => handleQuickPreset(2)}
            className="py-1.5 text-[11px] font-bold rounded-xl text-slate-700 hover:bg-white hover:text-slate-900 hover:shadow-xs transition-all cursor-pointer"
          >
            +2 Days
          </button>
          <button
            type="button"
            onClick={() => handleQuickPreset(7)}
            className="py-1.5 text-[11px] font-bold rounded-xl text-slate-700 hover:bg-white hover:text-slate-900 hover:shadow-xs transition-all cursor-pointer"
          >
            +1 Week
          </button>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4 px-1">
          <h4 className="text-base font-black text-slate-900">
            {months[currentMonth]} {currentYear}
          </h4>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Weekday Labels */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {daysOfWeek.map((d, i) => (
            <span
              key={i}
              className="text-[11px] font-black text-slate-400 uppercase"
            >
              {d}
            </span>
          ))}
        </div>

        {/* Calendar Day Grid */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {/* Empty cells before month begins */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="h-9 w-9" />
          ))}

          {/* Month days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const dateObj = new Date(currentYear, currentMonth, dayNum);
            dateObj.setHours(0, 0, 0, 0);
            const isPast = dateObj < today;
            const iso = formatDateIso(currentYear, currentMonth, dayNum);
            const isSelected = tempSelected === iso;
            const isToday =
              dateObj.getTime() === today.getTime() && !isSelected;

            let dayClasses =
              'h-9 w-9 rounded-2xl flex items-center justify-center text-xs font-bold transition-all mx-auto';

            if (isPast) {
              dayClasses +=
                ' text-slate-300 cursor-not-allowed select-none opacity-40';
            } else if (isSelected) {
              dayClasses +=
                ' bg-red-600 text-white font-black shadow-md shadow-red-600/30 scale-105 cursor-pointer';
            } else if (isToday) {
              dayClasses +=
                ' bg-red-50 text-red-700 font-black border border-red-200 cursor-pointer hover:bg-red-100';
            } else {
              dayClasses +=
                ' text-slate-800 hover:bg-slate-100/90 cursor-pointer font-semibold';
            }

            return (
              <button
                key={dayNum}
                type="button"
                disabled={isPast}
                onClick={() => handleDayClick(dayNum)}
                className={dayClasses}
              >
                {dayNum}
              </button>
            );
          })}
        </div>

        {/* Bottom Bar: Selected Info + Confirm */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 block">
              Chosen Date
            </span>
            <span className="text-xs font-black text-slate-900">
              {getReadableDate(tempSelected)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs inline-flex items-center gap-1.5 shadow-md shadow-red-600/20 transition-all cursor-pointer"
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>Apply Date</span>
          </button>
        </div>
      </div>
    </div>
  );
}
