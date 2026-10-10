'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  Menu,
  X,
  Compass,
  CalendarCheck,
  ShieldCheck,
  LayoutDashboard,
  Wallet,
  Settings,
  User,
  ArrowRight,
} from 'lucide-react';
import { useMarketplace } from '@/context/MarketplaceContext';
import { UserRole } from '@/types/marketplace';

export default function Navbar() {
  const pathname = usePathname();
  const { currentUser, switchPersona, bookings } = useMarketplace();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeBookingsCount = bookings.filter(
    b => !b.cancelledByArtist && b.status !== 'cancelled'
  ).length;

  const navLinks = [
    { href: '/', label: 'Home', icon: Sparkles },
    { href: '/artists', label: 'Explore Artists', icon: Compass },
    { href: '/tracker', label: 'Live Tracker', icon: CalendarCheck, badge: activeBookingsCount > 0 ? activeBookingsCount : null },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#fdfbf7]/95 backdrop-blur-md border-b border-[#e8decb]/90 shadow-xs transition-all">
      {/* Persona Quick Bar */}
      <div className="bg-[#1c0e05] text-[#fbf6ec] text-[11px] py-1.5 px-4 border-b border-[#c59b4e]/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-stone-300">
              Gorakhpur Hub: <span className="text-[#e2b96f]">Baraipar Mod (273413)</span>
            </span>
            <span className="hidden sm:inline text-stone-500">•</span>
            <span className="hidden sm:inline text-stone-400">
              Tiered Commission Marketplace (10% - 15%)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-stone-400 font-medium">Demo Persona:</span>
            <div className="inline-flex rounded-lg bg-stone-900/80 p-0.5 border border-stone-700">
              <button
                type="button"
                onClick={() => switchPersona('customer')}
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                  currentUser?.role === 'customer'
                    ? 'bg-[#88451b] text-white shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => switchPersona('artist')}
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                  currentUser?.role === 'artist'
                    ? 'bg-[#163820] text-emerald-300 shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                Artist (Pooja)
              </button>
              <button
                type="button"
                onClick={() => switchPersona('admin')}
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                  currentUser?.role === 'admin'
                    ? 'bg-amber-700 text-amber-100 shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                Admin (Console)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#54250a] via-[#88451b] to-[#c59b4e] flex items-center justify-center shadow-md border border-[#c59b4e]/40 group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6 text-amber-100 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#3d1808] font-serif">
                Rang Riwaaz
              </span>
              <span className="text-[10px] font-extrabold tracking-wider uppercase px-1.5 py-0.5 bg-[#88451b]/10 text-[#88451b] rounded border border-[#88451b]/20">
                Mehandi
              </span>
            </div>
            <p className="text-[10px] font-medium text-stone-500 tracking-wide">
              Gorakhpur’s Date-Locked Marketplace
            </p>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 relative ${
                  isActive
                    ? 'text-[#163820] bg-[#163820]/10 border border-[#163820]/25 shadow-xs font-bold'
                    : 'text-stone-700 hover:text-[#163820] hover:bg-stone-100/80'
                }`}
              >
                <item.icon className="w-4 h-4 text-[#88451b]" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="w-4 h-4 rounded-full bg-[#88451b] text-white text-[9px] font-extrabold flex items-center justify-center animate-pulse">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="h-6 w-px bg-stone-300 mx-1" />

          {/* Role-specific Dashboard Quick Link */}
          {currentUser?.role === 'customer' && (
            <Link
              href="/dashboard/customer"
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                pathname === '/dashboard/customer'
                  ? 'bg-rose-800 text-white shadow-xs'
                  : 'bg-rose-50 text-rose-900 hover:bg-rose-100 border border-rose-200'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Customer Portal</span>
            </Link>
          )}

          {currentUser?.role === 'artist' && (
            <Link
              href="/dashboard/artist"
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                pathname === '/dashboard/artist'
                  ? 'bg-[#163820] text-emerald-200 shadow-xs'
                  : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <Wallet className="w-3.5 h-3.5 text-emerald-700" />
              <span>Artist Dashboard (Earnings)</span>
            </Link>
          )}

          {currentUser?.role === 'admin' && (
            <Link
              href="/dashboard/admin"
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                pathname === '/dashboard/admin'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-300'
              }`}
            >
              <Settings className="w-3.5 h-3.5 text-amber-700" />
              <span>Admin Commission Panel</span>
            </Link>
          )}

          <Link
            href="/auth"
            className="p-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 transition-colors"
            title="Authentication & Profiles"
          >
            <User className="w-4 h-4 text-stone-600" />
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href={
              currentUser?.role === 'artist'
                ? '/dashboard/artist'
                : currentUser?.role === 'admin'
                ? '/dashboard/admin'
                : '/dashboard/customer'
            }
            className="p-2 rounded-xl bg-stone-100 text-stone-800 font-bold text-xs"
          >
            Dashboard
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="p-2 rounded-xl text-stone-700 hover:bg-stone-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold text-stone-700 hover:bg-stone-50"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4 text-[#88451b]" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="w-5 h-5 rounded-full bg-[#88451b] text-white text-[10px] font-extrabold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}

          <div className="pt-2 border-t border-stone-100 space-y-1.5">
            <Link
              href="/dashboard/customer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-stone-50 text-xs font-bold text-stone-800"
            >
              <span>Customer Portal</span>
              <ArrowRight className="w-4 h-4 text-stone-400" />
            </Link>

            <Link
              href="/dashboard/artist"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 text-xs font-bold text-emerald-900 border border-emerald-200"
            >
              <span>Artist Dashboard (Commission & Payouts)</span>
              <ArrowRight className="w-4 h-4 text-emerald-600" />
            </Link>

            <Link
              href="/dashboard/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-amber-50 text-xs font-bold text-amber-900 border border-amber-300"
            >
              <span>Admin Commission Console</span>
              <ArrowRight className="w-4 h-4 text-amber-600" />
            </Link>

            <Link
              href="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-stone-100 text-xs font-bold text-stone-700"
            >
              <span>Login / Account Settings</span>
              <User className="w-4 h-4 text-stone-500" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
