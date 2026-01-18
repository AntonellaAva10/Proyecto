"use client";

import { useEffect, useState } from "react";
import { getTecnicos, eliminarTecnico } from "@/lib/Tecnico";
import { useRouter } from "next/navigation";

export default function ListadoTecnicos() {
  const [tecnicos, setTecnicos] = useState([]);
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

    getTecnicos(token)
      .then((data) => setTecnicos(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleEliminar = async (id_tecnico) => {
    if (!confirm("¿Seguro que querés eliminar este técnico?")) return;
    try {
      const token = localStorage.getItem("token");
      await eliminarTecnico(token, id_tecnico);
      setTecnicos(tecnicos.filter((t) => t.id_tecnico !== id_tecnico));
    } catch (err) {
      alert("Error al eliminar: " + err.message);
    }
  };

  if (loading) return <p className="text-gray-800">Cargando técnicos...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="min-h-screen p-8 bg-gray-100 text-gray-800">
      {/* Header listado */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Listado de Técnicos</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          onClick={() => router.push("/tecnicos/create")}
        >
          + Registrar Técnico
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto shadow-lg rounded-lg bg-gray-50">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              {[
                "ID",
                "Nombre",
                "Apellido",
                "Dirección",
                "Email",
                "Teléfono",
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
            {tecnicos.map((tec) => (
              <tr
                key={tec.id_tecnico}
                className="hover:bg-gray-300/20 transition-colors"
              >
                <td className="px-4 py-2">{tec.id_tecnico}</td>
                <td className="px-4 py-2">{tec.nombre}</td>
                <td className="px-4 py-2">{tec.apellido}</td>
                <td className="px-4 py-2">{tec.direccion}</td>
                <td className="px-4 py-2">{tec.mail}</td>
                <td className="px-4 py-2">{tec.telefono}</td>

                <td className="px-4 py-2 space-x-2 flex">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition-colors"
                    onClick={() =>
                      router.push(`/tecnicos/${tec.id_tecnico}/edit`)
                    }
                  >
                    Editar
                  </button>

                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors"
                    onClick={() => handleEliminar(tec.id_tecnico)}
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
