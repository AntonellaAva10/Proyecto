"use client";

import { useEffect, useState } from "react";
import { getPresupuestos, eliminarPresupuesto } from "@/lib/Presupuesto";
import { useRouter } from "next/navigation";

export default function ListadoPresupuestos() {
  const [presupuestos, setPresupuestos] = useState([]);
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

    getPresupuestos(token)
      .then((data) => setPresupuestos(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleEliminar = async (id_presupuesto) => {
    if (!confirm("¿Seguro que querés eliminar este presupuesto?")) return;

    try {
      const token = localStorage.getItem("token");
      await eliminarPresupuesto(token, id_presupuesto);
      setPresupuestos(
        presupuestos.filter((p) => p.id_presupuesto !== id_presupuesto)
      );
    } catch (err) {
      alert("Error al eliminar: " + err.message);
    }
  };

  if (loading) return <p className="text-gray-800">Cargando presupuestos...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  // 🔥 Separar presupuestos por estado
  const pendientes = presupuestos.filter((p) => p.estado === "pendiente");
  const finalizados = presupuestos.filter((p) => p.estado === "finalizado");
  const rechazados = presupuestos.filter((p) => p.estado === "rechazado");

  // 👉 Función reutilizable para pintar una tabla
  const renderTabla = (titulo, items, color) => (
    <div className="mb-10">
      <h2 className={`text-2xl font-bold mb-4 ${color}`}>{titulo}</h2>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-gray-50">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              {[
                "ID",
                "Cliente",
                "Fecha",
                "Estado",
                "Costo Total",
                "Fecha Creación",
                "Fecha Actualización",
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
            {items.map((p) => (
              <tr key={p.id_presupuesto} className="hover:bg-gray-300/20">
                <td className="px-4 py-2">{p.id_presupuesto}</td>
                <td className="px-4 py-2">{p.cliente?.razon_social || "—"}</td>
                <td className="px-4 py-2">{p.fecha}</td>
                <td className="px-4 py-2">{p.estado}</td>
                <td className="px-4 py-2">${p.costo_total}</td>
                <td className="px-4 py-2">{p.fecha_creacion}</td>
                <td className="px-4 py-2">{p.fecha_actualizacion}</td>

                <td className="px-4 py-2 flex space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                    onClick={() =>
                      router.push(`/presupuestos/${p.id_presupuesto}/edit`)
                    }
                  >
                    Editar
                  </button>

                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                    onClick={() => handleEliminar(p.id_presupuesto)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

            {items.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="text-center text-gray-500 p-4 italic"
                >
                  No hay presupuestos en esta categoría
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-8 bg-gray-100 text-gray-800">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold">Gestión de Presupuestos</h1>

        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          onClick={() => router.push("/presupuestos/create")}
        >
          + Crear Presupuesto
        </button>
      </div>

      {renderTabla("Pendientes", pendientes, "text-yellow-600")}
      {renderTabla("Finalizados", finalizados, "text-green-700")}
      {renderTabla("Rechazados", rechazados, "text-red-700")}
    </div>
  );
}
