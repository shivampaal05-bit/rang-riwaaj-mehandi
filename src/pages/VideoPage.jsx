import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Video as VideoIcon, Play, Sparkles, Clock, Eye, 
  X, CheckCircle2, ShieldCheck, ArrowRight, Volume2, VolumeX
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const VIDEO_ITEMS = [
  {
    id: 'v1',
    title: 'Bridal Full Hand Live Speed & Precision Timelapse',
    hindiTitle: 'ब्राइडल फुल हैंड लाइव स्पीड व प्रिसिजन टाइमलैप्स',
    category: 'Timelapse',
    hindiCategory: 'टाइमलैप्स',
    thumbnail: '/images/hero_bridal_mehndi.jpg',
    duration: '1:45',
    views: '4.8k Views',
    artist: 'Pooja Verma',
    locality: 'Betiahata, Gorakhpur',
    description: 'Watch how intricate Radha Krishna motifs and lotus jaal are applied with flawless consistency and steady hand precision.'
  },
  {
    id: 'v2',
    title: 'Bride Reaction & 48-Hour Dark Organic Stain Reveal',
    hindiTitle: 'दुल्हन का रिएक्शन व 48 घंटे बाद गहरा डार्क स्टेन',
    category: 'Stain Reveal',
    hindiCategory: 'कलर स्टेन',
    thumbnail: '/images/portrait_mehndi_art.jpg',
    duration: '0:58',
    views: '8.2k Views',
    artist: 'Neha Gupta',
    locality: 'Golghar, Gorakhpur',
    description: 'Real client reaction in Mohaddipur upon removing dried crust. 100% organic Sojat henna delivering rich mahogany bridal colour.'
  },
  {
    id: 'v3',
    title: 'Royal Feet Payal Border Live Application Demo',
    hindiTitle: 'रॉयल पैरों की मेंहदी पायल बॉर्डर लाइव डेमो',
    category: 'Feet Henna',
    hindiCategory: 'पैरों की मेंहदी',
    thumbnail: '/images/feet_bridal_mehndi.jpg',
    duration: '2:15',
    views: '3.6k Views',
    artist: 'Ritu Singh',
    locality: 'Taramandal, Gorakhpur',
    description: 'Delicate arching payal straps, auspicious floral mandala, and toe ring accents created in real time.'
  },
  {
    id: 'v4',
    title: 'Modern Khafif Backhand Flow in 15 Minutes',
    hindiTitle: 'मॉडर्न खफीफ बैकहैंड बेल मात्र 15 मिनट में',
    category: 'Timelapse',
    hindiCategory: 'टाइमलैप्स',
    thumbnail: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    duration: '1:12',
    views: '6.1k Views',
    artist: 'Pooja Verma',
    locality: 'Betiahata, Gorakhpur',
    description: 'Quick bridesmaid styling technique showing smooth diagonal flow without smudging or breaking lines.'
  },
  {
    id: 'v5',
    title: 'Traditional Marwari Jaali Pattern Demonstration',
    hindiTitle: 'पारंपरिक मारवाड़ी जाली पैटर्न प्रदर्शन',
    category: 'Traditional',
    hindiCategory: 'पारंपरिक',
    thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    duration: '3:05',
    views: '5.4k Views',
    artist: 'Sunita Maurya',
    locality: 'Shahpur, Gorakhpur',
    description: 'Master artisan demonstrating geometric symmetry and delicate line weight control for wedding ceremonies.'
  },
  {
    id: 'v6',
    title: 'How Organic Cones are Filtered & Mixed with Oils',
    hindiTitle: 'ऑर्गेनिक कोन कैसे तैयार और फ़िल्टर किए जाते हैं',
    category: 'Behind the Scenes',
    hindiCategory: 'पर्दे के पीछे',
    thumbnail: '/images/hero_bridal_mehndi.jpg',
    duration: '2:40',
    views: '9.3k Views',
    artist: 'Rang Riwaaz Studio',
    locality: 'Gorakhpur Safety Hub',
    description: 'Zero chemicals, zero PPD. Pure Rajasthani henna leaves, eucalyptus, and tea tree oil batch preparation.'
  }
];

