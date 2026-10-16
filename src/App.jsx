import { useState, useMemo, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BookingPortal from './components/BookingPortal';
import BusCard from './components/BusCard';
import BusDetailsModal from './components/BusDetailsModal';
import SeatSelection from './components/SeatSelection';
import PassengerCheckout from './components/PassengerCheckout';
import BookingConfirmation from './components/BookingConfirmation';
import AuthModal from './components/AuthModal';
import BusLogo from './components/BusLogo';
import ScrollToTop from './components/ScrollToTop';
import SpecialOffers from './components/SpecialOffers';
import { getBusesForRoute } from './data/busesData';
import { Filter, ArrowUpDown, Bus, X } from 'lucide-react';

export default function App() {
  const todayIso = new Date().toISOString().split('T')[0];

  // Initialize Lenis Inertia Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1
    });

    window.__lenis = lenis;

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      window.__lenis = null;
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  // Navigation Step: 'home' | 'seats' | 'checkout' | 'confirmation'
  const [step, setStep] = useState('home');
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: todayIso
  });

  // Operator Type Filter ('All' | 'RTC' | 'Private')
  const [operatorFilter, setOperatorFilter] = useState('All');

  // Category / State RTC Quick Filter ('All' | 'KSRTC' | 'APSRTC' | 'TSRTC' | 'AC' | 'Sleeper' | 'Seater')
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'price-asc' | 'departure'

  // Dynamic Live Buses computation based on searched cities & date
  const rawBuses = useMemo(() => {
    return getBusesForRoute(searchParams.from, searchParams.to, searchParams.date);
  }, [searchParams.from, searchParams.to, searchParams.date]);

  // Active Bus, Seats, Boarding/Dropping, Bookings & Auth State
  const [detailsModalBus, setDetailsModalBus] = useState(null);
  const [activeBus, setActiveBus] = useState(rawBuses[0] || null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [boardingPoint, setBoardingPoint] = useState(rawBuses[0]?.boardingPoints?.[0] || null);
  const [droppingPoint, setDroppingPoint] = useState(rawBuses[0]?.droppingPoints?.[0] || null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [bookingsHistory, setBookingsHistory] = useState([]);
  const [showTripsDrawer, setShowTripsDrawer] = useState(false);

  const [prevRouteKey, setPrevRouteKey] = useState(`${searchParams.from}-${searchParams.to}-${searchParams.date}`);
  const currentRouteKey = `${searchParams.from}-${searchParams.to}-${searchParams.date}`;
  if (prevRouteKey !== currentRouteKey) {
    setPrevRouteKey(currentRouteKey);
    if (rawBuses && rawBuses.length > 0) {
      setActiveBus(rawBuses[0]);
      setBoardingPoint(rawBuses[0].boardingPoints?.[0] || null);
      setDroppingPoint(rawBuses[0].droppingPoints?.[0] || null);
      setSelectedSeats([]);
    }
  }

  const [user, setUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Filtered & Sorted Bus List
  const filteredBuses = useMemo(() => {
    let list = [...rawBuses];

    // Filter by Operator Type (RTC vs Private)
    if (operatorFilter === 'RTC') {
      list = list.filter((b) => b.serviceType === 'RTC');
    } else if (operatorFilter === 'Private') {
      list = list.filter((b) => b.serviceType === 'Private');
    }

    // Filter by Specific Category or RTC Name
    if (selectedCategory !== 'All') {
      list = list.filter((b) => b.categories.includes(selectedCategory));
    }

    // Sort
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'departure') {
      list.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
    }
    return list;
  }, [rawBuses, operatorFilter, selectedCategory, sortBy]);

  const handleSelectBusForSeats = (bus) => {
    setActiveBus(bus);
    setSelectedSeats([]);
    setBoardingPoint(bus.boardingPoints?.[0] || null);
    setDroppingPoint(bus.droppingPoints?.[0] || null);
    setStep('seats');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSeat = (seatObj) => {
    setSelectedSeats((prev) =>
      prev.some((s) => s.id === seatObj.id)
        ? prev.filter((s) => s.id !== seatObj.id)
        : [...prev, seatObj]
    );
  };

  const handleConfirmBooking = (bookingRecord) => {
    setConfirmedBooking(bookingRecord);
    setBookingsHistory((prev) => [bookingRecord, ...prev]);
    setStep('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBookingPortal = () => {
    const el = document.getElementById('booking-portal');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-red-600 selection:text-white">
      {/* Navbar with Bus.com Branding */}
      <Navbar
        currentStep={step}
        onNavigateHome={() => setStep('home')}
        user={user}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={() => setUser(null)}
        bookingsCount={bookingsHistory.length}
        onOpenBookings={() => setShowTripsDrawer(true)}
      />

      <main className="flex-1">
        {step === 'home' && (
          <>
            {/* Cool Hero Section Showcase (Without Booking Form inside it) */}
            <HeroSection
              onExploreClick={scrollToBookingPortal}
            />

            {/* Special Offers Section (With the same dark background) */}
            <SpecialOffers />

            {/* Booking Portal Widget Docked Right After */}
            <BookingPortal
              searchParams={searchParams}
              onUpdateSearch={setSearchParams}
              activeFilter={operatorFilter}
              onFilterChange={setOperatorFilter}
            />

            {/* Real Bus Search Results Section */}
            <section
              id="bus-results"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {searchParams.from && searchParams.to
                      ? `${searchParams.from} → ${searchParams.to} Coaches`
                      : searchParams.from
                      ? `All Coaches Departing from ${searchParams.from}`
                      : searchParams.to
                      ? `All Coaches Arriving in ${searchParams.to}`
                      : 'Popular Intercity Live Coaches Across India'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
                    Verified state government RTCs & private luxury fleets for{' '}
                    <span className="font-bold text-slate-900">{searchParams.date}</span>
                  </p>
                </div>

                {/* Filter & Sort Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Category Pills (including KSRTC, APSRTC, TSRTC quick filters) */}
                  <div className="inline-flex items-center gap-1 bg-white p-1 rounded-2xl border border-slate-200 shadow-xs flex-wrap">
                    <Filter className="w-3.5 h-3.5 text-slate-400 ml-2" />
                    {[
                      { id: 'All', label: 'All' },
                      { id: 'KSRTC', label: 'KSRTC' },
                      { id: 'APSRTC', label: 'APSRTC' },
                      { id: 'TSRTC', label: 'TSRTC' },
                      { id: 'AC', label: 'AC' },
                      { id: 'Sleeper', label: 'Sleeper' },
                      { id: 'Seater', label: 'Seater' },
                      { id: 'Non-AC', label: 'Non-AC' }
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selectedCategory === cat.id
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Sort Dropdown */}
                  <div className="inline-flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-2xl border border-slate-200 text-xs font-bold shadow-xs">
                    <ArrowUpDown className="w-3.5 h-3.5 text-red-600" />
                    <span className="text-slate-400">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-transparent text-slate-900 focus:outline-none cursor-pointer font-bold"
                    >
                      <option value="rating">Top Rated</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="departure">Earliest Departure</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Bus Cards List */}
              {filteredBuses.length === 0 ? (
                <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center my-6">
                  <Bus className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-lg font-black text-slate-900">
                    No coaches found for this exact filter combination
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mt-1">
                    Try switching filters to "All" or check a different departure date.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('All');
                      setOperatorFilter('All');
                    }}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-red-600 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredBuses.map((bus) => (
                    <BusCard
                      key={bus.id}
                      bus={bus}
                      searchParams={searchParams}
                      onOpenDetails={(b) => setDetailsModalBus(b)}
                      onSelectSeats={handleSelectBusForSeats}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {step === 'seats' && (
          <SeatSelection
            bus={activeBus}
            searchParams={searchParams}
            selectedSeats={selectedSeats}
            onToggleSeat={handleToggleSeat}
            boardingPoint={boardingPoint}
            onSelectBoarding={setBoardingPoint}
            droppingPoint={droppingPoint}
            onSelectDropping={setDroppingPoint}
            onBack={() => setStep('home')}
            onProceedToCheckout={() => {
              setStep('checkout');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {step === 'checkout' && (
          <PassengerCheckout
            bus={activeBus}
            searchParams={searchParams}
            selectedSeats={selectedSeats}
            boardingPoint={boardingPoint}
            droppingPoint={droppingPoint}
            onBack={() => setStep('seats')}
            onConfirmBooking={handleConfirmBooking}
          />
        )}

        {step === 'confirmation' && (
          <BookingConfirmation
            booking={confirmedBooking}
            onBookAnother={() => {
              setSelectedSeats([]);
              setStep('home');
            }}
          />
        )}
      </main>

      {/* Bus Details Modal */}
      <BusDetailsModal
        bus={detailsModalBus}
        searchParams={searchParams}
        onClose={() => setDetailsModalBus(null)}
        onProceedToSeats={handleSelectBusForSeats}
      />

      {/* Sign-in / Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(u) => setUser(u)}
      />

      {/* My Bookings History Drawer */}
      {showTripsDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <h3 className="text-lg font-black text-slate-900">
                  My Booked Trips ({bookingsHistory.length})
                </h3>
                <button
                  onClick={() => setShowTripsDrawer(false)}
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {bookingsHistory.length === 0 ? (
                <div className="text-center py-16">
                  <Bus className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-black text-slate-700">No trips reserved yet</p>
                  <p className="text-xs text-slate-400 font-semibold mt-1">
                    Book any state RTC or luxury coach to view and download your digital tickets here.
                  </p>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  {bookingsHistory.map((bk) => (
                    <div
                      key={bk.pnr}
                      onClick={() => {
                        setConfirmedBooking(bk);
                        setShowTripsDrawer(false);
                        setStep('confirmation');
                      }}
                      className="p-4 rounded-2xl border border-slate-200 hover:border-red-600 cursor-pointer transition-all bg-slate-50"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black text-red-600">
                          PNR #{bk.pnr}
                        </span>
                        <span className="text-xs font-black text-slate-900">
                          ₹{bk.fareBreakdown.finalTotal}
                        </span>
                      </div>
                      <p className="text-sm font-black text-slate-900 mt-1">
                        {bk.searchParams.from} → {bk.searchParams.to}
                      </p>
                      <p className="text-xs text-slate-500 font-semibold">
                        {bk.bus.name} • {bk.searchParams.date}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Clean Minimalist 2-Color Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div>
              <div>
                <BusLogo size="large" inverted={true} />
              </div>
              <p className="text-xs text-slate-400 mt-2 max-w-md font-medium">
                India's unified interstate bus ticketing platform. Instant confirmation for KSRTC,
                APSRTC, TSRTC, MSRTC, and 30+ premium national fleets.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-slate-400">
              <span className="text-white">KSRTC Airavat</span>
              <span className="text-white">APSRTC Amaravati</span>
              <span className="text-white">TSRTC Garuda Plus</span>
              <span className="text-white">VRL Travels</span>
              <span className="text-white">Zingbus EV</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
            <div>© 2026 Bus.com India Pvt. Ltd. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>RTC Operator Portal</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Scroll-to-Top Button */}
      <ScrollToTop />
    </div>
  );
}
