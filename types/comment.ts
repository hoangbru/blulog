import { User } from "./auth";
import { Post } from "./post";

export interface Comment {
  id: string | number;
  post: Post;
  user: User;
  replies: Comment[];
  likes: string[];
  parentComment: string | number | null;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
