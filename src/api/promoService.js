import { BASE_URL } from "../api/config";

export const getPromos = async () => {
  const res = await fetch(`${BASE_URL}/promos`);
  if (!res.ok) throw new Error("Gagal mengambil data promo");
  return await res.json();
};

export const createPromo = async (data) => {
  const res = await fetch(`${BASE_URL}/promos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal menambahkan promo");
};

export const updatePromo = async (id, data) => {
  const res = await fetch(`${BASE_URL}/promos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal mengupdate promo");
};

export const deletePromo = async (id) => {
  const res = await fetch(`${BASE_URL}/promos/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Gagal menghapus promo");
};

// ✅ Tambahkan fungsi getPromoById ini
export const getPromoById = async (id) => {
  const res = await fetch(`${BASE_URL}/promos/${id}`);
  if (!res.ok) throw new Error("Gagal mengambil promo");
  return await res.json();
};
