export const MOCK_ARTISTS = [
  {
    id: 'gkp-art-01',
    name: 'Pooja Verma Bridal Henna Studio',
    hindiName: 'पूजा वर्मा ब्राइडल हिना स्टूडियो',
    tagline: 'Gorakhpur\'s most celebrated Marwari & Portrait Bridal Mehndi artist',
    hindiTagline: 'गोरखपुर की प्रसिद्ध मारवाड़ी व वर-वधू पोर्ट्रेट मेहंदी विशेषज्ञ',
    localityId: 'betiahata',
    locality: 'Betiahata, Gorakhpur',
    hindiLocality: 'बेतियाहाता, गोरखपुर',
    experienceYears: 9,
    phone: '+91 98380 11422',
    whatsapp: '+919838011422',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    coverImage: '/images/hero_bridal_mehndi.jpg',
    specialties: ['Portrait Henna', 'Bridal Traditional', 'Marwari Jaal', 'Khafif Gulf'],
    rating: 4.95,
    reviewCount: 168,
    baseTravelDistanceKm: 3.0,
    organicHennaGuaranteed: true,
    coneBrand: '100% Organic Sojat Rajasthani Henna with Nilgiri Oil (No Chemicals)',
    
    // Transparent Pricing Structure
    pricing: {
      bridalBase: 5800,
      bridalPackageName: 'Dulhan Shringaar (Elbow Hands + Ankle Feet)',
      guestPerSideRate: 200, // per side per hand
      feetPackageAddon: 1800,
      portraitAddon: 1500, // bride & groom faces
      travelFeePerKm: 25, // after 3km free
      freeTravelRadiusKm: 3,
      overtimePerHour: 400
    },

    // 5-Point Verification System
    verification: {
      isVerified: true,
      identityVerified: true, // Govt ID verified
      phoneVerified: true,    // OTP verified
      portfolioChecked: true, // Reverse image verified
      skillChecked: true,     // Henna consistency & line finesse
      homeServiceVerified: true // Gorakhpur address physical verification
    },

    // Reliability Index
    reliability: {
      score: 99,
      responseRate: 99,
      avgResponseTime: '6 mins',
      onTimePercentage: 99,
      cancellationRate: '0.4%',
      completedBookings: 240
    },

    // 5-Star Aspect Ratings
    detailedRatings: {
      designQuality: 5.0,
      onTimeArrival: 4.9,
      behaviour: 4.9,
      priceTransparency: 5.0,
      cleanliness: 4.9
    },

    // Calendar Availability (Dynamic key: YYYY-MM-DD : { slot: status })
    // statuses: 'available', 'pending', 'booked'
    availability: {
      '2026-10-01': { morning: 'available', afternoon: 'available', evening: 'booked', night: 'booked' },
      '2026-10-02': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-03': { morning: 'booked', afternoon: 'booked', evening: 'booked', night: 'booked' }, // peak wedding date
      '2026-10-04': { morning: 'available', afternoon: 'pending', evening: 'available', night: 'available' },
      '2026-10-05': { morning: 'available', afternoon: 'available', evening: 'booked', night: 'available' },
      '2026-10-06': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-07': { morning: 'available', afternoon: 'available', evening: 'available', night: 'booked' },
      '2026-10-08': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-10': { morning: 'available', afternoon: 'pending', evening: 'booked', night: 'booked' },
      '2026-10-12': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-15': { morning: 'booked', afternoon: 'booked', evening: 'booked', night: 'booked' },
      '2026-10-20': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-24': { morning: 'booked', afternoon: 'booked', evening: 'booked', night: 'booked' },
      '2026-10-28': { morning: 'available', afternoon: 'available', evening: 'booked', night: 'available' }
    },

    // Authentic Portfolio
    portfolio: [
      {
        id: 'port-01-1',
        title: 'Shubh Vivah Royal Bridal Palms & Forearms',
        hindiTitle: 'शुभ विवाह रॉयल ब्राइडल हाथ व बांह',
        category: 'Bridal Traditional',
        placement: 'Front Hands & Elbows',
        appliedDate: '14 Feb 2026 at Hotel Radisson, Mohaddipur',
        duration: '4.5 Hours',
        packagePrice: '₹7,500',
        isOriginal: true,
        image: '/images/hero_bridal_mehndi.jpg'
      },
      {
        id: 'port-01-2',
        title: 'Intricate Dulha-Dulhan Portrait Jaal Work',
        hindiTitle: 'वर-वधू पोर्ट्रेट व महीन जाल कार्य',
        category: 'Portrait Henna',
        placement: 'Palms & Wrists',
        appliedDate: '02 Mar 2026 at Betiahata',
        duration: '5.0 Hours',
        packagePrice: '₹8,800',
        isOriginal: true,
        image: '/images/portrait_mehndi_art.jpg'
      },
      {
        id: 'port-01-3',
        title: 'Dulhan Payal Cuffs & Paisley Feet Henna',
        hindiTitle: 'दुल्हन पायल कफ व पैसले पद मेहंदी',
        category: 'Bridal Feet',
        placement: 'Feet & Ankles',
        appliedDate: '28 Jan 2026 at Golghar',
        duration: '2.5 Hours',
        packagePrice: '₹2,500',
        isOriginal: true,
        image: '/images/feet_bridal_mehndi.jpg'
      },
      {
        id: 'port-01-4',
        title: 'Modern Khafif Arabic Floral Flow',
        hindiTitle: 'आधुनिक खफीफ अरेबिक फ्लोरल बेल',
        category: 'Arabic',
        placement: 'Back Hands',
        appliedDate: '10 Feb 2026 at Taramandal',
        duration: '1.5 Hours',
        packagePrice: '₹1,800',
        isOriginal: true,
        image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80'
      }
    ],

    // Verified Reviews from Completed Bookings
    reviews: [
      {
        id: 'rev-01-1',
        bookingId: 'GKP-MHN-2026-1049',
        customerName: 'Shweta Srivastava',
        locality: 'Mohaddipur, Gorakhpur',
        eventDate: '14 Feb 2026',
        rating: 5.0,
        detailedRating: {
          designQuality: 5.0,
          onTimeArrival: 5.0,
          behaviour: 5.0,
          priceTransparency: 5.0,
          cleanliness: 5.0
        },
        comment: 'Pooja ji arrived at our venue exactly 15 minutes before the promised time! The portrait of groom and bride on my palms was breathtaking. No hidden charges whatsoever, the price calculated on Rang Riwaaz Mehandi was the exact amount we paid.',
        hindiComment: 'पूजा जी ठीक तय समय से 15 मिनट पहले वेन्यू पर आ गईं! वर-वधू का पोर्ट्रेट इतना सुंदर था कि सभी मेहमान तारीफ कर रहे थे। कैलकुलेटर में जो मूल्य आया था, ठीक वही लिया गया।'
      },
      {
        id: 'rev-01-2',
        bookingId: 'GKP-MHN-2026-0912',
        customerName: 'Anjali Pandey',
        locality: 'Golghar, Gorakhpur',
        eventDate: '02 Mar 2026',
        rating: 4.9,
        detailedRating: {
          designQuality: 5.0,
          onTimeArrival: 5.0,
          behaviour: 4.8,
          priceTransparency: 5.0,
          cleanliness: 5.0
        },
        comment: 'Organic cones smell wonderful and gave dark maroon stain within 24 hours. The date-lock gave us total peace of mind during lagan rush.',
        hindiComment: 'ऑर्गेनिक कोन्स बहुत अच्छे थे और 24 घंटे में गहरा महरून रंग आया। लगन की भीड़ में डेट-लॉक की वजह से हमें कोई चिंता नहीं रही।'
      }
    ]
  },
  {
    id: 'gkp-art-02',
    name: 'Ananya Henna & Sangeet Arts',
    hindiName: 'अनन्या हिना व संगीत आर्ट्स',
    tagline: 'Speed specialist for large family wedding gatherings & delicate Arabic',
    hindiTagline: 'बड़े पारिवारिक संगीत कार्यक्रमों व अरेबिक डिजाइन की त्वरित विशेषज्ञ',
    localityId: 'golghar',
    locality: 'Golghar, Gorakhpur',
    hindiLocality: 'गोलघर, गोरखपुर',
    experienceYears: 7,
    phone: '+91 94500 82190',
    whatsapp: '+919450082190',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80',
    specialties: ['Sangeet Group Henna', 'Arabic Flow', 'Mandala Art', 'Indo-Western'],
    rating: 4.88,
    reviewCount: 142,
    baseTravelDistanceKm: 1.0,
    organicHennaGuaranteed: true,
    coneBrand: 'Homemade Herbal Henna with Clove Oil & Tea Infusion',

    pricing: {
      bridalBase: 4500,
      bridalPackageName: 'Classic Dulhan & Forearm Elegance',
      guestPerSideRate: 150,
      feetPackageAddon: 1500,
      portraitAddon: 1200,
      travelFeePerKm: 20,
      freeTravelRadiusKm: 4,
      overtimePerHour: 350
    },

    verification: {
      isVerified: true,
      identityVerified: true,
      phoneVerified: true,
      portfolioChecked: true,
      skillChecked: true,
      homeServiceVerified: true
    },

    reliability: {
      score: 97,
      responseRate: 98,
      avgResponseTime: '10 mins',
      onTimePercentage: 97,
      cancellationRate: '0.8%',
      completedBookings: 195
    },

    detailedRatings: {
      designQuality: 4.9,
      onTimeArrival: 4.8,
      behaviour: 5.0,
      priceTransparency: 5.0,
      cleanliness: 4.8
    },

    availability: {
      '2026-10-01': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-02': { morning: 'available', afternoon: 'pending', evening: 'available', night: 'available' },
      '2026-10-03': { morning: 'available', afternoon: 'available', evening: 'booked', night: 'booked' },
      '2026-10-04': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-05': { morning: 'booked', afternoon: 'booked', evening: 'available', night: 'available' },
      '2026-10-06': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-07': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-08': { morning: 'available', afternoon: 'booked', evening: 'booked', night: 'available' },
      '2026-10-10': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-15': { morning: 'available', afternoon: 'available', evening: 'booked', night: 'booked' },
      '2026-10-24': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-28': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' }
    },

    portfolio: [
      {
        id: 'port-02-1',
        title: 'Contemporary Lotus & Mandala Bridal Hands',
        hindiTitle: 'आधुनिक कमल व मंडला ब्राइडल डिजाइन',
        category: 'Mandala & Floral',
        placement: 'Front & Back Hands',
        appliedDate: '22 Feb 2026 at Park Regency, Golghar',
        duration: '3.5 Hours',
        packagePrice: '₹5,500',
        isOriginal: true,
        image: '/images/hero_bridal_mehndi.jpg'
      },
      {
        id: 'port-02-2',
        title: 'Fast-Paced Sangeet Arabic for 25 Guests',
        hindiTitle: 'संगीत में 25 मेहमानों हेतु त्वरित अरेबिक डिजाइन',
        category: 'Arabic',
        placement: 'One Side Palm',
        appliedDate: '18 Jan 2026 at Asuran Chowk',
        duration: '4.0 Hours (Team of 2)',
        packagePrice: '₹4,500',
        isOriginal: true,
        image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80'
      }
    ],

    reviews: [
      {
        id: 'rev-02-1',
        bookingId: 'GKP-MHN-2026-1180',
        customerName: 'Kavita Singh',
        locality: 'Shahpur, Gorakhpur',
        eventDate: '22 Feb 2026',
        rating: 5.0,
        detailedRating: {
          designQuality: 4.9,
          onTimeArrival: 5.0,
          behaviour: 5.0,
          priceTransparency: 5.0,
          cleanliness: 4.9
        },
        comment: 'We booked Ananya for our sangeet night with 18 cousins. She and her assistant completed everyone with stunning precision in under 3 hours!',
        hindiComment: 'हमने अपने संगीत कार्यक्रम के लिए 18 बहनों-भाभियों की मेहंदी हेतु बुक किया। उन्होंने और उनकी सहायक ने 3 घंटे में सबका काम पूरा कर दिया।'
      }
    ]
  },
  {
    id: 'gkp-art-03',
    name: 'Radhika Shringaar & Marwari Henna',
    hindiName: 'राधिका श्रृंगार व मारवाड़ी हिना',
    tagline: 'Deep Rajasthani traditions with authentic dulha-dulhan story elements',
    hindiTagline: 'पारंपरिक राजस्थानी कथा तत्व व वर-वधू विवाह प्रसंग विशेषज्ञ',
    localityId: 'mohadipur',
    locality: 'Mohaddipur, Gorakhpur',
    hindiLocality: 'मोहाद्दीपुर, गोरखपुर',
    experienceYears: 11,
    phone: '+91 97920 33810',
    whatsapp: '+919792033810',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    coverImage: '/images/portrait_mehndi_art.jpg',
    specialties: ['Marwari Traditional', 'Wedding Story Jaal', 'Bridal Feet', 'Zardozi Henna'],
    rating: 4.92,
    reviewCount: 210,
    baseTravelDistanceKm: 3.2,
    organicHennaGuaranteed: true,
    coneBrand: 'Pure Rajasthani Sojat Cones with Organic Cajeput Oil',

    pricing: {
      bridalBase: 6500,
      bridalPackageName: 'Padmavati Royal Bridal Suite (Both Arms till Elbow + Full Feet)',
      guestPerSideRate: 220,
      feetPackageAddon: 2000,
      portraitAddon: 1800,
      travelFeePerKm: 25,
      freeTravelRadiusKm: 3,
      overtimePerHour: 450
    },

    verification: {
      isVerified: true,
      identityVerified: true,
      phoneVerified: true,
      portfolioChecked: true,
      skillChecked: true,
      homeServiceVerified: true
    },

    reliability: {
      score: 98,
      responseRate: 97,
      avgResponseTime: '8 mins',
      onTimePercentage: 99,
      cancellationRate: '0.3%',
      completedBookings: 310
    },

    detailedRatings: {
      designQuality: 5.0,
      onTimeArrival: 4.9,
      behaviour: 4.9,
      priceTransparency: 5.0,
      cleanliness: 5.0
    },

    availability: {
      '2026-10-01': { morning: 'booked', afternoon: 'booked', evening: 'available', night: 'available' },
      '2026-10-02': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-03': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' }, // backup candidate!
      '2026-10-04': { morning: 'booked', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-05': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-06': { morning: 'available', afternoon: 'available', evening: 'booked', night: 'booked' },
      '2026-10-07': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-08': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-10': { morning: 'booked', afternoon: 'booked', evening: 'booked', night: 'booked' },
      '2026-10-15': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-24': { morning: 'booked', afternoon: 'booked', evening: 'available', night: 'available' },
      '2026-10-28': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' }
    },

    portfolio: [
      {
        id: 'port-03-1',
        title: 'Doli & Baraat Traditional Marwari Dulhan Art',
        hindiTitle: 'डोली व बारात पारंपरिक मारवाड़ी दुल्हन मेहंदी',
        category: 'Marwari / Rajasthani',
        placement: 'Full Forearms & Palms',
        appliedDate: '05 Jan 2026 at Mohaddipur',
        duration: '5.5 Hours',
        packagePrice: '₹8,500',
        isOriginal: true,
        image: '/images/portrait_mehndi_art.jpg'
      },
      {
        id: 'port-03-2',
        title: 'Intricate Anklet & Toe Meshwork for Bridal Feet',
        hindiTitle: 'दुल्हन के पैरों के लिए पायल व बिछिया जालीदार कला',
        category: 'Bridal Feet',
        placement: 'Feet & Lower Calves',
        appliedDate: '12 Feb 2026 at Betiahata',
        duration: '3.0 Hours',
        packagePrice: '₹3,000',
        isOriginal: true,
        image: '/images/feet_bridal_mehndi.jpg'
      }
    ],

    reviews: [
      {
        id: 'rev-03-1',
        bookingId: 'GKP-MHN-2026-0841',
        customerName: 'Ritu Mishra',
        locality: 'Medical College Road, Gorakhpur',
        eventDate: '05 Jan 2026',
        rating: 5.0,
        detailedRating: {
          designQuality: 5.0,
          onTimeArrival: 5.0,
          behaviour: 5.0,
          priceTransparency: 5.0,
          cleanliness: 5.0
        },
        comment: 'Radhika ji incorporates true wedding rituals into her art—doli, shehnai, and varmala motifs. Her punctuality and professional setup were exemplary.',
        hindiComment: 'राधिका जी की कला में डोली, शहनाई और वरमाला के दृश्य जीवंत हो उठते हैं। समयबद्धता और सफाई बहुत अच्छी थी।'
      }
    ]
  },
  {
    id: 'gkp-art-04',
    name: 'Kiran Mehndi Creation',
    hindiName: 'किरण मेहंदी क्रिएशन',
    tagline: 'Budget-friendly, certified organic henna for budget-conscious families in Shahpur',
    hindiTagline: 'किफायती दाम में उत्कृष्ट व केमिकल-मुक्त हिना डिजाइन',
    localityId: 'shahpur',
    locality: 'Shahpur, Gorakhpur',
    hindiLocality: 'शाहपुर, गोरखपुर',
    experienceYears: 6,
    phone: '+91 91250 49182',
    whatsapp: '+919125049182',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    coverImage: '/images/hero_bridal_mehndi.jpg',
    specialties: ['Bridal Traditional', 'Mandala Art', 'Engagement Mehndi'],
    rating: 4.79,
    reviewCount: 96,
    baseTravelDistanceKm: 4.1,
    organicHennaGuaranteed: true,
    coneBrand: 'Herbal Sojat Cones',

    pricing: {
      bridalBase: 3800,
      bridalPackageName: 'Shubh Shuruat Bridal (Palms + Wrists + Simple Feet)',
      guestPerSideRate: 120,
      feetPackageAddon: 1200,
      portraitAddon: 1000,
      travelFeePerKm: 20,
      freeTravelRadiusKm: 5,
      overtimePerHour: 300
    },

    // 4 Badges (Skill check in renewal, demonstrates authentic badge differentiation)
    verification: {
      isVerified: true,
      identityVerified: true,
      phoneVerified: true,
      portfolioChecked: true,
      skillChecked: true,
      homeServiceVerified: false // address visit scheduled
    },

    reliability: {
      score: 94,
      responseRate: 95,
      avgResponseTime: '15 mins',
      onTimePercentage: 96,
      cancellationRate: '1.1%',
      completedBookings: 128
    },

    detailedRatings: {
      designQuality: 4.8,
      onTimeArrival: 4.7,
      behaviour: 4.9,
      priceTransparency: 4.9,
      cleanliness: 4.7
    },

    availability: {
      '2026-10-01': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-02': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-03': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-04': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-05': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-06': { morning: 'available', afternoon: 'booked', evening: 'booked', night: 'available' },
      '2026-10-07': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-08': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-10': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-15': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-24': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-28': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' }
    },

    portfolio: [
      {
        id: 'port-04-1',
        title: 'Floral Mandala & Peacock Wrist Band',
        hindiTitle: 'फ्लोरल मंडला व मयूर कंगन डिजाइन',
        category: 'Mandala & Floral',
        placement: 'Front Hands',
        appliedDate: '19 Jan 2026 at Shahpur',
        duration: '2.5 Hours',
        packagePrice: '₹3,500',
        isOriginal: true,
        image: '/images/hero_bridal_mehndi.jpg'
      }
    ],

    reviews: [
      {
        id: 'rev-04-1',
        bookingId: 'GKP-MHN-2026-0722',
        customerName: 'Priyanka Gupta',
        locality: 'Shahpur, Gorakhpur',
        eventDate: '19 Jan 2026',
        rating: 4.8,
        detailedRating: {
          designQuality: 4.8,
          onTimeArrival: 4.8,
          behaviour: 5.0,
          priceTransparency: 5.0,
          cleanliness: 4.7
        },
        comment: 'Very polite and budget-friendly. Loved the neatness in thin lines.',
        hindiComment: 'बहुत ही शालीन स्वभाव और बजट में श्रेष्ठ काम। बारीक लाइनों की फिनिशिंग बहुत सुंदर थी।'
      }
    ]
  },
  {
    id: 'gkp-art-05',
    name: 'Alka Maurya Henna Studio',
    hindiName: 'अलका मौर्य हिना स्टूडियो',
    tagline: 'Master of intricate Indo-Arabic fusion and groom mehndi in Taramandal',
    hindiTagline: 'इंडो-अरेबिक फ्यूजन व वर (दूल्हा) मेहंदी विशेषज्ञ, तारामंडल',
    localityId: 'taramandal',
    locality: 'Taramandal (Nauka Vihar), Gorakhpur',
    hindiLocality: 'तारामंडल (नौका विहार), गोरखपुर',
    experienceYears: 8,
    phone: '+91 93360 71554',
    whatsapp: '+919336071554',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
    coverImage: '/images/feet_bridal_mehndi.jpg',
    specialties: ['Indo-Arabic Fusion', 'Groom Mehndi', 'Bridal Feet', 'Moroccan Geometry'],
    rating: 4.87,
    reviewCount: 118,
    baseTravelDistanceKm: 6.8,
    organicHennaGuaranteed: true,
    coneBrand: 'Hand-blended Sojat Herbal Cones with Eucalyptus Essential Oil',

    pricing: {
      bridalBase: 5200,
      bridalPackageName: 'Taramandal Bridal Splendour',
      guestPerSideRate: 180,
      feetPackageAddon: 1600,
      portraitAddon: 1400,
      travelFeePerKm: 25,
      freeTravelRadiusKm: 4,
      overtimePerHour: 400
    },

    verification: {
      isVerified: true,
      identityVerified: true,
      phoneVerified: true,
      portfolioChecked: true,
      skillChecked: true,
      homeServiceVerified: true
    },

    reliability: {
      score: 97,
      responseRate: 98,
      avgResponseTime: '9 mins',
      onTimePercentage: 98,
      cancellationRate: '0.6%',
      completedBookings: 175
    },

    detailedRatings: {
      designQuality: 4.9,
      onTimeArrival: 4.9,
      behaviour: 4.9,
      priceTransparency: 4.9,
      cleanliness: 4.9
    },

    availability: {
      '2026-10-01': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-02': { morning: 'available', afternoon: 'available', evening: 'booked', night: 'available' },
      '2026-10-03': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' }, // backup candidate!
      '2026-10-04': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-05': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-06': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-07': { morning: 'booked', afternoon: 'booked', evening: 'booked', night: 'booked' },
      '2026-10-08': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-10': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-15': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-24': { morning: 'available', afternoon: 'available', evening: 'booked', night: 'booked' },
      '2026-10-28': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' }
    },

    portfolio: [
      {
        id: 'port-05-1',
        title: 'Geometric Moroccan & Arabic Jaal',
        hindiTitle: 'ज्यामितीय मोरक्कन व अरेबिक जाल',
        category: 'Arabic',
        placement: 'Forearms & Palms',
        appliedDate: '08 Feb 2026 at Nauka Vihar Resort',
        duration: '3.5 Hours',
        packagePrice: '₹5,500',
        isOriginal: true,
        image: '/images/hero_bridal_mehndi.jpg'
      },
      {
        id: 'port-05-2',
        title: 'Minimalist Dulha Mehndi with Hast Melap Motif',
        hindiTitle: 'हस्त मिलाप व गणपति मोटिफ युक्त दूल्हा मेहंदी',
        category: 'Bridal Traditional',
        placement: 'Palms & Wrists',
        appliedDate: '15 Jan 2026 at Taramandal',
        duration: '1.0 Hour',
        packagePrice: '₹1,500',
        isOriginal: true,
        image: '/images/portrait_mehndi_art.jpg'
      }
    ],

    reviews: [
      {
        id: 'rev-05-1',
        bookingId: 'GKP-MHN-2026-0639',
        customerName: 'Aditya & Neha Rai',
        locality: 'Taramandal, Gorakhpur',
        eventDate: '08 Feb 2026',
        rating: 4.9,
        detailedRating: {
          designQuality: 4.9,
          onTimeArrival: 5.0,
          behaviour: 4.9,
          priceTransparency: 5.0,
          cleanliness: 4.9
        },
        comment: 'Alka did both bride and groom mehndi for our destination function at Nauka Vihar. Highly professional, zero mess, exact transparent billing.',
        hindiComment: 'अलका जी ने नौका विहार के वेन्यू पर दूल्हा और दुल्हन दोनों की मेहंदी बहुत सफाई से लगाई। कोई अतिरिक्त या छुपा चार्ज नहीं लिया गया।'
      }
    ]
  },
  {
    id: 'gkp-art-06',
    name: 'Sunita Arts & Bridal Design',
    hindiName: 'सुनीता आर्ट्स व ब्राइडल डिजाइन',
    tagline: 'Veteran mehndi artist with 14 years serving Golghar, Basharatpur & Medical College',
    hindiTagline: '14 वर्षों के अनुभव के साथ पारंपरिक व आधुनिक ब्राइडल आर्टिस्ट',
    localityId: 'basharatpur',
    locality: 'Basharatpur, Gorakhpur',
    hindiLocality: 'बशारतपुर, गोरखपुर',
    experienceYears: 14,
    phone: '+91 94150 67231',
    whatsapp: '+919415067231',
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=400&q=80',
    coverImage: '/images/hero_bridal_mehndi.jpg',
    specialties: ['Bridal Traditional', 'Peacock Motifs', 'Rajasthani', 'Sangeet Functions'],
    rating: 4.91,
    reviewCount: 280,
    baseTravelDistanceKm: 4.0,
    organicHennaGuaranteed: true,
    coneBrand: 'Traditional Rajasthani Triple-Filtered Herbal Henna',

    pricing: {
      bridalBase: 5000,
      bridalPackageName: 'Basharatpur Royal Bridal Heritage',
      guestPerSideRate: 160,
      feetPackageAddon: 1600,
      portraitAddon: 1300,
      travelFeePerKm: 20,
      freeTravelRadiusKm: 4,
      overtimePerHour: 350
    },

    verification: {
      isVerified: true,
      identityVerified: true,
      phoneVerified: true,
      portfolioChecked: true,
      skillChecked: true,
      homeServiceVerified: true
    },

    reliability: {
      score: 99,
      responseRate: 99,
      avgResponseTime: '5 mins',
      onTimePercentage: 99,
      cancellationRate: '0.2%',
      completedBookings: 390
    },

    detailedRatings: {
      designQuality: 4.9,
      onTimeArrival: 5.0,
      behaviour: 5.0,
      priceTransparency: 5.0,
      cleanliness: 4.9
    },

    availability: {
      '2026-10-01': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-02': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-03': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' }, // backup hero!
      '2026-10-04': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-05': { morning: 'available', afternoon: 'available', evening: 'booked', night: 'booked' },
      '2026-10-06': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-07': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-08': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-10': { morning: 'available', afternoon: 'booked', evening: 'booked', night: 'available' },
      '2026-10-15': { morning: 'booked', afternoon: 'booked', evening: 'booked', night: 'booked' },
      '2026-10-24': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-28': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' }
    },

    portfolio: [
      {
        id: 'port-06-1',
        title: 'Grand Mayur Pankh & Jharokha Dulhan Art',
        hindiTitle: 'मयूर पंख व झरोखा दुल्हन कला',
        category: 'Bridal Traditional',
        placement: 'Elbow Length Both Hands',
        appliedDate: '10 Feb 2026 at Basharatpur',
        duration: '4.0 Hours',
        packagePrice: '₹6,500',
        isOriginal: true,
        image: '/images/hero_bridal_mehndi.jpg'
      }
    ],

    reviews: [
      {
        id: 'rev-06-1',
        bookingId: 'GKP-MHN-2026-0518',
        customerName: 'Deepa Tripathi',
        locality: 'Basharatpur, Gorakhpur',
        eventDate: '10 Feb 2026',
        rating: 5.0,
        detailedRating: {
          designQuality: 5.0,
          onTimeArrival: 5.0,
          behaviour: 5.0,
          priceTransparency: 5.0,
          cleanliness: 5.0
        },
        comment: 'Sunita didi is like a family elder. Her patience while applying intricate henna on my trembling hands was heartwarming.',
        hindiComment: 'सुनीता दीदी ने बहुत ही धैर्य और प्रेम से सुंदर मेहंदी लगाई। 14 साल का अनुभव साफ दिखता है।'
      }
    ]
  },
  {
    id: 'gkp-art-07',
    name: 'Meera Henna Artistry',
    hindiName: 'मीरा हिना आर्टिस्ट्री',
    tagline: 'Contemporary Khafif & Western lace patterns in Medical College Road area',
    hindiTagline: 'आधुनिक खफीफ व वेस्टर्न लेस मेहंदी पैटर्न, मेडिकल कॉलेज रोड',
    localityId: 'medical_road',
    locality: 'Medical College Road (BRD), Gorakhpur',
    hindiLocality: 'मेडिकल कॉलेज रोड (बीआरडी), गोरखपुर',
    experienceYears: 5,
    phone: '+91 96210 55490',
    whatsapp: '+919621055490',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80',
    specialties: ['Khafif Gulf Art', 'Indo-Western Lace', 'Floral Mandalas'],
    rating: 4.82,
    reviewCount: 78,
    baseTravelDistanceKm: 6.5,
    organicHennaGuaranteed: true,
    coneBrand: 'Sojat Organic Cones with Lavender & Eucalyptus Infusion',

    pricing: {
      bridalBase: 4200,
      bridalPackageName: 'Khafif Elegance Bridal (Forearm Hands + Feet Accents)',
      guestPerSideRate: 160,
      feetPackageAddon: 1400,
      portraitAddon: 1100,
      travelFeePerKm: 25,
      freeTravelRadiusKm: 4,
      overtimePerHour: 350
    },

    verification: {
      isVerified: true,
      identityVerified: true,
      phoneVerified: true,
      portfolioChecked: true,
      skillChecked: true,
      homeServiceVerified: true
    },

    reliability: {
      score: 96,
      responseRate: 96,
      avgResponseTime: '12 mins',
      onTimePercentage: 97,
      cancellationRate: '0.9%',
      completedBookings: 104
    },

    detailedRatings: {
      designQuality: 4.9,
      onTimeArrival: 4.8,
      behaviour: 4.8,
      priceTransparency: 5.0,
      cleanliness: 4.8
    },

    availability: {
      '2026-10-01': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-02': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-03': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-04': { morning: 'available', afternoon: 'available', evening: 'booked', night: 'booked' },
      '2026-10-05': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-06': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-07': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-08': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-10': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-15': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-24': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-28': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' }
    },

    portfolio: [
      {
        id: 'port-07-1',
        title: 'Delicate Dubai Style Khafif Chains',
        hindiTitle: 'बारीक दुबई स्टाइल खफीफ बेल व चेन',
        category: 'Khafif Gulf Art',
        placement: 'Back Hands & Fingers',
        appliedDate: '01 Mar 2026 at BRD Medical Road',
        duration: '2.0 Hours',
        packagePrice: '₹2,800',
        isOriginal: true,
        image: '/images/hero_bridal_mehndi.jpg'
      }
    ],

    reviews: [
      {
        id: 'rev-07-1',
        bookingId: 'GKP-MHN-2026-0410',
        customerName: 'Dr. Garima Shukla',
        locality: 'Medical College Road, Gorakhpur',
        eventDate: '01 Mar 2026',
        rating: 4.8,
        detailedRating: {
          designQuality: 4.9,
          onTimeArrival: 4.8,
          behaviour: 4.8,
          priceTransparency: 5.0,
          cleanliness: 4.9
        },
        comment: 'I wanted airy, negative-space henna rather than thick black filling. Meera delivered perfection!',
        hindiComment: 'मुझे घनी मेहंदी की जगह बारीक व खुला पैटर्न चाहिए था। मीरा जी ने वैसा ही शानदार काम किया।'
      }
    ]
  },
  {
    id: 'gkp-art-08',
    name: 'Shalini Gupta Designer Mehndi',
    hindiName: 'शालिनी गुप्ता डिजाइनर मेहंदी',
    tagline: 'Specialist in Rapti Nagar & Asuran for bride + 10 family package deals',
    hindiTagline: 'राप्ती नगर व असुरन क्षेत्र में दुल्हन एवं परिवार कॉम्बो पैकेज विशेषज्ञ',
    localityId: 'rapti_nagar',
    locality: 'Rapti Nagar (Phase 2), Gorakhpur',
    hindiLocality: 'राप्ती नगर (फेज 2), गोरखपुर',
    experienceYears: 7,
    phone: '+91 98390 99214',
    whatsapp: '+919839099214',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    coverImage: '/images/portrait_mehndi_art.jpg',
    specialties: ['Bridal Traditional', 'Family Combo', 'Marwari Jaal'],
    rating: 4.85,
    reviewCount: 130,
    baseTravelDistanceKm: 5.5,
    organicHennaGuaranteed: true,
    coneBrand: 'Certified Natural Henna with Nilgiri Infusion',

    pricing: {
      bridalBase: 4800,
      bridalPackageName: 'Dulhan Shringaar Deluxe',
      guestPerSideRate: 150,
      feetPackageAddon: 1500,
      portraitAddon: 1200,
      travelFeePerKm: 20,
      freeTravelRadiusKm: 4,
      overtimePerHour: 350
    },

    verification: {
      isVerified: true,
      identityVerified: true,
      phoneVerified: true,
      portfolioChecked: true,
      skillChecked: true,
      homeServiceVerified: true
    },

    reliability: {
      score: 97,
      responseRate: 98,
      avgResponseTime: '8 mins',
      onTimePercentage: 98,
      cancellationRate: '0.7%',
      completedBookings: 165
    },

    detailedRatings: {
      designQuality: 4.9,
      onTimeArrival: 4.8,
      behaviour: 4.9,
      priceTransparency: 5.0,
      cleanliness: 4.8
    },

    availability: {
      '2026-10-01': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-02': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-03': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-04': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-05': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-06': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-07': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-08': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-10': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-15': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-24': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' },
      '2026-10-28': { morning: 'available', afternoon: 'available', evening: 'available', night: 'available' }
    },

    portfolio: [
      {
        id: 'port-08-1',
        title: 'Traditional Radha-Krishna Mandap Bridal Henna',
        hindiTitle: 'पारंपरिक राधा-कृष्ण मंडप ब्राइडल मेहंदी',
        category: 'Bridal Traditional',
        placement: 'Forearms & Palms',
        appliedDate: '25 Jan 2026 at Rapti Nagar Phase 2',
        duration: '4.5 Hours',
        packagePrice: '₹6,800',
        isOriginal: true,
        image: '/images/hero_bridal_mehndi.jpg'
      }
    ],

    reviews: [
      {
        id: 'rev-08-1',
        bookingId: 'GKP-MHN-2026-0391',
        customerName: 'Rashmi Tripathi',
        locality: 'Rapti Nagar, Gorakhpur',
        eventDate: '25 Jan 2026',
        rating: 4.9,
        detailedRating: {
          designQuality: 4.9,
          onTimeArrival: 4.9,
          behaviour: 5.0,
          priceTransparency: 5.0,
          cleanliness: 4.8
        },
        comment: 'Shalini came with all her sanitized tools and organic cones. Pricing was completely transparent.',
        hindiComment: 'शालिनी जी पूरी तैयारी व साफ किट के साथ आईं। मूल्य बिल्कुल पारदर्शी था।'
      }
    ]
  }
];
