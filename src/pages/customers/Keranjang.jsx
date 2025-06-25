import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function Keranjang() {
  const [produk, setProduk] = useState([]);
  const [promos, setPromos] = useState([]);
  const [promoObats, setPromoObats] = useState([]);
  const [keranjang, setKeranjang] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    fetchKeranjang();
  }, []);

  const fetchData = async () => {
    const { data: allProduk } = await supabase.from("obat").select("*");
    const { data: allPromo } = await supabase.from("promo").select("*");
    const { data: allRelasi } = await supabase.from("promo_obat").select("*");
    setProduk(allProduk || []);
    setPromos(allPromo || []);
    setPromoObats(allRelasi || []);
  };

  const fetchKeranjang = async () => {
    const { data, error } = await supabase.from("keranjang").select("*");
    if (!error) setKeranjang(data || []);
  };

  const getPromoForProduk = (produkId) => {
    const relasi = promoObats.filter((r) => r.obat_id === produkId);
    const today = new Date().toISOString().split("T")[0];
    return relasi
      .map((r) => promos.find((p) => p.id === r.promo_id))
      .filter((promo) => promo && promo.startdate <= today && today <= promo.enddate);
  };

  const updateQty = async (item, qty) => {
    const { error } = await supabase
      .from("keranjang")
      .update({ qty })
      .eq("id", item.id);
    if (!error) fetchKeranjang();
  };

  const updateIsSelected = async (item, isSelected) => {
    const { error } = await supabase
      .from("keranjang")
      .update({ isSelected })
      .eq("id", item.id);
    if (!error) fetchKeranjang();
  };

  const hapusItem = async (item) => {
    const { error } = await supabase.from("keranjang").delete().eq("id", item.id);
    if (!error) fetchKeranjang();
  };

  let totalAwal = 0;
  let totalSetelahDiskon = 0;

  keranjang.forEach((item) => {
    if (!item.isSelected) return;
    const produkItem = produk.find((p) => p.id === item.obat_id);
    const qty = item.qty || 1;
    if (!produkItem) return;

    let hargaPromo = produkItem.harga;
    const promoList = getPromoForProduk(produkItem.id);

    promoList.forEach((promo) => {
      if (promo.discounttype === "persen") {
        hargaPromo -= (promo.discountvalue / 100) * hargaPromo;
      } else if (promo.discounttype === "potongan") {
        hargaPromo -= promo.discountvalue;
      }
    });

    totalAwal += produkItem.harga * qty;
    totalSetelahDiskon += hargaPromo * qty;
  });

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Keranjang Belanja</h1>

      <div className="space-y-4">
        {keranjang.map((item) => {
          const produkItem = produk.find((p) => p.id === item.obat_id);
          if (!produkItem) return null;
          const qty = item.qty || 1;
          const promoList = getPromoForProduk(produkItem.id);

          let hargaPromo = produkItem.harga;
          promoList.forEach((promo) => {
            if (promo.discounttype === "persen") {
              hargaPromo -= (promo.discountvalue / 100) * hargaPromo;
            } else if (promo.discounttype === "potongan") {
              hargaPromo -= promo.discountvalue;
            }
          });

          const diskonPersen = promoList.length
            ? Math.round(((produkItem.harga - hargaPromo) / produkItem.harga) * 100)
            : 0;

          return (
            <div
              key={item.id}
              className="relative bg-white rounded-xl shadow p-4 flex gap-4 items-center pl-10"
            >
              {/* Checkbox tetap di posisi kiri atas */}
              <input
                type="checkbox"
                checked={item.isSelected || false}
                onChange={(e) => updateIsSelected(item, e.target.checked)}
                className="absolute top-4 left-4 w-5 h-5"
              />

              {/* Tombol hapus */}
              <button
                onClick={() => hapusItem(item)}
                className="absolute top-4 right-4 text-black-400 text-xl"
              >
                <HiX />
              </button>

              {/* Gambar produk */}
              <img
                src={produkItem.gambar}
                alt={produkItem.nama}
                className="w-24 h-24 object-cover rounded"
              />

              {/* Detail produk */}
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold mb-1">{produkItem.nama}</h2>
                <p className="text-sm text-gray-500 mb-2">{produkItem.kategori}</p>

                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold text-lg">
                    Rp {hargaPromo.toLocaleString()}
                  </span>
                  {promoList.length > 0 && (
                    <>
                      <span className="line-through text-gray-400 text-sm">
                        Rp {produkItem.harga.toLocaleString()}
                      </span>
                      <span className="text-red-500 font-semibold text-sm">
                        {diskonPersen}% OFF
                      </span>
                    </>
                  )}
                </div>

                <div className="mt-2">
                  <label className="mr-2">Jumlah:</label>
                  <select
                    value={qty}
                    onChange={(e) => updateQty(item, parseInt(e.target.value))}
                    className="border p-2 rounded-lg"
                  >
                    {[...Array(100)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ringkasan Total & Checkout */}
      <div className="bg-white p-6 rounded-xl shadow mt-6">
        <div className="flex justify-between mb-2">
          <span>Subtotal Harga Awal:</span>
          <span>Rp {totalAwal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Total Diskon:</span>
          <span>- Rp {(totalAwal - totalSetelahDiskon).toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-bold text-xl border-t pt-4">
          <span>Total:</span>
          <span>Rp {totalSetelahDiskon.toLocaleString()}</span>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="mt-4 w-full bg-blue-600 text-white p-3 rounded-lg font-semibold text-lg"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
