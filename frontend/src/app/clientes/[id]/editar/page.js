"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getClientes, editarCliente } from "@/lib/Cliente";

export default function EditarClientePage() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState({
    razon_social: "",
    direccion: "",
    contacto: "",
    cuit: "",
    situacion_fiscal: "",
  });

  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarCliente();
  }, []);

  async function cargarCliente() {
    try {
      const token = localStorage.getItem("token");
      const cliente = await getClientes(id, token);
      setForm(cliente);
    } catch (err) {
      alert("Error al cargar el cliente: " + err.message);
    } finally {
      setCargando(false);
    }
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await editarCliente(id, form, token);
      alert("Cliente actualizado correctamente");
      router.push("/clientes");
    } catch (err) {
      alert("Error al editar: " + err.message);
    }
  }

  if (cargando) return <p>Cargando...</p>;

  return (
    <div className="container mx-auto p-4 bg-white text-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Editar Cliente</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div>
          <label>Razón Social</label>
          <input
            name="razon_social"
            value={form.razon_social}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>Dirección</label>
          <input
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>Contacto</label>
          <input
            name="contacto"
            value={form.contacto}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>CUIT</label>
          <input
            name="cuit"
            value={form.cuit}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>Situación Fiscal</label>
          <input
            name="situacion_fiscal"
            value={form.situacion_fiscal}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
