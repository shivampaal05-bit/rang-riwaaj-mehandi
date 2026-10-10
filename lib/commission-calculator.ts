import { ArtistTier, MarketplaceSettings } from '@/types/marketplace';

export const DEFAULT_MARKETPLACE_SETTINGS: MarketplaceSettings = {
  id: 1,
  platformName: 'Rang Riwaaz Mehandi',
  centerHub: 'Baraipar Mod, Gorakhpur (273413)',
  defaultBridalCommission: 15.0, // 15% for Bridal Specialists
  defaultTopRatedCommission: 12.0, // 12% for Elite / Top-Rated Artists
  defaultRegularCommission: 10.0, // 10% for Guest / Regular Artists
  advanceTokenPercentage: 20.0, // 20% online advance date-lock
  minPayoutAmount: 1000.0,
  platformUpi: 'rangriwaaz@upi',
  supportPhone: '+91 94500 00100',
};

/**
 * Returns commission percentage rate according to artist tier
 */
export function getTierCommissionRate(
  tier: ArtistTier,
  customRate?: number,
  settings: MarketplaceSettings = DEFAULT_MARKETPLACE_SETTINGS
): number {
  if (typeof customRate === 'number' && customRate > 0) {
    return customRate;
  }
  switch (tier) {
    case 'bridal':
      return settings.defaultBridalCommission; // 15%
    case 'top_rated':
      return settings.defaultTopRatedCommission; // 12%
    case 'regular':
      return settings.defaultRegularCommission; // 10%
    default:
      return 15.0;
  }
}

/**
 * Calculates complete commission and payout breakdown
 */
export function calculateCommissionBreakdown({
  totalAmount,
  tier = 'bridal',
  customRate,
  settings = DEFAULT_MARKETPLACE_SETTINGS,
}: {
  totalAmount: number;
  tier?: ArtistTier;
  customRate?: number;
  settings?: MarketplaceSettings;
}) {
  const safeTotal = Math.max(0, Math.round(totalAmount));
  const rate = getTierCommissionRate(tier, customRate, settings);
  
  // Platform fee deduction
  const commissionAmount = Math.round((safeTotal * rate) / 100);
  
  // Net artist share
  const artistNetEarnings = Math.max(0, safeTotal - commissionAmount);
  
  // 20% advance token paid by customer online
  const advancePercent = settings.advanceTokenPercentage || 20;
  const advanceTokenAmount = Math.round((safeTotal * advancePercent) / 100);
  
  // 80% balance collected by artist directly at wedding venue
  const balanceCashAmount = Math.max(0, safeTotal - advanceTokenAmount);

  // Settlement reconciliation:
  // If customer pays advance token online to platform, and pays balance directly in cash to artist:
  // Artist receives: cash from client (balanceCashAmount)
  // Platform holds: advanceTokenAmount
  // Platform keeps: commissionAmount
  // Difference payable to artist from platform = advanceTokenAmount - commissionAmount
  const platformToArtistPayable = advanceTokenAmount - commissionAmount;

  return {
    totalAmount: safeTotal,
    commissionRate: rate,
    commissionAmount,
    artistNetEarnings,
    advanceTokenAmount,
    balanceCashAmount,
    platformToArtistPayable,
  };
}

/**
 * Get tier label, color chips and badge description
 */
export function getTierBadgeInfo(tier: ArtistTier) {
  switch (tier) {
    case 'bridal':
      return {
        label: 'Bridal Specialist (15% Commission)',
        shortLabel: 'Bridal Tier (15%)',
        hindiLabel: 'दुल्हन विशेषज्ञ (15% कमीशन)',
        color: 'bg-rose-50 text-rose-800 border-rose-300',
        badgeBg: 'bg-rose-700 text-white',
        rate: 15,
        perks: 'Priority Bridal Leads, Full Date-Lock Protection, Premium Henna Kit Support',
      };
    case 'top_rated':
      return {
        label: 'Top-Rated Elite (12% Commission)',
        shortLabel: 'Elite Tier (12%)',
        hindiLabel: 'टॉप-रेटेड एलिट (12% कमीशन)',
        color: 'bg-amber-50 text-amber-800 border-amber-300',
        badgeBg: 'bg-amber-600 text-white',
        rate: 12,
        perks: 'Superstar Badge, 12% Discounted Platform Fee, Fast-Track 24h Payouts',
      };
    case 'regular':
      return {
        label: 'Standard / Guest (10% Commission)',
        shortLabel: 'Regular Tier (10%)',
        hindiLabel: 'रेगुलर आर्टिस्ट (10% कमीशन)',
        color: 'bg-emerald-50 text-emerald-800 border-emerald-300',
        badgeBg: 'bg-emerald-700 text-white',
        rate: 10,
        perks: 'Lowest Platform Fee (10%), High-Volume Sangeet Bookings',
      };
  }
}

/**
 * Format Indian Rupee currency
 */
export function formatINR(val: number): string {
  if (isNaN(val)) return '₹0';
  return '₹' + Math.round(val).toLocaleString('en-IN');
}
