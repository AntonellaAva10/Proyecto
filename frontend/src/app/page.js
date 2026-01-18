"use client";

import React, { useState, useEffect } from "react";
import Login from "@/app/auth/login/page";
import ListadoClientes from "@/app/clientes/page";

export default function Home() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
  }, []);

  if (!token) return <Login />;

  return (
    <div className="h-screen bg-gray-100 text-black p-8">
      {/* CONTENIDO PRINCIPAL */}
      <ListadoClientes />
    </div>
  );
}
