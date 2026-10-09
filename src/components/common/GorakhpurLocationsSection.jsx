import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowUpRight, Sparkles, Navigation } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const SELECTED_GORAKHPUR_LOCATIONS = [
  {
    id: 'baraipar_mod',
    name: 'Baraipar Mod (Center Hub)',
    hindiName: 'बरईपार मोड़ (मुख्य केंद्र)',
    landmark: 'Main Studio & Center Hub',
    hindiLandmark: 'मुख्य स्टूडियो व बेस केंद्र',
    distance: '0 km (Center)',
    isCenter: true
  },
  {
    id: 'kauriram',
    name: 'Kauriram',
    hindiName: 'कौड़ीराम',
    landmark: 'Kauriram Bazar & Block',
    hindiLandmark: 'कौड़ीराम बाजार',
    distance: '4.5 km'
  },
  {
    id: 'belipar',
    name: 'Belipar',
    hindiName: 'बेलीपार',
    landmark: 'Belipar Thana & Highway Market',
    hindiLandmark: 'बेलीपार थाना व हाईवे',
    distance: '5.5 km'
  },
  {
    id: 'mahavir_chapra',
    name: 'Mahavir Chapra',
    hindiName: 'महावीर छपरा',
    landmark: 'Mahavir Chapra Bazar',
    hindiLandmark: 'महावीर छपरा बाजार',
    distance: '9.5 km'
  },
  {
    id: 'naushad',
    name: 'Naushad',
    hindiName: 'नौसढ़',
    landmark: 'Naushad Chauraha / Transport Hub',
    hindiLandmark: 'नौसढ़ चौराहा',
    distance: '14.0 km'
  },
  {
    id: 'taramandal',
    name: 'Taramandal (Nauka Vihar)',
    hindiName: 'तारामंडल (नौका विहार)',
    landmark: 'Nauka Vihar & Lake Zone',
    hindiLandmark: 'नौका विहार क्षेत्र',
    distance: '17.5 km'
  },
  {
    id: 'mohadipur',
    name: 'Mohaddipur',
    hindiName: 'मोहाद्दीपुर',
    landmark: 'Near Radisson & Bus Stand',
    hindiLandmark: 'होटल रेडिसन रोड',
    distance: '21.0 km'
  },
  {
    id: 'betiahata',
    name: 'Betiahata',
    hindiName: 'बेतियाहाता',
    landmark: 'Near Shastri Chowk',
    hindiLandmark: 'शास्त्री चौक',
    distance: '21.5 km'
  },
  {
    id: 'golghar',
    name: 'Golghar (City Center)',
    hindiName: 'गोलघर (नगर केंद्र)',
    landmark: 'Gorakhpur City Center',
    hindiLandmark: 'सिटी सेंटर चौराहा',
    distance: '23.0 km'
  },
  {
    id: 'shahpur',
    name: 'Shahpur',
    hindiName: 'शाहपुर',
    landmark: 'Gita Vatika Sector',
    hindiLandmark: 'गीता वाटिका क्षेत्र',
    distance: '25.0 km'
  },
  {
    id: 'asuran',
    name: 'Asuran Chowk',
    hindiName: 'असुरन चौक',
    landmark: 'Medical Road Junction',
    hindiLandmark: 'मेडिकल जंक्शन',
    distance: '26.0 km'
  },
  {
    id: 'rapti_nagar',
    name: 'Rapti Nagar (Phase 1-4)',
    hindiName: 'राप्ती नगर (फेज 1-4)',
    landmark: 'Residential Blocks',
    hindiLandmark: 'आवासीय कॉलोनी',
    distance: '27.0 km'
  },
  {
    id: 'medical_road',
    name: 'Medical College Road (BRD)',
    hindiName: 'मेडिकल कॉलेज रोड (बीआरडी)',
    landmark: 'BRD Medical Campus',
    hindiLandmark: 'बीआरडी परिसर',
    distance: '28.5 km'
  }
];

