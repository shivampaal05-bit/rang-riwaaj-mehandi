'use client';

import React, { useState } from 'react';
import { X, Wallet, CheckCircle2, ArrowRight } from 'lucide-react';
import { formatINR } from '@/lib/commission-calculator';

interface PayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
  artistUpi: string;
  onRequestPayout: (amount: number, method: 'upi' | 'bank_transfer', accountDetails: string) => void;
}

export default function PayoutModal({
  isOpen,
  onClose,
  availableBalance,
  artistUpi,
  onRequestPayout,
}: PayoutModalProps) {
  const [method, setMethod] = useState<'upi' | 'bank_transfer'>('upi');
  const [amount, setAmount] = useState(availableBalance.toString());
  const [accountDetails, setAccountDetails] = useState(artistUpi || '');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0 || num > availableBalance) {
      alert(`Please enter a valid amount up to ${formatINR(availableBalance)}`);
      return;
    }
    if (!accountDetails.trim()) {
      alert('Please enter your payment account or UPI ID');
      return;
    }

    onRequestPayout(num, method, accountDetails.trim());
    setSubmitted(true);
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

        {submitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">
              Payout Request Submitted!
            </h3>
            <p className="text-xs text-stone-600 max-w-xs mx-auto">
              Your request for <strong className="text-stone-900">{formatINR(parseFloat(amount))}</strong> has been forwarded to Rang Riwaaz Admin. Settled directly within 24 hours to <strong className="text-stone-900">{accountDetails}</strong>.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="py-2.5 px-6 bg-[#163820] text-emerald-200 font-bold rounded-xl text-xs hover:bg-[#1f4e2d] transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900">
                  Request Earnings Payout
                </h3>
                <p className="text-xs text-stone-500">
                  Instant transfer via UPI or NEFT bank account
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wide block">
                  Available Payout Balance
                </span>
                <span className="text-2xl font-extrabold text-emerald-800">
                  {formatINR(availableBalance)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setAmount(availableBalance.toString())}
                className="text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-2.5 py-1 rounded-lg"
              >
                Withdraw All
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 block">
                Payout Method
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMethod('upi')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    method === 'upi'
                      ? 'bg-[#163820] text-white border-[#163820]'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  ⚡ UPI (Fastest)
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('bank_transfer')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    method === 'bank_transfer'
                      ? 'bg-[#163820] text-white border-[#163820]'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  🏦 Bank Account
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 block">
                Withdrawal Amount (₹)
              </label>
              <input
                type="number"
                min="500"
                max={availableBalance}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-bold text-stone-900 focus:outline-hidden focus:border-emerald-600"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 block">
                {method === 'upi' ? 'UPI ID (e.g. yourname@okhdfcbank)' : 'Bank Account & IFSC'}
              </label>
              <input
                type="text"
                value={accountDetails}
                onChange={(e) => setAccountDetails(e.target.value)}
                placeholder={method === 'upi' ? 'pooja.verma@okhdfcbank' : 'A/C: 50100..., IFSC: HDFC...'}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-hidden focus:border-emerald-600"
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={availableBalance <= 0}
                className="w-full py-3 bg-[#163820] hover:bg-[#1a4427] disabled:bg-stone-300 text-emerald-100 font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Confirm Payout Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
