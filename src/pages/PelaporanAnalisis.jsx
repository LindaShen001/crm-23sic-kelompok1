import React from "react";
import { ClipboardList, UserCheck2, UserX2 } from "lucide-react";

const dummyReports = [
  { id: 1, title: "🧾 Laporan Pendaftaran Pasien Baru", date: "2025-06-01", total: 3 },
  { id: 2, title: "📊 Laporan Status Pasien", date: "2025-06-04", active: 2, inactive: 1 },
];

export default function PelaporanAnalisis() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-green-700 mb-6 border-b pb-2 flex items-center gap-2">
        <ClipboardList className="w-7 h-7" />
        Pelaporan & Analisis Pasien
      </h1>

      <div className="space-y-6">
        {dummyReports.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-400"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-1">{report.title}</h2>
            <p className="text-sm text-gray-500 mb-2">Tanggal: {report.date}</p>

            {report.total && (
              <p className="text-gray-700">
                👥 Total Pasien Baru: <span className="font-semibold">{report.total}</span>
              </p>
            )}

            {report.active !== undefined && (
              <div className="space-y-1">
                <p className="text-green-600 flex items-center gap-1">
                  <UserCheck2 className="w-4 h-4" /> Pasien Aktif: {report.active}
                </p>
                <p className="text-red-500 flex items-center gap-1">
                  <UserX2 className="w-4 h-4" /> Tidak Aktif: {report.inactive}
                </p>
              </div>
            )}
          </div>
        ))}

        <div className="text-sm text-gray-500 border-t pt-4">
          Laporan ini dihasilkan otomatis berdasarkan aktivitas pendaftaran & kunjungan pasien.
        </div>
      </div>
    </div>
  );
}
