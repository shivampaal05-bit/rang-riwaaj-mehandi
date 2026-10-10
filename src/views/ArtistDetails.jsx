import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, MapPin, Phone, MessageCircle, Heart, ShieldCheck, 
  Calendar, Calculator, Clock, Award, CheckCircle2, ArrowRight, Share2 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { useToast } from '../context/ToastContext';
import VerificationBadges from '../components/artist/VerificationBadges';
import ReliabilityScore from '../components/artist/ReliabilityScore';
import AvailabilityCalendar from '../components/artist/AvailabilityCalendar';
import PortfolioGallery from '../components/artist/PortfolioGallery';
import ReviewBreakdown from '../components/artist/ReviewBreakdown';
import CallModal from '../components/common/CallModal';
import WhatsAppModal from '../components/common/WhatsAppModal';
import { formatINR } from '../../src/utils/calculator';

export default function ArtistDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { artists, favorites, toggleFavorite } = useBooking();
  const { addToast } = useToast();

  const [selectedDate, setSelectedDate] = useState('2026-10-05');
  const [selectedSlot, setSelectedSlot] = useState('evening');
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);

  const artist = artists.find(a => a.id === id) || artists[0];

  if (!artist) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-stone-900">Artist Not Found</h2>
        <Link to="/search" className="text-rose-800 font-bold">Return to Search</Link>
      </div>
    );
  }

  const isFav = favorites.includes(artist.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast(
      language === 'hi' ? 'प्रोफाइल लिंक कॉपी हो गया!' : 'Artist profile link copied!',
      'success'
    );
  };

  const handleBookDate = (dateStr, slot) => {
    navigate(`/book/${artist.id}?date=${dateStr}&slot=${slot}`);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* 1. Header Profile Banner */}
      <section className="relative bg-stone-900 text-white">
        <div className="h-64 sm:h-80 w-full overflow-hidden relative">
          <img
            src={artist.coverImage || '/images/hero_bridal_mehndi.jpg'}
            alt={artist.name}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative -mt-24 sm:-mt-28 z-10">
          <div className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-8 shadow-xl text-stone-900 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            {/* Left Info with Avatar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-stone-100 shrink-0">
                <img
                  src={artist.avatar}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1 text-left">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight m-0 text-stone-900">
                    {language === 'hi' ? (artist.hindiName || artist.name) : artist.name}
                  </h1>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 font-medium">
                  {language === 'hi' ? (artist.hindiTagline || artist.tagline) : artist.tagline}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-stone-500">
                  <span className="flex items-center gap-1 font-semibold text-stone-800">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    {language === 'hi' ? (artist.hindiLocality || artist.locality) : artist.locality}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-bold text-amber-600">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    {artist.rating} ({artist.reviewCount} {language === 'hi' ? 'समीक्षाएं' : 'reviews'})
                  </span>
                  <span>•</span>
                  <span className="font-semibold text-stone-700">
                    {artist.experienceYears} {language === 'hi' ? 'वर्ष अनुभव' : 'Years Experience'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto justify-end">
              <button
                onClick={() => toggleFavorite(artist.id)}
                className="p-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 transition-colors cursor-pointer"
                title="Favorite"
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-600 text-rose-600' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 transition-colors cursor-pointer"
                title="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCallModalOpen(true)}
                className="py-3 px-4 rounded-xl border border-emerald-300 hover:bg-emerald-50 text-emerald-900 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>{language === 'hi' ? 'कॉल करें' : 'Call Artist'}</span>
              </button>

              <button
                onClick={() => setWhatsappModalOpen(true)}
                className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{language === 'hi' ? 'व्हाट्सएप' : 'WhatsApp'}</span>
              </button>

              <Link
                to={`/book/${artist.id}?date=${selectedDate}&slot=${selectedSlot}`}
                className="py-3 px-5 bg-gradient-to-r from-rose-800 to-amber-700 hover:from-rose-900 hover:to-amber-800 text-white font-extrabold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-rose-950/20 transition-all"
              >
                <span>{language === 'hi' ? 'तारीख लॉक करें' : 'Date-Lock Slot'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Detail Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (8 cols): Badges, Reliability, Portfolio, Reviews */}
          <div className="lg:col-span-8 space-y-8 text-left">
            {/* 5-Point Verification System */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-sm space-y-4">
              <VerificationBadges verification={artist.verification} showHeader />
            </div>

            {/* Reliability Score Index */}
            <ReliabilityScore reliability={artist.reliability} />

            {/* Availability Calendar */}
            <AvailabilityCalendar
              artist={artist}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              selectedSlot={selectedSlot}
              onSelectSlot={setSelectedSlot}
              onBookNow={handleBookDate}
            />

            {/* Authentic Portfolio Gallery */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-sm space-y-4">
              <PortfolioGallery portfolio={artist.portfolio} />
            </div>

            {/* 5-Aspect Review Breakdown */}
            <ReviewBreakdown
              artist={artist}
            />
          </div>

          {/* Right Column (4 cols): Sticky Booking & Price Calculator Card */}
          <div className="lg:col-span-4 space-y-6 text-left">
            {/* Transparent Rate Card */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-4 sticky top-20">
              <div className="pb-3 border-b border-stone-100">
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">
                  {language === 'hi' ? 'पारदर्शी बेस पैकेज' : 'Transparent Base Package'}
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-3xl font-extrabold text-stone-900">
                    {formatINR(artist.pricing?.bridalBase || 5000)}
                  </span>
                  <span className="text-xs text-stone-500 font-normal">
                    {language === 'hi' ? '(निश्चित बिल)' : '(itemized)'}
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  {artist.pricing?.bridalPackageName}
                </p>
              </div>

              {/* Quick rate list */}
              <div className="space-y-2 text-xs divide-y divide-stone-100">
                <div className="flex justify-between pt-1">
                  <span className="text-stone-600">{language === 'hi' ? 'गेस्ट मेहंदी (प्रति हथेली)' : 'Guest Henna (per side)'}</span>
                  <span className="font-bold text-stone-900">{formatINR(artist.pricing?.guestPerSideRate || 180)}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-stone-600">{language === 'hi' ? 'पैरों की मेहंदी पैकेज' : 'Bridal Feet Package'}</span>
                  <span className="font-bold text-stone-900">+{formatINR(artist.pricing?.feetPackageAddon || 1600)}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-stone-600">{language === 'hi' ? 'वर-वधू पोर्ट्रेट कला' : 'Portrait Face Work'}</span>
                  <span className="font-bold text-stone-900">+{formatINR(artist.pricing?.portraitAddon || 1400)}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-stone-600">{language === 'hi' ? 'यात्रा किराया नियम' : 'Travel Distance'}</span>
                  <span className="font-bold text-stone-900">
                    {artist.pricing?.freeTravelRadiusKm} km free, then {formatINR(artist.pricing?.travelFeePerKm)}/km
                  </span>
                </div>
                <div className="flex justify-between pt-2 bg-emerald-50/70 -mx-5 px-5 py-2">
                  <span className="text-emerald-900 font-semibold">{language === 'hi' ? '100% प्राकृतिक कोन' : 'Organic Herbal Cones'}</span>
                  <span className="font-bold text-emerald-700">₹0 (Free)</span>
                </div>
              </div>

              {/* Selected Slot Callout */}
              <div className="p-3 bg-[#fcfaf7] border border-amber-200/80 rounded-xl space-y-1 text-xs">
                <div className="flex justify-between items-center font-bold text-stone-800">
                  <span>{language === 'hi' ? 'चुनी गई तारीख:' : 'Chosen Date:'}</span>
                  <span className="text-rose-900">{selectedDate}</span>
                </div>
                <div className="flex justify-between items-center text-stone-500">
                  <span>{language === 'hi' ? 'स्लॉट:' : 'Slot:'}</span>
                  <span className="capitalize font-semibold text-stone-700">{selectedSlot}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2 pt-1">
                <Link
                  to={`/book/${artist.id}?date=${selectedDate}&slot=${selectedSlot}`}
                  className="w-full py-3 bg-gradient-to-r from-rose-800 to-amber-700 hover:from-rose-900 hover:to-amber-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-rose-950/20 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{language === 'hi' ? 'इस तारीख को लॉक करें' : 'Date-Lock This Booking'}</span>
                </Link>

                <Link
                  to={`/calculator?artistId=${artist.id}`}
                  className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Calculator className="w-4 h-4 text-stone-600" />
                  <span>{language === 'hi' ? 'सटीक कुल मूल्य कैलकुलेट करें' : 'Calculate Exact Final Total'}</span>
                </Link>
              </div>

              {/* Backup Guarantee Callout */}
              <div className="pt-2 flex items-start gap-2 text-[11px] text-stone-500 border-t border-stone-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  {language === 'hi'
                    ? 'रंग रिवाज़ मेहंदी गारंटी: यदि कलाकार आपातकाल में नहीं पहुंच पाता तो स्टैंडबाय स्थानीय बैकअप तैयार।'
                    : 'Rang Riwaaz Mehandi Guarantee: Pre-matched standby backup artist ready if an emergency occurs.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call Modal */}
      <CallModal
        isOpen={callModalOpen}
        onClose={() => setCallModalOpen(false)}
        artist={artist}
      />

      {/* WhatsApp Modal */}
      <WhatsAppModal
        isOpen={whatsappModalOpen}
        onClose={() => setWhatsappModalOpen(false)}
        artist={artist}
      />
    </div>
  );
}
