import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", {
        full_name: fullName,
        email,
        phone,
        password
      });

      alert("Registration successful. Please log in.");
      navigate("/");
    } catch (err) {
      alert("Registration failed. Email may already exist.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        <input
          className="input mb-3"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          className="input mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input mb-3"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="password"
          className="input mb-5"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister} className="btn w-full">
          Register
        </button>
      </div>
    </div>
  );
}
