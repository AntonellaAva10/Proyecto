"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getMaquinaById, editarMaquina } from "@/lib/Maquina";
import { getClientes } from "@/lib/Cliente";

export default function EditarMaquinaPage() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState({
    modelo: "",
    nro_serie: "",
    cliente_id: "",
  });

  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    try {
      const token = localStorage.getItem("token");

      // 1️⃣ Cargo clientes
      const clientesData = await getClientes(token);
      setClientes(clientesData);

      // 2️⃣ Cargo datos de la máquina
      const maquina = await getMaquinaById(id, token);

      setForm({
        modelo: maquina.modelo,
        nro_serie: maquina.nro_serie,
        cliente_id: maquina.cliente_id,
      });
    } catch (err) {
      alert("Error al cargar datos: " + err.message);
    } finally {
      setCargando(false);
    }
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await editarMaquina(id, form, token);

      alert("Máquina actualizada correctamente");
      router.push("/maquinas");
    } catch (err) {
      alert("Error al editar: " + err.message);
    }
  }

  if (cargando) return <p>Cargando...</p>;

  return (
    <div className="container mx-auto p-4 bg-white text-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Editar Máquina</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div>
          <label>Modelo</label>
          <input
            name="modelo"
            value={form.modelo}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>Número de serie</label>
          <input
            name="nro_serie"
            value={form.nro_serie}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block mb-1">Cliente</label>
          <select
            name="cliente_id"
            value={form.cliente_id}
            onChange={handleChange}
            className="w-full border p-2 rounded"
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

        <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
