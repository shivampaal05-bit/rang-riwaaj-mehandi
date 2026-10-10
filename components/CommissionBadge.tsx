import React from 'react';
import { ArtistTier } from '@/types/marketplace';
import { getTierBadgeInfo } from '@/lib/commission-calculator';
import { ShieldCheck, Award, Sparkles } from 'lucide-react';

interface CommissionBadgeProps {
  tier: ArtistTier;
  customRate?: number;
  size?: 'sm' | 'md';
}

export default function CommissionBadge({
  tier,
  customRate,
  size = 'md',
}: CommissionBadgeProps) {
  const info = getTierBadgeInfo(tier);
  const rateToDisplay = typeof customRate === 'number' ? customRate : info.rate;

  const Icon = tier === 'bridal' ? Sparkles : tier === 'top_rated' ? Award : ShieldCheck;

  if (size === 'sm') {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${info.color}`}
        title={`${info.label}: ${rateToDisplay}% platform commission`}
      >
        <Icon className="w-3 h-3" />
        <span>{tier === 'bridal' ? 'Bridal (15%)' : tier === 'top_rated' ? 'Elite (12%)' : 'Regular (10%)'}</span>
      </span>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold border ${info.color}`}>
      <Icon className="w-3.5 h-3.5" />
      <span>{info.shortLabel}</span>
      <span className="text-[10px] opacity-75 font-normal">
        • Fee: {rateToDisplay}%
      </span>
    </div>
  );
}
