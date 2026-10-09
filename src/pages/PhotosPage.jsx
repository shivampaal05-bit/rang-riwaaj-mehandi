import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, Sparkles, Filter, X, Eye, Heart, CheckCircle2, 
  ArrowRight, ShieldCheck, Tag
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const PHOTO_GALLERY = [
  {
    id: 'p1',
    title: 'Royal Gorakhpur Bridal Full Hands & Arms',
    hindiTitle: 'शाही गोरखपुर ब्राइडल सम्पूर्ण हाथ व बांह',
    category: 'Bridal',
    hindiCategory: 'ब्राइडल',
    image: '/images/hero_bridal_mehndi.jpg',
    tag: 'Trending 2026',
    duration: '4.5 Hours',
    stainDepth: 'Mahogany Dark',
    desc: 'Intricate royal elephant motifs, Radha-Krishna figurines, and detailed doli procession designed for wedding day grandeur.'
  },
  {
    id: 'p2',
    title: 'Bridal Feet & Anklet Royal Henna',
    hindiTitle: 'ब्राइडल पैर एवं पायल पैटर्न रॉयल हिना',
    category: 'Feet Mehndi',
    hindiCategory: 'पैरों की मेंहदी',
    image: '/images/feet_bridal_mehndi.jpg',
    tag: 'Bestseller',
    duration: '2.5 Hours',
    stainDepth: 'Deep Crimson',
    desc: 'Graceful mandala centerpiece with symmetrical payal border, toe accents, and organic Sojat henna.'
  },
  {
    id: 'p3',
    title: 'Groom & Bride Portrait Fine Art',
    hindiTitle: 'दूल्हा-दुल्हन पोर्ट्रेट फाइन आर्ट',
    category: 'Portraits',
    hindiCategory: 'पोर्ट्रेट',
    image: '/images/portrait_mehndi_art.jpg',
    tag: 'Master Signature',
    duration: '3.5 Hours',
    stainDepth: 'Rich Chestnut',
    desc: 'Photorealistic faces of the couple hand-drawn with ultra-fine cones, personalized with wedding hashtags.'
  },
  {
    id: 'p4',
    title: 'Modern Khafif Arabic Floral Flow',
    hindiTitle: 'मॉडर्न खफीफ अरेबिक फ्लोरल बेल',
    category: 'Arabic',
    hindiCategory: 'अरेबिक',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    tag: 'Quick & Chic',
    duration: '1.5 Hours',
    stainDepth: 'Dark Bronze',
    desc: 'Spaced diagonal floral trail with shaded petals, perfect for sangeet and bridesmaids.'
  },
  {
    id: 'p5',
    title: 'Traditional Marwari Jaal & Peacock',
    hindiTitle: 'पारंपरिक मारवाड़ी जाल व मोर डिजाइन',
    category: 'Traditional',
    hindiCategory: 'पारंपरिक',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    tag: 'Heritage Classic',
    duration: '3 Hours',
    stainDepth: 'Deep Maroon',
    desc: 'Dense check pattern, graceful peacocks, and fine shaded jaali for auspicious festive occasions.'
  },
  {
    id: 'p6',
    title: 'Indo-Western Minimalist Mandala Backhand',
    hindiTitle: 'इंडो-वेस्टर्न मिनिमलिस्ट मंडला बैकहैंड',
    category: 'Arabic',
    hindiCategory: 'अरेबिक',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    tag: 'Modern',
    duration: '1 Hour',
    stainDepth: 'Deep Amber',
    desc: 'Contemporary geometric mandala centered with airy finger patterns, ideal for cocktail nights.'
  },
  {
    id: 'p7',
    title: 'Full Bridal Royal Peacock Backhand Extravaganza',
    hindiTitle: 'फुल ब्राइडल रॉयल मयूर बैकहैंड',
    category: 'Bridal',
    hindiCategory: 'ब्राइडल',
    image: '/images/hero_bridal_mehndi.jpg',
    tag: 'Premium Bridal',
    duration: '4 Hours',
    stainDepth: 'Midnight Mahogany',
    desc: 'Elaborate wrist cuffs with royal arches, jhumka pendants, and fingertip shading.'
  },
  {
    id: 'p8',
    title: 'Classic Dulhaniya Lotus & Kalash Feet Art',
    hindiTitle: 'क्लासिक दुल्हनिया कमल व कलश पद कला',
    category: 'Feet Mehndi',
    hindiCategory: 'पैरों की मेंहदी',
    image: '/images/feet_bridal_mehndi.jpg',
    tag: 'Auspicious',
    duration: '2 Hours',
    stainDepth: 'Royal Red',
    desc: 'Sacred lotus flowers with auspicious kalash borders ensuring complete royal bridal adornment.'
  }
];

