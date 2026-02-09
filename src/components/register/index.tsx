"use client";

import { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { useISDCode } from "@/hooks/useISDCode";
import { API_URLS } from "@/constants/apiUrls";
import { formatErrorMessage } from "@/utils/errorMessage";
import Logo from "@/assets/img/logo-green.webp";
import Image from "next/image";
import FormInput from "../form/FormInput";
import SubmitButton from "../ui/SubmitButton";
import FormSelect from "../form/FormSelect";

type RegisterProps = {
  handleClose?: () => void;
};

type RegisterFormValues = {
  firstName: string;
  lastName: string;
  penName: string;
  email: string;
  password: string;
  confirmPassword: string;
  promoCode?: string;
  mobileNumber: string;
  countryId: number;
  isTermsAndConditions: boolean;
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
    formState: { errors, isValid },
  } = useForm<RegisterFormValues>({
    mode: "onChange",
    defaultValues: {
      countryId: 95,
    },
  });

  const [loading, setLoading] = useState(false);

  const { REGISTER } = API_URLS;
  const { login, brandId } = useAuth();
  const { data: isdCodeDetails, loading: isdCodeLoading } = useISDCode();

  const onSubmit = useCallback(
    async (data: RegisterFormValues) => {
      try {
        setLoading(true);

        const profile = {
          penName: data.penName?.trim().replace(/\s+/g, ""),
          firstName: data.firstName.trim().replace(/\s+/g, ""),
          lastName: data.lastName.trim().replace(/\s+/g, ""),
          password: data.password,
          email: data.email,
          phoneNo: Number(data.mobileNumber),
          phoneCountryIsdcodeId: Number(data.countryId),
        };

        const response = await fetch(REGISTER, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profile),
        });

        if (response.ok) {
          const result = await response.json();
          login(result);
          toast.success("Registered Successfully");
          handleClose?.();
        } else {
          const errorData = await response.json();
          toast.error(
            errorData?.errors?.[0]?.defaultMessage ||
              Object.values(errorData?.data || {})[0] ||
              formatErrorMessage(errorData, "Registration failed")
          );
        }
      } catch (error) {
        console.error("An error occurred during registration.", error);
        toast.error("Unexpected error occurred during registration.");
      } finally {
        setLoading(false);
      }
    },
    [REGISTER, brandId, login, handleClose]
  );

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
                value === watch("password") || "Passwords do not match",
            }}
            variant="secondary"
            textColor="text-green"
          />

          {/* Country + Mobile */}
          <div className="w-full flex gap-2 mb-5">
            <div className="w-[100px]">
              <FormSelect
                name="countryId"
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
                name="mobileNumber"
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
