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
  MessageCircle,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import CommissionBadge from '@/components/CommissionBadge';
import InstagramButton from '@/components/InstagramButton';
import { getWhatsAppUrl, SOCIAL_CONFIG } from '@/lib/social-config';
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
      {/* 1. CINEMATIC VIDEO HERO SECTION */}
      <section className="relative overflow-hidden min-h-[560px] sm:min-h-[640px] lg:min-h-[700px] flex items-center justify-center text-center text-white border-b border-[#c59b4e]/30 pt-12 pb-20 sm:py-24">
        {/* Background Bridal Photo */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <img
            src="/assets/bride_hero.jpg"
            alt="Rang Riwaaz Bridal Mehndi Art"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
          />

          {/* Royal Dark Henna & Amber Glow Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c0e05]/80 via-[#230f06]/65 to-[#0e1f13]/85 backdrop-blur-[0.5px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,155,78,0.22)_0%,transparent_70%)] pointer-events-none" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center space-y-6 sm:space-y-7">
          {/* Centered Logo ONLY - no extra brand name text */}
          <div className="relative group">
            <div className="w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full p-1 sm:p-1.5 bg-gradient-to-tr from-[#c59b4e] via-[#edd096] to-[#88451b] shadow-2xl ring-2 sm:ring-4 ring-[#c59b4e]/50 transition-transform duration-500 group-hover:scale-105 overflow-hidden">
              <img
                src="/assets/logo.png"
                alt="Rang Riwaaz Mehandi"
                className="w-full h-full object-cover rounded-full bg-[#faf6ee] shadow-inner"
              />
            </div>
            <span className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#c59b4e] to-[#88451b] opacity-25 blur-lg pointer-events-none group-hover:opacity-45 transition-opacity" />
          </div>

          {/* Tagline in elegant script font */}
          <div className="space-y-2 max-w-2xl mx-auto">
            <p className="font-script text-3xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#ffe8c2] via-[#ffd79d] to-[#edd096] drop-shadow-lg leading-tight">
              “Haath par saji, dil tak pahunchi”
            </p>

            {/* Small text: Bridal | Engagement | Party Mehndi */}
            <p className="text-xs sm:text-sm md:text-base font-semibold tracking-[0.25em] uppercase text-stone-200/90 drop-shadow-sm pt-1">
              Bridal | Engagement | Party Mehndi
            </p>
          </div>

          {/* Two buttons: Book Now (links to WhatsApp) and View Designs (scrolls to gallery) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 sm:pt-4 w-full sm:w-auto">
            {/* Book Now Button */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-green-950/40 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Book Now</span>
            </a>

            {/* View Designs Button */}
            <a
              href="#designs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-2xl bg-white/10 hover:bg-white/20 border-2 border-[#c59b4e] text-[#ffdca8] hover:text-white font-extrabold text-sm sm:text-base backdrop-blur-md shadow-xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>View Designs</span>
            </a>
          </div>
        </div>
      </section>

      {/* QUICK DATE & SLOT AVAILABILITY CHECKER BAR */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-10 sm:-mt-12 relative z-20">
        <div className="bg-white/95 text-stone-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-amber-200/70 backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-stone-200 gap-2">
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-[#3d1808] font-serif flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#88451b]" />
                <span>Gorakhpur Live Slot & Availability Checker</span>
              </h3>
              <p className="text-xs text-stone-500">
                Check date-locked artist slots across Baraipar Mod, Golghar, Betiahata & all zones
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>20% Advance Date-Lock Guarantee</span>
            </div>
          </div>

          <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 text-xs">
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

            {/* Submit Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-3 bg-[#163820] hover:bg-[#1a4427] text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>Check Availability</span>
              </button>
            </div>
          </form>
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

      {/* 3. DESIGNS GALLERY & FEATURED ARTISTS */}
      <section id="designs" className="max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-24 space-y-10">
        {/* Gallery Showcase Header */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#88451b] bg-[#88451b]/10 px-3 py-1 rounded-full border border-[#88451b]/20">
                Exclusive Gallery Showcase
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif mt-2">
                Bridal, Engagement & Party Mehndi Designs
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                Explore signature hand-crafted patterns, royal Sojat stains, and bridal portraits created by Gorakhpur masters.
              </p>
            </div>
            <Link
              href="/artists"
              className="text-xs font-bold text-[#88451b] hover:text-[#54250a] flex items-center gap-1 shrink-0"
            >
              <span>Explore All Packages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 3 Visual Categories Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Royal Bridal */}
            <div className="group relative rounded-3xl overflow-hidden shadow-md border border-amber-200/80 bg-white flex flex-col">
              <div className="relative h-64 overflow-hidden bg-stone-900">
                <img
                  src="/assets/bride_hero.jpg"
                  alt="Royal Bridal Mehndi Design"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-3 left-3 bg-[#88451b] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md">
                  Royal Bridal
                </span>
                <span className="absolute bottom-3 right-3 bg-amber-400/90 text-stone-900 text-xs font-black px-2.5 py-1 rounded-xl shadow-xs">
                  From ₹5,500
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-base text-stone-900 font-serif group-hover:text-[#88451b] transition-colors">
                    Doli Baraat & Royal Bridal Portraits
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    Customized bride-groom faces, lotus mandalas, Sojat organic dark stain guarantee, and intricate elbow-length motifs.
                  </p>
                </div>
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-stone-600">Standby Artist Included</span>
                  <a
                    href={getWhatsAppUrl('Hello! I would like to book a Royal Bridal Mehndi package.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#25D366] hover:text-[#1da851] flex items-center gap-1"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2: Engagement & Arabic */}
            <div className="group relative rounded-3xl overflow-hidden shadow-md border border-amber-200/80 bg-white flex flex-col">
              <div className="relative h-64 overflow-hidden bg-stone-900">
                <img
                  src="/images/portrait_mehndi_art.jpg"
                  alt="Engagement & Arabic Floral Mehndi"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-3 left-3 bg-[#163820] text-emerald-300 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md">
                  Engagement & Floral
                </span>
                <span className="absolute bottom-3 right-3 bg-amber-400/90 text-stone-900 text-xs font-black px-2.5 py-1 rounded-xl shadow-xs">
                  From ₹3,200
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-base text-stone-900 font-serif group-hover:text-[#88451b] transition-colors">
                    Contemporary Ring Ceremony Mehndi
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    Airy negative-space vines, Arabic jaal patterns, and delicate finger art designed to highlight your engagement rings.
                  </p>
                </div>
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-stone-600">Quick 2.5h Application</span>
                  <a
                    href={getWhatsAppUrl('Hello! I would like to book an Engagement Mehndi package.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#25D366] hover:text-[#1da851] flex items-center gap-1"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Card 3: Party & Guest Henna */}
            <div className="group relative rounded-3xl overflow-hidden shadow-md border border-amber-200/80 bg-white flex flex-col">
              <div className="relative h-64 overflow-hidden bg-stone-900">
                <img
                  src="/images/feet_bridal_mehndi.jpg"
                  alt="Party & Family Guest Mehndi"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-3 left-3 bg-[#c59b4e] text-stone-900 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md">
                  Party & Family
                </span>
                <span className="absolute bottom-3 right-3 bg-amber-400/90 text-stone-900 text-xs font-black px-2.5 py-1 rounded-xl shadow-xs">
                  ₹200 / side
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-base text-stone-900 font-serif group-hover:text-[#88451b] transition-colors">
                    Sangeet & Party Henna Stations
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    Multi-artist guest stations for bridesmaids, sangeet guests, Teej, and Karwa Chauth with rapid 7-minute turnaround.
                  </p>
                </div>
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-stone-600">Up to 50+ Guests Handled</span>
                  <a
                    href={getWhatsAppUrl('Hello! I would like to book a Party / Sangeet Mehndi station.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#25D366] hover:text-[#1da851] flex items-center gap-1"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Artists Header */}
        <div className="pt-6 border-t border-stone-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#163820]">
                Verified Masters
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

      {/* 5. CONTACT & OFFICIAL SOCIAL SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#88451b] bg-[#88451b]/10 px-3 py-1 rounded-full border border-[#88451b]/20">
              Direct Contact & Socials
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              Connect With Rang Riwaaz Mehandi
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Explore our latest bridal design reels, dark organic stain results, and real bride videos on Instagram, or chat directly with our Gorakhpur booking desk on WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <InstagramButton variant="contact" />

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-xs text-white bg-[#25D366] hover:bg-[#20ba5a] transition-all shadow-md hover:scale-102"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (+91 87565 49820)</span>
              </a>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#faf7f2] border border-stone-200 space-y-4 text-xs">
            <h3 className="font-bold text-stone-900 text-sm font-serif">
              Gorakhpur Central Booking Desk
            </h3>
            <div className="space-y-2 text-stone-600">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#88451b] shrink-0" />
                <span><strong>Center Hub:</strong> Baraipar Mod (Pincode: 273413), Gorakhpur</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#88451b] shrink-0" />
                <span><strong>Support Line:</strong> +91 94500 00100</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#88451b] shrink-0" />
                <span><strong>Service Hours:</strong> 8:00 AM – 10:00 PM (All 7 Days)</span>
              </p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-[11px] font-medium">
              💡 <strong>Instant WhatsApp Response:</strong> Get customized package quotes, bridal portrait consultations, and date availability within 15 minutes.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
