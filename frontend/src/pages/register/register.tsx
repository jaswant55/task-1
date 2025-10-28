import { Link, useNavigate } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import type { RegisterForm } from "../../interface/regsiter-interface";
import { register } from "../../services/auth.service";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterForm>({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Register Data:", form);
    try {
      await register(form);
      navigate("/login")
    } catch (err:any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
   <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
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
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Register
        </button>
        <p className="text-sm text-center mt-3">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
