import { 
  FaMoneyBillWave, FaChartLine, FaGift, FaLaptopCode, 
  FaShoppingCart, FaUtensils, FaCar, FaFilm, 
  FaHeartbeat, FaGraduationCap, FaFileInvoice, FaEllipsisH,
  FaHome, FaPlane, FaGamepad, FaBaby, FaPaw, FaTshirt,
  FaCoffee, FaDumbbell, FaBook, FaMusic
} from 'react-icons/fa';

// 1. Peta Ikon (String Name -> React Component)
// Ini dipakai untuk merender ikon dari data LocalStorage
export const ICON_MAP = {
  'money': <FaMoneyBillWave />,
  'chart': <FaChartLine />,
  'gift': <FaGift />,
  'laptop': <FaLaptopCode />,
  'cart': <FaShoppingCart />,
  'food': <FaUtensils />,
  'car': <FaCar />,
  'film': <FaFilm />,
  'health': <FaHeartbeat />,
  'school': <FaGraduationCap />,
  'invoice': <FaFileInvoice />,
  'dots': <FaEllipsisH />,
  'home': <FaHome />,
  'plane': <FaPlane />,
  'game': <FaGamepad />,
  'baby': <FaBaby />,
  'pet': <FaPaw />,
  'shirt': <FaTshirt />,
  'coffee': <FaCoffee />,
  'gym': <FaDumbbell />,
  'book': <FaBook />,
  'music': <FaMusic />
};

// 2. Daftar untuk Pilihan di Form (Array)
export const AVAILABLE_ICONS = Object.keys(ICON_MAP);

// 3. Helper untuk mendapatkan komponen ikon berdasarkan nama
export const getIconComponent = (iconName) => {
  return ICON_MAP[iconName] || <FaEllipsisH />;
};