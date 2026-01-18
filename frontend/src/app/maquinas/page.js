"use client";

import { useEffect, useState } from "react";
import { getMaquinas, eliminarMaquina } from "@/lib/Maquina";
import { useRouter } from "next/navigation";

export default function ListadoMaquinas() {
  const [maquinas, setMaquinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No se encontró el token de autenticación");
      setLoading(false);
      return;
    }

    getMaquinas(token)
      .then((data) => setMaquinas(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleEliminar = async (id_maquina) => {
    if (!confirm("¿Seguro que querés eliminar esta maquina?")) return;
    try {
      const token = localStorage.getItem("token");
      await eliminarMaquina(token, id_maquina);
      setMaquinas(maquinas.filter((c) => c.id_maquina !== id_maquina));
    } catch (err) {
      alert("Error al eliminar: " + err.message);
    }
  };

  if (loading) return <p className="text-gray-800">Cargando maquinas...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="min-h-screen p-8 bg-gray-100 text-gray-800">
      {/* Header listado */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Listado de Maquinas</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          onClick={() => router.push("/maquinas/create")}
        >
          + Registrar Maquina
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto shadow-lg rounded-lg bg-gray-50">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              {[
                "ID",
                "Modelo",
                "Número de Serie",
                "Cliente (Razón Social)",
                "Fecha Creación",
                "Fecha Actualización",
                "Acciones",
              ].map((title) => (
                <th
                  key={title}
                  className="px-4 py-2 text-left text-sm font-semibold text-gray-800"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {maquinas.map((maquina) => (
              <tr
                key={maquina.id_maquina}
                className="hover:bg-gray-300/20 transition-colors"
              >
                <td className="px-4 py-2">{maquina.id_maquina}</td>
                <td className="px-4 py-2">{maquina.modelo}</td>
                <td className="px-4 py-2">{maquina.nro_serie}</td>

                <td className="px-4 py-2">
                  {maquina.cliente?.razon_social || "—"}
                </td>

                <td className="px-4 py-2">{maquina.fecha_creacion}</td>
                <td className="px-4 py-2">{maquina.fecha_actualizacion}</td>

                <td className="px-4 py-2 space-x-2 flex">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition-colors"
                    onClick={() =>
                      router.push(`/maquinas/${maquina.id_maquina}/edit`)
                    }
                  >
                    Editar
                  </button>

                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors"
                    onClick={() => handleEliminar(maquina.id_maquina)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
