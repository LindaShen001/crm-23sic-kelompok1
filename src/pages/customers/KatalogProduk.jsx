import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { HiShoppingCart } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

const kategoriMap = {
  "Semua": null,
  "Ibu dan Anak": "ibu-anak",
  "Herbal": "herbal",
  "Obat-obatan": "obat",
  "Vitamin & Suplemen": "vitamin"
};

export default function KatalogProduk() {
  const [produk, setProduk] = useState([]);
  const [promos, setPromos] = useState([]);
  const [promoObats, setPromoObats] = useState([]);
  const [keranjang, setKeranjang] = useState([]);
  const [selectedKategori, setSelectedKategori] = useState("Semua");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: allProduk } = await supabase.from("obat").select("*");
    const { data: allPromo } = await supabase.from("promo").select("*");
    const { data: allRelasi } = await supabase.from("promo_obat").select("*");
    const { data: allKeranjang } = await supabase.from("keranjang").select("*");

    setProduk(allProduk || []);
    setPromos(allPromo || []);
    setPromoObats(allRelasi || []);
    setKeranjang(allKeranjang || []);
  };

  const getPromoForProduk = (produkId) => {
    const relasi = promoObats.filter((r) => r.obat_id === produkId);
    const today = new Date().toISOString().split("T")[0];
    return relasi
      .map((r) => promos.find((p) => p.id === r.promo_id))
      .filter((promo) => promo && promo.startdate <= today && today <= promo.enddate);
  };

  const tambahKeKeranjang = async (produkItem) => {
    try {
      const { data: existing } = await supabase
        .from("keranjang")
        .select("*")
        .eq("obat_id", produkItem.id)
        .single();

      if (existing) {
        await supabase.from("keranjang").update({
          qty: existing.qty + 1
        }).eq("id", existing.id);
      } else {
        await supabase.from("keranjang").insert({
          obat_id: produkItem.id,
          qty: 1
        });
      }
      fetchData();
    } catch (error) {
      console.error("Gagal menambahkan ke keranjang:", error);
    }
  };

  const totalKeranjang = keranjang.reduce((acc, item) => acc + item.qty, 0);

  const sortedProduk = [...produk].sort((a, b) => a.stock - b.stock);

  const filteredProduk = sortedProduk.filter((p) =>
    kategoriMap[selectedKategori]
      ? p.kategori?.toLowerCase() === kategoriMap[selectedKategori]
      : true
  );

  const produkPromo = [...produk]
    .filter((p) => getPromoForProduk(p.id).length > 0 && p.stock <= 10)
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 7);

  const renderProdukCard = (p) => {
    const promoList = getPromoForProduk(p.id);
    const hasPromo = promoList.length > 0;

    const hargaSetelahPromo = hasPromo
      ? promoList.reduce((price, promo) => {
          if (promo.discounttype === "persen") {
            return price - (price * promo.discountvalue) / 100;
          } else if (promo.discounttype === "potongan") {
            return price - promo.discountvalue;
          }
          return price;
        }, p.harga)
      : p.harga;

    return (
      <div key={p.id} className="bg-white rounded-lg border border-gray-200 shadow-sm transition duration-200 ease-in-out overflow-hidden hover:bg-[#E6EEF9] min-w-[200px] max-w-[220px] flex-shrink-0">
        <div className="relative bg-white m-3 rounded-md border border-gray-200 p-2">
          <img src={p.gambar} alt={p.nama} className="object-contain w-full h-32 mx-auto" />
          {p.stock <= 10 && (
            <span className="absolute top-1 right-1 bg-[#EFEFEF] text-[#C22000] text-[11px] px-2 py-0.5 rounded shadow-sm font-semibold">
              Stok Terbatas
            </span>
          )}
        </div>

        <div className="px-3 pb-3 flex flex-col justify-between h-[200px]">
          <div>
            <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-1">{p.nama}</h3>
            <p className="text-xs text-gray-600 mb-1">{p.kategori}</p>
            <p className="text-xs text-gray-600 mb-1">Stok: {p.stock}</p>

            <div className="text-sm font-medium mb-1">
              <span className={hasPromo ? "text-[#4285F4]" : "text-black"}>
                Rp {Number(hargaSetelahPromo).toLocaleString()}
              </span>
              {hasPromo && (
                <span className="text-xs text-black line-through ml-2">
                  Rp {Number(p.harga).toLocaleString()}
                </span>
              )}
            </div>

            {hasPromo && promoList.map((promo, i) => (
              <div key={i} className="flex items-center gap-2 mt-1">
                <div className="relative w-[80px] h-[26px]">
                  <img src="/images/Group 1871.png" alt="Promo Badge" className="w-full h-full object-contain" />
                  <span className="absolute inset-0 flex items-center justify-center text-white text-[12px] font-semibold">
                    {promo.discounttype === "persen" ? `${promo.discountvalue}%` : `Rp${Number(promo.discountvalue).toLocaleString()}`}
                  </span>
                </div>
                <span className="text-xs text-[#AE1D00] font-medium">DISKON</span>
              </div>
            ))}
          </div>

          <button onClick={() => tambahKeKeranjang(p)} className="mt-2 w-full bg-[#4285F4] hover:bg-blue-700 text-white py-1.5 rounded text-sm flex items-center justify-center">
            <HiShoppingCart className="mr-1" /> Tambahkan
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
        <div className="text-2xl font-bold text-purple-700">Apotek ASEAN</div>
        <nav className="flex space-x-8 text-sm font-semibold text-gray-700 items-center">
          <Link to="/" className="hover:text-purple-600">Home</Link>
          <Link to="/profile" className="hover:text-purple-600">Profil</Link>
          <Link to="/shop" className="text-purple-600 font-bold">Produk</Link>
          <Link to="/customer/faq" className="hover:text-purple-600">FAQ</Link>
          <div className="relative group">
            <button className="hover:text-purple-600">Layanan</button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md z-10 min-w-[180px] py-1 top-full left-0">
              <Link to="/layanan/keamanan" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 hover:text-purple-700">Keamanan & Privasi</Link>
              <Link to="/checkvit" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 hover:text-purple-700">Cek Kebutuhan Vitamin Anda</Link>
            </div>
          </div>
          <Link to="/kontak" className="hover:text-purple-600">Hubungi Kami</Link>
          <button
            onClick={() => navigate("/login")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md"
          >
            Login Admin
          </button>
        </nav>
      </header>
      <div className="pt-[72px]"></div> {/* Spacer for fixed header */}

      {/* Konten Produk */}
      <div className="p-6">
        <div className="bg-white rounded-xl p-4 shadow mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-blue-700">Apotek Sehat</h2>
            <p className="text-sm text-gray-500">Temukan produk terbaik & promo menarik</p>
          </div>
          <Link to="/keranjang" className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded flex items-center">
            <HiShoppingCart className="mr-2" /> Keranjang ({totalKeranjang})
          </Link>
        </div>

        <div className="rounded-xl p-4 shadow mb-6 bg-white">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">🎯 7 Produk Promo & Stok Terbatas</h3>
          {produkPromo.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {produkPromo.map(renderProdukCard)}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Tidak ada produk promo stok terbatas.</p>
          )}
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.keys(kategoriMap).map((label) => (
              <button key={label} onClick={() => setSelectedKategori(label)} className={`px-3 py-1.5 rounded shadow ${selectedKategori === label ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"} hover:bg-blue-500 hover:text-white transition`}>
                {label}
              </button>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mb-3">🛍️ Semua Produk</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredProduk.map(renderProdukCard)}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-8 mt-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold text-purple-400 mb-4">Apotek ASEAN</div>
            <p className="text-gray-400 text-sm">Mengedepankan pelayanan kesehatan terpercaya untuk memenuhi kebutuhan masyarakat.</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Layanan</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/layanan/konsultasi-online" className="hover:text-white">Konsultasi Online</Link></li>
              <li><Link to="/layanan/kirim-resep" className="hover:text-white">Kirim Resep</Link></li>
              <li><Link to="/layanan/cek-kesehatan" className="hover:text-white">Cek Kesehatan</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Informasi</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/tentang-kami" className="hover:text-white">Tentang Kami</Link></li>
              <li><Link to="/karir" className="hover:text-white">Karir</Link></li>
              <li><Link to="/syarat-ketentuan" className="hover:text-white">Syarat & Ketentuan</Link></li>
              <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>+6282114452448</li>
              <li>info@apotekasean.com</li>
              <li>Jl. Jend. Ahmad Yani No.123, Pekanbaru</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
          © 2024 Apotek ASEAN. Semua hak dilindungi.
        </div>
      </footer>
    </div>
  );
}
