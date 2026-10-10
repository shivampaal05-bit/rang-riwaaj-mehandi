import React from 'react';
import Link from 'next/link';
import { Sparkles, MapPin, Phone, ShieldCheck, Heart, MessageCircle } from 'lucide-react';
import InstagramButton from '@/components/InstagramButton';
import { getWhatsAppUrl, SOCIAL_CONFIG } from '@/lib/social-config';

export default function Footer() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <footer className="bg-[#1c0e05] text-stone-300 border-t border-[#c59b4e]/30 mt-auto text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#54250a] via-[#88451b] to-[#c59b4e] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-200" />
              </div>
              <span className="font-extrabold text-lg text-white font-serif">
                Rang Riwaaz Mehandi
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Gorakhpur’s date-locked, price-transparent commission marketplace.
              Bridal, Sangeet & Marwari artistry with backup artist security.
            </p>
            <div className="text-xs text-amber-300/90 font-medium flex items-center gap-1.5 pt-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Center Hub: Baraipar Mod (Pincode: 273413)</span>
            </div>

            {/* Follow Us on Instagram Button */}
            <div className="pt-2">
              <InstagramButton variant="footer" />
            </div>
          </div>

          {/* Gorakhpur Localities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-200 uppercase tracking-wider">
              Localities Served
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-stone-400">
              <span>• Baraipar Mod</span>
              <span>• Kauriram</span>
              <span>• Belipar</span>
              <span>• Mahavir Chapra</span>
              <span>• Naushad</span>
              <span>• Taramandal</span>
              <span>• Rustampur</span>
              <span>• Golghar</span>
              <span>• Betiahata</span>
              <span>• Mohaddipur</span>
            </div>
          </div>

          {/* Marketplace Commission Transparency */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-200 uppercase tracking-wider">
              Commission Transparency
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li className="flex items-center justify-between py-0.5 border-b border-stone-800">
                <span>Bridal Specialists</span>
                <span className="text-rose-400 font-bold">15% Platform Fee</span>
              </li>
              <li className="flex items-center justify-between py-0.5 border-b border-stone-800">
                <span>Top-Rated / Elite</span>
                <span className="text-amber-400 font-bold">12% Platform Fee</span>
              </li>
              <li className="flex items-center justify-between py-0.5 border-b border-stone-800">
                <span>Standard / Regular</span>
                <span className="text-emerald-400 font-bold">10% Platform Fee</span>
              </li>
              <li className="text-[11px] text-stone-500 pt-1">
                20% advance token locks date; remaining 80% paid directly to artist on event day.
              </li>
            </ul>
          </div>

          {/* Quick Links & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-200 uppercase tracking-wider">
              Quick Portals
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li>
                <Link href="/artists" className="hover:text-amber-300 transition-colors">
                  Browse Verified Mehndi Artists
                </Link>
              </li>
              <li>
                <Link href="/dashboard/customer" className="hover:text-amber-300 transition-colors">
                  Customer Bookings & Timeline
                </Link>
              </li>
              <li>
                <Link href="/dashboard/artist" className="hover:text-amber-300 transition-colors">
                  Artist Portal & Payout Ledger
                </Link>
              </li>
              <li>
                <Link href="/dashboard/admin" className="hover:text-amber-300 transition-colors">
                  Admin Trust & Commission Console
                </Link>
              </li>
            </ul>
            <div className="pt-2 text-xs text-stone-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Ops Desk: +91 94500 00100</span>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp: +91 87565 49820</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p>© 2026 Rang Riwaaz Mehandi Marketplace. Gorakhpur, UP.</p>
          <div className="flex items-center gap-1 text-stone-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Supabase Secured • 5-Point Artist Verification • Date-Lock Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
