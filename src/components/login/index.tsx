"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Logo from "@/assets/img/logo-green.webp";
import { useModal } from "@/context/ModalContext";
import { formatErrorMessage } from "@/utils/errorMessage";
import FormInput from "../form/FormInput";
import SubmitButton from "../ui/SubmitButton";
import { loginUser } from "@/store/auth";
import { RootState, useAppDispatch } from "@/store";
import { useSelector } from "react-redux";

type LoginForm = {
  email: string;
  password: string;
};

type LoginContainerProps = {
  handleClose?: () => void;
};

const LoginContainer = ({ handleClose }: LoginContainerProps) => {
  const { openRegister } = useModal();
  const dispatch = useAppDispatch();
  const loading = useSelector((state: RootState) => state.auth.loading);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const handleLogin = async (data: LoginForm) => {
    try {
      await dispatch(
        loginUser({
          email: data.email,
          password: data.password,
        }),
      ).unwrap();

      reset();
      handleClose?.();
      toast.success("Login successful");
    } catch (error) {
      console.error("An error occurred during login.", error);
      toast.error(formatErrorMessage(error as string));
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-app">
      <Image src={Logo} className="h-20 w-auto" alt="logo" />

      <div className="mt-4 w-full max-w-lg md:flex md:gap-6">
        {/* form */}
        <div className="w-full mx-auto">
          <h2 className="text-2xl font-extrabold text-green text-center">
            Login
          </h2>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5 mt-5">
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
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&]).{8,15}$/,
                  message:
                    "8–15 chars with upper, lower, number & special char",
                },
              }}
              variant="secondary"
              textColor="text-green"
            />

            <SubmitButton
              background="bg-secondary"
              text="Login Now"
              loadingText="Logging in…"
              isLoading={loading}
              disabled={!isValid}
            />
          </form>

          <div className="flex items-center my-3">
            <div className="flex-1 h-px bg-secondary" />
            <span className="px-2 text-green text-sm">or</span>
            <div className="flex-1 h-px bg-secondary" />
          </div>

          <p className="text-center text-green text-sm font-semibold">
            Don’t have an account?{" "}
            <span
              onClick={openRegister}
              className="text-orange-700 font-bold cursor-pointer">
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
