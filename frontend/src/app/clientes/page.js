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
      await eliminarCliente(id_cliente, token);
      setClientes(clientes.filter((c) => c.id_cliente !== id_cliente));
    } catch (err) {
      alert("Error al eliminar: " + err.message);
    }
  };

  if (loading) return <p className="text-black">Cargando clientes...</p>;
  if (error) return <p className="text-black">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4 bg-white text-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Listado de Clientes</h1>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded mb-4 hover:bg-green-700"
        onClick={() => router.push("/clientes/create")}
      >
        + Registrar Cliente
      </button>
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Razón Social</th>
            <th className="border border-gray-300 p-2">Dirección</th>
            <th className="border border-gray-300 p-2">Contacto</th>
            <th className="border border-gray-300 p-2">CUIT</th>
            <th className="border border-gray-300 p-2">Situación Fiscal</th>
            <th className="border border-gray-300 p-2">Fecha Creación</th>
            <th className="border border-gray-300 p-2">Fecha Actualización</th>
            <th className="border border-gray-300 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id_cliente} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">
                {cliente.id_cliente}
              </td>
              <td className="border border-gray-300 p-2">
                {cliente.razon_social}
              </td>
              <td className="border border-gray-300 p-2">
                {cliente.direccion}
              </td>
              <td className="border border-gray-300 p-2">{cliente.contacto}</td>
              <td className="border border-gray-300 p-2">{cliente.cuit}</td>
              <td className="border border-gray-300 p-2">
                {cliente.situacion_fiscal}
              </td>
              <td className="border border-gray-300 p-2">
                {cliente.fecha_creacion}
              </td>
              <td className="border border-gray-300 p-2">
                {cliente.fecha_actualizacion}
              </td>
              <td className="border border-gray-300 p-2 space-x-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  onClick={() =>
                    router.push(`/clientes/${cliente.id_cliente}/editar`)
                  }
                >
                  Editar
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
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
  );
}
