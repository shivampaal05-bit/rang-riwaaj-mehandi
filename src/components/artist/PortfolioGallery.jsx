import React, { useState } from 'react';
import { ShieldCheck, Clock, Calendar, Tag, CheckCircle2, ZoomIn, Eye } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import Modal from '../common/Modal';

export default function PortfolioGallery({ portfolio = [] }) {
  const { language } = useLanguage();
  const [activeItem, setActiveItem] = useState(null);

  if (!portfolio || portfolio.length === 0) {
    return (
      <div className="p-8 text-center bg-stone-50 border border-stone-200 rounded-2xl text-stone-500">
        {language === 'hi' ? 'कोई पोर्टफोलियो उपलब्ध नहीं है।' : 'No portfolio items uploaded.'}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h4 className="text-base font-bold text-stone-900">
            {language === 'hi' ? 'प्रमाणित मूल पोर्टफोलियो' : 'Certified Original Portfolio'}
          </h4>
        </div>
        <span className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          {language === 'hi' ? 'रिवर्स इमेज सर्च सत्यापित' : 'Reverse Image Verified'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {portfolio.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
          >
            {/* Image Container */}
            <div className="relative aspect-4/3 bg-stone-100 overflow-hidden cursor-pointer" onClick={() => setActiveItem(item)}>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white/90 text-stone-900 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow">
                  <ZoomIn className="w-3.5 h-3.5" />
                  {language === 'hi' ? 'बड़ा देखें' : 'View Details'}
                </span>
              </div>

              {/* Original Badge */}
              {item.isOriginal && (
                <div className="absolute top-2.5 left-2.5 bg-emerald-950/90 backdrop-blur-md text-emerald-200 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-emerald-500/40 flex items-center gap-1 shadow-sm">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>{language === 'hi' ? 'मूल प्रमाणित कला' : 'Original Work'}</span>
                </div>
              )}

              {/* Price Tag */}
              <div className="absolute bottom-2.5 right-2.5 bg-rose-950/90 backdrop-blur-md text-amber-200 text-xs font-bold px-2.5 py-1 rounded-lg border border-amber-500/30 shadow-sm">
                {item.packagePrice}
              </div>
            </div>

            {/* Meta Information */}
            <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-rose-800 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                  {item.category}
                </span>
                <h5 className="font-bold text-stone-900 text-sm mt-1.5 line-clamp-1">
                  {language === 'hi' ? (item.hindiTitle || item.title) : item.title}
                </h5>
              </div>

              <div className="text-xs text-stone-600 space-y-1.5 pt-1 border-t border-stone-100">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-stone-500">{language === 'hi' ? 'स्थान/अंग:' : 'Placement:'}</span>
                  <span className="font-semibold text-stone-800">{item.placement}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-stone-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {language === 'hi' ? 'अवधि:' : 'Duration:'}
                  </span>
                  <span className="font-medium text-stone-800">{item.duration}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-stone-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {language === 'hi' ? 'दिनांक:' : 'Applied Date:'}
                  </span>
                  <span className="text-stone-700 truncate max-w-[140px]">{item.appliedDate}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Full View */}
      {activeItem && (
        <Modal
          isOpen={!!activeItem}
          onClose={() => setActiveItem(null)}
          title={language === 'hi' ? (activeItem.hindiTitle || activeItem.title) : activeItem.title}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden aspect-16/10 bg-stone-900 max-h-[420px]">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#fcf9f5] p-3 rounded-xl border border-stone-200 text-xs">
              <div>
                <span className="text-stone-500 block text-[10px] uppercase font-bold">{language === 'hi' ? 'श्रेणी' : 'Category'}</span>
                <span className="font-bold text-stone-900">{activeItem.category}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px] uppercase font-bold">{language === 'hi' ? 'अंग / प्लेसमेंट' : 'Placement'}</span>
                <span className="font-bold text-stone-900">{activeItem.placement}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px] uppercase font-bold">{language === 'hi' ? 'लगाने की अवधि' : 'Duration'}</span>
                <span className="font-bold text-stone-900">{activeItem.duration}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px] uppercase font-bold">{language === 'hi' ? 'संबंधित पैकेज' : 'Package Price'}</span>
                <span className="font-extrabold text-rose-800">{activeItem.packagePrice}</span>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-start gap-2 text-xs text-emerald-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">
                  {language === 'hi' ? 'रंग रिवाज़ मूल कार्य गारंटी' : 'Rang Riwaaz Original Work Certification'}
                </span>
                <span className="text-[11px] text-emerald-800">
                  {language === 'hi'
                    ? `यह डिजाइन कलाकार द्वारा ${activeItem.appliedDate} को लगाया गया था। इंटरनेट या सोशल मीडिया से ली गई तस्वीरों पर प्रतिबंध है।`
                    : `Verified real client application on ${activeItem.appliedDate}. Rang Riwaaz Mehandi rejects stock/Pinterest reposts.`}
                </span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
