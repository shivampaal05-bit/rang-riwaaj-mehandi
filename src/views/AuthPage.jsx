import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, Phone, Lock, User, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import RangRiwaazLogo from '../components/common/RangRiwaazLogo';

export default function AuthPage() {
  const { language } = useLanguage();
  const { switchPersona, loginCustom } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [phone, setPhone] = useState('+91 98391 22840');
  const [name, setName] = useState('Priya Tiwari');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phone.trim()) {
      addToast(language === 'hi' ? 'कृपया फोन नंबर दर्ज करें' : 'Please enter phone number', 'error');
      return;
    }
    setOtpSent(true);
    setOtp('1234'); // Simulated OTP auto-filled for ease of demonstration
    addToast(
      language === 'hi' ? 'डेमो OTP भेजा गया: 1234' : 'Simulated OTP sent: 1234',
      'info'
    );
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp !== '1234') {
      addToast(language === 'hi' ? 'अमान्य OTP (डेमो कोड: 1234)' : 'Invalid OTP (Demo code: 1234)', 'error');
      return;
    }

    loginCustom({
      name: isRegister ? name : 'Priya Tiwari',
      phone,
      locality: 'Golghar, Gorakhpur'
    });

    addToast(
      language === 'hi' ? 'लॉगिन सफल!' : 'Login successful!',
      'success'
    );
    navigate('/dashboard/customer');
  };

  const handleFastSwitch = (role, path) => {
    switchPersona(role);
    addToast(
      language === 'hi' ? `पर्सोना स्विच किया गया: ${role}` : `Switched to persona: ${role}`,
      'success'
    );
    navigate(path);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6 text-left">
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <RangRiwaazLogo size="lg" />
        </div>
        <h1 className="text-2xl font-extrabold font-heading text-stone-900 m-0">
          {language === 'hi' ? 'रंग रिवाज़ मेहंदी लॉगिन' : 'Rang Riwaaz Mehandi Login'}
        </h1>
        <p className="text-xs text-stone-500">
          {language === 'hi'
            ? 'गोरखपुर के विवाह व उत्सवों के लिए पक्की तारीख व पारदर्शी बुकिंग'
            : 'Date-locked mehndi booking platform for Gorakhpur'}
        </p>
      </div>

      {/* 1-Click Demo Persona Quick Access */}
      <div className="bg-amber-50/80 border border-amber-300/80 rounded-2xl p-4 space-y-3">
        <span className="text-[10px] uppercase font-bold tracking-wider text-amber-900 block text-center">
          ⚡ {language === 'hi' ? '1-क्लिक डेमो पर्सोना चयन' : 'Instant 1-Click Demo Personas'}
        </span>

        <div className="grid grid-cols-1 gap-2">
          <button
            type="button"
            onClick={() => handleFastSwitch('customer', '/dashboard/customer')}
            className="w-full p-2.5 bg-white hover:bg-stone-50 rounded-xl border border-stone-200 text-left flex items-center justify-between text-xs cursor-pointer shadow-xs"
          >
            <div>
              <span className="font-bold text-stone-900 block">Priya Tiwari (Customer)</span>
              <span className="text-[11px] text-stone-500">Golghar, Gorakhpur</span>
            </div>
            <span className="text-[11px] text-rose-800 font-bold">Login →</span>
          </button>

          <button
            type="button"
            onClick={() => handleFastSwitch('artist', '/dashboard/artist')}
            className="w-full p-2.5 bg-white hover:bg-stone-50 rounded-xl border border-stone-200 text-left flex items-center justify-between text-xs cursor-pointer shadow-xs"
          >
            <div>
              <span className="font-bold text-stone-900 block">Pooja Verma (Artist View)</span>
              <span className="text-[11px] text-stone-500">Betiahata Studio</span>
            </div>
            <span className="text-[11px] text-rose-800 font-bold">Login →</span>
          </button>

          <button
            type="button"
            onClick={() => handleFastSwitch('admin', '/dashboard/admin')}
            className="w-full p-2.5 bg-white hover:bg-stone-50 rounded-xl border border-stone-200 text-left flex items-center justify-between text-xs cursor-pointer shadow-xs"
          >
            <div>
              <span className="font-bold text-stone-900 block">Operations Lead (Admin View)</span>
              <span className="text-[11px] text-stone-500">Gorakhpur Safety Hub</span>
            </div>
            <span className="text-[11px] text-rose-800 font-bold">Login →</span>
          </button>
        </div>
      </div>

      {/* Standard Phone + OTP Form */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
        <div className="flex border-b border-stone-100 pb-2 justify-around text-xs font-bold">
          <button
            type="button"
            onClick={() => setIsRegister(false)}
            className={`pb-1 cursor-pointer ${!isRegister ? 'text-rose-900 border-b-2 border-rose-900' : 'text-stone-400'}`}
          >
            {language === 'hi' ? 'लॉगिन' : 'Login'}
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(true)}
            className={`pb-1 cursor-pointer ${isRegister ? 'text-rose-900 border-b-2 border-rose-900' : 'text-stone-400'}`}
          >
            {language === 'hi' ? 'नया खाता बनाएं' : 'Register'}
          </button>
        </div>

        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-3.5 text-xs">
            {isRegister && (
              <div className="space-y-1">
                <label className="font-semibold text-stone-700 block">
                  {language === 'hi' ? 'पूरा नाम' : 'Full Name'}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="font-semibold text-stone-700 block">
                {language === 'hi' ? 'मोबाइल नंबर (ओटीपी हेतु)' : 'Mobile Phone Number (for OTP)'}
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 font-mono focus:outline-none focus:ring-2 focus:ring-rose-800"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-sm"
            >
              {language === 'hi' ? 'ओटीपी भेजें (डेमो)' : 'Send OTP (Demo)'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-stone-700 block">
                  {language === 'hi' ? '4-अंकीय ओटीपी दर्ज करें' : 'Enter 4-Digit OTP'}
                </label>
                <span className="text-[10px] text-emerald-700 font-mono">Demo: 1234</span>
              </div>
              <input
                type="text"
                maxLength="4"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 text-center font-mono text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-rose-800"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-rose-800 to-amber-700 hover:from-rose-900 hover:to-amber-800 text-white font-bold rounded-xl text-xs transition-all cursor-pointer shadow-md"
            >
              {language === 'hi' ? 'सत्यापित करें एवं आगे बढ़ें' : 'Verify & Continue'}
            </button>

            <button
              type="button"
              onClick={() => setOtpSent(false)}
              className="w-full text-center text-[11px] text-stone-500 hover:text-stone-800 cursor-pointer pt-1"
            >
              {language === 'hi' ? 'नंबर बदलें' : 'Change Phone Number'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
