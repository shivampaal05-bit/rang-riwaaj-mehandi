import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, Calendar, Clock, MapPin, User, Phone, CheckCircle2, 
  AlertCircle, Lock, ArrowRight, ArrowLeft, Sparkles, Info 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { GORAKHPUR_LOCALITIES, SERVICE_TYPES, TIME_SLOTS } from '../data/mockLocalities';
import { calculateMehndiPrice, formatINR } from '../utils/calculator';
import PriceBreakdown from '../components/booking/PriceBreakdown';

export default function BookingFormPage() {
  const { artistId } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { language } = useLanguage();
  const { artists, createBooking, getAvailabilityStatus } = useBooking();
  const { currentUser } = useAuth();
  const { addToast } = useToast();

  const targetArtistId = artistId || artists[0]?.id;
  const artist = artists.find(a => a.id === targetArtistId) || artists[0];

  // Pre-filled state from query params or calculator state
  const calcState = location.state || {};
  const [eventDate, setEventDate] = useState(searchParams.get('date') || '2026-10-05');
  const [timeSlot, setTimeSlot] = useState(searchParams.get('slot') || 'evening');
  const [serviceType, setServiceType] = useState(calcState.serviceType || 'bridal');
  const [bridalHandOption, setBridalHandOption] = useState(calcState.bridalHandOption || 'elbow');
  const [includeFeet, setIncludeFeet] = useState(calcState.includeFeet !== undefined ? calcState.includeFeet : true);
  const [guestCount, setGuestCount] = useState(calcState.guestCount || 6);
  const [guestHandSides, setGuestHandSides] = useState(calcState.guestHandSides || 1);
  const [extraPortrait, setExtraPortrait] = useState(calcState.extraPortrait || false);
  const [extraStoryWork, setExtraStoryWork] = useState(calcState.extraStoryWork || false);
  const [isLateNight, setIsLateNight] = useState(calcState.isLateNight || false);

  // Customer Contact Fields
  const [customerName, setCustomerName] = useState(currentUser?.name || 'Priya Tiwari');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '+91 98391 22840');
  const [venueLocalityId, setVenueLocalityId] = useState(calcState.venueLocalityId || 'medical_road');
  const [venueAddress, setVenueAddress] = useState('Flat 402, Shivalik Heights, Medical College Road, Gorakhpur');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Form Validation Errors
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check real availability for chosen date & slot
  const availabilityCheck = useMemo(() => {
    return getAvailabilityStatus(artist.id, eventDate, timeSlot);
  }, [artist.id, eventDate, timeSlot, getAvailabilityStatus]);

  // Pricing calculation
  const targetLoc = GORAKHPUR_LOCALITIES.find(l => l.id === venueLocalityId);
  const travelDistanceKm = targetLoc ? targetLoc.distanceKm : 5;

  const calculation = useMemo(() => {
    return calculateMehndiPrice({
      artist,
      serviceType,
      bridalHandOption,
      includeFeet,
      guestCount,
      guestHandSides,
      travelDistanceKm,
      extraPortrait,
      extraStoryWork,
      isLateNight
    });
  }, [
    artist, serviceType, bridalHandOption, includeFeet, guestCount,
    guestHandSides, travelDistanceKm, extraPortrait, extraStoryWork, isLateNight
  ]);

  const validate = () => {
    const errs = {};
    if (!customerName.trim()) {
      errs.customerName = language === 'hi' ? 'कृपया अपना नाम दर्ज करें' : 'Please enter your name';
    }
    if (!customerPhone.trim() || customerPhone.replace(/[^0-9]/g, '').length < 10) {
      errs.customerPhone = language === 'hi' ? 'कृपया मान्य 10 अंकों का मोबाइल नंबर दें' : 'Please enter a valid 10-digit phone number';
    }
    if (!venueAddress.trim()) {
      errs.venueAddress = language === 'hi' ? 'कृपया गोरखपुर का वेन्यू पता दर्ज करें' : 'Please enter event venue address';
    }
    if (!eventDate) {
      errs.eventDate = language === 'hi' ? 'कृपया तारीख चुनें' : 'Please choose an event date';
    }
    if (!availabilityCheck.available) {
      errs.availability = language === 'hi' 
        ? `यह कलाकार ${eventDate} (${timeSlot}) पर पहले से आरक्षित हैं। कृपया अन्य स्लॉट चुनें।`
        : `This artist is already ${availabilityCheck.label} on ${eventDate} (${timeSlot}). Double booking prevented.`;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast(
        language === 'hi' ? 'कृपया फॉर्म की त्रुटियां ठीक करें' : 'Please resolve form errors before proceeding',
        'error'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const targetSlotObj = TIME_SLOTS.find(s => s.id === timeSlot);
      const slotLabel = language === 'hi' ? targetSlotObj?.hindiLabel : targetSlotObj?.label;

      const newBooking = createBooking({
        artistId: artist.id,
        artistName: artist.name,
        artistPhone: artist.phone,
        artistLocality: artist.locality,
        customerName,
        customerPhone,
        eventDate,
        timeSlot,
        timeSlotLabel: slotLabel,
        serviceType,
        bridalHandOption,
        includeFeet,
        guestCount,
        guestHandSides,
        extraPortrait,
        extraStoryWork,
        travelDistanceKm,
        venueLocalityId,
        venueAddress,
        specialInstructions,
        pricing: {
          basePackage: calculation.basePackage,
          feetCharge: calculation.feetCharge,
          guestCharge: calculation.guestCharge,
          travelFee: calculation.travelFee,
          portraitCharge: calculation.portraitCharge,
          discount: calculation.discount,
          finalTotal: calculation.finalTotal,
          advancePaid: calculation.advanceToLock,
          balanceDue: calculation.balanceOnCompletion
        }
      });

      addToast(
        language === 'hi'
          ? `तारीख सफलतापूर्वक लॉक हो गई! बुकिंग आईडी: ${newBooking.id}`
          : `Date successfully locked! Booking ID: ${newBooking.id}`,
        'success'
      );

      navigate(`/confirmation/${newBooking.id}`);
    } catch (err) {
      addToast(err.message, 'error');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Breadcrumb & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 text-left">
        <div>
          <Link
            to={`/artist/${artist.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-800 hover:text-rose-950 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'कलाकार प्रोफाइल पर वापस जाएं' : 'Back to Artist Profile'}</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-stone-900 m-0">
            {language === 'hi' ? 'डेट-लॉक बुकिंग फॉर्म' : 'Date-Locked Mehndi Booking Form'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            {language === 'hi'
              ? 'सख्त तारीख-आरक्षण, पारदर्शी बिलिंग एवं स्टैंडबाय बैकअप गारंटी सहित'
              : 'Zero double-booking guarantee: Your slot is locked directly on the artist calendar.'}
          </p>
        </div>

        {/* Artist mini badge */}
        <div className="flex items-center gap-3 bg-stone-50 p-2.5 rounded-2xl border border-stone-200">
          <img
            src={artist.avatar}
            alt={artist.name}
            className="w-10 h-10 rounded-xl object-cover"
          />
          <div className="text-xs">
            <span className="font-bold text-stone-900 block truncate max-w-[160px]">{artist.name}</span>
            <span className="text-stone-500">{artist.locality}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Form on Left, Breakdown & Trust on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Container (7 cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6 text-left">
          {/* Availability Alert Banner */}
          {!availabilityCheck.available ? (
            <div className="p-4 bg-rose-50 border border-rose-300 rounded-2xl flex items-start gap-3 text-xs text-rose-900">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">
                  {language === 'hi' ? 'डबल बुकिंग निषेध: कलाकार इस स्लॉट पर व्यस्त हैं' : 'Double Booking Prevented: Artist is Booked'}
                </span>
                <p className="mt-0.5">
                  {language === 'hi'
                    ? `${artist.name} पहले से ${eventDate} (${timeSlot}) पर आरक्षित हैं। कृपया नीचे अन्य तारीख या समय स्लॉट चुनें।`
                    : `${artist.name} is already ${availabilityCheck.label} on ${eventDate} (${timeSlot}). Please choose an alternate date or slot.`}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-950 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {language === 'hi'
                  ? `तारीख उपलब्ध है! ${eventDate} (${timeSlot}) को आपके नाम पर लॉक किया जाएगा।`
                  : `Slot is fully available on ${eventDate} (${timeSlot}). Ready to date-lock.`}
              </span>
            </div>
          )}

          {/* Section 1: Event Schedule */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-rose-800" />
              <span>1. {language === 'hi' ? 'समारोह की तारीख व स्लॉट' : 'Event Date & Slot'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 block">
                  {language === 'hi' ? 'समारोह की तारीख' : 'Event Date'} *
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className={`w-full bg-stone-50 border rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800 ${
                    errors.eventDate ? 'border-red-500' : 'border-stone-300'
                  }`}
                />
                {errors.eventDate && <p className="text-[10px] text-red-600 font-medium">{errors.eventDate}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 block">
                  {language === 'hi' ? 'पसंदीदा समय स्लॉट' : 'Preferred Time Slot'} *
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
            </div>
          </div>

          {/* Section 2: Customer Contact */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <User className="w-4 h-4 text-rose-800" />
              <span>2. {language === 'hi' ? 'ग्राहक संपर्क विवरण' : 'Customer Contact Details'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 block">
                  {language === 'hi' ? 'दुल्हन / ग्राहक का नाम' : 'Client / Bride Name'} *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Priya Tiwari"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className={`w-full bg-stone-50 border rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800 ${
                    errors.customerName ? 'border-red-500' : 'border-stone-300'
                  }`}
                />
                {errors.customerName && <p className="text-[10px] text-red-600 font-medium">{errors.customerName}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 block">
                  {language === 'hi' ? 'मोबाइल नंबर (व्हाट्सएप/कॉल)' : 'Mobile Phone Number'} *
                </label>
                <input
                  type="text"
                  placeholder="e.g. +91 98391 22840"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className={`w-full bg-stone-50 border rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800 ${
                    errors.customerPhone ? 'border-red-500' : 'border-stone-300'
                  }`}
                />
                {errors.customerPhone && <p className="text-[10px] text-red-600 font-medium">{errors.customerPhone}</p>}
              </div>
            </div>

            {/* Gorakhpur Locality & Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 block">
                  {language === 'hi' ? 'गोरखपुर इलाका (वेन्यू)' : 'Gorakhpur Venue Locality'} *
                </label>
                <select
                  value={venueLocalityId}
                  onChange={(e) => setVenueLocalityId(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800"
                >
                  {GORAKHPUR_LOCALITIES.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700 block">
                  {language === 'hi' ? 'पूरा पता व लैंडमार्क' : 'Complete Venue Address & Landmark'} *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Flat 402, Shivalik Heights, Medical College Road"
                  value={venueAddress}
                  onChange={(e) => setVenueAddress(e.target.value)}
                  className={`w-full bg-stone-50 border rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800 ${
                    errors.venueAddress ? 'border-red-500' : 'border-stone-300'
                  }`}
                />
                {errors.venueAddress && <p className="text-[10px] text-red-600 font-medium">{errors.venueAddress}</p>}
              </div>
            </div>

            {/* Special Instructions */}
            <div className="space-y-1 pt-1">
              <label className="text-xs font-semibold text-stone-700 block">
                {language === 'hi' ? 'विशेष आवश्यकताएं या निर्देश (वैकल्पिक)' : 'Special Requirements or Notes (Optional)'}
              </label>
              <textarea
                rows={2}
                placeholder={language === 'hi' ? 'जैसे: सोफा व अच्छी लाइट तैयार रहेगी, वरमाला से पहले तैयार करना है...' : 'e.g., Lighting arrangement, specific ritual elements...'}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800 resize-none"
              />
            </div>
          </div>

          {/* Section 3: Service Scope Summary */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>3. {language === 'hi' ? 'मेहंदी सेवा का दायरा' : 'Selected Service Scope'}</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] text-stone-400 uppercase font-bold block">{language === 'hi' ? 'सेवा' : 'Service'}</span>
                <span className="font-bold text-stone-900 capitalize">{serviceType}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] text-stone-400 uppercase font-bold block">{language === 'hi' ? 'हाथ कवरेज' : 'Hands'}</span>
                <span className="font-bold text-stone-900 capitalize">{bridalHandOption}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] text-stone-400 uppercase font-bold block">{language === 'hi' ? 'पैरों की मेहंदी' : 'Feet'}</span>
                <span className="font-bold text-stone-900">{includeFeet ? 'Yes' : 'No'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] text-stone-400 uppercase font-bold block">{language === 'hi' ? 'मेहमान संख्या' : 'Guests'}</span>
                <span className="font-bold text-stone-900">{guestCount} ({guestHandSides} side)</span>
              </div>
            </div>
          </div>

          {/* Demo Advance Payment Action Banner */}
          <div className="p-5 bg-gradient-to-br from-rose-950 to-stone-950 text-white rounded-2xl shadow-md space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-400 text-stone-950 rounded-xl shrink-0 mt-0.5">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {language === 'hi' ? '20% टोकन भुगतान से पक्की डेट-लॉकिंग' : '20% Token Date-Lock Reservation'}
                </h4>
                <p className="text-xs text-stone-300 mt-0.5 leading-relaxed">
                  {language === 'hi'
                    ? `तय कुल बिल ${formatINR(calculation.finalTotal)} है। तारीख को कलाकार के कैलेंडर पर लॉक करने हेतु केवल 20% टोकन (${formatINR(calculation.advanceToLock)}) देय है। शेष 80% सेवा पूरी होने के बाद नकद/यूपीआई से दें। (डेमो मोड: कोई वास्तविक शुल्क नहीं कटेगा)`
                    : `Total bill is ${formatINR(calculation.finalTotal)}. Lock slot with 20% token (${formatINR(calculation.advanceToLock)}). Balance 80% post-service. (Demo mode: simulated payment).`}
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !availabilityCheck.available}
              className={`w-full py-3.5 px-6 font-extrabold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                !availabilityCheck.available
                  ? 'bg-stone-700 text-stone-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 shadow-amber-500/20'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>
                {language === 'hi'
                  ? `तारीख लॉक करें एवं टोकन जमा करें (${formatINR(calculation.advanceToLock)}) - डेमो`
                  : `Confirm Date-Lock (${formatINR(calculation.advanceToLock)} Advance Token) - Demo`}
              </span>
            </button>
          </div>
        </form>

        {/* Right Sticky Breakdown (5 cols) */}
        <div className="lg:col-span-5 sticky top-20 text-left space-y-4">
          <PriceBreakdown
            calculation={calculation}
          />

          {/* Standby Guarantee Note */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-950 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-emerald-900">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>{language === 'hi' ? 'रंग रिवाज़ बैकअप गारंटी सक्रिय' : 'Rang Riwaaz Backup Guarantee Active'}</span>
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              {language === 'hi'
                ? 'बुकिंग लॉक होते ही एक स्थानीय स्टैंडबाय कलाकार स्वतः बैकअप में रहता है। यदि कलाकार ऐन मौके पर नहीं पहुंचता, तो स्टैंडबाय कलाकार बिना किसी अतिरिक्त शुल्क के उपलब्ध होगा।'
                : 'A verified standby artist in Gorakhpur is pre-matched to this booking. If original artist cancels, standby steps in at guaranteed zero extra fee.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
