import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { FiTrash2 } from "react-icons/fi";

export default function AlamatPengirimanTable() {
  const [dataAlamat, setDataAlamat] = useState([]);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchDataAlamat();
  }, []);

  const fetchDataAlamat = async () => {
    const { data, error } = await supabase
      .from("alamat_pengiriman")
      .select("id, nama, alamat1, kota, provinsi, kodepos, transaksi_id");

    if (error) {
      setError("Gagal memuat data alamat pengiriman.");
    } else {
      setDataAlamat(data);
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from("alamat_pengiriman")
      .delete()
      .eq("id", id);

    if (error) {
      setError("Gagal menghapus alamat.");
    } else {
      setNotification("Alamat berhasil dihapus.");
      fetchDataAlamat();
      setTimeout(() => setNotification(""), 4000);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">
        📦 Data Alamat Pengiriman
      </h2>

      {notification && (
        <div className="mb-4 text-green-600 text-sm text-center bg-green-50 py-2 rounded">
          {notification}
        </div>
      )}

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full table-auto">
          <thead className="bg-blue-100">
            <tr>
              {[
                "No",
                "Nama Penerima",
                "Alamat",
                "Kota",
                "Provinsi",
                "Kode Pos",
                "ID Transaksi",
                "Aksi",
              ].map((head, i) => (
                <th
                  key={i}
                  className="px-4 py-2 text-left text-sm font-semibold text-blue-800"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dataAlamat.length > 0 ? (
              dataAlamat.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-600">{index + 1}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.nama}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.alamat1}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.kota}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.provinsi}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.kodepos}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{item.transaksi_id}</td>
                  <td className="px-4 py-2 text-sm">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Hapus"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="text-center text-sm text-gray-500 py-6"
                >
                  Tidak ada data alamat pengiriman.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
