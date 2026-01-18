"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getServicioById } from "@/lib/Servicio";

export default function ServicioDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [servicio, setServicio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServicio = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getServicioById(id, token);
        setServicio(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServicio();
  }, [id]);

  if (loading) return <p className="p-4">Cargando detalles...</p>;
  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;
  if (!servicio) return <p className="p-4">Servicio no encontrado</p>;

  return (
    <div className="container mx-auto p-8 bg-white text-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Detalles del Servicio #{servicio.id_servicio}
      </h1>

      <div className="space-y-4 max-w-xl">
        <p>
          <strong>Fecha Inicio:</strong> {servicio.fecha_inicio}
        </p>
        <p>
          <strong>Fecha Fin:</strong> {servicio.fecha_fin}
        </p>
        <p>
          <strong>Cantidad de Horas:</strong> {servicio.cant_horas}
        </p>

        <p>
          <strong>Presupuesto:</strong>{" "}
          {servicio.presupuesto
            ? `#${servicio.presupuesto.id_presupuesto} - ${servicio.presupuesto.detalle}`
            : "—"}
        </p>

        <p>
          <strong>Máquina:</strong>{" "}
          {servicio.maquina
            ? `#${servicio.maquina.id_maquina} - ${servicio.maquina.modelo}`
            : "—"}
        </p>

        <p>
          <strong>Técnico Asignado:</strong>{" "}
          {servicio.tecnico
            ? `${servicio.tecnico.nombre} ${servicio.tecnico.apellido}`
            : "—"}
        </p>

        <p>
          <strong>Fecha Creación:</strong> {servicio.fecha_creacion}
        </p>
        <p>
          <strong>Fecha Actualización:</strong> {servicio.fecha_actualizacion}
        </p>

        <button
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => router.back()}
        >
          Volver
        </button>
      </div>
    </div>
  );
}
