import React from "react";
import { ShieldCheck, Lock, DatabaseBackup, UserCheck, ServerCog } from "lucide-react";

export default function KeamananPrivasi() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
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
  );
}
