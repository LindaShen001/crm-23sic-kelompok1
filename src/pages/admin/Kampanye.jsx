import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";

export default function Restock() {
  // State untuk mengelola data form input
  const [form, setForm] = useState({
    tanggal: "",
    supplier: "",
    namaobat: "",
    jumlah: "",
    hargabeli: "",
    nofaktur: "",
    expired: "",
  });

  // State untuk menyimpan data restok yang diambil dari Supabase
  const [dataRestok, setDataRestok] = useState([]);
  // State untuk menandai item yang sedang diedit (menyimpan ID item)
  const [editId, setEditId] = useState(null);

  // Nilai default untuk form, digunakan saat mereset form
  const defaultForm = {
    tanggal: "",
    supplier: "",
    namaobat: "",
    jumlah: "",
    hargabeli: "",
    nofaktur: "",
    expired: "",
  };

  // Daftar supplier yang tersedia
  const supplierList = ["PT Kalbe Farma", "PT Kimia Farma", "PT Phapros", "PT Indofarma"];
  // Daftar nama obat yang tersedia (untuk datalist)
  const daftarObat = ["Paracetamol 500mg", "Amoxicillin 250mg", "Ibuprofen 200mg", "Cetirizine 10mg", "Vitamin C 500mg"];
  // Mapping warna latar belakang untuk setiap supplier
  const supplierColors = {
    "PT Kalbe Farma": "bg-gray-300",
    "PT Kimia Farma": "bg-blue-200",
    "PT Phapros": "bg-green-200",
    "PT Indofarma": "bg-blue-200",
  };

  // Efek samping untuk memuat data saat komponen pertama kali di-render
  useEffect(() => {
    fetchData();
  }, []);

  // Fungsi untuk mengambil data restok dari Supabase
  const fetchData = async () => {
    const { data, error } = await supabase
      .from("restock")
      .select("*")
      .order("created_at", { ascending: false }); // Mengurutkan data berdasarkan waktu pembuatan terbaru

    if (error) {
      console.error("Fetch error:", error);
    } else {
      setDataRestok(data);
    }
  };

  // Fungsi untuk menangani perubahan pada input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Fungsi untuk menangani submit form (tambah atau update data)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman

    if (editId) {
      // Jika dalam mode edit, lakukan update data
      const { error } = await supabase
        .from("restock")
        .update(form)
        .eq("id", editId);

      if (error) {
        console.error("Update error:", error);
      } else {
        fetchData(); // Muat ulang data setelah update
        setForm(defaultForm); // Reset form ke nilai default
        setEditId(null); // Keluar dari mode edit
      }
    } else {
      // Jika tidak dalam mode edit, lakukan insert data baru
      const { error } = await supabase.from("restock").insert([form]);
      if (error) {
        console.error("Insert error:", error);
      } else {
        fetchData(); // Muat ulang data setelah insert
        setForm(defaultForm); // Reset form ke nilai default
      }
    }
  };

  // Fungsi untuk mengaktifkan mode edit dan mengisi form dengan data item yang dipilih
  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
  };

  // Fungsi untuk menghapus data restok
  const handleDelete = async (id) => {
    const { error } = await supabase.from("restock").delete().eq("id", id);
    if (error) {
      console.error("Delete error:", error);
    } else {
      fetchData(); // Muat ulang data setelah delete
    }
  };

  return (
    // **PERHATIAN PENTING DI SINI:**
    // Tambahkan `pt-[TinggiHeaderAnda]` dan `lg:pl-[LebarSidebarAnda]`.
    // Ganti `[TinggiHeaderAnda]` dan `[LebarSidebarAnda]` dengan nilai piksel sebenarnya.
    // Contoh: Jika header Anda 64px, gunakan `pt-[64px]`.
    // Contoh: Jika sidebar Anda 256px, gunakan `lg:pl-[256px]`.
    // Kelas `p-6` akan menambahkan padding di semua sisi,
    // sedangkan `pt-[...]` dan `pl-[...]` akan menimpa padding default di sisi atas dan kiri.
    <div className="p-6 pt-[64px] lg:pl-[256px]">
      <h2 className="text-2xl font-bold mb-4">Manajemen Restok</h2>

      {/* FORM SECTION */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white shadow rounded p-4">
        {/* Input Tanggal Pembelian */}
        <div>
          <label className="block text-sm font-medium">Tanggal Pembelian</label>
          <input
            type="date"
            name="tanggal"
            value={form.tanggal}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        {/* Input Supplier */}
        <div>
          <label className="block text-sm font-medium">Supplier</label>
          <select
            name="supplier"
            value={form.supplier}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          >
            <option value="">Pilih Supplier</option>
            {supplierList.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Input Nama Obat */}
        <div>
          <label className="block text-sm font-medium">Nama Obat</label>
          <input
            type="text"
            name="namaobat"
            list="daftarObat" // Menghubungkan ke datalist
            value={form.namaobat}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
          <datalist id="daftarObat">
            {daftarObat.map((o, i) => (
              <option key={i} value={o} />
            ))}
          </datalist>
        </div>

        {/* Input Jumlah */}
        <div>
          <label className="block text-sm font-medium">Jumlah</label>
          <input
            type="number"
            name="jumlah"
            value={form.jumlah}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        {/* Input Harga Beli */}
        <div>
          <label className="block text-sm font-medium">Harga Beli</label>
          <input
            type="number"
            name="hargabeli"
            value={form.hargabeli}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        {/* Input No Faktur */}
        <div>
          <label className="block text-sm font-medium">No Faktur</label>
          <input
            type="text"
            name="nofaktur"
            value={form.nofaktur}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        {/* Input Expired Date */}
        <div>
          <label className="block text-sm font-medium">Expired</label>
          <input
            type="date"
            name="expired"
            value={form.expired}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        {/* Tombol Submit Form */}
        <div className="sm:col-span-2 md:col-span-3">
          <button
            type="submit"
            className="mt-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            {editId ? "Update Data" : "Tambah Data Restok"}
          </button>
        </div>
      </form>

      {/* TABLE SECTION */}
      <div className="bg-white shadow rounded p-4 mt-6">
        <h4 className="text-lg font-semibold mb-3">Riwayat Restok</h4>
        <div className="overflow-x-auto"> {/* Menambahkan overflow untuk responsivitas tabel */}
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="p-2">Tanggal</th>
                <th className="p-2">Supplier</th>
                <th className="p-2">Nama Obat</th>
                <th className="p-2">Jumlah</th>
                <th className="p-2">Harga Beli</th>
                <th className="p-2">No Faktur</th>
                <th className="p-2">Expired</th>
                <th className="p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataRestok.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-4 text-center text-gray-500">
                    Belum ada data
                  </td>
                </tr>
              ) : (
                dataRestok.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2">{item.tanggal}</td>
                    <td className={`p-2 ${supplierColors[item.supplier] || ""}`}>
                      {item.supplier}
                    </td>
                    <td className="p-2">{item.namaobat}</td>
                    <td className="p-2">{item.jumlah}</td>
                    <td className="p-2">Rp {parseInt(item.hargabeli).toLocaleString("id-ID")}</td>
                    <td className="p-2">{item.nofaktur}</td>
                    <td className="p-2">{item.expired}</td>
                    <td className="p-2 space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-blue-400 hover:bg-blue-500 text-white px-2 py-1 rounded text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
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
      </div>
    </div>
  );
}