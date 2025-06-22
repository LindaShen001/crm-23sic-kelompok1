// Improved and Professional Admin Page to Manage Keluhan
import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";

const KeluhanDashboard = () => {
  const [keluhanList, setKeluhanList] = useState([]);
  const [selectedKeluhan, setSelectedKeluhan] = useState(null);

  const fetchKeluhan = async () => {
    const { data, error } = await supabase
      .from("keluhan")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setKeluhanList(data);
    } else {
      console.error("Gagal mengambil data keluhan:", error.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      const { error } = await supabase.from("keluhan").delete().eq("id", id);
      if (!error) {
        setKeluhanList(keluhanList.filter((k) => k.id !== id));
      }
    }
  };

  const handleShowDetail = (keluhan) => {
    setSelectedKeluhan(keluhan);
  };

  useEffect(() => {
    fetchKeluhan();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-10">
        Manajemen Keluhan Pelanggan
      </h1>

      <div className="overflow-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Nama</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Telepon</th>
              <th className="px-6 py-3 text-left">Subjek</th>
              <th className="px-6 py-3 text-left">Tanggal</th>
              <th className="px-6 py-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {keluhanList.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{item.nama}</td>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.telepon}</td>
                <td className="px-6 py-4">{item.subjek}</td>
                <td className="px-6 py-4">{new Date(item.created_at).toLocaleString()}</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => handleShowDetail(item)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {keluhanList.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  Tidak ada data keluhan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedKeluhan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedKeluhan(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold text-purple-700 mb-4">Detail Keluhan</h2>
            <p><strong>Nama:</strong> {selectedKeluhan.nama}</p>
            <p><strong>Email:</strong> {selectedKeluhan.email}</p>
            <p><strong>Telepon:</strong> {selectedKeluhan.telepon}</p>
            <p><strong>Subjek:</strong> {selectedKeluhan.subjek}</p>
            <p className="mt-3"><strong>Pesan:</strong></p>
            <p className="text-gray-700 mt-1 whitespace-pre-wrap">{selectedKeluhan.pesan}</p>
            <p className="mt-4 text-sm text-gray-500">
              <strong>Tanggal:</strong> {new Date(selectedKeluhan.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default KeluhanDashboard;
