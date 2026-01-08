export type NotificationType =
  | "INVITE"
  | "COLLAB_APPROVED"
  | "COLLAB_REJECTED"
  | "NEW_COLLAB";

export type Notification = {
  id: number;
  type: NotificationType;
  message: string;
  poemSlug: string;
  createdAt: string;
  read: boolean;
};
