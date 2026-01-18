"use client";

import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter(); // 🔹 useRouter para redirección

  useEffect(() => {
    setMounted(true);
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("usuario");
    if (savedToken) setToken(savedToken);
    if (savedUser) setUsuario(savedUser);
  }, []);

  const loginUser = (tokenValue, usuarioValue) => {
    if (!tokenValue || !usuarioValue) {
      console.warn("loginUser: token o usuario undefined");
      return;
    }
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("usuario", usuarioValue);
    setToken(tokenValue);
    setUsuario(usuarioValue);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setToken(null);
    setUsuario(null);
    router.push("/auth/login");
  };

  if (!mounted) return null;

  return (
    <AuthContext.Provider value={{ token, usuario, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
