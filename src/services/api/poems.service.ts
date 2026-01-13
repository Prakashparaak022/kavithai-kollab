import { API_URLS } from "@/constants/apiUrls";
import { ApiPoem, ApiResponse } from "@/types/api";

export const fetchAllPoems = async (): Promise<ApiResponse<ApiPoem>> => {
  const res = await fetch(API_URLS.KAVITHAI_ALL);

  if (!res.ok) {
    throw new Error("Failed to fetch poems");
  }

  return res.json();
};

export const createPoemService = async (
  formData: FormData
): Promise<ApiResponse<ApiPoem>> => {
  const res = await fetch(API_URLS.KAVITHAI_POST, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to create poem");
  }

  return res.json();
};
