import React from 'react';
import { ShieldCheck, PhoneCall, ImageIcon, Sparkles, Home, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function VerificationBadges({ verification, compact = false, showHeader = false }) {
  const { language } = useLanguage();

  if (!verification) return null;

  const badges = [
    {
      key: 'identityVerified',
      label: language === 'hi' ? 'पहचान सत्यापित' : 'Identity Verified',
      shortLabel: language === 'hi' ? 'पहचान' : 'Govt ID',
      desc: language === 'hi' ? 'आधार / सरकारी पहचान पत्र सत्यापित' : 'Aadhaar / Govt ID legally verified',
      icon: ShieldCheck,
      verified: !!verification.identityVerified,
      color: 'emerald'
    },
    {
      key: 'phoneVerified',
      label: language === 'hi' ? 'फ़ोन सत्यापित' : 'Phone Verified',
      shortLabel: language === 'hi' ? 'फ़ोन OTP' : 'Phone OTP',
      desc: language === 'hi' ? 'ओटीपी द्वारा सक्रिय मोबाइल नंबर पुष्ट' : 'Active Gorakhpur phone confirmed via OTP',
      icon: PhoneCall,
      verified: !!verification.phoneVerified,
      color: 'teal'
    },
    {
      key: 'portfolioChecked',
      label: language === 'hi' ? 'पोर्टफोलियो प्रमाणित' : 'Portfolio Checked',
      shortLabel: language === 'hi' ? 'मूल फोटो' : 'Original Art',
      desc: language === 'hi' ? 'रिवर्स-इमेज सर्च से मूल कला कार्य प्रमाणित' : 'Reverse-image searched: zero stolen photos',
      icon: ImageIcon,
      verified: !!verification.portfolioChecked,
      color: 'blue'
    },
    {
      key: 'skillChecked',
      label: language === 'hi' ? 'हुनर परीक्षित' : 'Skill Tested',
      shortLabel: language === 'hi' ? 'हुनर टेस्ट' : 'Skill Test',
      desc: language === 'hi' ? 'बारीक लाइन, स्पीड व गहरा प्राकृतिक रंग परीक्षण उत्तीर्ण' : 'Finesse, cone speed & dark stain test passed',
      icon: Sparkles,
      verified: !!verification.skillChecked,
      color: 'purple'
    },
    {
      key: 'homeServiceVerified',
      label: language === 'hi' ? 'होम-सर्विस सत्यापित' : 'Home-Service Verified',
      shortLabel: language === 'hi' ? 'घर सेवा' : 'Home Service',
      desc: language === 'hi' ? 'गोरखपुर स्थानीय पता एवं सुरक्षित होम-विजिट पुष्ट' : 'Gorakhpur residential address verified for home visits',
      icon: Home,
      verified: !!verification.homeServiceVerified,
      color: 'amber'
    }
  ];

  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-1.5" title="Rang Riwaaz Mehandi 5-Point Trust Verification">
        {badges.map((b) => (
          <span
            key={b.key}
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border transition-colors ${
              b.verified
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-stone-50 text-stone-400 border-stone-200 opacity-60'
            }`}
            title={`${b.label}: ${b.desc}`}
          >
            <b.icon className={`w-3 h-3 ${b.verified ? 'text-emerald-600' : 'text-stone-400'}`} />
            <span>{b.shortLabel}</span>
            {b.verified ? (
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
            ) : null}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {showHeader && (
        <div className="flex items-center justify-between pb-1 border-b border-stone-200">
          <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{language === 'hi' ? '5-चरणीय सुरक्षा व सत्यापन बैज' : '5-Point Trust & Verification Badges'}</span>
          </h4>
          <span className="text-[11px] text-stone-500 font-medium">
            {badges.filter(b => b.verified).length} / 5 {language === 'hi' ? 'सत्यापित' : 'Verified'}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {badges.map((b) => (
          <div
            key={b.key}
            className={`p-2.5 rounded-xl border flex items-start gap-2.5 transition-all ${
              b.verified
                ? 'bg-white border-emerald-200 shadow-sm'
                : 'bg-stone-50/60 border-stone-200 opacity-70'
            }`}
          >
            <div
              className={`p-1.5 rounded-lg shrink-0 ${
                b.verified ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-500'
              }`}
            >
              <b.icon className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold text-stone-900 truncate">{b.label}</span>
                {b.verified ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <span className="text-[10px] text-amber-700 bg-amber-100 px-1 rounded shrink-0">
                    {language === 'hi' ? 'लंबित' : 'Pending'}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-500 leading-tight mt-0.5 line-clamp-2">
                {b.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
