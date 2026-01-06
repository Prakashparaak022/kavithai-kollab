"use client";

import { Controller, Control, FieldErrors } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";

type FormInputProps = {
  name: string;
  control: Control<any>;
  errors: FieldErrors;
  placeholder: string;
  rules?: any;
  type?: "text" | "password";
  loading?: boolean;
  loaderColor?: string;
};

const FormInput = ({
  name,
  control,
  errors,
  placeholder,
  rules,
  type = "text",
  loading = false,
  loaderColor = "#E5E7EB",
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const error = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div className="relative">
          <input
            {...field}
            type={isPassword && !showPassword ? "password" : "text"}
            placeholder={placeholder}
            disabled={loading}
            className={`w-full px-4 py-2 rounded-lg text-gray-200 text-sm border ${
              error ? "border-red-500" : "border-primary"
            } focus:outline-none`}
          />

          {/* Password toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}

          {/* Loader on the right */}
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <LoadingSpinner size={16} color={loaderColor} />
            </div>
          )}

          {/* Error message */}
          {error && (
            <p className="text-xs text-red-500 mt-1">
              {error.message as string}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default FormInput;
