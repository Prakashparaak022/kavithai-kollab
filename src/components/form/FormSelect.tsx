"use client";

import { Controller, Control, FieldErrors } from "react-hook-form";
import LoadingSpinner from "../ui/LoadingSpinner";

type FormSelectProps<T = any> = {
  name: string;
  control: Control<any>;
  errors: FieldErrors;
  options: T[];
  placeholder?: string;
  rules?: any;
  labelKey?: keyof T;
  valueKey?: keyof T;
  prefix?: string;
  loading?: boolean;
  loaderColor?: string;
};

const FormSelect = <T,>({
  name,
  control,
  errors,
  options,
  placeholder = "Select an option",
  rules,
  labelKey = "label" as keyof T,
  valueKey = "value" as keyof T,
  prefix,
  loading = false,
  loaderColor = "#E5E7EB",
}: FormSelectProps<T>) => {
  const error = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div className="relative">
          {/* Optional prefix on the left */}
          {prefix && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {prefix}
            </span>
          )}

          <select
            {...field}
            className={`${
              prefix ? "pl-8" : "pl-4"
            } pr-8 h-9 w-full rounded-lg text-gray-200 text-sm border ${
              error ? "border-red-500" : "border-primary"
            } bg-secondary focus:outline-none`}
            disabled={loading || field.disabled}>
            {loading ? (
              <option value="" disabled>
                Loading...
              </option>
            ) : (
              <>
                <option value="" disabled>
                  {placeholder}
                </option>
                {options.map((opt) => (
                  <option
                    key={String(opt[valueKey])}
                    value={opt[valueKey] as any}>
                    {String(opt[labelKey])}
                  </option>
                ))}
              </>
            )}
          </select>

          {/* Loader icon on the right */}
          {loading && (
            <div className="absolute left-10 top-1/2 -translate-y-1/2">
              <LoadingSpinner size={16} color={loaderColor} />
            </div>
          )}

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

export default FormSelect;
