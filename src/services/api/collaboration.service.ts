import { API_URLS } from "@/constants/apiUrls";
import {
  AddCollabPayload,
  ApiCollaboration,
  ApiResponse,
  DecisionCollabPayload,
  InviteCollabPayload,
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

export const inviteCollabService = async ({
  postId,
  ownerId,
  invitedUserId,
}: InviteCollabPayload): Promise<InviteCollabPayload> => {
  const res = await fetch(
    `${API_URLS.COLLAB_INVITE}?postId=${postId}&ownerId=${ownerId}&invitedUserId=${invitedUserId}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to approve collaboration");
  }

  return {
    postId,
    ownerId,
    invitedUserId,
  };
};

export const fetchMyCollabs = async ({
  userId,
  page = 0,
  size = 10,
}: {
  userId: number;
  page?: number;
  size?: number;
}): Promise<ApiResponse<ApiCollaboration[]>> => {
  const res = await fetch(
    `${API_URLS.MY_COLLABS}?userId=${userId}&page=${page}&size=${size}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch my collaborations");
  }

  return res.json();
};

export const acceptCollabService = async ({
  collabId,
  userId,
}: {
  collabId: number;
  userId: number;
}): Promise<ApiCollaboration> => {
  const res = await fetch(
    `${API_URLS.COLLAB_ACCEPT}${collabId}?userId=${userId}`,
    { method: "POST" }
  );

  if (!res.ok) {
    throw new Error("Failed to accept collaboration");
  }

  return res.json();
};

export const rejectCollabService = async ({
  collabId,
  userId,
}: {
  collabId: number;
  userId: number;
}): Promise<void> => {
  const res = await fetch(
    `${API_URLS.COLLAB_REJECT}${collabId}?userId=${userId}`,
    { method: "POST" }
  );

  if (!res.ok) {
    throw new Error("Failed to reject collaboration");
  }
};
