'use client';

import { useState, useEffect } from 'react';
import { CATEGORIES as DEFAULT_CATEGORIES } from '@/utils/constants'; 
import { getIconComponent } from '@/utils/categoryIcons';

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data saat pertama kali mount
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    // Ambil kategori default (ubah format Object ke Array)
    const defaults = Object.entries(DEFAULT_CATEGORIES).map(([name, data]) => ({
      id: `default-${name}`,
      name: name,
      ...data, // color, type, icon (component)
      isCustom: false
    }));

    // Ambil kategori custom dari LocalStorage
    const stored = JSON.parse(localStorage.getItem('customCategories') || '[]');
    
    // Konversi nama ikon string (misal 'home') menjadi komponen React (<FaHome />)
    const customs = stored.map(cat => ({
      ...cat,
      icon: getIconComponent(cat.iconName), // Hydrate icon
      isCustom: true
    }));

    // Gabungkan
    setCategories([...defaults, ...customs]);
    setLoading(false);
  };

  const addCategory = (newCat) => {
    const stored = JSON.parse(localStorage.getItem('customCategories') || '[]');
    
    // Tambah data baru
    const categoryToSave = {
      id: Date.now().toString(),
      name: newCat.name,
      type: newCat.type,
      color: newCat.color,
      iconName: newCat.iconName // Simpan string-nya saja
    };

    const updated = [...stored, categoryToSave];
    localStorage.setItem('customCategories', JSON.stringify(updated));
    
    // Reload state
    loadCategories();
    return { success: true };
  };

  const deleteCategory = (id) => {
    const stored = JSON.parse(localStorage.getItem('customCategories') || '[]');
    const updated = stored.filter(cat => cat.id !== id);
    
    localStorage.setItem('customCategories', JSON.stringify(updated));
    loadCategories();
  };

  return { categories, loading, addCategory, deleteCategory };
}