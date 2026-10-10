import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, Calendar, Search, ShieldCheck, Calculator, Clock, 
  MapPin, CheckCircle2, ArrowRight, Star, HeartHandshake, PhoneCall, 
  AlertTriangle, Users, Award, Zap, ChevronRight, HelpCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { GORAKHPUR_LOCALITIES, SERVICE_TYPES, TIME_SLOTS } from '../data/mockLocalities';
import ArtistCard from '../components/artist/ArtistCard';
import { formatINR } from '../utils/calculator';

export default function Home() {
  const { language, t } = useLanguage();
  const { artists } = useBooking();
  const navigate = useNavigate();

  // Search Bar State
  const [selectedLocality, setSelectedLocality] = useState('betiahata');
  const [selectedService, setSelectedService] = useState('bridal');
  const [selectedDate, setSelectedDate] = useState('2026-10-05');
  const [selectedSlot, setSelectedSlot] = useState('evening');

  // Interactive Quick Calculator Preview State
  const [previewGuests, setPreviewGuests] = useState(8);
  const [previewIncludeFeet, setPreviewIncludeFeet] = useState(true);
  const [previewPortrait, setPreviewPortrait] = useState(true);

  // Quick price preview calculation
  const quickBase = 5800;
  const quickFeet = previewIncludeFeet ? 1800 : 0;
  const quickGuests = previewGuests * 180;
  const quickPortrait = previewPortrait ? 1500 : 0;
  const quickTotal = quickBase + quickFeet + quickGuests + quickPortrait;

  const handleHeroSearch = (e) => {
    e.preventDefault();
    navigate(`/search?loc=${selectedLocality}&service=${selectedService}&date=${selectedDate}&slot=${selectedSlot}`);
  };

  const featuredArtists = artists.slice(0, 3);

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION WITH FULL BRIDAL BACKGROUND */}
      <section className="relative overflow-hidden min-h-[660px] sm:min-h-[720px] lg:min-h-[760px] flex items-center justify-center text-center text-white border-b border-[#c59b4e]/30 pt-12 pb-16 sm:py-20">
        {/* Full Bridal Photo in Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <img
            src="/images/hero_bridal_mehndi.jpg"
            alt="Royal Bridal Mehndi Art - Gorakhpur"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
          />

          {/* Royal Dark Henna & Gold Glow Overlay for perfect readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a180d]/85 via-[#102315]/70 to-[#09150c]/90 backdrop-blur-[0.5px]" />
          <div className="absolute inset-0 bg-radial from-[#c59b4e]/20 via-transparent to-transparent opacity-60" />
        </div>

        {/* Content On Top of Bridal Background */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-6 sm:space-y-8 text-center">
          {/* Brand Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#c59b4e]/40 text-[#edd096] text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#c59b4e]" />
            <span>{language === 'hi' ? 'गोरखपुर का प्रतिष्ठित मेंहदी ब्रांड' : 'Gorakhpur’s Trusted Mehndi Brand'}</span>
          </div>

          {/* Brand Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight text-white leading-tight drop-shadow-lg">
            {language === 'hi' ? (
              <>
                <span className="text-[#a3d9b1]">रंग</span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffdca8] via-[#edd096] to-[#c59b4e]">
                  रिवाज़
                </span>{' '}
                <span className="text-white">मेहंदी</span>
              </>
            ) : (
              <>
                <span className="text-[#a3d9b1]">Rang</span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffdca8] via-[#edd096] to-[#c59b4e]">
                  Riwaaz
                </span>{' '}
                <span className="text-white">Mehandi</span>
              </>
            )}
          </h1>

          {/* About the Brand Lines - Normal clean text without any box */}
          <div className="space-y-3 max-w-3xl mx-auto text-[#f5ebd7]">
            <p className="text-lg sm:text-2xl font-serif font-semibold text-[#fbebd0] leading-snug drop-shadow-md">
              {language === 'hi'
                ? 'गोरखपुर की शादियों, सगाई और मांगलिक उत्सवों में परंपरा, सगुन और कला का विश्वसनीय प्रतीक।'
                : 'Gorakhpur’s premier destination for authentic bridal elegance, auspicious celebrations, and fine henna art.'}
            </p>
            <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-2xl mx-auto drop-shadow-sm font-normal">
              {language === 'hi'
                ? 'हम 100% शुद्ध ऑर्गेनिक सोजत हिना और शहर के सिद्धहस्त मेंहदी कलाकारों के साथ आपके घर और वेन्यू पर खुशियों के गहरे और यादगार रंग सजाते हैं।'
                : 'We bring 100% pure organic Sojat henna and master local artists directly to your doorstep, crafting rich, dark stains and timeless bridal memories.'}
            </p>
          </div>

          {/* HERO SEARCH BAR FORM */}
          <div className="pt-2 text-left">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-6 shadow-2xl border border-amber-300/80">
              <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-end">
                {/* Locality */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-800" />
                    <span>{t('heroSearchCity')}</span>
                  </label>
                  <select
                    value={selectedLocality}
                    onChange={(e) => setSelectedLocality(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800"
                  >
                    {GORAKHPUR_LOCALITIES.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {language === 'hi' ? loc.hindiName : loc.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Service Type */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{t('heroServiceType')}</span>
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800"
                  >
                    {SERVICE_TYPES.map((st) => (
                      <option key={st.id} value={st.id}>
                        {language === 'hi' ? st.hindiName : st.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Event Date */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{t('heroEventDate')}</span>
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800"
                  />
                </div>

                {/* Time Slot */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-700" />
                    <span>{t('heroTimeSlot')}</span>
                  </label>
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800"
                  >
                    {TIME_SLOTS.map((sl) => (
                      <option key={sl.id} value={sl.id}>
                        {language === 'hi' ? sl.hindiLabel : sl.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-gradient-to-r from-[#163820] via-[#21532f] to-[#88451b] hover:from-[#0d2214] hover:to-[#6e3512] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-[#163820]/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Search className="w-4 h-4" />
                    <span>{t('heroSearchBtn')}</span>
                  </button>
                </div>
              </form>

              <div className="mt-3 text-[11px] text-stone-500 text-center sm:text-left flex items-center justify-center sm:justify-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{t('heroDemoDisclaimer')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM VS SOLUTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-10">
          <span className="text-xs uppercase font-extrabold tracking-wider text-rose-800 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            {language === 'hi' ? 'शोध पर आधारित समस्या निवारण' : 'Research-Based Problem Solving'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-heading">
            {t('problemTitle')}
          </h2>
          <p className="text-sm text-stone-600">
            {t('problemSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Item 1 */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200/80">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{t('prob1Title')}</span>
                </div>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {t('prob1Desc')}
                </p>
              </div>

              <div className="p-3.5 bg-emerald-50 text-emerald-950 rounded-xl border border-emerald-200">
                <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t('sol1Title')}</span>
                </div>
                <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                  {t('sol1Desc')}
                </p>
              </div>
            </div>

            <Link
              to="/search"
              className="text-xs font-bold text-rose-800 hover:text-rose-950 flex items-center gap-1 pt-2"
            >
              <span>{language === 'hi' ? 'उपलब्धता कैलेंडर देखें' : 'View Real Calendar'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Item 2 */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200/80">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{t('prob2Title')}</span>
                </div>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {t('prob2Desc')}
                </p>
              </div>

              <div className="p-3.5 bg-emerald-50 text-emerald-950 rounded-xl border border-emerald-200">
                <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t('sol2Title')}</span>
                </div>
                <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                  {t('sol2Desc')}
                </p>
              </div>
            </div>

            <Link
              to="/calculator"
              className="text-xs font-bold text-rose-800 hover:text-rose-950 flex items-center gap-1 pt-2"
            >
              <span>{language === 'hi' ? 'मूल्य कैलकुलेटर खोलें' : 'Open Price Calculator'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Item 3 */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200/80">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{t('prob3Title')}</span>
                </div>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {t('prob3Desc')}
                </p>
              </div>

              <div className="p-3.5 bg-emerald-50 text-emerald-950 rounded-xl border border-emerald-200">
                <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t('sol3Title')}</span>
                </div>
                <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                  {t('sol3Desc')}
                </p>
              </div>
            </div>

            <Link
              to="/backup"
              className="text-xs font-bold text-rose-800 hover:text-rose-950 flex items-center gap-1 pt-2"
            >
              <span>{language === 'hi' ? 'बैकअप गारंटी समझें' : 'Explore Backup Guarantee'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. HOW DATE-LOCK BOOKING WORKS */}
      <section className="bg-stone-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30">
              {language === 'hi' ? 'सरल 3-चरणीय प्रक्रिया' : 'Simple 3-Step Process'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              {language === 'hi' ? 'डेट-लॉक बुकिंग कैसे काम करती है?' : 'How Date-Locked Booking Works'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-400">
              {language === 'hi'
                ? 'गोरखपुर के लगन रश में भी आपकी पसंदीदा तारीख 100% सुरक्षित और गारंटीड रहेगी।'
                : 'Guaranteed slot reservation even during peak wedding rush across Gorakhpur.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-rose-900 text-amber-300 font-extrabold flex items-center justify-center text-base">
                1
              </div>
              <h4 className="text-base font-bold text-white">
                {language === 'hi' ? 'तारीख व इलाका चुनें' : '1. Pick Date & Locality'}
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                {language === 'hi'
                  ? 'अपनी शादी की तारीख, स्लॉट और गोरखपुर का इलाका (जैसे गोलघर या बेतियाहाता) दर्ज करें।'
                  : 'Enter your exact wedding date, time slot, and locality. View only truly available artists.'}
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-stone-950 font-extrabold flex items-center justify-center text-base">
                2
              </div>
              <h4 className="text-base font-bold text-white">
                {language === 'hi' ? 'पारदर्शी अंतिम मूल्य तय करें' : '2. Lock Exact Itemized Price'}
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                {language === 'hi'
                  ? 'दुल्हन, मेहमान व दूरी अनुसार सटीक बिल पाएं। 20% टोकन से तारीख लॉक करें।'
                  : 'Know your exact bill before booking. Lock the slot with a 20% advance token.'}
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white font-extrabold flex items-center justify-center text-base">
                3
              </div>
              <h4 className="text-base font-bold text-white">
                {language === 'hi' ? 'बैकअप सुरक्षा के साथ चिंतामुक्त रहें' : '3. Relax with Backup Protection'}
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                {language === 'hi'
                  ? 'कलाकार के समय पर पहुंचने का लाइव ट्रैकर, और आपातकाल में स्टैंडबाय कलाकार तैयार।'
                  : 'Live 9-stage tracking timeline. In case of emergency, standby replacement is guaranteed.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRICE CALCULATOR INTERACTIVE PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-[#fbf8f3] to-amber-50/50 rounded-3xl border border-amber-200 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left explanation */}
            <div className="lg:col-span-6 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
                <Calculator className="w-3.5 h-3.5 text-amber-700" />
                <span>{language === 'hi' ? 'मूल्य पारदर्शिता पूर्वावलोकन' : 'Live Pricing Preview'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-heading">
                {language === 'hi'
                  ? 'शादी के दिन कोई चौंकने वाला बिल नहीं'
                  : 'Zero Starting-Price Trap on Wedding Day'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {language === 'hi'
                  ? 'पारंपरिक बाजार में ₹2,500 बोलकर अंतिम दिन ₹12,000 मांग लेते हैं। हमारे पारदर्शी कैलकुलेटर में हर हाथ, मेहमान और किलोमीटर की दर पहले से तय होती है।'
                  : 'Never face ambiguous quotes. Adjust guests, bridal coverage, and portrait art below to see instant itemized calculation.'}
              </p>

              {/* Controls */}
              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-bold text-stone-800 mb-1">
                    <span>{language === 'hi' ? 'परिवार / रिश्तेदार मेहमान संख्या' : 'Guest Count (Sangeet):'}</span>
                    <span className="text-rose-900 font-extrabold">{previewGuests} {language === 'hi' ? 'लोग' : 'people'}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    value={previewGuests}
                    onChange={(e) => setPreviewGuests(parseInt(e.target.value))}
                    className="w-full accent-rose-800 cursor-pointer"
                  />
                </div>

                <div className="flex flex-wrap gap-4 pt-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-stone-700">
                    <input
                      type="checkbox"
                      checked={previewIncludeFeet}
                      onChange={(e) => setPreviewIncludeFeet(e.target.checked)}
                      className="rounded text-rose-800 focus:ring-rose-500"
                    />
                    <span>{language === 'hi' ? 'पैरों की विस्तृत मेहंदी (+₹1,800)' : 'Bridal Feet Coverage (+₹1,800)'}</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-stone-700">
                    <input
                      type="checkbox"
                      checked={previewPortrait}
                      onChange={(e) => setPreviewPortrait(e.target.checked)}
                      className="rounded text-rose-800 focus:ring-rose-500"
                    />
                    <span>{language === 'hi' ? 'वर-वधू पोर्ट्रेट कला (+₹1,500)' : 'Portrait Face Work (+₹1,500)'}</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Result Card */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-2xl border-2 border-stone-800 p-5 shadow-lg space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-stone-100">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    {language === 'hi' ? 'अंतिम पारदर्शी अनुमान' : 'Guaranteed Price Estimate'}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {language === 'hi' ? 'निश्चित कुल बिल' : 'Exact Total'}
                  </span>
                </div>

                <div className="space-y-2 text-xs divide-y divide-stone-100">
                  <div className="flex justify-between pt-1">
                    <span className="text-stone-600">{language === 'hi' ? 'दुल्हन बेस पैकेज (कोहनी तक)' : 'Bridal Base (Elbow-Length)'}</span>
                    <span className="font-bold text-stone-900">{formatINR(quickBase)}</span>
                  </div>
                  {previewIncludeFeet && (
                    <div className="flex justify-between pt-2">
                      <span className="text-stone-600">{language === 'hi' ? 'पैरों की डिजाइन (पायल कफ)' : 'Bridal Feet (Payal Cuffs)'}</span>
                      <span className="font-bold text-stone-900">+{formatINR(quickFeet)}</span>
                    </div>
                  )}
                  {previewGuests > 0 && (
                    <div className="flex justify-between pt-2">
                      <span className="text-stone-600">{previewGuests} {language === 'hi' ? 'मेहमान (₹180/साइड)' : 'Guests (@ ₹180/side)'}</span>
                      <span className="font-bold text-stone-900">+{formatINR(quickGuests)}</span>
                    </div>
                  )}
                  {previewPortrait && (
                    <div className="flex justify-between pt-2">
                      <span className="text-stone-600">{language === 'hi' ? 'वर-वधू पोर्ट्रेट कार्य' : 'Portrait Face Art'}</span>
                      <span className="font-bold text-stone-900">+{formatINR(quickPortrait)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2">
                    <span className="text-stone-600">{language === 'hi' ? 'गोरखपुर स्थानीय यात्रा' : 'Local Travel within 3 km'}</span>
                    <span className="font-bold text-emerald-700">₹0 (Free)</span>
                  </div>
                </div>

                <div className="pt-3 border-t-2 border-stone-900 flex justify-between items-baseline">
                  <div>
                    <span className="text-xs uppercase font-extrabold text-stone-500 block">
                      {language === 'hi' ? 'कुल राशि' : 'Final Total'}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      {language === 'hi' ? 'तारीख लॉक टोकन (20%): ' : '20% token: '}
                      <b>{formatINR(Math.round(quickTotal * 0.2))}</b>
                    </span>
                  </div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-rose-950">
                    {formatINR(quickTotal)}
                  </span>
                </div>

                <Link
                  to="/calculator"
                  className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>{language === 'hi' ? 'विस्तृत कैलकुलेटर खोलें' : 'Open Full Price Calculator'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VERIFIED LOCAL ARTISTS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5 text-left">
            <span className="text-xs uppercase font-extrabold tracking-wider text-rose-800 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              {language === 'hi' ? 'गोरखपुर के शीर्ष कलाकार' : 'Gorakhpur Verified Artists'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-heading">
              {language === 'hi' ? 'सत्यापित व डेट-लॉक्ड लोकल आर्टिस्ट' : 'Verified Local Mehndi Artists'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              {language === 'hi'
                ? '5-चरणीय सुरक्षा सत्यापित, मूल पोर्टफोलियो एवं केमिकल-मुक्त प्राकृतिक कोन गारंटी'
                : '100% physical address verified in Gorakhpur with certified original work.'}
            </p>
          </div>

          <Link
            to="/search"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-rose-800 hover:text-rose-950 transition-colors shrink-0"
          >
            <span>{language === 'hi' ? 'सभी 8 कलाकार देखें' : 'View All 8 Local Artists'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArtists.map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              targetDate={selectedDate}
              targetSlot={selectedSlot}
            />
          ))}
        </div>
      </section>

      {/* 6. BACKUP GUARANTEE & RELIABILITY EXPLANATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-stone-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-500/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/40">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{language === 'hi' ? 'स्थानीय बैकअप गारंटी' : 'Local Standby Backup Guarantee'}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
                {language === 'hi'
                  ? 'यदि कलाकार ऐन वक्त पर मना कर दे, तो हमारे पास तुरंत समाधान है'
                  : 'What if your mehndi artist falls sick or cancels at the last minute?'}
              </h2>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {language === 'hi'
                  ? 'रंग रिवाज़ मेहंदी (Rang Riwaaz Mehandi) गोरखपुर का एकमात्र मंच है जो हर बुकिंग के साथ एक स्टैंडबाय कलाकार मैप करके रखता है। यदि मूल कलाकार आपातकाल में रद्द करता है, तो आप तुरंत बैकअप स्वीकार कर सकते हैं, दूसरा कलाकार चुन सकते हैं, या 100% धनवापसी ले सकते हैं। मूल्य वृद्धि का पूरा खर्च हम उठाते हैं।'
                  : 'Rang Riwaaz Mehandi pre-matches a standby verified artist from the same Gorakhpur locality and style. You get 4 instant options: Accept Standby, Request Alternate, Reschedule, or Instant Refund with zero price change.'}
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/backup"
                  className="py-3 px-5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold rounded-xl text-xs sm:text-sm transition-colors shadow-md"
                >
                  {language === 'hi' ? 'बैकअप आर्टिस्ट फ्लो टेस्ट करें' : 'Simulate Backup Flow'}
                </Link>

                <Link
                  to="/help"
                  className="py-3 px-5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors border border-white/20"
                >
                  {language === 'hi' ? 'हेल्प व अक्सर पूछे जाने वाले प्रश्न' : 'Read FAQs'}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3 text-xs">
              <h4 className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
                {language === 'hi' ? 'बैकअप गारंटी के 4 स्तंभ' : 'Backup Guarantee Pillars'}
              </h4>
              <div className="space-y-2.5">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{language === 'hi' ? 'समान गोरखपुर इलाके का स्टैंडबाय आर्टिस्ट' : 'Same locality standby within 5 km'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{language === 'hi' ? 'शून्य अतिरिक्त खर्च (मूल्य अंतर हम देंगे)' : 'Zero extra cost: We pay rate difference'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{language === 'hi' ? 'आपातकालीन व्हाट्सएप व कॉल सपोर्ट' : 'Priority WhatsApp & phone hotline'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{language === 'hi' ? '100% अग्रिम धनवापसी विकल्प' : 'Instant 100% advance refund option'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-wider text-rose-800 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            {language === 'hi' ? 'सत्यापित दुल्हन अनुभव' : 'Verified Reviews'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-heading">
            {language === 'hi' ? 'गोरखपुर के परिवारों का भरोसा' : 'Trusted by Gorakhpur Brides & Families'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            {language === 'hi'
              ? 'केवल उन शादियों की समीक्षाएं जिनकी बुकिंग हमारे मंच से पूरी हुई'
              : '100% authentic feedback tagged with verified booking ID.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                GKP-MHN-1049
              </span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed italic">
              "Pooja Verma ji arrived at Hotel Radisson Mohaddipur 15 mins before time. The portrait of bride & groom was breathtaking. No surprise charges on the day!"
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="font-bold text-stone-900">Shweta Srivastava</span>
              <span className="text-stone-500">Mohaddipur, Gorakhpur</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                GKP-MHN-1180
              </span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed italic">
              "We booked Ananya for our family sangeet of 18 cousins. She and her team finished everyone in 3 hours with super neat Arabic flow. Total peace of mind!"
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="font-bold text-stone-900">Kavita Singh</span>
              <span className="text-stone-500">Shahpur, Gorakhpur</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                GKP-MHN-0841
              </span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed italic">
              "Radhika didi’s Marwari Doli and Baraat design on my hands was the talk of the wedding. Natural henna with deep dark color. Highly recommended!"
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="font-bold text-stone-900">Ritu Mishra</span>
              <span className="text-stone-500">Betiahata, Gorakhpur</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. HINDI-FRIENDLY FINAL BOOKING CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-amber-900 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
              {language === 'hi'
                ? 'अपनी शादी की तारीख को अभी सुरक्षित व लॉक करें'
                : 'Date-Lock Your Wedding Mehndi Artist Today'}
            </h2>
            <p className="text-xs sm:text-base text-rose-100 leading-relaxed font-hindi">
              {language === 'hi'
                ? 'गोरखपुर के बेतियाहाता, गोलघर, मोहाद्दीपुर, असुरन व सभी इलाकों में सत्यापित कलाकार उपलब्ध हैं। कॉल या व्हाट्सएप पर भी सहायता उपलब्ध है।'
                : 'Verified artists available across Golghar, Betiahata, Mohaddipur, and all Gorakhpur areas. Full backup support included.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/search"
              className="py-3.5 px-6 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              {language === 'hi' ? 'तारीख अनुसार कलाकार खोजें' : 'Search by Event Date'}
            </Link>
            <Link
              to="/calculator"
              className="py-3.5 px-6 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs sm:text-sm border border-white/30 transition-all cursor-pointer"
            >
              {language === 'hi' ? 'अंतिम मूल्य कैलकुलेट करें' : 'Calculate Exact Price'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
