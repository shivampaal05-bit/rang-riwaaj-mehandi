import React, { useState } from 'react';
import { 
  ShieldCheck, Users, Calendar, Award, CheckCircle2, XCircle, 
  RefreshCw, AlertTriangle, ArrowRight, Zap, Settings 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import VerificationBadges from '../components/artist/VerificationBadges';

export default function AdminDashboard() {
  const { language } = useLanguage();
  const { artists, bookings, resetDemoData } = useBooking();
  const { switchPersona } = useAuth();
  const { addToast } = useToast();

  const [artistList, setArtistList] = useState(artists);

  // Toggle specific verification badge for an artist
  const toggleVerificationBadge = (artistId, badgeKey) => {
    setArtistList(prev => prev.map(art => {
      if (art.id === artistId) {
        const updatedVerif = {
          ...art.verification,
          [badgeKey]: !art.verification?.[badgeKey]
        };
        // If all 5 or core are checked, isVerified is true
        updatedVerif.isVerified = !!(updatedVerif.identityVerified && updatedVerif.phoneVerified);
        return { ...art, verification: updatedVerif };
      }
      return art;
    }));

    // Update localStorage
    localStorage.setItem('mehndiconnect_artists', JSON.stringify(artistList));
    addToast(
      language === 'hi' ? `सत्यापन बैज "${badgeKey}" अपडेट किया गया।` : `Verification badge "${badgeKey}" updated.`,
      'info'
    );
  };

  const handleReset = () => {
    resetDemoData();
    setArtistList(artists);
    addToast(language === 'hi' ? 'डेमो डेटा रीसेट सफल' : 'Demo data reset successfully', 'success');
  };

  const totalBookings = bookings.length;
  const cancelledBookings = bookings.filter(b => b.cancelledByArtist).length;
  const verifiedArtistsCount = artists.filter(a => a.verification?.isVerified).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0d2214] via-[#163820] to-[#1c0e05] text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-[#c59b4e]/30">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>{language === 'hi' ? 'गोरखपुर ऑपरेशन्स एवं सुरक्षा कंट्रोल' : 'Gorakhpur Ops & Safety Console'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1 m-0">
            {language === 'hi' ? 'रंग रिवाज़ मेहंदी सुरक्षा व ट्रस्ट कंसोल' : 'Rang Riwaaz Mehandi Trust & Safety Console'}
          </h1>
          <p className="text-xs text-stone-400 mt-0.5">
            {language === 'hi'
              ? 'डेट-लॉक मॉनिटरिंग, 5-पॉइंट आर्टिस्ट वेरिफिकेशन एवं स्टैंडबाय बैकअप नियंत्रण'
              : 'Real-time double booking prevention, 5-point verification management & standby pool'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleReset}
            className="py-2.5 px-3 bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-700"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'डेटा रीसेट करें' : 'Reset Demo Data'}</span>
          </button>

          <button
            onClick={() => switchPersona('customer')}
            className="py-2.5 px-3 bg-white text-stone-900 hover:bg-stone-100 font-bold rounded-xl text-xs transition-colors cursor-pointer"
          >
            {language === 'hi' ? 'ग्राहक दृश्य' : 'Customer View'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm">
          <span className="text-[10px] text-stone-400 uppercase font-bold block">{language === 'hi' ? 'कुल कलाकार' : 'Gorakhpur Artists'}</span>
          <span className="text-2xl font-extrabold text-stone-900 mt-1 block">{artists.length}</span>
          <span className="text-[11px] text-emerald-700 font-medium">{verifiedArtistsCount} fully verified</span>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm">
          <span className="text-[10px] text-stone-400 uppercase font-bold block">{language === 'hi' ? 'सक्रिय बुकिंग्स' : 'Active Bookings'}</span>
          <span className="text-2xl font-extrabold text-rose-950 mt-1 block">{totalBookings}</span>
          <span className="text-[11px] text-stone-500 font-medium">100% Date-Locked</span>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm">
          <span className="text-[10px] text-stone-400 uppercase font-bold block">{language === 'hi' ? 'स्टैंडबाय बैकअप पूल' : 'Standby Pool'}</span>
          <span className="text-2xl font-extrabold text-emerald-800 mt-1 block">100%</span>
          <span className="text-[11px] text-emerald-700 font-medium">Readiness Index</span>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm">
          <span className="text-[10px] text-stone-400 uppercase font-bold block">{language === 'hi' ? 'इमरजेंसी रद्दीकरण' : 'Cancellations'}</span>
          <span className="text-2xl font-extrabold text-amber-800 mt-1 block">{cancelledBookings}</span>
          <span className="text-[11px] text-amber-700 font-medium">Backup Dispatched</span>
        </div>
      </div>

      {/* Artist 5-Point Verification Control Table */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>{language === 'hi' ? 'कलाकार 5-पॉइंट सत्यापन नियंत्रण पैनल' : 'Artist 5-Point Verification Manager'}</span>
          </h3>
          <p className="text-xs text-stone-500">
            {language === 'hi'
              ? 'बैज पर क्लिक करके किसी भी कलाकार की सत्यापन स्थिति (सत्यापित / लंबित) टॉगल करें।'
              : 'Click any badge to toggle verified/pending state. Changes reflect across search, cards and profiles.'}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-stone-200 bg-[#fbf9f6] text-stone-500 font-bold uppercase">
                <th className="p-3">Artist</th>
                <th className="p-3">Identity (Govt ID)</th>
                <th className="p-3">Phone (OTP)</th>
                <th className="p-3">Portfolio (Original)</th>
                <th className="p-3">Skill Test</th>
                <th className="p-3">Home Service</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {artistList.map((art) => (
                <tr key={art.id} className="hover:bg-stone-50">
                  <td className="p-3">
                    <span className="font-bold text-stone-900 block">{art.name}</span>
                    <span className="text-[11px] text-stone-500">{art.locality}</span>
                  </td>

                  {/* 5 Badges Toggle Buttons */}
                  {['identityVerified', 'phoneVerified', 'portfolioChecked', 'skillChecked', 'homeServiceVerified'].map((key) => {
                    const isChecked = !!art.verification?.[key];
                    return (
                      <td key={key} className="p-3">
                        <button
                          type="button"
                          onClick={() => toggleVerificationBadge(art.id, key)}
                          className={`px-2.5 py-1 rounded-lg font-bold text-[11px] border cursor-pointer transition-all ${
                            isChecked
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : 'bg-stone-100 text-stone-400 border-stone-200 hover:bg-stone-200'
                          }`}
                        >
                          {isChecked ? 'Verified ✓' : 'Pending ⏳'}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
