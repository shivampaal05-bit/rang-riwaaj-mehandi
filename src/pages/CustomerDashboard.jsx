import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, Calendar, Clock, MapPin, ShieldCheck, Heart, ArrowRight, 
  Phone, MessageCircle, AlertTriangle, Star, CheckCircle2, Layers 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { formatINR } from '../utils/calculator';
import ArtistCard from '../components/artist/ArtistCard';

export default function CustomerDashboard() {
  const { language } = useLanguage();
  const { bookings, artists, favorites } = useBooking();
  const { currentUser, switchPersona } = useAuth();

  const favArtists = artists.filter(a => favorites.includes(a.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">
      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-900 font-extrabold flex items-center justify-center text-xl shadow-inner border border-rose-200">
            {currentUser?.name?.charAt(0) || 'P'}
          </div>
          <div className="space-y-0.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[10px] font-bold uppercase tracking-wider">
              <span>{language === 'hi' ? 'सत्यापित ग्राहक' : 'Verified Client'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 m-0">
              {currentUser?.name || 'Priya Tiwari'}
            </h1>
            <p className="text-xs text-stone-500 flex items-center gap-2">
              <span>{currentUser?.phone || '+91 98391 22840'}</span>
              <span>•</span>
              <span className="flex items-center gap-0.5">
                <MapPin className="w-3 h-3 text-amber-600" />
                {currentUser?.locality || 'Golghar, Gorakhpur'}
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/search"
            className="py-2.5 px-4 bg-rose-800 hover:bg-rose-900 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span>{language === 'hi' ? 'नया कलाकार खोजें' : 'Book Another Artist'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => switchPersona('artist')}
            className="py-2.5 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold text-xs transition-colors cursor-pointer"
          >
            {language === 'hi' ? 'कलाकार दृश्य पर स्विच करें' : 'Switch to Artist View'}
          </button>
        </div>
      </div>

      {/* Active Bookings Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-rose-800" />
            <span>{language === 'hi' ? 'मेरी मेहंदी बुकिंग्स' : 'My Mehndi Bookings'}</span>
          </h2>
          <span className="text-xs text-stone-500 font-semibold">
            {bookings.length} {language === 'hi' ? 'कुल बुकिंग्स' : 'Total Bookings'}
          </span>
        </div>

        {bookings.length === 0 ? (
          <div className="p-8 text-center bg-white border border-stone-200 rounded-2xl space-y-2">
            <p className="text-xs text-stone-500">
              {language === 'hi' ? 'आपकी अभी कोई सक्रिय बुकिंग नहीं है।' : 'No active bookings currently.'}
            </p>
            <Link to="/search" className="text-rose-800 font-bold text-xs underline">
              {language === 'hi' ? 'कलाकार खोजें' : 'Browse Gorakhpur Artists'}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-stone-100">
                  <div>
                    <span className="font-mono text-[10px] text-stone-400 font-bold block">{b.id}</span>
                    <h3 className="font-bold text-stone-900 text-sm">{b.artistName}</h3>
                    <p className="text-[11px] text-stone-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-600" />
                      {b.artistLocality}
                    </p>
                  </div>

                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                    b.status === 'booking_confirmed' || b.status === 'service_completed'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : b.status === 'artist_cancelled'
                      ? 'bg-red-50 text-red-800 border-red-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {b.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-stone-600">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-stone-400 uppercase font-bold block">{language === 'hi' ? 'तारीख व स्लॉट' : 'Date & Slot'}</span>
                    <span className="font-bold text-stone-900">{b.eventDate}</span>
                    <span className="block text-[11px] text-stone-500">{b.timeSlotLabel || b.timeSlot}</span>
                  </div>

                  <div className="space-y-0.5 text-right">
                    <span className="text-[10px] text-stone-400 uppercase font-bold block">{language === 'hi' ? 'अंतिम तय मूल्य' : 'Final Total'}</span>
                    <span className="text-base font-extrabold text-rose-950">{formatINR(b.pricing?.finalTotal)}</span>
                    <span className="block text-[10px] text-emerald-700">Advance Paid: {formatINR(b.pricing?.advancePaid)}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                  <Link
                    to={`/tracker?id=${b.id}`}
                    className="flex-1 py-2 px-3 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition-colors text-center"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{language === 'hi' ? '9-चरण टाइमलाइन' : 'Track Timeline'}</span>
                  </Link>

                  {b.cancelledByArtist ? (
                    <Link
                      to={`/backup/${b.id}`}
                      className="py-2 px-3 bg-rose-800 hover:bg-rose-900 text-white font-bold rounded-xl text-xs flex items-center gap-1"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
                      <span>{language === 'hi' ? 'बैकअप' : 'Backup Match'}</span>
                    </Link>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Saved Favorites Section */}
      <div className="space-y-4 pt-4 border-t border-stone-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            <span>{language === 'hi' ? 'पसंदीदा कलाकार' : 'Saved Favorite Artists'}</span>
          </h2>
          <span className="text-xs text-stone-500 font-semibold">{favArtists.length} saved</span>
        </div>

        {favArtists.length === 0 ? (
          <p className="text-xs text-stone-500 italic">
            {language === 'hi' ? 'आपने अभी किसी कलाकार को पसंदीदा में नहीं जोड़ा है।' : 'No saved favorite artists yet.'}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
