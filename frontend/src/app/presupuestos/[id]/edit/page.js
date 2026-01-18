"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getPresupuestoById, editarPresupuesto } from "@/lib/Presupuesto";
import { getClientes } from "@/lib/Cliente";

export default function EditarPresupuestoPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    cliente_id: "",
    fecha: "",
    estado: "",
    detalle: "",
    costo_total: "",
  });

  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    try {
      const token = localStorage.getItem("token");

      const clientesData = await getClientes(token);
      setClientes(clientesData);

      const presupuesto = await getPresupuestoById(id, token);

      setForm({
        cliente_id: presupuesto.cliente_id,
        fecha: presupuesto.fecha,
        estado: presupuesto.estado,
        detalle: presupuesto.detalle,
        costo_total: presupuesto.costo_total,
      });
    } catch (err) {
      alert("Error al cargar: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await editarPresupuesto(id, form, token);
      alert("Presupuesto actualizado");
      router.push("/presupuestos");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="p-4 min-h-screen bg-white text-black">
      <h1 className="text-2xl font-bold mb-4">Editar Presupuesto</h1>

      <form onSubmit={handleSubmit} className="grid gap-4 max-w-xl">
        <div>
          <label>Cliente</label>
          <select
            name="cliente_id"
            value={form.cliente_id}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          >
            <option value="">Seleccionar cliente...</option>
            {clientes.map((c) => (
              <option key={c.id_cliente} value={c.id_cliente}>
                {c.razon_social}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Fecha</label>
          <input
            type="date"
            name="fecha"
            className="border p-2 w-full"
            value={form.fecha}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Estado</label>
          <input
            type="text"
            name="estado"
            className="border p-2 w-full"
            value={form.estado}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Detalle</label>
          <textarea
            name="detalle"
            className="border p-2 w-full"
            value={form.detalle}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <label>Costo Total</label>
          <input
            type="number"
            name="costo_total"
            className="border p-2 w-full"
            value={form.costo_total}
            onChange={handleChange}
            required
          />
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
