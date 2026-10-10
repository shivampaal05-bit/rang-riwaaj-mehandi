import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Calendar, ShieldCheck, ArrowRight, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import EventTimePlanner from '../components/booking/EventTimePlanner';

export default function EventPlannerPage() {
  const { language } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0d2214] via-[#163820] to-[#6e3512] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#c59b4e]/30">
        <div className="max-w-3xl space-y-2 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c59b4e]/20 text-[#edd096] text-xs font-bold border border-[#c59b4e]/40">
            <Clock className="w-4 h-4" />
            <span>{language === 'hi' ? 'समयबद्ध विवाह प्रबंधन' : 'Punctual Wedding Management'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-white m-0">
            {language === 'hi' ? 'स्मार्ट इवेंट टाइम व कलाकार क्षमता प्लानर' : 'Smart Event Time & Artist Capacity Planner'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {language === 'hi'
              ? 'अक्सर शादियों में मेहंदी देर से शुरू होती है और वरमाला या स्टेज का समय निकल जाता है। हमारे प्लानर से जानें कितने कलाकार चाहिए और उन्हें किस समय बुलाना चाहिए।'
              : 'Calculate the exact number of artists required, realistic total duration, and recommended call time with drying buffer.'}
          </p>
        </div>
      </div>

      {/* Main Interactive Planner Component */}
      <EventTimePlanner
        initialBride={1}
        initialGroom={1}
        initialGuests={12}
      />

      {/* Pro-Tips & Henna Darkening Protocol */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>{language === 'hi' ? 'गहरे रंग हेतु 48-घंटे की सलाह' : '48-Hour Stain Darkening Protocol'}</span>
          </div>
          <ul className="space-y-2 text-xs text-stone-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{language === 'hi' ? 'शादी समारोह से 48 घंटे (2 दिन) पहले दुल्हन की मेहंदी लगवाएं।' : 'Schedule bridal henna 48 hours prior to stage ceremony for peak dark mahogany stain.'}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{language === 'hi' ? 'सूखने के बाद कम से कम 6-8 घंटे पानी से हाथ न धोएं।' : 'Avoid water on hands for at least 6-8 hours after application.'}</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{language === 'hi' ? 'नींबू-चीनी के घोल व लौंग के धुएं की भाप लें।' : 'Mist with warm lemon-sugar syrup and warm hands gently over clove fumes.'}</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-rose-800" />
            <span>{language === 'hi' ? 'समानांतर सहायक कलाकार लाभ' : 'Why Parallel Artist Teams Matter'}</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            {language === 'hi'
              ? 'यदि 15+ मेहमान हैं और केवल 1 कलाकार है, तो काम खत्म करने में 9 घंटे लग जाएंगे। रंग रिवाज़ मेहंदी आपको मुख्य दुल्हन कलाकार के साथ 1 या 2 सहायक कलाकार एक साथ उपलब्ध कराता है।'
              : 'Single artists attempting 15+ guests cause severe wedding schedule delays. Rang Riwaaz Mehandi lets you book coordinated lead & assistant teams for simultaneous guest stations.'}
          </p>
          <div className="pt-2">
            <Link
              to="/search"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-xs transition-colors"
            >
              <span>{language === 'hi' ? 'कलाकार खोजें' : 'Browse Artists for Your Date'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
