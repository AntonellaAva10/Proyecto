"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createServicio } from "@/lib/Servicio";
import { getPresupuestos } from "@/lib/Presupuesto";
import { getMaquinas } from "@/lib/Maquina";
import { getTecnicos } from "@/lib/Tecnico"; // Asumo que existe

export default function CrearServicio() {
  const router = useRouter();

  const [form, setForm] = useState({
    fecha_inicio: "",
    fecha_fin: "",
    cant_horas: "",
    presupuesto_id: "",
    maquina_id: "",
    tecnico_asignado: "",
  });

  const [presupuestos, setPresupuestos] = useState([]);
  const [maquinas, setMaquinas] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    try {
      const token = localStorage.getItem("token");

      const [pres, maq, tec] = await Promise.all([
        getPresupuestos(token),
        getMaquinas(token),
        getTecnicos(token),
      ]);

      setPresupuestos(pres);
      setMaquinas(maq);
      setTecnicos(tec);
    } catch (err) {
      setError("Error cargando datos: " + err.message);
    }
  }

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
      await createServicio(form, token);
      alert("Servicio registrado con éxito");
      router.push("/servicios");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white text-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Registrar Servicio</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        {/* FECHA INICIO */}
        <div>
          <label className="block mb-1">Fecha Inicio</label>
          <input
            type="date"
            name="fecha_inicio"
            value={form.fecha_inicio}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        {/* FECHA FIN */}
        <div>
          <label className="block mb-1">Fecha Fin</label>
          <input
            type="date"
            name="fecha_fin"
            value={form.fecha_fin}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        {/* HORAS */}
        <div>
          <label className="block mb-1">Cantidad de horas</label>
          <input
            type="number"
            name="cant_horas"
            value={form.cant_horas}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        {/* PRESUPUESTO */}
        <div>
          <label className="block mb-1">Presupuesto asociado</label>
          <select
            name="presupuesto_id"
            value={form.presupuesto_id}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">Seleccionar presupuesto...</option>

            {presupuestos.map((p) => (
              <option key={p.id_presupuesto} value={p.id_presupuesto}>
                #{p.id_presupuesto} — {p.cliente?.razon_social}
              </option>
            ))}
          </select>
        </div>

        {/* MAQUINA */}
        <div>
          <label className="block mb-1">Máquina</label>
          <select
            name="maquina_id"
            value={form.maquina_id}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">Seleccionar máquina...</option>

            {maquinas.map((m) => (
              <option key={m.id_maquina} value={m.id_maquina}>
                {m.modelo} — {m.nro_serie}
              </option>
            ))}
          </select>
        </div>

        {/* TÉCNICO */}
        <div>
          <label className="block mb-1">Técnico asignado</label>
          <select
            name="tecnico_asignado"
            value={form.tecnico_asignado}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">Seleccionar técnico...</option>

            {tecnicos.map((t) => (
              <option key={t.id_tecnico} value={t.id_tecnico}>
                {t.nombre} {t.apellido}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Registrar Servicio"}
        </button>
      </form>
    </div>
  );
}
