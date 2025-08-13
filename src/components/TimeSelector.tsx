// components/TimeSelector.tsx
import React from "react";

interface TimeSelectorProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({ label, value, onChange }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
  const minutes = ["00", "15", "30", "45"];

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex gap-2">
        <select
          value={value.split(":")[0]}
          onChange={(e) => onChange(`${e.target.value}:${value.split(":")[1]}`)}
          className="border rounded p-1"
        >
          {hours.map((h) => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
        <select
          value={value.split(":")[1]}
          onChange={(e) => onChange(`${value.split(":")[0]}:${e.target.value}`)}
          className="border rounded p-1"
        >
          {minutes.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TimeSelector;
