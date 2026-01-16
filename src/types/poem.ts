export type Comment = {
  id: number;
  name: string;
  content: string;
  imageUrl: string;
};

export type Collaboration = {
  id: number;
  author: string;
  content: string;
  imageUrl: string;
};

export type Poem = {
  id: number;
  title: string;
  slug: string;
  author: string;
  authorImage?: string;
  imageUrl: string;
  content?: string;
  likes: number;
  comments?: Comment[];
  collaborations?: Collaboration[];
  isLiked?: boolean;
  isPublish: boolean;
};
