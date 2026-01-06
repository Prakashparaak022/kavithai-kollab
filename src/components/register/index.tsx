"use client";

import { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { useISDCode } from "@/hooks/useISDCode";
import { API_URLS } from "@/services/apiUrls";
import { formatErrorMessage } from "@/utils/errorMessage";
import Logo from "@/assets/img/logo-1.png";
import Image from "next/image";
import FormInput from "../form/FormInput";
import SubmitButton from "../ui/SubmitButton";
import FormSelect from "../form/FormSelect";

type RegisterProps = {
  handleClose?: () => void;
};

type RegisterFormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  promoCode?: string;
  mobileNumber: string;
  countryId: number;
  is18Plus: boolean;
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
      is18Plus: false,
      isTermsAndConditions: false,
    },
  });

  const [loading, setLoading] = useState(false);

  const { BRAND, REGISTER } = API_URLS;
  const { login, brandId, deviceDetails } = useAuth();
  const { data: isdCodeDetails, loading: isdCodeLoading } = useISDCode();

  // const onSubmit = useCallback(
  //   async (data: RegisterFormValues) => {
  //     try {
  //       setLoading(true);

  //       const username = data.username.trim().replace(/\s+/g, "");

  //       const profile = {
  //         brandName: BRAND,
  //         userName: username,
  //         actionUserName: username,
  //         password: data.password,
  //         userAccountTypeId: 7,
  //         phone: Number(data.mobileNumber),
  //         phoneCountryIsdcodeId: Number(data.countryId),
  //         isPlayerAge18Plus: data.is18Plus ? 1 : 0,
  //         isPlayerAcceptTAndC: data.isTermsAndConditions ? 1 : 0,
  //         activeStatus: 1,
  //         realPlayer: 1,
  //         demoPlayer: 0,
  //         playerRegistrationDate: new Date().toISOString().split(".")[0],
  //         reportingHirearchyUserId: brandId,
  //         promoCode: data.promoCode,
  //         deviceInfoRequest: deviceDetails,
  //       };

  //       const response = await fetch(REGISTER, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(profile),
  //       });

  //       if (response.status === 201) {
  //         const result = await response.json();
  //         login(result);
  //         toast.success("Registered Successfully");
  //         handleClose?.();
  //       } else {
  //         const errorData = await response.json();
  //         toast.error(
  //           errorData?.errors?.[0]?.defaultMessage ||
  //             Object.values(errorData?.data || {})[0] ||
  //             formatErrorMessage(errorData) ||
  //             "Registration failed"
  //         );
  //       }
  //     } catch {
  //       toast.error("Unexpected error occurred during registration.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   [BRAND, REGISTER, brandId, deviceDetails, login, handleClose]
  // );

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setLoading(true);

      const username = data.username.trim().replace(/\s+/g, "");
      const profile = {
        userName: username,
        phone: Number(data.mobileNumber),
        phoneCountryIsdcodeId: Number(data.countryId),
        isPlayerAge18Plus: data.is18Plus ? 1 : 0,
        playerRegistrationDate: new Date().toISOString().split(".")[0],
        deviceInfoRequest: deviceDetails,
      };

      login(profile);
      toast.success("Registered Successfully");
      handleClose?.();
    } catch {
      toast.error("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-secondary">
      <Image src={Logo} className="logo h-20 w-auto" alt="logo" />
      <div className="w-full mx-auto">
        <h2 className="text-2xl font-extrabold text-[#d4a574] text-center">
          Register
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 mt-4"
          noValidate>
          {/* Username */}
          <FormInput
            name="username"
            control={control}
            errors={errors}
            placeholder="Enter your username"
            rules={{
              required: "Username is required",
              minLength: { value: 3, message: "Min 3 characters" },
              maxLength: { value: 12, message: "Max 12 characters" },
              validate: (v) =>
                typeof v === "string"
                  ? !/\s/.test(v) || "Spaces are not allowed"
                  : true,
            }}
          />

          {/* Email */}
          <FormInput
            name="email"
            control={control}
            errors={errors}
            placeholder="Enter your email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            }}
          />

          {/* Password */}
          <FormInput
            name="password"
            control={control}
            errors={errors}
            placeholder="Enter your password"
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
          />

          {/* Confirm Password */}
          <FormInput
            name="confirmPassword"
            control={control}
            errors={errors}
            placeholder="Confirm password"
            type="password"
            rules={{
              required: "Confirm Password is required",
              validate: (value: unknown) =>
                value === watch("password") || "Passwords do not match",
            }}
          />

          {/* Country + Mobile */}
          <div className="w-full flex gap-2">
            <div className="w-[100px]">
              <FormSelect
                name="countryId"
                control={control}
                errors={errors}
                placeholder="Select your role"
                labelKey="isdCode"
                valueKey="id"
                options={isdCodeDetails || []}
                rules={{ required: "Role is required" }}
                prefix="+"
                loading={isdCodeLoading}
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
                  required: "Mobile number is required",
                  pattern: { value: /^[6-9]\d{9}$/, message: "Invalid number" },
                }}
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex flex-col gap-2 text-sm text-gray-300">
            <Controller
              name="is18Plus"
              control={control}
              rules={{ required: "Must be 21+" }}
              render={({ field, fieldState: { error } }) => (
                <div className="flex items-center gap-2">
                  <CustomSwitch
                    checked={field.value || false}
                    onChange={() => field.onChange(!field.value)}
                  />
                  <span>Please confirm that you’re 21 years or above.</span>
                  {error && (
                    <p className="mt-1 ml-2 text-xs text-red-600 dark:text-red-700">
                      {error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Submit Button */}
          <SubmitButton
            text="Register Now"
            loadingText="Registering…"
            isLoading={loading}
            disabled={!watch("is18Plus") || !isValid}
          />
        </form>
      </div>
    </div>
  );
};

export default Register;

const CustomSwitch = ({ checked, onChange }: CustomSwitchProps) => {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-5 w-[34px] items-center cursor-pointer rounded-full transition-colors duration-300 
        ${checked ? "bg-highlight" : "bg-gray-300"}`}>
      <span
        className={`inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-md transition-transform duration-300
          ${checked ? "translate-x-[16px]" : "translate-x-[2px]"}`}
      />
    </button>
  );
};
