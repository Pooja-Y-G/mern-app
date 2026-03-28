import React, { useState } from "react";
import { registerUser } from "../api/authRoutes";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password });
      alert("Registered successfully");
      navigate("/login");
    }
    catch (error: unknown) {
  const err = error as { response?: { data?: { message?: string } } };

  const message = err.response?.data?.message || "Registration failed";

  if (message === "User already exists") {
    alert("User already exists. Please login.");
    navigate("/login");
  } else {
    alert(message);
  }
}
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-xl shadow-md w-96">

      <h2 className="text-2xl font-bold text-center mb-6">
        Create Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          type="submit"
        >
          Register
        </button>

      </form>

    </div>
  </div>
);
};

export default Register;
