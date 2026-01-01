import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        form
      );

      setSuccess("Registration successful. You can now login.");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      if (err.response?.status === 409) {
        setError("Email already exists. Please login instead.");
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            name="full_name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full mb-3 p-2 border rounded"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full mb-3 p-2 border rounded"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            required
            className="w-full mb-3 p-2 border rounded"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full mb-4 p-2 border rounded"
          />

          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
