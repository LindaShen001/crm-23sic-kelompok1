import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function RiwayatTransaksi() {
  const [transaksi, setTransaksi] = useState([]);
  const [form, setForm] = useState({
    nama_pelanggan: "",
    totalpesanan: "",
    metodepembayaran: "",
    promo: "",
    kategori: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRiwayat();
  }, []);

  const fetchRiwayat = async () => {
    const { data, error } = await supabase
      .from("transaksi")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal ambil data:", error.message);
      setError("❌ Gagal memuat data transaksi.");
    } else {
      setTransaksi(data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nama_pelanggan, totalpesanan, metodepembayaran, promo, kategori } = form;

    if (!nama_pelanggan || !totalpesanan || !metodepembayaran || !kategori) {
      setError("⚠️ Mohon isi semua field yang wajib.");
      return;
    }

    try {
      const newData = {
        nama_pelanggan,
        totalpesanan: Number(totalpesanan),
        metodepembayaran,
        promo,
        kategori,
      };

      let response;
      if (editingId) {
        response = await supabase
          .from("transaksi")
          .update(newData)
          .eq("id", editingId)
          .select();
        if (response.error) throw response.error;
        setNotification("✅ Transaksi berhasil diperbarui.");
      } else {
        response = await supabase.from("transaksi").insert([newData]).select();
        if (response.error) throw response.error;
        setNotification("✅ Transaksi berhasil ditambahkan.");
      }

      fetchRiwayat();
      setForm({
        nama_pelanggan: "",
        totalpesanan: "",
        metodepembayaran: "",
        promo: "",
        kategori: "",
      });
      setEditingId(null);
      setError("");
      setTimeout(() => setNotification(""), 3000);
    } catch (err) {
      console.error("Gagal simpan:", err.message);
      setError("❌ Gagal menyimpan data.");
    }
  };

  const handleEdit = (data) => {
    setForm({
      nama_pelanggan: data.nama_pelanggan || "",
      totalpesanan: data.totalpesanan || "",
      metodepembayaran: data.metodepembayaran || "",
      promo: data.promo || "",
      kategori: data.kategori || "",
    });
    setEditingId(data.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("transaksi").delete().eq("id", id);
    if (error) {
      setError("❌ Gagal menghapus transaksi.");
      return;
    }
    setNotification("🗑️ Transaksi berhasil dihapus.");
    setEditingId(null);
    fetchRiwayat();
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">📋 Riwayat Transaksi</h2>

      {notification && (
        <div className="mb-4 text-green-600 text-sm text-center bg-green-50 py-2 rounded shadow">
          {notification}
        </div>
      )}
      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-white p-4 rounded shadow"
      >
        <div>
          <label className="text-sm font-medium text-gray-700">Nama Pelanggan</label>
          <input
            name="nama_pelanggan"
            value={form.nama_pelanggan}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            placeholder="Contoh: Nurul Aiza"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Total Pesanan</label>
          <input
            name="totalpesanan"
            type="number"
            value={form.totalpesanan}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            placeholder="Contoh: 150000"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Metode Pembayaran</label>
          <input
            name="metodepembayaran"
            value={form.metodepembayaran}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            placeholder="Contoh: COD / Transfer / QRIS"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Promo</label>
          <input
            name="promo"
            value={form.promo}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            placeholder="Contoh: Promo Khusus"
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-700">Kategori</label>
          <input
            name="kategori"
            value={form.kategori}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            placeholder="Contoh: obat / vitamin / herbal"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 md:col-span-2"
        >
          {editingId ? "💾 Perbarui Transaksi" : "➕ Tambah Transaksi"}
        </button>
      </form>

      {/* TABEL TRANSAKSI */}
      <table className="w-full table-auto bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-blue-100">
          <tr>
            {"No, Nama, Total, Metode, Promo, Kategori, Tanggal, Aksi"
              .split(", ")
              .map((h) => (
                <th
                  key={h}
                  className="px-4 py-2 text-left text-sm font-medium text-blue-800"
                >
                  {h}
                </th>
              ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {transaksi.map((t, i) => (
            <tr key={t.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-sm">{i + 1}</td>
              <td className="px-4 py-2 text-sm">{t.nama_pelanggan}</td>
              <td className="px-4 py-2 text-sm">Rp {Number(t.totalpesanan).toLocaleString()}</td>
              <td className="px-4 py-2 text-sm">{t.metodepembayaran}</td>
              <td className="px-4 py-2 text-sm">{t.promo || "-"}</td>
              <td className="px-4 py-2 text-sm">{t.kategori}</td>
              <td className="px-4 py-2 text-sm">{new Date(t.created_at).toLocaleString()}</td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  onClick={() => handleEdit(t)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
