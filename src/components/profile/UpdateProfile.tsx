"use client";

import { useEffect, useMemo, useState } from "react";
import { API_URLS } from "@/constants/apiUrls";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { ApiUserProfile } from "@/types/api";
import { getUserImageSrc } from "@/utils/imageUtils";

type ProfileProps = {
  userProfile: ApiUserProfile;
  profileRefresh: () => Promise<void>;
};

type FormValues = {
  firstName: string;
  lastName: string;
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

export default function UpdateProfile({
  userProfile,
  profileRefresh,
}: ProfileProps) {
  const displayName = userProfile.penName || userProfile.firstName;

  const [profileImage, setProfileImage] = useState<string | undefined>(
    getUserImageSrc(userProfile.authorImage)
  );
  const [imageDirty, setImageDirty] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const defaultValues = useMemo<FormValues>(
    () => ({
      firstName: userProfile.firstName ?? "",
      lastName: userProfile.lastName ?? "",
      email: userProfile.email ?? "",
      password: "",
      penName: userProfile.penName ?? "",
      phoneNo: userProfile.phoneNo ?? "",
      gender: userProfile.gender ?? "",
      dob: userProfile.dob ?? "",
      address: userProfile.address ?? "",
      city: userProfile.city ?? "",
      state: userProfile.state ?? "",
      zipCode: userProfile.zipCode ?? "",
    }),
    [userProfile]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormValues>({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const fields = useMemo(
    () => [
      {
        name: "firstName",
        label: "First Name",
        rules: {
          required: "Firstname is required",
          minLength: { value: 3, message: "Min 3 characters" },
          maxLength: { value: 20, message: "Max 20 characters" },
          validate: (v: string) =>
            typeof v === "string"
              ? !/\s/.test(v) || "Spaces are not allowed"
              : true,
        },
      },
      {
        name: "lastName",
        label: "Last Name",
        rules: {
          required: "Lastname is required",
          minLength: { value: 3, message: "Min 3 characters" },
          maxLength: { value: 20, message: "Max 20 characters" },
          validate: (v) =>
            typeof v === "string"
              ? !/\s/.test(v) || "Spaces are not allowed"
              : true,
        },
      },
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
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
          { label: "Not to Reveal", value: "Not to Reveal" },
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
    if (file) {
      setProfileImageFile(file);
      setProfileImage(URL.createObjectURL(file));
      setImageDirty(true);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      if (profileImageFile) {
        formData.append("authorImage", profileImageFile);
      }

      const res = await fetch(
        `${API_URLS.USER_PROFILE_UPDATE}${userProfile.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!res.ok) throw new Error();
      toast.success("Profile updated successfully");
      reset(data);
      setImageDirty(false);
      profileRefresh();
    } catch {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-app p-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="relative bg-secondary px-6 py-16 text-center text-white overflow-hidden">
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
                  className="mt-1 w-full rounded-lg border border-teal-600 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600">
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
              disabled={(!isDirty && !imageDirty) || isSubmitting}
              className="rounded-full bg-secondary px-12 py-2 font-semibold text-white hover:bg-teal-800 disabled:opacity-60">
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
