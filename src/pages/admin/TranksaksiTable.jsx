import React, { useState } from "react";

export default function TransaksiTable() {
  const [transaksi, setTransaksi] = useState([
    {
      id: 1,
      namaPelanggan: "Andi",
      namaObat: "Paracetamol",
      jenisObat: "Tablet",
      diskon: 10,
      metodePembayaran: "Tunai",
      totalPesanan: 50000,
      namaKasir: "Kasir A",
    },
    {
      id: 2,
      namaPelanggan: "Budi",
      namaObat: "Amoxicillin",
      jenisObat: "Kapsul",
      diskon: 5,
      metodePembayaran: "Transfer",
      totalPesanan: 75000,
      namaKasir: "Kasir B",
    },
  ]);

  const [form, setForm] = useState({
    id: null,
    namaPelanggan: "",
    namaObat: "",
    jenisObat: "",
    diskon: "",
    metodePembayaran: "",
    totalPesanan: "",
    namaKasir: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmpty = Object.values(form).some((v) => v === "");
    if (isEmpty) {
      alert("Harap lengkapi semua kolom.");
      return;
    }

    const formatted = {
      ...form,
      diskon: Number(form.diskon),
      totalPesanan: Number(form.totalPesanan),
    };

    if (isEditing) {
      setTransaksi((prev) => prev.map((t) => (t.id === form.id ? formatted : t)));
      setIsEditing(false);
    } else {
      formatted.id = transaksi.length ? transaksi[transaksi.length - 1].id + 1 : 1;
      setTransaksi((prev) => [...prev, formatted]);
    }

    setForm({
      id: null,
      namaPelanggan: "",
      namaObat: "",
      jenisObat: "",
      diskon: "",
      metodePembayaran: "",
      totalPesanan: "",
      namaKasir: "",
    });
  };

  const hapusTransaksi = (id) => {
    if (window.confirm("Yakin ingin menghapus transaksi ini?")) {
      setTransaksi((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const editTransaksi = (id) => {
    const trx = transaksi.find((t) => t.id === id);
    setForm(trx);
    setIsEditing(true);
  };

  const batal = () => {
    setForm({
      id: null,
      namaPelanggan: "",
      namaObat: "",
      jenisObat: "",
      diskon: "",
      metodePembayaran: "",
      totalPesanan: "",
      namaKasir: "",
    });
    setIsEditing(false);
  };

  const styles = {
    container: {
      maxWidth: 1000,
      margin: "30px auto",
      padding: "30px",
      background: "#f4f6f8",
      fontFamily: "Segoe UI, sans-serif",
      borderRadius: 10,
      boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
    },
    title: {
      textAlign: "center",
      fontSize: 24,
      fontWeight: "600",
      marginBottom: 30,
      color: "#2d3748",
    },
    form: {
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 20,
      marginBottom: 30,
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    },
    formGroup: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 20,
      marginBottom: 20,
    },
    label: {
      marginBottom: 5,
      color: "#4a5568",
      fontWeight: 600,
    },
    input: {
      padding: "10px",
      borderRadius: 6,
      border: "1px solid #cbd5e0",
      fontSize: 14,
      width: "100%",
    },
    actions: {
      marginTop: 20,
    },
    primaryBtn: {
      backgroundColor: "#2b6cb0",
      color: "#fff",
      padding: "10px 18px",
      borderRadius: 6,
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
      marginRight: 10,
    },
    secondaryBtn: {
      backgroundColor: "#a0aec0",
      color: "#fff",
      padding: "10px 18px",
      borderRadius: 6,
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "#fff",
      borderRadius: 10,
      overflow: "hidden",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    },
    th: {
      backgroundColor: "#2b6cb0",
      color: "#fff",
      padding: "12px 10px",
      fontWeight: 600,
      fontSize: 14,
      textAlign: "left",
    },
    td: {
      padding: "10px",
      borderBottom: "1px solid #e2e8f0",
      fontSize: 14,
      color: "#2d3748",
    },
    actionBtn: {
      padding: "6px 12px",
      borderRadius: 5,
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer",
      marginRight: 6,
      border: "none",
    },
    editBtn: {
      backgroundColor: "#ecc94b",
      color: "#1a202c",
    },
    deleteBtn: {
      backgroundColor: "#e53e3e",
      color: "#fff",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Manajemen Transaksi</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <div>
            <label style={styles.label}>Nama Pelanggan</label>
            <input type="text" name="namaPelanggan" value={form.namaPelanggan} onChange={handleChange} style={styles.input} />
          </div>
          <div>
            <label style={styles.label}>Nama Obat</label>
            <input type="text" name="namaObat" value={form.namaObat} onChange={handleChange} style={styles.input} />
          </div>
          <div>
            <label style={styles.label}>Jenis Obat</label>
            <input type="text" name="jenisObat" value={form.jenisObat} onChange={handleChange} style={styles.input} />
          </div>
          <div>
            <label style={styles.label}>Diskon (%)</label>
            <input type="number" name="diskon" value={form.diskon} onChange={handleChange} style={styles.input} />
          </div>
          <div>
            <label style={styles.label}>Metode Pembayaran</label>
            <input type="text" name="metodePembayaran" value={form.metodePembayaran} onChange={handleChange} style={styles.input} />
          </div>
          <div>
            <label style={styles.label}>Total Pesanan</label>
            <input type="number" name="totalPesanan" value={form.totalPesanan} onChange={handleChange} style={styles.input} />
          </div>
          <div>
            <label style={styles.label}>Nama Kasir</label>
            <input type="text" name="namaKasir" value={form.namaKasir} onChange={handleChange} style={styles.input} />
          </div>
        </div>

        <div style={styles.actions}>
          <button type="submit" style={styles.primaryBtn}>
            {isEditing ? "Perbarui Transaksi" : "Simpan Transaksi"}
          </button>
          {isEditing && (
            <button type="button" onClick={batal} style={styles.secondaryBtn}>
              Batal
            </button>
          )}
        </div>
      </form>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>No</th>
            <th style={styles.th}>Nama Pelanggan</th>
            <th style={styles.th}>Nama Obat</th>
            <th style={styles.th}>Jenis Obat</th>
            <th style={styles.th}>Diskon</th>
            <th style={styles.th}>Metode</th>
            <th style={styles.th}>Total</th>
            <th style={styles.th}>Kasir</th>
            <th style={styles.th}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {transaksi.length === 0 ? (
            <tr>
              <td colSpan="9" style={{ textAlign: "center", padding: 20 }}>
                Belum ada data transaksi.
              </td>
            </tr>
          ) : (
            transaksi.map((t, i) => (
              <tr key={t.id} style={{ transition: "background 0.2s" }}>
                <td style={styles.td}>{i + 1}</td>
                <td style={styles.td}>{t.namaPelanggan}</td>
                <td style={styles.td}>{t.namaObat}</td>
                <td style={styles.td}>{t.jenisObat}</td>
                <td style={styles.td}>{t.diskon}%</td>
                <td style={styles.td}>{t.metodePembayaran}</td>
                <td style={styles.td}>Rp {t.totalPesanan.toLocaleString("id-ID")}</td>
                <td style={styles.td}>{t.namaKasir}</td>
                <td style={styles.td}>
                  <button onClick={() => editTransaksi(t.id)} style={{ ...styles.actionBtn, ...styles.editBtn }}>
                    Edit
                  </button>
                  <button onClick={() => hapusTransaksi(t.id)} style={{ ...styles.actionBtn, ...styles.deleteBtn }}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
