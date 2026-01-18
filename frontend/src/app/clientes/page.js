"use client";

import { useEffect, useState } from "react";
import { getClientes, eliminarCliente } from "@/lib/Cliente";
import { useRouter } from "next/navigation";

export default function ListadoClientes() {
  const [clientes, setClientes] = useState([]);
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

    getClientes(token)
      .then((data) => setClientes(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleEliminar = async (id_cliente) => {
    if (!confirm("¿Seguro que querés eliminar este cliente?")) return;
    try {
      const token = localStorage.getItem("token");
      await eliminarCliente(token, id_cliente);
      setClientes(clientes.filter((c) => c.id_cliente !== id_cliente));
    } catch (err) {
      alert("Error al eliminar: " + err.message);
    }
  };

  if (loading) return <p className="text-gray-800">Cargando clientes...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="min-h-screen p-8 bg-gray-100 text-gray-800">
      {/* Header listado */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Listado de Clientes</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          onClick={() => router.push("/clientes/create")}
        >
          + Registrar Cliente
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto shadow-lg rounded-lg bg-gray-50">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              {[
                "ID",
                "Razón Social",
                "Dirección",
                "Contacto",
                "CUIT",
                "Situación Fiscal",
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
            {clientes.map((cliente) => (
              <tr
                key={cliente.id_cliente}
                className="hover:bg-gray-300/20 transition-colors"
              >
                <td className="px-4 py-2">{cliente.id_cliente}</td>
                <td className="px-4 py-2">{cliente.razon_social}</td>
                <td className="px-4 py-2">{cliente.direccion}</td>
                <td className="px-4 py-2">{cliente.contacto}</td>
                <td className="px-4 py-2">{cliente.cuit}</td>
                <td className="px-4 py-2">{cliente.situacion_fiscal}</td>
                <td className="px-4 py-2">{cliente.fecha_creacion}</td>
                <td className="px-4 py-2">{cliente.fecha_actualizacion}</td>
                <td className="px-4 py-2 space-x-2 flex">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition-colors"
                    onClick={() =>
                      router.push(`/clientes/${cliente.id_cliente}/editar`)
                    }
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors"
                    onClick={() => handleEliminar(cliente.id_cliente)}
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
