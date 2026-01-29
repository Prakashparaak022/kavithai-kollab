import { API_URLS } from "@/constants/apiUrls";
import {
  AddCollabPayload,
  ApiCollaboration,
  ApiResponse,
  DecisionCollabPayload,
} from "@/types/api";

export const fetchPostCollabs = async ({
  postId,
}: {
  postId: number;
}): Promise<ApiResponse<ApiCollaboration[]>> => {
  const res = await fetch(`${API_URLS.COLLABS}${postId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch collaborations");
  }
  return res.json();
};

export const AddCollabService = async (
  payload: AddCollabPayload
): Promise<ApiCollaboration> => {
  const res = await fetch(`${API_URLS.COLLABS_ADD}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to add collaboration");
  }

  return res.json();
};

export const decisionCollabService = async (
  payload: DecisionCollabPayload
): Promise<ApiCollaboration> => {
  const res = await fetch(API_URLS.COLLAB_DECISION, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to approve collaboration");
  }

  return res.json();
};
