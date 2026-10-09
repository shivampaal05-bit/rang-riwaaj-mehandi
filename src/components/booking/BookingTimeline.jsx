import React from 'react';
import { TIMELINE_STATES } from '../../data/mockBookings';
import { CheckCircle2, Clock, CircleDot, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function BookingTimeline({ currentStatus = 'booking_confirmed', onAdvanceStatus, isInteractive = false }) {
  const { language } = useLanguage();

  const currentIndex = TIMELINE_STATES.findIndex(s => s.id === currentStatus);
  const activeIdx = currentIndex >= 0 ? currentIndex : 3;

  return (
    <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-5 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-stone-900">
            {language === 'hi' ? 'बुकिंग प्रगति टाइमलाइन (9 चरण)' : '9-Stage Live Booking Timeline'}
          </h4>
          <p className="text-xs text-stone-500">
            {language === 'hi'
              ? 'व्हाट्सएप या फोन कॉल के भ्रम से मुक्त: हर चरण का वास्तविक स्टेटस'
              : 'Zero guesswork or anxiety: Real-time progress status at each milestone'}
          </p>
        </div>
        <span className="text-xs font-bold text-rose-900 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
          {language === 'hi' ? `चरण ${activeIdx + 1} / 9` : `Step ${activeIdx + 1} of 9`}
        </span>
      </div>

      {/* Desktop & Tablet Stepper Bar */}
      <div className="hidden lg:grid grid-cols-9 gap-1 relative">
        {/* Connecting line */}
        <div className="absolute top-4 left-6 right-6 h-0.5 bg-stone-200 -z-0" />
        <div
          className="absolute top-4 left-6 h-0.5 bg-rose-800 transition-all duration-500 -z-0"
          style={{ width: `${(activeIdx / 8) * 90}%` }}
        />

        {TIMELINE_STATES.map((step, idx) => {
          const isDone = idx < activeIdx;
          const isCurrent = idx === activeIdx;

          return (
            <div key={step.id} className="flex flex-col items-center text-center relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                  isDone
                    ? 'bg-rose-900 text-amber-300 ring-2 ring-rose-950/20'
                    : isCurrent
                    ? 'bg-amber-500 text-stone-950 ring-4 ring-amber-300/40 animate-pulse-subtle'
                    : 'bg-stone-100 text-stone-400 border border-stone-300'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-4 h-4 text-amber-300" /> : idx + 1}
              </div>

              <div className="mt-2 text-[10px] leading-tight font-semibold">
                <span className={isCurrent ? 'text-rose-900 font-bold' : isDone ? 'text-stone-800' : 'text-stone-400'}>
                  {language === 'hi' ? step.hindiTitle : step.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Vertical Stepper */}
      <div className="lg:hidden space-y-3">
        {TIMELINE_STATES.map((step, idx) => {
          const isDone = idx < activeIdx;
          const isCurrent = idx === activeIdx;

          return (
            <div key={step.id} className="flex items-start gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                  isDone
                    ? 'bg-rose-900 text-amber-300'
                    : isCurrent
                    ? 'bg-amber-500 text-stone-950 ring-2 ring-amber-300'
                    : 'bg-stone-100 text-stone-400 border border-stone-300'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${isCurrent ? 'text-rose-950 font-extrabold' : isDone ? 'text-stone-900' : 'text-stone-400'}`}>
                    {language === 'hi' ? step.hindiTitle : step.title}
                  </span>
                  {isCurrent && (
                    <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded">
                      {language === 'hi' ? 'वर्तमान स्थिति' : 'Current'}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Simulation Controls */}
      {isInteractive && onAdvanceStatus && (
        <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 bg-stone-50 -mx-5 -mb-5 p-4 rounded-b-2xl">
          <div className="flex items-center gap-1.5 text-xs text-stone-600">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>
              {language === 'hi'
                ? 'डेमो सिम्युलेटर: अगले चरण की प्रगति का परीक्षण करें'
                : 'Demo Simulator: Test progress to next milestone'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {activeIdx < TIMELINE_STATES.length - 1 ? (
              <button
                onClick={() => onAdvanceStatus(TIMELINE_STATES[activeIdx + 1].id)}
                className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
              >
                <span>
                  {language === 'hi'
                    ? `अगला चरण: ${TIMELINE_STATES[activeIdx + 1].hindiTitle}`
                    : `Next: ${TIMELINE_STATES[activeIdx + 1].title}`}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl">
                {language === 'hi' ? 'सभी 9 चरण पूर्ण!' : 'All 9 stages completed!'}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
