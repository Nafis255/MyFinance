import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-light text-center p-5">
      <div className="text-9xl font-bold text-primary opacity-20">404</div>
      <h1 className="text-3xl font-bold text-dark -mt-10 mb-4">Halaman Tidak Ditemukan</h1>
      <p className="text-gray mb-8 max-w-md">
        Maaf, halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau tidak pernah ada.
      </p>
      <Link href="/" className="btn-primary">
        Kembali ke Beranda
      </Link>
    </div>
  );
}