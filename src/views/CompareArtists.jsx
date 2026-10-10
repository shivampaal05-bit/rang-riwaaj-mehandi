import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Layers, ArrowLeft, Plus, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBooking } from '../context/BookingContext';
import CompareTable from '../components/compare/CompareTable';

export default function CompareArtists() {
  const { language } = useLanguage();
  const { artists } = useBooking();
  const [searchParams, setSearchParams] = useSearchParams();

  // Selected artist IDs (from URL or fallback to top 2 artists)
  const initialIds = searchParams.get('ids')
    ? searchParams.get('ids').split(',').filter(Boolean)
    : [artists[0]?.id, artists[1]?.id].filter(Boolean);

  const [selectedIds, setSelectedIds] = useState(initialIds);

  const comparedArtists = artists.filter(a => selectedIds.includes(a.id));
  const availableToAdd = artists.filter(a => !selectedIds.includes(a.id));

  const handleRemove = (id) => {
    const updated = selectedIds.filter(item => item !== id);
    setSelectedIds(updated);
    setSearchParams(updated.length > 0 ? { ids: updated.join(',') } : {});
  };

  const handleAdd = (id) => {
    if (selectedIds.length >= 3) {
      alert(language === 'hi' ? 'आप एक समय में अधिकतम 3 कलाकारों की तुलना कर सकते हैं।' : 'Maximum 3 artists can be compared at once.');
      return;
    }
    const updated = [...selectedIds, id];
    setSelectedIds(updated);
    setSearchParams({ ids: updated.join(',') });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div className="space-y-1 text-left">
          <Link
            to="/search"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-800 hover:text-rose-950 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'कलाकार खोज पर वापस जाएं' : 'Back to Artist Search'}</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-stone-900 m-0">
            {language === 'hi' ? 'सत्यापित कलाकारों की निष्पक्ष तुलना' : 'Side-by-Side Artist Comparison'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            {language === 'hi'
              ? 'कीमत, 5-पॉइंट सत्यापन, समयबद्धता और गोरखपुर इलाके के अनुसार सीधे तुलना करें।'
              : 'Compare transparent base rates, guest fees, 5-point verification, and on-time arrival.'}
          </p>
        </div>

        {/* Add more selector */}
        {selectedIds.length < 3 && availableToAdd.length > 0 && (
          <div className="flex items-center gap-2">
            <select
              onChange={(e) => {
                if (e.target.value) handleAdd(e.target.value);
              }}
              defaultValue=""
              className="bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-rose-800 cursor-pointer shadow-sm"
            >
              <option value="" disabled>
                + {language === 'hi' ? 'तुलना में एक और कलाकार जोड़ें' : 'Add another artist to compare'}
              </option>
              {availableToAdd.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.locality})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Comparison Table */}
      <CompareTable
        artists={comparedArtists}
        onRemoveArtist={handleRemove}
      />
    </div>
  );
}
