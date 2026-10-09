import React from 'react';
import { Star, ShieldCheck, CheckCircle2, UserCheck, MapPin, Calendar } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function ReviewBreakdown({ artist, onWriteReviewClick, canWriteReview = false }) {
  const { language } = useLanguage();

  const reviews = artist?.reviews || [];
  const detailed = artist?.detailedRatings || {
    designQuality: 4.9,
    onTimeArrival: 4.8,
    behaviour: 4.9,
    priceTransparency: 5.0,
    cleanliness: 4.8
  };

  const ratingAspects = [
    { key: 'designQuality', label: language === 'hi' ? 'डिजाइन गुणवत्ता व फिनिशिंग' : 'Design Quality & Finesse', score: detailed.designQuality },
    { key: 'onTimeArrival', label: language === 'hi' ? 'समय पर आगमन (पंक्चुअलिटी)' : 'On-Time Arrival', score: detailed.onTimeArrival },
    { key: 'behaviour', label: language === 'hi' ? 'व्यवहार व सहयोग' : 'Behaviour & Professionalism', score: detailed.behaviour },
    { key: 'priceTransparency', label: language === 'hi' ? 'मूल्य पारदर्शिता (कोई छुपा शुल्क नहीं)' : 'Price Transparency (Zero Hidden Fees)', score: detailed.priceTransparency },
    { key: 'cleanliness', label: language === 'hi' ? 'सफाई व प्राकृतिक कोन गुणवत्ता' : 'Cleanliness & Cone Hygiene', score: detailed.cleanliness },
  ];

  return (
    <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-4 sm:p-6 space-y-6">
      {/* Overall Score & Aspect Bars */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pb-6 border-b border-stone-100">
        {/* Overall score left */}
        <div className="md:col-span-4 text-center md:border-r md:border-stone-100 md:pr-6">
          <div className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
            {artist?.rating || 4.9}
          </div>
          <div className="flex items-center justify-center gap-1 my-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-xs text-stone-500 font-medium">
            {artist?.reviewCount || 0} {language === 'hi' ? 'सत्यापित बुकिंग समीक्षाएं' : 'Verified Wedding Reviews'}
          </p>
          <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'hi' ? 'केवल संपन्न शादियों के रिव्यू' : 'Only Completed Bookings'}</span>
          </div>
        </div>

        {/* 5-Aspect Rating Bars */}
        <div className="md:col-span-8 space-y-2.5">
          <h5 className="text-xs uppercase font-bold text-stone-400 tracking-wider">
            {language === 'hi' ? '5 श्रेणियों में अलग-अलग मूल्यांकन' : '5-Pillar Aspect Breakdown'}
          </h5>
          {ratingAspects.map((aspect) => (
            <div key={aspect.key} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-stone-700">{aspect.label}</span>
                <span className="font-bold text-stone-900">{aspect.score.toFixed(1)} / 5.0</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-rose-600 rounded-full transition-all duration-500"
                  style={{ width: `${(aspect.score / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Notice or Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 bg-[#fcf9f5] border border-amber-200/80 rounded-xl text-xs">
        <div className="flex items-center gap-2 text-stone-600">
          <UserCheck className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            {language === 'hi'
              ? 'फर्जी रिव्यू रोकने हेतु: केवल वे ग्राहक समीक्षा लिख सकते हैं जिनकी मेहंदी सेवा पूर्ण हो चुकी है।'
              : 'Anti-spam protection: Reviews are locked until your booking service is marked completed.'}
          </span>
        </div>
        {canWriteReview && onWriteReviewClick && (
          <button
            onClick={onWriteReviewClick}
            className="w-full sm:w-auto px-4 py-2 bg-rose-800 hover:bg-rose-900 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer shrink-0 shadow-sm"
          >
            {language === 'hi' ? 'समीक्षा लिखें (पूर्ण बुकिंग)' : 'Write Review (Completed)'}
          </button>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-stone-900">
          {language === 'hi' ? 'ग्राहकों के अनुभव (गोरखपुर)' : 'Recent Client Experiences (Gorakhpur)'}
        </h4>

        {reviews.length === 0 ? (
          <p className="text-xs text-stone-500 italic">
            {language === 'hi' ? 'अभी कोई समीक्षा नहीं है।' : 'No verified reviews submitted yet.'}
          </p>
        ) : (
          <div className="space-y-3">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-xl border border-stone-200/80 bg-stone-50/50 space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-rose-200 text-rose-900 font-bold flex items-center justify-center text-xs">
                      {rev.customerName?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                        <span>{rev.customerName}</span>
                        <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-800 bg-emerald-100/80 px-1.5 py-0.2 rounded font-semibold" title="Verified Gorakhpur Booking ID">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{rev.bookingId}</span>
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500 flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-0.5">
                          <MapPin className="w-3 h-3 text-amber-600" />
                          {rev.locality}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <Calendar className="w-3 h-3" />
                          {rev.eventDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= Math.round(rev.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-bold text-stone-800 ml-1">{rev.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed">
                  {language === 'hi' && rev.hindiComment ? rev.hindiComment : rev.comment}
                </p>

                {/* Sub-ratings pills */}
                {rev.detailedRating && (
                  <div className="flex flex-wrap gap-1.5 pt-1 text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-white border border-stone-200 text-stone-600">
                      {language === 'hi' ? 'डिजाइन' : 'Design'}: <b>{rev.detailedRating.designQuality}/5</b>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white border border-stone-200 text-stone-600">
                      {language === 'hi' ? 'समयबद्धता' : 'Punctuality'}: <b>{rev.detailedRating.onTimeArrival}/5</b>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white border border-stone-200 text-stone-600">
                      {language === 'hi' ? 'पारदर्शिता' : 'Pricing'}: <b>{rev.detailedRating.priceTransparency}/5</b>
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
