export type ApiPoem = {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
  content?: string;
  tags: string;
  allowCollaboration: boolean;
  isPrivate: boolean;
  isPublish: boolean;
  userId: number;
};

export interface ApiResponse<T = any> {
  content: T[];
}
