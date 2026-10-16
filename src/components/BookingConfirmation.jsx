import {
  CheckCircle2,
  Printer,
  Bus,
  QrCode,
  Home,
  ShieldCheck
} from 'lucide-react';

export default function BookingConfirmation({ booking, onBookAnother }) {
  if (!booking) return null;

  const {
    pnr,
    bus,
    searchParams,
    boardingPoint,
    droppingPoint,
    passengers,
    contact,
    fareBreakdown
  } = booking;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Top Success Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4 border border-red-200">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <span className="text-xs font-black uppercase tracking-widest text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-200">
          Official Booking Confirmed • PNR #{pnr}
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
          Your Berth is Reserved!
        </h1>
        <p className="text-sm text-slate-500 font-semibold mt-1">
          E-Ticket & live bus tracking GPS link sent to{' '}
          <span className="font-bold text-slate-900">{contact.email}</span> and{' '}
          <span className="font-bold text-slate-900">+91 {contact.phone}</span>.
        </p>
      </div>

      {/* Boarding Pass Ticket Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Top Dark Header Band */}
        <div className="bg-slate-950 text-white px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-red-600 flex items-center justify-center">
              <Bus className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black">{bus.name}</h2>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white/10 text-slate-300">
                  {bus.serviceType}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {bus.type} • Coach: {bus.busNumber}
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
              Government PNR / ID
            </span>
            <span className="text-xl font-black tracking-wider text-red-500">
              {pnr}
            </span>
          </div>
        </div>

        {/* Main Ticket Body */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left 8 Cols: Itinerary & Passengers */}
          <div className="md:col-span-8 space-y-6">
            {/* Origin -> Destination */}
            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <span className="text-[11px] font-bold uppercase text-slate-400">
                  Departure ({bus.date || searchParams.date})
                </span>
                <p className="text-2xl font-black text-slate-900 mt-0.5">
                  {boardingPoint?.time || bus.departureTime}
                </p>
                <p className="text-sm font-black text-red-600">
                  {bus.from || searchParams.from}
                </p>
                <p className="text-xs text-slate-500 font-medium truncate max-w-[150px]">
                  {boardingPoint?.name}
                </p>
              </div>

              <div className="text-center px-3">
                <span className="text-xs font-bold text-slate-400 block">
                  {bus.duration}
                </span>
                <div className="w-20 sm:w-28 h-0.5 bg-slate-300 my-2 mx-auto" />
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-900 bg-slate-200 px-2 py-0.5 rounded">
                  Confirmed
                </span>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-bold uppercase text-slate-400">
                  Arrival Destination
                </span>
                <p className="text-2xl font-black text-slate-900 mt-0.5">
                  {droppingPoint?.time || bus.arrivalTime}
                </p>
                <p className="text-sm font-black text-slate-900">
                  {bus.to || searchParams.to}
                </p>
                <p className="text-xs text-slate-500 font-medium truncate max-w-[150px]">
                  {droppingPoint?.name}
                </p>
              </div>
            </div>

            {/* Passengers Table */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2.5">
                Passenger Manifest
              </h3>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                {passengers.map((p, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-3 flex items-center justify-between text-xs sm:text-sm bg-white"
                  >
                    <div>
                      <span className="font-bold text-slate-900">{p.name}</span>
                      <span className="text-slate-500 ml-2">
                        ({p.age} yrs, {p.gender})
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-lg bg-red-50 text-red-700 font-black text-xs">
                      Berth {p.seatLabel} ({p.deck})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 4 Cols: Digital QR Boarding Pass */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300 text-center">
            <div className="w-32 h-32 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-xs mb-3">
              <QrCode className="w-24 h-24 text-slate-900" />
            </div>
            <span className="text-xs font-black text-slate-900">
              Lounge & Gate Pass
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5 font-medium">
              Verified Digital Ticket
            </span>

            <div className="w-full mt-4 pt-4 border-t border-slate-200 flex justify-between items-baseline">
              <span className="text-xs font-bold text-slate-500">Total Paid</span>
              <span className="text-xl font-black text-slate-900">
                ₹{fareBreakdown.finalTotal}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
            <ShieldCheck className="w-4 h-4 text-red-600" />
            <span>24×7 Passenger Concierge & Central Transit Helpline: 1800-BUS-HELP</span>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" /> Print E-Ticket
            </button>
            <button
              onClick={onBookAnother}
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-red-600 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Home className="w-3.5 h-3.5" /> Book Another Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
