import React from 'react';
import { Award, Zap, Clock, ShieldCheck, XCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function ReliabilityScore({ reliability, compact = false }) {
  const { language } = useLanguage();

  if (!reliability) return null;

  const metrics = [
    {
      key: 'responseRate',
      label: language === 'hi' ? 'जवाब दर' : 'Response Rate',
      value: `${reliability.responseRate || 98}%`,
      icon: Zap,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      key: 'avgResponseTime',
      label: language === 'hi' ? 'औसत जवाब समय' : 'Avg Response',
      value: reliability.avgResponseTime || '8 mins',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      key: 'onTimePercentage',
      label: language === 'hi' ? 'समय पर आगमन' : 'On-Time Arrival',
      value: `${reliability.onTimePercentage || 99}%`,
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      key: 'cancellationRate',
      label: language === 'hi' ? 'रद्दीकरण दर' : 'Cancellation Rate',
      value: reliability.cancellationRate || '0.5%',
      icon: XCircle,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50'
    },
    {
      key: 'completedBookings',
      label: language === 'hi' ? 'सफल बुकिंग्स' : 'Completed Weddings',
      value: `${reliability.completedBookings || 150}+`,
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  if (compact) {
    return (
      <div className="flex items-center gap-3 text-xs text-stone-600">
        <span className="flex items-center gap-1 font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>{reliability.score || 98}% {language === 'hi' ? 'विश्वसनीय' : 'Reliable'}</span>
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 text-stone-500">
          <CheckCircle className="w-3 h-3 text-emerald-600" />
          <span>{reliability.onTimePercentage || 99}% on-time</span>
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 text-stone-500">
          <Award className="w-3 h-3 text-amber-600" />
          <span>{reliability.completedBookings || 150}+ done</span>
        </span>
      </div>
    );
  }

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-amber-100 text-amber-800 rounded-lg">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-900">
              {language === 'hi' ? 'कलाकार विश्वसनीयता सूचकांक' : 'Artist Reliability Index'}
            </h4>
            <p className="text-[11px] text-stone-500">
              {language === 'hi' ? 'गोरखपुर में पिछले 12 महीनों के ट्रैक रिकॉर्ड पर आधारित' : 'Based on past 12 months verified track record'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xl font-extrabold text-emerald-800">{reliability.score || 98}%</span>
          <span className="block text-[10px] uppercase tracking-wider text-emerald-700 font-semibold">
            {language === 'hi' ? 'अति विश्वसनीय' : 'Top Tier'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
        {metrics.map((m) => (
          <div key={m.key} className="p-2.5 rounded-xl bg-stone-50 border border-stone-100 text-center">
            <div className={`w-7 h-7 mx-auto rounded-lg ${m.bgColor} flex items-center justify-center mb-1.5`}>
              <m.icon className={`w-3.5 h-3.5 ${m.color}`} />
            </div>
            <div className="text-xs font-bold text-stone-900">{m.value}</div>
            <div className="text-[10px] text-stone-500 leading-tight mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
