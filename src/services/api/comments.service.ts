import { API_URLS } from "@/constants/apiUrls";
import { AddCommentPayload, ApiComment, ApiResponse } from "@/types/api";

export const fetchPostComments = async ({
  postId,
}: {
  postId: number;
}): Promise<ApiResponse<ApiComment[]>> => {
  const res = await fetch(`${API_URLS.COMMENTTS}${postId}`);
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
