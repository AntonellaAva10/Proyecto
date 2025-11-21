"use client";

import { useState, useEffect } from "react";
import { login } from "../../lib/Usuario";
import { useRouter } from "next/navigation";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [token, setToken] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(usuario, password);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      alert("Login exitoso!");
      router.push("/clientes");
    } catch (err) {
      setError("Credenciales inválidas");
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token2 = localStorage.getItem(localStorage);
      console.log("hola que tal", token2);
      if (token2) setToken(token2);
    }
  }, []);
  useEffect(() => {
    if (token) router.push("/clientes");
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          Bienvenido
        </h1>
        <p className="text-center text-gray-700 mb-8">
          Inicia sesión para continuar
        </p>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-800 font-medium mb-2">
              Usuario
            </label>
            <input
              type="text"
              placeholder="Ingresa tu usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition placeholder-gray-400 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-gray-800 font-medium mb-2">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition placeholder-gray-400 text-gray-900"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Ingresar
          </button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-6">
          ¿No tienes cuenta?{" "}
          <a
            href="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}