const VIDEO_CATEGORIES = [
  { id: 'All', labelEn: 'All Videos', labelHi: 'सभी वीडियो' },
  { id: 'Timelapse', labelEn: 'Design Timelapses', labelHi: 'टाइमलैप्स' },
  { id: 'Stain Reveal', labelEn: 'Stain Reveals', labelHi: 'कलर स्टेन' },
  { id: 'Feet Henna', labelEn: 'Feet Henna Demos', labelHi: 'पैरों की मेंहदी' },
  { id: 'Behind the Scenes', labelEn: 'Behind The Scenes', labelHi: 'पर्दे के पीछे' },
];

export default function VideoPage() {
  const { language } = useLanguage();
  const isHi = language === 'hi';
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const filteredVideos = selectedCategory === 'All'
    ? VIDEO_ITEMS
    : VIDEO_ITEMS.filter(v => v.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#fdfbf7] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#163820]/10 border border-[#163820]/20 text-[#163820] text-xs font-bold uppercase tracking-wider">
            <VideoIcon className="w-3.5 h-3.5 text-[#88451b]" />
            <span>{isHi ? 'लाइव आर्टिस्ट्री वीडियो' : 'Live Henna Video Showcase'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#163820]">
            {isHi ? 'रंग रिवाज़ वीडियो शोकेस' : 'Rang Riwaaz Mehndi Videos'}
          </h1>

          <p className="text-stone-600 text-sm">
            {isHi
              ? 'देखें हमारे कलाकारों का हाथ का हुनर, ब्राइडल टाइमलैप्स और 100% प्राकृतिक हिना का गहरा रंग।'
              : 'Watch live cone artistry in motion, bridal speed timelapses, and authentic 48-hour dark stain results.'}
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {VIDEO_CATEGORIES.map((cat) => (
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

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => {
                setActiveVideo(video);
                setIsPlaying(true);
              }}
              className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-16/9 bg-stone-900 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />

                {/* Video Play Button Pulse */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-13 h-13 rounded-full bg-[#c59b4e] text-[#163820] flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform ring-4 ring-white/30">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2.5 right-2.5 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{video.duration}</span>
                </div>

                {/* Category Pill */}
                <div className="absolute top-2.5 left-2.5 bg-[#163820]/90 text-[#fbf2dc] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#c59b4e]/30">
                  {isHi ? video.hindiCategory : video.category}
                </div>
              </div>

              {/* Video Content */}
              <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                <div className="space-y-1.5">
                  <h3 className="font-bold text-stone-900 text-sm line-clamp-1 group-hover:text-[#163820] transition-colors">
                    {isHi ? video.hindiTitle : video.title}
                  </h3>
                  <p className="text-stone-500 text-xs line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-medium">
                  <span className="text-[#88451b] font-bold">{video.artist} • {video.locality}</span>
                  <span>{video.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Player Modal */}
        {activeVideo && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="bg-stone-900 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-700 animate-in zoom-in-95 duration-200 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Simulated Video Player */}
              <div className="relative aspect-16/9 bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={activeVideo.thumbnail}
                  alt={activeVideo.title}
                  className="w-full h-full object-cover opacity-60"
                />

                {/* Simulated Player Controls Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/80 via-transparent to-black/60">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold bg-[#c59b4e] text-[#163820] px-2.5 py-0.5 rounded-full uppercase">
                      {isHi ? activeVideo.hindiCategory : activeVideo.category}
                    </span>
                    <button
                      onClick={() => setActiveVideo(null)}
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-16 h-16 rounded-full bg-[#c59b4e] text-[#163820] flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
                    >
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </button>
                  </div>

                  {/* Player Progress Bar */}
                  <div className="space-y-2">
                    <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#c59b4e] h-full w-2/5 rounded-full animate-pulse" />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-stone-300">
                      <span>0:42 / {activeVideo.duration}</span>
                      <span className="text-[#edd096] font-bold">1080p HD • Rang Riwaaz Original</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details & Action */}
              <div className="p-6 bg-stone-900 space-y-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-white">
                    {isHi ? activeVideo.hindiTitle : activeVideo.title}
                  </h2>
                  <p className="text-stone-400 text-xs leading-relaxed">
                    {activeVideo.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-800">
                  <div className="text-xs text-stone-300">
                    <span className="font-semibold text-white">{activeVideo.artist}</span> ({activeVideo.locality})
                  </div>
                  <Link
                    to="/search"
                    className="px-4 py-2 rounded-xl bg-[#c59b4e] hover:bg-[#b5893d] text-[#163820] font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{isHi ? 'इस आर्टिस्ट को बुक करें' : 'Book This Artist'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
