'use client';

import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck } from 'lucide-react';
import { CommissionPayout } from '@/types/marketplace';
import { formatINR } from '@/lib/commission-calculator';

interface SettlePayoutModalProps {
  payout: CommissionPayout | null;
  onClose: () => void;
  onConfirmSettle: (payoutId: string, utrReference: string) => void;
}

export default function SettlePayoutModal({
  payout,
  onClose,
  onConfirmSettle,
}: SettlePayoutModalProps) {
  const [utr, setUtr] = useState(`UPI/AXIS/${Math.floor(100000000000 + Math.random() * 900000000000)}`);

  if (!payout) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!utr.trim()) {
      alert('Please enter UTR or Transaction reference number');
      return;
    }
    onConfirmSettle(payout.id, utr.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 relative text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
        >
          <X className="w-5 h-5" />
        </button>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900">
                Settle Artist Payout
              </h3>
              <p className="text-xs text-stone-500">
                Record bank/UPI transfer reference for audit compliance
              </p>
            </div>
          </div>

          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-stone-500">Artist:</span>
              <strong className="text-stone-900">{payout.artistName}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Payout ID:</span>
              <span className="font-mono text-stone-700">{payout.payoutCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Destination:</span>
              <strong className="text-stone-900">{payout.accountDetails} ({payout.payoutMethod.toUpperCase()})</strong>
            </div>
            <div className="pt-2 border-t border-stone-200 flex justify-between items-center">
              <span className="font-bold text-stone-700">Net Amount to Transfer:</span>
              <span className="text-lg font-extrabold text-emerald-800">{formatINR(payout.netPayout)}</span>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-700 block">
              Bank / UPI UTR Reference Number
            </label>
            <input
              type="text"
              value={utr}
              onChange={(e) => setUtr(e.target.value)}
              placeholder="e.g. UPI/HDFC/491029481029"
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-stone-900 focus:outline-hidden focus:border-amber-600"
              required
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-md"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Mark as Settled</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
