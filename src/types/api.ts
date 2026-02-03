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
  authorImage: string | null;
  createdAt: string;
};

export type ApiCollaboration = {
  id: number;
  userId: number;
  author: string;
  content: string;
  authorImage: string | null;
  status: string;
};

export type ApiPoem = {
  id: number;
  userId: number;

  author: string;
  title?: string;
  content?: string;

  imageUrl?: string;
  authorImage: string | null;

  categoryName?: string;
  tags?: string;

  allowCollaboration: boolean;

  isPrivate: boolean;
  isPublish: boolean;

  status: "PENDING" | "APPROVED" | "REJECTED";

  likesCount: number;
  commentsCount: number;
  collaborationCount: number;
  isLiked: boolean;
  createdAt: string;
};

export type ApiCategory = {
  id: number;
  name: string;
};

export interface ApiResponse<T = unknown> {
  content: T;
  totalElements: number;
  totalPages: number;
  number: number;
}

export type AddLikePayload = {
  poemId: number;
  userId: number;
  isLiked: boolean;
};

export type AddCommentPayload = {
  postId: number;
  userId: number;
  content: string;
};

export type ToggleLikeResponse = {
  id: number;
  isLiked: boolean;
  likesCount: number;
};

export type AddCollabPayload = {
  postId: number;
  userId: number;
  content: string;
};

export type DecisionCollabPayload = {
  collabId: number;
  ownerId: number;
  updatedContent?: string;
  status: string;
};

export type InviteCollabPayload = {
  postId: number;
  ownerId: number;
  invitedUserId: number;
};

export type ApiUserProfile = {
  id: number;
  email: string;
  penName: string;
  phoneNo: string;
  gender: string;
  status: boolean;
  firstName: string;
  lastName: string;
  dob: string | null;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  realUser: boolean;
  registrationDate: string;
};

export type ApiUsersParams = {
  firstName?: string;
  penName?: string;
  lastName?: string;
  state?: string;
  city?: string;
  gender?: string;
  email?: string;
  role?: string;
  status?: number;
  phoneNo?: string;
  page?: number;
  size?: number;
};

export type ProfileForm = {
  email: string;
  password: string;
  penName: string;
  phoneNo: string;
  gender: string;
  phoneCountryIsdcodeId: string;
  countryId: string;
  dob: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
};
