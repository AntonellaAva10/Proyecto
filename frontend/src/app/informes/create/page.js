"use client";

import { useState, useEffect } from "react";
import { createInforme } from "@/lib/Informe";
import { useRouter } from "next/navigation";

export default function CreateInformes() {
  const [descripcion, setDescripcion] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [servicioId, setServicioId] = useState("");
  const [tecnicoId, setTecnicoId] = useState("");

  const [servicios, setServicios] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  // 🔹 Cargar servicios y técnicos desde tu backend
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/servicios`)
      .then((res) => res.json())
      .then((data) => setServicios(data))
      .catch((e) => console.log("Error cargando servicios", e));

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tecnicos`)
      .then((res) => res.json())
      .then((data) => setTecnicos(data))
      .catch((e) => console.log("Error cargando técnicos", e));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    if (!descripcion || !observaciones || !servicioId || !tecnicoId) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const data = {
        descripcion_trabajo: descripcion,
        observaciones,
        servicio_id: servicioId,
        tecnico_id: tecnicoId,
      };

      await createInforme(data, token);

      setMensaje("Informe creado con éxito ✔️");

      setDescripcion("");
      setObservaciones("");
      setServicioId("");
      setTecnicoId("");
      router.push("/informes");
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Crear Informe</h1>

      {mensaje && <p className="text-green-600 mb-3">{mensaje}</p>}
      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Descripción */}
        <div>
          <label className="block font-semibold">
            Descripción del trabajo:
          </label>
          <input
            type="text"
            className="border p-2 rounded w-full"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        {/* Observaciones */}
        <div>
          <label className="block font-semibold">Observaciones:</label>
          <input
            type="text"
            className="border p-2 rounded w-full"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />
        </div>

        {/* Servicio */}
        <div>
          <label className="block font-semibold">Servicio:</label>
          <select
            className="border p-2 rounded w-full"
            value={servicioId}
            onChange={(e) => setServicioId(e.target.value)}
          >
            <option value="">Seleccionar servicio</option>
            {servicios.map((s) => (
              <option key={s.id_servicio} value={s.id_servicio}>
                {s.id_servicio}
              </option>
            ))}
          </select>
        </div>

        {/* Técnico */}
        <div>
          <label className="block font-semibold">Técnico:</label>
          <select
            className="border p-2 rounded w-full"
            value={tecnicoId}
            onChange={(e) => setTecnicoId(e.target.value)}
          >
            <option value="">Seleccionar técnico</option>
            {tecnicos.map((t) => (
              <option key={t.id_tecnico} value={t.id_tecnico}>
                {t.nombre} {t.apellido}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Crear Informe
        </button>
      </form>
    </div>
  );
}
