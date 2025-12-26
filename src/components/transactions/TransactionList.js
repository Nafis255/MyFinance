import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

export default function TransactionList({ transactions, limit }) {
  // Jika ada limit, potong array-nya
  const displayData = limit ? transactions.slice(0, limit) : transactions;

  if (displayData.length === 0) {
    return (
        <div className="text-center py-10 text-gray">
            <p>Belum ada transaksi.</p>
        </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-border text-gray text-sm uppercase">
            <th className="py-3 font-semibold">Tanggal</th>
            <th className="py-3 font-semibold">Kategori</th>
            <th className="py-3 font-semibold">Deskripsi</th>
            <th className="py-3 font-semibold text-right">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          {displayData.map((trx) => (
            <tr key={trx.id} className="border-b border-border last:border-0 hover:bg-light transition-colors group">
              <td className="py-4 text-sm whitespace-nowrap">
                {formatDate(trx.date)}
              </td>
              <td className="py-4 text-sm">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    {trx.category}
                </span>
              </td>
              <td className="py-4 text-sm text-gray truncate max-w-[150px] sm:max-w-none">
                {trx.description}
              </td>
              <td className={`py-4 text-sm font-bold text-right ${trx.type === 'income' ? 'text-secondary' : 'text-danger'}`}>
                <div className="flex items-center justify-end gap-1">
                    {trx.type === 'income' ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
                    {formatCurrency(trx.amount)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}