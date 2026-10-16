import { useState } from 'react';
import { Ticket, Copy, Check, Sparkles } from 'lucide-react';

const OFFERS = [
  {
    id: 'firstbus',
    badge: '# Bus.com offer',
    discount: '10% OFF',
    title: 'Your first journey',
    description: 'Get 10% off your first intercity bus booking.',
    condition: 'Maximum discount ₹150',
    code: 'FIRSTBUS',
    bannerGradient: 'from-emerald-700 to-teal-800',
    accentBorder: 'border-emerald-500/30'
  },
  {
    id: 'route100',
    badge: '# Bus.com offer',
    discount: '₹100 OFF',
    title: 'A little travel bonus',
    description: 'Save ₹100 on an eligible bus ticket.',
    condition: 'Minimum booking ₹799',
    code: 'ROUTE100',
    bannerGradient: 'from-violet-700 to-purple-900',
    accentBorder: 'border-violet-500/30'
  },
  {
    id: 'weekend',
    badge: '# Bus.com offer',
    discount: '15% OFF',
    title: 'Weekend getaway',
    description: 'Enjoy a discount on your next weekend trip.',
    condition: 'Maximum discount ₹200',
    code: 'WEEKEND',
    bannerGradient: 'from-red-600 to-rose-700',
    accentBorder: 'border-red-500/30'
  }
];

export default function SpecialOffers() {
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(code);
      }
    } catch {
      // Fallback if clipboard API is restricted
    }
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode((prev) => (prev === code ? null : prev));
    }, 2200);
  };

  return (
    <section
      id="special-offers"
      className="relative overflow-hidden bg-slate-950 text-white py-14 sm:py-16 border-t border-slate-900"
    >
      {/* Subtle radial architectural lighting matching hero */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(220,38,38,0.12),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(15,23,42,0.8),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-red-500 block mb-1">
              Special Offers
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              A better trip, for less.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-xl font-normal">
              Pick an offer, copy the coupon code, and get ready for your next adventure.
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-300 shrink-0 self-start sm:self-auto">
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span>Travel more, save more</span>
          </div>
        </div>

        {/* 3 Offer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {OFFERS.map((offer) => {
            const isCopied = copiedCode === offer.code;

            return (
              <div
                key={offer.id}
                className="bg-slate-900/90 rounded-3xl border border-slate-800 shadow-xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Top Colored Banner */}
                <div
                  className={`p-6 bg-gradient-to-br ${offer.bannerGradient} text-white relative overflow-hidden`}
                >
                  {/* Decorative concentric arcs */}
                  <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full border border-white/15 pointer-events-none" />
                  <div className="absolute -right-2 -bottom-2 w-16 h-16 rounded-full border border-white/20 pointer-events-none" />

                  {/* Header row with badge & icon */}
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/25 text-white backdrop-blur-sm border border-white/15">
                      {offer.badge}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                      <Ticket className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Discount values */}
                  <div className="relative z-10">
                    <div className="text-3xl font-black tracking-tight text-white">
                      {offer.discount}
                    </div>
                    <div className="text-xs text-white/90 font-bold mt-0.5">
                      {offer.title}
                    </div>
                  </div>
                </div>

                {/* Middle Description */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                      {offer.description}
                    </p>
                    <p className="text-[11px] text-slate-500 font-semibold">
                      {offer.condition}
                    </p>
                  </div>

                  {/* Bottom Coupon Code & Copy Action */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                        Coupon Code
                      </span>
                      <span className="font-mono font-black text-sm text-white tracking-wider">
                        {offer.code}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(offer.code)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-black inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                        isCopied
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy code</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer footer from reference design */}
        <p className="text-[11px] text-slate-500 mt-8 text-center sm:text-left font-medium">
          These are sample promotional offers for this demo website. Connect coupon validation and discount calculations to your booking flow before using them for real bookings.
        </p>
      </div>
    </section>
  );
}
