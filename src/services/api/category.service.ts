import { API_URLS } from "@/constants/apiUrls";
import { ApiCategory, ApiResponse } from "@/types/api";

export const fetchAllCategories = async (): Promise<
  ApiResponse<ApiCategory[]>
> => {
  const res = await fetch(API_URLS.CATEGORY_ALL);

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
};
