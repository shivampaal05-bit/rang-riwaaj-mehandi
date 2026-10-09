import React from 'react';
import { formatINR } from '../../utils/calculator';
import { ShieldCheck, Tag, Info, CheckCircle2, Car, Sparkles, User, Clock, Moon } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function PriceBreakdown({ calculation, showLockAction = false, onLockBooking }) {
  const { language } = useLanguage();

  if (!calculation) return null;

  return (
    <div className="bg-white border border-stone-200/90 rounded-2xl shadow-sm overflow-hidden space-y-0">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-stone-900 to-rose-950 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-500/20 border border-amber-400/40 rounded-lg text-amber-300">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold">
                {language === 'hi' ? '100% पारदर्शी अंतिम बिल विवरण' : '100% Transparent Final Price Breakdown'}
              </h4>
              <p className="text-[11px] text-stone-300">
                {language === 'hi' ? 'कोई अप्रत्याशित या छुपा शुल्क नहीं' : 'No surprise charges on wedding day'}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-extrabold tracking-wider uppercase bg-amber-400 text-stone-950 px-2 py-0.5 rounded-full">
            {language === 'hi' ? 'गारंटीड रेट' : 'Guaranteed'}
          </span>
        </div>
      </div>

      {/* Itemized Line Items */}
      <div className="p-5 space-y-3 text-xs divide-y divide-stone-100">
        {/* Base Package */}
        <div className="flex justify-between items-start pt-1">
          <div>
            <div className="font-semibold text-stone-900 flex items-center gap-1.5">
              <span>{calculation.basePackageName}</span>
            </div>
            <span className="text-[11px] text-stone-500">
              {language === 'hi' ? 'मुख्य दुल्हन/समारोह सेवा बेस' : 'Main service base package'}
            </span>
          </div>
          <span className="font-bold text-stone-900 text-sm">
            {formatINR(calculation.basePackage)}
          </span>
        </div>

        {/* Feet Henna Addon */}
        {calculation.includeFeet && calculation.feetCharge > 0 && (
          <div className="flex justify-between items-start pt-2">
            <div>
              <div className="font-semibold text-stone-900">
                {calculation.feetLabel}
              </div>
              <span className="text-[11px] text-stone-500">
                {language === 'hi' ? 'पैरों की विस्तृत मेहंदी डिजाइन' : 'Intricate bridal feet coverage'}
              </span>
            </div>
            <span className="font-bold text-stone-900 text-sm">
              +{formatINR(calculation.feetCharge)}
            </span>
          </div>
        )}

        {/* Guest Charges */}
        {calculation.guestCount > 0 && (
          <div className="flex justify-between items-start pt-2">
            <div>
              <div className="font-semibold text-stone-900 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-stone-400" />
                <span>
                  {calculation.guestCount} {language === 'hi' ? 'परिवार / मेहमान' : 'Guests'} ({calculation.guestHandSides} {language === 'hi' ? 'साइड' : 'side(s)'})
                </span>
              </div>
              <span className="text-[11px] text-stone-500">
                {calculation.guestCount * calculation.guestHandSides} sides @ {formatINR(calculation.guestRate)}/side
              </span>
            </div>
            <span className="font-bold text-stone-900 text-sm">
              +{formatINR(calculation.guestCharge)}
            </span>
          </div>
        )}

        {/* Travel Distance Fee */}
        <div className="flex justify-between items-start pt-2">
          <div>
            <div className="font-semibold text-stone-900 flex items-center gap-1">
              <Car className="w-3.5 h-3.5 text-stone-400" />
              <span>
                {language === 'hi' ? 'गोरखपुर स्थानीय यात्रा' : 'Travel Distance'} ({calculation.travelDistanceKm} km)
              </span>
            </div>
            <span className="text-[11px] text-stone-500">
              {calculation.freeKm} km {language === 'hi' ? 'मुफ्त' : 'free'}, {calculation.billableKm} km billable
            </span>
          </div>
          <span className="font-bold text-stone-900 text-sm">
            {calculation.travelFee > 0 ? `+${formatINR(calculation.travelFee)}` : (
              <span className="text-emerald-700 font-semibold">{language === 'hi' ? '₹0 (मुफ्त)' : '₹0 (Free)'}</span>
            )}
          </span>
        </div>

        {/* Portrait Artwork Addon */}
        {calculation.extraPortrait && (
          <div className="flex justify-between items-start pt-2">
            <div>
              <div className="font-semibold text-stone-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'hi' ? 'वर-वधू पोर्ट्रेट चित्रकला' : 'Dulha-Dulhan Portrait Face Work'}</span>
              </div>
              <span className="text-[11px] text-stone-500">
                {language === 'hi' ? 'हथेली पर वर व वधू का सजीव चित्र' : 'Hand-drawn fine portrait detailing'}
              </span>
            </div>
            <span className="font-bold text-stone-900 text-sm">
              +{formatINR(calculation.portraitCharge)}
            </span>
          </div>
        )}

        {/* Custom Story Scene */}
        {calculation.extraStoryWork && (
          <div className="flex justify-between items-start pt-2">
            <div>
              <div className="font-semibold text-stone-900">
                {language === 'hi' ? 'विवाह प्रसंग कथा (डोली/बारात/वरमाला)' : 'Custom Wedding Story (Doli/Baraat/Varmala)'}
              </div>
              <span className="text-[11px] text-stone-500">
                {language === 'hi' ? 'पारंपरिक विवाह कथा रूपांकन' : 'Thematic story scenes'}
              </span>
            </div>
            <span className="font-bold text-stone-900 text-sm">
              +{formatINR(calculation.storyWorkCharge)}
            </span>
          </div>
        )}

        {/* Late Night Overtime */}
        {calculation.isLateNight && (
          <div className="flex justify-between items-start pt-2">
            <div>
              <div className="font-semibold text-stone-900 flex items-center gap-1">
                <Moon className="w-3.5 h-3.5 text-indigo-500" />
                <span>{language === 'hi' ? 'रात्रि 10:00 बजे के बाद सेवा शुल्क' : 'Late-Night Overtime Surcharge'}</span>
              </div>
              <span className="text-[11px] text-stone-500">
                {language === 'hi' ? 'रात्रि शिफ्ट कलाकार सुरक्षा भत्ता' : 'Post 10:00 PM transport & safety allowance'}
              </span>
            </div>
            <span className="font-bold text-stone-900 text-sm">
              +{formatINR(calculation.overtimeFee)}
            </span>
          </div>
        )}

        {/* 100% Organic Henna Guarantee (Always included ₹0) */}
        <div className="flex justify-between items-start pt-2 bg-emerald-50/50 -mx-5 px-5 py-2">
          <div className="flex items-center gap-1.5 text-emerald-900">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="font-semibold">
              {language === 'hi' ? '100% प्राकृतिक सोझत ऑर्गेनिक कोन' : '100% Organic Certified Henna Cones'}
            </span>
          </div>
          <span className="text-emerald-700 font-bold">{language === 'hi' ? 'निःशुल्क' : 'Included (₹0)'}</span>
        </div>

        {/* Discount (if applicable) */}
        {calculation.discount > 0 && (
          <div className="flex justify-between items-start pt-2 text-rose-800">
            <div>
              <div className="font-bold flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-rose-700" />
                <span>{calculation.discountNote}</span>
              </div>
              <span className="text-[11px] text-rose-600">
                {language === 'hi' ? 'प्रोमो डिस्काउंट लागू' : 'Special promo discount'}
              </span>
            </div>
            <span className="font-extrabold text-sm">
              -{formatINR(calculation.discount)}
            </span>
          </div>
        )}

        {/* Final Total */}
        <div className="pt-3 border-t-2 border-stone-800">
          <div className="flex justify-between items-baseline">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-stone-500 block">
                {language === 'hi' ? 'अंतिम तय कुल मूल्य' : 'Final Guaranteed Total'}
              </span>
              <span className="text-[11px] text-stone-400">
                {language === 'hi' ? 'सभी कर व होम-विजिट शुल्क सहित' : 'All taxes & local home-service included'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-2xl sm:text-3xl font-extrabold text-rose-950">
                {formatINR(calculation.finalTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* Transparent Advance Payment Plan */}
        <div className="pt-3 grid grid-cols-2 gap-2 text-center bg-stone-50 -mx-5 -mb-5 p-4 border-t border-stone-200">
          <div className="p-2 bg-white rounded-xl border border-stone-200">
            <span className="text-[10px] text-stone-500 uppercase font-bold block">
              {language === 'hi' ? 'तारीख लॉक हेतु 20% टोकन' : '20% Date-Lock Advance'}
            </span>
            <span className="text-base font-extrabold text-stone-900">
              {formatINR(calculation.advanceToLock)}
            </span>
            <span className="block text-[10px] text-emerald-700 mt-0.5">
              {language === 'hi' ? 'बुकिंग के समय (डेमो)' : 'Payable to lock slot'}
            </span>
          </div>

          <div className="p-2 bg-white rounded-xl border border-stone-200">
            <span className="text-[10px] text-stone-500 uppercase font-bold block">
              {language === 'hi' ? 'शेष 80% बकाया' : '80% Balance on Completion'}
            </span>
            <span className="text-base font-extrabold text-stone-900">
              {formatINR(calculation.balanceOnCompletion)}
            </span>
            <span className="block text-[10px] text-stone-500 mt-0.5">
              {language === 'hi' ? 'मेहंदी लगने के बाद' : 'After mehndi is applied'}
            </span>
          </div>
        </div>
      </div>

      {/* Lock Booking CTA Button if enabled */}
      {showLockAction && onLockBooking && (
        <div className="p-4 bg-stone-50 border-t border-stone-200">
          <button
            onClick={onLockBooking}
            className="w-full py-3 bg-gradient-to-r from-rose-800 to-amber-700 hover:from-rose-900 hover:to-amber-800 text-white font-bold rounded-xl text-sm shadow-md shadow-rose-950/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <span>
              {language === 'hi'
                ? `इस पारदर्शी मूल्य पर तारीख लॉक करें (${formatINR(calculation.finalTotal)})`
                : `Date-Lock at this Exact Price (${formatINR(calculation.finalTotal)})`}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
