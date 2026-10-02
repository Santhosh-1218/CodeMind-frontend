'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code2, Menu, Plus, Brain, LogIn, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { UserMenu } from './UserMenu';
import { MobileMenu } from './MobileMenu';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isApp = pathname?.startsWith('/app');

  const navLinks = isApp
    ? [
        { href: '/app', label: 'Review', exact: true },
        { href: '/app/history', label: 'History', exact: false },
        { href: '/app/learning', label: 'Learning', isLearning: true, exact: false },
        { href: '/about', label: 'About', exact: false },
      ]
    : [
        { href: '/how-it-works', label: 'How It Works', exact: false },
        { href: '/features', label: 'Features', exact: false },
        { href: '/about', label: 'About', exact: false },
      ];

  const checkIsActive = (href: string, exact: boolean) => {
    if (!pathname) return false;
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-3 z-50 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto">
      {/* Dynamic Scroll-Aware Glassmorphism Container with Rounded Cropped Ends */}
      <div
        className={`relative border rounded-2xl px-5 sm:px-6 transition-all duration-300 flex items-center justify-between ${
          isScrolled
            ? 'bg-[#09090b]/92 backdrop-blur-3xl border-zinc-700/90 shadow-[0_15px_35px_rgba(0,0,0,0.95)] py-1.5 ring-1 ring-white/10'
            : 'bg-[#121215]/80 backdrop-blur-2xl border-zinc-800/80 shadow-2xl py-2 hover:border-zinc-700/80'
        }`}
      >
        {/* Top Glossy Glass Sheen Line Highlight */}
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-8">
          <Link href={user ? '/app' : '/'} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-white via-zinc-200 to-zinc-400 text-black flex items-center justify-center font-black group-hover:scale-105 transition-all shadow-md">
              <Code2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base text-white tracking-tight leading-tight font-mono group-hover:text-emerald-400 transition-colors">
                CodeMind
              </span>
              <span className="text-[9px] font-mono text-zinc-400 tracking-wider uppercase">AI Review</span>
            </div>
          </Link>

          {/* Desktop Navigation Links with Smooth Animated Underline on Hover & Active */}
          <nav className="hidden md:flex items-center gap-2 text-xs font-mono font-medium">
            {navLinks.map((link) => {
              const isActive = checkIsActive(link.href, link.exact);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 transition-all duration-200 flex items-center gap-1.5 group ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {link.isLearning && (
                    <Brain className={`w-3.5 h-3.5 ${isActive ? 'text-purple-400' : 'text-purple-400/80 group-hover:text-purple-400'}`} />
                  )}
                  <span>{link.label}</span>

                  {/* Smooth Expanding Underline Line Animation on Hover & Active */}
                  <span
                    className={`absolute bottom-0 left-1 right-1 h-[2.5px] rounded-full bg-gradient-to-r from-emerald-400 via-purple-400 to-blue-400 transition-all duration-300 ease-out transform shadow-[0_0_12px_rgba(52,211,153,0.9)] origin-left ${
                      isActive
                        ? 'scale-x-100 opacity-100'
                        : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Action Items */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link href="/app" className="hidden sm:inline-flex">
                <button className="px-3.5 py-2 rounded-xl bg-[#18181b] hover:bg-zinc-800 text-zinc-200 border border-emerald-500/40 hover:border-emerald-500 text-xs font-mono font-bold transition-all duration-200 flex items-center gap-1.5 shadow-[0_0_12px_rgba(52,211,153,0.2)] hover:scale-105 active:scale-95">
                  <Plus className="w-3.5 h-3.5 text-emerald-400" />
                  New Review
                </button>
              </Link>
              <UserMenu />
            </>
          ) : (
            <div className="flex items-center gap-2.5 font-mono">
              <Link href="/login">
                <button className="px-4 py-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800/90 hover:border-zinc-700 text-xs font-mono font-medium transition-all duration-200 flex items-center gap-2 shadow-sm group">
                  <LogIn className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                  Sign In
                </button>
              </Link>
              <Link href="/signup">
                <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 hover:from-emerald-300 hover:to-teal-300 text-black font-mono text-xs font-black transition-all duration-200 flex items-center gap-2 shadow-[0_0_20px_rgba(52,211,153,0.35)] hover:shadow-[0_0_25px_rgba(52,211,153,0.5)] hover:scale-105 active:scale-95 group">
                  <Sparkles className="w-3.5 h-3.5 text-black shrink-0" />
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5 text-black group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 md:hidden transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} isAppNav={isApp} />
    </header>
  );
};
