'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { FaUserCircle, FaEdit, FaEnvelope, FaCalendarAlt, FaWallet } from 'react-icons/fa';
import { formatDate } from '@/utils/formatDate';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="container-custom animate-[fadeIn_0.5s_ease-out]">
       <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-[var(--radius)] shadow-md overflow-hidden">
             {/* Cover Background */}
             <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
             
             <div className="px-6 pb-6">
                <div className="flex justify-between items-end -mt-12 mb-6">
                   <div className="bg-white p-1 rounded-full">
                      <FaUserCircle className="text-8xl text-gray-300 bg-white rounded-full" />
                   </div>
                   <Link href="/settings" className="btn-outline text-sm mb-2">
                      <FaEdit /> Edit Profil
                   </Link>
                </div>

                <h1 className="text-2xl font-bold text-dark">{user?.name}</h1>
                <p className="text-gray mb-6">Member sejak {formatDate(user?.joinDate || new Date())}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="p-4 bg-gray-50 rounded-lg border border-border">
                      <div className="flex items-center gap-3 mb-2 text-gray">
                         <FaEnvelope /> Email
                      </div>
                      <div className="font-medium text-dark">{user?.email}</div>
                   </div>
                   
                   <div className="p-4 bg-gray-50 rounded-lg border border-border">
                      <div className="flex items-center gap-3 mb-2 text-gray">
                         <FaCalendarAlt /> Tanggal Bergabung
                      </div>
                      <div className="font-medium text-dark">{formatDate(user?.joinDate || new Date())}</div>
                   </div>

                   <div className="p-4 bg-gray-50 rounded-lg border border-border md:col-span-2">
                      <div className="flex items-center gap-3 mb-2 text-gray">
                         <FaWallet /> Status Akun
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="font-medium text-dark">Basic Member</span>
                         <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Aktif</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}