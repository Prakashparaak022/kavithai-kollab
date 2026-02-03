import { API_URLS } from "@/constants/apiUrls";
import { AddCommentPayload, ApiComment, ApiResponse } from "@/types/api";

export const fetchPostComments = async ({
  postId,
  page = 0,
  size = 10,
}: {
  postId: number;
  page?: number;
  size?: number;
}): Promise<ApiResponse<ApiComment[]>> => {
  const res = await fetch(`${API_URLS.COMMENTS}${postId}?page=${page}&size=${size}`);
  if (!res.ok) {
    throw new Error("Failed to fetch comments");
  }
  return res.json();
};

export const AddCommentService = async (
  payload: AddCommentPayload
): Promise<ApiComment> => {
  const res = await fetch(`${API_URLS.COMMENTS_ADD}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to add comment");
  }

  return res.json();
};
