import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";

export default function Restock() {
  const [form, setForm] = useState({
    tanggal: "",
    supplier: "",
    namaobat: "",
    jumlah: "",
    hargabeli: "",
    nofaktur: "",
    expired: "",
  });

  const [dataRestok, setDataRestok] = useState([]);
  const [editId, setEditId] = useState(null);

  const defaultForm = {
    tanggal: "",
    supplier: "",
    namaobat: "",
    jumlah: "",
    hargabeli: "",
    nofaktur: "",
    expired: "",
  };

  const supplierList = ["PT Kalbe Farma", "PT Kimia Farma", "PT Phapros", "PT Indofarma"];
  const daftarObat = ["Paracetamol 500mg", "Amoxicillin 250mg", "Ibuprofen 200mg", "Cetirizine 10mg", "Vitamin C 500mg"];
  const supplierColors = {
    "PT Kalbe Farma": "bg-gray-300",
    "PT Kimia Farma": "bg-yellow-200",
    "PT Phapros": "bg-green-200",
    "PT Indofarma": "bg-blue-200",
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("restock")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Fetch error:", error);
    else setDataRestok(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      const { error } = await supabase
        .from("restock")
        .update(form)
        .eq("id", editId);

      if (error) console.error("Update error:", error);
      else {
        fetchData();
        setForm(defaultForm);
        setEditId(null);
      }
    } else {
      const { error } = await supabase.from("restock").insert([form]);
      if (error) console.error("Insert error:", error);
      else {
        fetchData();
        setForm(defaultForm);
      }
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("restock").delete().eq("id", id);
    if (error) console.error("Delete error:", error);
    else fetchData();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manajemen Restok</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white shadow rounded p-4">
        <div>
          <label className="block text-sm font-medium">Tanggal Pembelian</label>
          <input type="date" name="tanggal" value={form.tanggal} onChange={handleChange} className="border p-2 w-full rounded" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Supplier</label>
          <select name="supplier" value={form.supplier} onChange={handleChange} className="border p-2 w-full rounded" required>
            <option value="">Pilih Supplier</option>
            {supplierList.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Nama Obat</label>
          <input type="text" name="namaobat" list="daftarObat" value={form.namaobat} onChange={handleChange} className="border p-2 w-full rounded" required />
          <datalist id="daftarObat">
            {daftarObat.map((o, i) => <option key={i} value={o} />)}
          </datalist>
        </div>

        <div>
          <label className="block text-sm font-medium">Jumlah</label>
          <input type="number" name="jumlah" value={form.jumlah} onChange={handleChange} className="border p-2 w-full rounded" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Harga Beli</label>
          <input type="number" name="hargabeli" value={form.hargabeli} onChange={handleChange} className="border p-2 w-full rounded" required />
        </div>

        <div>
          <label className="block text-sm font-medium">No Faktur</label>
          <input type="text" name="nofaktur" value={form.nofaktur} onChange={handleChange} className="border p-2 w-full rounded" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Expired</label>
          <input type="date" name="expired" value={form.expired} onChange={handleChange} className="border p-2 w-full rounded" required />
        </div>

        <div className="sm:col-span-2 md:col-span-3">
          <button type="submit" className="mt-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            {editId ? "Update Data" : "Tambah Data Restok"}
          </button>
        </div>
      </form>

      {/* TABEL */}
      <div className="bg-white shadow rounded p-4 mt-6">
        <h4 className="text-lg font-semibold mb-3">Riwayat Restok</h4>
        <table className="w-full text-sm">
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
                <td colSpan="8" className="p-4 text-center text-gray-500">Belum ada data</td>
              </tr>
            ) : (
              dataRestok.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2">{item.tanggal}</td>
                  <td className={`p-2 ${supplierColors[item.supplier] || ""}`}>{item.supplier}</td>
                  <td className="p-2">{item.namaobat}</td>
                  <td className="p-2">{item.jumlah}</td>
                  <td className="p-2">Rp {parseInt(item.hargabeli).toLocaleString("id-ID")}</td>
                  <td className="p-2">{item.nofaktur}</td>
                  <td className="p-2">{item.expired}</td>
                  <td className="p-2 space-x-2">
                    <button onClick={() => handleEdit(item)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-xs">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs">Hapus</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
