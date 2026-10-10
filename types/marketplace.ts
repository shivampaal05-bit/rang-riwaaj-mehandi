export type UserRole = 'customer' | 'artist' | 'admin';

export type ArtistTier = 'bridal' | 'top_rated' | 'regular';

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'artist_on_way'
  | 'service_started'
  | 'completed'
  | 'cancelled';

export type PaymentStatus =
  | 'pending'
  | 'advance_paid'
  | 'fully_paid'
  | 'refunded';

export type PayoutStatus =
  | 'pending'
  | 'approved'
  | 'settled'
  | 'rejected';

export interface VerificationBadges {
  identityVerified: boolean;
  phoneVerified: boolean;
  portfolioChecked: boolean;
  skillChecked: boolean;
  homeServiceVerified: boolean;
  isVerified?: boolean;
}

export interface ReliabilityMetrics {
  onTimePercentage: number;
  fulfillmentRate: number;
  avgArrivalEarlyMin: number;
  standbyBackupReady: boolean;
}

export interface UserProfile {
  id: string;
  email?: string;
  phone: string;
  fullName: string;
  role: UserRole;
  locality: string;
  avatarUrl?: string;
  createdAt?: string;
}

export interface ArtistProfile {
  id: string;
  name: string;
  studioName: string;
  categoryTier: ArtistTier; // 'bridal' (15%), 'top_rated' (12%), 'regular' (10%)
  commissionRate: number; // e.g. 15, 12, 10
  rating: number;
  reviewCount: number;
  experienceYears: number;
  bio: string;
  locality: string;
  address?: string;
  travelChargePerKm: number;
  freeTravelKm: number;
  isVerified: boolean;
  verificationBadges: VerificationBadges;
  reliabilityMetrics: ReliabilityMetrics;
  avatar: string;
  phone: string;
  bankUpiId: string;
  bankAccountNo?: string;
  bankIfsc?: string;
  bankHolderName?: string;
  totalGmv: number;
  totalCommissionPaid: number;
  pendingPayout: number;
  settledPayout: number;
  isActive: boolean;
  availability?: Record<string, Record<string, 'available' | 'pending' | 'booked'>>;
  portfolio?: Array<{
    id: string;
    title: string;
    category: string;
    imageUrl: string;
  }>;
}

export interface Booking {
  id: string;
  bookingCode: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  artistId: string;
  artistName: string;
  artistLocality: string;
  artistAvatar?: string;
  eventDate: string; // YYYY-MM-DD
  timeSlot: string; // morning, afternoon, evening, night
  timeSlotLabel?: string;
  serviceType: string;
  serviceName?: string;
  locality: string;
  venueAddress: string;
  pincode?: string;
  guestCount: number;
  addOns?: Array<{ name: string; price: number }>;
  
  // Financial breakdown
  subtotal: number;
  travelFee: number;
  discountAmount: number;
  totalAmount: number;
  advanceTokenAmount: number; // 20%
  balanceCashAmount: number; // 80%

  // Commission tracking
  commissionRate: number; // Tier-based: 15% / 12% / 10%
  commissionAmount: number; // Platform fee
  artistNetEarnings: number; // Artist's net share

  status: BookingStatus;
  paymentStatus: PaymentStatus;
  cancelledByArtist: boolean;
  cancellationReason?: string;
  backupArtistId?: string | null;
  backupArtistName?: string;
  review?: {
    rating: number;
    comment: string;
  } | null;
  createdAt: string;
}

export interface CommissionPayout {
  id: string;
  payoutCode: string;
  artistId: string;
  artistName: string;
  bookingId?: string;
  bookingCode?: string;
  grossAmount: number;
  commissionAmount: number;
  netPayout: number;
  status: PayoutStatus;
  payoutMethod: 'upi' | 'bank_transfer';
  accountDetails: string;
  utrReference?: string;
  notes?: string;
  settledAt?: string;
  createdAt: string;
}

export interface MarketplaceSettings {
  id: number;
  platformName: string;
  centerHub: string;
  defaultBridalCommission: number; // default 15%
  defaultTopRatedCommission: number; // default 12%
  defaultRegularCommission: number; // default 10%
  advanceTokenPercentage: number; // default 20%
  minPayoutAmount: number; // default ₹1,000
  platformUpi: string;
  supportPhone: string;
}
