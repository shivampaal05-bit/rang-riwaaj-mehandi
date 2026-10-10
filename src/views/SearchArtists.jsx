import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, Calendar, MapPin, Sparkles, CheckCircle2, XCircle, Clock, ShieldCheck, Heart, Layers, ArrowRight, RotateCcw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { GORAKHPUR_LOCALITIES, SERVICE_TYPES, TIME_SLOTS, DESIGN_STYLES } from '../data/mockLocalities';
import ArtistCard from '../components/artist/ArtistCard';

export default function SearchArtists() {
  const { language, t } = useLanguage();
  const { artists, favorites, getAvailabilityStatus } = useBooking();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search parameters
  const [locality, setLocality] = useState(searchParams.get('loc') || 'all');
  const [service, setService] = useState(searchParams.get('service') || 'bridal');
  const [eventDate, setEventDate] = useState(searchParams.get('date') || '2026-10-05');
  const [timeSlot, setTimeSlot] = useState(searchParams.get('slot') || 'evening');
  const [availabilityFilter, setAvailabilityFilter] = useState('all'); // 'all' | 'available' | 'pending' | 'booked'
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [maxBudget, setMaxBudget] = useState(8000);
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(searchParams.get('fav') === 'true');

  // Compare List
  const [compareList, setCompareList] = useState([]);

  const toggleCompare = (artistId) => {
    setCompareList(prev => {
      if (prev.includes(artistId)) {
        return prev.filter(id => id !== artistId);
      }
      if (prev.length >= 3) {
        alert(language === 'hi' ? 'आप एक समय में अधिकतम 3 कलाकारों की तुलना कर सकते हैं।' : 'You can compare at most 3 artists at a time.');
        return prev;
      }
      return [...prev, artistId];
    });
  };

  // Filter Logic
  const filteredArtists = useMemo(() => {
    return artists.filter((artist) => {
      // Locality
      if (locality !== 'all' && artist.localityId !== locality) {
        return false;
      }

      // Favorites only
      if (showOnlyFavorites && !favorites.includes(artist.id)) {
        return false;
      }

      // Verified only
      if (verifiedOnly && (!artist.verification?.isVerified || !artist.verification?.skillChecked)) {
        return false;
      }

      // Budget
      if (artist.pricing?.bridalBase > maxBudget) {
        return false;
      }

      // Style
      if (selectedStyle !== 'all') {
        const hasStyle = artist.specialties?.some(s => s.toLowerCase().includes(selectedStyle.toLowerCase()));
        if (!hasStyle) return false;
      }

      // Real Availability Filter for the selected date & slot
      if (eventDate) {
        const avail = getAvailabilityStatus(artist.id, eventDate, timeSlot);
        if (availabilityFilter === 'available' && !avail.available) {
          return false;
        }
        if (availabilityFilter === 'booked' && avail.status !== 'booked') {
          return false;
        }
        if (availabilityFilter === 'pending' && avail.status !== 'pending') {
          return false;
        }
      }

      return true;
    });
  }, [artists, locality, showOnlyFavorites, favorites, verifiedOnly, maxBudget, selectedStyle, eventDate, timeSlot, availabilityFilter, getAvailabilityStatus]);

  const resetFilters = () => {
    setLocality('all');
    setService('bridal');
    setEventDate('2026-10-05');
    setTimeSlot('evening');
    setAvailabilityFilter('all');
    setVerifiedOnly(false);
    setMaxBudget(8000);
    setSelectedStyle('all');
    setShowOnlyFavorites(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0d2214] via-[#163820] to-[#6e3512] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#c59b4e]/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 text-left">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#edd096]">
              {language === 'hi' ? 'गोरखपुर स्थानीय खोज' : 'Gorakhpur Local Search'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white m-0">
              {language === 'hi' ? 'तारीख अनुसार सत्यापित कलाकार खोजें' : 'Search Date-Locked Mehndi Artists'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-300">
              {language === 'hi'
                ? 'केवल वही कलाकार दिखाई देंगे जो आपकी चुनी हुई तारीख और स्लॉट पर वास्तव में उपलब्ध हैं।'
                : 'Double-booking prevention active: See real-time availability for your event date.'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => setShowOnlyFavorites(prev => !prev)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
                showOnlyFavorites
                  ? 'bg-[#88451b] text-white border-[#743310]'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${showOnlyFavorites ? 'fill-white' : ''}`} />
              <span>{language === 'hi' ? 'पसंदीदा' : 'Favorites'} ({favorites.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Filter Bar & Options */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-4">
        {/* Core Date & Slot Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Gorakhpur Locality */}
          <div className="space-y-1 text-left">
            <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-800" />
              <span>{language === 'hi' ? 'गोरखपुर इलाका' : 'Locality'}</span>
            </label>
            <select
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800"
            >
              <option value="all">{language === 'hi' ? 'सभी इलाके (गोरखपुर)' : 'All Gorakhpur Localities'}</option>
              {GORAKHPUR_LOCALITIES.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {language === 'hi' ? loc.hindiName : loc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Event Date */}
          <div className="space-y-1 text-left">
            <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
              <span>{language === 'hi' ? 'समारोह की तारीख' : 'Event Date'}</span>
            </label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800"
            />
          </div>

          {/* Time Slot */}
          <div className="space-y-1 text-left">
            <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-700" />
              <span>{language === 'hi' ? 'समय स्लॉट' : 'Time Slot'}</span>
            </label>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800"
            >
              {TIME_SLOTS.map((sl) => (
                <option key={sl.id} value={sl.id}>
                  {language === 'hi' ? sl.hindiLabel : sl.label}
                </option>
              ))}
            </select>
          </div>

          {/* Availability State Filter */}
          <div className="space-y-1 text-left">
            <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
              <span>{language === 'hi' ? 'उपलब्धता स्थिति' : 'Availability State'}</span>
            </label>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800"
            >
              <option value="all">{language === 'hi' ? 'सभी स्थितियां' : 'All Availability States'}</option>
              <option value="available">{language === 'hi' ? 'केवल उपलब्ध (उपलब्धता पक्की)' : 'Only Available (Date-Free)'}</option>
              <option value="pending">{language === 'hi' ? 'प्रतीक्षारत (Pending Inquiry)' : 'Pending Inquiry'}</option>
              <option value="booked">{language === 'hi' ? 'आरक्षित (Fully Booked)' : 'Fully Booked'}</option>
            </select>
          </div>
        </div>

        {/* Secondary Filters: Style, Budget, Verified */}
        <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            {/* Style */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-stone-600">{language === 'hi' ? 'शैली:' : 'Style:'}</span>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-lg px-2 py-1 text-xs font-medium"
              >
                <option value="all">{language === 'hi' ? 'सभी शैलियां' : 'All Styles'}</option>
                <option value="Portrait">{language === 'hi' ? 'वर-वधू पोर्ट्रेट' : 'Portrait Henna'}</option>
                <option value="Marwari">{language === 'hi' ? 'मारवाड़ी / राजस्थानी' : 'Marwari / Rajasthani'}</option>
                <option value="Arabic">{language === 'hi' ? 'अरेबिक' : 'Arabic Flow'}</option>
                <option value="Mandala">{language === 'hi' ? 'मंडला व फ्लोरल' : 'Mandala & Floral'}</option>
                <option value="Khafif">{language === 'hi' ? 'खफीफ गल्फ' : 'Khafif Gulf'}</option>
              </select>
            </div>

            {/* Max Budget */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-stone-600">{language === 'hi' ? 'अधिकतम बेस बजट:' : 'Max Base:'}</span>
              <span className="font-bold text-rose-900">₹{maxBudget}</span>
              <input
                type="range"
                min="3500"
                max="8000"
                step="500"
                value={maxBudget}
                onChange={(e) => setMaxBudget(parseInt(e.target.value))}
                className="w-24 accent-rose-800"
              />
            </div>

            {/* Verified Only Checkbox */}
            <label className="flex items-center gap-1.5 font-semibold text-stone-700 cursor-pointer">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="rounded border-stone-300 text-rose-800 focus:ring-rose-500"
              />
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'hi' ? 'केवल 5-पॉइंट सत्यापित' : '5-Point Verified Only'}</span>
            </label>
          </div>

          {/* Reset Filters */}
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{language === 'hi' ? 'फिल्टर रीसेट' : 'Reset Filters'}</span>
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="text-xs sm:text-sm text-stone-600">
          {language === 'hi' ? (
            <>
              <b>{filteredArtists.length}</b> कलाकार मिले (तारीख: <b>{eventDate}</b>, <b>{timeSlot}</b>)
            </>
          ) : (
            <>
              Found <b>{filteredArtists.length}</b> local artists for <b>{eventDate}</b> ({timeSlot})
            </>
          )}
        </div>

        {compareList.length > 0 && (
          <Link
            to={`/compare?ids=${compareList.join(',')}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-900 text-white rounded-xl text-xs font-bold shadow-sm"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'तुलना करें' : 'Compare'} ({compareList.length})</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>

      {/* Artists Grid */}
      {filteredArtists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtists.map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              targetDate={eventDate}
              targetSlot={timeSlot}
              isCompared={compareList.includes(artist.id)}
              onToggleCompare={toggleCompare}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-800">
            <XCircle className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="text-base font-bold text-stone-900">
              {language === 'hi' ? 'इस फिल्टर पर कोई कलाकार नहीं मिला' : 'No Artists Match Your Exact Filters'}
            </h3>
            <p className="text-xs text-stone-500">
              {language === 'hi'
                ? 'हो सकता है इस तारीख पर सभी कलाकार पहले से आरक्षित हों। कृपया तारीख या इलाका बदलकर देखें।'
                : 'Artists may be fully booked on this peak date. Try adjusting date, budget or resetting filters.'}
            </p>
          </div>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-xs cursor-pointer transition-colors shadow-sm"
          >
            {language === 'hi' ? 'सभी फिल्टर रीसेट करें' : 'Reset All Filters'}
          </button>
        </div>
      )}
    </div>
  );
}
