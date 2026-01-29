import { API_URLS } from "@/constants/apiUrls";
import {
  AddLikePayload,
  ApiPoem,
  ApiResponse,
  ToggleLikeResponse,
} from "@/types/api";

export const fetchAllPoems = async ({
  userId,
}: {
  userId?: number;
}): Promise<ApiResponse<ApiPoem[]>> => {
  const url = userId
    ? `${API_URLS.KAVITHAI_ALL}?userId=${userId}`
    : `${API_URLS.KAVITHAI_ALL}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch poems");
  }

  return res.json();
};

export const getPoemById = async ({
  poemId,
  userId,
}: {
  poemId: number;
  userId?: number;
}): Promise<ApiPoem> => {
  const url = userId
    ? `${API_URLS.KAVITHAI_BY_ID}/${poemId}?userId=${userId}`
    : `${API_URLS.KAVITHAI_BY_ID}/${poemId}`;

  console.log("userId : ", userId);

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch poem");
  }

  return res.json();
};

export const createPoemService = async (
  formData: FormData
): Promise<ApiPoem> => {
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

export const AddLikeService = async ({
  poemId,
  userId,
  isLiked,
}: AddLikePayload): Promise<ToggleLikeResponse> => {
  const res = await fetch(
    `${API_URLS.KAVITHAI_LIKE}${poemId}/like?userId=${userId}&isLiked=${isLiked}`,
    {
      method: "POST",
      headers: { Accept: "application/json" },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to like poem");
  }

  return res.json();
};
