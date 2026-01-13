import { API_URLS } from "@/constants/apiUrls";
import { ApiPoem, ApiResponse } from "@/types/api";

export const fetchAllPoems = async (): Promise<ApiResponse<ApiPoem>> => {
  const res = await fetch(API_URLS.KAVITHAI_ALL);

  if (!res.ok) {
    throw new Error("Failed to fetch poems");
  }

  return res.json();
};
8