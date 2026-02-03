import { API_URLS } from "@/constants/apiUrls";
import { ApiCategory, ApiResponse } from "@/types/api";

export const fetchAllCategories = async ({
  page = 0,
  size = 10,
}: {
  page?: number;
  size?: number;
}): Promise<ApiResponse<ApiCategory[]>> => {
  const url = `${API_URLS.CATEGORY_ALL}?page=${page}&size=${size}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
};
