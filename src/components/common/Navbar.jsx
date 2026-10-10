import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  Menu, X, Home, Info, Camera, Video as VideoIcon, ShieldCheck 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useBooking } from '../../context/BookingContext';
import LanguageToggle from './LanguageToggle';
import RangRiwaazLogo from './RangRiwaazLogo';

export default function Navbar() {
  const { t } = useLanguage();
  const { bookings } = useBooking();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeBookingsCount = bookings.filter(
    b => !b.cancelledByArtist && b.status !== 'refunded'
  ).length;

  const navLinks = [
    { to: '/', label: t('navHome') || 'Home', icon: Home },
    { to: '/about', label: t('navAbout') || 'About', icon: null },
    { to: '/photos', label: t('navPhotos') || 'Photos', icon: Camera },
    { to: '/video', label: t('navVideo') || 'Video', icon: VideoIcon },
    { 
      to: '/tracker', 
      label: t('navTrackArtist') || 'Track Artist', 
      icon: ShieldCheck, 
      badge: activeBookingsCount > 0 ? activeBookingsCount : null 
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#fdfbf7]/95 backdrop-blur-md border-b border-[#e8decb]/90 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <RangRiwaazLogo size="md" />
        </Link>

        {/* Desktop Navigation Links: Home, About, Photos, Video, Track Artist */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2.5">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 relative ${
                  isActive
                    ? 'text-[#163820] bg-[#163820]/10 border border-[#163820]/25 shadow-xs font-bold'
                    : 'text-stone-700 hover:text-[#163820] hover:bg-stone-100/80'
                }`
              }
            >
              {item.icon && <item.icon className="w-4 h-4 text-[#88451b]" />}
              <span>{item.label}</span>
              {item.badge && (
                <span className="w-4 h-4 rounded-full bg-[#88451b] text-white text-[9px] font-extrabold flex items-center justify-center animate-pulse">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right Tools: Language Toggle & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle />

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="md:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-1.5 shadow-xl animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#163820]/10 text-[#163820] font-bold border border-[#163820]/25'
                    : 'text-stone-700 hover:bg-stone-50'
                }`
              }
            >
              <div className="flex items-center gap-3">
                {item.icon && <item.icon className="w-4 h-4 text-[#88451b]" />}
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="w-5 h-5 rounded-full bg-[#88451b] text-white text-[10px] font-extrabold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
