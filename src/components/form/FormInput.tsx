"use client";

import {
  Controller,
  Control,
  FieldErrors,
  RegisterOptions,
  FieldValues,
  Path,
} from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";

type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  placeholder: string;
  rules?: RegisterOptions<T, Path<T>>;
  type?: "text" | "password";
  loading?: boolean;
  loaderColor?: string;
  variant?: string;
  textColor?: string;
};

function FormInput<T extends FieldValues>({
  name,
  control,
  errors,
  placeholder,
  rules,
  type = "text",
  loading = false,
  loaderColor = "#E5E7EB",
  variant = "primary",
  textColor = "text-secondary",
}: FormInputProps<T>) {
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
            className={`w-full px-4 py-2 rounded-lg ${textColor} text-sm border ${
              error ? "border-red-500" : `border-${variant}`
            } focus:outline-none`}
          />

          {/* Password toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${textColor}`}>
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
}

export default FormInput;
