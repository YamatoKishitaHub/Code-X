import { createContext, useContext, useState } from "react";

import { UserType } from "@/type/user.type";
import { PostType } from "@/type/post.type";
import { CommentType } from "@/type/comment.type";

type AppProviderProps = {
  children: React.ReactNode;
};

type AppContextType = {
  users: null | UserType[];
  setUsers: (data: null | UserType[]) => void;
  currentUser: null | UserType;
  setCurrentUser: (data: null | UserType) => void;
  posts: null | PostType[];
  setPosts: (data: null | PostType[]) => void;
  comments: null | CommentType[];
  setComments: React.Dispatch<React.SetStateAction<CommentType[] | null>>;
};

const defaultContextData = {
  users: null,
  setUsers: () => {},
  currentUser: null,
  setCurrentUser: () => {},
  posts: null,
  setPosts: () => {},
  comments: null,
  setComments: () => {},
};

const AppContext = createContext<AppContextType>(defaultContextData);

export function AppProvider({ children }: AppProviderProps) {
  const [users, setUsers] = useState<null | UserType[]>(typeof window !== "undefined" ? JSON.parse(localStorage.getItem("users") as string) : null);
  const [currentUser, setCurrentUser] = useState<null | UserType>(typeof window !== "undefined" ? JSON.parse(localStorage.getItem("currentUser") as string) : null);

  const [posts, setPosts] = useState<null | PostType[]>(typeof window !== "undefined" ? JSON.parse(localStorage.getItem("posts") as string) : null);
  const [comments, setComments] = useState<null | CommentType[]>(null);

  const setUsersData = (data: null | UserType[]) => {
    setUsers(data);
    localStorage.setItem("users", JSON.stringify(data));
  };

  const setCurrentUserData = (data: null | UserType) => {
    setCurrentUser(data);
    localStorage.setItem("currentUser", JSON.stringify(data));
  };

  const setPostsData = (data: null | PostType[]) => {
    setPosts(data);
    localStorage.setItem("posts", JSON.stringify(data));
  };

  return (
    <AppContext.Provider value={{ users, setUsers: setUsersData, currentUser, setCurrentUser: setCurrentUserData, posts, setPosts: setPostsData, comments, setComments }}>
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}
