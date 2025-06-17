import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "linda@email.com" && password === "123") {
      navigate("/dashboard");
    } else {
      setError("Email atau password salah.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md p-8 rounded-xl w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">Login Admin</h2>
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
      </form>
    </div>
  );
};

export default Login;
