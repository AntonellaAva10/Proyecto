"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getServicioById, editarServicios } from "@/lib/Servicio";
import { getPresupuestos } from "@/lib/Presupuesto";
import { getMaquinas } from "@/lib/Maquina";
import { getTecnicos } from "@/lib/Tecnico";

export default function EditServicio() {
  const { id } = useParams();
  const router = useRouter();

  const [servicio, setServicio] = useState(null);
  const [formData, setFormData] = useState({
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const servicioData = await getServicioById(id, token);
        setServicio(servicioData);

        setFormData({
          fecha_inicio: servicioData.fecha_inicio,
          fecha_fin: servicioData.fecha_fin,
          cant_horas: servicioData.cant_horas,
          presupuesto_id: servicioData.presupuesto_id,
          maquina_id: servicioData.maquina_id,
          tecnico_asignado: servicioData.tecnico_asignado || "",
        });

        const [presupuestosData, maquinasData, tecnicosData] =
          await Promise.all([
            getPresupuestos(token),
            getMaquinas(token),
            getTecnicos(token),
          ]);

        setPresupuestos(presupuestosData);
        setMaquinas(maquinasData);
        setTecnicos(tecnicosData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await editarServicios(id, formData, token);
      router.push("/servicios");
    } catch (err) {
      alert("Error al actualizar: " + err.message);
    }
  };

  if (loading) return <p className="p-4">Cargando...</p>;
  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;
  if (!servicio) return <p className="p-4">Servicio no encontrado</p>;

  return (
    <div className="container mx-auto p-8 bg-white text-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Editar Servicio #{servicio.id_servicio}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block font-semibold">Fecha Inicio</label>
          <input
            type="date"
            name="fecha_inicio"
            value={formData.fecha_inicio}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Fecha Fin</label>
          <input
            type="date"
            name="fecha_fin"
            value={formData.fecha_fin}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Cantidad de Horas</label>
          <input
            type="number"
            name="cant_horas"
            value={formData.cant_horas}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Presupuesto</label>
          <select
            name="presupuesto_id"
            value={formData.presupuesto_id}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            required
          >
            <option value="">Seleccionar Presupuesto</option>
            {presupuestos.map((p) => (
              <option key={p.id_presupuesto} value={p.id_presupuesto}>
                #{p.id_presupuesto} - {p.detalle}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold">Máquina</label>
          <select
            name="maquina_id"
            value={formData.maquina_id}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            required
          >
            <option value="">Seleccionar Máquina</option>
            {maquinas.map((m) => (
              <option key={m.id_maquina} value={m.id_maquina}>
                #{m.id_maquina} - {m.modelo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold">Técnico Asignado</label>
          <select
            name="tecnico_asignado"
            value={formData.tecnico_asignado}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="">Seleccionar Técnico</option>
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
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
