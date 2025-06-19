import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Lock, DatabaseBackup, UserCheck, ServerCog } from "lucide-react";

export default function KeamananPrivasi() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
        <div className="text-2xl font-bold text-purple-700">Apotek ASEAN</div>
        <nav className="flex space-x-8 text-sm font-semibold text-gray-700 relative items-center">
          <Link to="/" className="hover:text-purple-600 transition">Home</Link>
          <Link to="/profile" className="hover:text-purple-600 transition">Profil</Link>
          <Link to="/shop" className="hover:text-purple-600 transition">Produk</Link>
          <Link to="/customer/faq" className="hover:text-purple-600 transition">FAQ</Link>

          {/* Dropdown: Layanan */}
          <div className="relative group">
            <button className="hover:text-purple-600 transition focus:outline-none">
              Layanan
            </button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg mt-0 rounded-md z-10 min-w-[180px] py-1 top-full left-0">
              <Link
                to="/layanan/keamanan"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition duration-200"
              >
                Keamanan & Privasi
              </Link>
              <Link
                to="/layanan/konsultasi"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition duration-200"
              >
                Cek Kesehatan
              </Link>
            </div>
          </div>

          <Link to="/kontak" className="hover:text-purple-600 transition">Hubungi Kami</Link>

          <button
            onClick={() => navigate("/login")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md transition-colors duration-200"
          >
            Login Admin
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <div className="pt-[80px] p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6 border-b pb-2 flex items-center gap-2">
          <ShieldCheck className="w-7 h-7" />
          Keamanan & Privasi Data Pasien
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
          {/* Autentikasi Admin */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-blue-600" />
              Autentikasi & Hak Akses
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Setiap admin harus login menggunakan akun yang diverifikasi. Akses ke data sensitif dibatasi berdasarkan peran dan otorisasi.
            </p>
          </section>

          {/* Enkripsi dan Perlindungan */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Lock className="w-5 h-5 text-purple-600" />
              Enkripsi & Perlindungan Data
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Seluruh data dienkripsi saat disimpan di database.</li>
              <li>Transmisi data menggunakan HTTPS dan protokol aman lainnya.</li>
              <li>Tidak ada pihak ketiga yang bisa mengakses tanpa persetujuan.</li>
            </ul>
          </section>

          {/* Backup dan Audit */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <DatabaseBackup className="w-5 h-5 text-orange-500" />
              Backup & Audit Keamanan
            </h2>
            <p className="text-gray-700">
              Sistem melakukan backup otomatis setiap hari. Log aktivitas pengguna disimpan untuk audit dan pemantauan.
            </p>
          </section>

          {/* Hak Pasien */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <ServerCog className="w-5 h-5 text-gray-700" />
              Hak Pengelolaan Data oleh Pasien
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Pasien dapat meminta salinan, perubahan, atau penghapusan data mereka.</li>
              <li>Permintaan akan diproses oleh admin dalam waktu 1x24 jam.</li>
            </ul>
          </section>

          <div className="text-sm text-gray-500 border-t pt-4">
            Proses ini mengikuti standar BPMN keamanan data digital untuk sistem informasi apotik.
          </div>
        </div>
      </div>
    </div>
  );
}