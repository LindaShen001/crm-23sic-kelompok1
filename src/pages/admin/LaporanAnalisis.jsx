import React, { useMemo, useState, useEffect } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function LaporanAnalisis() {
  const [filterBulan, setFilterBulan] = useState("2025-06");
  const [penjualan, setPenjualan] = useState([]);
  const [form, setForm] = useState({ tanggal: "", nama: "", jumlah: 0, harga: 0 });

useEffect(() => {
  const dummyData = [
    { tanggal: "2025-06-01", nama: "Paracetamol 500mg", jumlah: 20, harga: 1500 },
    { tanggal: "2025-06-01", nama: "Vitamin C 1000mg", jumlah: 10, harga: 3000 },
    { tanggal: "2025-06-02", nama: "Ibuprofen 200mg", jumlah: 15, harga: 1800 },
    { tanggal: "2025-06-03", nama: "Amoxicillin 250mg", jumlah: 25, harga: 2000 },
    { tanggal: "2025-06-04", nama: "Paracetamol 500mg", jumlah: 30, harga: 1500 },
    { tanggal: "2025-06-04", nama: "Vitamin C 1000mg", jumlah: 5, harga: 3000 },
    { tanggal: "2025-06-05", nama: "Cough Syrup", jumlah: 12, harga: 5000 },
    { tanggal: "2025-06-06", nama: "Ibuprofen 200mg", jumlah: 10, harga: 1800 },
    { tanggal: "2025-06-06", nama: "Antacid Tablet", jumlah: 8, harga: 2500 },
    { tanggal: "2025-06-07", nama: "Paracetamol 500mg", jumlah: 40, harga: 1500 },
    { tanggal: "2025-06-08", nama: "Amoxicillin 250mg", jumlah: 18, harga: 2000 },
    { tanggal: "2025-06-09", nama: "Vitamin C 1000mg", jumlah: 12, harga: 3000 },
    { tanggal: "2025-06-10", nama: "Cough Syrup", jumlah: 15, harga: 5000 },
    { tanggal: "2025-06-10", nama: "Ibuprofen 200mg", jumlah: 7, harga: 1800 },
    { tanggal: "2025-06-11", nama: "Antacid Tablet", jumlah: 10, harga: 2500 },
    { tanggal: "2025-06-12", nama: "Paracetamol 500mg", jumlah: 35, harga: 1500 },
    { tanggal: "2025-06-13", nama: "Amoxicillin 250mg", jumlah: 20, harga: 2000 },
    { tanggal: "2025-06-14", nama: "Cough Syrup", jumlah: 6, harga: 5000 },
    { tanggal: "2025-06-15", nama: "Vitamin C 1000mg", jumlah: 9, harga: 3000 },
    { tanggal: "2025-06-15", nama: "Antacid Tablet", jumlah: 5, harga: 2500 },
  ];
  setPenjualan(dummyData);
  localStorage.setItem("laporanPenjualan", JSON.stringify(dummyData));
}, []);




  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const newData = [...penjualan, { ...form, jumlah: +form.jumlah, harga: +form.harga }];
  setPenjualan(newData);
  localStorage.setItem("laporanPenjualan", JSON.stringify(newData));

  setForm({ tanggal: "", nama: "", jumlah: 0, harga: 0 });
};


  const laporan = useMemo(() => {
    const dataFiltered = Array.isArray(penjualan)
      ? penjualan.filter(
          (item) => typeof item.tanggal === "string" && item.tanggal.startsWith(filterBulan)
        )
      : [];

    const totalPendapatan = dataFiltered.reduce(
      (sum, item) => sum + item.harga * item.jumlah,
      0
    );
    const totalProduk = dataFiltered.reduce((sum, item) => sum + item.jumlah, 0);
    const totalTransaksi = dataFiltered.length;

    const pendapatanPerHari = {};
    const penjualanPerProduk = {};

    dataFiltered.forEach((item) => {
      const tanggal = item.tanggal;
      pendapatanPerHari[tanggal] =
        (pendapatanPerHari[tanggal] || 0) + item.harga * item.jumlah;
      penjualanPerProduk[item.nama] =
        (penjualanPerProduk[item.nama] || 0) + item.jumlah;
    });

    const sortedProduk = Object.entries(penjualanPerProduk).sort((a, b) => b[1] - a[1]);
    const produkTerlaris = sortedProduk[0];
    const produkKurangLaku = sortedProduk[sortedProduk.length - 1];

    return {
      totalPendapatan,
      totalProduk,
      totalTransaksi,
      pendapatanPerHari,
      penjualanPerProduk,
      produkTerlaris,
      produkKurangLaku,
    };
  }, [penjualan, filterBulan]);

  const lineChartData = {
    labels: Object.keys(laporan.pendapatanPerHari),
    datasets: [
      {
        label: "Pendapatan Harian",
        data: Object.values(laporan.pendapatanPerHari),
        borderColor: "#4CAF50",
        tension: 0.3,
      },
    ],
  };

  const barChartData = {
    labels: ["Total Pendapatan", "Total Produk Terjual", "Jumlah Transaksi"],
    datasets: [
      {
        label: "Statistik Bulan Ini",
        backgroundColor: "#4CAF50",
        data: [
          laporan.totalPendapatan,
          laporan.totalProduk,
          laporan.totalTransaksi,
        ],
      },
    ],
  };

  const doughnutData = (label, data) => ({
    labels: [label || "Tidak Ada", "Lainnya"],
    datasets: [
      {
        data: [data || 0, 1],
        backgroundColor: ["#4CAF50", "#e0e0e0"],
      },
    ],
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Laporan Analisis</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-end mb-6"
      >
        <input
          type="date"
          name="tanggal"
          value={form.tanggal}
          onChange={handleInputChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="nama"
          placeholder="Nama Produk"
          value={form.nama}
          onChange={handleInputChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="jumlah"
          placeholder="Jumlah"
          value={form.jumlah}
          onChange={handleInputChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="harga"
          placeholder="Harga"
          value={form.harga}
          onChange={handleInputChange}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Tambah Data
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded p-4">
          <h4 className="font-medium text-gray-600">Total Pendapatan Bulan Ini</h4>
          <p className="text-green-600 font-bold">
            Rp {laporan.totalPendapatan.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h4 className="font-medium text-gray-600">Total Produk Terjual</h4>
          <p className="text-blue-600 font-bold">{laporan.totalProduk}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h4 className="font-medium text-gray-600">Jumlah Transaksi</h4>
          <p className="text-orange-600 font-bold">{laporan.totalTransaksi}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow rounded p-4">
          <h4 className="font-semibold mb-2">Pendapatan Harian</h4>
          <Line data={lineChartData} />
        </div>
        <div className="bg-white shadow rounded p-4">
          <h4 className="font-semibold mb-2">Statistik Penjualan Bulan Ini</h4>
          <Bar data={barChartData} />
        </div>
      </div>

     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
  <div className="bg-white shadow rounded p-4">
    <h4 className="font-semibold mb-2">Produk Terlaris</h4>
    <div className="w-full flex justify-center">
      <div className="w-[200px] h-[200px]">
        <Doughnut
          data={doughnutData(
            laporan.produkTerlaris?.[0],
            laporan.produkTerlaris?.[1]
          )}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    </div>
  </div>

  <div className="bg-white shadow rounded p-4">
    <h4 className="font-semibold mb-2">Produk Kurang Laku</h4>
    <div className="w-full flex justify-center">
      <div className="w-[200px] h-[200px]">
        <Doughnut
          data={doughnutData(
            laporan.produkKurangLaku?.[0],
            laporan.produkKurangLaku?.[1]
          )}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    </div>
  </div>
</div>


      <div className="bg-white shadow rounded p-4">
        <h4 className="font-semibold mb-3">Riwayat Penjualan Bulan Ini</h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Tanggal</th>
              <th className="p-2">Nama Produk</th>
              <th className="p-2">Jumlah</th>
              <th className="p-2">Harga</th>
              <th className="p-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {penjualan
              .filter((item) => item.tanggal.startsWith(filterBulan))
              .map((item, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2">{item.tanggal}</td>
                  <td className="p-2">{item.nama}</td>
                  <td className="p-2">{item.jumlah}</td>
                  <td className="p-2">Rp {item.harga.toLocaleString("id-ID")}</td>
                  <td className="p-2">Rp {(item.harga * item.jumlah).toLocaleString("id-ID")}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}