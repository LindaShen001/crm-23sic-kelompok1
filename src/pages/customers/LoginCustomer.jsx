import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";

const LoginCustomer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  const { data, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) {
    if (loginError.message.includes("Email not confirmed")) {
      setError("Silakan verifikasi email kamu terlebih dahulu.");
    } else {
      setError("Email atau password salah.");
    }
  } else {
    console.log("Login berhasil:", data);
    alert("Login berhasil!");
    navigate("/"); // ganti sesuai halaman customer-mu, misal: navigate("/dashboard-customer");
  }
};



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md p-8 rounded-xl w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">
          Login Customer
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Masukkan Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Masukkan Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
        >
          Login
        </button>
        <p className="text-sm text-center mt-4">
          Belum punya akun?{" "}
          <a href="/register-customer" className="text-purple-600 hover:underline">
            Daftar sekarang
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginCustomer;
