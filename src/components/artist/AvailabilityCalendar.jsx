import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, Clock, XCircle, ShieldAlert, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { TIME_SLOTS } from '../../data/mockLocalities';

export default function AvailabilityCalendar({
  artist,
  selectedDate,
  onSelectDate,
  selectedSlot = 'evening',
  onSelectSlot,
  onBookNow
}) {
  const { language } = useLanguage();

  // Current view year & month (Defaulting to October 2026 for high wedding season in our dataset)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(9); // 0-indexed: 9 = October

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const hindiMonthNames = [
    'जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
    'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun

  const dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const hindiDayLabels = ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonth(m => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonth(m => m + 1);
    }
  };

  const formatDateStr = (day) => {
    const m = (currentMonth + 1).toString().padStart(2, '0');
    const d = day.toString().padStart(2, '0');
    return `${currentYear}-${m}-${d}`;
  };

  const getDayStatus = (dateStr) => {
    const slots = artist?.availability?.[dateStr];
    if (!slots) return 'available'; // default open

    const vals = Object.values(slots);
    if (vals.every(v => v === 'booked')) return 'booked';
    if (vals.some(v => v === 'booked')) return 'partial';
    if (vals.some(v => v === 'pending')) return 'pending';
    return 'available';
  };

  const activeDateStr = selectedDate || formatDateStr(new Date().getDate());
  const activeDaySlots = artist?.availability?.[activeDateStr] || {
    morning: 'available',
    afternoon: 'available',
    evening: 'available',
    night: 'available'
  };

  return (
    <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-4 sm:p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-rose-100 text-rose-800 rounded-xl">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-bold text-stone-900">
              {language === 'hi' ? 'कलाकार उपलब्धता कैलेंडर' : 'Real-Time Availability Calendar'}
            </h4>
            <p className="text-xs text-stone-500">
              {language === 'hi' ? 'सख्त डेट-लॉकिंग: एक तारीख पर कोई दोहरा आरक्षण नहीं' : 'Strict date-locking: no double bookings allowed'}
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="hidden sm:flex items-center gap-2 text-[11px] font-medium">
          <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            {language === 'hi' ? 'उपलब्ध' : 'Available'}
          </span>
          <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            {language === 'hi' ? 'प्रतीक्षारत' : 'Pending'}
          </span>
          <span className="flex items-center gap-1 text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            {language === 'hi' ? 'बुक (लॉक)' : 'Booked'}
          </span>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between bg-stone-50 rounded-xl p-2 border border-stone-200">
        <button
          onClick={prevMonth}
          className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
          aria-label="Previous Month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <span className="font-bold text-stone-800 text-sm sm:text-base">
          {language === 'hi' ? hindiMonthNames[currentMonth] : monthNames[currentMonth]} {currentYear}
        </span>

        <button
          onClick={nextMonth}
          className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
          aria-label="Next Month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div>
        <div className="grid grid-cols-7 text-center font-semibold text-xs text-stone-400 mb-1">
          {(language === 'hi' ? hindiDayLabels : dayLabels).map((d, i) => (
            <div key={i} className="py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-xs">
          {/* Empty prefix cells */}
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="h-10 sm:h-11" />
          ))}

          {/* Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const dateStr = formatDateStr(dayNum);
            const status = getDayStatus(dateStr);
            const isSelected = activeDateStr === dateStr;

            return (
              <button
                key={dateStr}
                onClick={() => onSelectDate && onSelectDate(dateStr)}
                className={`h-10 sm:h-11 rounded-xl p-1 flex flex-col items-center justify-between border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'border-rose-600 bg-rose-50 text-rose-950 font-bold ring-2 ring-rose-500/20'
                    : 'border-stone-100 hover:border-stone-300 bg-white text-stone-700'
                }`}
              >
                <span className="text-[11px] sm:text-xs">{dayNum}</span>
                <div className="flex items-center gap-0.5">
                  {status === 'available' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Available" />
                  )}
                  {status === 'partial' && (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    </>
                  )}
                  {status === 'pending' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title="Pending" />
                  )}
                  {status === 'booked' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" title="Full Day Booked" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Slots Breakdown */}
      <div className="bg-[#fcfaf7] border border-amber-200/60 rounded-xl p-3.5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-stone-800">
            {language === 'hi' ? 'चयनित तारीख:' : 'Selected Date:'} <span className="text-rose-900 font-extrabold">{activeDateStr}</span>
          </span>
          <span className="text-[11px] text-stone-500">
            {language === 'hi' ? 'समय स्लॉट की स्थिति:' : 'Slot Availability:'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {TIME_SLOTS.map((slot) => {
            const slotStatus = activeDaySlots[slot.id] || 'available';
            const isSlotActive = selectedSlot === slot.id;
            const isBooked = slotStatus === 'booked';
            const isPending = slotStatus === 'pending';

            return (
              <button
                key={slot.id}
                disabled={isBooked}
                onClick={() => onSelectSlot && onSelectSlot(slot.id)}
                className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  isBooked
                    ? 'bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed opacity-60'
                    : isSlotActive
                    ? 'bg-rose-900 text-white border-rose-950 shadow-sm'
                    : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold">
                    {language === 'hi' ? slot.hindiLabel : slot.label}
                  </div>
                  <div className={`text-[10px] mt-0.5 flex items-center gap-1 ${
                    isSlotActive ? 'text-amber-200' : isBooked ? 'text-rose-600' : isPending ? 'text-amber-600' : 'text-emerald-600'
                  }`}>
                    {isBooked ? (
                      <>
                        <XCircle className="w-3 h-3" />
                        <span>{language === 'hi' ? 'आरक्षित (लॉक)' : 'Booked (Locked)'}</span>
                      </>
                    ) : isPending ? (
                      <>
                        <Clock className="w-3 h-3" />
                        <span>{language === 'hi' ? 'प्रतीक्षारत' : 'Pending Inquiry'}</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{language === 'hi' ? 'उपलब्ध (तारीख लॉक करें)' : 'Available to Date-Lock'}</span>
                      </>
                    )}
                  </div>
                </div>

                {isSlotActive && !isBooked && (
                  <span className="text-[10px] bg-amber-400 text-rose-950 font-bold px-2 py-0.5 rounded-full shrink-0">
                    {language === 'hi' ? 'चयनित' : 'Selected'}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {onBookNow && (
          <div className="pt-2">
            <button
              onClick={() => onBookNow(activeDateStr, selectedSlot)}
              className="w-full py-3 bg-gradient-to-r from-rose-800 to-amber-700 hover:from-rose-900 hover:to-amber-800 text-white font-bold rounded-xl text-sm shadow-md shadow-rose-950/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>
                {language === 'hi'
                  ? `${activeDateStr} के लिए तारीख लॉक करें`
                  : `Date-Lock This Artist for ${activeDateStr}`}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
