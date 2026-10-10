import React, { useState } from 'react';
import { 
  HelpCircle, Phone, MessageSquare, ShieldCheck, AlertTriangle, 
  Send, CheckCircle2, ChevronDown, ChevronUp, MapPin 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

export default function HelpPage() {
  const { language } = useLanguage();
  const { addToast } = useToast();

  const [bookingId, setBookingId] = useState('');
  const [complaintType, setComplaintType] = useState('pricing');
  const [description, setDescription] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: language === 'hi' ? 'डेट-लॉक (Date-Lock) बुकिंग क्या है और यह सामान्य बुकिंग से कैसे अलग है?' : 'What is Date-Locked booking and how does it prevent double booking?',
      a: language === 'hi'
        ? 'सामान्य वेबसाइटों व इंस्टाग्राम पर कलाकार एक ही शुभ लग्न की तारीख पर 3-4 शादियों की हामी भर लेते हैं और अंतिम समय में अनुभवहीन सहायकों को भेज देते हैं। रंग रिवाज़ मेहंदी पर बुकिंग होते ही वह स्लॉट कलाकार के कैलेंडर में लाल (Booked) हो जाता है। सिस्टम किसी दूसरे ग्राहक को उस तारीख पर बुकिंग की अनुमति ही नहीं देता।'
        : 'On traditional platforms, artists accept multiple bookings on auspicious wedding dates and send junior trainees. On Rang Riwaaz Mehandi, the moment you book, the slot is locked red on the artist calendar with strict double-booking prevention.'
    },
    {
      q: language === 'hi' ? 'कैलकुलेटर में दिखने वाला मूल्य अंतिम है या वेन्यू पर अतिरिक्त चार्ज लगेगा?' : 'Is the price calculated guaranteed, or will there be extra fees at the venue?',
      a: language === 'hi'
        ? 'यह 100% अंतिम व पारदर्शी मूल्य है। इसमें मुख्य दुल्हन पैकेज, हाथ-पैर की कवरेज, रिश्तेदारों की संख्या और गोरखपुर के इलाके के अनुसार यात्रा किराया पहले से शामिल होता है। वेन्यू पर कलाकार आपसे ₹1 भी अतिरिक्त नहीं मांग सकते।'
        : 'It is 100% itemized and final. It accounts for bridal coverage, guest count, and distance per km. Zero surprise add-ons on the day.'
    },
    {
      q: language === 'hi' ? 'यदि कलाकार शादी वाले दिन अचानक बीमार पड़ जाए तो बैकअप गारंटी कैसे काम करती है?' : 'How does the Standby Backup Guarantee work if an artist cancels?',
      a: language === 'hi'
        ? 'हर पुष्ट बुकिंग के साथ गोरखपुर का एक सत्यापित स्टैंडबाय कलाकार मैप रहता है। यदि मूल कलाकार आपातकाल में रद्द करता है, तो आप तुरंत बैकअप कलाकार ले सकते हैं। यदि बैकअप कलाकार का सामान्य शुल्क अधिक भी है, तो अंतर राशि का खर्च रंग रिवाज़ मेहंदी वहन करेगा।'
        : 'A verified standby artist in Gorakhpur is pre-matched to every booking. If the primary artist cancels, standby replacement is offered instantly with 100% price protection: Rang Riwaaz Mehandi pays any rate difference.'
    },
    {
      q: language === 'hi' ? 'क्या इस्तेमाल की जाने वाली मेहंदी केमिकल-मुक्त (ऑर्गेनिक) है?' : 'Is the henna 100% organic and chemical-free?',
      a: language === 'hi'
        ? 'हां, हमारे सभी 5-पॉइंट सत्यापित कलाकार केवल राजस्थान के सोझत से प्रमाणित शुद्ध हर्बल मेहंदी, यूकेलिप्टस और लौंग के तेल से बने सुरक्षित कोन इस्तेमाल करते हैं। किसी भी केमिकल या ब्लैक-डाई की सख्त मनाही है।'
        : 'Yes, all verified artists use certified chemical-free Sojat henna cones with natural eucalyptus and clove essential oils. Zero black-chemical dyes.'
    }
  ];

  const handleSubmitComplaint = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      addToast(language === 'hi' ? 'कृपया विवरण दर्ज करें' : 'Please provide complaint details', 'error');
      return;
    }

    addToast(
      language === 'hi'
        ? 'आपकी शिकायत टिकट #GKP-TKT-8842 दर्ज कर ली गई है। ऑपरेशन्स टीम 2 घंटे में संपर्क करेगी।'
        : 'Complaint ticket #GKP-TKT-8842 registered. Gorakhpur support team will respond within 2 hours.',
      'success'
    );
    setBookingId('');
    setDescription('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-10 text-left">
      {/* Header */}
      <div className="bg-gradient-to-r from-stone-900 via-rose-950 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
            <HelpCircle className="w-4 h-4" />
            <span>{language === 'hi' ? 'गोरखपुर सहायता एवं शिकायत निवारण' : 'Gorakhpur Support & Grievance'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white m-0">
            {language === 'hi' ? 'हम आपकी मदद के लिए सदैव तत्पर हैं' : 'We Are Here to Help Your Wedding Run Smoothly'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {language === 'hi'
              ? 'डेट-लॉक, पारदर्शी बिलिंग या स्टैंडबाय बैकअप से जुड़े किसी भी सवाल या शिकायत हेतु संपर्क करें।'
              : 'Direct hotline, transparent grievance desk, and answers to common wedding booking questions.'}
          </p>
        </div>
      </div>

      {/* 2 Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Phone className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="font-bold text-stone-900 text-sm">
            {language === 'hi' ? 'गोरखपुर शादी आपातकालीन हेल्पलाइन' : 'Gorakhpur Wedding Emergency Helpline'}
          </h3>
          <p className="text-xs text-stone-500 font-mono font-bold text-base text-stone-800">
            +91 94500 00100 (Demo Support)
          </p>
          <span className="text-[11px] text-stone-500 block">
            {language === 'hi' ? 'सुबह 9:00 बजे से रात 10:00 बजे तक' : 'Daily 9:00 AM - 10:00 PM'}
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="font-bold text-stone-900 text-sm">
            {language === 'hi' ? 'स्थानीय ऑपरेशन्स कार्यालय' : 'Local Operations Hub'}
          </h3>
          <p className="text-xs text-stone-600">
            Civil Lines / Golghar Central Hub, Gorakhpur - 273001
          </p>
          <span className="text-[11px] text-emerald-700 font-semibold block">
            {language === 'hi' ? 'सत्यापित होम-सर्विस निगरानी' : 'Physical Address Verification Center'}
          </span>
        </div>
      </div>

      {/* Grid: Complaint Form on Left, FAQs on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Complaint Form (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-rose-800" />
              <span>{language === 'hi' ? 'शिकायत या सहायता अनुरोध दर्ज करें' : 'Submit Grievance or Inquiry'}</span>
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              {language === 'hi' ? 'हम प्रत्येक शिकायत का 2 घंटे में समाधान करते हैं।' : 'Guaranteed grievance review within 2 hours.'}
            </p>
          </div>

          <form onSubmit={handleSubmitComplaint} className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-stone-700 block">
                {language === 'hi' ? 'शिकायत का विषय' : 'Issue Category'} *
              </label>
              <select
                value={complaintType}
                onChange={(e) => setComplaintType(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 font-semibold focus:outline-none focus:ring-2 focus:ring-rose-800"
              >
                <option value="pricing">{language === 'hi' ? 'मूल्य या बिलिंग संबंधी सवाल' : 'Pricing & Billing Dispute'}</option>
                <option value="delay">{language === 'hi' ? 'कलाकार के समय पर पहुंचने में विलंब' : 'Artist Delay / Punctuality'}</option>
                <option value="backup">{language === 'hi' ? 'इमरजेंसी बैकअप सहायता' : 'Emergency Standby Backup'}</option>
                <option value="quality">{language === 'hi' ? 'कला या कोन गुणवत्ता' : 'Art or Henna Quality Issue'}</option>
                <option value="other">{language === 'hi' ? 'अन्य सामान्य सहायता' : 'Other General Help'}</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700 block">
                {language === 'hi' ? 'बुकिंग संदर्भ आईडी (यदि उपलब्ध हो)' : 'Booking ID (Optional)'}
              </label>
              <input
                type="text"
                placeholder="e.g. GKP-MHN-2026-8812"
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 font-mono focus:outline-none focus:ring-2 focus:ring-rose-800"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700 block">
                {language === 'hi' ? 'समस्या का विस्तृत विवरण' : 'Detailed Description'} *
              </label>
              <textarea
                rows={4}
                placeholder={language === 'hi' ? 'कृपया अपनी समस्या या सवाल विस्तार से लिखें...' : 'Please describe the issue or query in detail...'}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>{language === 'hi' ? 'शिकायत जमा करें' : 'Submit Ticket'}</span>
            </button>
          </form>
        </div>

        {/* FAQs Accordion (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span>{language === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न (FAQ)' : 'Frequently Asked Questions'}</span>
          </h3>

          <div className="space-y-2.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-stone-900 flex items-center justify-between gap-3 hover:bg-stone-50 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-rose-800 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-stone-600 leading-relaxed border-t border-stone-100 bg-[#fdfbf9]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
