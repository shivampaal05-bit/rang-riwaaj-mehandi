import React, { useState } from 'react';
import { 
  Sparkles, Calendar, Clock, MapPin, CheckCircle2, XCircle, 
  AlertTriangle, Phone, Star, ShieldCheck, ToggleLeft, ToggleRight, ArrowRight 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { TIME_SLOTS } from '../data/mockLocalities';
import { formatINR } from '../utils/calculator';
import ReliabilityScore from '../components/artist/ReliabilityScore';

export default function ArtistDashboard() {
  const { language } = useLanguage();
  const { artists, bookings, updateBookingStatus, triggerArtistCancellation } = useBooking();
  const { currentUser, switchPersona } = useAuth();
  const { addToast } = useToast();

  const artist = artists.find(a => a.id === currentUser?.artistProfileId) || artists[0];

  const [activeDate, setActiveDate] = useState('2026-10-05');
  const [activeSlot, setActiveSlot] = useState('evening');

  // Filter bookings for this artist
  const artistBookings = bookings.filter(b => b.artistId === artist.id);

  // Toggle slot state between 'available', 'pending', and 'booked'
  const toggleSlotAvailability = (slotId, currentStatus) => {
    const nextStatus = currentStatus === 'available' ? 'booked' : currentStatus === 'booked' ? 'pending' : 'available';

    // Update in local memory/storage
    const updated = { ...(artist.availability || {}) };
    if (!updated[activeDate]) updated[activeDate] = {};
    updated[activeDate][slotId] = nextStatus;

    artist.availability = updated;
    localStorage.setItem('mehndiconnect_artists', JSON.stringify(artists));

    addToast(
      language === 'hi'
        ? `${activeDate} (${slotId}): स्थिति बदलकर "${nextStatus}" कर दी गई।`
        : `Slot for ${activeDate} (${slotId}) updated to ${nextStatus}.`,
      'info'
    );
  };

  const handleSimulateEmergency = (bookingId) => {
    triggerArtistCancellation(bookingId);
    addToast(
      language === 'hi'
        ? 'आपातकालीन सूचना दर्ज! सिस्टम ने ग्राहक को तुरंत स्टैंडबाय बैकअप कलाकार से जोड़ दिया है।'
        : 'Emergency cancellation logged! System has matched standby replacement for client.',
      'error'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0d2214] via-[#163820] to-[#54250a] text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-[#c59b4e]/30">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl border-2 border-[#c59b4e] overflow-hidden shrink-0 shadow-md">
            <img src={artist.avatar} alt={artist.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-400/30">
              <ShieldCheck className="w-3 h-3 text-amber-300" />
              <span>{language === 'hi' ? 'सत्यापित कलाकार पोर्टल' : 'Verified Artist Portal'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5 m-0">
              {artist.name}
            </h1>
            <p className="text-xs text-stone-300 flex items-center gap-2 mt-0.5">
              <span>{artist.locality}</span>
              <span>•</span>
              <span className="text-amber-300 font-bold flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-300" />
                {artist.rating} ({artist.reviewCount} reviews)
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => switchPersona('customer')}
            className="py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs border border-white/20 transition-colors cursor-pointer"
          >
            {language === 'hi' ? 'ग्राहक दृश्य में वापस जाएं' : 'Switch to Customer View'}
          </button>
        </div>
      </div>

      {/* Reliability Metrics */}
      <ReliabilityScore reliability={artist.reliability} />

      {/* Calendar Slot Management Section */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
          <div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-rose-800" />
              <span>{language === 'hi' ? 'कैलेंडर स्लॉट प्रबंधन (डबल बुकिंग रोकथाम)' : 'Live Calendar Slot Control'}</span>
            </h3>
            <p className="text-xs text-stone-500">
              {language === 'hi'
                ? 'तारीख चुनें और स्लॉट को उपलब्ध, प्रतीक्षारत या आरक्षित में बदलें।'
                : 'Click any slot to toggle Available / Pending / Booked. Real-time sync with customer search.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-700">{language === 'hi' ? 'तारीख:' : 'Date:'}</span>
            <input
              type="date"
              value={activeDate}
              onChange={(e) => setActiveDate(e.target.value)}
              className="bg-stone-50 border border-stone-300 rounded-xl px-3 py-1.5 text-xs font-bold text-stone-900"
            />
          </div>
        </div>

        {/* 4 Slots Toggle Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {TIME_SLOTS.map((slot) => {
            const currentStatus = artist.availability?.[activeDate]?.[slot.id] || 'available';

            return (
              <div
                key={slot.id}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-stone-900 block">{slot.label}</span>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      currentStatus === 'available'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : currentStatus === 'pending'
                        ? 'bg-amber-50 text-amber-800 border-amber-300'
                        : 'bg-rose-50 text-rose-800 border-rose-300'
                    }`}>
                      {currentStatus}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleSlotAvailability(slot.id, currentStatus)}
                  className="w-full py-2 px-3 bg-white hover:bg-stone-100 text-stone-800 font-bold rounded-lg text-xs border border-stone-300 transition-colors cursor-pointer shadow-xs"
                >
                  {language === 'hi' ? 'स्थिति बदलें (Toggle)' : 'Change Status'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Incoming Bookings & Active Commitments */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-600" />
          <span>{language === 'hi' ? 'आगामी शादियां व बुकिंग दायित्व' : 'Scheduled Weddings & Active Commitments'}</span>
        </h3>

        {artistBookings.length === 0 ? (
          <p className="text-xs text-stone-500 italic">
            {language === 'hi' ? 'अभी कोई बुकिंग दायित्व नहीं है।' : 'No active wedding bookings assigned.'}
          </p>
        ) : (
          <div className="space-y-3">
            {artistBookings.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-stone-500">{b.id}</span>
                    <span className="font-bold text-stone-900 text-sm">{b.customerName}</span>
                    <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                      {b.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 flex items-center gap-3">
                    <span>📅 {b.eventDate} ({b.timeSlotLabel || b.timeSlot})</span>
                    <span>📍 {b.venueAddress}</span>
                    <span>💰 {formatINR(b.pricing?.finalTotal)}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {b.status === 'booking_confirmed' && (
                    <button
                      onClick={() => {
                        updateBookingStatus(b.id, 'artist_on_way');
                        addToast('Status set to: Artist On The Way', 'success');
                      }}
                      className="py-1.5 px-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg text-xs cursor-pointer transition-colors"
                    >
                      {language === 'hi' ? 'निकल चुके हैं (On The Way)' : 'Mark On The Way'}
                    </button>
                  )}

                  {b.status === 'artist_on_way' && (
                    <button
                      onClick={() => {
                        updateBookingStatus(b.id, 'service_started');
                        addToast('Status set to: Service Started', 'success');
                      }}
                      className="py-1.5 px-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs cursor-pointer transition-colors"
                    >
                      {language === 'hi' ? 'मेहंदी लगाना शुरू' : 'Start Service'}
                    </button>
                  )}

                  {b.status === 'service_started' && (
                    <button
                      onClick={() => {
                        updateBookingStatus(b.id, 'service_completed');
                        addToast('Status set to: Service Completed', 'success');
                      }}
                      className="py-1.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs cursor-pointer transition-colors"
                    >
                      {language === 'hi' ? 'सेवा पूर्ण' : 'Complete Service'}
                    </button>
                  )}

                  {!b.cancelledByArtist && (
                    <button
                      onClick={() => handleSimulateEmergency(b.id)}
                      className="py-1.5 px-3 bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold rounded-lg text-xs border border-rose-300 transition-colors cursor-pointer"
                      title="Simulates artist emergency to test standby backup dispatch"
                    >
                      {language === 'hi' ? 'आपातकालीन रद्दीकरण (टेस्ट)' : 'Simulate Emergency Cancel'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
