'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaArrowLeft, FaCheck } from 'react-icons/fa';

export default function RegisterPage() {
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validasi Manual
    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok');
      return;
    }

    if (!formData.terms) {
      setError('Anda harus menyetujui Syarat & Ketentuan');
      return;
    }

    setIsLoading(true);

    try {
      // Panggil fungsi register dari AuthContext
      const result = await register(formData.name, formData.email, formData.password);
      
      if (!result.success) {
        setError(result.error);
        setIsLoading(false);
      }
      // Jika sukses, otomatis redirect ke dashboard (diatur di AuthContext)
    } catch (err) {
      setError('Terjadi kesalahan sistem.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 relative" 
         style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      
      {/* Tombol Kembali */}
      <div className="absolute top-5 left-5 z-10">
        <Link href="/" className="inline-flex items-center justify-center w-10 h-10 bg-white/20 rounded-full text-white hover:bg-white/30 hover:-translate-x-1 transition-all duration-300">
            <FaArrowLeft />
        </Link>
      </div>

      <div className="bg-white p-8 md:p-10 rounded-[var(--radius)] shadow-2xl w-full max-w-[500px] animate-[fadeIn_0.5s_ease-out]">
        
        <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-2 mb-2 text-3xl">
                <span>💰</span>
            </div>
            <h2 className="text-2xl font-bold text-dark mb-2">Buat Akun Baru</h2>
            <p className="text-gray">Mulai kelola keuangan Anda dengan lebih baik</p>
        </div>

        <form onSubmit={handleSubmit}>
            {error && (
                <div className="bg-red-100 border border-red-200 text-danger px-4 py-3 rounded-[var(--radius)] mb-5 text-sm flex items-center gap-2">
                    <span className="font-bold">!</span> {error}
                </div>
            )}

            {/* Nama Lengkap */}
            <div className="mb-4">
                <label className="form-label" htmlFor="name">Nama Lengkap</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray">
                        <FaUser />
                    </div>
                    <input 
                        type="text" 
                        id="name" 
                        name="name"
                        className="form-control pl-10"
                        placeholder="Nama Anda"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            {/* Email */}
            <div className="mb-4">
                <label className="form-label" htmlFor="email">Email</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray">
                        <FaEnvelope />
                    </div>
                    <input 
                        type="email" 
                        id="email" 
                        name="email"
                        className="form-control pl-10"
                        placeholder="email@contoh.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            {/* Password */}
            <div className="mb-4">
                <label className="form-label" htmlFor="password">Password</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray">
                        <FaLock />
                    </div>
                    <input 
                        type="password"
                        id="password" 
                        name="password"
                        className="form-control pl-10"
                        placeholder="Minimal 6 karakter"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                    />
                </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-5">
                <label className="form-label" htmlFor="confirmPassword">Konfirmasi Password</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray">
                        <FaCheck />
                    </div>
                    <input 
                        type="password"
                        id="confirmPassword" 
                        name="confirmPassword"
                        className="form-control pl-10"
                        placeholder="Ulangi password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            {/* Terms */}
            <div className="mb-6">
                <label className="flex items-start gap-2 cursor-pointer">
                    <input 
                        type="checkbox" 
                        name="terms"
                        checked={formData.terms}
                        onChange={handleChange}
                        className="mt-1 rounded border-gray text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-gray">
                        Saya menyetujui <a href="#" className="text-primary hover:underline">Syarat & Ketentuan</a> dan <a href="#" className="text-primary hover:underline">Kebijakan Privasi</a>
                    </span>
                </label>
            </div>

            <button 
                type="submit" 
                disabled={isLoading}
                className="btn-primary w-full py-3 mb-6 disabled:opacity-70 disabled:cursor-wait"
            >
                {isLoading ? "Membuat Akun..." : "Daftar Sekarang"}
            </button>

            <div className="relative flex items-center justify-center mb-6">
                <div className="border-t border-border w-full absolute"></div>
                <span className="bg-white px-3 relative text-gray text-sm">atau daftar dengan</span>
            </div>

            <button 
                type="button" 
                onClick={() => alert('Fitur Google Register segera hadir!')}
                className="w-full flex items-center justify-center gap-3 bg-white border border-border text-dark py-3 rounded-[var(--radius)] hover:bg-light transition-colors font-medium"
            >
                <FaGoogle className="text-blue-500" />
                <span>Daftar dengan Google</span>
            </button>

            <div className="text-center mt-8 text-gray">
                <p>Sudah punya akun? <Link href="/login" className="text-primary font-semibold hover:underline">Login di sini</Link></p>
            </div>
        </form>
      </div>
    </div>
  );
}