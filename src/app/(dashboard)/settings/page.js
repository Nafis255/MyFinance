'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { FaUser, FaLock, FaTrash, FaSave } from 'react-icons/fa'; 
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleResetData = () => {
    if (confirm('PERINGATAN: Semua data transaksi akan dihapus permanen. Lanjutkan?')) {
        localStorage.removeItem('transactions');
        alert('Data transaksi berhasil direset.');
        window.location.reload();
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        alert('Profil berhasil diperbarui (Simulasi)');
    }, 1000);
  };

  return (
    <div className="container-custom max-w-[800px] animate-[fadeIn_0.5s_ease-out]">
       <div className="mb-8">
          <h2 className="text-2xl font-bold text-dark">Pengaturan</h2>
          <p className="text-gray text-sm">Kelola profil dan preferensi aplikasi</p>
       </div>

       {/* Profil Section */}
       <div className="card mb-8">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
             <FaUser className="text-primary" /> Profil Pengguna
          </h3>
          
          <form onSubmit={handleSaveProfile}>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                   <label className="form-label">Nama Lengkap</label>
                   <input type="text" className="form-control" defaultValue={user?.name} />
                </div>
                <div>
                   <label className="form-label">Email</label>
                   <input type="email" className="form-control bg-gray-100" defaultValue={user?.email} disabled />
                </div>
             </div>
             <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Menyimpan...' : <><FaSave /> Simpan Profil</>}
             </button>
          </form>
       </div>

       {/* Zona Bahaya */}
       <div className="card border border-red-200">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-danger">
             <FaLock className="text-danger" /> Zona Bahaya
          </h3>
          <div className="flex flex-col gap-4">
             <div className="flex justify-between items-center p-4 bg-red-50 rounded-[var(--radius)]">
                <div>
                   <h4 className="font-bold text-danger">Reset Semua Data</h4>
                   <p className="text-sm text-gray-600">Menghapus semua riwayat transaksi dari penyimpanan lokal.</p>
                </div>
                <button onClick={handleResetData} className="btn-danger text-sm">
                   <FaTrash /> Reset Data
                </button>
             </div>
          </div>
       </div>
    </div>
  );
}