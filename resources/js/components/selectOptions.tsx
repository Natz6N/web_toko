import React, { ChangeEvent } from 'react';
import { Label } from './ui/label';

export interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  required?: boolean;
  className?: string;
  error?: string;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  className = '',
  error,
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={name}>{label}</Label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        <option value="">-- Pilih --</option>
        {options.map((option) => (
          <option key={option.value.toString()} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
