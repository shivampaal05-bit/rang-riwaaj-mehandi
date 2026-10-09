import React, { useState } from 'react';
import Modal from './Modal';
import { MessageCircle, Copy, Check, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { formatINR } from '../../utils/calculator';

export default function WhatsAppModal({ isOpen, onClose, booking, artist, calculation }) {
  const { language } = useLanguage();
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const targetArtist = artist || {
    name: booking?.artistName || 'Pooja Verma Bridal Henna Studio',
    phone: booking?.artistPhone || '+919838011422'
  };

  const bookingId = booking?.id || ('GKP-MHN-' + Math.floor(1000 + Math.random() * 9000));
  const eventDate = booking?.eventDate || '2026-10-05';
  const timeSlot = booking?.timeSlotLabel || 'Evening (5:00 PM - 9:00 PM)';
  const locality = booking?.venueAddress || 'Medical College Road, Gorakhpur';
  const totalAmount = booking?.pricing?.finalTotal || calculation?.finalTotal || 7500;
  const guestCount = booking?.guestCount || calculation?.guestCount || 0;

  // Bilingual WhatsApp Message
  const whatsappMessage = language === 'hi' 
    ? `नमस्ते ${targetArtist.name} जी! 🙏
मैं रंग रिवाज़ मेहंदी (Rang Riwaaz Mehandi Gorakhpur) से बुकिंग सारांश भेज रही हूँ:

📋 बुकिंग आईडी: ${bookingId}
📅 समारोह की तारीख: ${eventDate}
⏰ समय स्लॉट: ${timeSlot}
📍 वेन्यू/इलाका: ${locality}
👥 मेहमान संख्या: ${guestCount}
💰 अंतिम तय कुल मूल्य: ${formatINR(totalAmount)} (पारदर्शी, कोई छुपा शुल्क नहीं)
🛡️ 100% डेट-लॉक्ड एवं रंग रिवाज़ बैकअप गारंटी सहित

कृपया तारीख की पुष्टि करें। धन्यवाद!`
    : `Hello ${targetArtist.name}! 🙏
Here is my date-locked booking summary from Rang Riwaaz Mehandi Gorakhpur:

📋 Booking ID: ${bookingId}
📅 Event Date: ${eventDate}
⏰ Time Slot: ${timeSlot}
📍 Venue / Locality: ${locality}
👥 Guests Count: ${guestCount}
💰 Final Transparent Total: ${formatINR(totalAmount)} (Zero hidden fees)
🛡️ Date-Locked with Rang Riwaaz Mehandi Backup Guarantee

Kindly acknowledge the booking confirmation. Thank you!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(whatsappMessage);
    setCopied(true);
    addToast(
      language === 'hi' ? 'व्हाट्सएप सारांश कॉपी हो गया!' : 'WhatsApp booking summary copied!',
      'success'
    );
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    const cleanPhone = (targetArtist.whatsapp || targetArtist.phone || '919838011422').replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(whatsappMessage);
    const url = `https://wa.me/${cleanPhone}?text=${encoded}`;
    window.open(url, '_blank');
    addToast(
      language === 'hi' ? 'व्हाट्सएप विंडो खुल रही है...' : 'Opening WhatsApp...',
      'info'
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={language === 'hi' ? 'व्हाट्सएप बुकिंग सारांश' : 'WhatsApp Booking Summary'}
      maxWidth="max-w-lg"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-sm">
          <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            {language === 'hi'
              ? 'यह सारांश कलाकार को भेजें ताकि आपकी तारीख, वेन्यू व तय मूल्य का लिखित प्रमाण रहे।'
              : 'Send this formatted summary to the artist for written documentation of your date, venue and price.'}
          </span>
        </div>

        {/* Message preview block */}
        <div className="relative">
          <textarea
            readOnly
            value={whatsappMessage}
            rows={10}
            className="w-full text-xs sm:text-sm font-mono bg-stone-50 border border-stone-300 rounded-xl p-3.5 text-stone-800 focus:outline-none select-all resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <button
            onClick={handleCopy}
            className="flex-1 py-3 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-xl text-sm flex items-center justify-center gap-2 border border-stone-300 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? (language === 'hi' ? 'कॉपी हो गया' : 'Copied!') : (language === 'hi' ? 'टेक्स्ट कॉपी करें' : 'Copy Text')}</span>
          </button>

          <button
            onClick={handleOpenWhatsApp}
            className="flex-1 py-3 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-900/10 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            <span>{language === 'hi' ? 'व्हाट्सएप पर भेजें' : 'Send via WhatsApp'}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
