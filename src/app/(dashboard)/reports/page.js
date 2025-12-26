'use client';

import { useMemo } from 'react';
import { useTransactions } from '@/hooks/useTransactions';
import { CATEGORIES } from '@/utils/constants';
import { formatCurrency } from '@/utils/formatCurrency';
import { Bar, Doughnut } from 'react-chartjs-2';
import '@/components/charts/ChartRegistry'; 
import { FaChartPie, FaChartBar, FaDownload } from 'react-icons/fa';

export default function ReportsPage() {
  const { transactions } = useTransactions();

  // Data untuk Grafik Donat (Pengeluaran per Kategori)
  const categoryData = useMemo(() => {
    // Filter hanya pengeluaran
    const expenses = transactions.filter(t => t.type === 'expense');
    
    // Kelompokkan total per kategori
    const grouped = {};
    expenses.forEach(t => {
      if (grouped[t.category]) {
        grouped[t.category] += t.amount;
      } else {
        grouped[t.category] = t.amount;
      }
    });

    const labels = Object.keys(grouped);
    const dataValues = Object.values(grouped);
    
    // Ambil warna dari constants
    const bgColors = labels.map(cat => CATEGORIES[cat]?.color || '#999');

    return {
      labels,
      datasets: [{
        data: dataValues,
        backgroundColor: bgColors,
        borderWidth: 1,
      }]
    };
  }, [transactions]);

  // Data untuk Grafik Bar (Pemasukan vs Pengeluaran Global)
  const incomeVsExpenseData = useMemo(() => {
    let income = 0;
    let expense = 0;
    
    transactions.forEach(t => {
      if(t.type === 'income') income += t.amount;
      else expense += t.amount;
    });

    return {
      labels: ['Pemasukan', 'Pengeluaran'],
      datasets: [{
        label: 'Total (Rp)',
        data: [income, expense],
        backgroundColor: ['#10B981', '#EF4444'],
        borderRadius: 8,
      }]
    };
  }, [transactions]);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
    }
  };

  return (
    <div className="container-custom animate-[fadeIn_0.5s_ease-out]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-dark">Laporan Keuangan</h2>
          <p className="text-gray text-sm">Visualisasi data keuangan Anda</p>
        </div>
        <button className="btn-outline text-sm" onClick={() => alert('Fitur Export PDF segera hadir!')}>
           <FaDownload /> Export
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Grafik 1: Pemasukan vs Pengeluaran */}
        <div className="card">
           <div className="flex items-center gap-2 mb-6 border-b border-border pb-2">
              <FaChartBar className="text-primary" />
              <h3 className="font-bold text-lg">Ringkasan Arus Kas</h3>
           </div>
           <div className="h-[300px] flex items-center justify-center">
              {transactions.length > 0 ? (
                 <Bar data={incomeVsExpenseData} options={options} />
              ) : (
                 <p className="text-gray">Belum ada data transaksi.</p>
              )}
           </div>
        </div>

        {/* Grafik 2: Kategori Pengeluaran */}
        <div className="card">
           <div className="flex items-center gap-2 mb-6 border-b border-border pb-2">
              <FaChartPie className="text-warning" />
              <h3 className="font-bold text-lg">Breakdown Pengeluaran</h3>
           </div>
           <div className="h-[300px] flex items-center justify-center relative">
              {transactions.filter(t => t.type === 'expense').length > 0 ? (
                 <Doughnut data={categoryData} options={options} />
              ) : (
                 <p className="text-gray">Belum ada pengeluaran.</p>
              )}
           </div>
        </div>

      </div>

      {/* Detail Text Breakdown */}
      <div className="card mt-8">
        <h3 className="font-bold text-lg mb-4">Detail Pengeluaran per Kategori</h3>
        <div className="space-y-4">
           {categoryData.labels && categoryData.labels.map((cat, idx) => (
             <div key={cat} className="flex items-center justify-between p-3 bg-light rounded hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                   <div 
                     className="w-3 h-3 rounded-full" 
                     style={{ backgroundColor: categoryData.datasets[0].backgroundColor[idx] }}
                   ></div>
                   <span className="font-medium">{cat}</span>
                </div>
                <span className="font-bold text-dark">
                   {formatCurrency(categoryData.datasets[0].data[idx])}
                </span>
             </div>
           ))}
           {(!categoryData.labels || categoryData.labels.length === 0) && (
              <p className="text-center text-gray py-4">Belum ada data.</p>
           )}
        </div>
      </div>
    </div>
  );
}