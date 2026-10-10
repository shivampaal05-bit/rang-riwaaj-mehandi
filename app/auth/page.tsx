'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  Lock,
  Mail,
  User,
  Phone,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { UserRole } from '@/types/marketplace';

export default function AuthPage() {
  const router = useRouter();
  const { switchPersona, loginUser, currentUser } = useMarketplace();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('priya.tiwari@example.com');
  const [password, setPassword] = useState('mehndi@123');
  const [fullName, setFullName] = useState('Priya Tiwari');
  const [phone, setPhone] = useState('+91 98391 22840');
  const [role, setRole] = useState<UserRole>('customer');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // 1-Click Fast Switch handler
  const handleFastSwitch = (targetRole: UserRole, destination: string) => {
    switchPersona(targetRole);
    setMessage({
      text: `Switched to persona: ${targetRole.toUpperCase()}`,
      type: 'success',
    });
    router.push(destination);
  };

  // Auth Submit Handler
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isSupabaseConfigured()) {
        if (isRegister) {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName,
                phone,
                role,
              },
            },
          });
          if (error) throw error;
          setMessage({
            text: 'Account created in Supabase! You are now logged in.',
            type: 'success',
          });
        } else {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw error;
          setMessage({ text: 'Signed in successfully with Supabase!', type: 'success' });
        }
      }

      // Sync local marketplace context
      loginUser({
        email,
        fullName: isRegister ? fullName : email.split('@')[0],
        phone,
        role,
      });

      // Redirect by role
      if (role === 'artist') {
        router.push('/dashboard/artist');
      } else if (role === 'admin') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/customer');
      }
    } catch (err: any) {
      setMessage({
        text: err.message || 'Authentication error. Falling back to local demo profile.',
        type: 'error',
      });
      // Fallback demo login
      loginUser({ email, fullName, phone, role });
      setTimeout(() => {
        if (role === 'artist') router.push('/dashboard/artist');
        else router.push('/dashboard/customer');
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6 text-left">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#54250a] via-[#88451b] to-[#c59b4e] flex items-center justify-center mx-auto shadow-md">
          <Sparkles className="w-6 h-6 text-amber-200" />
        </div>
        <h1 className="text-2xl font-extrabold text-stone-900 font-serif">
          Rang Riwaaz Marketplace Login
        </h1>
        <p className="text-xs text-stone-500">
          Supabase Secured Authentication • Gorakhpur Commission Platform
        </p>
      </div>

      {/* 1-Click Fast Persona Switcher Box */}
      <div className="bg-amber-50/80 border border-amber-300/80 rounded-3xl p-4 space-y-3">
        <div className="flex items-center justify-center gap-1.5 text-amber-900 font-bold uppercase tracking-wider text-[11px]">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>⚡ Instant 1-Click Demo Personas</span>
        </div>

        <div className="space-y-2">
          {/* Customer */}
          <button
            type="button"
            onClick={() => handleFastSwitch('customer', '/dashboard/customer')}
            className="w-full p-2.5 bg-white hover:bg-stone-50 rounded-2xl border border-stone-200 text-left flex items-center justify-between text-xs cursor-pointer shadow-xs transition-all"
          >
            <div>
              <strong className="text-stone-900 block">Priya Tiwari (Customer)</strong>
              <span className="text-[11px] text-stone-500">Golghar, Gorakhpur • Active Bride Booking</span>
            </div>
            <span className="text-[11px] text-rose-800 font-bold">Login →</span>
          </button>

          {/* Artist */}
          <button
            type="button"
            onClick={() => handleFastSwitch('artist', '/dashboard/artist')}
            className="w-full p-2.5 bg-white hover:bg-stone-50 rounded-2xl border border-stone-200 text-left flex items-center justify-between text-xs cursor-pointer shadow-xs transition-all"
          >
            <div>
              <strong className="text-stone-900 block">Pooja Verma (Bridal Artist)</strong>
              <span className="text-[11px] text-emerald-700 font-semibold">Baraipar Mod Hub • 15% Tier • Payout Ledger</span>
            </div>
            <span className="text-[11px] text-emerald-800 font-bold">Login →</span>
          </button>

          {/* Admin */}
          <button
            type="button"
            onClick={() => handleFastSwitch('admin', '/dashboard/admin')}
            className="w-full p-2.5 bg-white hover:bg-stone-50 rounded-2xl border border-stone-200 text-left flex items-center justify-between text-xs cursor-pointer shadow-xs transition-all"
          >
            <div>
              <strong className="text-stone-900 block">Rajnish Kumar (Ops Lead Admin)</strong>
              <span className="text-[11px] text-amber-700 font-semibold">Gorakhpur HQ • Commission & KYC Console</span>
            </div>
            <span className="text-[11px] text-amber-800 font-bold">Login →</span>
          </button>
        </div>
      </div>

      {/* Auth Card */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
        {message && (
          <div
            className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              message.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                : 'bg-rose-50 text-rose-800 border border-rose-300'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Tab Toggle */}
        <div className="flex rounded-xl bg-stone-100 p-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => setIsRegister(false)}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              !isRegister ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(true)}
            className={`flex-1 py-1.5 rounded-lg transition-all ${
              isRegister ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
            }`}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleAuthSubmit} className="space-y-3.5 text-xs">
          {isRegister && (
            <>
              <div className="space-y-1">
                <label className="font-bold text-stone-700 block">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Priya Tiwari"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-stone-900"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 block">Mobile Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98391 22840"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-stone-900"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 block">Registering As</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('customer')}
                    className={`py-2 px-3 rounded-xl font-bold border transition-all ${
                      role === 'customer'
                        ? 'bg-rose-50 border-rose-300 text-rose-900'
                        : 'bg-stone-50 border-stone-200 text-stone-700'
                    }`}
                  >
                    Client / Bride
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('artist')}
                    className={`py-2 px-3 rounded-xl font-bold border transition-all ${
                      role === 'artist'
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : 'bg-stone-50 border-stone-200 text-stone-700'
                    }`}
                  >
                    Mehndi Artist
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="space-y-1">
            <label className="font-bold text-stone-700 block">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-stone-900"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-stone-700 block">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-stone-900"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#88451b] hover:bg-[#54250a] text-white font-bold rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>{isRegister ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
