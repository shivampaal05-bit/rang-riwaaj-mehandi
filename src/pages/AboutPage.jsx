import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Heart, Sparkles, Award, Clock, MapPin, 
  CheckCircle2, Users, ArrowRight, Phone, Leaf
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import RangRiwaazLogo from '../components/common/RangRiwaazLogo';

export default function AboutPage() {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  const pillars = [
    {
      icon: ShieldCheck,
      title: isHi ? '100% पक्की तारीख (Date-Locked)' : '100% Date-Locked Certainty',
      desc: isHi 
        ? 'शुभ लग्न की तारीख पर कोई डबल-बुकिंग नहीं। आपका बुक किया गया स्लॉट सिर्फ आपके लिए सुरक्षित रहता है।'
        : 'Zero double-booking on peak wedding dates. Your booked slot and master artist are exclusively reserved for you.',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    {
      icon: Leaf,
      title: isHi ? '100% प्राकृतिक व स्किन-सेफ मेंहदी' : 'Pure Organic & Skin-Safe Henna',
      desc: isHi
        ? 'सोजत की ट्रिपल-फिल्टर्ड प्रीमियम ऑर्गेनिक हिना और नीलगिरी तेल, जो दे गहरा लाल-भूरा रंग बिना किसी केमिकल के।'
        : 'Triple-filtered premium Sojat henna and pure essential eucalyptus oils for a deep royal stain without harmful chemicals.',
      color: 'bg-amber-50 text-amber-900 border-amber-200'
    },
    {
      icon: Award,
      title: isHi ? 'प्रमाणित मूल कला (100% Real Portfolio)' : '100% Authentic Verified Portfolio',
      desc: isHi
        ? 'कोई चुराई गई इंटरनेट फ़ोटो नहीं। हर आर्टिस्ट का काम रिवर्स-इमेज सर्च द्वारा जांचा गया और वास्तविक है।'
        : 'Zero stolen Instagram photos. Every single design in our gallery is verified and created by authentic local artists.',
      color: 'bg-rose-50 text-rose-900 border-rose-200'
    },
    {
      icon: Clock,
      title: isHi ? 'इमरजेंसी बैकअप आर्टिस्ट गारंटी' : 'Gorakhpur Emergency Standby Backup',
      desc: isHi
        ? 'अचानक किसी आपात स्थिति में भी आपकी शादी नहीं रुकेगी। हमारा बैकअप नेटवर्क तुरंत तैयार रहता है।'
        : 'If an emergency strikes, our pre-matched standby artist in Gorakhpur steps in immediately with full price protection.',
      color: 'bg-stone-50 text-stone-800 border-stone-200'
    }
  ];

  const milestones = [
    { number: '500+', label: isHi ? 'संतुष्ट दुल्हनें' : 'Happy Brides' },
    { number: '100%', label: isHi ? 'समय पर पहुंचने की दर' : 'On-Time Arrival Rate' },
    { number: '4.9★', label: isHi ? 'औसत ग्राहक रेटिंग' : 'Average Rating' },
    { number: '12+', label: isHi ? 'गोरखपुर के प्रमुख इलाके' : 'Gorakhpur Localities' },
  ];

  return (
    <div className="min-h-screen bg-[#fdfbf7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header / Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#163820]/10 border border-[#163820]/20 text-[#163820] text-xs font-bold uppercase tracking-wider">
            <span>{isHi ? 'रंग रिवाज़ मेहंदी के बारे में' : 'About Rang Riwaaz Mehandi'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#163820] leading-tight">
            {isHi 
              ? 'गोरखपुर का सबसे भरोसेमंद और पारदर्शी मेंहदी मंच'
              : 'Gorakhpur’s Most Trusted & Transparent Mehndi Platform'}
          </h1>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {isHi
              ? 'रंग रिवाज़ मेहंदी (Rang Riwaaz Mehandi) गोरखपुर की शादियों और उत्सवों में मेंहदी बुकिंग की समस्याओं—जैसे ऐन वक्त पर धोखा, छुपे खर्च और नकली तस्वीरों—को दूर करने का एक समर्पित संकल्प है।'
              : 'Rang Riwaaz Mehandi was born to solve real problems faced by brides and families in Gorakhpur: fake promises on peak wedding dates, hidden extra fees on the wedding day, and stolen portfolio photos.'}
          </p>
        </div>

        {/* Brand Banner Card */}
        <div className="bg-gradient-to-br from-[#163820] via-[#102917] to-[#522209] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-[#c59b4e]/30">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <RangRiwaazLogo size="lg" inverted={true} />
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#fbf2dc]">
                {isHi ? 'परंपरा, कला और विश्वास का संगम' : 'Tradition, Artistry & Absolute Trust'}
              </h2>
              <p className="text-sm text-[#d4ded6] leading-relaxed">
                {isHi
                  ? 'गोलघर, बेतियाहाता, मोहद्दीपुर, शाहपुर, तारामंडल और पूरे गोरखपुर में हम अनुभवी मेंहदी कलाकारों को सीधे परिवारों से जोड़ते हैं, 100% निश्चितता और शुद्ध सोजत हिना की गारंटी के साथ।'
                  : 'Serving Golghar, Betiahata, Mohaddipur, Shahpur, Taramandal, and across Gorakhpur, we connect master henna artists directly with families, backed by strict quality and timing guarantees.'}
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/photos"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c59b4e] hover:bg-[#b5893d] text-[#163820] font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>{isHi ? 'डिज़ाइन फ़ोटोज़ देखें' : 'View Photos Gallery'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/video"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors border border-white/20"
                >
                  <span>{isHi ? 'वीडियो देखें' : 'Watch Videos'}</span>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {milestones.map((item, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#edd096] font-serif">{item.number}</div>
                  <div className="text-xs text-white/80 mt-1 font-medium">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Pillars Section */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              {isHi ? 'हमारा 4-सूत्रीय सुरक्षा वचन' : 'Our 4-Pillar Customer Promise'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              {isHi ? 'गोरखपुर के हर परिवार के लिए चिंता-मुक्त मेंहदी अनुभव' : 'Worry-free bridal and festive celebrations in Gorakhpur'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition-all flex gap-4 items-start"
              >
                <div className={`p-3 rounded-2xl border shrink-0 ${pillar.color}`}>
                  <pillar.icon className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold text-stone-900 text-base">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Coverage in Gorakhpur */}
        <div className="bg-[#faf4ee] rounded-3xl p-8 border border-[#ecdacb] space-y-4">
          <div className="flex items-center gap-2 text-[#88451b] font-bold text-sm">
            <MapPin className="w-4 h-4 text-[#88451b]" />
            <span>{isHi ? 'गोरखपुर में हमारी कवरेज' : 'Our Presence in Gorakhpur'}</span>
          </div>
          <p className="text-stone-700 text-sm leading-relaxed">
            {isHi
              ? 'हम गोलघर, बेतियाहाता, मोहद्दीपुर, शाहपुर, तारामंडल, बशारतपुर, मेडिकल कॉलेज रोड, असुरन, रुस्तमपुर, दाउदपुर और रेलवे कॉलोनी सहित गोरखपुर के सभी क्षेत्रों में होम सर्विस और वेन्यू सर्विस प्रदान करते हैं।'
              : 'We provide prompt at-home and at-venue mehndi services across Golghar, Betiahata, Mohaddipur, Shahpur, Taramandal, Basharatpur, Medical College Road, Asuran, Rustampur, Daudpur, and Railway Colony.'}
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-6 space-y-4">
          <h3 className="text-xl font-bold text-[#163820]">
            {isHi ? 'अपनी तारीख अभी सुरक्षित करें' : 'Ready to lock your special date?'}
          </h3>
          <div className="flex justify-center gap-4">
            <Link
              to="/tracker"
              className="px-6 py-3 rounded-xl bg-[#163820] hover:bg-[#0e2415] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md inline-flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#c59b4e]" />
              <span>{isHi ? 'ट्रैक आर्टिस्ट' : 'Track Artist'}</span>
            </Link>
            <Link
              to="/"
              className="px-6 py-3 rounded-xl bg-white hover:bg-stone-50 text-stone-800 font-bold text-xs uppercase tracking-wider transition-colors border border-stone-300 shadow-xs"
            >
              <span>{isHi ? 'होम पेज' : 'Back to Home'}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
