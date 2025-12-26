'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { FaChartLine, FaShieldAlt, FaMobileAlt, FaArrowRight } from 'react-icons/fa';

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-light">
      
      {/* Navbar Publik */}
      <nav className="bg-white shadow-sm py-4">
        <div className="container-custom flex justify-between items-center">
           <div className="flex items-center gap-2">
              <span className="text-2xl">💰</span>
              <h1 className="text-xl font-bold text-primary">MyFinance</h1>
           </div>
           <div>
              {user ? (
                 <Link href="/dashboard" className="btn-primary">
                    Ke Dashboard
                 </Link>
              ) : (
                 <div className="flex gap-3">
                    <Link href="/login" className="btn-outline">
                       Masuk
                    </Link>
                    <Link href="/register" className="btn-primary">
                       Daftar
                    </Link>
                 </div>
              )}
           </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex items-center py-20 px-5">
         <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
               <h1 className="text-4xl md:text-5xl font-bold leading-tight text-dark">
                  Kelola Keuangan Anda dengan <span className="text-primary">Lebih Cerdas</span>
               </h1>
               <p className="text-lg text-gray">
                  Catat pemasukan, pantau pengeluaran, dan capai tujuan finansial Anda dengan aplikasi pencatatan keuangan sederhana namun powerful.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href={user ? "/dashboard" : "/register"} className="btn-primary px-8 py-4 text-lg">
                     Mulai Sekarang <FaArrowRight />
                  </Link>
                  <button className="btn-outline px-8 py-4 text-lg">
                     Pelajari Lebih Lanjut
                  </button>
               </div>
            </div>
            {/* Ilustrasi Sederhana dengan CSS/Emoji */}
            <div className="flex justify-center animate-[fadeIn_0.8s_ease-out]">
               <div className="bg-white p-8 rounded-2xl shadow-2xl border border-border max-w-sm w-full transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="flex justify-between items-center mb-6">
                     <div className="font-bold text-lg">Ringkasan Bulan Ini</div>
                     <div className="text-xs bg-green-100 text-secondary px-2 py-1 rounded">Surplus</div>
                  </div>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <div className="flex gap-3 items-center">
                           <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-primary">💼</div>
                           <div>
                              <div className="font-bold text-sm">Gaji Bulanan</div>
                              <div className="text-xs text-gray">15 Mar 2024</div>
                           </div>
                        </div>
                        <div className="font-bold text-secondary">+ Rp 5.000.000</div>
                     </div>
                     <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                        <div className="flex gap-3 items-center">
                           <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center text-danger">🛒</div>
                           <div>
                              <div className="font-bold text-sm">Belanja</div>
                              <div className="text-xs text-gray">16 Mar 2024</div>
                           </div>
                        </div>
                        <div className="font-bold text-danger">- Rp 750.000</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
         <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">Mengapa Memilih Kami?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="text-center p-6 hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                     <FaMobileAlt />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Mudah Digunakan</h3>
                  <p className="text-gray">Tampilan antarmuka yang bersih dan intuitif, cocok untuk siapa saja.</p>
               </div>
               <div className="text-center p-6 hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-16 h-16 bg-green-100 text-secondary rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                     <FaChartLine />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Laporan Visual</h3>
                  <p className="text-gray">Grafik interaktif untuk memahami pola pengeluaran Anda dengan cepat.</p>
               </div>
               <div className="text-center p-6 hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                     <FaShieldAlt />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Data Aman</h3>
                  <p className="text-gray">Data tersimpan aman di browser Anda (LocalStorage) tanpa dikirim ke server luar.</p>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-10">
         <div className="container-custom text-center">
            <p className="mb-4 text-2xl">💰</p>
            <p className="opacity-70">&copy; 2025 MyFinance Tracker. Dibuat dengan ❤️ menggunakan Next.js & Tailwind CSS.</p>
         </div>
      </footer>
    </div>
  );
}