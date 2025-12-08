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
}) => {
  return (
    <div className="mb-6">
      <label className="block mb-3 text-white/90 font-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 backdrop-blur-sm bg-black/20 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-400/50 text-white placeholder-white/50 transition-all duration-300"
        placeholder={placeholder}
        required={required}
        min={min}
      />
    </div>
  );
};

export default FormField;
