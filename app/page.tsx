'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Calendar,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  CheckCircle2,
  ArrowRight,
  Star,
  Users,
  Percent,
  Phone,
  Zap,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import CommissionBadge from '@/components/CommissionBadge';
import { formatINR } from '@/lib/commission-calculator';

export default function HomePage() {
  const router = useRouter();
  const { artists, bookings, settings } = useMarketplace();

  const [selectedLocality, setSelectedLocality] = useState('baraipar_mod');
  const [selectedDate, setSelectedDate] = useState('2026-10-15');
  const [selectedSlot, setSelectedSlot] = useState('evening');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/artists?date=${selectedDate}&slot=${selectedSlot}&locality=${selectedLocality}`);
  };

  return (
    <div className="space-y-16 pb-16 text-left">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2a1205] via-[#481e08] to-[#163820] text-white pt-12 pb-20 px-4 sm:px-6">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c59b4e_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-[#c59b4e]/40 text-amber-300 text-xs font-bold tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
              <span>Gorakhpur’s Premier Date-Locked Mehndi Marketplace</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-serif leading-tight">
              Shubh Vivah Ki <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e2b96f] via-[#ffd580] to-[#c59b4e]">
                Pakki Mehndi,
              </span>{' '}
              Pakki Tareekh
            </h1>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Book vetted bridal & guest mehndi artists across Gorakhpur with transparent tiered pricing. 20% advance locks your auspicious wedding date, with guaranteed standby replacement if an emergency arises.
            </p>

            {/* Quick Hub Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-stone-300">
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                Main Center: Baraipar Mod (273413)
              </span>
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                5-Point Verified Artists
              </span>
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
                <Percent className="w-3.5 h-3.5 text-amber-300" />
                Tiered Commission (10% - 15%)
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/artists"
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#c59b4e] to-[#88451b] hover:from-[#d4aa5c] hover:to-[#994e1f] text-white font-bold text-sm shadow-lg flex items-center gap-2 transition-transform hover:scale-102"
              >
                <span>Browse All Gorakhpur Artists</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/tracker"
                className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-colors"
              >
                Track Live Booking
              </Link>
            </div>
          </div>

          {/* Right Search Box */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 text-stone-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-amber-200/60 backdrop-blur-md space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div>
                  <h3 className="font-extrabold text-base text-[#3d1808] font-serif">
                    Find Available Artist
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Live slot checking for Gorakhpur localities
                  </p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-[#163820] text-emerald-300 flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
              </div>

              <form onSubmit={handleQuickSearch} className="space-y-4 text-xs">
                {/* Locality */}
                <div className="space-y-1">
                  <label className="font-bold text-stone-700 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#88451b]" />
                    <span>Gorakhpur Locality</span>
                  </label>
                  <select
                    value={selectedLocality}
                    onChange={(e) => setSelectedLocality(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 font-medium text-stone-900 focus:outline-hidden focus:border-[#88451b]"
                  >
                    <option value="baraipar_mod">Baraipar Mod (Center Hub)</option>
                    <option value="kauriram">Kauriram</option>
                    <option value="belipar">Belipar</option>
                    <option value="mahavir_chapra">Mahavir Chapra</option>
                    <option value="naushad">Naushad (Chauraha)</option>
                    <option value="taramandal">Taramandal (Nauka Vihar)</option>
                    <option value="rustampur">Rustampur</option>
                    <option value="mohadipur">Mohaddipur</option>
                    <option value="betiahata">Betiahata</option>
                    <option value="golghar">Golghar (City Center)</option>
                  </select>
                </div>

                {/* Date */}
                <div className="space-y-1">
                  <label className="font-bold text-stone-700 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#88451b]" />
                    <span>Wedding / Event Date</span>
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 font-bold text-stone-900 focus:outline-hidden focus:border-[#88451b]"
                  />
                </div>

                {/* Time Slot */}
                <div className="space-y-1">
                  <label className="font-bold text-stone-700 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#88451b]" />
                    <span>Preferred Time Slot</span>
                  </label>
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 font-medium text-stone-900 focus:outline-hidden focus:border-[#88451b]"
                  >
                    <option value="morning">Morning (9:00 AM – 1:00 PM)</option>
                    <option value="afternoon">Afternoon (1:00 PM – 5:00 PM)</option>
                    <option value="evening">Evening (5:00 PM – 9:00 PM)</option>
                    <option value="night">Night (9:00 PM – 12:00 AM)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#163820] hover:bg-[#1a4427] text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  <span>Check Availability & Calculate Price</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMMISSION MARKETPLACE MODEL EXPLAINER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#88451b] bg-[#88451b]/10 px-3 py-1 rounded-full border border-[#88451b]/20">
            Fair & Transparent Marketplace Model
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            How Rang Riwaaz Commission System Works
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Clear tier-based platform fees ensure both client trust and artist prosperity with zero hidden charges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tier 1: Bridal */}
          <div className="bg-white rounded-3xl border border-rose-200 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="w-2 h-full bg-rose-700 absolute left-0 top-0" />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-[10px] font-extrabold uppercase tracking-wide">
                  Tier 1 Specialists
                </span>
                <span className="text-2xl font-black text-rose-800">
                  {settings.defaultBridalCommission}%
                </span>
              </div>
              <h3 className="text-lg font-bold text-stone-900">
                Bridal Henna Specialists
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Dedicated lead artists specializing in royal Doli-Baraat portraits, Sojat henna paste, and high-stakes wedding ceremonies.
              </p>
              <ul className="space-y-2 text-xs text-stone-600 pt-2 border-t border-stone-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-700 shrink-0" />
                  <span>20% advance token locks slot on calendar</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-700 shrink-0" />
                  <span>80% balance collected post ceremony</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-700 shrink-0" />
                  <span>Includes standby backup artist guarantee</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Tier 2: Top-Rated */}
          <div className="bg-white rounded-3xl border border-amber-300 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden ring-1 ring-amber-400/30">
            <div className="w-2 h-full bg-amber-500 absolute left-0 top-0" />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase tracking-wide">
                  Tier 2 Elite
                </span>
                <span className="text-2xl font-black text-amber-600">
                  {settings.defaultTopRatedCommission}%
                </span>
              </div>
              <h3 className="text-lg font-bold text-stone-900">
                Top-Rated / Elite Artists
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Artists maintaining 4.85+ ratings, 50+ verified wedding deliveries, and 98%+ on-time arrival scores in Gorakhpur.
              </p>
              <ul className="space-y-2 text-xs text-stone-600 pt-2 border-t border-stone-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Discounted 12% platform fee incentive</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Express 24-hour payout settlement</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Preferred placement on search results</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Tier 3: Regular */}
          <div className="bg-white rounded-3xl border border-emerald-200 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="w-2 h-full bg-emerald-600 absolute left-0 top-0" />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wide">
                  Tier 3 Regular
                </span>
                <span className="text-2xl font-black text-emerald-800">
                  {settings.defaultRegularCommission}%
                </span>
              </div>
              <h3 className="text-lg font-bold text-stone-900">
                Standard & Sangeet Artists
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Fast, dependable artists ideal for family members, guest stations, Karwa Chauth, Teej, and engagement gatherings.
              </p>
              <ul className="space-y-2 text-xs text-stone-600 pt-2 border-t border-stone-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Lowest platform commission (only 10%)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>High booking volume & repeat clientele</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Direct client cash collection at venue</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED VERIFIED ARTISTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#163820]">
              Curated Talent
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              Featured Mehndi Artists in Gorakhpur
            </h2>
            <p className="text-xs text-stone-500">
              Each artist is 5-point verified with original portfolio inspection and date-lock calendar.
            </p>
          </div>

          <Link
            href="/artists"
            className="text-xs font-bold text-[#88451b] hover:text-[#54250a] flex items-center gap-1"
          >
            <span>View All Artists ({artists.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Photo & Badges */}
                <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                  <img
                    src={artist.avatar}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <CommissionBadge tier={artist.categoryTier} size="sm" />
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{artist.rating} ({artist.reviewCount})</span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-bold text-base text-stone-900 group-hover:text-[#88451b] transition-colors">
                      {artist.name}
                    </h3>
                    <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#88451b] shrink-0" />
                      <span>{artist.locality}</span>
                    </p>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {artist.bio}
                  </p>

                  {/* 5-Point Verification Status */}
                  <div className="flex items-center gap-1 pt-1">
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      5-Point Verified
                    </span>
                    <span className="text-[10px] text-stone-400 font-medium">
                      • {artist.experienceYears}y exp
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase font-bold">
                    Packages From
                  </span>
                  <span className="text-base font-extrabold text-[#3d1808]">
                    {artist.categoryTier === 'bridal' ? '₹5,500' : '₹2,500'}
                  </span>
                </div>

                <Link
                  href={`/artists/${artist.id}`}
                  className="py-2 px-3.5 bg-[#88451b] hover:bg-[#54250a] text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
                >
                  Book Slot
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 9-STAGE MILESTONE TIMELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-[#1c0e05] via-[#2d1508] to-[#163820] text-white rounded-3xl p-8 sm:p-10 shadow-lg border border-[#c59b4e]/30">
          <div className="max-w-3xl space-y-3 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              Zero Anxiety Guarantee
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
              9-Stage Live Milestone Booking Tracker
            </h2>
            <p className="text-xs sm:text-sm text-stone-300">
              No endless phone calls asking where the artist is. Every booking includes real-time milestone updates and emergency standby backup artist pre-assignment.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 space-y-1">
              <span className="text-amber-300 font-bold font-mono">01</span>
              <strong className="block text-white text-xs">Inquiry & Dates</strong>
              <p className="text-[11px] text-stone-400">Date & slot availability verification</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 space-y-1">
              <span className="text-amber-300 font-bold font-mono">02</span>
              <strong className="block text-white text-xs">Price Locked</strong>
              <p className="text-[11px] text-stone-400">Itemized formula with travel fee</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 space-y-1">
              <span className="text-amber-300 font-bold font-mono">03</span>
              <strong className="block text-white text-xs">20% Token Paid</strong>
              <p className="text-[11px] text-stone-400">Slot locked red on artist calendar</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 space-y-1">
              <span className="text-amber-300 font-bold font-mono">04</span>
              <strong className="block text-white text-xs">Backup Assigned</strong>
              <p className="text-[11px] text-stone-400">Standby matched by locality & style</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 space-y-1">
              <span className="text-emerald-300 font-bold font-mono">05</span>
              <strong className="block text-white text-xs">Artist En Route</strong>
              <p className="text-[11px] text-emerald-200">Live GPS tracking & arrival ETA</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
