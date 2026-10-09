import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, AlertTriangle, CheckCircle2, ArrowRight, RotateCcw, 
  DollarSign, Calendar, MapPin, Zap, BadgePercent, HeartHandshake, PhoneCall 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { useToast } from '../context/ToastContext';
import BackupArtistCard from '../components/artist/BackupArtistCard';
import Modal from '../components/common/Modal';
import { formatINR } from '../utils/calculator';

export default function BackupArtistPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { bookings, artists, handleBackupChoice } = useBooking();
  const { addToast } = useToast();

  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [newDate, setNewDate] = useState('2026-10-08');
  const [showAlternateList, setShowAlternateList] = useState(false);

  // Find booking
  const targetBookingId = bookingId || bookings[0]?.id;
  const booking = bookings.find(b => b.id === targetBookingId) || bookings[0];

  // Standby Candidates Algorithm:
  // Match artists who are NOT the cancelled artist, have active availability on that date/slot,
  // and sort by locality proximity and reliability score
  const standbyMatches = useMemo(() => {
    if (!booking) return [];

    return artists
      .filter(a => a.id !== booking.artistId)
      .map(artist => {
        let score = 90;
        if (artist.localityId === booking.venueLocalityId) score += 8;
        if (artist.rating >= 4.9) score += 5;
        if (artist.verification?.isVerified) score += 4;
        return {
          ...artist,
          matchScore: Math.min(99, score)
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [artists, booking]);

  const recommendedBackup = standbyMatches[0];
  const alternateBackups = standbyMatches.slice(1, 3);

  if (!booking) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-stone-900">No Booking Found</h2>
        <Link to="/search" className="text-rose-800 font-bold">Find Artists</Link>
      </div>
    );
  }

  const onAcceptBackup = (chosenArtistId) => {
    handleBackupChoice(booking.id, 'accept_backup', chosenArtistId);
    addToast(
      language === 'hi'
        ? 'बैकअप कलाकार सफलतापूर्वक पक्का हो गया! आपकी तारीख सुरक्षित है।'
        : 'Standby backup artist confirmed! Your event date remains locked.',
      'success'
    );
    navigate(`/tracker?id=${booking.id}`);
  };

  const onRescheduleConfirm = () => {
    handleBackupChoice(booking.id, 'reschedule');
    setRescheduleModalOpen(false);
    addToast(
      language === 'hi'
        ? `पुनर्निर्धारण अनुरोध दर्ज हुआ (${newDate})। टीम आपसे संपर्क करेगी।`
        : `Reschedule request logged for ${newDate}. Concierge will coordinate with you.`,
      'info'
    );
    navigate(`/tracker?id=${booking.id}`);
  };

  const onRequestRefund = () => {
    handleBackupChoice(booking.id, 'refund');
    addToast(
      language === 'hi'
        ? `100% रिफंड (${formatINR(booking.pricing?.advancePaid || 2000)}) स्वीकृत! साथ में ₹500 का असुविधा कूपन मिला।`
        : `100% advance refunded (${formatINR(booking.pricing?.advancePaid || 2000)}) + ₹500 apology credit added!`,
      'success'
    );
    navigate(`/tracker?id=${booking.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">
      {/* Emergency Header Banner */}
      <div className="bg-gradient-to-r from-[#1c0e05] via-[#743310] to-[#0d2214] text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-3 border border-[#c59b4e]/30">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#88451b]/30 text-[#f5b68a] text-xs font-bold border border-[#88451b]/50">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <span>{language === 'hi' ? 'इमरजेंसी बैकअप प्रोटेक्शन एक्टिव' : 'Standby Emergency Protection Active'}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white m-0">
          {language === 'hi' ? 'बैकअप कलाकार गारंटी एवं मैचिंग' : 'Backup Artist Guarantee & Match Engine'}
        </h1>

        <p className="text-xs sm:text-sm text-rose-100 leading-relaxed">
          {language === 'hi'
            ? `बुकिंग ID ${booking.id}: मूल कलाकार (${booking.artistName}) ने आपातकाल में मना कर दिया है। घबराएं नहीं! आपकी तय तारीख (${booking.eventDate}) के लिए गोरखपुर का सत्यापित स्टैंडबाय कलाकार तैयार है।`
            : `Booking ID ${booking.id}: Original artist (${booking.artistName}) encountered an emergency. Rang Riwaaz Mehandi's standby matching is ready for your date (${booking.eventDate}).`}
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-amber-200">
          <span className="flex items-center gap-1 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            100% Date-Lock Guaranteed
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 font-bold">
            <BadgePercent className="w-3.5 h-3.5 text-amber-300" />
            Zero Price Increase Policy
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 font-bold">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            Local Gorakhpur Standby
          </span>
        </div>
      </div>

      {/* Recommended Top Standby Artist */}
      {recommendedBackup && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-600" />
              <span>{language === 'hi' ? 'सर्वश्रेष्ठ अनुशंसित स्टैंडबाय कलाकार' : 'Top Matched Standby Artist'}</span>
            </h3>
            <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 font-bold px-2.5 py-0.5 rounded-full">
              {language === 'hi' ? 'तत्काल उपलब्ध' : 'Instant Standby Ready'}
            </span>
          </div>

          <BackupArtistCard
            artist={recommendedBackup}
            originalArtist={{ name: booking.artistName }}
            onAccept={onAcceptBackup}
            isRecommended
            matchScore={recommendedBackup.matchScore}
          />
        </div>
      )}

      {/* The 4 Core Options for the Customer */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700">
          {language === 'hi' ? 'ग्राहक के लिए 4 पारदर्शी विकल्प:' : 'Your 4 Guaranteed Customer Choices:'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Option 1: Accept Standby */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2 flex flex-col justify-between">
            <div>
              <span className="font-bold text-emerald-950 block text-sm">
                1. {language === 'hi' ? 'अनुशंसित बैकअप स्वीकारें' : 'Accept Top Backup'}
              </span>
              <p className="text-emerald-800 text-[11px] mt-1 leading-relaxed">
                {language === 'hi'
                  ? 'तत्काल एक क्लिक में ऊपर दिए गए कलाकार को अपनी तारीख पर लॉक करें। शून्य अतिरिक्त शुल्क।'
                  : 'Instant 1-click swap. Your date & rate remain 100% locked.'}
              </p>
            </div>
            {recommendedBackup && (
              <button
                onClick={() => onAcceptBackup(recommendedBackup.id)}
                className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                {language === 'hi' ? 'स्वीकार करें' : 'Accept Standby'}
              </button>
            )}
          </div>

          {/* Option 2: Request Alternate Artist */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2 flex flex-col justify-between">
            <div>
              <span className="font-bold text-amber-950 block text-sm">
                2. {language === 'hi' ? 'अन्य स्टैंडबाय कलाकार देखें' : 'View Alternate Artists'}
              </span>
              <p className="text-amber-800 text-[11px] mt-1 leading-relaxed">
                {language === 'hi'
                  ? 'गोरखपुर के अन्य उपलब्ध बैकअप कलाकारों की सूची देखें और अपनी पसंद का कलाकार चुनें।'
                  : 'Browse other standby artists available on this date in Gorakhpur.'}
              </p>
            </div>
            <button
              onClick={() => setShowAlternateList(prev => !prev)}
              className="w-full py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              {showAlternateList
                ? (language === 'hi' ? 'सूची छिपाएं' : 'Hide Alternates')
                : (language === 'hi' ? 'अन्य विकल्प खोलें' : 'Show Alternates')}
            </button>
          </div>

          {/* Option 3: Reschedule Event */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2 flex flex-col justify-between">
            <div>
              <span className="font-bold text-blue-950 block text-sm">
                3. {language === 'hi' ? 'तारीख पुनर्निर्धारित करें' : 'Reschedule Date'}
              </span>
              <p className="text-blue-800 text-[11px] mt-1 leading-relaxed">
                {language === 'hi'
                  ? 'यदि आपका समारोह आगे खिसक गया है, तो बिना किसी पेनल्टी के नई तारीख चुनें।'
                  : 'Reschedule to an alternate date without any change penalty.'}
              </p>
            </div>
            <button
              onClick={() => setRescheduleModalOpen(true)}
              className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              {language === 'hi' ? 'नई तारीख चुनें' : 'Reschedule'}
            </button>
          </div>

          {/* Option 4: Instant Refund */}
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2 flex flex-col justify-between">
            <div>
              <span className="font-bold text-rose-950 block text-sm">
                4. {language === 'hi' ? '100% धनवापसी + ₹500 कूपन' : 'Instant 100% Refund'}
              </span>
              <p className="text-rose-800 text-[11px] mt-1 leading-relaxed">
                {language === 'hi'
                  ? 'यदि आप बैकअप नहीं लेना चाहते, तो पूरा अग्रिम तुरंत वापस पाएं + ₹500 का असुविधा कूपन।'
                  : 'Full advance refund instantly + ₹500 apology courtesy coupon.'}
              </p>
            </div>
            <button
              onClick={onRequestRefund}
              className="w-full py-2 bg-rose-800 hover:bg-rose-900 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              {language === 'hi' ? 'रिफंड का अनुरोध करें' : 'Request Full Refund'}
            </button>
          </div>
        </div>
      </div>

      {/* Alternate Artists Accordion List */}
      {showAlternateList && (
        <div className="space-y-4 pt-2">
          <h3 className="text-base font-bold text-stone-900">
            {language === 'hi' ? 'गोरखपुर के अन्य स्टैंडबाय विकल्प' : 'Other Gorakhpur Standby Artists'}
          </h3>
          <div className="space-y-4">
            {alternateBackups.map((alt) => (
              <BackupArtistCard
                key={alt.id}
                artist={alt}
                originalArtist={{ name: booking.artistName }}
                onAccept={onAcceptBackup}
                isRecommended={false}
                matchScore={alt.matchScore}
              />
            ))}
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      <Modal
        isOpen={rescheduleModalOpen}
        onClose={() => setRescheduleModalOpen(false)}
        title={language === 'hi' ? 'तारीख पुनर्निर्धारण' : 'Reschedule Event Date'}
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-left">
          <p className="text-xs text-stone-600">
            {language === 'hi'
              ? 'कृपया अपनी नई पसंदीदा तारीख चुनें। आपका जमा टोकन नई तारीख पर ट्रांसफर कर दिया जाएगा।'
              : 'Select your preferred alternate date. Advance token carries forward with zero deduction.'}
          </p>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 block">
              {language === 'hi' ? 'नई तारीख:' : 'New Event Date:'}
            </label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900"
            />
          </div>

          <div className="pt-2">
            <button
              onClick={onRescheduleConfirm}
              className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              {language === 'hi' ? 'पुनर्निर्धारण की पुष्टि करें' : 'Confirm New Reschedule Date'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
