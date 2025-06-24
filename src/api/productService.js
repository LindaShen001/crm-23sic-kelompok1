
import { BASE_URL } from "../api/config";

// Ambil semua produk
export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Gagal mengambil data produk");
  return await res.json();
};

export const createProduct = async (data) => {
  const res = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal menambahkan produk");
  return await res.json(); // <--- tambahkan ini kalau butuh response
};


// Update produk
export const updateProduct = async (id, data) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal mengupdate produk");
  return await res.json();
};

// Hapus produk
export const deleteProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Gagal menghapus produk");
};
