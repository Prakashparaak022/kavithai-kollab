import { API_URLS } from "@/constants/apiUrls";
import {
  AddLikePayload,
  ApiPoem,
  ApiResponse,
  ToggleLikeResponse,
} from "@/types/api";

export const fetchAllPoems = async ({
  userId,
  isPrivate,
  page = 0,
  size = 10,
}: {
  userId?: number;
  isPrivate?: boolean;
  page?: number;
  size?: number;
}): Promise<ApiResponse<ApiPoem[]>> => {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
  });
  if (userId !== undefined) {
    params.append("userId", String(userId));
  }

  if (isPrivate !== undefined) {
    params.append("isPrivate", String(isPrivate));
  }
  const url = `${API_URLS.KAVITHAI_ALL}?${params.toString()}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch poems");
  }

  return res.json();
};

export const fetchPoemById = async ({
  poemId,
  userId,
}: {
  poemId: number;
  userId?: number;
}): Promise<ApiPoem> => {
  const url = userId
    ? `${API_URLS.KAVITHAI_BY_ID}/${poemId}?userId=${userId}`
    : `${API_URLS.KAVITHAI_BY_ID}/${poemId}`;    

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

export const fetchMyPoems = async ({
  userId,
  isPrivate,
  page = 0,
  size = 10,
}: {
  userId: number;
  isPrivate?: boolean;
  page?: number;
  size?: number;
}): Promise<ApiResponse<ApiPoem[]>> => {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  if (isPrivate !== undefined) {
    params.append("isPrivate", String(isPrivate));
  }
  const url = `${API_URLS.MY_POSTS}?userId=${userId}&${params.toString()}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch my poems");
  }

  return res.json();
};

export const updatePoemService = async (
  id: number,
  formData: FormData
): Promise<ApiPoem> => {
  const res = await fetch(`${API_URLS.KAVITHAI_UPDATE}${id}`, {
    method: "PUT",
    headers: { Accept: "application/json" },
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to update poem");
  }

  return res.json();
};
