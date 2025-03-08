import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const CustomInput: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm mb-1">{label}</label>
      <input {...props} className="p-2 border rounded" />
    </div>
  );
};

export default CustomInput;
