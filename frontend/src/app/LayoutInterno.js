"use client";

import "./globals.css";
import { useContext, useState } from "react";
import { AuthContext } from "./context/authcontext";
import { useRouter, usePathname } from "next/navigation";

export default function LayoutInterno({ children }) {
  const { token, usuario, logoutUser } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const isAuthPage = pathname.startsWith("/auth");

  // Icono hamburguesa
  const MenuIcon = ({ open }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="#1f2937"
      className="w-6 h-6 transition-transform duration-300"
      style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Overlay */}
      {sidebarOpen && token && !isAuthPage && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-opacity-10 backdrop-blur-lg z-40 transition-opacity duration-300"
        />
      )}

      {/* Botón hamburguesa */}
      {token && !isAuthPage && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-6 left-6 z-50 bg-gray-200 shadow-lg p-4 rounded-lg hover:bg-gray-300 transition-transform duration-300"
        >
          <MenuIcon open={sidebarOpen} />
        </button>
      )}

      {/* Sidebar */}
      {token && !isAuthPage && (
        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-gray-50 shadow-lg p-6 z-50 border-r border-gray-200
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <h2 className="text-2xl font-bold mb-8 text-gray-800">Menú</h2>
          <ul className="flex flex-col gap-4 mt-4">
            {[
              { name: "Usuarios", path: "/usuarios" },
              { name: "Clientes", path: "/clientes" },
              { name: "Máquinas", path: "/maquinas" },
              { name: "Servicios", path: "/servicios" },
              { name: "Tecnicos", path: "/tecnicos" },
              { name: "Facturas", path: "/facturas" },
              { name: "Presupuestos", path: "/presupuestos" },
              { name: "Informes de Servicios", path: "/informes" },
            ].map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => {
                    router.push(item.path);
                    setSidebarOpen(false);
                  }}
                  className="w-full text-left py-3 px-4 rounded hover:bg-gray-200 transition-colors duration-200 text-gray-800 font-medium"
                >
                  {item.name}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  logoutUser();
                  setShowDropdown(false);
                }}
                className="mt-6 w-full text-left py-3 px-4 rounded hover:bg-red-100 text-red-600 font-medium transition-colors duration-200"
              >
                Cerrar sesión
              </button>
            </li>
          </ul>
        </aside>
      )}

      {/* Header */}
      {!isAuthPage && (
        <header className="fixed top-0 left-0 right-0 h-28 bg-gray-200 shadow flex items-center justify-end px-12 z-30">
          {!token ? (
            <button
              onClick={() => router.push("/auth/login")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
            >
              Iniciar sesión
            </button>
          ) : (
            <div className="relative">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-indigo-200 text-gray-800 rounded-lg shadow hover:bg-indigo-300 transition font-medium"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {usuario || "undefined"}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg py-2 z-50">
                  <button
                    onClick={() => {
                      logoutUser();
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 font-medium transition-colors duration-200"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}
        </header>
      )}

      {/* Contenido */}
      <main
        className={`flex-1 p-8 transition-all ${
          !isAuthPage ? "pt-36" : "pt-0"
        } w-full text-gray-800`}
      >
        {children}
      </main>
    </div>
  );
}
