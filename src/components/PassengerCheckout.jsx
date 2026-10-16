import { useState } from 'react';
import {
  ArrowLeft,
  UserCheck,
  Mail,
  Phone,
  ShieldCheck,
  Tag,
  CheckCircle2,
  AlertCircle,
  Lock
} from 'lucide-react';

export default function PassengerCheckout({
  bus,
  searchParams,
  selectedSeats,
  boardingPoint,
  droppingPoint,
  onBack,
  onConfirmBooking
}) {
  const [passengers, setPassengers] = useState(
    selectedSeats.map((s) => ({
      seatId: s.id,
      seatLabel: s.label,
      deck: s.deck,
      price: s.price,
      name: '',
      age: '',
      gender: s.isLadies ? 'Female' : 'Male'
    }))
  );

  const [contact, setContact] = useState({
    email: '',
    phone: ''
  });

  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [insurance, setInsurance] = useState(true);
  const [errors, setErrors] = useState({});

  const handlePassengerChange = (idx, field, value) => {
    const updated = [...passengers];
    updated[idx][field] = value;
    setPassengers(updated);
  };

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (code === 'FIRSTBUS') {
      const discount = Math.min(150, Math.round(baseFare * 0.10)) || 150;
      setAppliedPromo({ code, discount });
    } else if (code === 'ROUTE100') {
      setAppliedPromo({ code, discount: 100 });
    } else if (code === 'WEEKEND') {
      const discount = Math.min(200, Math.round(baseFare * 0.15)) || 180;
      setAppliedPromo({ code, discount });
    } else if (code === 'BUSCOM15' || code === 'RTCFIRST') {
      setAppliedPromo({ code, discount: 200 });
    } else {
      setAppliedPromo({ code: 'INVALID', discount: 0 });
    }
  };

  const baseFare = selectedSeats.reduce((sum, s) => sum + s.price, 0);
  const gstTax = Math.round(baseFare * 0.05);
  const insuranceFee = insurance ? selectedSeats.length * 25 : 0;
  const discountAmount = appliedPromo?.discount || 0;
  const finalTotal = Math.max(0, baseFare + gstTax + insuranceFee - discountAmount);

  const validateAndSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    passengers.forEach((p, i) => {
      if (!p.name.trim() || p.name.trim().length < 2) {
        newErrors[`name_${i}`] = 'Please enter traveler full name.';
      }
      const ageNum = Number(p.age);
      if (!p.age || isNaN(ageNum) || ageNum < 1 || ageNum > 105) {
        newErrors[`age_${i}`] = 'Enter valid age (1–105).';
      }
    });

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!/^[6-9]\d{9}$/.test(contact.phone)) {
      newErrors.phone = 'Enter a valid 10-digit Indian mobile number.';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onConfirmBooking({
        pnr: `BUS${Math.floor(100000 + Math.random() * 900000)}`,
        bookedAt: new Date().toLocaleString(),
        bus,
        searchParams,
        boardingPoint,
        droppingPoint,
        passengers,
        contact,
        fareBreakdown: {
          baseFare,
          gstTax,
          insuranceFee,
          discountAmount,
          finalTotal
        }
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-red-600 mb-3 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Berth Map
      </button>

      <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
        Traveler Details & Review
      </h1>
      <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">
        Instant e-ticket generation and SMS gate pass dispatched to your contact details.
      </p>

      <form
        onSubmit={validateAndSubmit}
        className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Left 8 Cols: Passenger Cards & Contact Form */}
        <div className="lg:col-span-8 space-y-6">
          {/* Passenger Forms per Selected Seat */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-red-600" /> Traveler Manifest
              </h2>
              <span className="text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-full">
                {selectedSeats.length} {selectedSeats.length === 1 ? 'Berth' : 'Berths'}
              </span>
            </div>

            {passengers.map((p, idx) => (
              <div
                key={p.seatId}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                    Traveler {idx + 1} • Berth{' '}
                    <span className="text-red-600">
                      {p.seatLabel} ({p.deck} Deck)
                    </span>
                  </span>
                  <span className="text-xs font-bold text-slate-500">₹{p.price}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-6">
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={p.name}
                      onChange={(e) =>
                        handlePassengerChange(idx, 'name', e.target.value)
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm font-semibold focus:outline-none focus:border-red-600"
                    />
                    {errors[`name_${idx}`] && (
                      <p className="text-[11px] text-red-600 font-bold mt-1">
                        {errors[`name_${idx}`]}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">
                      Age *
                    </label>
                    <input
                      type="number"
                      placeholder="28"
                      value={p.age}
                      onChange={(e) =>
                        handlePassengerChange(idx, 'age', e.target.value)
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm font-semibold focus:outline-none focus:border-red-600"
                    />
                    {errors[`age_${idx}`] && (
                      <p className="text-[11px] text-red-600 font-bold mt-1">
                        {errors[`age_${idx}`]}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">
                      Gender
                    </label>
                    <select
                      value={p.gender}
                      onChange={(e) =>
                        handlePassengerChange(idx, 'gender', e.target.value)
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-sm font-semibold focus:outline-none focus:border-red-600"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Details Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h2 className="text-base font-black text-slate-900">
              E-Ticket Delivery Contact
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    placeholder="traveler@example.com"
                    value={contact.email}
                    onChange={(e) =>
                      setContact({ ...contact, email: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:border-red-600"
                  />
                </div>
                {errors.email && (
                  <p className="text-[11px] text-red-600 font-bold mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Mobile / WhatsApp (+91) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="9876543210"
                    value={contact.phone}
                    onChange={(e) =>
                      setContact({ ...contact, phone: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:border-red-600"
                  />
                </div>
                {errors.phone && (
                  <p className="text-[11px] text-red-600 font-bold mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Travel Protection Toggle */}
          <label className="flex items-center justify-between p-5 rounded-3xl bg-slate-50 border border-slate-200 cursor-pointer">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-red-600 shrink-0" />
              <div>
                <p className="text-sm font-black text-slate-900">
                  BusAssure Passenger Protection (₹25/seat)
                </p>
                <p className="text-xs text-slate-500 font-semibold">
                  Covers ₹5,00,000 accidental insurance + baggage loss + instant missed bus voucher.
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={insurance}
              onChange={(e) => setInsurance(e.target.checked)}
              className="w-5 h-5 accent-red-600"
            />
          </label>
        </div>

        {/* Right 4 Cols: Booking Summary & Fare Breakdown */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md space-y-5 sticky top-20">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-red-600">
                Itinerary Summary
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-0.5">
                {bus.name}
              </h3>
              <p className="text-xs text-slate-500 font-semibold">{bus.type}</p>
            </div>

            {/* Route & Timings */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Route</span>
                <span className="font-bold text-slate-900">
                  {bus.from || searchParams.from} → {bus.to || searchParams.to}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Journey Date</span>
                <span className="font-bold text-slate-900">{bus.date || searchParams.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Boarding</span>
                <span className="font-bold text-slate-900 truncate max-w-[170px] text-right">
                  {boardingPoint?.name || bus.boardingPoints?.[0]?.name} ({boardingPoint?.time || bus.boardingPoints?.[0]?.time})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Dropping</span>
                <span className="font-bold text-slate-900 truncate max-w-[170px] text-right">
                  {droppingPoint?.name || bus.droppingPoints?.[0]?.name} ({droppingPoint?.time || bus.droppingPoints?.[0]?.time})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Selected Berths</span>
                <span className="font-black text-red-600">
                  {selectedSeats.map((s) => s.label).join(', ')}
                </span>
              </div>
            </div>

            {/* Promo Code Input */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Promo Code (Use BUSCOM15 or RTCFIRST)
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="BUSCOM15"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-bold uppercase focus:outline-none focus:border-red-600"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-red-600 text-white text-xs font-bold cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {appliedPromo && appliedPromo.discount > 0 && (
                <p className="text-[11px] text-red-600 font-bold mt-1.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Code {appliedPromo.code} applied! Saved ₹{appliedPromo.discount}.
                </p>
              )}
              {appliedPromo && appliedPromo.discount === 0 && (
                <p className="text-[11px] text-red-600 font-bold mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Invalid code. Try BUSCOM15.
                </p>
              )}
            </div>

            {/* Fare Breakdown */}
            <div className="space-y-2 pt-3 border-t border-slate-200 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Base Fare ({selectedSeats.length} berths)</span>
                <span className="font-semibold text-slate-900">₹{baseFare}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Toll & State Taxes (5%)</span>
                <span className="font-semibold text-slate-900">₹{gstTax}</span>
              </div>
              {insurance && (
                <div className="flex justify-between text-slate-600">
                  <span>Passenger Protection</span>
                  <span className="font-semibold text-slate-900">₹{insuranceFee}</span>
                </div>
              )}
              {discountAmount > 0 && (
                <div className="flex justify-between text-red-600 font-bold">
                  <span>Coupon Discount</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between items-baseline pt-3 border-t border-slate-200">
                <span className="text-sm font-black text-slate-900">
                  Total Payable
                </span>
                <span className="text-2xl font-black text-red-600">
                  ₹{finalTotal}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-lg shadow-red-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Pay ₹{finalTotal} & Confirm</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
