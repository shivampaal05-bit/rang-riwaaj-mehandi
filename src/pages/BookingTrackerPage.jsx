import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Clock, MapPin, Phone, MessageCircle, AlertTriangle, 
  CreditCard, Star, CheckCircle2, ArrowRight, RefreshCw, Send, ChevronRight 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { useToast } from '../context/ToastContext';
import BookingTimeline from '../components/booking/BookingTimeline';
import Modal from '../components/common/Modal';
import CallModal from '../components/common/CallModal';
import WhatsAppModal from '../components/common/WhatsAppModal';
import { formatINR } from '../utils/calculator';

export default function BookingTrackerPage() {
  const { language } = useLanguage();
  const { bookings, updateBookingStatus, triggerArtistCancellation, submitReview } = useBooking();
  const { addToast } = useToast();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Selected Booking
  const targetBookingId = searchParams.get('id') || bookings[0]?.id;
  const currentBooking = bookings.find(b => b.id === targetBookingId) || bookings[0];

  const [callModalOpen, setCallModalOpen] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  // Review Form State
  const [overallRating, setOverallRating] = useState(5);
  const [designQuality, setDesignQuality] = useState(5);
  const [onTimeArrival, setOnTimeArrival] = useState(5);
  const [behaviour, setBehaviour] = useState(5);
  const [priceTransparency, setPriceTransparency] = useState(5);
  const [cleanliness, setCleanliness] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  if (!currentBooking) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-stone-900">No active bookings found</h2>
        <Link to="/search" className="text-rose-800 font-bold">Book a Mehndi Artist</Link>
      </div>
    );
  }

  const handleAdvanceState = (newStatus) => {
    updateBookingStatus(currentBooking.id, newStatus);
    addToast(
      language === 'hi' ? `स्टेटस अपडेट हुआ: ${newStatus}` : `Status transitioned to: ${newStatus}`,
      'success'
    );
  };

  const handleSimulateCancel = () => {
    triggerArtistCancellation(currentBooking.id);
    addToast(
      language === 'hi' ? 'आपातकालीन रद्दीकरण दर्ज! बैकअप आर्टिस्ट स्क्रीन पर ले जाया जा रहा है...' : 'Artist emergency cancellation logged! Navigating to backup matching...',
      'error'
    );
    navigate(`/backup/${currentBooking.id}`);
  };

  const handlePayRemaining = () => {
    updateBookingStatus(currentBooking.id, 'remaining_payment');
    setPaymentModalOpen(false);
    addToast(
      language === 'hi' ? 'बकाया भुगतान सफल (डेमो)! अब आप समीक्षा दर्ज कर सकते हैं।' : 'Balance payment simulated successfully! You can now submit your verified review.',
      'success'
    );
  };

  const handleSubmitReviewForm = (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      addToast(language === 'hi' ? 'कृपया अपनी टिप्पणी लिखें' : 'Please provide written feedback', 'error');
      return;
    }

    try {
      submitReview(currentBooking.id, {
        rating: overallRating,
        designQuality,
        onTimeArrival,
        behaviour,
        priceTransparency,
        cleanliness,
        comment: reviewComment
      });

      setReviewModalOpen(false);
      addToast(
        language === 'hi' ? 'आपकी सत्यापित समीक्षा सफलतापूर्वक दर्ज कर ली गई!' : 'Your verified review has been submitted!',
        'success'
      );
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const isCompleted = currentBooking.status === 'service_completed' || currentBooking.status === 'remaining_payment' || currentBooking.status === 'review_submitted';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-600 block">
            {language === 'hi' ? 'लाइव स्टेटस ट्रैकर' : 'Live Booking Timeline'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-stone-900 m-0">
            {language === 'hi' ? 'बुकिंग प्रगति व समय सारणी' : 'Booking Progress & Milestone Tracker'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            {language === 'hi' ? 'बुकिंग आईडी:' : 'Tracking Reference:'}{' '}
            <span className="font-mono font-bold text-stone-900">{currentBooking.id}</span>
          </p>
        </div>

        {/* Switch booking dropdown if multiple bookings exist */}
        {bookings.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 font-semibold">{language === 'hi' ? 'अन्य बुकिंग:' : 'Switch:'}</span>
            <select
              value={currentBooking.id}
              onChange={(e) => navigate(`/tracker?id=${e.target.value}`)}
              className="bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-stone-800"
            >
              {bookings.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.id} — {b.artistName?.slice(0, 16)}... ({b.eventDate})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Artist Emergency Cancelled Warning (if applicable) */}
      {currentBooking.cancelledByArtist && (
        <div className="p-5 bg-rose-50 border-2 border-rose-400 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-rose-950 text-sm">
                {language === 'hi' ? 'मूल कलाकार ने आपातकाल में मना कर दिया' : 'Original Artist Cancelled Due to Emergency'}
              </h3>
              <p className="text-xs text-rose-800 mt-0.5">
                {language === 'hi'
                  ? 'चिंता न करें! आपकी तारीख पर तुरंत स्टैंडबाय बैकअप कलाकार तैयार है।'
                  : 'Zero anxiety: Rang Riwaaz Mehandi Standby Artist matching is active for your date.'}
              </p>
            </div>
          </div>
          <Link
            to={`/backup/${currentBooking.id}`}
            className="py-2.5 px-4 bg-rose-900 hover:bg-rose-950 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shrink-0 transition-colors shadow-md"
          >
            <span>{language === 'hi' ? 'बैकअप विकल्प देखें' : 'View Standby Matches'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* 9-Stage Visual Timeline Stepper (Interactive) */}
      <BookingTimeline
        currentStatus={currentBooking.status}
        onAdvanceStatus={handleAdvanceState}
        isInteractive
      />

      {/* Booking Core Summary Card */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
          <div>
            <h3 className="text-base font-bold text-stone-900">{currentBooking.artistName}</h3>
            <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>{currentBooking.artistLocality}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setCallModalOpen(true)}
              className="py-2 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'hi' ? 'कॉल करें' : 'Call'}</span>
            </button>

            <button
              onClick={() => setWhatsappModalOpen(true)}
              className="py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'व्हाट्सएप सारांश' : 'WhatsApp'}</span>
            </button>
          </div>
        </div>

        {/* Status Callout Banner */}
        <div className="p-4 rounded-xl bg-[#fcfaf7] border border-amber-200/80 space-y-2 text-xs">
          <div className="flex items-center justify-between font-bold text-stone-900">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-700" />
              <span>{language === 'hi' ? 'वर्तमान स्थिति:' : 'Current Status:'}</span>
            </span>
            <span className="capitalize font-mono text-rose-900 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              {currentBooking.status.replace(/_/g, ' ')}
            </span>
          </div>

          {currentBooking.status === 'artist_on_way' && (
            <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <span>
                {language === 'hi'
                  ? 'कलाकार किट लेकर आपके वेन्यू के लिए निकल चुके हैं। अनुमानित आगमन: 20-30 मिनट।'
                  : 'Artist is en-route with sanitized kit. Estimated arrival: 20-30 mins.'}
              </span>
            </div>
          )}

          {currentBooking.status === 'service_completed' && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>
                  {language === 'hi' ? 'मेहंदी सेवा संपन्न हो चुकी है!' : 'Mehndi service has been successfully completed!'}
                </span>
              </div>
              <button
                onClick={() => setPaymentModalOpen(true)}
                className="py-1.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
              >
                {language === 'hi' ? 'बकाया भुगतान करें (डेमो)' : 'Clear Balance (Demo)'}
              </button>
            </div>
          )}
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">{language === 'hi' ? 'तय कुल बिल' : 'Total Bill'}</span>
            <span className="text-base font-extrabold text-stone-900">{formatINR(currentBooking.pricing?.finalTotal)}</span>
          </div>
          <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100">
            <span className="text-[10px] uppercase font-bold text-emerald-700 block">{language === 'hi' ? 'अग्रिम जमा' : 'Advance Paid'}</span>
            <span className="text-base font-extrabold text-emerald-900">{formatINR(currentBooking.pricing?.advancePaid)}</span>
          </div>
          <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-100 col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase font-bold text-amber-700 block">{language === 'hi' ? 'बकाया राशि' : 'Balance Due'}</span>
            <span className="text-base font-extrabold text-amber-950">{formatINR(currentBooking.pricing?.balanceDue)}</span>
          </div>
        </div>

        {/* Completed Service Review Trigger */}
        {isCompleted && (
          <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>{language === 'hi' ? 'सत्यापित दुल्हन / ग्राहक समीक्षा' : 'Verified Client Review'}</span>
              </h4>
              <p className="text-[11px] text-stone-500 mt-0.5">
                {currentBooking.review
                  ? (language === 'hi' ? 'आपकी समीक्षा दर्ज की जा चुकी है। धन्यवाद!' : 'Your review has been submitted to the artist profile.')
                  : (language === 'hi' ? 'सेवा पूर्ण हो चुकी है। कृपया 5 श्रेणियों में निष्पक्ष रेटिंग दें।' : 'Service is done. Rate design, punctuality & cleanliness.')}
              </p>
            </div>

            {!currentBooking.review ? (
              <button
                onClick={() => setReviewModalOpen(true)}
                className="w-full sm:w-auto py-2.5 px-4 bg-rose-800 hover:bg-rose-900 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-sm"
              >
                {language === 'hi' ? 'समीक्षा व रेटिंग दर्ज करें' : 'Write Verified Review'}
              </button>
            ) : (
              <div className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{language === 'hi' ? 'समीक्षा जमा' : 'Review Submitted'} ({currentBooking.review.rating}/5)</span>
              </div>
            )}
          </div>
        )}

        {/* Prototype Simulation Control */}
        {!currentBooking.cancelledByArtist && (
          <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="text-stone-500">
              {language === 'hi' ? 'बैकअप गारंटी टेस्ट करने के लिए:' : 'To test backup guarantee:'}
            </span>
            <button
              onClick={handleSimulateCancel}
              className="text-rose-800 hover:text-rose-950 font-bold underline cursor-pointer"
            >
              {language === 'hi' ? 'कलाकार आपातकालीन रद्दीकरण टेस्ट करें' : 'Simulate Artist Cancellation'}
            </button>
          </div>
        )}
      </div>

      {/* Review Modal */}
      <Modal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        title={language === 'hi' ? 'सत्यापित सेवा समीक्षा दर्ज करें' : 'Submit Verified Review'}
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleSubmitReviewForm} className="space-y-4 text-left">
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              {language === 'hi'
                ? `बुकिंग ID: ${currentBooking.id} (केवल सत्यापित शादियों के रिव्यू ही प्रोफाइल पर दिखते हैं)`
                : `Verified Booking ID: ${currentBooking.id}. Anti-spam verified feedback.`}
            </span>
          </div>

          {/* 5-Aspect Star Sliders */}
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-bold text-stone-800 mb-1">
                <span>{language === 'hi' ? 'डिजाइन गुणवत्ता व फिनिशिंग:' : 'Design Quality & Finesse:'}</span>
                <span className="text-rose-900">{designQuality} / 5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={designQuality}
                onChange={(e) => setDesignQuality(parseInt(e.target.value))}
                className="w-full accent-rose-800 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold text-stone-800 mb-1">
                <span>{language === 'hi' ? 'समय पर आगमन (पंक्चुअलिटी):' : 'On-Time Arrival:'}</span>
                <span className="text-rose-900">{onTimeArrival} / 5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={onTimeArrival}
                onChange={(e) => setOnTimeArrival(parseInt(e.target.value))}
                className="w-full accent-rose-800 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold text-stone-800 mb-1">
                <span>{language === 'hi' ? 'कलाकार का व्यवहार व सहयोग:' : 'Artist Behaviour:'}</span>
                <span className="text-rose-900">{behaviour} / 5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={behaviour}
                onChange={(e) => setBehaviour(parseInt(e.target.value))}
                className="w-full accent-rose-800 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold text-stone-800 mb-1">
                <span>{language === 'hi' ? 'मूल्य पारदर्शिता (कोई अतिरिक्त मांग नहीं):' : 'Price Transparency:'}</span>
                <span className="text-rose-900">{priceTransparency} / 5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={priceTransparency}
                onChange={(e) => setPriceTransparency(parseInt(e.target.value))}
                className="w-full accent-rose-800 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold text-stone-800 mb-1">
                <span>{language === 'hi' ? 'सफाई व प्राकृतिक कोन गुणवत्ता:' : 'Cleanliness & Natural Cones:'}</span>
                <span className="text-rose-900">{cleanliness} / 5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={cleanliness}
                onChange={(e) => setCleanliness(parseInt(e.target.value))}
                className="w-full accent-rose-800 cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-1 pt-1">
            <label className="text-xs font-bold text-stone-700 block">
              {language === 'hi' ? 'विस्तृत अनुभव व टिप्पणी:' : 'Detailed Feedback & Review:'} *
            </label>
            <textarea
              rows={3}
              placeholder={language === 'hi' ? 'कलाकार का काम, रंग का गहरापन और समय का अनुभव लिखें...' : 'Share your wedding experience, cone stain darkness, punctuality...'}
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-rose-800 resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-rose-800 to-amber-700 hover:from-rose-900 hover:to-amber-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{language === 'hi' ? 'समीक्षा प्रकाशित करें' : 'Publish Verified Review'}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Payment Modal */}
      <Modal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        title={language === 'hi' ? 'बकाया भुगतान (डेमो मोड)' : 'Remaining Payment (Demo Simulation)'}
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <CreditCard className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h4 className="font-bold text-stone-900 text-base">
              {language === 'hi' ? 'शेष 80% बकाया राशि' : 'Remaining 80% Balance'}
            </h4>
            <div className="text-3xl font-extrabold text-stone-900 mt-1">
              {formatINR(currentBooking.pricing?.balanceDue)}
            </div>
            <p className="text-xs text-stone-500 mt-1">
              {language === 'hi' ? 'सेवा पूर्ण संतुष्टि के उपरांत देय' : 'Payable post-service satisfaction'}
            </p>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 text-left">
            <span className="font-bold text-stone-800 block mb-0.5">
              {language === 'hi' ? 'डेमो सूचना:' : 'Demo Note:'}
            </span>
            {language === 'hi'
              ? 'यह एक प्रोटोटाइप है। "भुगतान पूर्ण करें" दबाने पर बैलेंस चुकता मान लिया जाएगा और टाइमलाइन अगले चरण पर बढ़ जाएगी।'
              : 'This is a prototype demonstration. Clicking confirm will simulate successful balance settlement.'}
          </div>

          <button
            onClick={handlePayRemaining}
            className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm transition-colors cursor-pointer shadow-md"
          >
            {language === 'hi' ? 'भुगतान पूर्ण करें (डेमो)' : 'Confirm Payment (Simulated)'}
          </button>
        </div>
      </Modal>

      {/* Call & WhatsApp modals */}
      <CallModal
        isOpen={callModalOpen}
        onClose={() => setCallModalOpen(false)}
        artist={{ name: currentBooking.artistName, phone: currentBooking.artistPhone, locality: currentBooking.artistLocality }}
      />
      <WhatsAppModal
        isOpen={whatsappModalOpen}
        onClose={() => setWhatsappModalOpen(false)}
        booking={currentBooking}
      />
    </div>
  );
}
