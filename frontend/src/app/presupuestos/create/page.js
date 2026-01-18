"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPresupuesto } from "@/lib/Presupuesto";
import { getClientes } from "@/lib/Cliente";

export default function RegisterPresupuesto() {
  const [form, setForm] = useState({
    cliente_id: "",
    fecha: "",
    detalle: "",
    costo_total: "",
  });

  const [clientes, setClientes] = useState([]);
  const [loadingClientes, setLoadingClientes] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getClientes(token);
        setClientes(data);
      } catch (err) {
        setError("Error cargando clientes");
      } finally {
        setLoadingClientes(false);
      }
    };

    fetchClientes();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      await createPresupuesto(form, token);
      router.push("/presupuestos");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loadingClientes) return <p>Cargando clientes...</p>;

  return (
    <div className="container mx-auto p-4 bg-white text-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Crear Presupuesto</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        {/* Cliente */}
        <div>
          <label className="block mb-1">Cliente</label>
          <select
            name="cliente_id"
            value={form.cliente_id}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">Seleccionar cliente...</option>
            {clientes.map((c) => (
              <option key={c.id_cliente} value={c.id_cliente}>
                {c.razon_social}
              </option>
            ))}
          </select>
        </div>

        {/* Fecha */}
        <div>
          <label className="block mb-1">Fecha</label>
          <input
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Detalle */}
        <div>
          <label className="block mb-1">Detalle</label>
          <textarea
            name="detalle"
            value={form.detalle}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Costo Total */}
        <div>
          <label className="block mb-1">Costo Total</label>
          <input
            type="number"
            name="costo_total"
            value={form.costo_total}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Crear Presupuesto"}
        </button>
      </form>
    </div>
  );
}
