import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

const RegisterCustomer = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 1. Daftarkan user ke Supabase Auth
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password, // string password
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    const { user } = data;

    // 2. Masukkan data ke tabel users (custom)
    const { error: insertError } = await supabase.from("users").insert([
      {
        id: user.id,
        name: form.name,
        email: form.email,
        password: form.password, // simpan password sebagai string
        role: "customer",
        created_at: new Date().toISOString(),
      },
    ]);

    if (insertError) {
      setError(insertError.message);
    } else {
      alert("Registrasi berhasil! Silakan login.");
      navigate("/login");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-md p-8 rounded-xl w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Registrasi Pengguna
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm mb-1">Nama Lengkap</label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Masukkan Nama Lengkap"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Masukkan Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Masukkan Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Mendaftarkan..." : "Daftar"}
        </button>
      </form>
    </div>
  );
};

export default RegisterCustomer;
