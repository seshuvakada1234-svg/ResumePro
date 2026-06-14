'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, Home, Layout, Zap, Mail, Share2, Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import { Auth } from './Auth';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'FreeResume',
        text: 'Build your professional ATS resume for free!',
        url: window.location.origin,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin);
      toast.success('Link copied to clipboard!');
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', href: '/', icon: <Home size={18} /> },
    { id: 'templates', label: 'Templates', href: '/templates', icon: <Layout size={18} /> },
    { id: 'ats-tips', label: 'ATS Tips', href: '/tips', icon: <Zap size={18} /> },
    { id: 'contact', label: 'Contact', href: '/contact', icon: <Mail size={18} /> },
  ];

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm navbar h-16 py-2 px-3 flex items-center md:py-0 transition-all duration-300">
      <div className="max-w-7xl mx-auto w-full px-0 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full sm:h-16 flex-nowrap overflow-hidden">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 sm:gap-2 group shrink-0 flex-nowrap">
            <div className="bg-indigo-600 rounded-lg group-hover:rotate-12 transition-transform logo-icon w-9 h-9 md:w-auto md:h-auto flex items-center justify-center p-0 md:p-2">
              <FileText className="text-white w-[18px] h-[18px]" size={18} />
            </div>
            <span className="text-[14px] md:text-xl font-bold tracking-tight text-gray-900 logo-text">
              Free<span className="bg-gradient-to-r from-indigo-600 via-violet-500 to-pink-500 bg-clip-text text-transparent inline-block">Resume</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6 text-sm font-semibold text-gray-500">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-1.5 hover:text-indigo-600 transition-colors relative py-2 ${
                    isActive(item.href) ? 'text-indigo-600' : ''
                  }`}
                >
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"
                    />
                  )}
                  {item.label}
                </Link>
              ))}
              <button 
                onClick={handleShare} 
                className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors"
              >
                <Share2 size={16} /> Share
              </button>
            </div>
            <div className="h-6 w-px bg-gray-200 mx-2" />
            <Auth />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-1 sm:gap-3 shrink-0 flex-nowrap">
            <Auth />
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1 sm:p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors shrink-0 flex items-center justify-center"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="menu-icon w-[22px] h-[22px] md:w-5 md:h-5" size={20} />
              ) : (
                <Menu className="menu-icon w-[22px] h-[22px] md:w-5 md:h-5" size={20} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-white border-t border-gray-100 py-4 px-4 shadow-xl"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-xl font-bold text-sm transition-all ${
                    isActive(item.href) 
                      ? 'bg-indigo-50 text-indigo-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.icon} {item.label}
                </Link>
              ))}
              <button 
                onClick={() => {
                  handleShare();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 p-3 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50 transition-all"
              >
                <Share2 size={18} /> Share App
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
