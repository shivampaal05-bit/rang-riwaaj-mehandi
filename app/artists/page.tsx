'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  Star,
  Award,
  Filter,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import CommissionBadge from '@/components/CommissionBadge';
import { ArtistTier } from '@/types/marketplace';
import { formatINR } from '@/lib/commission-calculator';

export default function ArtistsPage() {
  const { artists, bookings } = useMarketplace();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocality, setSelectedLocality] = useState('all');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState('2026-10-15');
  const [selectedSlot, setSelectedSlot] = useState('all');
  const [onlyVerified, setOnlyVerified] = useState(false);

  // Filtered artists
  const filteredArtists = useMemo(() => {
    return artists.filter((artist) => {
      // Query filter
      if (
        searchQuery &&
        !artist.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !artist.studioName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !artist.locality.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Locality filter
      if (selectedLocality !== 'all') {
        const locLower = artist.locality.toLowerCase();
        if (!locLower.includes(selectedLocality.replace(/_/g, ' '))) {
          return false;
        }
      }

      // Tier filter
      if (selectedTier !== 'all' && artist.categoryTier !== selectedTier) {
        return false;
      }

      // Verification filter
      if (onlyVerified && !artist.isVerified) {
        return false;
      }

      // Date & Slot availability check
      if (selectedSlot !== 'all') {
        const slotStatus = artist.availability?.[selectedDate]?.[selectedSlot];
        // If slot is marked booked, filter out
        if (slotStatus === 'booked') {
          return false;
        }
      }

      return true;
    });
  }, [artists, searchQuery, selectedLocality, selectedTier, selectedDate, selectedSlot, onlyVerified]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#88451b]/10 text-[#88451b] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Verified Mehndi Artists • Gorakhpur, UP</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-serif">
          Find Your Perfect Wedding Mehndi Artist
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl">
          Filtered by real date availability, distance from Baraipar Mod center, and transparent tiered commission packages.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-4">
        {/* Search bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by artist name, studio, or Gorakhpur locality..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-stone-900 focus:outline-hidden focus:border-[#88451b]"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Locality */}
          <div>
            <label className="font-bold text-stone-600 block mb-1">Locality</label>
            <select
              value={selectedLocality}
              onChange={(e) => setSelectedLocality(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 font-medium text-stone-900"
            >
              <option value="all">All Gorakhpur Localities</option>
              <option value="baraipar_mod">Baraipar Mod (Center Hub)</option>
              <option value="kauriram">Kauriram</option>
              <option value="belipar">Belipar</option>
              <option value="golghar">Golghar</option>
              <option value="betiahata">Betiahata</option>
              <option value="rustampur">Rustampur</option>
              <option value="taramandal">Taramandal</option>
            </select>
          </div>

          {/* Tier */}
          <div>
            <label className="font-bold text-stone-600 block mb-1">Commission Tier</label>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 font-medium text-stone-900"
            >
              <option value="all">All Tiers (10% - 15%)</option>
              <option value="bridal">Bridal Specialists (15%)</option>
              <option value="top_rated">Top-Rated Elite (12%)</option>
              <option value="regular">Standard / Guest (10%)</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="font-bold text-stone-600 block mb-1">Event Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 font-bold text-stone-900"
            />
          </div>

          {/* Slot */}
          <div>
            <label className="font-bold text-stone-600 block mb-1">Time Slot</label>
            <select
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 font-medium text-stone-900"
            >
              <option value="all">Any Available Slot</option>
              <option value="morning">Morning (9 AM – 1 PM)</option>
              <option value="afternoon">Afternoon (1 PM – 5 PM)</option>
              <option value="evening">Evening (5 PM – 9 PM)</option>
              <option value="night">Night (9 PM – 12 AM)</option>
            </select>
          </div>
        </div>

        {/* Toggle options */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-stone-700 font-medium">
            <input
              type="checkbox"
              checked={onlyVerified}
              onChange={(e) => setOnlyVerified(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
            />
            <span>Show only 5-Point Verified Artists</span>
          </label>

          <span className="text-stone-500 font-bold">
            Showing {filteredArtists.length} Artists
          </span>
        </div>
      </div>

      {/* Artist Grid */}
      {filteredArtists.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 space-y-3">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto font-bold text-xl">
            !
          </div>
          <h3 className="text-base font-bold text-stone-900">
            No Artists Available for Selected Filters
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try choosing a different date or clearing the locality filter to see all active artists across Gorakhpur.
          </p>
          <button
            onClick={() => {
              setSelectedLocality('all');
              setSelectedTier('all');
              setSelectedSlot('all');
              setSearchQuery('');
            }}
            className="py-2 px-4 bg-[#88451b] text-white rounded-xl text-xs font-bold cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtists.map((artist) => {
            const eveningStatus = artist.availability?.[selectedDate]?.evening || 'available';

            return (
              <div
                key={artist.id}
                className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative h-52 w-full overflow-hidden bg-stone-100">
                    <img
                      src={artist.avatar}
                      alt={artist.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <CommissionBadge tier={artist.categoryTier} size="sm" />
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{artist.rating} ({artist.reviewCount})</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="font-extrabold text-base text-stone-900 group-hover:text-[#88451b] transition-colors">
                        {artist.name}
                      </h3>
                      <p className="text-[11px] text-stone-500 font-medium">
                        {artist.studioName}
                      </p>
                      <p className="text-xs text-stone-600 flex items-center gap-1 mt-1 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-[#88451b] shrink-0" />
                        <span>{artist.locality}</span>
                      </p>
                    </div>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {artist.bio}
                    </p>

                    {/* 5-Point Badges List */}
                    <div className="pt-2 border-t border-stone-100 space-y-1.5">
                      <div className="flex flex-wrap gap-1 text-[10px]">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                          ✓ Govt ID
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                          ✓ Phone OTP
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                          ✓ Original Portfolio
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                          ✓ Skill Test
                        </span>
                      </div>

                      {/* Date Availability Indicator */}
                      <div className="flex items-center justify-between text-[11px] pt-1">
                        <span className="text-stone-500 font-medium">
                          {selectedDate} (Eve):
                        </span>
                        <span
                          className={`font-bold px-2 py-0.5 rounded-md uppercase tracking-wider text-[10px] ${
                            eveningStatus === 'available'
                              ? 'bg-emerald-100 text-emerald-800'
                              : eveningStatus === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {eveningStatus === 'available' ? 'Available' : eveningStatus === 'pending' ? 'Pending' : 'Date-Locked'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="p-5 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 block uppercase font-bold">
                      Starting Package
                    </span>
                    <span className="text-base font-extrabold text-[#3d1808]">
                      {artist.categoryTier === 'bridal' ? '₹5,500' : '₹2,500'}
                    </span>
                  </div>

                  <Link
                    href={`/artists/${artist.id}?date=${selectedDate}&slot=${selectedSlot !== 'all' ? selectedSlot : 'evening'}`}
                    className="py-2.5 px-4 bg-[#88451b] hover:bg-[#54250a] text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <span>View & Book</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
