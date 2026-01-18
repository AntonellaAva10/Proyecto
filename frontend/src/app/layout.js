import "./globals.css";
import { AuthProvider } from "./context/authcontext";
import LayoutInterno from "./LayoutInterno";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-[var(--background)] text-[var(--foreground)] font-sans min-h-screen transition-colors duration-300">
        <AuthProvider>
          <LayoutInterno>{children}</LayoutInterno>
        </AuthProvider>
      </body>
    </html>
  );
}
