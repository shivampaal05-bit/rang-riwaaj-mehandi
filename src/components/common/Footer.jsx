import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, MapPin, Phone, RefreshCw, MessageSquare, Heart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useBooking } from '../../context/BookingContext';
import { useToast } from '../../context/ToastContext';
import { GORAKHPUR_LOCALITIES } from '../../data/mockLocalities';
import RangRiwaazLogo from './RangRiwaazLogo';
import GorakhpurLocationsSection from './GorakhpurLocationsSection';

export default function Footer() {
  const { language, t } = useLanguage();
  const { resetDemoData } = useBooking();
  const { addToast } = useToast();

  const handleResetData = () => {
    resetDemoData();
    addToast(
      language === 'hi' ? 'डेमो डेटा सफलतापूर्वक रीसेट किया गया!' : 'Demo prototype data reset to defaults!',
      'info'
    );
  };

  return (
    <>
      {/* Locations Section Separately Above Footer */}
      <GorakhpurLocationsSection />

      {/* Main Dark Footer */}
      <footer className="bg-[#0b190f] text-[#cfd9d1] pt-12 pb-8 border-t-2 border-[#c59b4e]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Problem-Solving Mission */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <RangRiwaazLogo size="md" inverted={true} />
            </Link>
            <p className="text-xs text-[#9bb0a0] leading-relaxed">
              {t('footerAbout')}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#edd096] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#42925a]" />
              <span>{language === 'hi' ? '100% डेट-लॉक व बैकअप गारंटी' : 'Date-Locked & Backup Guaranteed'}</span>
            </div>
          </div>

          {/* Col 2: Quick Problem-Solving Tools */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {language === 'hi' ? 'विशेष समाधान टूल्स' : 'Problem-Solving Tools'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/search" className="hover:text-amber-300 transition-colors">
                  {language === 'hi' ? 'तारीख अनुसार उपलब्धता खोजें' : 'Date-Wise Availability Search'}
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="hover:text-amber-300 transition-colors">
                  {language === 'hi' ? 'पारदर्शी अंतिम मूल्य कैलकुलेटर' : 'Transparent Final Price Calculator'}
                </Link>
              </li>
              <li>
                <Link to="/planner" className="hover:text-amber-300 transition-colors">
                  {language === 'hi' ? 'स्मार्ट इवेंट टाइम व कलाकार प्लानर' : 'Smart Event Time Planner'}
                </Link>
              </li>
              <li>
                <Link to="/tracker" className="hover:text-amber-300 transition-colors">
                  {language === 'hi' ? '9-चरणीय लाइव बुकिंग ट्रैकर' : '9-Stage Live Booking Tracker'}
                </Link>
              </li>
              <li>
                <Link to="/backup" className="hover:text-amber-300 transition-colors">
                  {language === 'hi' ? 'इमरजेंसी बैकअप आर्टिस्ट गारंटी' : 'Backup Artist Guarantee'}
                </Link>
              </li>
              <li>
                <Link to="/compare" className="hover:text-amber-300 transition-colors">
                  {language === 'hi' ? 'सत्यापित कलाकारों की तुलना' : 'Side-by-Side Artist Comparison'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Gorakhpur Localities Overview */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>{language === 'hi' ? 'गोरखपुर सेवा क्षेत्र' : 'Gorakhpur Coverage'}</span>
            </h4>
            <p className="text-xs text-[#9bb0a0] leading-relaxed">
              {language === 'hi'
                ? 'बरईपार मोड़ (मुख्य केंद्र), कौड़ीराम, बेलीपार, महावीर छपरा, नौसढ़, तारामंडल, गोलघर, बेतियाहाता सहित गोरखपुर के सभी 15+ प्रमुख क्षेत्रों में 100% पक्की तारीख और होम सर्विस।'
                : 'Full-service coverage from Baraipar Mod (Center Hub) to Kauriram, Belipar, Mahavir Chapra, Naushad, Taramandal, Golghar, Betiahata & all zones.'}
            </p>
            <div className="pt-1">
              <Link
                to="/search"
                className="inline-flex items-center gap-1 text-xs text-[#edd096] hover:text-white font-semibold transition-colors"
              >
                <span>{language === 'hi' ? 'सभी इलाकों में आर्टिस्ट देखें →' : 'View Artists by Area →'}</span>
              </Link>
            </div>
          </div>

          {/* Col 4: Local Support & Demo Control */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {language === 'hi' ? 'गोरखपुर हेल्पडेस्क' : 'Gorakhpur Helpdesk'}
            </h4>
            <div className="p-3 bg-stone-900 border border-stone-800 rounded-xl space-y-2 text-xs">
              <div className="flex items-center gap-2 text-stone-200">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+91 94500 00100 (Demo Support)</span>
              </div>
              <div className="text-[11px] text-stone-500">
                {language === 'hi' ? 'समय: सुबह 9:00 से रात 10:00 बजे' : 'Hours: 9:00 AM - 10:00 PM'}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleResetData}
                className="w-full py-2 px-3 bg-[#14291a] hover:bg-[#1b3824] text-[#edd096] hover:text-white text-xs rounded-xl border border-[#c59b4e]/30 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="Reset mock bookings, favorites and availability schedule to defaults"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#c59b4e]" />
                <span>{language === 'hi' ? 'डेमो डेटा रीसेट करें' : 'Reset Demo Data'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#1a3822] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8ca392]">
          <p>
            © 2026 Rang Riwaaz Mehandi (Gorakhpur). {t('footerDisclaimer')}
          </p>
          <div className="flex items-center gap-4">
            <Link to="/help" className="hover:text-[#edd096]">{language === 'hi' ? 'सहायता केंद्र' : 'Help & FAQ'}</Link>
            <span>•</span>
            <Link to="/dashboard/admin" className="hover:text-[#edd096]">{language === 'hi' ? 'एडमिन पैनल' : 'Admin Panel'}</Link>
            <span>•</span>
            <Link to="/dashboard/artist" className="hover:text-[#edd096]">{language === 'hi' ? 'कलाकार पोर्टल' : 'Artist Portal'}</Link>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
