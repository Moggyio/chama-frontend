import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/member");
      }
    } catch {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Chama Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="input mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="input mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} className="btn w-full">
          Login
        </button>
      </div>
    </div>
  );
}
