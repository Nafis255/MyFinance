'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransactions } from '@/hooks/useTransactions';
import { CATEGORIES } from '@/utils/constants';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import { 
  FaSearch, FaPlus, FaFilter, FaEdit, FaTrash, 
  FaChevronLeft, FaChevronRight, FaArrowUp, FaArrowDown 
} from 'react-icons/fa';

export default function TransactionsPage() {
  const router = useRouter();
  const { transactions, deleteTransaction, loading } = useTransactions();
  
  // State untuk Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  
  // State untuk Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Logika Filter Data (Menggunakan useMemo agar efisien)
  const filteredData = useMemo(() => {
    return transactions.filter(trx => {
      // 1. Filter Pencarian (Deskripsi)
      const matchesSearch = trx.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // 2. Filter Tipe
      const matchesType = filterType === 'all' || trx.type === filterType;
      
      // 3. Filter Kategori
      const matchesCategory = filterCategory === 'all' || trx.category === filterCategory;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [transactions, searchTerm, filterType, filterCategory]);

  // Logika Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle Delete
  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
      deleteTransaction(id);
    }
  };

  if (loading) return null;

  return (
    <div className="container-custom animate-[fadeIn_0.5s_ease-out]">
      
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-dark">Daftar Transaksi</h2>
          <p className="text-gray text-sm">Kelola semua pemasukan dan pengeluaran Anda</p>
        </div>
        <div className="flex gap-2">
          <Link href="/transactions/add" className="btn-primary">
            <FaPlus /> <span className="hidden sm:inline">Tambah Baru</span>
          </Link>
          <button className="btn-outline" onClick={() => alert('Fitur Export segera hadir!')}>
            Export CSV
          </button>
        </div>
      </div>

      {/* Bagian Filter */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          
          {/* Search Bar */}
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Cari deskripsi transaksi..." 
              className="form-control pl-10"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset ke halaman 1 saat mencari
              }}
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray" />
          </div>

          {/* Filter Tipe */}
          <select 
            className="form-control md:w-40 cursor-pointer"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">Semua Tipe</option>
            <option value="income">Pemasukan</option>
            <option value="expense">Pengeluaran</option>
          </select>

          {/* Filter Kategori */}
          <select 
            className="form-control md:w-48 cursor-pointer"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">Semua Kategori</option>
            {Object.keys(CATEGORIES).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabel Data */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-light border-b border-border">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray uppercase">Tanggal</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray uppercase">Kategori</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray uppercase">Deskripsi</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray uppercase text-right">Jumlah</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray uppercase text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedData.length > 0 ? (
                paginatedData.map((trx) => (
                  <tr key={trx.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      {formatDate(trx.date)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-white border border-border text-gray-700">
                        {/* Render icon jika ada di konstanta */}
                        <span style={{ color: CATEGORIES[trx.category]?.color || '#6b7280' }}>
                           {CATEGORIES[trx.category]?.icon || '•'}
                        </span>
                        {trx.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray max-w-[200px] truncate">
                      {trx.description}
                    </td>
                    <td className={`px-6 py-4 text-sm font-bold text-right whitespace-nowrap ${trx.type === 'income' ? 'text-secondary' : 'text-danger'}`}>
                      <div className="flex items-center justify-end gap-1">
                        {trx.type === 'income' ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
                        {formatCurrency(trx.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => router.push(`/transactions/add?edit=${trx.id}`)}
                          className="p-2 text-primary hover:bg-blue-50 rounded transition-colors"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleDelete(trx.id)}
                          className="p-2 text-danger hover:bg-red-50 rounded transition-colors"
                          title="Hapus"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray">
                    <div className="flex flex-col items-center gap-2">
                        <FaFilter className="text-4xl opacity-20" />
                        <p>Tidak ada transaksi yang ditemukan.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-border flex justify-between items-center bg-light">
                <span className="text-sm text-gray">
                    Halaman {currentPage} dari {totalPages}
                </span>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border border-border rounded bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        <FaChevronLeft />
                    </button>
                    <button 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border border-border rounded bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}