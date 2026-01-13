"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Logo from "@/assets/img/logo-1.png";
import { useAuth } from "@/context/AuthContext";
// import { useModal } from "@/context/ModalContext";
import { API_URLS } from "@/constants/apiUrls";
import { formatErrorMessage } from "@/utils/errorMessage";
import FormInput from "../form/FormInput";
import SubmitButton from "../ui/SubmitButton";

type LoginForm = {
  username: string;
  password: string;
};

type LoginContainerProps = {
  handleClose?: () => void;
};

const LoginContainer = ({ handleClose }: LoginContainerProps) => {
  const { login, deviceDetails } = useAuth();
  //   const { openRegister } = useModal();

  const preLoginNumber = process.env.NEXT_PUBLIC_PRE_LOGIN_NUM;
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    mode: "onChange",
    defaultValues: { username: "", password: "" },
  });

  const handleLogin = async (data: LoginForm) => {
    try {
      setLoading(true);

      const username = data.username.trim().replace(/\s+/g, "");
      const reqPayload = { identifier: username, password: data.password };

      const response = await fetch(API_URLS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqPayload),
      });

      if (response.ok) {
        const res = await response.json();
        login(res);
        reset();
        handleClose?.();
        toast.success("Login successful");
      } else {
        const err = await response.text();
        toast.error(formatErrorMessage(err) || "Login failed");
      }
    } catch {
      toast.error("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-secondary">
      <Image src={Logo} className="logo h-20 w-auto" alt="logo" />

      <div className="mt-4 w-full max-w-lg md:flex md:gap-6">
        {/* form */}
        <div className="w-full mx-auto">
          <h2 className="text-2xl font-extrabold text-[#d4a574] text-center">
            Login
          </h2>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5 mt-5">
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
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&]).{8,15}$/,
                  message:
                    "8–15 chars with upper, lower, number & special char",
                },
              }}
            />

            <SubmitButton
              text="Login Now"
              loadingText="Logging in…"
              isLoading={loading}
              disabled={!isValid}
            />
          </form>

          <div className="flex items-center my-3">
            <div className="flex-1 h-px bg-gray-600" />
            <span className="px-2 text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-600" />
          </div>

          <p className="text-center text-gray-400 text-sm">
            Don’t have an account?{" "}
            <span
              //   onClick={openRegister}
              className="text-orange-500 font-bold cursor-pointer">
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
