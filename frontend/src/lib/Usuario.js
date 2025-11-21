const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function login(usuario, password) {
  try {
    const res = await fetch(`${API_URL}/usuario/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuario, password }),
    });

    // Si el servidor responde con error
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Error ${res.status}: ${text}`);
    }

    const data = await res.json();
    return data; // Contiene token, rol, usuario, etc.
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
}

export async function register(email, password) {
  try {
    const res = await fetch(`${API_URL}/usuario/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      let text;
      try {
        text = await res.text();
      } catch {
        text = "Error desconocido";
      }
      throw new Error(`Error ${res.status}: ${text}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error en registro:", error);
    throw error;
  }
}
