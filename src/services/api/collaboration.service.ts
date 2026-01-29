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

export const ApproveCollabService = async ({
  collabId,
  ownerId,
}: DecisionCollabPayload): Promise<DecisionCollabPayload> => {
  const res = await fetch(
    `${API_URLS.COLLABS}${collabId}/approve?ownerId=${ownerId}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to approve collaboration");
  }

  return { collabId, ownerId };
};

export const rejectCollabService = async ({
  collabId,
  ownerId,
}: DecisionCollabPayload): Promise<DecisionCollabPayload> => {
  const res = await fetch(
    `${API_URLS.COLLABS}${collabId}/reject?ownerId=${ownerId}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to reject collaboration");
  }

  return { collabId, ownerId };
};
