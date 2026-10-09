import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, MapPin, Heart, ShieldCheck, ArrowRight, Phone, Calculator, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useBooking } from '../../context/BookingContext';
import VerificationBadges from './VerificationBadges';
import ReliabilityScore from './ReliabilityScore';
import CallModal from '../common/CallModal';
import { formatINR } from '../../utils/calculator';

export default function ArtistCard({
  artist,
  targetDate = '',
  targetSlot = 'evening',
  isCompared = false,
  onToggleCompare,
  showCompareOption = true
}) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { favorites, toggleFavorite, getAvailabilityStatus } = useBooking();
  const [callModalOpen, setCallModalOpen] = useState(false);

  const isFav = favorites.includes(artist.id);

  // Compute availability for target date & slot if provided
  const avail = targetDate ? getAvailabilityStatus(artist.id, targetDate, targetSlot) : null;

  return (
    <div className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group relative">
      {/* Top Banner / Cover */}
      <div className="relative h-44 sm:h-48 overflow-hidden bg-stone-900">
        <img
          src={artist.coverImage || artist.portfolio?.[0]?.image || '/images/hero_bridal_mehndi.jpg'}
          alt={artist.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(artist.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-rose-600 transition-colors shadow-sm cursor-pointer z-10"
          aria-label="Add to favorites"
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-600 text-rose-600' : ''}`} />
        </button>

        {/* Locality Tag */}
        <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-amber-200 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-500/30 flex items-center gap-1 shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>{language === 'hi' ? (artist.hindiLocality || artist.locality) : artist.locality}</span>
        </div>

        {/* Artist Profile Photo & Name Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-12 h-12 rounded-xl border-2 border-white overflow-hidden bg-stone-100 shadow-md shrink-0">
              <img
                src={artist.avatar}
                alt={artist.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-white min-w-0 drop-shadow">
              <h4 className="font-bold text-base leading-tight truncate">
                {language === 'hi' ? (artist.hindiName || artist.name) : artist.name}
              </h4>
              <div className="flex items-center gap-2 text-xs text-amber-200 mt-0.5">
                <span className="flex items-center gap-1 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {artist.rating}
                </span>
                <span className="text-stone-300">({artist.reviewCount})</span>
                <span className="text-stone-400">•</span>
                <span className="text-stone-300">{artist.experienceYears}y exp</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3.5">
        {/* Date Availability Indicator if target date is set */}
        {targetDate && avail && (
          <div className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-semibold transition-all ${
            avail.available
              ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
              : avail.status === 'pending'
              ? 'bg-amber-50 text-amber-900 border-amber-200'
              : 'bg-rose-50 text-rose-900 border-rose-200'
          }`}>
            <div className="flex items-center gap-1.5">
              {avail.available ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : avail.status === 'pending' ? (
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>
                {language === 'hi'
                  ? `${targetDate}: ${avail.available ? 'उपलब्ध (तारीख लॉक संभव)' : avail.status === 'pending' ? 'अनुरोध प्रक्रियाधीन' : 'आरक्षित (लॉक)'}`
                  : `${targetDate}: ${avail.available ? 'Available to Lock' : avail.status === 'pending' ? 'Pending Hold' : 'Fully Booked'}`}
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold opacity-80">{targetSlot}</span>
          </div>
        )}

        {/* Verification Badges (Compact) */}
        <VerificationBadges verification={artist.verification} compact />

        {/* Specialties tags */}
        <div className="flex flex-wrap gap-1">
          {artist.specialties?.slice(0, 3).map((spec, i) => (
            <span
              key={i}
              className="text-[11px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-medium"
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Reliability snippet */}
        <ReliabilityScore reliability={artist.reliability} compact />

        {/* Transparent Pricing Card */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-stone-400 uppercase font-bold block">
              {language === 'hi' ? 'ब्राइडल पैकेज (शुरुआत)' : 'Bridal Package'}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold text-stone-900">
                {formatINR(artist.pricing?.bridalBase || 5000)}
              </span>
              <span className="text-[11px] text-stone-500 font-normal">
                {language === 'hi' ? '(स्पष्ट विवरण)' : '(itemized)'}
              </span>
            </div>
          </div>

          <div className="text-right text-[11px] text-stone-500">
            <span>{language === 'hi' ? 'गेस्ट मेहंदी:' : 'Guest Rate:'}</span>{' '}
            <b className="text-stone-800">{formatINR(artist.pricing?.guestPerSideRate || 180)}/side</b>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setCallModalOpen(true)}
              className="py-2.5 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'hi' ? 'कॉल करें' : 'Call Artist'}</span>
            </button>

            <Link
              to={`/calculator?artistId=${artist.id}`}
              className="py-2.5 px-3 rounded-xl border border-amber-300 hover:bg-amber-50 text-amber-900 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Calculator className="w-3.5 h-3.5 text-amber-600" />
              <span>{language === 'hi' ? 'मूल्य निकालें' : 'Exact Price'}</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/artist/${artist.id}`}
              className="flex-1 py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>{language === 'hi' ? 'प्रोफाइल व कैलेंडर' : 'Profile & Calendar'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to={`/book/${artist.id}${targetDate ? `?date=${targetDate}&slot=${targetSlot}` : ''}`}
              className="flex-1 py-2.5 px-4 bg-gradient-to-r from-rose-800 to-amber-700 hover:from-rose-900 hover:to-amber-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm shadow-rose-900/10 transition-colors"
            >
              <span>{language === 'hi' ? 'तारीख लॉक करें' : 'Date-Lock Now'}</span>
            </Link>
          </div>

          {/* Compare Checkbox */}
          {showCompareOption && onToggleCompare && (
            <div className="pt-1 flex items-center justify-end">
              <label className="inline-flex items-center gap-1.5 text-xs text-stone-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isCompared}
                  onChange={() => onToggleCompare(artist.id)}
                  className="rounded border-stone-300 text-rose-800 focus:ring-rose-500 cursor-pointer"
                />
                <span>{language === 'hi' ? 'तुलना में जोड़ें' : 'Add to Compare'}</span>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Call Artist Modal */}
      <CallModal
        isOpen={callModalOpen}
        onClose={() => setCallModalOpen(false)}
        artist={artist}
      />
    </div>
  );
}
