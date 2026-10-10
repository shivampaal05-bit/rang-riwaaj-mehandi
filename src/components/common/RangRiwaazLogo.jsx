import React from 'react';

/**
 * RangRiwaazLogo - Brand Identity Component for Rang Riwaaz Mehandi
 * Matched to the official brand insignia:
 * - Henna Forest Green (#163820)
 * - Henna Terracotta Copper (#88451b)
 * - Royal Antique Gold (#c59b4e)
 * - Ivory / Cream (#faf6ee)
 */
export default function RangRiwaazLogo({
  size = 'md',
  showText = true,
  inverted = false,
  className = '',
  imageOnly = false,
}) {
  const sizeMap = {
    xs: { img: 'w-7 h-7', textTitle: 'text-base', textSub: 'text-[9px]' },
    sm: { img: 'w-9 h-9', textTitle: 'text-lg', textSub: 'text-[10px]' },
    md: { img: 'w-11 h-11', textTitle: 'text-xl', textSub: 'text-[11px]' },
    lg: { img: 'w-14 h-14', textTitle: 'text-2xl', textSub: 'text-xs' },
    xl: { img: 'w-20 h-20', textTitle: 'text-3xl', textSub: 'text-sm' },
  };

  const { img: imgSize, textTitle, textSub } = sizeMap[size] || sizeMap.md;

  const logoImage = (
    <div
      className={`relative rounded-full p-0.5 bg-gradient-to-tr from-[#b5893d] via-[#f1dcac] to-[#88451b] shadow-md ring-1 ring-[#c59b4e]/40 transition-transform duration-300 group-hover:scale-105 shrink-0 ${imgSize}`}
    >
      <img
        src="/assets/logo.png"
        alt="Rang Riwaaz Mehandi Logo"
        className="w-full h-full object-cover rounded-full bg-[#faf6ee]"
        onError={(e) => {
          e.currentTarget.src = '/images/rang_riwaaz_logo.png';
        }}
      />
      {/* Fallback Vector Emblem */}
      <div className="hidden w-full h-full rounded-full bg-[#faf6ee] items-center justify-center p-1">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <circle cx="50" cy="50" r="46" stroke="#c59b4e" strokeWidth="3" />
          <text x="32" y="62" fill="#163820" fontSize="38" fontWeight="bold" fontFamily="serif">R</text>
          <text x="52" y="62" fill="#88451b" fontSize="38" fontWeight="bold" fontFamily="serif">R</text>
        </svg>
      </div>

      {/* Subtle royal golden aura */}
      <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#c59b4e] to-[#88451b] opacity-20 blur-xs pointer-events-none group-hover:opacity-40 transition-opacity" />
    </div>
  );

  if (imageOnly || !showText) {
    return <div className={`inline-flex items-center ${className}`}>{logoImage}</div>;
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {logoImage}

      <div className="flex flex-col leading-tight select-none">
        <div className={`font-extrabold tracking-tight font-serif flex items-center gap-1 ${textTitle}`}>
          {/* Rang in Henna Forest Green */}
          <span className={inverted ? 'text-[#a3d9b1]' : 'text-[#163820]'}>
            Rang
          </span>
          {/* Riwaaz in Henna Terracotta Copper */}
          <span className={inverted ? 'text-[#f5b68a]' : 'text-[#88451b]'}>
            Riwaaz
          </span>
        </div>

        <div className={`flex items-center gap-1 font-medium tracking-wide ${textSub}`}>
          <span className={`font-bold tracking-[0.2em] uppercase text-[10px] ${inverted ? 'text-[#edd096]' : 'text-[#9c6c10]'}`}>
            MEHNDI
          </span>
          <span className={inverted ? 'text-stone-400' : 'text-stone-500'}>
            • Gorakhpur
          </span>
        </div>
      </div>
    </div>
  );
}
