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
            onChange={(e) => setHourlyRate(Number(e.target.value))}
            className="border rounded p-1 w-full"
          />
        </label>

        <label className="block">
          Horas festivas
          <input
            type="number"
            value={holidayHours}
            onChange={(e) => setHolidayHours(Number(e.target.value))}
            className="border rounded p-1 w-full"
          />
        </label>

        <label className="block">
          Horas complementarias
          <input
            type="number"
            value={extraHours}
            onChange={(e) => setExtraHours(Number(e.target.value))}
            className="border rounded p-1 w-full"
          />
        </label>

        <label className="block">
          Plus transporte (€)
          <input
            type="number"
            value={plusTransport}
            onChange={(e) => setPlusTransport(Number(e.target.value))}
            className="border rounded p-1 w-full"
          />
        </label>

        <label className="block">
          Plus comida (€)
          <input
            type="number"
            value={plusMeal}
            onChange={(e) => setPlusMeal(Number(e.target.value))}
            className="border rounded p-1 w-full"
          />
        </label>
      </div>

      <div className="mt-6 bg-gray-100 p-4 rounded">
        <p><strong>Salario base:</strong> €{payroll.baseSalary.toFixed(2)}</p>
        <p><strong>Plus nocturnidad:</strong> €{payroll.nightBonus.toFixed(2)}</p>
        <p><strong>Plus festivos:</strong> €{payroll.holidayBonus.toFixed(2)}</p>
        <p><strong>Horas complementarias:</strong> €{payroll.extraBonus.toFixed(2)}</p>
        <p className="text-lg font-bold mt-2">
          Total bruto: €{payroll.total.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
