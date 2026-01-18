"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/authcontext";
import { login } from "@/lib/Usuario";

export default function Page() {
  const router = useRouter();
  const { loginUser } = useContext(AuthContext);
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(usuario, password);

      const nombreUsuario = data.username || data.usuario || "Usuario";

      loginUser(data.token, nombreUsuario);
      router.push("/clientes");
    } catch (err) {
      console.error(err);
      setError("Credenciales inválidas");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 transition-colors">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full transform transition-all duration-300 hover:scale-[1.01]">
        <h1 className="text-3xl font-extrabold text-center text-black mb-6">
          Bienvenido
        </h1>
        <p className="text-center text-black mb-8">
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
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-200 placeholder-gray-400 text-gray-900"
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
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-200 placeholder-gray-400 text-gray-900"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-md"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
