import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Calculator, ShieldCheck, Tag, Info, ArrowRight, User, Car, Sparkles, Moon, Clock, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { GORAKHPUR_LOCALITIES, SERVICE_TYPES } from '../data/mockLocalities';
import { calculateMehndiPrice, formatINR } from '../utils/calculator';
import PriceBreakdown from '../components/booking/PriceBreakdown';

export default function PriceCalculatorPage() {
  const { language } = useLanguage();
  const { artists } = useBooking();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Selected Artist (if query param has artistId)
  const initialArtistId = searchParams.get('artistId') || artists[0]?.id;
  const [selectedArtistId, setSelectedArtistId] = useState(initialArtistId);

  // Form Parameters
  const [serviceType, setServiceType] = useState('bridal');
  const [bridalHandOption, setBridalHandOption] = useState('elbow'); // 'wrist' | 'forearm' | 'elbow'
  const [includeFeet, setIncludeFeet] = useState(true);
  const [feetCoverage, setFeetCoverage] = useState('ankle'); // 'ankle' | 'midcalf' | 'full'
  const [guestCount, setGuestCount] = useState(8);
  const [guestHandSides, setGuestHandSides] = useState(1);
  const [venueLocalityId, setVenueLocalityId] = useState('medical_road');
  const [extraPortrait, setExtraPortrait] = useState(false);
  const [extraStoryWork, setExtraStoryWork] = useState(false);
  const [isLateNight, setIsLateNight] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');

  const currentArtist = artists.find(a => a.id === selectedArtistId) || artists[0];

  // Calculate distance based on venue locality
  const targetLoc = GORAKHPUR_LOCALITIES.find(l => l.id === venueLocalityId);
  const travelDistanceKm = targetLoc ? targetLoc.distanceKm : 5;

  const calculation = useMemo(() => {
    return calculateMehndiPrice({
      artist: currentArtist,
      serviceType,
      bridalHandOption,
      includeFeet,
      feetCoverage,
      guestCount,
      guestHandSides,
      travelDistanceKm,
      extraPortrait,
      extraStoryWork,
      isLateNight,
      promoCode: appliedPromo
    });
  }, [
    currentArtist, serviceType, bridalHandOption, includeFeet, feetCoverage,
    guestCount, guestHandSides, travelDistanceKm, extraPortrait, extraStoryWork,
    isLateNight, appliedPromo
  ]);

  const handleApplyPromo = (code) => {
    setAppliedPromo(code);
    setPromoCode(code);
  };

  const handleBookWithCalculation = () => {
    // Navigate to booking form with calculation state
    navigate(`/book/${currentArtist.id}?calc=true`, {
      state: {
        calculation,
        serviceType,
        bridalHandOption,
        includeFeet,
        guestCount,
        guestHandSides,
        venueLocalityId,
        extraPortrait,
        extraStoryWork,
        isLateNight
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0d2214] via-[#163820] to-[#6e3512] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#c59b4e]/30">
        <div className="max-w-3xl space-y-2 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c59b4e]/20 text-[#edd096] text-xs font-bold border border-[#c59b4e]/40">
            <Calculator className="w-4 h-4" />
            <span>{language === 'hi' ? '100% पारदर्शी अंतिम मूल्य' : '100% Transparent Final Price'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-white m-0">
            {language === 'hi' ? 'पारदर्शी अंतिम मूल्य कैलकुलेटर' : 'Transparent Final Price Calculator'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {language === 'hi'
              ? 'पारंपरिक "शुरुआती कीमत" का भ्रम खत्म करें। दुल्हन, मेहमान, दूरी और अतिरिक्त डिजाइन जोड़कर वास्तविक अंतिम बिल निकालें।'
              : 'End the "starting from" ambiguity. Calculate guaranteed itemized total: Base + Guests + Travel + Extra Designs - Discounts.'}
          </p>
        </div>
      </div>

      {/* Main Grid: Inputs on Left, Real-Time Breakdown on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* 1. Artist Selection */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
              1. {language === 'hi' ? 'कलाकार चुनें' : 'Select Mehndi Artist'}
            </label>
            <select
              value={selectedArtistId}
              onChange={(e) => setSelectedArtistId(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800"
            >
              {artists.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} — {a.locality} ({formatINR(a.pricing?.bridalBase || 5000)} Base)
                </option>
              ))}
            </select>
          </div>

          {/* 2. Service & Bridal Hands/Legs Selection */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-4">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
              2. {language === 'hi' ? 'सेवा व हाथों/पैरों का चयन' : 'Service & Hands/Legs Coverage'}
            </label>

            {/* Service Type Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SERVICE_TYPES.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setServiceType(st.id)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                    serviceType === st.id
                      ? 'bg-rose-900 text-white border-rose-950 shadow-sm'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  {language === 'hi' ? st.hindiName : st.name}
                </button>
              ))}
            </div>

            {/* Hand Coverage if Bridal */}
            {serviceType === 'bridal' && (
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <span className="text-xs font-bold text-stone-700 block">
                  {language === 'hi' ? 'दुल्हन हाथ की लंबाई कवरेज:' : 'Bridal Hand Length Coverage:'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setBridalHandOption('wrist')}
                    className={`p-2 rounded-xl border text-xs font-medium text-center transition-all cursor-pointer ${
                      bridalHandOption === 'wrist' ? 'bg-amber-100 text-amber-950 border-amber-300 font-bold' : 'bg-stone-50 text-stone-600 border-stone-200'
                    }`}
                  >
                    {language === 'hi' ? 'हथेली व कलाई (70% बेस)' : 'Palms & Wrists'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setBridalHandOption('forearm')}
                    className={`p-2 rounded-xl border text-xs font-medium text-center transition-all cursor-pointer ${
                      bridalHandOption === 'forearm' ? 'bg-amber-100 text-amber-950 border-amber-300 font-bold' : 'bg-stone-50 text-stone-600 border-stone-200'
                    }`}
                  >
                    {language === 'hi' ? 'कलाई से आगे (85% बेस)' : 'Forearms'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setBridalHandOption('elbow')}
                    className={`p-2 rounded-xl border text-xs font-medium text-center transition-all cursor-pointer ${
                      bridalHandOption === 'elbow' ? 'bg-amber-100 text-amber-950 border-amber-300 font-bold' : 'bg-stone-50 text-stone-600 border-stone-200'
                    }`}
                  >
                    {language === 'hi' ? 'कोहनी तक (100% बेस)' : 'Elbow-Length'}
                  </button>
                </div>
              </div>
            )}

            {/* Feet Henna Selection */}
            {(serviceType === 'bridal' || serviceType === 'engagement') && (
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-700">
                    {language === 'hi' ? 'पैरों की मेहंदी शामिल करें?' : 'Include Bridal Feet Henna?'}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeFeet}
                      onChange={(e) => setIncludeFeet(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-800"></div>
                  </label>
                </div>

                {includeFeet && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setFeetCoverage('ankle')}
                      className={`p-2 rounded-xl border text-xs font-medium text-center transition-all cursor-pointer ${
                        feetCoverage === 'ankle' ? 'bg-amber-100 text-amber-950 border-amber-300 font-bold' : 'bg-stone-50 text-stone-600 border-stone-200'
                      }`}
                    >
                      {language === 'hi' ? 'टखने / पायल कफ' : 'Ankles / Payal Cuffs'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFeetCoverage('midcalf')}
                      className={`p-2 rounded-xl border text-xs font-medium text-center transition-all cursor-pointer ${
                        feetCoverage === 'midcalf' ? 'bg-amber-100 text-amber-950 border-amber-300 font-bold' : 'bg-stone-50 text-stone-600 border-stone-200'
                      }`}
                    >
                      {language === 'hi' ? 'पिण्डली तक (+35%)' : 'Mid-Calf (+35%)'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFeetCoverage('full')}
                      className={`p-2 rounded-xl border text-xs font-medium text-center transition-all cursor-pointer ${
                        feetCoverage === 'full' ? 'bg-amber-100 text-amber-950 border-amber-300 font-bold' : 'bg-stone-50 text-stone-600 border-stone-200'
                      }`}
                    >
                      {language === 'hi' ? 'घुटने के नीचे तक (+70%)' : 'Royal Full Feet (+70%)'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 3. Family Members & Guests */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-4">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
              3. {language === 'hi' ? 'परिवार व संगीत मेहमान संख्या' : 'Family Members & Guests'}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-stone-700 block">
                  {language === 'hi' ? 'मेहमानों की संख्या:' : 'Number of Guests:'}
                </span>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value))}
                    className="flex-1 accent-rose-800 cursor-pointer"
                  />
                  <span className="w-12 text-center text-sm font-extrabold text-rose-950 bg-rose-50 border border-rose-200 py-1 rounded-lg">
                    {guestCount}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-stone-700 block">
                  {language === 'hi' ? 'प्रति मेहमान हथेली कवरेज:' : 'Coverage per Guest:'}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGuestHandSides(1)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold cursor-pointer ${
                      guestHandSides === 1 ? 'bg-amber-100 text-amber-950 border-amber-300' : 'bg-stone-50 text-stone-600'
                    }`}
                  >
                    1 {language === 'hi' ? 'हथेली' : 'side'} ({formatINR(currentArtist.pricing?.guestPerSideRate || 180)})
                  </button>
                  <button
                    type="button"
                    onClick={() => setGuestHandSides(2)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold cursor-pointer ${
                      guestHandSides === 2 ? 'bg-amber-100 text-amber-950 border-amber-300' : 'bg-stone-50 text-stone-600'
                    }`}
                  >
                    2 {language === 'hi' ? 'हथेलियां' : 'sides'} ({formatINR((currentArtist.pricing?.guestPerSideRate || 180) * 2)})
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Travel Distance in Gorakhpur */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
              4. {language === 'hi' ? 'गोरखपुर वेन्यू इलाका (यात्रा शुल्क)' : 'Venue Locality & Travel Distance'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              <select
                value={venueLocalityId}
                onChange={(e) => setVenueLocalityId(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2.5 text-xs font-semibold text-stone-900"
              >
                {GORAKHPUR_LOCALITIES.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {language === 'hi' ? loc.hindiName : loc.name} (~{loc.distanceKm} km {language === 'hi' ? 'बरईपार मोड़ से' : 'from Baraipar Mod'})
                  </option>
                ))}
              </select>

              <div className="text-xs text-stone-600 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                <span className="font-semibold text-stone-800">
                  {currentArtist.pricing?.freeTravelRadiusKm} km {language === 'hi' ? 'मुफ्त' : 'Free'},
                </span>{' '}
                {language === 'hi' ? 'इसके बाद' : 'then'} {formatINR(currentArtist.pricing?.travelFeePerKm || 25)}/km
              </div>
            </div>
          </div>

          {/* 5. Extra Custom Design & Overtime */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
              5. {language === 'hi' ? 'अतिरिक्त डिजाइन व समय आवश्यकताएं' : 'Extra Design Requirements & Overtime'}
            </label>

            <div className="space-y-2.5">
              <label className="flex items-center justify-between p-3 rounded-xl border border-stone-200 hover:bg-stone-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={extraPortrait}
                    onChange={(e) => setExtraPortrait(e.target.checked)}
                    className="rounded text-rose-800 focus:ring-rose-500 w-4 h-4"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">
                      {language === 'hi' ? 'वर-वधू पोर्ट्रेट चित्रकला' : 'Dulha-Dulhan Portrait Face Artwork'}
                    </span>
                    <span className="text-[11px] text-stone-500">
                      {language === 'hi' ? 'दोनों हथेलियों पर वर व वधू का विस्तृत चित्र' : 'Hand-drawn portrait on palms'}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-rose-900">+{formatINR(currentArtist.pricing?.portraitAddon || 1400)}</span>
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-stone-200 hover:bg-stone-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={extraStoryWork}
                    onChange={(e) => setExtraStoryWork(e.target.checked)}
                    className="rounded text-rose-800 focus:ring-rose-500 w-4 h-4"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">
                      {language === 'hi' ? 'विवाह प्रसंग कथा (डोली / बारात / वरमाला)' : 'Wedding Story Figure Work'}
                    </span>
                    <span className="text-[11px] text-stone-500">
                      {language === 'hi' ? 'पारंपरिक कथा रूपांकन' : 'Thematic story scenes'}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-rose-900">+₹1,200</span>
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-stone-200 hover:bg-stone-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isLateNight}
                    onChange={(e) => setIsLateNight(e.target.checked)}
                    className="rounded text-rose-800 focus:ring-rose-500 w-4 h-4"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">
                      {language === 'hi' ? 'रात्रि 10:00 बजे के बाद सेवा (ओवरटाइम)' : 'Overtime Requirement (Post 10:00 PM)'}
                    </span>
                    <span className="text-[11px] text-stone-500">
                      {language === 'hi' ? 'रात्रि शिफ्ट कलाकार सुरक्षा व परिवहन' : 'Late night transport safety surcharge'}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-rose-900">+₹800</span>
              </label>
            </div>
          </div>

          {/* Promo Code Box */}
          <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              placeholder="Promo Code (e.g. GORAKHPUR10, SHUBH500)"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-rose-800"
            />
            <button
              type="button"
              onClick={() => handleApplyPromo(promoCode)}
              className="w-full sm:w-auto px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-xs cursor-pointer transition-colors"
            >
              {language === 'hi' ? 'कूपन लगाएं' : 'Apply Promo'}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 text-[11px]">
            <button
              type="button"
              onClick={() => handleApplyPromo('GORAKHPUR10')}
              className="text-stone-500 hover:text-stone-800 underline cursor-pointer"
            >
              GORAKHPUR10 (10% off)
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => handleApplyPromo('SHUBH500')}
              className="text-stone-500 hover:text-stone-800 underline cursor-pointer"
            >
              SHUBH500 (₹500 flat off)
            </button>
          </div>
        </div>

        {/* Right Sticky Calculation Breakdown (5 cols) */}
        <div className="lg:col-span-5 sticky top-20 text-left">
          <PriceBreakdown
            calculation={calculation}
            showLockAction
            onLockBooking={handleBookWithCalculation}
          />
        </div>
      </div>
    </div>
  );
}
