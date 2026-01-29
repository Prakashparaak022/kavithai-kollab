"use client";

import {
  Controller,
  Control,
  FieldErrors,
  RegisterOptions,
  FieldValues,
  Path,
} from "react-hook-form";
import LoadingSpinner from "../ui/LoadingSpinner";

type FormSelectProps<
  TForm extends FieldValues,
  TOption extends Record<string, unknown>
> = {
  name: Path<TForm>;
  control: Control<TForm>;
  errors: FieldErrors<TForm>;
  options: TOption[];
  placeholder?: string;
  rules?: RegisterOptions<TForm, Path<TForm>>;
  labelKey: keyof TOption;
  valueKey: keyof TOption;
  prefix?: string;
  loading?: boolean;
  loaderColor?: string;
  variant?: string;
  textColor?: string;
};

function FormSelect<
  TForm extends FieldValues,
  TOption extends Record<string, unknown>
>({
  name,
  control,
  errors,
  options,
  placeholder = "Select an option",
  rules,
  labelKey,
  valueKey,
  prefix,
  loading = false,
  loaderColor = "#E5E7EB",
  variant = "primary",
  textColor = "text-secondary",
}: FormSelectProps<TForm, TOption>) {
  const error = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div className="relative">
          {prefix && (
            <span
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${textColor} pointer-events-none`}>
              {prefix}
            </span>
          )}

          <select
            {...field}
            className={`w-full h-9 rounded-lg ${textColor} text-sm border ${
              error ? "border-red-500" : `border-${variant}`
            } focus:outline-none ${prefix ? "pl-8" : "pl-4"} pr-4`}
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
                    value={String(opt[valueKey])}>
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
}

export default FormSelect;
