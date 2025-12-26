'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  FaHome, 
  FaExchangeAlt, 
  FaChartBar, 
  FaTags, 
  FaUserCircle, 
  FaChevronDown, 
  FaSignOutAlt, 
  FaUser, 
  FaCog,
  FaBars,
  FaTimes
} from 'react-icons/fa';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  
  // State untuk dropdown dan mobile menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Ref untuk mendeteksi klik di luar dropdown
  const dropdownRef = useRef(null);

  // Fungsi helper untuk cek menu aktif
  const isActive = (path) => pathname.startsWith(path);

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Tutup mobile menu saat rute berubah
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <FaHome /> },
    { name: 'Transaksi', path: '/transactions', icon: <FaExchangeAlt /> },
    { name: 'Laporan', path: '/reports', icon: <FaChartBar /> },
    { name: 'Kategori', path: '/categories', icon: <FaTags /> },
  ];

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 no-underline">
            <span className="text-2xl">💰</span>
            <h1 className="text-xl font-bold text-primary">MyFinance</h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                href={link.path}
                className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 
                  ${isActive(link.path) 
                    ? 'text-primary' 
                    : 'text-gray hover:text-primary'
                  }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>

          {/* User Menu (Desktop & Mobile trigger) */}
          <div className="flex items-center gap-3">
            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-light transition-colors border border-transparent hover:border-border"
              >
                <FaUserCircle className="text-2xl text-gray" />
                <span className="hidden sm:block font-medium text-sm text-dark">
                  {user?.name || 'User'}
                </span>
                <FaChevronDown className={`text-xs text-gray transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Content */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-border animate-[fadeIn_0.2s_ease-out]">
                  <div className="px-4 py-2 border-b border-border sm:hidden">
                    <p className="text-sm font-semibold text-dark">{user?.name}</p>
                    <p className="text-xs text-gray truncate">{user?.email}</p>
                  </div>
                  
                  <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray hover:bg-light hover:text-primary">
                    <FaUser /> Profil
                  </Link>
                  <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray hover:bg-light hover:text-primary">
                    <FaCog /> Pengaturan
                  </Link>
                  <div className="border-t border-border my-1"></div>
                  <button 
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-red-50 text-left"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-2xl text-dark p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white animate-[slideDown_0.3s_ease-out]">
          <div className="container-custom py-3 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                href={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium
                  ${isActive(link.path) 
                    ? 'bg-blue-50 text-primary' 
                    : 'text-gray hover:bg-light'
                  }`}
              >
                <span className="text-lg">{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}