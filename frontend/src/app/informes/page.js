"use client";

import { useEffect, useState } from "react";
import { getInformes } from "@/lib/Informe";
import { useRouter } from "next/navigation";

export default function ListadoInformes() {
  const [informes, setInformes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return setError("No hay token"), setLoading(false);

    getInformes(token)
      .then((data) => setInformes(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando informes...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl mb-6">Listado de Informes de Servicio</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          onClick={() => router.push("/informes/create")}
        >
          + Crear Servicio
        </button>
      </div>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            {["ID", "Servicio", "Técnico", "Fecha Creación", "Acciones"].map(
              (t) => (
                <th key={t} className="px-4 py-2">
                  {t}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {informes.map((i) => (
            <tr key={i.id_informe} className="hover:bg-gray-100">
              <td className="px-4 py-2">{i.id_informe}</td>
              <td className="px-4 py-2">
                {i.servicio ? `#${i.servicio.id_servicio}` : "—"}
              </td>
              <td className="px-4 py-2">
                {i.tecnico ? `${i.tecnico.nombre} ${i.tecnico.apellido}` : "—"}
              </td>
              <td className="px-4 py-2">{i.fecha_creacion}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() =>
                    router.push(`/informes/${i.id_informe}/details`)
                  }
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Detalles
                </button>
                <button
                  onClick={() => {
                    import("jspdf").then(({ jsPDF }) => {
                      const doc = new jsPDF();
                      doc.text(`Informe #${i.id_informe}`, 10, 10);
                      doc.text(
                        `Servicio: #${i.servicio?.id_servicio || "—"}`,
                        10,
                        20
                      );
                      doc.text(
                        `Técnico: ${i.tecnico?.nombre} ${
                          i.tecnico?.apellido || ""
                        }`,
                        10,
                        30
                      );
                      doc.text(`Trabajo: ${i.descripcion_trabajo}`, 10, 40);
                      doc.text(
                        `Observaciones: ${i.observaciones || "—"}`,
                        10,
                        50
                      );
                      doc.save(`Informe_${i.id_informe}.pdf`);
                    });
                  }}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Generar PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
