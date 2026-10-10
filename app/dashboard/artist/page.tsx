'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  Star,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  TrendingUp,
  Percent,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import CommissionBadge from '@/components/CommissionBadge';
import PayoutModal from '@/components/PayoutModal';
import { formatINR, getTierBadgeInfo } from '@/lib/commission-calculator';
import { TIME_SLOTS } from '@/src/data/mockLocalities';

export default function ArtistDashboardPage() {
  const {
    currentUser,
    artists,
    bookings,
    payouts,
    updateBookingStatus,
    cancelBookingEmergency,
    requestPayout,
    switchPersona,
  } = useMarketplace();

  // Find active artist (or default to Pooja Verma)
  const artist = artists.find((a) => a.id === 'gkp-art-01') || artists[0];

  const [activeDate, setActiveDate] = useState('2026-10-15');
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);

  // Filter bookings for this artist
  const artistBookings = bookings.filter((b) => b.artistId === artist.id);

  // Filter payouts for this artist
  const artistPayouts = payouts.filter((p) => p.artistId === artist.id);

  // Toggle calendar slot
  const toggleSlotAvailability = (slotId: string, currentStatus: string) => {
    const nextStatus =
      currentStatus === 'available'
        ? 'booked'
        : currentStatus === 'booked'
        ? 'pending'
        : 'available';

    const updated = { ...(artist.availability || {}) };
    if (!updated[activeDate]) updated[activeDate] = {};
    updated[activeDate][slotId] = nextStatus as any;
    artist.availability = updated;

    // Force re-render
    if (typeof window !== 'undefined') {
      localStorage.setItem('rangriwaaz_artists', JSON.stringify(artists));
    }
  };

  const tierInfo = getTierBadgeInfo(artist.categoryTier);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">
      {/* 1. Artist Top Banner */}
      <div className="bg-gradient-to-r from-[#0d2214] via-[#163820] to-[#3a1a08] text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-[#c59b4e]/30">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-[#c59b4e] overflow-hidden shrink-0 shadow-md">
            <img
              src={artist.avatar}
              alt={artist.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Verified Artist Portal</span>
              </span>
              <CommissionBadge tier={artist.categoryTier} size="sm" />
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-white font-serif mt-1">
              {artist.name}
            </h1>
            <p className="text-xs text-stone-300 flex items-center gap-2 mt-0.5">
              <span>{artist.studioName}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                {artist.locality}
              </span>
              <span>•</span>
              <span className="text-amber-300 font-bold flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-300" />
                {artist.rating} ({artist.reviewCount} reviews)
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPayoutModalOpen(true)}
            className="py-2.5 px-4 bg-gradient-to-r from-[#c59b4e] to-[#88451b] hover:from-[#d4aa5c] hover:to-[#994e1f] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>Request Payout ({formatINR(artist.pendingPayout)})</span>
          </button>

          <button
            type="button"
            onClick={() => switchPersona('customer')}
            className="py-2.5 px-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs border border-white/20 transition-colors cursor-pointer"
          >
            Customer View
          </button>
        </div>
      </div>

      {/* 2. COMMISSION & FINANCIAL METRICS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gross GMV */}
        <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Total Booking GMV
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-black text-stone-900 block">
            {formatINR(artist.totalGmv)}
          </span>
          <span className="text-[11px] text-stone-500 font-medium">
            Lifetime Gross Bookings
          </span>
        </div>

        {/* Platform Commission Deducted */}
        <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Platform Fee ({artist.commissionRate}%)
            </span>
            <Percent className="w-4 h-4 text-rose-600" />
          </div>
          <span className="text-2xl font-black text-rose-800 block">
            {formatINR(artist.totalCommissionPaid)}
          </span>
          <span className="text-[11px] text-rose-700 font-medium">
            Tier Deductions: {artist.commissionRate}%
          </span>
        </div>

        {/* Pending Withdrawable Balance */}
        <div className="bg-white rounded-3xl border border-emerald-300 p-5 shadow-xs space-y-1 ring-1 ring-emerald-500/30">
          <div className="flex items-center justify-between text-emerald-700">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Withdrawable Balance
            </span>
            <Wallet className="w-4 h-4 text-emerald-700" />
          </div>
          <span className="text-2xl font-black text-emerald-800 block">
            {formatINR(artist.pendingPayout)}
          </span>
          <button
            type="button"
            onClick={() => setIsPayoutModalOpen(true)}
            className="text-[11px] text-emerald-700 font-bold hover:underline"
          >
            Withdraw to UPI →
          </button>
        </div>

        {/* Settled Payouts */}
        <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Settled to Bank
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-black text-stone-900 block">
            {formatINR(artist.settledPayout)}
          </span>
          <span className="text-[11px] text-stone-500 font-medium">
            Directly transferred via NEFT/UPI
          </span>
        </div>
      </div>

      {/* 3. TIER PERKS & COMMISSION BREAKDOWN CALLOUT */}
      <div className="bg-amber-50/70 rounded-3xl border border-amber-300/80 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-950 uppercase tracking-wide">
              Active Tier:
            </span>
            <CommissionBadge tier={artist.categoryTier} customRate={artist.commissionRate} size="sm" />
          </div>
          <p className="text-xs text-amber-900">
            <strong>Tier Perks:</strong> {tierInfo.perks}
          </p>
        </div>

        <div className="text-right text-xs text-stone-600 bg-white/80 px-3.5 py-2 rounded-2xl border border-amber-200 shrink-0">
          <span className="text-[10px] text-stone-400 font-bold block uppercase">
            Registered Bank / UPI
          </span>
          <span className="font-mono font-bold text-stone-900">{artist.bankUpiId}</span>
        </div>
      </div>

      {/* 4. CALENDAR SLOT AVAILABILITY CONTROL */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
          <div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2 font-serif">
              <Calendar className="w-5 h-5 text-[#88451b]" />
              <span>Live Calendar Slot Control (Double Booking Prevention)</span>
            </h3>
            <p className="text-xs text-stone-500">
              Click any slot below to toggle between Available, Pending, or Date-Locked.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-700">Date:</span>
            <input
              type="date"
              value={activeDate}
              onChange={(e) => setActiveDate(e.target.value)}
              className="bg-stone-50 border border-stone-300 rounded-xl px-3 py-1.5 text-xs font-bold text-stone-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {TIME_SLOTS.map((slot) => {
            const currentStatus =
              artist.availability?.[activeDate]?.[slot.id] || 'available';

            return (
              <div
                key={slot.id}
                className="p-4 rounded-2xl border border-stone-200 bg-stone-50/60 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-stone-900 block">
                    {slot.label}
                  </span>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        currentStatus === 'available'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : currentStatus === 'pending'
                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                          : 'bg-rose-50 text-rose-800 border-rose-300'
                      }`}
                    >
                      {currentStatus}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleSlotAvailability(slot.id, currentStatus)}
                  className="w-full py-2 px-3 bg-white hover:bg-stone-100 text-stone-800 font-bold rounded-xl text-xs border border-stone-300 transition-colors cursor-pointer shadow-xs"
                >
                  Change Status (Toggle)
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. ACTIVE WEDDING COMMITMENTS & COMMISSION BREAKDOWN */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-stone-900 flex items-center gap-2 font-serif">
          <Clock className="w-5 h-5 text-[#88451b]" />
          <span>Scheduled Weddings & Commission Ledger</span>
        </h3>

        {artistBookings.length === 0 ? (
          <p className="text-xs text-stone-500 italic">
            No active wedding commitments assigned currently.
          </p>
        ) : (
          <div className="space-y-4">
            {artistBookings.map((b) => (
              <div
                key={b.id}
                className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-stone-500">
                      {b.bookingCode || b.id}
                    </span>
                    <strong className="text-stone-900 text-sm">
                      {b.customerName}
                    </strong>
                    <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full font-bold uppercase">
                      {b.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 flex flex-wrap items-center gap-3">
                    <span>📅 {b.eventDate} ({b.timeSlotLabel || b.timeSlot})</span>
                    <span>📍 {b.locality}</span>
                    <span>📞 {b.customerPhone}</span>
                  </p>

                  {/* Financial Breakdown per booking */}
                  <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
                    <span className="font-bold text-stone-900">
                      Gross: {formatINR(b.totalAmount)}
                    </span>
                    <span className="text-rose-800 font-semibold">
                      Fee ({b.commissionRate}%): -{formatINR(b.commissionAmount)}
                    </span>
                    <span className="text-emerald-800 font-extrabold bg-emerald-100 px-2 py-0.5 rounded-md">
                      Your Net Earnings: {formatINR(b.artistNetEarnings)}
                    </span>
                  </div>
                </div>

                {/* Milestone Progression Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  {b.status === 'confirmed' && (
                    <button
                      type="button"
                      onClick={() => updateBookingStatus(b.id, 'artist_on_way')}
                      className="py-2 px-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs cursor-pointer transition-colors shadow-xs"
                    >
                      🚗 Mark On The Way
                    </button>
                  )}

                  {b.status === 'artist_on_way' && (
                    <button
                      type="button"
                      onClick={() => updateBookingStatus(b.id, 'service_started')}
                      className="py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs cursor-pointer transition-colors shadow-xs"
                    >
                      🎨 Start Henna Application
                    </button>
                  )}

                  {b.status === 'service_started' && (
                    <button
                      type="button"
                      onClick={() => updateBookingStatus(b.id, 'completed')}
                      className="py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs cursor-pointer transition-colors shadow-xs"
                    >
                      ✓ Complete & Trigger Payout
                    </button>
                  )}

                  {!b.cancelledByArtist && (
                    <button
                      type="button"
                      onClick={() => cancelBookingEmergency(b.id)}
                      className="py-2 px-3 bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold rounded-xl text-xs border border-rose-300 transition-colors cursor-pointer"
                      title="Simulates emergency cancellation to trigger standby replacement"
                    >
                      Simulate Emergency (Test Backup)
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. SETTLEMENT & PAYOUT HISTORY TABLE */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-stone-900 font-serif">
            Commission Payout & Settlement Ledger
          </h3>
          <span className="text-xs text-stone-500 font-semibold">
            {artistPayouts.length} Transactions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-stone-200 bg-[#fbf9f6] text-stone-500 font-bold uppercase">
                <th className="p-3">Payout ID</th>
                <th className="p-3">Booking Code</th>
                <th className="p-3">Gross Total</th>
                <th className="p-3">Platform Fee</th>
                <th className="p-3">Net Artist Payout</th>
                <th className="p-3">Status</th>
                <th className="p-3">UTR Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {artistPayouts.map((p) => (
                <tr key={p.id} className="hover:bg-stone-50">
                  <td className="p-3 font-mono font-bold text-stone-800">
                    {p.payoutCode}
                  </td>
                  <td className="p-3 font-mono text-stone-600">
                    {p.bookingCode || 'Direct Withdrawal'}
                  </td>
                  <td className="p-3 font-semibold text-stone-900">
                    {formatINR(p.grossAmount)}
                  </td>
                  <td className="p-3 text-rose-800 font-semibold">
                    -{formatINR(p.commissionAmount)}
                  </td>
                  <td className="p-3 font-extrabold text-emerald-800">
                    {formatINR(p.netPayout)}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        p.status === 'settled'
                          ? 'bg-emerald-100 text-emerald-800'
                          : p.status === 'approved'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-stone-500 text-[11px]">
                    {p.utrReference || 'Processing...'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payout Withdrawal Modal */}
      <PayoutModal
        isOpen={isPayoutModalOpen}
        onClose={() => setIsPayoutModalOpen(false)}
        availableBalance={artist.pendingPayout}
        artistUpi={artist.bankUpiId}
        onRequestPayout={(amount, method, accountDetails) => {
          requestPayout(artist.id, amount, method, accountDetails);
        }}
      />
    </div>
  );
}
