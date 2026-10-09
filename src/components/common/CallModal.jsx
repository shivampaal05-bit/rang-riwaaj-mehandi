import React from 'react';
import Modal from './Modal';
import { Phone, Clock, MapPin, ShieldCheck, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';

export default function CallModal({ isOpen, onClose, artist }) {
  const { language } = useLanguage();
  const { addToast } = useToast();

  if (!artist) return null;

  const handleSimulateCall = () => {
    addToast(
      language === 'hi'
        ? `कलाकार ${artist.name} को कॉल कनेक्ट की जा रही है... (डेमो)`
        : `Connecting simulated direct call to ${artist.name}... (Demo)`,
      'info'
    );
    // In production or mobile web, triggers tel:
    window.location.href = `tel:${artist.phone.replace(/[^0-9+]/g, '')}`;
    setTimeout(onClose, 800);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={language === 'hi' ? 'कलाकार से सीधा संपर्क (कॉल)' : 'Direct Artist Contact (Call)'}
      maxWidth="max-w-md"
    >
      <div className="space-y-4 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-rose-100 flex items-center justify-center text-rose-800 border-2 border-rose-300">
          <Phone className="w-8 h-8 animate-bounce" />
        </div>

        <div>
          <h4 className="font-bold text-stone-900 text-lg">
            {language === 'hi' ? (artist.hindiName || artist.name) : artist.name}
          </h4>
          <p className="text-sm text-stone-500 flex items-center justify-center gap-1 mt-1">
            <MapPin className="w-4 h-4 text-amber-600" />
            <span>{language === 'hi' ? (artist.hindiLocality || artist.locality) : artist.locality}</span>
          </p>
        </div>

        <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-900 text-left space-y-1.5">
          <div className="flex items-center gap-2 font-semibold">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            <span>{language === 'hi' ? 'कॉलिंग समय: सुबह 9:00 से रात 9:00 बजे' : 'Best calling hours: 9:00 AM - 9:00 PM'}</span>
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'hi' ? 'सत्यापित फोन नंबर (ओटीपी द्वारा पुष्ट)' : 'Verified phone number (OTP confirmed)'}</span>
          </div>
          <p className="text-[11px] text-stone-500 italic mt-1">
            {language === 'hi'
              ? 'नोट: लगन के दिनों में कलाकार व्यस्त हो सकते हैं। कृपया पहले तारीख चेक कर लें।'
              : 'Note: During peak wedding dates artists might be with clients. Please check date availability first.'}
          </p>
        </div>

        <div className="p-3 bg-stone-100 rounded-xl border border-stone-200 text-stone-800 font-mono text-base font-bold tracking-wider">
          {artist.phone}
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <button
            onClick={handleSimulateCall}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-semibold rounded-xl shadow-md shadow-emerald-900/10 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Phone className="w-4 h-4" />
            <span>{language === 'hi' ? 'अभी कॉल करें (सिम्युलेटेड)' : 'Call Now (Simulated Call)'}</span>
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium rounded-xl text-sm transition-colors cursor-pointer"
          >
            {language === 'hi' ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
