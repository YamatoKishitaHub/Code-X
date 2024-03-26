import { UserType } from "./user.type";
import { PostType } from "./post.type";

export type CommentType = {
  id: string;
  textContent?: string;
  codeLanguage?: string;
  codeContent?: string;
  createdAt: Date;
  updatedAt: Date;
  user: UserType;
  userId: string;
  post: PostType;
  postId: string;
};
