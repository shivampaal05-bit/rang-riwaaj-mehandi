export const TIMELINE_STATES = [
  { id: 'request_sent', title: 'Request Sent', hindiTitle: 'अनुरोध भेजा गया', desc: 'Booking request transmitted to artist' },
  { id: 'artist_accepted', title: 'Artist Accepted', hindiTitle: 'कलाकार द्वारा स्वीकृत', desc: 'Artist accepted the date and requirements' },
  { id: 'advance_pending', title: 'Advance Pending', hindiTitle: 'अग्रिम भुगतान लंबित', desc: 'Pay 20% mock token to lock date' },
  { id: 'booking_confirmed', title: 'Booking Confirmed', hindiTitle: 'बुकिंग पक्की (लॉक)', desc: 'Slot locked on artist calendar with backup guarantee' },
  { id: 'artist_on_way', title: 'Artist On The Way', hindiTitle: 'कलाकार रास्ते में है', desc: 'Artist dispatched with sanitized kit to your venue' },
  { id: 'service_started', title: 'Service Started', hindiTitle: 'मेहंदी लगाना शुरू', desc: 'Design application in progress' },
  { id: 'service_completed', title: 'Service Completed', hindiTitle: 'सेवा संपन्न', desc: 'Henna applied and natural sealant misted' },
  { id: 'remaining_payment', title: 'Remaining Payment', hindiTitle: 'बकाया भुगतान', desc: 'Clear final balance post-service satisfaction' },
  { id: 'review_submitted', title: 'Review Submitted', hindiTitle: 'समीक्षा दर्ज की गई', desc: 'Feedback and quality rating verified' }
];

export const INITIAL_MOCK_BOOKINGS = [
  {
    id: 'GKP-MHN-2026-8812',
    customerName: 'Priya Tiwari',
    customerPhone: '+91 98391 22840',
    artistId: 'gkp-art-01', // Pooja Verma
    artistName: 'Pooja Verma Bridal Henna Studio',
    artistPhone: '+91 98380 11422',
    artistLocality: 'Betiahata, Gorakhpur',
    serviceType: 'bridal',
    eventDate: '2026-10-05',
    timeSlot: 'evening',
    timeSlotLabel: 'Evening (5:00 PM - 9:00 PM)',
    venueAddress: 'Flat 402, Shivalik Heights, Medical College Road, Gorakhpur',
    venueLocalityId: 'medical_road',
    guestCount: 6,
    guestHandSides: 1,
    includeFeet: true,
    bridalHandOption: 'elbow',
    extraPortrait: true,
    extraStoryWork: false,
    travelDistanceKm: 6.5,
    pricing: {
      basePackage: 5800,
      feetCharge: 1800,
      guestCharge: 1200,
      travelFee: 88,
      portraitCharge: 1500,
      discount: 500,
      finalTotal: 9888,
      advancePaid: 2000,
      balanceDue: 7888
    },
    status: 'booking_confirmed', // Great for testing the Simulate Artist Cancellation / Backup flow!
    cancelledByArtist: false,
    backupHandled: false,
    backupArtistId: null,
    backupChoice: null, // 'accept_backup' | 'request_another' | 'reschedule' | 'refund'
    createdAt: '2026-09-28T10:30:00Z',
    review: null
  },
  {
    id: 'GKP-MHN-2026-7490',
    customerName: 'Priya Tiwari',
    customerPhone: '+91 98391 22840',
    artistId: 'gkp-art-02', // Ananya
    artistName: 'Ananya Henna & Sangeet Arts',
    artistPhone: '+91 94500 82190',
    artistLocality: 'Golghar, Gorakhpur',
    serviceType: 'guest',
    eventDate: '2026-09-22',
    timeSlot: 'afternoon',
    timeSlotLabel: 'Afternoon (1:00 PM - 5:00 PM)',
    venueAddress: 'Near Golghar Chowk, Gorakhpur',
    venueLocalityId: 'golghar',
    guestCount: 15,
    guestHandSides: 1,
    includeFeet: false,
    bridalHandOption: 'wrist',
    extraPortrait: false,
    extraStoryWork: false,
    travelDistanceKm: 1.0,
    pricing: {
      basePackage: 2000,
      feetCharge: 0,
      guestCharge: 2250,
      travelFee: 0,
      portraitCharge: 0,
      discount: 0,
      finalTotal: 4250,
      advancePaid: 1000,
      balanceDue: 3250
    },
    status: 'service_completed', // Ready to test "Remaining Payment" and "Submit Review"!
    cancelledByArtist: false,
    backupHandled: false,
    backupArtistId: null,
    backupChoice: null,
    createdAt: '2026-09-20T14:15:00Z',
    review: null
  },
  {
    id: 'GKP-MHN-2026-9104',
    customerName: 'Priya Tiwari',
    customerPhone: '+91 98391 22840',
    artistId: 'gkp-art-03', // Radhika
    artistName: 'Radhika Shringaar & Marwari Henna',
    artistPhone: '+91 97920 33810',
    artistLocality: 'Mohaddipur, Gorakhpur',
    serviceType: 'bridal',
    eventDate: '2026-10-02',
    timeSlot: 'morning',
    timeSlotLabel: 'Morning (9:00 AM - 1:00 PM)',
    venueAddress: 'Rapti Nagar Phase 4, Gorakhpur',
    venueLocalityId: 'rapti_nagar',
    guestCount: 4,
    guestHandSides: 2,
    includeFeet: true,
    bridalHandOption: 'forearm',
    extraPortrait: false,
    extraStoryWork: true,
    travelDistanceKm: 5.5,
    pricing: {
      basePackage: 5525,
      feetCharge: 2000,
      guestCharge: 1760,
      travelFee: 62,
      portraitCharge: 0,
      discount: 0,
      finalTotal: 9347,
      advancePaid: 2000,
      balanceDue: 7347
    },
    status: 'artist_on_way', // In transit!
    cancelledByArtist: false,
    backupHandled: false,
    backupArtistId: null,
    backupChoice: null,
    createdAt: '2026-09-27T08:00:00Z',
    review: null
  }
];
