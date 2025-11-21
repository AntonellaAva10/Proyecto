"use client";

import React from "react";
import Login from "@/app/login/page";
import ListadoClientes from "@/app/clientes/page";

export default function Home() {
  const [token, setToken] = React.useState(null);
  React.useEffect(() => {
    const savedToken = window.localStorage.getItem("token");
    setToken(savedToken);
  }, []);

  return <div>{token ? <ListadoClientes /> : <Login />}</div>;
}
