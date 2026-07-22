import React from "react";

interface FormFieldProps {
  label: string;
  type: "text" | "number";
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  min?: string;
  autoFocus?: boolean;
  autoComplete?: string;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  min,
  autoFocus,
  autoComplete = "off",
  error,
}) => {
  return (
    <div className="mb-5">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-600 ${
          error
            ? "border-red-400 dark:border-red-500 focus:border-red-500 focus:ring-red-500/50"
            : "border-slate-200 dark:border-slate-700"
        }`}
        placeholder={placeholder}
        required={required}
        min={min}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
