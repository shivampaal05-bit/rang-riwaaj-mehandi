'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  Star,
  CheckCircle2,
  Phone,
  Heart,
  Share2,
  Lock,
  ArrowRight,
  Info,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import CommissionBadge from '@/components/CommissionBadge';
import { calculateCommissionBreakdown, formatINR } from '@/lib/commission-calculator';
import { GORAKHPUR_LOCALITIES } from '@/src/data/mockLocalities';

function ArtistDetailsContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { artists, createBooking, settings, currentUser } = useMarketplace();

  const artistId = (params?.id as string) || 'gkp-art-01';
  const artist = artists.find((a) => a.id === artistId) || artists[0];

  // Booking Form State
  const initialDate = searchParams.get('date') || '2026-10-15';
  const initialSlot = searchParams.get('slot') || 'evening';

  const [serviceType, setServiceType] = useState('bridal');
  const [bridalHandOption, setBridalHandOption] = useState<'wrist' | 'forearm' | 'elbow'>('elbow');
  const [includeFeet, setIncludeFeet] = useState(true);
  const [feetCoverage, setFeetCoverage] = useState<'ankle' | 'calf' | 'royal'>('ankle');
  const [guestCount, setGuestCount] = useState(4);
  const [venueLocality, setVenueLocality] = useState('golghar');
  const [venueAddress, setVenueAddress] = useState('Civil Lines near Indira Bal Vihar, Golghar');
  const [eventDate, setEventDate] = useState(initialDate);
  const [timeSlot, setTimeSlot] = useState(initialSlot);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Find travel distance from Baraipar Mod Hub
  const localityData = GORAKHPUR_LOCALITIES.find((l) => l.id === venueLocality) || GORAKHPUR_LOCALITIES[0];
  const travelDistanceKm = localityData.distanceKm;

  // Pricing Calculation
  const pricing = useMemo(() => {
    let basePrice = 5500;
    let serviceTitle = 'Bridal Mehndi Ceremony';

    if (serviceType === 'guest') {
      basePrice = 2500;
      serviceTitle = 'Family & Guest Sangeet Package';
    } else if (serviceType === 'groom') {
      basePrice = 1500;
      serviceTitle = 'Groom (Dulha) Mehndi';
    } else if (serviceType === 'engagement') {
      basePrice = 3200;
      serviceTitle = 'Engagement / Baby Shower Package';
    }

    // Bridal Hand add-on
    let handAddon = 0;
    if (serviceType === 'bridal') {
      if (bridalHandOption === 'forearm') handAddon = 1000;
      if (bridalHandOption === 'elbow') handAddon = 1800;
    }

    // Feet henna
    let feetAddon = 0;
    if (includeFeet) {
      if (feetCoverage === 'ankle') feetAddon = 1200;
      if (feetCoverage === 'calf') feetAddon = 2000;
      if (feetCoverage === 'royal') feetAddon = 3000;
    }

    // Guest charges (₹300 per guest)
    const guestCharges = guestCount * 300;

    // Subtotal
    const subtotal = basePrice + handAddon + feetAddon + guestCharges;

    // Travel fee calculation (Free within 3 km, ₹20 per km beyond)
    const freeKm = artist.freeTravelKm || 3;
    const ratePerKm = artist.travelChargePerKm || 20;
    const billableKm = Math.max(0, travelDistanceKm - freeKm);
    const travelFee = Math.round(billableKm * ratePerKm);

    // Gorakhpur auspicious discount (approx 5%)
    const discountAmount = Math.round(subtotal * 0.05);

    const finalTotal = subtotal + travelFee - discountAmount;

    // Commission breakdown
    const breakdown = calculateCommissionBreakdown({
      totalAmount: finalTotal,
      tier: artist.categoryTier,
      customRate: artist.commissionRate,
      settings,
    });

    return {
      serviceTitle,
      basePrice,
      handAddon,
      feetAddon,
      guestCharges,
      subtotal,
      travelFee,
      discountAmount,
      finalTotal,
      ...breakdown,
    };
  }, [
    serviceType,
    bridalHandOption,
    includeFeet,
    feetCoverage,
    guestCount,
    travelDistanceKm,
    artist,
    settings,
  ]);

  // Handle Booking Submit
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const newBooking = createBooking({
        artistId: artist.id,
        eventDate,
        timeSlot,
        serviceType,
        serviceName: pricing.serviceTitle,
        locality: localityData.name,
        venueAddress: venueAddress || localityData.name + ', Gorakhpur',
        guestCount,
        subtotal: pricing.subtotal,
        travelFee: pricing.travelFee,
        discountAmount: pricing.discountAmount,
        totalAmount: pricing.finalTotal,
      });

      router.push(`/tracker?bookingId=${newBooking.id}`);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to create booking.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10 text-left">
      {/* 1. Artist Header Profile */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-2 border-[#c59b4e] shrink-0 shadow-md">
            <img
              src={artist.avatar}
              alt={artist.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <CommissionBadge tier={artist.categoryTier} size="md" />
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                5-Point Verified
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              {artist.name}
            </h1>
            <p className="text-xs font-semibold text-stone-600">
              {artist.studioName}
            </p>

            <p className="text-xs text-stone-500 flex items-center gap-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#88451b]" />
                {artist.locality}
              </span>
              <span>•</span>
              <span className="text-amber-600 font-bold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {artist.rating} ({artist.reviewCount} verified reviews)
              </span>
              <span>•</span>
              <span>{artist.experienceYears} Years Experience</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] text-stone-400 font-bold uppercase block">
              Reliability Score
            </span>
            <span className="text-xl font-extrabold text-emerald-800">
              {artist.reliabilityMetrics?.onTimePercentage || 98}% On-Time
            </span>
            <span className="text-[11px] text-stone-500 block">
              Standby Backup Ready
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Grid: Left Portfolio & Bio / Right Interactive Price Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Details & Portfolio */}
        <div className="lg:col-span-7 space-y-6">
          {/* Bio */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-stone-900 font-serif">
              About the Artist
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {artist.bio}
            </p>
            <div className="text-xs text-stone-500 pt-2 border-t border-stone-100 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#88451b] shrink-0" />
              <span>Studio Address: {artist.address || 'Baraipar Mod Chauraha, Gorakhpur'}</span>
            </div>
          </div>

          {/* 5-Point Trust Badges Box */}
          <div className="bg-emerald-50/60 rounded-3xl border border-emerald-200 p-6 space-y-3">
            <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2 font-serif">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <span>5-Point Trust & Verification Status</span>
            </h3>
            <p className="text-xs text-emerald-800">
              Gorakhpur operations team has vetted this artist profile across five stringent security gates:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-emerald-900 pt-1">
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Govt Aadhaar / Photo ID Verified</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Primary Mobile & OTP Confirmed</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Original Portfolio Works Inspected</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Speed & Speed Symmetrical Skill Test</span>
              </div>
            </div>
          </div>

          {/* Portfolio Gallery */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-stone-900 font-serif">
              Authentic Portfolio Showcase
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-stone-200 group relative">
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80"
                  alt="Bridal Hands"
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-2.5 bg-white text-xs font-bold text-stone-800">
                  Royal Doli-Baraat Hand Art
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-stone-200 group relative">
                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80"
                  alt="Bridal Feet"
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-2.5 bg-white text-xs font-bold text-stone-800">
                  Intricate Floral Bridal Feet
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Price Calculator & Booking Lock */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl border-2 border-[#c59b4e]/50 p-6 sm:p-7 shadow-xl space-y-5 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <h3 className="font-extrabold text-base text-[#3d1808] font-serif">
                  Date-Locked Booking Calculator
                </h3>
                <p className="text-[11px] text-stone-500">
                  Transparent breakdown with 20% advance token
                </p>
              </div>
              <Lock className="w-5 h-5 text-[#88451b]" />
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-rose-800 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
              {/* Event Date & Slot */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Event Date
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 font-bold text-stone-900"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 font-medium text-stone-900"
                  >
                    <option value="morning">Morning (9 AM - 1 PM)</option>
                    <option value="afternoon">Afternoon (1 PM - 5 PM)</option>
                    <option value="evening">Evening (5 PM - 9 PM)</option>
                    <option value="night">Night (9 PM - 12 AM)</option>
                  </select>
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Primary Service
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setServiceType('bridal')}
                    className={`py-2 px-3 rounded-xl font-bold border text-left transition-all ${
                      serviceType === 'bridal'
                        ? 'bg-rose-50 border-rose-400 text-rose-900 shadow-xs'
                        : 'bg-stone-50 border-stone-200 text-stone-700'
                    }`}
                  >
                    👰 Bridal Henna (₹5,500)
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceType('guest')}
                    className={`py-2 px-3 rounded-xl font-bold border text-left transition-all ${
                      serviceType === 'guest'
                        ? 'bg-rose-50 border-rose-400 text-rose-900 shadow-xs'
                        : 'bg-stone-50 border-stone-200 text-stone-700'
                    }`}
                  >
                    👭 Sangeet Guests (₹2,500)
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceType('engagement')}
                    className={`py-2 px-3 rounded-xl font-bold border text-left transition-all ${
                      serviceType === 'engagement'
                        ? 'bg-rose-50 border-rose-400 text-rose-900 shadow-xs'
                        : 'bg-stone-50 border-stone-200 text-stone-700'
                    }`}
                  >
                    💍 Engagement (₹3,200)
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceType('groom')}
                    className={`py-2 px-3 rounded-xl font-bold border text-left transition-all ${
                      serviceType === 'groom'
                        ? 'bg-rose-50 border-rose-400 text-rose-900 shadow-xs'
                        : 'bg-stone-50 border-stone-200 text-stone-700'
                    }`}
                  >
                    🤵 Groom Mehndi (₹1,500)
                  </button>
                </div>
              </div>

              {/* Bridal Hand Length Options */}
              {serviceType === 'bridal' && (
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Bridal Hand Coverage
                  </label>
                  <select
                    value={bridalHandOption}
                    onChange={(e) => setBridalHandOption(e.target.value as any)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 font-medium text-stone-900"
                  >
                    <option value="wrist">Wrist Length (Included in base)</option>
                    <option value="forearm">Mid-Forearm Length (+₹1,000)</option>
                    <option value="elbow">Full Elbow Royal Length (+₹1,800)</option>
                  </select>
                </div>
              )}

              {/* Feet Henna Toggle */}
              {serviceType === 'bridal' && (
                <div className="space-y-1.5 p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-stone-800">
                      <input
                        type="checkbox"
                        checked={includeFeet}
                        onChange={(e) => setIncludeFeet(e.target.checked)}
                        className="w-4 h-4 rounded text-rose-700"
                      />
                      <span>Include Bridal Feet Henna</span>
                    </label>
                    <span className="text-[11px] font-bold text-rose-900">
                      +₹1,200 – ₹3,000
                    </span>
                  </div>

                  {includeFeet && (
                    <select
                      value={feetCoverage}
                      onChange={(e) => setFeetCoverage(e.target.value as any)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-1.5 font-medium text-stone-900 mt-1"
                    >
                      <option value="ankle">Ankles / Payal Cuffs (+₹1,200)</option>
                      <option value="calf">Mid-Calf Traditional (+₹2,000)</option>
                      <option value="royal">Royal Full Feet High-Calf (+₹3,000)</option>
                    </select>
                  )}
                </div>
              )}

              {/* Additional Guests */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-bold text-stone-700">
                    Additional Family Guests (₹300/guest)
                  </label>
                  <span className="font-bold text-stone-900">{guestCount} Guests</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={guestCount}
                  onChange={(e) => setGuestCount(parseInt(e.target.value))}
                  className="w-full accent-[#88451b]"
                />
              </div>

              {/* Gorakhpur Locality Selection */}
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Wedding Venue Locality in Gorakhpur
                </label>
                <select
                  value={venueLocality}
                  onChange={(e) => setVenueLocality(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 font-medium text-stone-900"
                >
                  {GORAKHPUR_LOCALITIES.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name} ({loc.distanceKm} km from Baraipar Mod Hub)
                    </option>
                  ))}
                </select>
              </div>

              {/* Venue Address */}
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Exact Venue Address
                </label>
                <input
                  type="text"
                  placeholder="e.g. House 42, Civil Lines near Indira Bal Vihar"
                  value={venueAddress}
                  onChange={(e) => setVenueAddress(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 font-medium"
                  required
                />
              </div>

              {/* ITEMIZED PRICE BREAKDOWN */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Base Package:</span>
                  <span>{formatINR(pricing.basePrice)}</span>
                </div>

                {pricing.handAddon > 0 && (
                  <div className="flex justify-between text-stone-600">
                    <span>Hand Coverage Upgrade:</span>
                    <span>+{formatINR(pricing.handAddon)}</span>
                  </div>
                )}

                {pricing.feetAddon > 0 && (
                  <div className="flex justify-between text-stone-600">
                    <span>Feet Henna Addon:</span>
                    <span>+{formatINR(pricing.feetAddon)}</span>
                  </div>
                )}

                {pricing.guestCharges > 0 && (
                  <div className="flex justify-between text-stone-600">
                    <span>Guests ({guestCount} × ₹300):</span>
                    <span>+{formatINR(pricing.guestCharges)}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-600">
                  <span>Travel ({travelDistanceKm} km):</span>
                  <span>+{formatINR(pricing.travelFee)}</span>
                </div>

                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Gorakhpur Shubh Discount:</span>
                  <span>-{formatINR(pricing.discountAmount)}</span>
                </div>

                <div className="pt-2 border-t border-stone-200 flex justify-between items-center font-extrabold text-sm text-[#3d1808]">
                  <span>Total Booking Value:</span>
                  <span className="text-base text-rose-950">
                    {formatINR(pricing.finalTotal)}
                  </span>
                </div>
              </div>

              {/* PAYMENT & COMMISSION SPLIT BOX */}
              <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-300/80 space-y-2 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-950 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    20% Online Advance Token (Date-Lock):
                  </span>
                  <strong className="text-sm font-extrabold text-rose-900">
                    {formatINR(pricing.advanceTokenAmount)}
                  </strong>
                </div>

                <div className="flex items-center justify-between text-stone-600">
                  <span>80% Balance Paid to Artist on Event:</span>
                  <span className="font-bold text-stone-800">
                    {formatINR(pricing.balanceCashAmount)}
                  </span>
                </div>

                {/* Transparency Note */}
                <div className="pt-1.5 border-t border-amber-200/80 text-[10px] text-amber-900 flex items-center justify-between">
                  <span>Platform Fee ({pricing.commissionRate}%): {formatINR(pricing.commissionAmount)}</span>
                  <span className="font-bold text-emerald-800">Artist Net: {formatINR(pricing.artistNetEarnings)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-[#88451b] via-[#54250a] to-[#163820] hover:opacity-95 text-white font-extrabold rounded-2xl text-xs transition-transform hover:scale-101 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4 text-amber-300" />
                <span>
                  {isSubmitting
                    ? 'Locking Your Date...'
                    : `Lock ${eventDate} with ${formatINR(pricing.advanceTokenAmount)} Advance`}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ArtistDetailsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-stone-500">Loading artist profile & price calculator...</div>}>
      <ArtistDetailsContent />
    </Suspense>
  );
}
