"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCliente } from "../../../lib/Cliente";

export default function RegisterCliente() {
  const [form, setForm] = useState({
    razon_social: "",
    direccion: "",
    contacto: "",
    cuit: "",
    situacion_fiscal: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      await createCliente(form, token);
      router.push("/clientes"); // Volver al listado
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white text-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Registrar Cliente</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label className="block mb-1">Razón Social</label>
          <input
            type="text"
            name="razon_social"
            value={form.razon_social}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Contacto</label>
          <input
            type="text"
            name="contacto"
            value={form.contacto}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">CUIT</label>
          <input
            type="number"
            name="cuit"
            value={form.cuit}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Situación Fiscal</label>
          <input
            type="text"
            name="situacion_fiscal"
            value={form.situacion_fiscal}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Registrar"}
        </button>
      </form>
    </div>
  );
}
