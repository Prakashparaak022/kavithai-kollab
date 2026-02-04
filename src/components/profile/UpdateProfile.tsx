"use client";

import { useEffect, useMemo, useState } from "react";
import { API_URLS } from "@/constants/apiUrls";
import { usePlayerDetails } from "@/utils/UserSession";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
  penName: string;
  phoneNo: string;
  gender: string;
  dob: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
};

export default function UpdateProfile() {
  const { playerDetails, displayName } = usePlayerDetails();
  const [profileImage, setProfileImage] = useState<string | undefined>(
    playerDetails?.authorImage
  );

  const defaultValues = useMemo<FormValues>(
    () => ({
      email: playerDetails?.email || "",
      password: "",
      penName: playerDetails?.penName || "",
      phoneNo: playerDetails?.phoneNo || "",
      gender: playerDetails?.gender || "",
      dob: playerDetails?.dob || "",
      address: playerDetails?.address || "",
      city: playerDetails?.city || "",
      state: playerDetails?.state || "",
      zipCode: playerDetails?.zipCode || "",
    }),
    [playerDetails]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const fields = useMemo(
    () => [
      {
        name: "email",
        label: "Email",
        rules: {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email",
          },
        },
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        rules: {
          required: "Password is required",
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/,
            message:
              "Must be 8–15 chars with uppercase, lowercase, number & special char",
          },
        },
      },
      {
        name: "penName",
        label: "Pen Name",
        rules: {
          minLength: { value: 3, message: "Min 3 characters" },
          maxLength: { value: 20, message: "Max 20 characters" },
          validate: (v: string) => !/\s/.test(v) || "Spaces are not allowed",
        },
      },
      {
        name: "phoneNo",
        label: "Phone Number",
        rules: {
          pattern: {
            value: /^[2-9]\d{1,13}$/,
            message: "Invalid number",
          },
        },
      },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        options: [
          { label: "Select", value: "" },
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Other", value: "other" },
        ],
      },
      { name: "dob", label: "Date of Birth", type: "date" },
      { name: "address", label: "Address", fullWidth: true },
      { name: "city", label: "City" },
      { name: "state", label: "State" },
      { name: "zipCode", label: "Zip Code" },
    ],
    []
  );

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      toast.error("File size exceeds 1MB limit");
      return;
    }

    setProfileImage(URL.createObjectURL(file));
  };

  const onSubmit = async (data: FormValues) => {
    if (!playerDetails?.id) return;

    try {
      // const res = await fetch(
      //   `${API_URLS.USER_PROFILE_UPDATE}${playerDetails.id}`,
      //   {
      //     method: "PUT",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(data),
      //   }
      // );

      // if (!res.ok) throw new Error();
      console.log("data: ", data);

      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-app p-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="relative bg-teal-800 px-6 py-16 text-center text-white overflow-hidden">
          <img
            src="/ribbon.svg"
            alt="ribbon"
            className="absolute top-0 left-1/2 w-[420px] max-w-full -translate-x-1/2"
          />

          <div className="relative z-10 flex flex-col items-center">
            <label className="group relative cursor-pointer">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-white text-4xl font-bold text-teal-700 shadow-xl">
                {profileImage ? (
                  <img
                    src={profileImage}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>{displayName?.[0]}</span>
                )}
              </div>

              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition group-hover:opacity-100">
                <span className="text-xs font-semibold uppercase">Edit</span>
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfileImageChange}
              />
            </label>

            <h2 className="mt-5 text-2xl font-semibold">Update Profile</h2>
            <p className="text-sm opacity-80">
              Manage your personal information
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2 text-green">
          {fields.map((field) =>
            field.type === "select" ? (
              <div key={field.name}>
                <label className="text-sm font-medium">{field.label}</label>
                <select
                  {...register(field.name as keyof FormValues, field.rules)}
                  className="mt-1 w-full rounded-lg border border-teal-600 bg-transparent px-3 py-2 focus:ring-2 focus:ring-teal-600">
                  {field?.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div
                key={field.name}
                className={field.fullWidth ? "md:col-span-2" : ""}>
                <Input
                  label={field.label}
                  type={field.type}
                  error={errors[field.name as keyof FormValues]?.message}
                  {...register(field.name as keyof FormValues, field.rules)}
                />
              </div>
            )
          )}

          <div className="md:col-span-2 flex justify-center pt-4">
            <button
              disabled={isSubmitting}
              className="rounded-full bg-teal-700 px-12 py-2 font-semibold text-white hover:bg-teal-800 disabled:opacity-60">
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({
  label,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        {...props}
        className="mt-1 w-full rounded-lg border border-teal-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
