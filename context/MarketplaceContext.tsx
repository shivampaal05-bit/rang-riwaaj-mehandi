'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  ArtistProfile,
  ArtistTier,
  Booking,
  BookingStatus,
  CommissionPayout,
  MarketplaceSettings,
  UserProfile,
  UserRole,
} from '@/types/marketplace';
import {
  calculateCommissionBreakdown,
  DEFAULT_MARKETPLACE_SETTINGS,
} from '@/lib/commission-calculator';
import {
  INITIAL_ARTISTS,
  INITIAL_BOOKINGS,
  INITIAL_DEMO_USERS,
  INITIAL_PAYOUTS,
} from '@/lib/mock-marketplace-data';

interface MarketplaceContextType {
  currentUser: UserProfile | null;
  switchPersona: (role: UserRole) => void;
  loginUser: (userData: Partial<UserProfile>) => void;
  logoutUser: () => void;
  
  // Data State
  artists: ArtistProfile[];
  bookings: Booking[];
  payouts: CommissionPayout[];
  settings: MarketplaceSettings;

  // Actions
  createBooking: (payload: {
    artistId: string;
    eventDate: string;
    timeSlot: string;
    serviceType: string;
    serviceName: string;
    locality: string;
    venueAddress: string;
    guestCount: number;
    subtotal: number;
    travelFee: number;
    discountAmount: number;
    totalAmount: number;
  }) => Booking;
  
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  cancelBookingEmergency: (bookingId: string, reason?: string) => void;
  
  requestPayout: (artistId: string, amount: number, method: 'upi' | 'bank_transfer', accountDetails: string) => CommissionPayout;
  approveAndSettlePayout: (payoutId: string, utrReference: string) => void;
  
