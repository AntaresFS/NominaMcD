// pages/Home.tsx
import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const navigate = useNavigate();

  return (
    // Contenedor principal con fondo ligero y centrado, usando colores de McDonald's
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFDF2] p-4 font-inter">
      {/* Título de la aplicación al estilo McDonald's */}
      <h1 className="text-5xl font-extrabold text-[#DA291C] mb-8 text-center drop-shadow-md">
        Nómina Fácil 🍔
      </h1>

      {/* Componente de formulario de autenticación */}
      <AuthForm mode={mode} onAuthSuccess={() => navigate("/dashboard")} />

      {/* Botón para cambiar entre login y registro, estilizado con colores de McDonald's */}
      <button
        className="mt-6 text-lg font-semibold text-[#222222] hover:text-[#DA291C] transition-colors duration-300 transform hover:scale-105 active:scale-95 focus:outline-none"
        onClick={() => setMode(mode === "login" ? "signup" : "login")}
      >
        {mode === "login" ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
      </button>
    </div>
  );
}
