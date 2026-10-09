import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, CheckCircle2, XCircle, Trash2, ArrowRight, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { formatINR } from '../../utils/calculator';
import VerificationBadges from '../artist/VerificationBadges';

export default function CompareTable({ artists = [], onRemoveArtist }) {
  const { language } = useLanguage();

  if (artists.length === 0) {
    return (
      <div className="bg-white border border-stone-200 rounded-2xl p-10 text-center space-y-3">
        <p className="text-stone-500 text-sm">
          {language === 'hi'
            ? 'तुलना करने के लिए कोई कलाकार नहीं चुना गया है।'
            : 'No artists selected for comparison yet.'}
        </p>
        <Link
          to="/search"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-800 text-white font-bold rounded-xl text-xs hover:bg-rose-900 transition-colors"
        >
          <span>{language === 'hi' ? 'कलाकार खोजें' : 'Browse Gorakhpur Artists'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const rows = [
    {
      label: language === 'hi' ? 'गोरखपुर इलाका' : 'Gorakhpur Locality',
      render: (a) => (
        <span className="flex items-center justify-center gap-1 font-semibold text-stone-800">
          <MapPin className="w-3.5 h-3.5 text-amber-600" />
          {language === 'hi' ? (a.hindiLocality || a.locality) : a.locality}
        </span>
      )
    },
    {
      label: language === 'hi' ? 'रेटिंग व अनुभव' : 'Rating & Experience',
      render: (a) => (
        <div className="space-y-0.5">
          <div className="flex items-center justify-center gap-1 font-bold text-amber-600">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{a.rating} ({a.reviewCount})</span>
          </div>
          <span className="text-[11px] text-stone-500">{a.experienceYears} {language === 'hi' ? 'वर्ष अनुभव' : 'years experience'}</span>
        </div>
      )
    },
    {
      label: language === 'hi' ? 'ब्राइडल बेस पैकेज (पारदर्शी)' : 'Bridal Base Package',
      render: (a) => (
        <div className="space-y-0.5">
          <span className="text-base font-extrabold text-stone-900">
            {formatINR(a.pricing?.bridalBase || 5000)}
          </span>
          <span className="block text-[10px] text-stone-500">{a.pricing?.bridalPackageName}</span>
        </div>
      )
    },
    {
      label: language === 'hi' ? 'गेस्ट मेहंदी दर' : 'Guest Rate / Side',
      render: (a) => (
        <span className="font-bold text-stone-800">
          {formatINR(a.pricing?.guestPerSideRate || 180)} / side
        </span>
      )
    },
    {
      label: language === 'hi' ? 'लोकल यात्रा नीति' : 'Local Travel Policy',
      render: (a) => (
        <span className="text-xs text-stone-700">
          {a.pricing?.freeTravelRadiusKm} km {language === 'hi' ? 'मुफ्त' : 'free'}, then {formatINR(a.pricing?.travelFeePerKm)}/km
        </span>
      )
    },
    {
      label: language === 'hi' ? '5-चरणीय सत्यापन' : '5-Point Verification',
      render: (a) => (
        <div className="flex justify-center">
          <VerificationBadges verification={a.verification} compact />
        </div>
      )
    },
    {
      label: language === 'hi' ? 'समय पर आगमन दर' : 'On-Time Arrival Rate',
      render: (a) => (
        <span className="font-bold text-emerald-700">
          {a.reliability?.onTimePercentage || 99}%
        </span>
      )
    },
    {
      label: language === 'hi' ? 'औसत जवाब समय' : 'Avg Response Time',
      render: (a) => (
        <span className="font-medium text-stone-700">
          {a.reliability?.avgResponseTime || '8 mins'}
        </span>
      )
    },
    {
      label: language === 'hi' ? 'रद्दीकरण दर' : 'Cancellation Rate',
      render: (a) => (
        <span className="font-medium text-stone-700">
          {a.reliability?.cancellationRate || '0.5%'}
        </span>
      )
    },
    {
      label: language === 'hi' ? 'ऑर्गेनिक कोन गारंटी' : 'Organic Cones Guarantee',
      render: (a) => (
        <span className="inline-flex items-center gap-1 text-emerald-800 font-semibold text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{language === 'hi' ? '100% सोझत प्राकृतिक' : '100% Sojat Certified'}</span>
        </span>
      )
    }
  ];

  return (
    <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-x-auto">
      <table className="w-full text-center border-collapse min-w-[640px]">
        {/* Header with Artist Profile */}
        <thead>
          <tr className="border-b border-stone-200 bg-[#fdfaf6]">
            <th className="p-4 text-left text-xs font-bold uppercase text-stone-500 w-1/4">
              {language === 'hi' ? 'तुलना मापदंड' : 'Feature Criteria'}
            </th>
            {artists.map((artist) => (
              <th key={artist.id} className="p-4 relative">
                {onRemoveArtist && (
                  <button
                    onClick={() => onRemoveArtist(artist.id)}
                    className="absolute top-2 right-2 p-1 text-stone-400 hover:text-rose-600 rounded-md hover:bg-stone-100 transition-colors"
                    title={language === 'hi' ? 'हटाएं' : 'Remove from compare'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-stone-100 border-2 border-white shadow-sm">
                    <img
                      src={artist.avatar}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">
                      {language === 'hi' ? (artist.hindiName || artist.name) : artist.name}
                    </h4>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Comparison Rows */}
        <tbody className="divide-y divide-stone-100 text-xs">
          {rows.map((row, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'}>
              <td className="p-3.5 text-left font-bold text-stone-700 bg-stone-50/40">
                {row.label}
              </td>
              {artists.map((artist) => (
                <td key={artist.id} className="p-3.5">
                  {row.render(artist)}
                </td>
              ))}
            </tr>
          ))}

          {/* Action Row */}
          <tr className="bg-[#fcfaf7] border-t-2 border-stone-200">
            <td className="p-4 text-left font-bold text-stone-800">
              {language === 'hi' ? 'कार्रवाई' : 'Book Date-Lock'}
            </td>
            {artists.map((artist) => (
              <td key={artist.id} className="p-4">
                <Link
                  to={`/book/${artist.id}`}
                  className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-3 bg-gradient-to-r from-rose-800 to-amber-700 hover:from-rose-900 hover:to-amber-800 text-white font-bold rounded-xl text-xs shadow-sm transition-all"
                >
                  <span>{language === 'hi' ? 'तारीख लॉक करें' : 'Date-Lock Now'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
