'use client';

import React from 'react';
import Link from 'next/link';
import {
  User,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  Heart,
  ArrowRight,
  Phone,
  Star,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { formatINR } from '@/lib/commission-calculator';

export default function CustomerDashboardPage() {
  const { currentUser, bookings, switchPersona } = useMarketplace();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-950 font-extrabold flex items-center justify-center text-xl shadow-inner border border-rose-200">
            {currentUser?.fullName?.charAt(0) || 'P'}
          </div>
          <div className="space-y-0.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[10px] font-bold uppercase tracking-wider">
              <span>Verified Client</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-serif">
              {currentUser?.fullName || 'Priya Tiwari'}
            </h1>
            <p className="text-xs text-stone-500 flex items-center gap-2">
              <span>{currentUser?.phone || '+91 98391 22840'}</span>
              <span>•</span>
              <span className="flex items-center gap-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#88451b]" />
                {currentUser?.locality || 'Golghar, Gorakhpur'}
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/artists"
            className="py-2.5 px-4 bg-[#88451b] hover:bg-[#54250a] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>Book Another Artist</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => switchPersona('artist')}
            className="py-2.5 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold text-xs transition-colors cursor-pointer"
          >
            Switch to Artist View
          </button>
        </div>
      </div>

      {/* Bookings Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2 font-serif">
            <Calendar className="w-5 h-5 text-[#88451b]" />
            <span>My Mehndi Bookings</span>
          </h2>
          <span className="text-xs text-stone-500 font-semibold">
            {bookings.length} Total Bookings
          </span>
        </div>

        {bookings.length === 0 ? (
          <div className="p-8 text-center bg-white border border-stone-200 rounded-3xl space-y-2">
            <p className="text-xs text-stone-500">
              You have no active wedding bookings yet.
            </p>
            <Link href="/artists" className="text-[#88451b] font-bold text-xs underline">
              Browse Gorakhpur Artists
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs hover:shadow-md transition-shadow space-y-4"
              >
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-stone-100">
                  <div>
                    <span className="font-mono text-[10px] text-stone-400 font-bold block">
                      {b.bookingCode || b.id}
                    </span>
                    <h3 className="font-bold text-stone-900 text-sm">
                      {b.artistName}
                    </h3>
                    <p className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#88451b]" />
                      {b.locality}
                    </p>
                  </div>

                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    b.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : b.status === 'artist_on_way'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {b.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-stone-600">
                  <p className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    <span><strong>Event Date:</strong> {b.eventDate} ({b.timeSlotLabel || b.timeSlot})</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span><strong>Service:</strong> {b.serviceName || b.serviceType}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span className="line-clamp-1"><strong>Venue:</strong> {b.venueAddress}</span>
                  </p>
                </div>

                {/* Financial Summary */}
                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 block font-bold uppercase">
                      20% Advance Token
                    </span>
                    <span className="font-extrabold text-emerald-700">
                      {formatINR(b.advanceTokenAmount)} (Paid)
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-stone-400 block font-bold uppercase">
                      80% Balance Cash
                    </span>
                    <span className="font-extrabold text-stone-900">
                      {formatINR(b.balanceCashAmount)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center justify-between">
                  <Link
                    href={`/tracker?bookingId=${b.id}`}
                    className="py-2 px-3.5 bg-[#88451b] hover:bg-[#54250a] text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>Track Live Status</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {b.backupArtistName && (
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Standby: {b.backupArtistName}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
