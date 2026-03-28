import React, { useState } from "react";
import { loginUser } from "../api/authRoutes";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { login } from "../features/authSlice";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem("token", res.data.token);
      dispatch(login({ email, password }));
      navigate("/dashboard");
    }
    catch (error: unknown) {
  const err = error as { response?: { data?: { message?: string } } };
  alert(err.response?.data?.message || "Login failed");
}
    // catch (error: any) {
    //   alert(error.response?.data?.message || "Login failed");
    // }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">

    <div className="bg-white p-8 rounded-xl shadow-md w-96">

      <h2 className="text-2xl font-bold text-center mb-6">
        Login
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          type="submit"
        >
          Login
        </button>

      </form>

    </div>

  </div>
);
};

export default Login;
