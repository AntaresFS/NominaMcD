// lib/payrollCalculator.ts
interface PayrollInput {
  hourlyRate: number; // salario base por hora
  regularHours: number; // horas normales
  nightHours: number; // horas nocturnas
  holidayHours: number; // horas festivas
  extraHours: number; // horas complementarias
  plusTransport: number; // importe fijo
  plusMeal: number; // importe fijo
}

interface PayrollOutput {
  baseSalary: number;
  nightBonus: number;
  holidayBonus: number;
  extraBonus: number;
  total: number;
}

export function calculatePayroll(input: PayrollInput): PayrollOutput {
  const baseSalary = input.regularHours * input.hourlyRate;

  // Ejemplo: nocturnidad +20%
  const nightBonus = input.nightHours * input.hourlyRate * 0.2;

  // Ejemplo: festivo +75%
  const holidayBonus = input.holidayHours * input.hourlyRate * 0.75;

  // Ejemplo: horas complementarias +25%
  const extraBonus = input.extraHours * input.hourlyRate * 0.25;

  const total =
    baseSalary +
    nightBonus +
    holidayBonus +
    extraBonus +
    input.plusTransport +
    input.plusMeal;

  return {
    baseSalary,
    nightBonus,
    holidayBonus,
    extraBonus,
    total,
  };
}
