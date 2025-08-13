// components/ShiftPayrollForm.tsx
import React, { useState, useMemo } from "react";
import TimeSelector from "./TimeSelector";
import { calculatePayroll } from "../lib/payrollCalculator";

// Función para calcular horas entre dos horas (maneja paso de medianoche)
function getHoursBetween(start: string, end: string) {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  let startMinutes = sh * 60 + sm;
  let endMinutes = eh * 60 + em;

  if (endMinutes < startMinutes) {
    // Caso pasa medianoche
    endMinutes += 24 * 60;
  }

  return (endMinutes - startMinutes) / 60;
}

// Determina si una hora está en franja nocturna (22:00 - 06:00)
function countNightHours(start: string, end: string) {
  let total = 0;
  let current = start;
  while (current !== end) {
    const [h, m] = current.split(":").map(Number);
    if (h >= 22 || h < 6) {
      total += 0.25; // cada bloque de 15 min = 0.25h
    }
    // Avanzar 15 min
    let newM = m + 15;
    let newH = h;
    if (newM >= 60) {
      newM -= 60;
      newH = (h + 1) % 24;
    }
    current = `${String(newH).padStart(2, "0")}:${String(newM).padStart(2, "0")}`;
  }
  return total;
}

export default function ShiftPayrollForm() {
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("17:00");
  const [hourlyRate, setHourlyRate] = useState(10);
  const [holidayHours, setHolidayHours] = useState(0);
  const [extraHours, setExtraHours] = useState(0);
  const [plusTransport, setPlusTransport] = useState(0);
  const [plusMeal, setPlusMeal] = useState(0);

  const payroll = useMemo(() => {
    const totalHours = getHoursBetween(start, end);
    const nightHours = countNightHours(start, end);

    return calculatePayroll({
      hourlyRate,
      regularHours: totalHours - nightHours,
      nightHours,
      holidayHours,
      extraHours,
      plusTransport,
      plusMeal,
    });
  }, [start, end, hourlyRate, holidayHours, extraHours, plusTransport, plusMeal]);

  return (
    <div className="p-6 max-w-lg mx-auto border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Cálculo de Nómina</h2>

      <TimeSelector label="Hora de inicio" value={start} onChange={setStart} />
      <TimeSelector label="Hora de fin" value={end} onChange={setEnd} />

      <div className="mt-4 space-y-2">
        <label className="block">
          Salario por hora (€)
          <input
            type="number"
            value={hourlyRate}
            onChang
