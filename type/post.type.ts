import { UserType } from "./user.type";
import { CommentType } from "./comment.type";

export type PostType = {
  id: string;
  textContent?: string;
  codeLanguage?: string;
  codeContent?: string;
  createdAt: Date;
  updatedAt?: Date;
  user: UserType;
  userId: string;
  comments: CommentType[];
};