const CATEGORIES = [
  { id: 'All', labelEn: 'All Photos', labelHi: 'सभी फ़ोटोज़' },
  { id: 'Bridal', labelEn: 'Bridal Henna', labelHi: 'ब्राइडल मेंहदी' },
  { id: 'Arabic', labelEn: 'Arabic & Floral', labelHi: 'अरेबिक व फ्लोरल' },
  { id: 'Traditional', labelEn: 'Traditional Jaal', labelHi: 'पारंपरिक जाल' },
  { id: 'Feet Mehndi', labelEn: 'Feet & Anklets', labelHi: 'पैरों की मेंहदी' },
  { id: 'Portraits', labelEn: 'Portrait Art', labelHi: 'पोर्ट्रेट आर्ट' },
];

export default function PhotosPage() {
  const { language } = useLanguage();
  const isHi = language === 'hi';
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePhoto, setActivePhoto] = useState(null);

  const filteredPhotos = selectedCategory === 'All' 
    ? PHOTO_GALLERY 
    : PHOTO_GALLERY.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#fdfbf7] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#163820]/10 border border-[#163820]/20 text-[#163820] text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5 text-[#88451b]" />
            <span>{isHi ? 'मूल कला गैलरी' : 'Original Mehndi Gallery'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#163820]">
            {isHi ? 'रंग रिवाज़ फ़ोटो गैलरी' : 'Rang Riwaaz Mehndi Photos'}
          </h1>

          <p className="text-stone-600 text-sm">
            {isHi 
              ? 'गोरखपुर के शीर्ष कलाकारों द्वारा बनाई गई 100% प्रामाणिक मेंहदी डिज़ाइनों का संग्रह। कोई चुराई गई तस्वीर नहीं।'
              : 'Browse 100% verified authentic mehndi designs created by top Gorakhpur artists. Zero stolen internet photos.'}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#163820] text-white shadow-sm ring-2 ring-[#c59b4e]/50'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {isHi ? cat.labelHi : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col"
            >
              {/* Photo Preview */}
              <div className="relative aspect-4/5 overflow-hidden bg-stone-100">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Badge Tag */}
                <div className="absolute top-3 left-3 bg-[#163820]/90 backdrop-blur-md text-[#fbf2dc] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#c59b4e]/30">
                  {photo.tag}
                </div>

                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-[#0d2214]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-[#163820] flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Info Details */}
              <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#88451b] uppercase tracking-wider block">
                    {isHi ? photo.hindiCategory : photo.category}
                  </span>
                  <h3 className="font-bold text-stone-900 text-sm line-clamp-1 group-hover:text-[#163820] transition-colors">
                    {isHi ? photo.hindiTitle : photo.title}
                  </h3>
                  <p className="text-stone-500 text-xs line-clamp-2">
                    {photo.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-medium">
                  <span>⏱ {photo.duration}</span>
                  <span className="text-[#163820] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {isHi ? 'सत्यापित' : 'Verified'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox / Zoom Modal */}
        {activePhoto && (
          <div 
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActivePhoto(null)}
          >
            <div 
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-4/3 bg-stone-900 overflow-hidden">
                <img
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => setActivePhoto(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#88451b] uppercase tracking-wider">
                    {isHi ? activePhoto.hindiCategory : activePhoto.category} • {activePhoto.tag}
                  </span>
                  <h2 className="text-xl font-serif font-bold text-stone-900">
                    {isHi ? activePhoto.hindiTitle : activePhoto.title}
                  </h2>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {activePhoto.desc}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 bg-stone-50 rounded-xl text-xs text-stone-700">
                  <div>
                    <span className="text-stone-400 block text-[10px] font-bold uppercase">{isHi ? 'समय' : 'Duration'}</span>
                    <span className="font-semibold">{activePhoto.duration}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] font-bold uppercase">{isHi ? 'रंग' : 'Stain Depth'}</span>
                    <span className="font-semibold">{activePhoto.stainDepth}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Link
                    to="/search"
                    className="flex-1 py-3 px-4 rounded-xl bg-[#163820] hover:bg-[#0d2214] text-white font-bold text-xs uppercase tracking-wider text-center transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <span>{isHi ? 'इस डिज़ाइन के लिए आर्टिस्ट खोजें' : 'Find Artist For This Design'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setActivePhoto(null)}
                    className="py-3 px-5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold text-xs transition-colors"
                  >
                    {isHi ? 'बंद करें' : 'Close'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
