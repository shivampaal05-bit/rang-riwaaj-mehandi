import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { MOCK_ARTISTS } from '../data/mockArtists';
import { INITIAL_MOCK_BOOKINGS } from '../data/mockBookings';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  // Load artists from localStorage or initialize with mock data
  const [artists, setArtists] = useState(() => {
    const saved = localStorage.getItem('mehndiconnect_artists');
    return saved ? JSON.parse(saved) : MOCK_ARTISTS;
  });

  // Load bookings from localStorage or initialize with mock data
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('mehndiconnect_bookings');
    return saved ? JSON.parse(saved) : INITIAL_MOCK_BOOKINGS;
  });

  // Favorites
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('mehndiconnect_favorites');
    return saved ? JSON.parse(saved) : ['gkp-art-01'];
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('mehndiconnect_artists', JSON.stringify(artists));
  }, [artists]);

  useEffect(() => {
    localStorage.setItem('mehndiconnect_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('mehndiconnect_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (artistId) => {
    setFavorites(prev => 
      prev.includes(artistId) ? prev.filter(id => id !== artistId) : [...prev, artistId]
    );
  };

  // Check real date-wise availability for an artist
  const getAvailabilityStatus = useCallback((artistId, dateStr, slot = 'evening') => {
    const artist = artists.find(a => a.id === artistId);
    if (!artist) return { status: 'unknown', available: false };

    // Check direct calendar slot
    const calendarSlotStatus = artist.availability?.[dateStr]?.[slot];

    // Check if there's an active non-cancelled booking on this date & slot
    const activeBooking = bookings.find(b => 
      b.artistId === artistId && 
      b.eventDate === dateStr && 
      (b.timeSlot === slot || !slot) && 
      !b.cancelledByArtist &&
      b.status !== 'refunded'
    );

    if (activeBooking || calendarSlotStatus === 'booked') {
      return { status: 'booked', available: false, label: 'Booked (Date-Locked)' };
    }
    if (calendarSlotStatus === 'pending') {
      return { status: 'pending', available: false, label: 'Pending Inquiry' };
    }
    return { status: 'available', available: true, label: 'Available' };
  }, [artists, bookings]);

  // Create new booking with date-lock and double booking prevention
  const createBooking = (payload) => {
    const { artistId, eventDate, timeSlot } = payload;
    
    // Prevent double booking
    const check = getAvailabilityStatus(artistId, eventDate, timeSlot);
    if (!check.available) {
      throw new Error(`Double-booking prevented: This artist is already marked as ${check.label} for ${eventDate} (${timeSlot}). Please pick another slot or artist.`);
    }

    const newBookingId = 'GKP-MHN-2026-' + Math.floor(1000 + Math.random() * 9000);
    const newBooking = {
      id: newBookingId,
      createdAt: new Date().toISOString(),
      status: 'booking_confirmed', // Instant date-lock demo confirmation
      cancelledByArtist: false,
      backupHandled: false,
      backupArtistId: null,
      backupChoice: null,
      review: null,
      ...payload
    };

    // Update bookings
    setBookings(prev => [newBooking, ...prev]);

    // Update artist availability schedule
    setArtists(prevArtists => prevArtists.map(art => {
      if (art.id === artistId) {
        const updatedAvail = { ...(art.availability || {}) };
        if (!updatedAvail[eventDate]) {
          updatedAvail[eventDate] = {};
        }
        updatedAvail[eventDate][timeSlot] = 'booked';
        return { ...art, availability: updatedAvail };
      }
      return art;
    }));

    return newBooking;
  };

  // Update booking status through the 9 states
  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: newStatus };
      }
      return b;
    }));
  };

  // Simulate Artist Emergency Cancellation (to trigger Requirement 6 Backup flow)
  const triggerArtistCancellation = (bookingId) => {
    let cancelledArtistId = null;
    let eventDate = null;
    let timeSlot = null;

    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        cancelledArtistId = b.artistId;
        eventDate = b.eventDate;
        timeSlot = b.timeSlot;
        return {
          ...b,
          status: 'artist_cancelled',
          cancelledByArtist: true,
          cancellationReason: 'Artist medical emergency / sudden hospitalisation',
          cancellationTimestamp: new Date().toISOString()
        };
      }
      return b;
    }));

    // Release old artist's calendar slot
    if (cancelledArtistId && eventDate && timeSlot) {
      setArtists(prev => prev.map(art => {
        if (art.id === cancelledArtistId && art.availability?.[eventDate]) {
          const updatedSlots = { ...art.availability[eventDate] };
          delete updatedSlots[timeSlot];
          return {
            ...art,
            availability: { ...art.availability, [eventDate]: updatedSlots }
          };
        }
        return art;
      }));
    }
  };

  // Handle Backup Choice
  const handleBackupChoice = (bookingId, choice, backupArtistId = null) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        if (choice === 'accept_backup') {
          const backupArtist = artists.find(a => a.id === backupArtistId);
          return {
            ...b,
            artistId: backupArtistId,
            artistName: backupArtist?.name || b.artistName,
            artistPhone: backupArtist?.phone || b.artistPhone,
            artistLocality: backupArtist?.locality || b.artistLocality,
            cancelledByArtist: false,
            backupHandled: true,
            backupChoice: 'accept_backup',
            backupArtistId,
            status: 'booking_confirmed',
            backupGuaranteedPriceLocked: true
          };
        } else if (choice === 'request_another') {
          return {
            ...b,
            backupHandled: false,
            backupChoice: 'request_another',
            status: 'backup_selection'
          };
        } else if (choice === 'reschedule') {
          return {
            ...b,
            backupHandled: true,
            backupChoice: 'reschedule',
            status: 'reschedule_pending'
          };
        } else if (choice === 'refund') {
          return {
            ...b,
            backupHandled: true,
            backupChoice: 'refund',
            status: 'refunded',
            refundAmount: b.pricing?.advancePaid || 2000,
            refundCompensationCoupon: 'GKP-BACKUP-500'
          };
        }
      }
      return b;
    }));
  };

  // Submit verified review (Only allowed for completed bookings)
  const submitReview = (bookingId, reviewData) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) throw new Error('Booking not found');
    
    // Only allow for completed bookings
    const allowedStates = ['service_completed', 'remaining_payment', 'review_submitted'];
    if (!allowedStates.includes(booking.status)) {
      throw new Error('Reviews can only be submitted for completed mehndi services to prevent fake feedback.');
    }

    const newReview = {
      id: 'rev-' + Date.now(),
      bookingId: booking.id,
      customerName: booking.customerName || 'Verified Customer',
      locality: booking.venueAddress || 'Gorakhpur',
      eventDate: booking.eventDate,
      rating: Number(reviewData.rating),
      detailedRating: {
        designQuality: Number(reviewData.designQuality || 5),
        onTimeArrival: Number(reviewData.onTimeArrival || 5),
        behaviour: Number(reviewData.behaviour || 5),
        priceTransparency: Number(reviewData.priceTransparency || 5),
        cleanliness: Number(reviewData.cleanliness || 5)
      },
      comment: reviewData.comment,
      createdAt: new Date().toISOString()
    };

    // Update booking with review
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          review: newReview,
          status: 'review_submitted'
        };
      }
      return b;
    }));

    // Append to artist's reviews and recompute average
    setArtists(prev => prev.map(art => {
      if (art.id === booking.artistId) {
        const existingReviews = art.reviews || [];
        const updatedReviews = [newReview, ...existingReviews];
        const newCount = updatedReviews.length;
        const sumRatings = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
        const newAverage = +(sumRatings / newCount).toFixed(2);

        return {
          ...art,
          reviews: updatedReviews,
          reviewCount: newCount,
          rating: newAverage
        };
      }
      return art;
    }));

    return newReview;
  };

  // Reset to initial mock data (helpful for testing)
  const resetDemoData = () => {
    localStorage.removeItem('mehndiconnect_artists');
    localStorage.removeItem('mehndiconnect_bookings');
    localStorage.removeItem('mehndiconnect_favorites');
    setArtists(MOCK_ARTISTS);
    setBookings(INITIAL_MOCK_BOOKINGS);
    setFavorites(['gkp-art-01']);
  };

  return (
    <BookingContext.Provider
      value={{
        artists,
        bookings,
        favorites,
        toggleFavorite,
        getAvailabilityStatus,
        createBooking,
        updateBookingStatus,
        triggerArtistCancellation,
        handleBackupChoice,
        submitReview,
        resetDemoData
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
