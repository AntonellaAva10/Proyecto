"use client";

import { useEffect, useState } from "react";
import { getServicios, eliminarServicio } from "@/lib/Servicio";
import { useRouter } from "next/navigation";

export default function ListadoServicios() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No se encontró token");
      setLoading(false);
      return;
    }

    getServicios(token)
      .then((data) => setServicios(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleEliminar = async (id_servicio) => {
    if (!confirm("¿Seguro que querés eliminar este servicio?")) return;

    try {
      const token = localStorage.getItem("token");
      await eliminarServicio(token, id_servicio);
      setServicios(servicios.filter((s) => s.id_servicio !== id_servicio));
    } catch (err) {
      alert("Error al eliminar: " + err.message);
    }
  };

  if (loading) return <p>Cargando servicios...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="min-h-screen p-8 bg-gray-100 text-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Listado de Servicios</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          onClick={() => router.push("/servicios/create")}
        >
          + Crear Servicio
        </button>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-gray-50">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              {[
                "ID",
                "Fecha Inicio",
                "Fecha Fin",
                "Horas",
                "Creación",
                "Actualización",
                "Acciones",
              ].map((t) => (
                <th
                  key={t}
                  className="px-4 py-2 text-left text-sm font-semibold text-gray-800"
                >
                  {t}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {servicios.map((s) => (
              <tr key={s.id_servicio} className="hover:bg-gray-300/20">
                <td className="px-4 py-2">{s.id_servicio}</td>
                <td className="px-4 py-2">{s.fecha_inicio}</td>
                <td className="px-4 py-2">{s.fecha_fin}</td>
                <td className="px-4 py-2">{s.cant_horas}</td>
                <td className="px-4 py-2">{s.fecha_creacion}</td>
                <td className="px-4 py-2">{s.fecha_actualizacion}</td>

                <td className="px-4 py-2 flex space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                    onClick={() =>
                      router.push(`/servicios/${s.id_servicio}/details`)
                    }
                  >
                    Detalles
                  </button>

                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                    onClick={() =>
                      router.push(`/servicios/${s.id_servicio}/edit`)
                    }
                  >
                    Editar
                  </button>

                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                    onClick={() => handleEliminar(s.id_servicio)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

            {servicios.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center p-4 text-gray-500">
                  No hay servicios cargados aún.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
