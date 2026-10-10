'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Phone,
  AlertTriangle,
  ArrowRight,
  User,
  Zap,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { formatINR } from '@/lib/commission-calculator';

function BookingTrackerContent() {
  const searchParams = useSearchParams();
  const { bookings, updateBookingStatus, cancelBookingEmergency } = useMarketplace();

  const queryBookingId = searchParams.get('bookingId');
  const [selectedBookingId, setSelectedBookingId] = useState<string>(
    queryBookingId || (bookings[0]?.id ?? '')
  );

  const activeBooking = bookings.find((b) => b.id === selectedBookingId) || bookings[0];

  const stages = [
    { id: 'confirmed', title: '1. Date-Locked', desc: 'Slot locked with 20% advance token' },
    { id: 'backup_assigned', title: '2. Backup Assigned', desc: 'Standby artist matched in Gorakhpur' },
    { id: 'artist_on_way', title: '3. Artist On The Way', desc: 'En-route with natural Sojat cones' },
    { id: 'service_started', title: '4. Application Started', desc: 'Bridal figurines & intricate jaal in progress' },
    { id: 'completed', title: '5. Completed & Care Guide', desc: 'Lemon-sugar care buffer & review' },
  ];

  const getStageStatus = (stageId: string, currentStatus: string) => {
    const order = ['confirmed', 'backup_assigned', 'artist_on_way', 'service_started', 'completed'];
    const curIdx = order.indexOf(currentStatus);
    const stageIdx = order.indexOf(stageId);
    if (stageIdx < curIdx) return 'completed';
    if (stageIdx === curIdx) return 'current';
    return 'upcoming';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#1c0e05] via-[#33170a] to-[#163820] text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-[#c59b4e]/30">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Real-time Wedding Milestone Tracker</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white font-serif">
            Live Booking & Backup Security Console
          </h1>
          <p className="text-xs text-stone-300">
            Track arrival status, payment ledger, and standby backup artist assignment.
          </p>
        </div>

        {/* Booking selector dropdown if multiple */}
        {bookings.length > 1 && (
          <div className="bg-white/10 p-2.5 rounded-2xl border border-white/20 text-xs">
            <label className="text-[10px] text-stone-300 font-bold block mb-1">
              Select Booking:
            </label>
            <select
              value={activeBooking?.id}
              onChange={(e) => setSelectedBookingId(e.target.value)}
              className="bg-stone-900 text-amber-200 border border-stone-700 rounded-xl px-2.5 py-1.5 font-mono font-bold text-xs"
            >
              {bookings.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.bookingCode || b.id} - {b.artistName}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {!activeBooking ? (
        <div className="p-8 text-center bg-white rounded-2xl border border-stone-200">
          <p className="text-stone-500 text-xs">No active bookings found.</p>
          <Link href="/artists" className="text-[#88451b] font-bold text-xs underline mt-2 inline-block">
            Explore Artists to Book
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live 5-Stage Tracker */}
          <div className="md:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="font-mono text-xs font-bold text-stone-400 block">
                  {activeBooking.bookingCode || activeBooking.id}
                </span>
                <h3 className="font-bold text-base text-stone-900">
                  {activeBooking.serviceName || 'Bridal Mehndi Package'}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase">
                {activeBooking.status.replace(/_/g, ' ')}
              </span>
            </div>

            {/* Stages Vertical Timeline */}
            <div className="space-y-6 pl-2">
              {stages.map((stage, idx) => {
                const stageStatus = getStageStatus(stage.id, activeBooking.status);
                const isLast = idx === stages.length - 1;

                return (
                  <div key={stage.id} className="relative flex items-start gap-4">
                    {!isLast && (
                      <div
                        className={`absolute left-4 top-8 w-0.5 h-12 -ml-px ${
                          stageStatus === 'completed'
                            ? 'bg-emerald-600'
                            : 'bg-stone-200'
                        }`}
                      />
                    )}

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10 transition-colors ${
                        stageStatus === 'completed'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : stageStatus === 'current'
                          ? 'bg-[#88451b] text-amber-200 ring-4 ring-amber-100 shadow-sm'
                          : 'bg-stone-100 text-stone-400 border border-stone-300'
                      }`}
                    >
                      {stageStatus === 'completed' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        idx + 1
                      )}
                    </div>

                    <div className="space-y-0.5 pt-0.5">
                      <h4
                        className={`text-sm font-bold ${
                          stageStatus === 'current'
                            ? 'text-[#88451b]'
                            : stageStatus === 'completed'
                            ? 'text-stone-900'
                            : 'text-stone-400'
                        }`}
                      >
                        {stage.title}
                      </h4>
                      <p className="text-xs text-stone-500">{stage.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Emergency Standby Status */}
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs space-y-1">
              <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Standby Emergency Backup Active
              </span>
              <p className="text-emerald-800 text-[11px]">
                {activeBooking.cancelledByArtist
                  ? `Emergency Triggered: Automatically reassigned to ${activeBooking.backupArtistName || 'Standby Lead Artist'}!`
                  : `Standby replacement artist is mapped in Gorakhpur and ready for instant dispatch if emergency arises.`}
              </p>
            </div>
          </div>

          {/* Right Column: Booking Financials & Actions */}
          <div className="md:col-span-5 space-y-5">
            {/* Booking Details Card */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-stone-900 pb-2 border-b border-stone-100">
                Wedding Event Logistics
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-500">Artist:</span>
                  <strong className="text-stone-900">{activeBooking.artistName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Date & Slot:</span>
                  <strong className="text-stone-900">
                    {activeBooking.eventDate} ({activeBooking.timeSlotLabel || activeBooking.timeSlot})
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Venue Locality:</span>
                  <strong className="text-stone-900">{activeBooking.locality}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Address:</span>
                  <span className="text-right text-stone-700 max-w-xs">{activeBooking.venueAddress}</span>
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="pt-3 border-t border-stone-100 space-y-2 text-xs bg-stone-50 p-3.5 rounded-xl">
                <div className="flex justify-between text-stone-600">
                  <span>Total Booking Amount:</span>
                  <strong className="text-stone-900">{formatINR(activeBooking.totalAmount)}</strong>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>20% Advance Token (Paid):</span>
                  <span>{formatINR(activeBooking.advanceTokenAmount)}</span>
                </div>
                <div className="flex justify-between text-stone-700 font-bold">
                  <span>80% Balance Payable on Venue:</span>
                  <span>{formatINR(activeBooking.balanceCashAmount)}</span>
                </div>
              </div>
            </div>

            {/* Simulation Milestones Control (For Demo Evaluation) */}
            <div className="bg-amber-50/70 rounded-3xl border border-amber-300/80 p-5 space-y-3 text-xs">
              <div className="flex items-center gap-1.5 text-amber-900 font-bold uppercase tracking-wider text-[10px]">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                <span>Demo Simulation Controls</span>
              </div>
              <p className="text-[11px] text-amber-800">
                Advance through milestones to test live UI state changes:
              </p>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => updateBookingStatus(activeBooking.id, 'artist_on_way')}
                  className="py-2 px-2.5 rounded-xl bg-white border border-stone-300 font-bold text-stone-800 hover:bg-stone-50 cursor-pointer text-left"
                >
                  🚗 Set En-Route
                </button>
                <button
                  type="button"
                  onClick={() => updateBookingStatus(activeBooking.id, 'service_started')}
                  className="py-2 px-2.5 rounded-xl bg-white border border-stone-300 font-bold text-stone-800 hover:bg-stone-50 cursor-pointer text-left"
                >
                  🎨 Start Service
                </button>
                <button
                  type="button"
                  onClick={() => updateBookingStatus(activeBooking.id, 'completed')}
                  className="py-2 px-2.5 rounded-xl bg-emerald-700 text-white font-bold hover:bg-emerald-800 cursor-pointer text-left col-span-2 text-center"
                >
                  ✓ Complete Service & Settle
                </button>
              </div>

              {!activeBooking.cancelledByArtist && (
                <button
                  type="button"
                  onClick={() => cancelBookingEmergency(activeBooking.id)}
                  className="w-full py-2 bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold rounded-xl text-[11px] border border-rose-300 transition-colors cursor-pointer mt-1"
                >
                  Simulate Sudden Artist Emergency (Test Backup)
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookingTrackerPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-stone-500">Loading live milestone tracker...</div>}>
      <BookingTrackerContent />
    </Suspense>
  );
}
