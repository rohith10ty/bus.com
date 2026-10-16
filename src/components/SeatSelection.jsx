import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Disc,
  MapPin,
  Info,
  Check
} from 'lucide-react';
import { DECK_LAYOUT } from '../data/busesData';

export default function SeatSelection({
  bus,
  searchParams,
  selectedSeats,
  onToggleSeat,
  boardingPoint,
  onSelectBoarding,
  droppingPoint,
  onSelectDropping,
  onBack,
  onProceedToCheckout
}) {
  const [activeDeck, setActiveDeck] = useState('lower');
  const [seatAlert, setSeatAlert] = useState('');

  const handleSeatClick = (seat) => {
    if (bus.bookedSeats.includes(seat.id)) return;
    const exists = selectedSeats.some((s) => s.id === seat.id);
    if (!exists && selectedSeats.length >= 6) {
      setSeatAlert('Maximum 6 seats can be booked in a single transaction.');
      return;
    }
    setSeatAlert('');
    onToggleSeat({
      ...seat,
      price: bus.price + seat.priceOffset,
      isLadies: bus.ladiesSeats.includes(seat.id)
    });
  };

  const totalBaseFare = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  const renderDeckRows = (deckSeats) => {
    const rows = [1, 2, 3, 4, 5];
    return rows.map((rNum) => {
      const rowSeats = deckSeats.filter((s) => s.row === rNum);
      const singleSeat = rowSeats.find((s) => s.col === 'single');
      const doubleA = rowSeats.find((s) => s.col === 'double-A');
      const doubleB = rowSeats.find((s) => s.col === 'double-B');

      const renderBerth = (seat) => {
        if (!seat) return null;
        const isBooked = bus.bookedSeats.includes(seat.id);
        const isLadies = bus.ladiesSeats.includes(seat.id);
        const isSelected = selectedSeats.some((s) => s.id === seat.id);
        const seatPrice = bus.price + seat.priceOffset;

        let styleClass =
          'bg-white border-slate-300 text-slate-800 hover:border-red-600 hover:shadow-md cursor-pointer';
        if (isBooked) {
          styleClass =
            'bg-slate-200/80 border-slate-300 text-slate-400 cursor-not-allowed opacity-70';
        } else if (isSelected) {
          styleClass =
            'bg-red-600 border-red-600 text-white shadow-md shadow-red-600/30 cursor-pointer';
        } else if (isLadies) {
          styleClass =
            'bg-white border-red-300 text-red-700 hover:border-red-500 cursor-pointer';
        }

        return (
          <button
            key={seat.id}
            type="button"
            disabled={isBooked}
            onClick={() => handleSeatClick(seat)}
            className={`relative w-20 sm:w-24 h-28 rounded-2xl border-2 p-2 flex flex-col justify-between transition-all select-none ${styleClass}`}
          >
            {/* Top Pillow Indicator */}
            <div
              className={`w-full h-2.5 rounded-full ${
                isSelected
                  ? 'bg-red-300'
                  : isBooked
                  ? 'bg-slate-300'
                  : isLadies
                  ? 'bg-red-200'
                  : 'bg-slate-200'
              }`}
            />

            <div className="text-center">
              <span className="text-sm font-black block">{seat.label}</span>
              {isLadies && !isBooked && (
                <span
                  className={`text-[9px] font-black uppercase tracking-wider block ${
                    isSelected ? 'text-red-200' : 'text-red-600'
                  }`}
                >
                  Ladies
                </span>
              )}
            </div>

            <div className="text-center border-t border-current/10 pt-1">
              <span className="text-[11px] font-bold">
                {isBooked ? 'Sold' : `₹${seatPrice}`}
              </span>
            </div>

            {isSelected && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-xs">
                <Check className="w-3 h-3 text-white" />
              </span>
            )}
          </button>
        );
      };

      return (
        <div
          key={rNum}
          className="flex items-center justify-between gap-6 sm:gap-10 py-1.5"
        >
          {/* Left Single Berth */}
          <div>{renderBerth(singleSeat)}</div>

          {/* Walking Aisle */}
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-300 select-none">
            Row 0{rNum}
          </div>

          {/* Right Double Berths */}
          <div className="flex items-center gap-2.5">
            {renderBerth(doubleA)}
            {renderBerth(doubleB)}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Top Back & Route Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-red-600 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Search Results
          </button>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Select Your Sleeper Berth
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">
            {bus.name} • {bus.from || searchParams.from} → {bus.to || searchParams.to} •{' '}
            {bus.date || searchParams.date} ({bus.departureTime})
          </p>
        </div>

        {/* 2-Color Seat Legend */}
        <div className="flex flex-wrap items-center gap-4 bg-white px-4 py-3 rounded-2xl border border-slate-200 text-xs font-bold">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-md bg-white border-2 border-slate-300" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-md bg-red-600 border-2 border-red-600" />
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-md bg-white border-2 border-red-300" />
            <span className="text-red-700">Ladies Berth</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-md bg-slate-200 border-2 border-slate-300" />
            <span className="text-slate-400">Booked</span>
          </div>
        </div>
      </div>

      {seatAlert && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-800 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
          <Info className="w-4 h-4 text-red-600" />
          <span>{seatAlert}</span>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Cols: Interactive Dual-Deck Coach Layout */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-5 sm:p-8 shadow-xs">
          {/* Deck Switcher Tabs */}
          <div className="flex items-center justify-between mb-6">
            <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
              <button
                type="button"
                onClick={() => setActiveDeck('lower')}
                className={`px-4 py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  activeDeck === 'lower'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Lower Deck (L1–L15)
              </button>
              <button
                type="button"
                onClick={() => setActiveDeck('upper')}
                className={`px-4 py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  activeDeck === 'upper'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Upper Deck (U1–U15)
              </button>
            </div>

            <span className="text-xs font-bold text-slate-400">
              Front of Coach ↑
            </span>
          </div>

          {/* Bus Cabin Chassis */}
          <div className="max-w-md mx-auto bg-slate-50 rounded-3xl border-2 border-slate-200 p-5 sm:p-6">
            {/* Driver Cabin Bar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-dashed border-slate-300">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {activeDeck === 'lower' ? 'Entry Door ←' : 'Panoramic Upper View'}
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                <span>{activeDeck === 'lower' ? 'Captain Cabin' : 'Upper Deck'}</span>
                <Disc className="w-6 h-6 text-slate-700" />
              </div>
            </div>

            {/* Berths Grid */}
            <div className="space-y-2">
              {activeDeck === 'lower'
                ? renderDeckRows(DECK_LAYOUT.lower)
                : renderDeckRows(DECK_LAYOUT.upper)}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Boarding/Dropping & Summary */}
        <div className="lg:col-span-5 space-y-6">
          {/* Boarding & Dropping Points Selector Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-600" /> Select Boarding & Dropping
            </h2>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                Boarding Station in {bus.from || searchParams.from}
              </label>
              <div className="space-y-2">
                {bus.boardingPoints.map((bp) => {
                  const isSelected = boardingPoint?.id === bp.id || (!boardingPoint && bus.boardingPoints[0]?.id === bp.id);
                  return (
                    <label
                      key={bp.id}
                      className={`flex items-start justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-slate-900 bg-slate-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <input
                          type="radio"
                          name="boarding"
                          checked={isSelected}
                          onChange={() => onSelectBoarding(bp)}
                          className="mt-1 accent-red-600"
                        />
                        <div>
                          <p className="text-xs font-black text-slate-900">{bp.name}</p>
                          <p className="text-[11px] text-slate-500">{bp.landmark}</p>
                        </div>
                      </div>
                      <span className="text-xs font-black text-red-600">{bp.time}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                Dropping Station in {bus.to || searchParams.to}
              </label>
              <div className="space-y-2">
                {bus.droppingPoints.map((dp) => {
                  const isSelected = droppingPoint?.id === dp.id || (!droppingPoint && bus.droppingPoints[0]?.id === dp.id);
                  return (
                    <label
                      key={dp.id}
                      className={`flex items-start justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-slate-900 bg-slate-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <input
                          type="radio"
                          name="dropping"
                          checked={isSelected}
                          onChange={() => onSelectDropping(dp)}
                          className="mt-1 accent-red-600"
                        />
                        <div>
                          <p className="text-xs font-black text-slate-900">{dp.name}</p>
                          <p className="text-[11px] text-slate-500">{dp.landmark}</p>
                        </div>
                      </div>
                      <span className="text-xs font-black text-slate-900">{dp.time}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Selected Seats & Fare Summary */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                  Selected Berths ({selectedSeats.length}/6)
                </span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selectedSeats.length === 0 ? (
                    <span className="text-xs text-slate-400">
                      Click on any available berth in the layout to reserve
                    </span>
                  ) : (
                    selectedSeats.map((s) => (
                      <span
                        key={s.id}
                        className="px-2.5 py-1 rounded-lg bg-red-600 text-white text-xs font-black"
                      >
                        {s.label} ({s.deck}) • ₹{s.price}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="py-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Boarding</span>
                <span className="font-bold text-white">
                  {boardingPoint ? `${boardingPoint.name} (${boardingPoint.time})` : (bus.boardingPoints?.[0] ? `${bus.boardingPoints[0].name} (${bus.boardingPoints[0].time})` : '—')}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Dropping</span>
                <span className="font-bold text-white">
                  {droppingPoint ? `${droppingPoint.name} (${droppingPoint.time})` : (bus.droppingPoints?.[0] ? `${bus.droppingPoints[0].name} (${bus.droppingPoints[0].time})` : '—')}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-3 border-t border-white/10">
                <span className="text-sm font-bold">Total Fare</span>
                <span className="text-2xl font-black text-white">
                  ₹{totalBaseFare}
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled={selectedSeats.length === 0}
              onClick={onProceedToCheckout}
              className={`w-full py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all ${
                selectedSeats.length > 0
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30 cursor-pointer'
                  : 'bg-white/10 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>Continue to Traveler Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
