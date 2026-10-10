'use client';

import React from 'react';
import { SOCIAL_CONFIG } from '@/lib/social-config';

interface InstagramButtonProps {
  variant?: 'header' | 'footer' | 'contact' | 'inline';
  className?: string;
  showIconOnlyOnMobile?: boolean;
}

export default function InstagramButton({
  variant = 'header',
  className = '',
  showIconOnlyOnMobile = false,
}: InstagramButtonProps) {
  const instagramUrl = SOCIAL_CONFIG.instagramUrl;

  // Instagram Gradient SVG Icon
  const InstagramIcon = ({ size = 18 }: { size?: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <defs>
        <radialGradient id="ig-grad" cx="20%" cy="100%" r="120%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="5.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="12"
        cy="12"
        r="4.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );

  if (variant === 'header') {
    return (
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow Rang Riwaaz Mehndi on Instagram"
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-90 transition-all shadow-xs hover:scale-102 ${className}`}
      >
        <InstagramIcon size={16} />
        <span className={showIconOnlyOnMobile ? 'hidden sm:inline' : 'inline'}>
          Follow Us on Instagram
        </span>
      </a>
    );
  }

  if (variant === 'footer') {
    return (
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow Rang Riwaaz Mehndi on Instagram"
        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-90 transition-all shadow-md hover:scale-102 ${className}`}
      >
        <InstagramIcon size={18} />
        <span>Follow Us on Instagram</span>
      </a>
    );
  }

  if (variant === 'contact') {
    return (
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow Rang Riwaaz Mehndi on Instagram"
        className={`inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-extrabold text-sm text-white bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95 transition-all shadow-lg hover:scale-102 ${className}`}
      >
        <InstagramIcon size={20} />
        <span>Follow Us on Instagram (@rangriwaazmehandi)</span>
      </a>
    );
  }

  return (
    <a
      href={instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 text-xs font-bold text-[#dc2743] hover:underline ${className}`}
    >
      <InstagramIcon size={16} />
      <span>Follow Us on Instagram</span>
    </a>
  );
}
