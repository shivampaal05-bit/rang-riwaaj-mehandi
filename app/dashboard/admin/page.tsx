'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  TrendingUp,
  Percent,
  Wallet,
  Users,
  Calendar,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Settings,
  ArrowRight,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import CommissionBadge from '@/components/CommissionBadge';
import SettlePayoutModal from '@/components/SettlePayoutModal';
import { CommissionPayout, ArtistTier } from '@/types/marketplace';
import { formatINR } from '@/lib/commission-calculator';

export default function AdminDashboardPage() {
  const {
    artists,
    bookings,
    payouts,
    settings,
    updateArtistVerification,
    updateArtistTier,
    updateMarketplaceSettings,
    approveAndSettlePayout,
    resetAllDemoData,
    switchPersona,
  } = useMarketplace();

  // Settings form state
  const [bridalRate, setBridalRate] = useState(settings.defaultBridalCommission.toString());
  const [topRatedRate, setTopRatedRate] = useState(settings.defaultTopRatedCommission.toString());
  const [regularRate, setRegularRate] = useState(settings.defaultRegularCommission.toString());
  const [tokenRate, setTokenRate] = useState(settings.advanceTokenPercentage.toString());
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Settlement modal state
  const [activePayoutToSettle, setActivePayoutToSettle] = useState<CommissionPayout | null>(null);

  // Financial aggregates
  const totalGmv = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const totalPlatformRevenue = bookings.reduce((sum, b) => sum + (b.commissionAmount || 0), 0);
  const pendingPayoutsTotal = payouts
    .filter((p) => p.status === 'pending' || p.status === 'approved')
    .reduce((sum, p) => sum + p.netPayout, 0);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateMarketplaceSettings({
      defaultBridalCommission: parseFloat(bridalRate) || 15,
      defaultTopRatedCommission: parseFloat(topRatedRate) || 12,
      defaultRegularCommission: parseFloat(regularRate) || 10,
      advanceTokenPercentage: parseFloat(tokenRate) || 20,
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 text-left">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-[#0d2214] via-[#163820] to-[#1c0e05] text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-[#c59b4e]/30">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Executive Trust & Commission Console</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white font-serif mt-1">
            Rang Riwaaz Marketplace Control Panel
          </h1>
          <p className="text-xs text-stone-300 mt-0.5">
            Configure tiered commission rates, approve artist KYC badges, and settle payouts with UTR references.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={resetAllDemoData}
            className="py-2.5 px-3 bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-700"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            type="button"
            onClick={() => switchPersona('artist')}
            className="py-2.5 px-3 bg-white text-stone-900 hover:bg-stone-100 font-bold rounded-xl text-xs transition-colors cursor-pointer"
          >
            Artist Portal
          </button>
        </div>
      </div>

      {/* 2. Platform Financial Overview KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total GMV */}
        <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Gross Marketplace Volume
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-black text-stone-900 block">
            {formatINR(totalGmv)}
          </span>
          <span className="text-[11px] text-stone-500 font-medium">
            Across {bookings.length} Gorakhpur Bookings
          </span>
        </div>

        {/* Platform Commission Revenue */}
        <div className="bg-white rounded-3xl border border-amber-300 p-5 shadow-xs space-y-1 ring-1 ring-amber-400/30">
          <div className="flex items-center justify-between text-amber-600">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Platform Fee Revenue
            </span>
            <Percent className="w-4 h-4 text-amber-600" />
          </div>
          <span className="text-2xl font-black text-amber-700 block">
            {formatINR(totalPlatformRevenue)}
          </span>
          <span className="text-[11px] text-amber-800 font-medium">
            Marketplace Net Commission
          </span>
        </div>

        {/* Pending Payouts to Artists */}
        <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Pending Artist Disbursements
            </span>
            <Wallet className="w-4 h-4 text-rose-600" />
          </div>
          <span className="text-2xl font-black text-rose-800 block">
            {formatINR(pendingPayoutsTotal)}
          </span>
          <span className="text-[11px] text-stone-500 font-medium">
            Awaiting UTR Settlement
          </span>
        </div>

        {/* Active Artists */}
        <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Vetted Artists
            </span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-black text-stone-900 block">
            {artists.length}
          </span>
          <span className="text-[11px] text-emerald-700 font-medium">
            100% Date-Locked Protection
          </span>
        </div>
      </div>

      {/* 3. DYNAMIC COMMISSION RATE SETTINGS PANEL */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2 font-serif">
              <Settings className="w-5 h-5 text-[#88451b]" />
              <span>Dynamic Commission Tier Configuration</span>
            </h3>
            <p className="text-xs text-stone-500">
              Adjust global platform fee percentages. Automatically recalculates all future bookings.
            </p>
          </div>

          {settingsSaved && (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 animate-in fade-in">
              ✓ Settings Saved Successfully
            </span>
          )}
        </div>

        <form onSubmit={handleSaveSettings} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Bridal Tier */}
          <div className="space-y-1 p-3.5 bg-rose-50/60 rounded-2xl border border-rose-200">
            <label className="font-bold text-rose-900 block">
              Tier 1: Bridal Specialists (%)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="5"
                max="30"
                step="0.5"
                value={bridalRate}
                onChange={(e) => setBridalRate(e.target.value)}
                className="w-full bg-white border border-rose-300 rounded-xl px-3 py-2 text-sm font-black text-rose-950"
              />
              <span className="font-bold text-rose-800">%</span>
            </div>
            <p className="text-[10px] text-rose-700">Recommended: 15%</p>
          </div>

          {/* Top-Rated Elite */}
          <div className="space-y-1 p-3.5 bg-amber-50/60 rounded-2xl border border-amber-300">
            <label className="font-bold text-amber-900 block">
              Tier 2: Top-Rated Elite (%)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="5"
                max="30"
                step="0.5"
                value={topRatedRate}
                onChange={(e) => setTopRatedRate(e.target.value)}
                className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 text-sm font-black text-amber-950"
              />
              <span className="font-bold text-amber-800">%</span>
            </div>
            <p className="text-[10px] text-amber-700">Recommended: 12%</p>
          </div>

          {/* Regular Tier */}
          <div className="space-y-1 p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-200">
            <label className="font-bold text-emerald-900 block">
              Tier 3: Regular / Sangeet (%)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="5"
                max="30"
                step="0.5"
                value={regularRate}
                onChange={(e) => setRegularRate(e.target.value)}
                className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2 text-sm font-black text-emerald-950"
              />
              <span className="font-bold text-emerald-800">%</span>
            </div>
            <p className="text-[10px] text-emerald-700">Recommended: 10%</p>
          </div>

          {/* Advance Token */}
          <div className="space-y-1 p-3.5 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col justify-between">
            <div>
              <label className="font-bold text-stone-800 block">
                Online Advance Token (%)
              </label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="number"
                  min="10"
                  max="50"
                  value={tokenRate}
                  onChange={(e) => setTokenRate(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-sm font-black text-stone-900"
                />
                <span className="font-bold text-stone-700">%</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#88451b] hover:bg-[#54250a] text-white font-bold rounded-xl text-xs transition-colors cursor-pointer mt-2 shadow-xs"
            >
              Save Global Rates
            </button>
          </div>
        </form>
      </div>

      {/* 4. ARTIST KYC, 5-POINT VERIFICATION & COMMISSION OVERRIDES */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-stone-900 flex items-center gap-2 font-serif">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Artist 5-Point Verification & Tier Manager</span>
          </h3>
          <p className="text-xs text-stone-500">
            Toggle verification badges or modify artist category tiers and custom commission overrides in real time.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="border-b border-stone-200 bg-[#fbf9f6] text-stone-500 font-bold uppercase">
                <th className="p-3">Artist</th>
                <th className="p-3">Tier Assignment</th>
                <th className="p-3">Govt ID</th>
                <th className="p-3">Phone OTP</th>
                <th className="p-3">Portfolio</th>
                <th className="p-3">Skill Test</th>
                <th className="p-3">Commission %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {artists.map((art) => (
                <tr key={art.id} className="hover:bg-stone-50">
                  <td className="p-3">
                    <span className="font-bold text-stone-900 block">{art.name}</span>
                    <span className="text-[11px] text-stone-500">{art.locality}</span>
                  </td>

                  {/* Tier dropdown */}
                  <td className="p-3">
                    <select
                      value={art.categoryTier}
                      onChange={(e) => updateArtistTier(art.id, e.target.value as ArtistTier)}
                      className="bg-stone-50 border border-stone-300 rounded-lg px-2 py-1 font-bold text-[11px] text-stone-800"
                    >
                      <option value="bridal">Bridal (15%)</option>
                      <option value="top_rated">Top-Rated (12%)</option>
                      <option value="regular">Regular (10%)</option>
                    </select>
                  </td>

                  {/* 4 Verification Badges */}
                  {(['identityVerified', 'phoneVerified', 'portfolioChecked', 'skillChecked'] as const).map((badgeKey) => {
                    const isChecked = !!art.verificationBadges?.[badgeKey];
                    return (
                      <td key={badgeKey} className="p-3">
                        <button
                          type="button"
                          onClick={() => updateArtistVerification(art.id, badgeKey)}
                          className={`px-2.5 py-1 rounded-lg font-bold text-[10px] border cursor-pointer transition-all ${
                            isChecked
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : 'bg-stone-100 text-stone-400 border-stone-200 hover:bg-stone-200'
                          }`}
                        >
                          {isChecked ? 'Verified ✓' : 'Pending ⏳'}
                        </button>
                      </td>
                    );
                  })}

                  <td className="p-3 font-bold text-stone-900">
                    <span className="bg-stone-100 px-2 py-0.5 rounded-md">
                      {art.commissionRate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. ARTIST PAYOUT SETTLEMENTS LEDGER */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-stone-900 font-serif">
            Pending Commission Payout Disbursements
          </h3>
          <span className="text-xs text-stone-500 font-semibold">
            {payouts.filter((p) => p.status !== 'settled').length} Pending Settlement
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-stone-200 bg-[#fbf9f6] text-stone-500 font-bold uppercase">
                <th className="p-3">Payout Code</th>
                <th className="p-3">Artist</th>
                <th className="p-3">Destination Account</th>
                <th className="p-3">Gross Total</th>
                <th className="p-3">Net Payout</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {payouts.map((p) => (
                <tr key={p.id} className="hover:bg-stone-50">
                  <td className="p-3 font-mono font-bold text-stone-800">
                    {p.payoutCode}
                  </td>
                  <td className="p-3 font-bold text-stone-900">
                    {p.artistName}
                  </td>
                  <td className="p-3 font-mono text-stone-600">
                    {p.accountDetails}
                  </td>
                  <td className="p-3 text-stone-600">
                    {formatINR(p.grossAmount)}
                  </td>
                  <td className="p-3 font-black text-emerald-800">
                    {formatINR(p.netPayout)}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
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
                  <td className="p-3">
                    {p.status === 'settled' ? (
                      <span className="text-stone-400 font-mono text-[10px]">
                        {p.utrReference}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setActivePayoutToSettle(p)}
                        className="py-1 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs cursor-pointer shadow-xs transition-colors"
                      >
                        Settle & Add UTR
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Settle Payout Modal */}
      <SettlePayoutModal
        payout={activePayoutToSettle}
        onClose={() => setActivePayoutToSettle(null)}
        onConfirmSettle={(payoutId, utr) => {
          approveAndSettlePayout(payoutId, utr);
        }}
      />
    </div>
  );
}
