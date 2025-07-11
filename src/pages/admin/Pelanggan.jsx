import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";

export default function ManajemenPelanggan() {
  // State untuk menyimpan daftar pengguna (pelanggan)
  const [pelanggan, setPelanggan] = useState([]);
  // State untuk mengontrol tampilan form tambah/ubah
  const [tampilkanForm, setTampilkanForm] = useState(false);
  // State untuk menyimpan ID pengguna yang sedang diedit
  const [editId, setEditId] = useState(null);
  // State untuk data form input
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", // Default role
  });

  // Efek samping untuk mengambil data pelanggan saat komponen dimuat
  useEffect(() => {
    ambilDataPelanggan();
  }, []);

  // Fungsi untuk mengambil data pengguna (pelanggan) dari Supabase
  const ambilDataPelanggan = async () => {
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      console.error("Gagal mengambil data pelanggan:", error);
    } else {
      setPelanggan(data);
    }
  };

  // Fungsi untuk menangani perubahan input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fungsi untuk menangani submit form (tambah atau perbarui data)
  const handleSubmit = async () => {
    const { name, email, password, role } = formData;
    // Validasi input
    if (!name || !email || !password || !role) {
      alert("Mohon lengkapi semua data yang diperlukan.");
      return;
    }

    // Peringatan: Menyimpan password dalam bentuk plaintext adalah praktik yang sangat tidak aman.
    // Supabase Auth biasanya menangani hashing password secara otomatis saat sign-up/login.
    // Jika Anda menambahkan user melalui tabel 'users' secara langsung, pastikan Anda menghash passwordnya.
    // Jika 'password' di database Anda adalah varchar, `parseInt(password)` akan mengubahnya menjadi angka.
    // Jika password Anda memang harus angka, ini tidak masalah. Tapi jika harus string (hash), ini perlu disesuaikan.
    // Untuk demo ini, saya biarkan sesuai code Anda, tapi perlu diingat untuk aplikasi production.

    if (editId) {
      // Jika dalam mode edit, lakukan update data pengguna
      const { error } = await supabase
        .from("users")
        .update({ name, email, password: parseInt(password), role })
        .eq("id", editId);
      if (error) {
        console.error("Gagal memperbarui data:", error);
        alert("Gagal memperbarui data: " + error.message);
      } else {
        resetForm(); // Reset form dan mode edit
        ambilDataPelanggan(); // Ambil data terbaru
      }
    } else {
      // Jika tidak dalam mode edit, lakukan insert data pengguna baru
      const { error } = await supabase
        .from("users")
        .insert([{ name, email, password: parseInt(password), role }]);
      if (error) {
        console.error("Gagal menambahkan data:", error);
        alert("Gagal menambahkan data: " + error.message);
      } else {
        resetForm(); // Reset form
        ambilDataPelanggan(); // Ambil data terbaru
      }
    }
  };

  // Fungsi untuk mengisi form dengan data pengguna yang akan diedit
  const handleEdit = (cust) => {
    setFormData({
      name: cust.name,
      email: cust.email,
      // Penting: Jika password disimpan di Supabase dalam bentuk hash,
      // Anda tidak boleh langsung menampilkannya di form.
      // Biasanya, kolom password akan kosong saat edit, dan user harus mengisinya jika ingin mengubah.
      password: cust.password, // Periksa bagaimana password disimpan di Supabase.
      role: cust.role,
    });
    setEditId(cust.id);
    setTampilkanForm(true); // Tampilkan form untuk editing
  };

  // Fungsi untuk mereset form dan menyembunyikan form
  const resetForm = () => {
    setFormData({ name: "", email: "", password: "", role: "customer" });
    setEditId(null);
    setTampilkanForm(false);
  };

  // Fungsi untuk menghapus data pengguna
  const handleDelete = async (id) => {
    const konfirmasi = window.confirm("Apakah Anda yakin ingin menghapus data account ini?");
    if (!konfirmasi) return; // Jika tidak dikonfirmasi, batalkan operasi

    const { error } = await supabase.from("users").delete().eq("id", id);
    if (error) {
      console.error("Gagal menghapus data:", error);
      alert("Gagal menghapus data: " + error.message);
    } else {
      ambilDataPelanggan(); // Ambil data terbaru setelah penghapusan
    }
  };

  return (
        <div className="p-6 pt-[64px] lg:pl-[256px]">
      <h1 className="text-2xl font-bold mb-4">Manajemen Account</h1>
      <p className="text-gray-600 mb-6">
        Halaman ini digunakan untuk mengelola informasi Account, termasuk menambah, memperbarui, dan menghapus data yang diperlukan.
      </p>

      {/* Tombol untuk menampilkan/menyembunyikan form atau membatalkan edit */}
      <button
        onClick={() => {
          if (tampilkanForm && editId) {
            resetForm(); // Jika sedang edit dan form tampil, batalkan edit
          } else {
            setTampilkanForm((prev) => !prev); // Toggle tampilan form
            if (!tampilkanForm) resetForm(); // Jika form akan ditampilkan, pastikan form bersih
          }
        }}
        className="mb-6 px-5 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition duration-200"
      >
        {tampilkanForm ? (editId ? "Batal Ubah Data" : "Tutup Form") : "Tambah Account Baru"}
      </button>

      {/* Formulir Tambah/Ubah Data Account */}
      {tampilkanForm && (
        <div className="mb-10 bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {editId ? "Ubah Data Account" : "Formulir Tambah Account"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Input Nama Lengkap */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Nama Lengkap</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            {/* Input Email */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            {/* Input Password (Angka) */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Password (Angka)</label>
              <input
                type="number"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            {/* Input Peran Pengguna */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Peran Pengguna</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          {/* Tombol Simpan/Perbarui dan Batal */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleSubmit}
              className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
            >
              {editId ? "Perbarui Data" : "Simpan Data"}
            </button>
            <button
              onClick={resetForm}
              className="px-5 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition duration-200"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Tabel Data Account */}
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
                <tr key={cust.id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4">{cust.name}</td>
                  <td className="px-6 py-4">{cust.email}</td>
                  <td className="px-6 py-4 capitalize">{cust.role}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleEdit(cust)}
                      className="text-blue-600 hover:text-blue-800 hover:underline mr-4"
                    >
                      Ubah
                    </button>
                    <button
                      onClick={() => handleDelete(cust.id)}
                      className="text-red-600 hover:text-red-800 hover:underline"
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