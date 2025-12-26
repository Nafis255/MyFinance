'use client';

import { useState, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTransactions } from '@/hooks/useTransactions';
import StatsCards from '@/components/dashboard/StatsCards';
import TransactionList from '@/components/transactions/TransactionList';
import Link from 'next/link';
import { FaPlus, FaMinus, FaList, FaChartPie, FaCalendarAlt } from 'react-icons/fa';

export default function DashboardPage() {
  const { user } = useAuth();
  const { transactions, loading } = useTransactions();

  // Setup State Filter
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const years = [2023, 2024, 2025];

  // Logic Kalkulasi Data
  const dashboardData = useMemo(() => {
    // Hitung Saldo Total (LIFETIME / KESELURUHAN)
    // Kita loop semua data transaksi tanpa filter tanggal
    let totalBalance = 0;
    transactions.forEach(trx => {
      const amount = parseFloat(trx.amount);
      if (trx.type === 'income') {
        totalBalance += amount;
      } else {
        totalBalance -= amount;
      }
    });

    // Filter Transaksi berdasarkan Bulan & Tahun yang dipilih
    const filteredTransactions = transactions.filter(trx => {
      const trxDate = new Date(trx.date);
      return (
        trxDate.getMonth() === parseInt(selectedMonth) &&
        trxDate.getFullYear() === parseInt(selectedYear)
      );
    });

    // Hitung Pemasukan & Pengeluaran (BULANAN)
    // Hanya loop data yang sudah difilter 
    let monthlyIncome = 0;
    let monthlyExpense = 0;

    filteredTransactions.forEach(trx => {
      const amount = parseFloat(trx.amount);
      if (trx.type === 'income') {
        monthlyIncome += amount;
      } else {
        monthlyExpense += amount;
      }
    });

    return {
      transactions: filteredTransactions, // Untuk Tabel (Data Bulan Ini)
      stats: {
        income: monthlyIncome,     // Pemasukan (Bulan Ini)
        expense: monthlyExpense,   // Pengeluaran (Bulan Ini)
        balance: totalBalance      // Saldo (Total Keseluruhan)
      }
    };
  }, [transactions, selectedMonth, selectedYear]);

  if (loading) {
    return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );
  }

  return (
    <div className="container-custom animate-[fadeIn_0.5s_ease-out]">
        
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-border pb-5 gap-4">
            <div>
                <h2 className="text-2xl font-bold text-dark">Dashboard Keuangan</h2>
                <p className="text-gray text-sm mt-1">Ringkasan keuangan Anda.</p>
            </div>
            
            <div className="flex items-center gap-2 bg-white p-2 rounded-[var(--radius)] shadow-sm border border-border">
                <FaCalendarAlt className="text-primary ml-2" />
                <select 
                    value={selectedMonth} 
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="bg-transparent border-none focus:ring-0 text-sm font-semibold text-dark cursor-pointer outline-none"
                >
                    {months.map((m, index) => (
                        <option key={index} value={index}>{m}</option>
                    ))}
                </select>
                <span className="text-gray-300">|</span>
                <select 
                    value={selectedYear} 
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="bg-transparent border-none focus:ring-0 text-sm font-semibold text-dark cursor-pointer outline-none"
                >
                    {years.map((y) => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
            </div>
        </div>

        {/* 1. Komponen Statistik */}
        <StatsCards stats={dashboardData.stats} />

        {/* 2. Quick Actions */}
        <div className="bg-white rounded-[var(--radius)] shadow-sm p-6 mb-8 border border-border">
            <h3 className="text-lg font-bold mb-4">Aksi Cepat</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/transactions/add?type=income" className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group cursor-pointer border border-blue-100">
                    <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <FaPlus className="text-primary" />
                    </div>
                    <span className="text-sm font-semibold text-dark">Pemasukan</span>
                </Link>
                
                <Link href="/transactions/add?type=expense" className="flex flex-col items-center justify-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors group cursor-pointer border border-red-100">
                    <div className="w-10 h-10 rounded-full bg-red-200 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <FaMinus className="text-danger" />
                    </div>
                    <span className="text-sm font-semibold text-dark">Pengeluaran</span>
                </Link>

                <Link href="/transactions" className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group cursor-pointer border border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <FaList className="text-gray-600" />
                    </div>
                    <span className="text-sm font-semibold text-dark">Semua Transaksi</span>
                </Link>

                <Link href="/reports" className="flex flex-col items-center justify-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors group cursor-pointer border border-yellow-100">
                    <div className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <FaChartPie className="text-warning" />
                    </div>
                    <span className="text-sm font-semibold text-dark">Laporan</span>
                </Link>
            </div>
        </div>

        {/* 3. Tabel Transaksi Terakhir */}
        <div className="card">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">
                    Transaksi Bulan {months[selectedMonth]} {selectedYear}
                </h3>
                <Link href="/transactions" className="text-sm text-primary font-medium hover:underline">
                    Lihat Semua &rarr;
                </Link>
            </div>
            <TransactionList 
                transactions={dashboardData.transactions} 
                limit={5} 
            />
        </div>
    </div>
  );
}