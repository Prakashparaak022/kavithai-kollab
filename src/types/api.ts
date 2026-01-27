export type ApiLike = {
  id: number;
  userId: number;
  author: string;
  authorImage?: string | null;
};


export type ApiComment = {
  id: number;
  userId: number;
  author: string;
  content: string;
  authorImage?: string | null;
};


export type ApiCollaboration = {
  id: number;
  userId: number;
  author: string;
  content: string;
  authorImage?: string | null;
};

export type ApiPoem = {
  id: number;
  userId: number;

  author: string;
  title?: string;
  content?: string;

  imageUrl?: string;
  authorImage?: string | null;

  categoryName?: string;
  tags?: string;

  allowCollaboration: boolean;

  isPrivate: boolean;
  isPublish: boolean;

  status: "PENDING" | "APPROVED" | "REJECTED";

  likesCount: number;
  likes: ApiLike[];
  isLiked?: boolean;

  comments: ApiComment[];

  collaborations: ApiCollaboration[];
};

export type ApiCategory = {
  id: number;
  name: string;
};

export interface ApiResponse<T = unknown> {
  content: T;
}

export type AddLikePayload = {
  poemId: number;
  userId: number;
};
