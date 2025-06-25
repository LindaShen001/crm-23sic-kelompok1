import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { useNavigate } from "react-router-dom";
import { BiSolidDiscount } from "react-icons/bi";

export default function Checkout() {
    const [produk, setProduk] = useState([]);
    const [promos, setPromos] = useState([]);
    const [promoObats, setPromoObats] = useState([]);
    const [keranjang, setKeranjang] = useState([]);
    const [form, setForm] = useState({
        nama: "",
        alamat1: "",
        kota: "",
        provinsi: "",
        kodepos: "",
        metode: "card",
        pengiriman: "JNE",
    });
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
        const { data, error } = await supabase
            .from("keranjang")
            .select("*")
            .eq("isSelected", true); // ✅ Hanya ambil produk yang dipilih
        if (!error) setKeranjang(data || []);
    };


    const getPromoForProduk = (produkId) => {
        const relasi = promoObats.filter((r) => r.obat_id === produkId);
        const today = new Date().toISOString().split("T")[0];
        return relasi
            .map((r) => promos.find((p) => p.id === r.promo_id))
            .filter((promo) => promo && promo.startdate <= today && today <= promo.enddate);
    };

    let totalHargaAwal = 0;
    let totalHargaDiskon = 0;
    let totalDiskon = 0;
    let promoUsed = [];

    keranjang.forEach((item) => {
        const product = produk.find((p) => p.id === item.obat_id);
        const jumlah = item.qty || 1;
        let hargaAwal = product?.harga || 0;
        let hargaSetelahPromo = hargaAwal;

        const promoList = getPromoForProduk(product?.id);
        promoList.forEach((promo) => {
            if (promo.discounttype === "persen") {
                hargaSetelahPromo -= (promo.discountvalue / 100) * hargaSetelahPromo;
            } else if (promo.discounttype === "potongan") {
                hargaSetelahPromo -= promo.discountvalue;
            }
            promoUsed.push(promo);
        });

        totalHargaAwal += hargaAwal * jumlah;
        totalHargaDiskon += hargaSetelahPromo * jumlah;
        totalDiskon += (hargaAwal - hargaSetelahPromo) * jumlah;
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        // 1. Buat transaksi dulu agar dapat id
        const { data: transaksiData, error: transaksiError } = await supabase
            .from("transaksi")
            .insert([
                {
                    nama_pelanggan: form.nama,
                    promo: promoUsed.length > 0 ? promoUsed.map(p => p.nama).join(", ") : null,
                    metodepembayaran: form.metode,
                    totalpesanan: totalHargaDiskon,
                    kategori: keranjang.map(item => {
                        const produkItem = produk.find(p => p.id === item.obat_id);
                        return produkItem?.kategori || "";
                    }).join(", "),
                    created_at: new Date().toISOString(),
                    user_id: null, // kamu bisa isi kalau ada login user
                },
            ])
            .select()
            .single();

        if (transaksiError) {
            console.error("Gagal simpan transaksi:", transaksiError.message);
            alert("Gagal menyimpan transaksi.");
            return;
        }

        // 2. Simpan alamat pengiriman (hubungkan dengan transaksi_id)
        const { error: alamatError } = await supabase.from("alamat_pengiriman").insert([
            {
                transaksi_id: transaksiData.id,
                nama: form.nama,
                alamat1: form.alamat1,
                kota: form.kota,
                provinsi: form.provinsi,
                kodepos: form.kodepos,
            },
        ]);

        if (alamatError) {
            console.error("Gagal simpan alamat:", alamatError.message);
            alert("Gagal menyimpan alamat pengiriman.");
            return;
        }

        // 3. Navigasi ke halaman sukses
        navigate("/success");
    };


    return (
        <div className="relative max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tombol kembali ke keranjang */}
            <button
                onClick={() => navigate("/keranjang")}
                className="absolute right-4 top-4 text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-lg z-10"
            >
                Kembali
            </button>

            {/* Form Pengiriman dan Pembayaran */}
            <div className="md:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Data Pengiriman</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="nama" value={form.nama} onChange={handleChange} placeholder="Nama Pengirim" className="border p-3 rounded-lg" />
                        <input name="alamat1" value={form.alamat1} onChange={handleChange} placeholder="Alamat Pengiriman" className="border p-3 rounded-lg" />
                        <input name="provinsi" value={form.provinsi} onChange={handleChange} placeholder="Provinsi" className="border p-3 rounded-lg" />
                        <input name="kota" value={form.kota} onChange={handleChange} placeholder="Kota" className="border p-3 rounded-lg" />
                        <input name="kodepos" value={form.kodepos} onChange={handleChange} placeholder="Kode Pos" className="border p-3 rounded-lg" />
                    </div>
                    <div className="mt-4">
                        <label className="block mb-2 font-semibold">Pilih Pengiriman</label>
                        <select name="pengiriman" value={form.pengiriman} onChange={handleChange} className="border p-3 rounded-lg w-full">
                            <option value="JNE">JNE</option>
                            <option value="JNT">JNT</option>
                            <option value="Ekspress">Ekspress</option>
                        </select>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Metode Pembayaran</h2>
                    <div className="flex gap-4 mb-4">
                        {["card", "wallet", "cod"].map((opt) => (
                            <button
                                key={opt}
                                onClick={() => setForm({ ...form, metode: opt })}
                                className={`p-3 rounded-lg flex-1 border ${form.metode === opt ? "border-blue-500 font-semibold" : "border-gray-300"}`}
                            >
                                {opt.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Rincian Produk dan Promo */}
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Rincian Produk</h2>
                    {keranjang.map((item) => {
                        const product = produk.find((p) => p.id === item.obat_id);
                        const jumlah = item.qty || 1;
                        const promoList = getPromoForProduk(product?.id);

                        let hargaSetelahDiskon = product?.harga || 0;
                        promoList.forEach((promo) => {
                            if (promo.discounttype === "persen") {
                                hargaSetelahDiskon -= (promo.discountvalue / 100) * hargaSetelahDiskon;
                            } else if (promo.discounttype === "potongan") {
                                hargaSetelahDiskon -= promo.discountvalue;
                            }
                        });

                        return (
                            <div key={item.id} className="mb-4 flex gap-3">
                                <img src={product?.gambar} alt={product?.nama} className="w-20 h-20 object-cover rounded" />
                                <div className="flex-1">
                                    <p className="font-semibold">{product?.nama} ({product?.kategori})</p>
                                    <p>Jumlah: {jumlah}</p>
                                    <p>
                                        {promoList.length > 0 ? (
                                            <>
                                                <span className="text-blue-500 font-bold text-lg">Rp {hargaSetelahDiskon.toLocaleString()}</span>{" "}
                                                <span className="line-through text-gray-500 text-sm">Rp {product?.harga.toLocaleString()}</span>
                                            </>
                                        ) : (
                                            <span className="text-black font-bold text-lg">Rp {product?.harga.toLocaleString()}</span>
                                        )}
                                    </p>
                                    {promoList.map((promo, idx) => (
                                        <p key={idx} className="text-sm font-medium" style={{ color: "#AE1D00" }}>
                                            {promo.nama} ({promo.discounttype === "persen" ? `${promo.discountvalue}%` : `Rp${promo.discountvalue.toLocaleString()}`})
                                        </p>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Promo Digunakan</h2>
                    {promoUsed.length === 0 ? (
                        <p className="text-sm text-gray-500">Tidak ada promo yang diterapkan.</p>
                    ) : (
                        promoUsed.map((promo, idx) => (
                            <div key={idx} className="flex items-center gap-2 mb-2">
                                <BiSolidDiscount className="text-[#AE1D00] text-lg" />
                                <span className="text-sm font-medium">{promo?.nama} ({promo?.discounttype === "persen" ? `${promo.discountvalue}%` : `Rp${promo.discountvalue.toLocaleString()}`})</span>
                            </div>
                        ))
                    )}
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Total Pembayaran</h2>
                    <div className="flex justify-between">
                        <span>Subtotal</span><span>Rp {totalHargaAwal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Total Diskon</span><span>- Rp {totalDiskon.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg mt-4 border-t pt-3">
                        <span>Total Dibayar</span><span>Rp {totalHargaDiskon.toLocaleString()}</span>
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    className="mt-4 w-full bg-blue-600 text-white p-3 rounded-lg font-semibold text-lg"
                >
                    Pesan Sekarang
                </button>
            </div>
        </div>
    );
}
