// src/components/AuthForm.tsx
import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface AuthFormProps {
  mode: "login" | "signup";
  onAuthSuccess: () => void;
}

export default function AuthForm({ mode, onAuthSuccess }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage(`¡${mode === "login" ? "Inicio de sesión exitoso!" : "Registro exitoso! Revisa tu email para verificar."}`);
      if (mode === "login") {
        onAuthSuccess();
      }
    }
    setLoading(false);
  };

  return (
    // Contenedor del formulario con esquinas redondeadas, sombra y borde
    <div className="bg-white p-8 rounded-xl shadow-xl max-w-sm w-full border border-gray-200">
      {/* Título del formulario con color oscuro */}
      <h2 className="text-3xl font-bold text-[#222222] mb-6 text-center">
        {mode === "login" ? "Iniciar Sesión" : "Regístrate"}
      </h2>
      <form onSubmit={handleAuth}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FFC72C] transition-colors duration-200"
            placeholder="tu.email@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FFC72C] transition-colors duration-200"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Botón de envío con el color rojo de McDonald's y efecto al pasar el ratón */}
        <button
          type="submit"
          className="w-full bg-[#DA291C] text-white py-3 rounded-lg font-bold hover:bg-[#BF0A0A] transition-colors duration-300 transform hover:scale-105 active:scale-95 shadow-md focus:outline-none"
          disabled={loading}
        >
          {loading ? "Cargando..." : mode === "login" ? "Iniciar Sesión" : "Regístrate"}
        </button>
      </form>
      {message && (
        <p className={`mt-4 text-center ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