export default function GorakhpurLocationsSection() {
  const { language } = useLanguage();
  const isHi = language === 'hi';

  return (
    <section className="bg-[#fcfaf5] border-t border-[#e8decb] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#c59b4e]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#163820]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#163820]/10 border border-[#163820]/20 text-[#163820] text-xs font-bold uppercase tracking-wider">
              <Navigation className="w-3.5 h-3.5 text-[#88451b]" />
              <span>{isHi ? 'गोरखपुर सेवा क्षेत्र' : 'Gorakhpur Service Areas'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#163820]">
              {isHi ? 'गोरखपुर के सभी इलाकों में लाइव ट्रैकिंग व होम-सर्विस' : 'Track Distance & Book Artists Across Gorakhpur'}
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm max-w-2xl">
              {isHi
                ? 'हमारे मुख्य केंद्र (बरईपार मोड़) से अपने इलाके की सीधी दूरी देखें और 100% पक्की तारीख पर अनुभवी मेंहदी आर्टिस्ट बुक करें।'
                : 'All distances are measured from our Center Hub (Baraipar Mod). Click any area to check travel distance and book verified artists.'}
            </p>
          </div>

          <div className="text-xs font-semibold text-[#88451b] bg-white px-3.5 py-2 rounded-xl border border-[#ecdacb] shadow-xs shrink-0 flex items-center gap-1.5 self-start md:self-end">
            <Sparkles className="w-3.5 h-3.5 text-[#c59b4e]" />
            <span>{isHi ? 'मुख्य केंद्र: बरईपार मोड़ (0 km)' : 'Center Hub: Baraipar Mod (0 km)'}</span>
          </div>
        </div>

        {/* Location Boxes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {SELECTED_GORAKHPUR_LOCATIONS.map((loc) => (
            <Link
              key={loc.id}
              to={`/search?loc=${loc.id}`}
              className={`group relative rounded-2xl p-4 border transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col justify-between cursor-pointer ${
                loc.isCenter
                  ? 'bg-gradient-to-br from-[#163820] via-[#1b4327] to-[#0d2214] text-white border-[#c59b4e]/50 shadow-md ring-2 ring-[#c59b4e]/30'
                  : 'bg-white text-stone-900 border-[#e5dac5] shadow-xs hover:shadow-lg'
              }`}
            >
              {/* Subtle side color stripe indicator on hover */}
              <span className={`absolute left-0 top-0 bottom-0 w-1.5 transition-opacity duration-300 ${
                loc.isCenter
                  ? 'bg-[#c59b4e] opacity-100'
                  : 'bg-gradient-to-b from-[#c59b4e] via-[#88451b] to-[#163820] opacity-0 group-hover:opacity-100'
              }`} />

              {/* Soft light color wash from the side on hover */}
              {!loc.isCenter && (
                <span className="absolute inset-0 bg-gradient-to-r from-[#fbf4e8] via-[#faf7f0] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              )}

              {/* Box Content */}
              <div className="relative z-10 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                      loc.isCenter
                        ? 'bg-[#c59b4e] text-[#163820] shadow-xs font-bold'
                        : 'bg-[#faf6ee] group-hover:bg-white text-stone-500 group-hover:text-[#88451b] border border-stone-200 group-hover:border-[#c59b4e]/40'
                    }`}>
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className={`font-bold text-sm leading-snug transition-colors ${
                          loc.isCenter
                            ? 'text-white'
                            : 'text-stone-900 group-hover:text-[#163820]'
                        }`}>
                          {isHi ? loc.hindiName : loc.name}
                        </h3>
                      </div>
                      <span className={`text-[11px] block leading-tight ${
                        loc.isCenter
                          ? 'text-[#edd096] font-medium'
                          : 'text-stone-400 group-hover:text-stone-500'
                      }`}>
                        {isHi ? loc.hindiLandmark : loc.landmark}
                      </span>
                    </div>
                  </div>

                  <ArrowUpRight className={`w-4 h-4 shrink-0 mt-0.5 transition-all ${
                    loc.isCenter
                      ? 'text-[#c59b4e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                      : 'text-stone-300 group-hover:text-[#88451b] group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                  }`} />
                </div>
              </div>

              {/* Bottom distance badge */}
              <div className={`relative z-10 pt-3 mt-3 border-t flex items-center justify-between text-[11px] ${
                loc.isCenter ? 'border-white/15' : 'border-stone-100'
              }`}>
                <span className={`font-medium ${
                  loc.isCenter ? 'text-white/80' : 'text-stone-400 group-hover:text-stone-600'
                }`}>
                  {isHi ? 'बरईपार मोड़ से:' : 'From Baraipar Mod:'}
                </span>
                <span className={`font-bold px-2 py-0.5 rounded-md transition-colors ${
                  loc.isCenter
                    ? 'bg-[#c59b4e] text-[#163820] shadow-xs'
                    : 'bg-stone-50 group-hover:bg-[#163820]/10 text-[#163820]'
                }`}>
                  {loc.distance}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
