import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";

export default function ManajemenPelanggan() {
  const [pelanggan, setPelanggan] = useState([]);
  const [tampilkanForm, setTampilkanForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  useEffect(() => {
    ambilDataPelanggan();
  }, []);

  const ambilDataPelanggan = async () => {
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      console.error("Gagal mengambil data:", error);
    } else {
      setPelanggan(data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { name, email, password, role } = formData;
    if (!name || !email || !password || !role) {
      alert("Mohon lengkapi semua data yang diperlukan.");
      return;
    }

    if (editId) {
      const { error } = await supabase
        .from("users")
        .update({ name, email, password: parseInt(password), role })
        .eq("id", editId);
      if (!error) {
        resetForm();
        ambilDataPelanggan();
      }
    } else {
      const { error } = await supabase
        .from("users")
        .insert([{ name, email, password: parseInt(password), role }]);
      if (!error) {
        resetForm();
        ambilDataPelanggan();
      }
    }
  };

  const handleEdit = (cust) => {
    setFormData({
      name: cust.name,
      email: cust.email,
      password: cust.password,
      role: cust.role,
    });
    setEditId(cust.id);
    setTampilkanForm(true);
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", password: "", role: "customer" });
    setEditId(null);
    setTampilkanForm(false);
  };

  const handleDelete = async (id) => {
    const konfirmasi = window.confirm("Apakah Anda yakin ingin menghapus data account ini?");
    if (!konfirmasi) return;

    const { error } = await supabase.from("users").delete().eq("id", id);
    if (!error) {
      ambilDataPelanggan();
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Data Account</h1>
      <p className="text-gray-600 mb-6">
        Halaman ini digunakan untuk mengelola informasi Account, termasuk menambah, memperbarui, dan menghapus data yang diperlukan.
      </p>

      <button
        onClick={() => {
          if (tampilkanForm && editId) {
            resetForm();
          } else {
            setTampilkanForm((prev) => !prev);
          }
        }}
        className="mb-6 px-5 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
      >
        {tampilkanForm ? (editId ? "Batal Ubah Data" : "Tutup Form") : "Tambah Account Baru"}
      </button>

      {tampilkanForm && (
        <div className="mb-10 bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {editId ? "Ubah Data Account" : "Formulir Tambah Account"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Nama Lengkap</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Password (Angka)</label>
              <input
                type="number"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Peran Pengguna</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-400"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleSubmit}
              className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              {editId ? "Perbarui Data" : "Simpan Data"}
            </button>
            <button
              onClick={resetForm}
              className="px-5 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-600">Nama</th>
              <th className="px-6 py-3 font-medium text-gray-600">Email</th>
              <th className="px-6 py-3 font-medium text-gray-600">Peran</th>
              <th className="px-6 py-3 text-center font-medium text-gray-600">Tindakan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pelanggan.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-400">
                  Belum ada data account yang tersedia.
                </td>
              </tr>
            ) : (
              pelanggan.map((cust) => (
                <tr key={cust.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{cust.name}</td>
                  <td className="px-6 py-4">{cust.email}</td>
                  <td className="px-6 py-4 capitalize">{cust.role}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleEdit(cust)}
                      className="text-blue-600 hover:underline mr-4"
                    >
                      Ubah
                    </button>
                    <button
                      onClick={() => handleDelete(cust.id)}
                      className="text-red-600 hover:underline"
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
