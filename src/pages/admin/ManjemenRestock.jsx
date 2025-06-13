import React, { useState } from "react";

export default function ManajemenRestock() {
  const [form, setForm] = useState({
    tanggal: "",
    supplier: "",
    namaObat: "",
    jumlah: "",
    hargaBeli: "",
    noFaktur: "",
    expired: "",
  });

  const [dataRestok, setDataRestok] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const supplierList = [
    "PT Kalbe Farma",
    "PT Kimia Farma",
    "PT Phapros",
    "PT Indofarma",
  ];

  const daftarObat = [
    "Paracetamol 500mg",
    "Amoxicillin 250mg",
    "Ibuprofen 200mg",
    "Cetirizine 10mg",
    "Vitamin C 500mg",
  ];

  const supplierColors = {
    "PT Kalbe Farma": "bg-gray-300",
    "PT Kimia Farma": "bg-yellow-200",
    "PT Phapros": "bg-green-200",
    "PT Indofarma": "bg-blue-200",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const newData = [...dataRestok];
      newData[editIndex] = form;
      setDataRestok(newData);
      setEditIndex(null);
    } else {
      setDataRestok((prev) => [...prev, form]);
    }

    setForm({
      tanggal: "",
      supplier: "",
      namaObat: "",
      jumlah: "",
      hargaBeli: "",
      noFaktur: "",
      expired: "",
    });
  };

  const handleEdit = (index) => {
    setForm(dataRestok[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const newData = dataRestok.filter((_, i) => i !== index);
    setDataRestok(newData);
    if (editIndex === index) {
      setForm({
        tanggal: "",
        supplier: "",
        namaObat: "",
        jumlah: "",
        hargaBeli: "",
        noFaktur: "",
        expired: "",
      });
      setEditIndex(null);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manajemen Restok</h2>

      {/* FORM INPUT */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white shadow rounded p-4"
      >
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
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Nama Obat</label>
          <input
            type="text"
            name="namaObat"
            list="daftarObat"
            value={form.namaObat}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            placeholder="Nama Obat"
            required
          />
          <datalist id="daftarObat">
            {daftarObat.map((o, i) => (
              <option key={i} value={o} />
            ))}
          </datalist>
        </div>

        <div>
          <label className="block text-sm font-medium">Jumlah</label>
          <input
            type="number"
            name="jumlah"
            value={form.jumlah}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            placeholder="Contoh: 200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Harga Beli per Satuan</label>
          <input
            type="number"
            name="hargaBeli"
            value={form.hargaBeli}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            placeholder="Contoh: 1000"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">No Faktur</label>
          <input
            type="text"
            name="noFaktur"
            value={form.noFaktur}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            placeholder="Contoh: INV-2025/001"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Tanggal Expired</label>
          <input
            type="date"
            name="expired"
            value={form.expired}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div className="sm:col-span-2 md:col-span-3">
          <button
            type="submit"
            className="mt-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            {editIndex !== null ? "Update Data Restok" : "Tambah Data Restok"}
          </button>
        </div>
      </form>

      {/* TABEL RIWAYAT RESTOK */}
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
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  Belum ada data restok
                </td>
              </tr>
            ) : (
              dataRestok.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{item.tanggal}</td>
                  <td className={`p-2 ${supplierColors[item.supplier] || ""}`}>
                    {item.supplier}
                  </td>
                  <td className="p-2">{item.namaObat}</td>
                  <td className="p-2">{item.jumlah}</td>
                  <td className="p-2">Rp {parseInt(item.hargaBeli).toLocaleString("id-ID")}</td>
                  <td className="p-2">{item.noFaktur}</td>
                  <td className="p-2">{item.expired}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
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
  );
}