  updateArtistVerification: (artistId: string, badgeKey: string) => void;
  updateArtistTier: (artistId: string, newTier: ArtistTier, customRate?: number) => void;
  updateMarketplaceSettings: (newSettings: Partial<MarketplaceSettings>) => void;
  resetAllDemoData: () => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export function MarketplaceProvider({ children }: { children: React.ReactNode }) {
  // 1. Current Auth User
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    if (typeof window === 'undefined') return INITIAL_DEMO_USERS.customer;
    const saved = localStorage.getItem('rangriwaaz_user');
    return saved ? JSON.parse(saved) : INITIAL_DEMO_USERS.customer;
  });

  // 2. Marketplace Settings
  const [settings, setSettings] = useState<MarketplaceSettings>(() => {
    if (typeof window === 'undefined') return DEFAULT_MARKETPLACE_SETTINGS;
    const saved = localStorage.getItem('rangriwaaz_settings');
    return saved ? JSON.parse(saved) : DEFAULT_MARKETPLACE_SETTINGS;
  });

  // 3. Artists List
  const [artists, setArtists] = useState<ArtistProfile[]>(() => {
    if (typeof window === 'undefined') return INITIAL_ARTISTS;
    const saved = localStorage.getItem('rangriwaaz_artists');
    return saved ? JSON.parse(saved) : INITIAL_ARTISTS;
  });

  // 4. Bookings
  const [bookings, setBookings] = useState<Booking[]>(() => {
    if (typeof window === 'undefined') return INITIAL_BOOKINGS;
    const saved = localStorage.getItem('rangriwaaz_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  // 5. Payouts
  const [payouts, setPayouts] = useState<CommissionPayout[]>(() => {
    if (typeof window === 'undefined') return INITIAL_PAYOUTS;
    const saved = localStorage.getItem('rangriwaaz_payouts');
    return saved ? JSON.parse(saved) : INITIAL_PAYOUTS;
  });

  // Sync to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('rangriwaaz_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('rangriwaaz_settings', JSON.stringify(settings));
    }
  }, [settings]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('rangriwaaz_artists', JSON.stringify(artists));
    }
  }, [artists]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('rangriwaaz_bookings', JSON.stringify(bookings));
    }
  }, [bookings]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('rangriwaaz_payouts', JSON.stringify(payouts));
    }
  }, [payouts]);

  // Auth Functions
  const switchPersona = useCallback((role: UserRole) => {
    if (INITIAL_DEMO_USERS[role]) {
      setCurrentUser(INITIAL_DEMO_USERS[role]);
    }
  }, []);

  const loginUser = useCallback((userData: Partial<UserProfile>) => {
    setCurrentUser(prev => ({
      id: prev?.id || 'user-' + Date.now(),
      phone: userData.phone || '+91 98391 22840',
      fullName: userData.fullName || 'Priya Tiwari',
      role: userData.role || 'customer',
      locality: userData.locality || 'Golghar, Gorakhpur',
      avatarUrl: userData.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      ...userData,
    }));
  }, []);

  const logoutUser = useCallback(() => {
    setCurrentUser(null);
  }, []);

  // Create Booking with Automatic Commission Calculation
  const createBooking = useCallback(
    (payload: {
      artistId: string;
      eventDate: string;
      timeSlot: string;
      serviceType: string;
      serviceName: string;
      locality: string;
      venueAddress: string;
      guestCount: number;
      subtotal: number;
      travelFee: number;
      discountAmount: number;
      totalAmount: number;
    }): Booking => {
      const artist = artists.find(a => a.id === payload.artistId) || artists[0];

      // Check double-booking
      const existing = bookings.find(
        b =>
          b.artistId === payload.artistId &&
          b.eventDate === payload.eventDate &&
          b.timeSlot === payload.timeSlot &&
          !b.cancelledByArtist &&
          b.status !== 'cancelled'
      );

      if (existing) {
        throw new Error(`Double-booking prevented: ${artist.name} is already date-locked for ${payload.eventDate} (${payload.timeSlot}).`);
      }

      // Calculate commission & token splits based on Tier
      const breakdown = calculateCommissionBreakdown({
        totalAmount: payload.totalAmount,
        tier: artist.categoryTier,
        customRate: artist.commissionRate,
        settings,
      });

      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const newBookingId = `GKP-MHN-2026-${randomSuffix}`;
      const newBookingCode = `RRM-${randomSuffix}`;

      const newBooking: Booking = {
        id: newBookingId,
        bookingCode: newBookingCode,
        customerId: currentUser?.id || 'user-cust-01',
        customerName: currentUser?.fullName || 'Priya Tiwari',
        customerPhone: currentUser?.phone || '+91 98391 22840',
        artistId: artist.id,
        artistName: artist.studioName || artist.name,
        artistLocality: artist.locality,
        artistAvatar: artist.avatar,
        eventDate: payload.eventDate,
        timeSlot: payload.timeSlot,
        timeSlotLabel: payload.timeSlot.charAt(0).toUpperCase() + payload.timeSlot.slice(1),
        serviceType: payload.serviceType,
        serviceName: payload.serviceName,
        locality: payload.locality,
        venueAddress: payload.venueAddress,
        guestCount: payload.guestCount,
        subtotal: payload.subtotal,
        travelFee: payload.travelFee,
        discountAmount: payload.discountAmount,
        totalAmount: payload.totalAmount,
        advanceTokenAmount: breakdown.advanceTokenAmount,
        balanceCashAmount: breakdown.balanceCashAmount,
        commissionRate: breakdown.commissionRate,
        commissionAmount: breakdown.commissionAmount,
        artistNetEarnings: breakdown.artistNetEarnings,
        status: 'confirmed',
        paymentStatus: 'advance_paid',
        cancelledByArtist: false,
        createdAt: new Date().toISOString(),
      };

      // Add to bookings
      setBookings(prev => [newBooking, ...prev]);

      // Lock artist slot
      setArtists(prev =>
        prev.map(art => {
          if (art.id === artist.id) {
            const avail = { ...(art.availability || {}) };
            if (!avail[payload.eventDate]) avail[payload.eventDate] = {};
            avail[payload.eventDate][payload.timeSlot] = 'booked';
            return {
              ...art,
              availability: avail,
            };
          }
          return art;
        })
      );

      // Create pending payout record for artist ledger
      const newPayout: CommissionPayout = {
        id: `payout-${Date.now()}`,
        payoutCode: `PAY-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${randomSuffix}`,
        artistId: artist.id,
        artistName: artist.name,
        bookingId: newBookingId,
        bookingCode: newBookingCode,
        grossAmount: payload.totalAmount,
        commissionAmount: breakdown.commissionAmount,
        netPayout: breakdown.artistNetEarnings,
        status: 'pending',
        payoutMethod: 'upi',
        accountDetails: artist.bankUpiId || 'UPI Pending',
        notes: `Date-locked for ${payload.eventDate} (${payload.timeSlot})`,
        createdAt: new Date().toISOString(),
      };

      setPayouts(prev => [newPayout, ...prev]);

      return newBooking;
    },
    [artists, bookings, currentUser, settings]
  );

  // Update Booking Status Milestones
  const updateBookingStatus = useCallback(
    (bookingId: string, status: BookingStatus) => {
      setBookings(prev =>
        prev.map(b => {
          if (b.id === bookingId) {
            const isNowCompleted = status === 'completed' && b.status !== 'completed';
            
            // If completed, update artist financial totals
            if (isNowCompleted) {
              setArtists(artList =>
                artList.map(art => {
                  if (art.id === b.artistId) {
                    return {
                      ...art,
                      totalGmv: art.totalGmv + b.totalAmount,
                      totalCommissionPaid: art.totalCommissionPaid + b.commissionAmount,
                      pendingPayout: art.pendingPayout + b.artistNetEarnings,
                    };
                  }
                  return art;
                })
              );

              // Update corresponding payout record to approved/settled
              setPayouts(payList =>
                payList.map(p => {
                  if (p.bookingId === bookingId) {
                    return {
                      ...p,
                      status: 'approved',
                      notes: 'Service completed! Ready for disbursement.',
                    };
                  }
                  return p;
                })
              );
            }

            return {
              ...b,
              status,
              paymentStatus: status === 'completed' ? 'fully_paid' : b.paymentStatus,
            };
          }
          return b;
        })
      );
    },
    []
  );

  // Emergency Artist Cancellation with Standby Match
  const cancelBookingEmergency = useCallback(
    (bookingId: string, reason?: string) => {
      setBookings(prev =>
        prev.map(b => {
          if (b.id === bookingId) {
            // Find standby replacement artist
            const replacement = artists.find(
              a => a.id !== b.artistId && a.isVerified
            ) || artists[1];

            return {
              ...b,
              cancelledByArtist: true,
              cancellationReason: reason || 'Sudden artist health emergency',
              backupArtistId: replacement.id,
              backupArtistName: replacement.name,
              status: 'confirmed', // Backup reassigned
            };
          }
          return b;
        })
      );
    },
    [artists]
  );

  // Artist Payout Request
  const requestPayout = useCallback(
    (artistId: string, amount: number, method: 'upi' | 'bank_transfer', accountDetails: string) => {
      const artist = artists.find(a => a.id === artistId);
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const newPayout: CommissionPayout = {
        id: `payout-${Date.now()}`,
        payoutCode: `REQ-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${randomSuffix}`,
        artistId,
        artistName: artist?.name || 'Artist',
        grossAmount: amount,
        commissionAmount: 0,
        netPayout: amount,
        status: 'pending',
        payoutMethod: method,
        accountDetails,
        notes: 'Artist requested manual balance withdrawal',
        createdAt: new Date().toISOString(),
      };

      setPayouts(prev => [newPayout, ...prev]);
      return newPayout;
    },
    [artists]
  );

  // Admin Settles Payout
  const approveAndSettlePayout = useCallback(
    (payoutId: string, utrReference: string) => {
      setPayouts(prev =>
        prev.map(p => {
          if (p.id === payoutId) {
            // Update artist settled vs pending balance
            setArtists(artList =>
              artList.map(art => {
                if (art.id === p.artistId) {
                  return {
                    ...art,
                    pendingPayout: Math.max(0, art.pendingPayout - p.netPayout),
                    settledPayout: art.settledPayout + p.netPayout,
                  };
                }
                return art;
              })
            );

            return {
              ...p,
              status: 'settled',
              utrReference: utrReference || `UPI/AXIS/${Math.floor(100000000000 + Math.random() * 900000000000)}`,
              settledAt: new Date().toISOString(),
              notes: 'Funds settled directly to artist account.',
            };
          }
          return p;
        })
      );
    },
    []
  );

  // Admin Updates 5-Point Verification Badge
  const updateArtistVerification = useCallback(
    (artistId: string, badgeKey: string) => {
      setArtists(prev =>
        prev.map(art => {
          if (art.id === artistId) {
            const currentBadges = art.verificationBadges || {
              identityVerified: false,
              phoneVerified: false,
              portfolioChecked: false,
              skillChecked: false,
              homeServiceVerified: false,
            };
            const updated = {
              ...currentBadges,
              [badgeKey]: !currentBadges[badgeKey as keyof typeof currentBadges],
            };
            const isFullyVerified = updated.identityVerified && updated.phoneVerified && updated.skillChecked;
            return {
              ...art,
              verificationBadges: updated,
              isVerified: isFullyVerified,
            };
          }
          return art;
        })
      );
    },
    []
  );

  // Admin Updates Artist Tier & Custom Commission
  const updateArtistTier = useCallback(
    (artistId: string, newTier: ArtistTier, customRate?: number) => {
      setArtists(prev =>
        prev.map(art => {
          if (art.id === artistId) {
            let defaultRate = 15;
            if (newTier === 'top_rated') defaultRate = 12;
            if (newTier === 'regular') defaultRate = 10;
            return {
              ...art,
              categoryTier: newTier,
              commissionRate: typeof customRate === 'number' ? customRate : defaultRate,
            };
          }
          return art;
        })
      );
    },
    []
  );

  // Admin Updates Marketplace Settings
  const updateMarketplaceSettings = useCallback(
    (newSettings: Partial<MarketplaceSettings>) => {
      setSettings(prev => ({ ...prev, ...newSettings }));
    },
    []
  );

  // Reset Demo Data
  const resetAllDemoData = useCallback(() => {
    setCurrentUser(INITIAL_DEMO_USERS.customer);
    setSettings(DEFAULT_MARKETPLACE_SETTINGS);
    setArtists(INITIAL_ARTISTS);
    setBookings(INITIAL_BOOKINGS);
    setPayouts(INITIAL_PAYOUTS);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('rangriwaaz_user');
      localStorage.removeItem('rangriwaaz_settings');
      localStorage.removeItem('rangriwaaz_artists');
      localStorage.removeItem('rangriwaaz_bookings');
      localStorage.removeItem('rangriwaaz_payouts');
    }
  }, []);

  return (
    <MarketplaceContext.Provider
      value={{
        currentUser,
        switchPersona,
        loginUser,
        logoutUser,
        artists,
        bookings,
        payouts,
        settings,
        createBooking,
        updateBookingStatus,
        cancelBookingEmergency,
        requestPayout,
        approveAndSettlePayout,
        updateArtistVerification,
        updateArtistTier,
        updateMarketplaceSettings,
        resetAllDemoData,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}
