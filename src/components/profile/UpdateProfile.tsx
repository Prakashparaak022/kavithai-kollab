"use client";

import { useState } from "react";
import { API_URLS } from "@/constants/apiUrls";
import { usePlayerDetails } from "@/utils/UserSession";
import { toast } from "react-toastify";

export type ProfileForm = {
  email: string;
  password: string;
  penName: string;
  phoneNo: string;
  gender: string;
  phoneCountryIsdcodeId: string;
  countryId: string;
  dob: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
};

const initialForm: ProfileForm = {
  email: "",
  password: "",
  penName: "",
  phoneNo: "",
  gender: "",
  phoneCountryIsdcodeId: "",
  countryId: "",
  dob: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
};

export default function UpdateProfile() {
  const [form, setForm] = useState<ProfileForm>(initialForm);
  const [loading, setLoading] = useState(false);

  const { playerDetails, displayName } = usePlayerDetails();
  const [profileImage, setProfileImage] = useState(playerDetails?.authorImage);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      toast.error("File size exceeds 1MB limit.");
      return;
    }

    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!playerDetails?.id) return;

    setLoading(true);

    try {
      const res = await fetch(
        `${API_URLS.USER_PROFILE_UPDATE}${playerDetails.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error();

      alert("Profile updated successfully");
    } catch {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-app p-4">
      <div className="w-full max-w-4xl rounded-2xl bg-card shadow-2xl overflow-hidden">
        <div className="relative overflow-hidden bg-teal-800 px-6 py-16 text-center text-white">
          <img
            src="/ribbon.svg"
            alt="ribbon"
            className="absolute top-0 left-1/2 w-[420px] max-w-full -translate-x-1/2"
          />

          <div className="relative z-10 flex flex-col items-center">
            <label className="group relative cursor-pointer">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-white text-4xl font-bold text-teal-700 shadow-xl">
                {!playerDetails?.authorImage && <span>{displayName?.[0]}</span>}
              </div>

              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition group-hover:opacity-100">
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Edit
                </span>
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
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2 text-green">
          <Input
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
          <Input
            label="Pen Name"
            name="penName"
            value={form.penName}
            onChange={handleChange}
          />
          <Input
            label="Phone Number"
            name="phoneNo"
            value={form.phoneNo}
            onChange={handleChange}
          />

          <div>
            <label className="text-sm font-medium">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-teal-600 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600">
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <Input
            label="Date of Birth"
            name="dob"
            type="date"
            value={form.dob}
            onChange={handleChange}
          />

          <div className="md:col-span-2">
            <Input
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <Input
            label="City"
            name="city"
            value={form.city}
            onChange={handleChange}
          />
          <Input
            label="State"
            name="state"
            value={form.state}
            onChange={handleChange}
          />
          <Input
            label="Zip Code"
            name="zipCode"
            value={form.zipCode}
            onChange={handleChange}
          />

          <div className="md:col-span-2 flex justify-center pt-4">
            <button
              disabled={loading}
              className="rounded-full bg-teal-700 px-12 py-2 font-semibold text-white transition hover:bg-teal-800 disabled:opacity-60">
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        {...props}
        className="mt-1 w-full rounded-lg border border-teal-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
      />
    </div>
  );
}
