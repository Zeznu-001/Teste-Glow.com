import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { title: string; price: string }[];
  error?: string;
  icon?: LucideIcon;
  required?: boolean;
}

export default function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  error,
  icon: Icon,
  required = false
}: FormSelectProps) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />}
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full p-3 ${Icon ? 'pl-12' : 'pl-4'} border rounded-xl focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-colors duration-200 ${
            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
          } appearance-none bg-white`}
        >
          <option value="">Select {label}</option>
          {options.map((option, index) => (
            <option key={index} value={option.title}>
              {option.title} - {option.price}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}