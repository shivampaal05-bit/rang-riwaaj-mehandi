import React from 'react';
import { ShieldCheck, CheckCircle2, Star, MapPin, Award, ArrowRight, Zap, BadgePercent } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import VerificationBadges from './VerificationBadges';
import { formatINR } from '../../utils/calculator';

export default function BackupArtistCard({
  artist,
  originalArtist,
  onAccept,
  isRecommended = true,
  matchScore = 98
}) {
  const { language } = useLanguage();

  return (
    <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
      isRecommended
        ? 'border-emerald-300 bg-white shadow-lg ring-2 ring-emerald-500/20'
        : 'border-stone-200 bg-white shadow-sm'
    }`}>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-200">
          <Zap className="w-4 h-4 text-amber-300" />
          <span>
            {language === 'hi' ? 'इमरजेंसी बैकअप स्टैंडबाय मैच' : 'Standby Emergency Backup Match'}
          </span>
        </div>
        <div className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-100 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
          {matchScore}% {language === 'hi' ? 'मैच' : 'Matched'}
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Artist Profile Header */}
        <div className="flex items-start gap-3.5">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
            <img
              src={artist.avatar}
              alt={artist.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="font-extrabold text-stone-900 text-base leading-tight truncate">
                {language === 'hi' ? (artist.hindiName || artist.name) : artist.name}
              </h4>
            </div>

            <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>{language === 'hi' ? (artist.hindiLocality || artist.locality) : artist.locality}</span>
            </p>

            <div className="flex items-center gap-2 text-xs text-stone-700 mt-1">
              <span className="flex items-center gap-1 font-bold text-amber-600">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {artist.rating}
              </span>
              <span className="text-stone-400">•</span>
              <span className="font-medium text-emerald-700">{artist.reliability?.onTimePercentage || 99}% on-time</span>
              <span className="text-stone-400">•</span>
              <span className="text-stone-500">{artist.reliability?.completedBookings || 150}+ weddings</span>
            </div>
          </div>
        </div>

        {/* 5-Point Verification */}
        <VerificationBadges verification={artist.verification} compact />

        {/* Match Breakdown Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] bg-stone-50 p-2.5 rounded-xl border border-stone-100">
          <div>
            <span className="text-stone-400 block text-[10px] uppercase font-bold">{language === 'hi' ? 'स्थान निकटता' : 'Distance'}</span>
            <span className="font-semibold text-stone-800">~{artist.baseTravelDistanceKm || 3} km</span>
          </div>
          <div>
            <span className="text-stone-400 block text-[10px] uppercase font-bold">{language === 'hi' ? 'कला शैली' : 'Style Fit'}</span>
            <span className="font-semibold text-stone-800">{artist.specialties?.[0] || 'Bridal Jaal'}</span>
          </div>
          <div>
            <span className="text-stone-400 block text-[10px] uppercase font-bold">{language === 'hi' ? 'जवाब गति' : 'Response'}</span>
            <span className="font-semibold text-emerald-700">{artist.reliability?.avgResponseTime || '6 mins'}</span>
          </div>
          <div>
            <span className="text-stone-400 block text-[10px] uppercase font-bold">{language === 'hi' ? 'मूल्य सुरक्षा' : 'Price Protection'}</span>
            <span className="font-semibold text-rose-800">100% {language === 'hi' ? 'लॉक' : 'Locked'}</span>
          </div>
        </div>

        {/* MehndiConnect Price Protection Guarantee Box */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-emerald-950">
          <BadgePercent className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">
              {language === 'hi' ? 'मूल्य वृद्धि सुरक्षा गारंटी' : 'Zero Extra Cost Guarantee'}
            </span>
            <span className="text-[11px] text-emerald-800">
              {language === 'hi'
                ? 'यदि इस बैकअप कलाकार का सामान्य शुल्क अधिक भी है, तो अंतर राशि का भुगतान रंग रिवाज़ मेहंदी वहन करेगा। आपसे ₹1 भी अतिरिक्त नहीं लिया जाएगा।'
                : 'Even if this standby artist charges higher rates normally, Rang Riwaaz Mehandi covers 100% of the price difference. You pay zero extra.'}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={() => onAccept(artist.id)}
            className="w-full py-3 px-4 bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white font-bold rounded-xl text-sm shadow-md shadow-emerald-900/10 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>
              {language === 'hi' ? 'इस बैकअप कलाकार को स्वीकार करें (पक्का करें)' : 'Accept This Backup Artist (Lock Slot)'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
