import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Languages } from 'lucide-react';

export default function LanguageToggle({ className = '' }) {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer shadow-sm ${
        language === 'hi'
          ? 'bg-amber-600 text-white border-amber-700 hover:bg-amber-700'
          : 'bg-stone-100 text-stone-700 border-stone-300 hover:bg-stone-200'
      } ${className}`}
      title={language === 'hi' ? 'Switch to English' : 'हिंदी में बदलें'}
      aria-label="Toggle Language"
    >
      <Languages className="w-3.5 h-3.5" />
      <span>{language === 'hi' ? 'हिंदी (Active)' : 'English'}</span>
      <span className="text-[10px] opacity-75 font-normal ml-0.5">
        {language === 'hi' ? 'EN' : 'हिं'}
      </span>
    </button>
  );
}
