import { Ticket, User, LogOut, Check } from 'lucide-react';
import BusLogo from './BusLogo';

export default function Navbar({
  currentStep,
  onNavigateHome,
  user,
  onOpenAuth,
  onLogout,
  bookingsCount,
  onOpenBookings
}) {
  const steps = [
    { id: 'home', label: 'Search Buses' },
    { id: 'seats', label: 'Select Seats' },
    { id: 'checkout', label: 'Passenger' },
    { id: 'confirmation', label: 'E-Ticket' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={onNavigateHome}
          className="text-left focus:outline-none cursor-pointer"
        >
          <BusLogo />
        </button>

        {/* Minimal 2-Color Booking Funnel Stepper (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200">
          {steps.map((st, idx) => {
            const active = currentStep === st.id;
            const passed =
              steps.findIndex((s) => s.id === currentStep) > idx;
            return (
              <div
                key={st.id}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  active
                    ? 'bg-slate-900 text-white shadow-xs'
                    : passed
                    ? 'text-red-700 bg-red-50'
                    : 'text-slate-400'
                }`}
              >
                {passed && <Check className="w-3 h-3 text-red-600 stroke-[3]" />}
                <span>
                  {idx + 1}. {st.label}
                </span>
              </div>
            );
          })}
        </nav>

        {/* Right Actions: My Bookings & Login/User Profile */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenBookings}
            className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <Ticket className="w-4 h-4 text-red-600" />
            <span className="hidden sm:inline">My Trips</span>
            {bookingsCount > 0 && (
              <span className="px-1.5 py-0.2 bg-red-600 text-white text-[10px] font-bold rounded-full">
                {bookingsCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                {user.name[0].toUpperCase()}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-slate-900 leading-none">{user.name}</p>
                <p className="text-[10px] text-red-600 font-semibold mt-0.5">Verified Traveler</p>
              </div>
              <button
                onClick={onLogout}
                title="Sign Out"
                className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-red-600 text-white shadow-xs transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
