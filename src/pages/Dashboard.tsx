// pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import ShiftPayrollForm from "../components/ShiftPayrollForm";
import { User } from "@supabase/supabase-js";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null); // Inicializar con null
  const [loading, setLoading] = useState(true); // Estado de carga
  const navigate = useNavigate();

  useEffect(() => {
    // Función asíncrona para obtener el usuario y el estado de autenticación
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate("/");
      } else {
        setUser(data.user);
      }
      setLoading(false); // Finalizar carga
    };

    fetchUser();

    // Listener de cambios en el estado de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/");
      } else {
        setUser(session.user);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDF2] text-[#222222] font-semibold">
        Cargando...
      </div>
    );
  }

  return (
    // Contenedor principal con fondo ligero y padding, usando colores de McDonald's
    <div className="min-h-screen p-6 bg-[#FFFDF2] font-inter">
      <div className="flex justify-between items-center mb-8">
        {/* Título del Dashboard con color rojo vibrante */}
        <h1 className="text-4xl font-extrabold text-[#DA291C] drop-shadow-sm">
          Dashboard
        </h1>
        {/* Botón de cerrar sesión, con color oscuro y efecto al pasar el ratón */}
        <button
          onClick={handleLogout}
          className="bg-[#222222] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#333333] transition-colors duration-300 transform hover:scale-105 active:scale-95 shadow-md focus:outline-none"
        >
          Cerrar sesión
        </button>
      </div>

      {user && (
        <div className="text-xl text-[#222222] mb-6">
          Bienvenido, <span className="font-bold text-[#DA291C]">{user.email || 'Usuario'}</span>!
        </div>
      )}

      {/* Componente del formulario de nóminas */}
      <ShiftPayrollForm />
    </div>
  );
}