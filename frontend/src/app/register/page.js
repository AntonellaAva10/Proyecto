"use client";
import { useState } from "react";
import { register } from "@/lib/Usuario";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const data = await register(email, password);
      setSuccess(data.mensaje);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      console.error(err);
      if (err.message.includes("409"))
        setError("Este email ya está registrado");
      else setError(err.message || "Ocurrió un error al registrarse");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-200">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full">
        {/* Título */}
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-6 font-bold">
          Crear Cuenta
        </h1>
        <p className="text-center text-gray-800 mb-6 font-bold">
          Completa los datos para registrarte
        </p>

        {/* Form */}
        <form onSubmit={handleRegistro} className="space-y-5 font-bold">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 font-bold text-gray-900 placeholder-gray-700"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 font-bold text-gray-900 placeholder-gray-700"
          />
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 font-bold text-gray-900 placeholder-gray-700"
          />

          {/* Mensajes */}
          {error && <p className="text-red-500 font-bold">{error}</p>}
          {success && <p className="text-green-500 font-bold">{success}</p>}

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition font-bold"
          >
            Registrarse
          </button>
        </form>

        {/* Link a login */}
        <p className="text-center text-gray-800 text-sm mt-6 font-bold">
          ¿Ya tienes cuenta?{" "}
          <a
            href="/login"
            className="text-purple-600 font-bold hover:underline"
          >
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}
