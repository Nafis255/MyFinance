'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaEnvelope } from 'react-icons/fa';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulasi kirim email
    setTimeout(() => {
      setLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 relative" 
         style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      
      <div className="bg-white p-8 rounded-[var(--radius)] shadow-2xl w-full max-w-[450px] animate-[fadeIn_0.5s_ease-out]">
        {!isSent ? (
          <>
            <h2 className="text-2xl font-bold text-dark mb-2 text-center">Lupa Password?</h2>
            <p className="text-gray text-center mb-6">Masukkan email Anda untuk mereset password.</p>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="form-label">Email Terdaftar</label>
                <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray" />
                    <input 
                      type="email" 
                      className="form-control pl-10" 
                      placeholder="email@contoh.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                </div>
              </div>
              
              <button type="submit" className="btn-primary w-full py-3 mb-4" disabled={loading}>
                {loading ? 'Mengirim...' : 'Kirim Link Reset'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 text-secondary rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
               <FaEnvelope />
            </div>
            <h2 className="text-2xl font-bold text-dark mb-2">Cek Email Anda</h2>
            <p className="text-gray mb-6">Kami telah mengirimkan instruksi reset password ke <strong>{email}</strong></p>
            <button onClick={() => setIsSent(false)} className="btn-outline w-full mb-4">
               Kirim Ulang
            </button>
          </div>
        )}

        <div className="text-center">
           <Link href="/login" className="text-gray hover:text-primary flex items-center justify-center gap-2">
             <FaArrowLeft /> Kembali ke Login
           </Link>
        </div>
      </div>
    </div>
  );
}