import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/auth.service";
import type { LoginForm } from "../../interface/login-interface";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/store/auth.slice";


export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await login(form);
      console.log('data',data)
    //   localStorage.setItem("token", data.token);
    dispatch(setToken(data.access_token));
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Login
        </button>
        <p className="text-sm text-center mt-3">
          Don’t have an account? <Link to="/register" className="text-blue-600">Register</Link>
        </p>
      </form>
    </div>
  );
}
