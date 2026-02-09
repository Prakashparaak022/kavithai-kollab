"use client";

import { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useISDCode } from "@/hooks/useISDCode";
import { formatErrorMessage } from "@/utils/errorMessage";
import Logo from "@/assets/img/logo-green.webp";
import Image from "next/image";
import FormInput from "../form/FormInput";
import SubmitButton from "../ui/SubmitButton";
import FormSelect from "../form/FormSelect";
import { RootState, useAppDispatch } from "@/store";
import { registerUser } from "@/store/auth/auth.thunks";
import { useSelector } from "react-redux";
import { RegisterForm } from "@/types/api";

type RegisterProps = {
  handleClose?: () => void;
};

type RegisterFormValues = RegisterForm & {
  confirmPassword: string;
};
type CustomSwitchProps = {
  checked: boolean;
  onChange: () => void;
};

const Register = ({ handleClose }: RegisterProps) => {
  const {
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm<RegisterFormValues>({
    mode: "onChange",
    defaultValues: {
      phoneCountryIsdcodeId: 95,
    },
  });

  const dispatch = useAppDispatch();

  const { data: isdCodeDetails, loading: isdCodeLoading } = useISDCode();
  const loading = useSelector((state: RootState) => state.auth.loading);

  const onSubmit = async (data: RegisterForm) => {
    try {
      const profile = {
        firstName: data.firstName.trim().replace(/\s+/g, ""),
        lastName: data.lastName.trim().replace(/\s+/g, ""),
        penName: data.penName?.trim().replace(/\s+/g, ""),
        email: data.email,
        password: data.password,
        phoneNo: Number(data.phoneNo),
        phoneCountryIsdcodeId: Number(data.phoneCountryIsdcodeId),
      };

      await dispatch(registerUser(profile)).unwrap();

      toast.success("Registered Successfully");
      handleClose?.();
    } catch (error) {
      console.error("An error occurred during registration.", error);
      toast.error(formatErrorMessage(error as string));
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-app">
      <Image src={Logo} className="h-20 w-auto" alt="logo" />
      <div className="w-full mx-auto">
        <h2 className="text-2xl font-extrabold text-green text-center">
          Register
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 mt-4"
          noValidate>
          {/* Firstname */}
          <FormInput
            name="firstName"
            control={control}
            errors={errors}
            placeholder="Enter First Name *"
            rules={{
              required: "Firstname is required",
              minLength: { value: 3, message: "Min 3 characters" },
              maxLength: { value: 20, message: "Max 20 characters" },
              validate: (v) =>
                typeof v === "string"
                  ? !/\s/.test(v) || "Spaces are not allowed"
                  : true,
            }}
            variant="secondary"
            textColor="text-green"
          />
          {/* Lastname */}
          <FormInput
            name="lastName"
            control={control}
            errors={errors}
            placeholder="Enter Last Name *"
            rules={{
              required: "Lastname is required",
              minLength: { value: 3, message: "Min 3 characters" },
              maxLength: { value: 20, message: "Max 20 characters" },
              validate: (v) =>
                typeof v === "string"
                  ? !/\s/.test(v) || "Spaces are not allowed"
                  : true,
            }}
            variant="secondary"
            textColor="text-green"
          />
          {/* penName */}
          <FormInput
            name="penName"
            control={control}
            errors={errors}
            placeholder="Enter Pen Name"
            rules={{
              minLength: { value: 3, message: "Min 3 characters" },
              maxLength: { value: 20, message: "Max 20 characters" },
              validate: (v) =>
                typeof v === "string"
                  ? !/\s/.test(v) || "Spaces are not allowed"
                  : true,
            }}
            variant="secondary"
            textColor="text-green"
          />

          {/* Email */}
          <FormInput
            name="email"
            control={control}
            errors={errors}
            placeholder="Enter Email *"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            }}
            variant="secondary"
            textColor="text-green"
          />

          {/* Password */}
          <FormInput
            name="password"
            control={control}
            errors={errors}
            placeholder="Enter Password *"
            type="password"
            rules={{
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/,
                message:
                  "Must be 8–15 chars with uppercase, lowercase, number & special char",
              },
            }}
            variant="secondary"
            textColor="text-green"
          />

          {/* Confirm Password */}
          <FormInput
            name="confirmPassword"
            control={control}
            errors={errors}
            placeholder="Confirm Password *"
            type="password"
            rules={{
              required: "Confirm Password is required",
              validate: (value: unknown) =>
                value === getValues("password") || "Passwords do not match",
            }}
            variant="secondary"
            textColor="text-green"
          />

          {/* Country + Mobile */}
          <div className="w-full flex gap-2 mb-5">
            <div className="w-[100px]">
              <FormSelect
                name="phoneCountryIsdcodeId"
                control={control}
                errors={errors}
                placeholder="Select your role"
                labelKey="isdCode"
                valueKey="id"
                options={isdCodeDetails || []}
                prefix="+"
                loading={isdCodeLoading}
                variant="secondary"
                textColor="text-green"
              />
            </div>
            <div className="flex-1">
              <FormInput
                name="phoneNo"
                control={control}
                errors={errors}
                placeholder="Mobile number"
                type="text"
                rules={{
                  pattern: {
                    value: /^[2-9]\d{1,13}$/,
                    message: "Invalid number",
                  },
                }}
                variant="secondary"
                textColor="text-green"
              />
            </div>
          </div>

          {/* Submit Button */}
          <SubmitButton
            background="bg-secondary"
            text="Register Now"
            loadingText="Registering…"
            isLoading={loading}
            disabled={!isValid}
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
