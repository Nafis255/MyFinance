import { formatCurrency } from '@/utils/formatCurrency';
import { FaWallet, FaArrowDown, FaArrowUp } from 'react-icons/fa';

export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        
      {/* Saldo Card */}
      <div className="card bg-white border-l-4 border-primary">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h4 className="text-gray text-sm font-semibold uppercase tracking-wider">Saldo Total</h4>
                <div className="text-2xl font-bold text-dark mt-1">
                    {formatCurrency(stats.balance)}
                </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-full text-primary">
                <FaWallet className="text-xl" />
            </div>
        </div>
        <div className="text-xs text-gray">
            Update Real-time
        </div>
      </div>

      {/* Pemasukan Card */}
      <div className="card bg-white border-l-4 border-secondary">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h4 className="text-gray text-sm font-semibold uppercase tracking-wider">Pemasukan</h4>
                <div className="text-2xl font-bold text-secondary mt-1">
                    {formatCurrency(stats.income)}
                </div>
            </div>
            <div className="p-3 bg-green-50 rounded-full text-secondary">
                <FaArrowUp className="text-xl" />
            </div>
        </div>
        <div className="text-xs text-gray">
            Total semua pemasukan
        </div>
      </div>

      {/* Pengeluaran Card */}
      <div className="card bg-white border-l-4 border-danger">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h4 className="text-gray text-sm font-semibold uppercase tracking-wider">Pengeluaran</h4>
                <div className="text-2xl font-bold text-danger mt-1">
                    {formatCurrency(stats.expense)}
                </div>
            </div>
            <div className="p-3 bg-red-50 rounded-full text-danger">
                <FaArrowDown className="text-xl" />
            </div>
        </div>
        <div className="text-xs text-gray">
            Total semua pengeluaran
        </div>
      </div>

    </div>
  );
}