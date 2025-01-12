import React from 'react';

interface FormTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}

export default function FormTextarea({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  placeholder,
  rows = 3
}: FormTextareaProps) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-colors duration-200 ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}