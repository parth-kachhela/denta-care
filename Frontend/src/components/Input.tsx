import { forwardRef } from "react";

interface InputProps {
  placeholder?: string;
  type?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, type = "text" }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className="w-full px-4 py-2 bg-slate-100 rounded-md my-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          placeholder={placeholder}
          ref={ref}
        />
      </div>
    );
  }
);
