'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { FaEye, FaEyeSlash, FaGoogle, FaArrowLeft } from 'react-icons/fa';

export default function LoginPage() {
  const { login } = useAuth(); // Ambil fungsi login dari Context
  
  // State untuk form input
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  
  // State untuk UI
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Panggil fungsi login dari AuthContext
      const result = await login(formData.email, formData.password, formData.remember);
      
      if (!result.success) {
        setError(result.error);
        setIsLoading(false);
      }
      // Jika sukses, AuthContext akan otomatis redirect ke dashboard
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

      <div className="bg-white p-8 md:p-10 rounded-[var(--radius)] shadow-2xl w-full max-w-[450px] animate-[fadeIn_0.5s_ease-out]">
        
        {/* Header */}
        <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-2 mb-2 text-3xl">
                <span>💰</span>
            </div>
            <h2 className="text-2xl font-bold text-dark mb-2">Selamat Datang Kembali</h2>
            <p className="text-gray">Masuk ke akun Anda untuk melanjutkan</p>
        </div>

        <form onSubmit={handleSubmit}>
            {/* Error Alert */}
            {error && (
                <div className="bg-red-100 border border-red-200 text-danger px-4 py-3 rounded-[var(--radius)] mb-5 text-sm">
                    {error}
                </div>
            )}

            {/* Email Input */}
            <div className="mb-5">
                <label className="form-label" htmlFor="email">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email"
                    className="form-control"
                    placeholder="email@contoh.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Password Input */}
            <div className="mb-5">
                <label className="form-label" htmlFor="password">Password</label>
                <div className="relative">
                    <input 
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        className="form-control pr-10" // pr-10 beri ruang untuk ikon mata
                        placeholder="Masukkan password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray hover:text-dark"
                        tabIndex="-1"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center mb-6 text-sm">
                <div className="flex items-center gap-2">
                    <input 
                        type="checkbox" 
                        id="remember" 
                        name="remember"
                        checked={formData.remember}
                        onChange={handleChange}
                        className="rounded border-gray text-primary focus:ring-primary"
                    />
                    <label htmlFor="remember" className="text-dark cursor-pointer">Ingat saya</label>
                </div>
                <Link href="/forgot-password" className="text-primary hover:underline">
                    Lupa password?
                </Link>
            </div>

            {/* Submit Button */}
            <button 
                type="submit" 
                disabled={isLoading}
                className="btn-primary w-full py-3 mb-6 disabled:opacity-70 disabled:cursor-wait"
            >
                {isLoading ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Memproses...
                    </span>
                ) : (
                    "Masuk"
                )}
            </button>

            <div className="relative flex items-center justify-center mb-6">
                <div className="border-t border-border w-full absolute"></div>
                <span className="bg-white px-3 relative text-gray text-sm">atau lanjutkan dengan</span>
            </div>

            {/* Google Login (Dummy) */}
            <button 
                type="button" 
                onClick={() => alert('Login Google segera hadir!')}
                className="w-full flex items-center justify-center gap-3 bg-white border border-border text-dark py-3 rounded-[var(--radius)] hover:bg-light transition-colors font-medium"
            >
                <FaGoogle className="text-blue-500" />
                <span>Login dengan Google</span>
            </button>

            <div className="text-center mt-8 text-gray">
                <p>Belum punya akun? <Link href="/register" className="text-primary font-semibold hover:underline">Daftar di sini</Link></p>
            </div>
        </form>
      </div>
    </div>
  );
}