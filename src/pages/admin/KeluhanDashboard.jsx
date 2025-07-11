// Improved and Professional Admin Page to Manage Keluhan
import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";

const KeluhanDashboard = () => {
  const [keluhanList, setKeluhanList] = useState([]);
  const [selectedKeluhan, setSelectedKeluhan] = useState(null);

  // Fungsi untuk mengambil data keluhan dari Supabase
  const fetchKeluhan = async () => {
    const { data, error } = await supabase
      .from("keluhan")
      .select("*")
      .order("created_at", { ascending: false }); // Urutkan dari yang terbaru

    if (!error) {
      setKeluhanList(data);
    } else {
      console.error("Gagal mengambil data keluhan:", error.message);
      // Anda bisa menampilkan pesan error kepada pengguna di sini jika perlu
    }
  };

  // Fungsi untuk menghapus keluhan
  const handleDelete = async (id) => {
    // Konfirmasi penghapusan kepada pengguna
    if (confirm("Yakin ingin menghapus data keluhan ini secara permanen?")) {
      const { error } = await supabase.from("keluhan").delete().eq("id", id);
      if (!error) {
        // Hapus item dari state jika penghapusan berhasil
        setKeluhanList(keluhanList.filter((k) => k.id !== id));
      } else {
        console.error("Gagal menghapus keluhan:", error.message);
        // Tampilkan pesan error jika penghapusan gagal
      }
    }
  };

  // Fungsi untuk menampilkan detail keluhan dalam modal
  const handleShowDetail = (keluhan) => {
    setSelectedKeluhan(keluhan);
  };

  // Efek samping untuk memuat data keluhan saat komponen pertama kali di-render
  useEffect(() => {
    fetchKeluhan();
  }, []);

  return (
        <div className="p-6 pt-[64px] lg:pl-[256px]">
      <h1 className="text-2xl font-bold mb-4">Manajemen Keluhan Pelanggan</h1>

      {/* Tabel daftar keluhan */}
      <div className="overflow-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Nama</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Telepon</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Subjek</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Tanggal</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {keluhanList.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500 text-base">
                  Tidak ada data keluhan yang tersedia.
                </td>
              </tr>
            ) : (
              keluhanList.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{item.nama}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{item.telepon}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{item.subjek}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {new Date(item.created_at).toLocaleString("id-ID", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button
                      onClick={() => handleShowDetail(item)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition duration-200"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition duration-200"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Detail Keluhan */}
      {selectedKeluhan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative shadow-xl">
            {/* Tombol tutup modal */}
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold"
              onClick={() => setSelectedKeluhan(null)}
            >
              &times; {/* Menggunakan karakter silang yang lebih umum */}
            </button>
            <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b pb-2">Detail Keluhan</h2>
            <div className="space-y-2 text-gray-800">
              <p><strong>Nama:</strong> {selectedKeluhan.nama}</p>
              <p><strong>Email:</strong> {selectedKeluhan.email}</p>
              <p><strong>Telepon:</strong> {selectedKeluhan.telepon}</p>
              <p><strong>Subjek:</strong> {selectedKeluhan.subjek}</p>
              <div className="mt-3">
                <p className="font-bold mb-1">Pesan:</p>
                <p className="text-gray-700 bg-gray-100 p-3 rounded-md border border-gray-200 whitespace-pre-wrap">
                  {selectedKeluhan.pesan}
                </p>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                <strong>Tanggal Keluhan:</strong>{" "}
                {new Date(selectedKeluhan.created_at).toLocaleString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KeluhanDashboard;