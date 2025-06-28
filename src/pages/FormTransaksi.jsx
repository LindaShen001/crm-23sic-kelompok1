import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getTransaksi,
  createTransaksi,
  updateTransaksi,
} from "../api/transaksiService";

export default function FormTransaksi() {
  const [form, setForm] = useState({
    id: null,
    namaPelanggan: "",
    namaObat: "",
    jenisObat: "",
    promo: "",
    metodePembayaran: "",
    totalPesanan: "",
    namaKasir: "",
  });

  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      getTransaksis()
        .then((data) => {
          const trx = data.find((t) => t.id === +id);
          if (trx) setForm(trx);
        })
        .catch(() => setError("Gagal mengambil data untuk edit."));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const required = [
      "namaPelanggan",
      "namaObat",
      "jenisObat",
      "promo",
      "metodePembayaran",
      "totalPesanan",
      "namaKasir",
    ];

    if (required.some((f) => !form[f])) {
      setError("Mohon isi semua field sebelum submit.");
      return;
    }

    const newData = {
      namaPelanggan: form.namaPelanggan,
      namaObat: form.namaObat,
      jenisObat: form.jenisObat,
      promo: Number(form.promo),
      metodePembayaran: form.metodePembayaran,
      totalPesanan: Number(form.totalPesanan),
      namaKasir: form.namaKasir,
    };

    try {
      if (form.id) {
        await updateTransaksi(form.id, newData);
        setNotification("Transaksi berhasil diupdate.");
      } else {
        await createTransaksi(newData);
        setNotification("Transaksi berhasil ditambahkan.");
      }

      setTimeout(() => navigate("/riwayat"), 1500);
    } catch (err) {
      setError("Terjadi kesalahan saat menyimpan data.");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
        {form.id ? "Edit Transaksi" : "Tambah Transaksi"}
      </h2>

      {notification && (
        <div className="mb-4 text-green-600 text-sm text-center">
          {notification}
        </div>
      )}
      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama Pelanggan</label>
          <input
            name="namaPelanggan"
            value={form.namaPelanggan}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nama Obat</label>
          <input
            name="namaObat"
            value={form.namaObat}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Jenis Produk</label>
          <select
            name="jenisObat"
            value={form.jenisObat}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">-- Pilih Jenis --</option>
            <option value="obat">Obat</option>
            <option value="vitamin">Vitamin</option>
            <option value="suplemen">Suplemen</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Promo (%)</label>
          <input
            name="promo"
            type="number"
            value={form.promo}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Metode Pembayaran</label>
          <select
            name="metodePembayaran"
            value={form.metodePembayaran}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">-- Pilih Metode --</option>
            <option value="cod">COD</option>
            <option value="Transfer">Transfer</option>
            <option value="ATM">ATM</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Total Pesanan</label>
          <input
            name="totalPesanan"
            type="number"
            value={form.totalPesanan}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Nama Kasir</label>
          <input
            name="namaKasir"
            value={form.namaKasir}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="md:col-span-2 flex justify-end space-x-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-700 transition"
          >
            {form.id ? "Update" : "Tambah"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/transaksi")}
            className="bg-gray-300 text-gray-800 px-5 py-2 rounded shadow hover:bg-gray-400 transition"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
