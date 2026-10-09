import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Home, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function NotFoundPage() {
  const { language } = useLanguage();

  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-rose-100 text-rose-900 flex items-center justify-center mx-auto shadow-md">
        <Sparkles className="w-8 h-8 text-rose-800" />
      </div>

      <div className="space-y-2">
        <span className="text-4xl font-extrabold text-stone-900 font-mono">404</span>
        <h1 className="text-xl font-bold text-stone-900 m-0">
          {language === 'hi' ? 'पेज नहीं मिला' : 'Page Not Found'}
        </h1>
        <p className="text-xs text-stone-500">
          {language === 'hi'
            ? 'जो पेज आप ढूंढ रहे हैं वह मौजूद नहीं है या हटा दिया गया है।'
            : 'The page you are looking for does not exist or has been moved.'}
        </p>
      </div>

      <div className="pt-2 flex justify-center gap-3">
        <Link
          to="/"
          className="py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Home className="w-4 h-4" />
          <span>{language === 'hi' ? 'होम पेज' : 'Back to Home'}</span>
        </Link>
        <Link
          to="/search"
          className="py-2.5 px-4 bg-rose-800 hover:bg-rose-900 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <span>{language === 'hi' ? 'कलाकार खोजें' : 'Browse Artists'}</span>
        </Link>
      </div>
    </div>
  );
}
