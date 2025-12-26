'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCategories } from '@/hooks/useCategories'; // <--- Import Hook baru
import { FaArrowLeft, FaCheck, FaTimes, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

function TransactionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // GUNAKAN HOOK KATEGORI
  const { categories, loading: categoriesLoading } = useCategories();

  const editId = searchParams.get('edit');
  const typeParam = searchParams.get('type');
  const isEditMode = !!editId;

  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: '', // Nama kategori
    description: '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);

  // Set default type dari URL
  useEffect(() => {
    if (typeParam && ['income', 'expense'].includes(typeParam)) {
      setFormData(prev => ({ ...prev, type: typeParam }));
    }
  }, [typeParam]);

  // Load data edit
  useEffect(() => {
    if (isEditMode) {
      const storedData = JSON.parse(localStorage.getItem('transactions') || '[]');
      const transactionToEdit = storedData.find(t => t.id === Number(editId));
      if (transactionToEdit) {
        setFormData(transactionToEdit);
      }
    }
  }, [isEditMode, editId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.amount || !formData.category || !formData.date) {
      alert('Mohon lengkapi data!');
      setLoading(false);
      return;
    }

    const storedData = JSON.parse(localStorage.getItem('transactions') || '[]');
    let newData;

    if (isEditMode) {
      newData = storedData.map(t => 
        t.id === Number(editId) ? { ...formData, amount: Number(formData.amount) } : t
      );
    } else {
      const newTransaction = {
        ...formData,
        id: Date.now(),
        amount: Number(formData.amount)
      };
      newData = [newTransaction, ...storedData];
    }

    localStorage.setItem('transactions', JSON.stringify(newData));
    
    // Simulasi loading sebentar
    setTimeout(() => router.back(), 500);
  };

  // FILTER KATEGORI (Dari data Hook, bukan Constants lagi)
  // Tampilkan jika tipe-nya cocok (income/expense)
  // ATAU jika sedang edit dan kategori tersebut adalah kategori lama transaksi ini (walau tipe beda, jaga-jaga)
  const availableCategories = categories.filter(cat => 
     cat.type === formData.type || cat.name === 'Lainnya' || cat.name === formData.category
  );

  return (
    <div className="container-custom max-w-[600px] animate-[fadeIn_0.5s_ease-out]">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-primary font-medium mb-5 hover:-translate-x-1 transition-transform">
        <FaArrowLeft /> Kembali
      </button>

      <div className="card">
        <div className="border-b border-border pb-5 mb-5">
          <h2 className="text-xl font-bold flex items-center gap-2">
            {isEditMode ? 'Edit Transaksi' : 'Tambah Transaksi Baru'}
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Type Selector */}
          <div className="mb-6">
            <label className="form-label">Tipe Transaksi</label>
            <div className="flex gap-4">
              <div 
                onClick={() => setFormData({ ...formData, type: 'income', category: '' })}
                className={`flex-1 p-4 border-2 rounded-[var(--radius)] cursor-pointer transition-all flex flex-col items-center justify-center gap-2
                  ${formData.type === 'income' ? 'border-secondary bg-green-50 text-secondary' : 'border-border'}`}
              >
                <FaPlusCircle className="text-xl" />
                <span className="font-semibold">Pemasukan</span>
              </div>
              <div 
                onClick={() => setFormData({ ...formData, type: 'expense', category: '' })}
                className={`flex-1 p-4 border-2 rounded-[var(--radius)] cursor-pointer transition-all flex flex-col items-center justify-center gap-2
                  ${formData.type === 'expense' ? 'border-danger bg-red-50 text-danger' : 'border-border'}`}
              >
                <FaMinusCircle className="text-xl" />
                <span className="font-semibold">Pengeluaran</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div>
               <label className="form-label">Jumlah (Rp)</label>
               <input 
                 type="number" className="form-control" placeholder="0"
                 value={formData.amount}
                 onChange={(e) => setFormData({...formData, amount: e.target.value})}
                 required
               />
            </div>
            <div>
               <label className="form-label">Tanggal</label>
               <input 
                 type="date" className="form-control"
                 value={formData.date}
                 onChange={(e) => setFormData({...formData, date: e.target.value})}
                 required
               />
            </div>
          </div>

          {/* Grid Kategori Dinamis */}
          <div className="mb-6">
            <label className="form-label">Kategori</label>
            {categoriesLoading ? (
                <p className="text-sm text-gray">Memuat kategori...</p>
            ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {availableCategories.map((cat) => (
                    <div 
                    key={cat.id || cat.name} // Gunakan ID unik jika ada
                    onClick={() => setFormData({...formData, category: cat.name})}
                    className={`p-3 border-2 rounded-[var(--radius)] cursor-pointer transition-all text-center flex flex-col items-center gap-2
                        ${formData.category === cat.name 
                        ? 'border-primary bg-blue-50 text-primary' 
                        : 'border-border hover:border-primary text-gray'}`}
                    >
                    <div className="text-xl" style={{ color: formData.category === cat.name ? '' : cat.color }}>
                        {cat.icon}
                    </div>
                    <span className="text-xs font-medium truncate w-full">{cat.name}</span>
                    </div>
                ))}
                </div>
            )}
            
            {/* Link Pintas ke Halaman Kategori */}
            <div className="mt-3 text-right">
                <button 
                    type="button"
                    onClick={() => router.push('/categories')}
                    className="text-xs text-primary hover:underline"
                >
                    + Kelola / Tambah Kategori Lain
                </button>
            </div>
          </div>

          <div className="mb-6">
             <label className="form-label">Deskripsi</label>
             <input 
               type="text" className="form-control" placeholder="Keterangan..."
               value={formData.description}
               onChange={(e) => setFormData({...formData, description: e.target.value})}
             />
          </div>

          <div className="flex gap-4">
             <button type="submit" disabled={loading} className="btn-primary flex-1 py-3">
                {loading ? 'Menyimpan...' : 'Simpan Transaksi'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AddTransactionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
       <TransactionForm />
    </Suspense>
  );
}