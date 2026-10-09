import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, ShieldCheck, Calendar, Clock, MapPin, Phone, 
  MessageCircle, ArrowRight, Share2, Lock, AlertTriangle, AlertCircle, FileText 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { useToast } from '../context/ToastContext';
import { formatINR } from '../utils/calculator';
import CallModal from '../components/common/CallModal';
import WhatsAppModal from '../components/common/WhatsAppModal';

export default function BookingConfirmationPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { bookings, triggerArtistCancellation } = useBooking();
  const { addToast } = useToast();

  const [callModalOpen, setCallModalOpen] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);

  const booking = bookings.find(b => b.id === bookingId) || bookings[0];

  useEffect(() => {
    // Festive celebration confetti on mount
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Ignore if canvas unavailable
    }
  }, []);

  if (!booking) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-stone-900">Booking Not Found</h2>
        <Link to="/" className="text-rose-800 font-bold">Return Home</Link>
      </div>
    );
  }

  const handleSimulateCancel = () => {
    triggerArtistCancellation(booking.id);
    addToast(
      language === 'hi'
        ? 'सिम्युलेशन: मूल कलाकार ने आपातकाल में मना कर दिया। बैकअप कलाकार मैचिंग चालू!'
        : 'Simulation: Original artist emergency triggered. Initiating standby backup matching!',
      'error'
    );
    navigate(`/backup/${booking.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 text-left">
      {/* Success Card */}
      <div className="bg-white rounded-3xl border-2 border-emerald-500/40 p-6 sm:p-10 shadow-xl space-y-6 relative overflow-hidden">
        {/* Top Celebration Ribbon */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 shadow-inner">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span>{language === 'hi' ? '100% पक्की तारीख लॉक' : 'Date-Locked & Confirmed'}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 mt-1 m-0">
                {language === 'hi' ? 'बुकिंग सफलतापूर्वक लॉक हो गई!' : 'Booking Successfully Date-Locked!'}
              </h1>
              <p className="text-xs text-stone-500 mt-0.5">
                {language === 'hi' ? 'बुकिंग आईडी:' : 'Booking Reference ID:'}{' '}
                <span className="font-mono font-bold text-stone-900 text-sm">{booking.id}</span>
              </p>
            </div>
          </div>

          <div className="text-right sm:self-center">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">
              {language === 'hi' ? 'अंतिम तय कुल मूल्य' : 'Guaranteed Final Price'}
            </span>
            <span className="text-2xl font-extrabold text-rose-950">
              {formatINR(booking.pricing?.finalTotal)}
            </span>
            <span className="block text-[11px] text-emerald-700 font-semibold">
              {language === 'hi' ? `टोकन अग्रिम जमा: ${formatINR(booking.pricing?.advancePaid)}` : `Advance Paid: ${formatINR(booking.pricing?.advancePaid)}`}
            </span>
          </div>
        </div>

        {/* Booking Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-stone-50/70 p-5 rounded-2xl border border-stone-200 text-xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="text-stone-500">{language === 'hi' ? 'समारोह की तारीख:' : 'Event Date:'}</span>
              <span className="font-bold text-stone-900">{booking.eventDate}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-700 shrink-0" />
              <span className="text-stone-500">{language === 'hi' ? 'समय स्लॉट:' : 'Time Slot:'}</span>
              <span className="font-bold text-stone-900">{booking.timeSlotLabel || booking.timeSlot}</span>
            </div>

            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
              <div>
                <span className="text-stone-500">{language === 'hi' ? 'वेन्यू पता:' : 'Venue Address:'}</span>
                <span className="font-semibold text-stone-900 block">{booking.venueAddress}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 border-t md:border-t-0 md:border-l border-stone-200 pt-3 md:pt-0 md:pl-4">
            <div>
              <span className="text-stone-500">{language === 'hi' ? 'सत्यापित कलाकार:' : 'Booked Artist:'}</span>
              <span className="font-extrabold text-stone-900 block text-sm">{booking.artistName}</span>
              <span className="text-stone-500 text-[11px]">{booking.artistLocality}</span>
            </div>

            <div className="pt-1">
              <span className="text-stone-500">{language === 'hi' ? 'सेवा का दायरा:' : 'Scope:'}</span>
              <span className="font-semibold text-stone-900 block capitalize">
                {booking.serviceType} ({booking.bridalHandOption} hands, {booking.guestCount} guests)
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <Link
            to={`/tracker?id=${booking.id}`}
            className="py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-colors text-center"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{language === 'hi' ? 'लाइव 9-चरणीय ट्रैकर देखें' : 'Track Booking Timeline'}</span>
          </Link>

          <button
            onClick={() => setWhatsappModalOpen(true)}
            className="py-3 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{language === 'hi' ? 'व्हाट्सएप सारांश भेजें' : 'WhatsApp Summary'}</span>
          </button>

          <button
            onClick={() => setCallModalOpen(true)}
            className="py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl text-xs flex items-center justify-center gap-2 border border-stone-300 transition-colors cursor-pointer"
          >
            <Phone className="w-4 h-4 text-emerald-600" />
            <span>{language === 'hi' ? 'कलाकार को कॉल करें' : 'Call Artist'}</span>
          </button>
        </div>

        {/* Prototype Testing Sandbox Banner */}
        <div className="p-4 bg-amber-50/80 border border-amber-300 rounded-2xl space-y-2 text-xs text-amber-950">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{language === 'hi' ? 'प्रोटोटाइप परीक्षण: बैकअप कलाकार सुविधा टेस्ट करें' : 'Prototype Test: Simulate Last-Minute Cancellation'}</span>
          </div>
          <p className="text-[11px] text-amber-900 leading-relaxed">
            {language === 'hi'
              ? 'कोर फीचर #6 (बैकअप आर्टिस्ट गारंटी) का परीक्षण करने हेतु, नीचे दिए गए बटन पर क्लिक करें। यह प्रदर्शित करेगा कि यदि कोई कलाकार ऐन वक्त पर मना कर देता है, तो सिस्टम स्वतः स्टैंडबाय कलाकार कैसे प्रदान करता है।'
              : 'To evaluate Core Feature #6 (Standby Backup Guarantee), click below to simulate what happens if this confirmed artist cancels. You will see instant standby matching with price protection.'}
          </p>

          <div className="pt-1">
            <button
              onClick={handleSimulateCancel}
              className="py-2.5 px-4 bg-rose-800 hover:bg-rose-900 text-white font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
            >
              <AlertCircle className="w-4 h-4" />
              <span>{language === 'hi' ? 'कलाकार रद्दीकरण टेस्ट करें (बैकअप स्क्रीन देखें)' : 'Simulate Artist Cancellation (Test Backup Flow)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Call Modal */}
      <CallModal
        isOpen={callModalOpen}
        onClose={() => setCallModalOpen(false)}
        artist={{ name: booking.artistName, phone: booking.artistPhone, locality: booking.artistLocality }}
      />

      {/* WhatsApp Modal */}
      <WhatsAppModal
        isOpen={whatsappModalOpen}
        onClose={() => setWhatsappModalOpen(false)}
        booking={booking}
      />
    </div>
  );
}
