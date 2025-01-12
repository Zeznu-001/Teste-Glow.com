import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormInputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  icon?: LucideIcon;
  required?: boolean;
  placeholder?: string;
}

export default function FormInput({
  label,
  name,
  type,
  value,
  onChange,
  error,
  icon: Icon,
  required = false,
  placeholder
}: FormInputProps) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`w-full p-3 ${Icon ? 'pl-12' : 'pl-4'} border rounded-xl focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-colors duration-200 ${
            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
          }`}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}