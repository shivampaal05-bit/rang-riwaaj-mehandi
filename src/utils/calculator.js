// Transparent Price Calculation Engine for MehndiConnect Gorakhpur

export function calculateMehndiPrice({
  artist,
  serviceType = 'bridal', // 'bridal' | 'guest' | 'groom' | 'engagement' | 'festival'
  bridalHandOption = 'elbow', // 'wrist' | 'forearm' | 'elbow'
  includeFeet = true,
  feetCoverage = 'ankle', // 'ankle' | 'midcalf' | 'full'
  guestCount = 0,
  guestHandSides = 1, // 1 side per person or 2 sides
  travelDistanceKm = 0, // distance in km from artist to venue
  extraPortrait = false, // Bride & Groom portrait artwork
  extraStoryWork = false, // Doli, Baraat, Varmala custom scene
  extraConesUpgrade = true, // Premium Rajasthani organic certified cones
  isLateNight = false, // After 10:00 PM surcharge
  promoCode = '',
}) {
  const pricing = artist?.pricing || {
    bridalBase: 5000,
    guestPerSideRate: 180,
    feetPackageAddon: 1600,
    portraitAddon: 1400,
    travelFeePerKm: 25,
    freeTravelRadiusKm: 3,
    overtimePerHour: 400
  };

  // 1. Base Package Calculation
  let basePackage = 0;
  let basePackageName = '';

  if (serviceType === 'bridal') {
    if (bridalHandOption === 'wrist') {
      basePackage = Math.round(pricing.bridalBase * 0.7);
      basePackageName = 'Bridal Palms & Wrists';
    } else if (bridalHandOption === 'forearm') {
      basePackage = Math.round(pricing.bridalBase * 0.85);
      basePackageName = 'Bridal Forearms';
    } else {
      basePackage = pricing.bridalBase;
      basePackageName = pricing.bridalPackageName || 'Bridal Elbow-Length';
    }
  } else if (serviceType === 'guest') {
    basePackage = 2000;
    basePackageName = 'Sangeet Base Setup';
  } else if (serviceType === 'groom') {
    basePackage = 1500;
    basePackageName = 'Groom (Dulha) Mehndi Standard';
  } else if (serviceType === 'engagement') {
    basePackage = 3200;
    basePackageName = 'Engagement Classic';
  } else {
    basePackage = 2200;
    basePackageName = 'Festival Special';
  }

  // 2. Feet Mehndi Addon (if selected)
  let feetCharge = 0;
  let feetLabel = 'Not Selected';
  if (includeFeet && (serviceType === 'bridal' || serviceType === 'engagement')) {
    if (feetCoverage === 'ankle') {
      feetCharge = pricing.feetPackageAddon;
      feetLabel = 'Feet till Ankles / Payal Cuffs';
    } else if (feetCoverage === 'midcalf') {
      feetCharge = Math.round(pricing.feetPackageAddon * 1.35);
      feetLabel = 'Feet till Mid-Calf';
    } else {
      feetCharge = Math.round(pricing.feetPackageAddon * 1.7);
      feetLabel = 'Full Royal Bridal Feet';
    }
  }

  // 3. Guest Charges
  const totalGuestSides = guestCount * guestHandSides;
  const guestRate = pricing.guestPerSideRate || 180;
  const guestCharge = totalGuestSides * guestRate;

  // 4. Travel Fee (Free within radius, per km beyond)
  const freeKm = pricing.freeTravelRadiusKm || 3;
  const billableKm = Math.max(0, travelDistanceKm - freeKm);
  const travelFee = Math.round(billableKm * (pricing.travelFeePerKm || 25));

  // 5. Extra Custom Design Requirements
  let portraitCharge = extraPortrait ? (pricing.portraitAddon || 1400) : 0;
  let storyWorkCharge = extraStoryWork ? 1200 : 0;
  let conesFee = 0; // Included free on Rang Riwaaz Mehandi to guarantee organic purity

  // 6. Overtime / Late Night Fee
  let overtimeFee = isLateNight ? (pricing.overtimePerHour * 2 || 800) : 0;

  // Subtotal before discounts
  const subtotal = basePackage + feetCharge + guestCharge + travelFee + portraitCharge + storyWorkCharge + overtimeFee;

  // 7. Discounts & Guarantees
  let discount = 0;
  let discountNote = 'No discount code applied';
  const cleanPromo = (promoCode || '').trim().toUpperCase();

  if (cleanPromo === 'GORAKHPUR10') {
    discount = Math.round(subtotal * 0.10);
    discountNote = '10% Gorakhpur Wedding Special Discount';
  } else if (cleanPromo === 'SHUBH500') {
    discount = Math.min(subtotal, 500);
    discountNote = '₹500 Shubh Vivah Welcome Discount';
  } else if (cleanPromo === 'BACKUPPROTECT') {
    discount = 300;
    discountNote = 'Rang Riwaaz Mehandi Safety Courtesy Discount';
  }

  // Total Final Amount
  const finalTotal = Math.max(0, subtotal - discount);

  // Suggested advance lock token (typically 20% to lock date securely)
  const advanceToLock = Math.round(finalTotal * 0.20);
  const balanceOnCompletion = finalTotal - advanceToLock;

  return {
    basePackage,
    basePackageName,
    includeFeet,
    feetCharge,
    feetLabel,
    guestCount,
    guestHandSides,
    guestRate,
    guestCharge,
    travelDistanceKm,
    freeKm,
    billableKm,
    travelFee,
    extraPortrait,
    portraitCharge,
    extraStoryWork,
    storyWorkCharge,
    conesFee,
    isLateNight,
    overtimeFee,
    subtotal,
    discount,
    discountNote,
    finalTotal,
    advanceToLock,
    balanceOnCompletion
  };
}

export function formatINR(val) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val || 0);
}
