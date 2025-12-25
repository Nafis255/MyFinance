'use client'; 

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Membuat Context
const AuthContext = createContext();

// Membuat Provider 
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load user dari localStorage saat aplikasi pertama kali dibuka
  useEffect(() => {
    const initAuth = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      const savedUserData = localStorage.getItem('userData');
      
      if (isLoggedIn === 'true' && savedUserData) {
        setUser(JSON.parse(savedUserData));
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Fungsi Login (Mock)
  const login = async (email, password, remember = false) => {
    // Simulasi delay network seperti di auth.js lama
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Validasi sederhana (Demo)
    if (password.length >= 6) {
      // Ambil data user yang tersimpan (jika ada) atau buat dummy
      let userData = JSON.parse(localStorage.getItem('userData') || 'null');
      
      // Jika user belum ada di localstorage, buat object dummy agar tidak error
      if (!userData || userData.email !== email) {
        userData = {
            name: "Demo User",
            email: email,
            joinDate: new Date().toISOString(),
            balance: 5250000,
            currency: "IDR"
        };
      }

      // Simpan session
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      if (remember) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }
      
      // Update data user jika perlu (opsional)
      localStorage.setItem('userData', JSON.stringify(userData));

      // Update State React
      setUser(userData);
      
      // Redirect ke dashboard
      router.push('/dashboard');
      return { success: true };
    } 
    
    return { success: false, error: 'Email atau password salah' };
  };

  // Fungsi Register (Mock)
  const register = async (name, email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Cek duplikasi (Simulasi)
    const existingData = localStorage.getItem('userData');
    if (existingData) {
        const parsed = JSON.parse(existingData);
        if (parsed.email === email) {
            return { success: false, error: 'Email sudah terdaftar' };
        }
    }

    // Buat object user baru 
    const newUser = {
      id: Date.now(),
      name: name,
      email: email,
      joinDate: new Date().toISOString(),
      balance: 0,
      currency: 'IDR',
      settings: {
        darkMode: false,
        emailNotifications: true,
        showBalance: true,
        dateFormat: 'DD/MM/YYYY',
        numberFormat: '1.234,56'
      }
    };

    // Simpan ke localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userData', JSON.stringify(newUser));

    // Update State & Redirect
    setUser(newUser);
    router.push('/dashboard');
    return { success: true };
  };

  // Fungsi Logout
  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('rememberMe');
    
    setUser(null);
    router.push('/login'); // Redirect ke login
  };

  // Nilai yang akan disebar ke seluruh aplikasi
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom Hook agar mudah dipanggil
export function useAuth() {
  return useContext(AuthContext);
}