'use client';

import { useState, useEffect } from 'react';

export function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({
    income: 0,
    expense: 0,
    balance: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ambil data dari localStorage
    const localData = localStorage.getItem('transactions');
    
    let parsedData = [];

    if (localData) {
      parsedData = JSON.parse(localData);
    } else {
      // Data Dummy
      parsedData = [
        {
            id: 1,
            type: 'income',
            amount: 5000000,
            category: 'Gaji',
            description: 'Gaji bulan Maret',
            date: '2024-03-15',
        },
        {
            id: 2,
            type: 'expense',
            amount: 1500000,
            category: 'Belanja',
            description: 'Belanja bulanan',
            date: '2024-03-14',
        },
        {
            id: 3,
            type: 'expense',
            amount: 500000,
            category: 'Makanan',
            description: 'Makan di restoran',
            date: '2024-03-12',
        },
        {
            id: 4,
            type: 'expense',
            amount: 300000,
            category: 'Transportasi',
            description: 'Bensin mobil',
            date: '2024-03-10',
        },
        {
            id: 5,
            type: 'income',
            amount: 1000000,
            category: 'Freelance',
            description: 'Project website',
            date: '2024-03-05',
        }
      ];
      // Simpan data dummy agar persisten
      localStorage.setItem('transactions', JSON.stringify(parsedData));
    }

    setTransactions(parsedData);
    calculateStats(parsedData);
    setLoading(false);
  }, []);

  // Fungsi hitung total
  const calculateStats = (data) => {
    let income = 0;
    let expense = 0;

    data.forEach(trx => {
      // Pastikan amount dibaca sebagai angka
      const amount = parseFloat(trx.amount);
      if (trx.type === 'income') {
        income += amount;
      } else {
        expense += amount;
      }
    });

    setStats({
      income,
      expense,
      balance: income - expense
    });
  };

  // Fungsi delete 
  const deleteTransaction = (id) => {
    const newData = transactions.filter(t => t.id !== id);
    setTransactions(newData);
    calculateStats(newData);
    localStorage.setItem('transactions', JSON.stringify(newData));
  };

  return { transactions, stats, loading, deleteTransaction };
}