'use client';

import { useState } from 'react';
import { useCategories } from '@/hooks/useCategories';
import { ICON_MAP, AVAILABLE_ICONS } from '@/utils/categoryIcons';
import { FaPlus, FaTrash, FaTimes, FaCheck } from 'react-icons/fa';

export default function CategoriesPage() {
  const { categories, addCategory, deleteCategory } = useCategories();
  
  // State untuk Modal & Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'expense',
    color: '#3b82f6',
    iconName: 'cart'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return alert('Nama kategori wajib diisi');

    addCategory(formData);
    setIsModalOpen(false);
    setFormData({ name: '', type: 'expense', color: '#3b82f6', iconName: 'cart' }); // Reset form
  };

  // Helper untuk konfirmasi hapus
  const handleDelete = (cat) => {
    if (!cat.isCustom) {
      alert('Kategori bawaan sistem tidak dapat dihapus.');
      return;
    }
    if (confirm(`Hapus kategori "${cat.name}"?`)) {
      deleteCategory(cat.id);
    }
  };

  return (
    <div className="container-custom animate-[fadeIn_0.5s_ease-out]">
       
       {/* Header */}
       <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-dark">Kategori</h2>
          <p className="text-gray text-sm">Kelola kategori transaksi Anda</p>
        </div>
        <button 
            className="btn-primary" 
            onClick={() => setIsModalOpen(true)}
        >
           <FaPlus /> Tambah Kategori
        </button>
      </div>

      {/* Grid Kategori */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {categories.map((cat) => (
            <div key={cat.id || cat.name} className="card flex items-center justify-between hover:shadow-md transition-shadow relative group">
                <div className="flex items-center gap-4">
                    <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-xl text-white shadow-sm"
                        style={{ backgroundColor: cat.color }}
                    >
                        {cat.icon}
                    </div>
                    <div>
                        <h4 className="font-bold text-dark">{cat.name}</h4>
                        <div className="flex gap-2">
                           <span className={`text-xs px-2 py-0.5 rounded-full ${cat.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {cat.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                           </span>
                           {cat.isCustom && (
                             <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">Custom</span>
                           )}
                        </div>
                    </div>
                </div>
                
                {/* Tombol Delete (Hanya muncul jika isCustom = true) */}
                <button 
                    className={`p-2 transition-colors ${cat.isCustom ? 'text-gray hover:text-danger cursor-pointer' : 'text-gray-300 cursor-not-allowed'}`}
                    onClick={() => handleDelete(cat)}
                    title={cat.isCustom ? "Hapus" : "Bawaan sistem"}
                >
                    <FaTrash />
                </button>
            </div>
         ))}
      </div>

      {/* MODAL TAMBAH KATEGORI */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-border flex justify-between items-center">
               <h3 className="font-bold text-lg">Tambah Kategori Baru</h3>
               <button onClick={() => setIsModalOpen(false)} className="text-gray hover:text-dark"><FaTimes /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5">
               {/* Nama & Tipe */}
               <div className="mb-4">
                  <label className="form-label">Nama Kategori</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Contoh: Cicilan Motor" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    autoFocus
                  />
               </div>

               <div className="mb-4">
                  <label className="form-label">Tipe</label>
                  <div className="flex gap-4">
                     <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="type" 
                          value="expense" 
                          checked={formData.type === 'expense'}
                          onChange={() => setFormData({...formData, type: 'expense'})}
                          className="accent-danger"
                        />
                        <span>Pengeluaran</span>
                     </label>
                     <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="type" 
                          value="income" 
                          checked={formData.type === 'income'}
                          onChange={() => setFormData({...formData, type: 'income'})}
                          className="accent-secondary"
                        />
                        <span>Pemasukan</span>
                     </label>
                  </div>
               </div>

               {/* Warna */}
               <div className="mb-4">
                  <label className="form-label">Warna Label</label>
                  <div className="flex items-center gap-3">
                     <input 
                       type="color" 
                       className="w-10 h-10 rounded cursor-pointer border-none p-0"
                       value={formData.color}
                       onChange={e => setFormData({...formData, color: e.target.value})}
                     />
                     <span className="text-sm text-gray">{formData.color}</span>
                  </div>
               </div>

               {/* Pilih Ikon */}
               <div className="mb-6">
                  <label className="form-label">Pilih Ikon</label>
                  <div className="grid grid-cols-6 gap-2 h-32 overflow-y-auto p-2 border border-border rounded">
                     {AVAILABLE_ICONS.map(iconKey => (
                        <div 
                          key={iconKey}
                          onClick={() => setFormData({...formData, iconName: iconKey})}
                          className={`flex items-center justify-center p-2 rounded cursor-pointer transition-all aspect-square text-lg
                             ${formData.iconName === iconKey 
                               ? 'bg-primary text-white shadow-md scale-110' 
                               : 'bg-light text-gray hover:bg-gray-200'}`}
                        >
                           {ICON_MAP[iconKey]}
                        </div>
                     ))}
                  </div>
               </div>

               <div className="flex gap-3">
                  <button type="submit" className="btn-primary w-full">Simpan</button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline w-full">Batal</button>
               </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}