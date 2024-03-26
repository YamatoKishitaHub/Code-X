import { PostType } from "./post.type";
import { CommentType } from "./comment.type";

export type UserType = {
  id: string;
  name: string;
  username: string
  email: string;
  hashedPassword: string;
  bio?: string;
  location?: string;
  website?: string;
  iconImage?: string;
  headerImage?: string;
  createdAt: Date;
  updatedAt: Date;
  followingIds: string[];
  posts: PostType[];
  comment: CommentType[];
};
