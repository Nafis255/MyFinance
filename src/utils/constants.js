import { 
  FaMoneyBillWave, FaChartLine, FaGift, FaLaptopCode, 
  FaShoppingCart, FaUtensils, FaCar, FaFilm, 
  FaHeartbeat, FaGraduationCap, FaFileInvoice, FaEllipsisH 
} from 'react-icons/fa';

export const CATEGORIES = {
  'Gaji': { icon: <FaMoneyBillWave />, color: '#10B981', type: 'income' },
  'Investasi': { icon: <FaChartLine />, color: '#8B5CF6', type: 'income' },
  'Hadiah': { icon: <FaGift />, color: '#EC4899', type: 'income' },
  'Freelance': { icon: <FaLaptopCode />, color: '#3B82F6', type: 'income' },
  'Belanja': { icon: <FaShoppingCart />, color: '#EF4444', type: 'expense' },
  'Makanan': { icon: <FaUtensils />, color: '#F59E0B', type: 'expense' },
  'Transportasi': { icon: <FaCar />, color: '#6366F1', type: 'expense' },
  'Hiburan': { icon: <FaFilm />, color: '#8B5CF6', type: 'expense' },
  'Kesehatan': { icon: <FaHeartbeat />, color: '#EC4899', type: 'expense' },
  'Pendidikan': { icon: <FaGraduationCap />, color: '#3B82F6', type: 'expense' },
  'Tagihan': { icon: <FaFileInvoice />, color: '#6B7280', type: 'expense' },
  'Lainnya': { icon: <FaEllipsisH />, color: '#6B7280', type: 'expense' }
};