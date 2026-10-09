import React, { useState } from 'react';
import { calculateEventPlan } from '../../utils/planner';
import { Users, Clock, Calendar, AlertCircle, Sparkles, CheckCircle2, ChevronRight, UserCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function EventTimePlanner({ initialBride = 1, initialGroom = 1, initialGuests = 12 }) {
  const { language } = useLanguage();

  const [brideCount, setBrideCount] = useState(initialBride);
  const [groomCount, setGroomCount] = useState(initialGroom);
  const [guestCount, setGuestCount] = useState(initialGuests);
  const [guestHandSides, setGuestHandSides] = useState(1);
  const [eventStartTime, setEventStartTime] = useState('18:00'); // 6:00 PM
  const [dryingBufferHours, setDryingBufferHours] = useState(1.5);
  const [applicationSpeed, setApplicationSpeed] = useState('normal');

  const plan = calculateEventPlan({
    brideCount,
    groomCount,
    guestCount,
    guestHandSides,
    eventStartTime,
    dryingBufferHours,
    applicationSpeed
  });

  return (
    <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-stone-900 to-amber-950 text-white p-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-500/20 border border-amber-400/40 rounded-xl text-amber-300">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold">
              {language === 'hi' ? 'स्मार्ट इवेंट टाइम व कलाकार क्षमता प्लानर' : 'Smart Event Time & Artist Capacity Planner'}
            </h3>
            <p className="text-xs text-stone-300">
              {language === 'hi'
                ? 'शादी में दुल्हन की स्टेज एंट्री में कोई देरी न हो, इसके लिए सटीक समय व कलाकार गणना'
                : 'Scientific calculation to ensure bride & guests are stage-ready on time with dry henna'}
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {/* Input Parameters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-stone-50/70 p-4 rounded-2xl border border-stone-200">
          {/* Bride Count */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 block">
              {language === 'hi' ? 'दुल्हन संख्या' : 'Bride Count'}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="3"
                value={brideCount}
                onChange={(e) => setBrideCount(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800"
              />
            </div>
            <span className="text-[10px] text-stone-400">
              {language === 'hi' ? '~4.5 घंटे विस्तृत कार्य' : '~4.5 hrs intricate work'}
            </span>
          </div>

          {/* Groom Count */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 block">
              {language === 'hi' ? 'दूल्हा संख्या' : 'Groom Count'}
            </label>
            <input
              type="number"
              min="0"
              max="2"
              value={groomCount}
              onChange={(e) => setGroomCount(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800"
            />
            <span className="text-[10px] text-stone-400">
              {language === 'hi' ? '~45 मिनट शगुन कला' : '~45 mins shagun art'}
            </span>
          </div>

          {/* Guest Count */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 block">
              {language === 'hi' ? 'परिवार व मेहमान संख्या' : 'Family & Guests'}
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={guestCount}
              onChange={(e) => setGuestCount(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800"
            />
            <div className="flex items-center gap-2 mt-1">
              <label className="text-[10px] text-stone-500 flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="guestSides"
                  checked={guestHandSides === 1}
                  onChange={() => setGuestHandSides(1)}
                  className="text-rose-800"
                />
                1 {language === 'hi' ? 'हथेली' : 'side'}
              </label>
              <label className="text-[10px] text-stone-500 flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="guestSides"
                  checked={guestHandSides === 2}
                  onChange={() => setGuestHandSides(2)}
                  className="text-rose-800"
                />
                2 {language === 'hi' ? 'हथेलियां' : 'sides'}
              </label>
            </div>
          </div>

          {/* Event Start Time */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 block">
              {language === 'hi' ? 'समारोह प्रारंभ समय' : 'Function Start Time'}
            </label>
            <input
              type="time"
              value={eventStartTime}
              onChange={(e) => setEventStartTime(e.target.value)}
              className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-800"
            />
            <span className="text-[10px] text-stone-400">
              {language === 'hi' ? 'संगीत या स्टेज एंट्री का समय' : 'Stage entry / party time'}
            </span>
          </div>
        </div>

        {/* Calculated Results Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Artists Required */}
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-center">
            <div className="w-10 h-10 mx-auto rounded-full bg-rose-200 text-rose-900 flex items-center justify-center mb-2">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-950">
              {plan.totalArtists}
            </div>
            <div className="text-xs font-bold text-stone-800 mt-1">
              {language === 'hi' ? 'आवश्यक कलाकार' : 'Artists Required'}
            </div>
            <div className="text-[10px] text-stone-500 mt-0.5">
              1 {language === 'hi' ? 'मुख्य दुल्हन' : 'Lead'} + {plan.assistantArtists} {language === 'hi' ? 'सहायक' : 'Assistants'}
            </div>
          </div>

          {/* Estimated Duration */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
            <div className="w-10 h-10 mx-auto rounded-full bg-amber-200 text-amber-900 flex items-center justify-center mb-2">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-950">
              {plan.estimatedDurationHours} {language === 'hi' ? 'घंटे' : 'hrs'}
            </div>
            <div className="text-xs font-bold text-stone-800 mt-1">
              {language === 'hi' ? 'लगाने की कुल अवधि' : 'Estimated Duration'}
            </div>
            <div className="text-[10px] text-stone-500 mt-0.5">
              {language === 'hi' ? 'समानांतर काम के साथ' : 'With parallel team'}
            </div>
          </div>

          {/* Recommended Arrival Time */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
            <div className="w-10 h-10 mx-auto rounded-full bg-emerald-200 text-emerald-900 flex items-center justify-center mb-2">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-950 truncate">
              {plan.recommendedArrivalTime}
            </div>
            <div className="text-xs font-bold text-stone-800 mt-1">
              {language === 'hi' ? 'आगमन का सही समय' : 'Recommended Arrival'}
            </div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
              {language === 'hi' ? 'वेन्यू पर कलाकार रिपोर्टिंग' : 'Artist on-site call time'}
            </div>
          </div>

          {/* Buffer Time */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">
            <div className="w-10 h-10 mx-auto rounded-full bg-blue-200 text-blue-900 flex items-center justify-center mb-2">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-950">
              {plan.dryingBufferHours} {language === 'hi' ? 'घंटे' : 'hrs'}
            </div>
            <div className="text-xs font-bold text-stone-800 mt-1">
              {language === 'hi' ? 'सूखने का बफर समय' : 'Drying & Care Buffer'}
            </div>
            <div className="text-[10px] text-stone-500 mt-0.5">
              {language === 'hi' ? 'नींबू-लौंग सीलर व सुरक्षा' : 'Lemon-sugar & stain set'}
            </div>
          </div>
        </div>

        {/* Schedule Milestones Timeline */}
        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-rose-800" />
            <span>{language === 'hi' ? 'समारोह की आदर्श समय सारणी' : 'Step-by-Step Wedding Event Schedule'}</span>
          </h4>

          <div className="bg-white rounded-xl border border-stone-200 divide-y divide-stone-100 overflow-hidden">
            {plan.scheduleMilestones.map((m, idx) => (
              <div key={idx} className="p-3.5 flex items-start gap-3 hover:bg-stone-50 transition-colors">
                <span className="font-mono text-xs font-extrabold text-rose-900 bg-rose-50 px-2 py-1 rounded-md border border-rose-200 shrink-0">
                  {m.time}
                </span>
                <div className="min-w-0">
                  <h5 className="text-xs sm:text-sm font-bold text-stone-900">
                    {language === 'hi' ? m.hindiTitle : m.title}
                  </h5>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
