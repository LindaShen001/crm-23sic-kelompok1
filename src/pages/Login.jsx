// src/pages/Login.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase"; // Pastikan path ini benar dan file supabase.js ada

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Ambil user dari Supabase berdasarkan email dan password
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", parseInt(password)) // sesuaikan jika password integer di DB
      .single();

    if (error || !data) {
      setError("Email atau password salah.");
    } else {
      // Arahkan user berdasarkan role
      if (data.role === "admin") {
        navigate("/dashboard");
      } else if (data.role === "customer") {
        navigate("/");
      } else {
        setError("Role tidak dikenali.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md p-8 rounded-xl w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Login</h2>
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
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
