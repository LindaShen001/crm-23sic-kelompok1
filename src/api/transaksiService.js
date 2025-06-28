// src/api/transaksiService.js
import axios from "axios";

const API = "http://localhost:3001";

// Ambil semua transaksi
export const getTransaksi = async () => {
  const res = await axios.get(`${API}/transaksis`);
  return res.data;
};

// Tambah transaksi baru
export const createTransaksi = async (newData) => {
  await axios.post(`${API}/transaksis`, newData);
};

// Update transaksi berdasarkan ID
export const updateTransaksi = async (id, updatedData) => {
  await axios.put(`${API}/transaksis/${id}`, updatedData);
};

// Hapus transaksi berdasarkan ID
export const deleteTransaksi = async (id) => {
  await axios.delete(`${API}/transaksis/${id}`);
};
