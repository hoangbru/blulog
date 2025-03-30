"use client";

import { createContext, ReactNode, useContext, useState } from "react";

export type PostQueryParams = {
  page?: string;
  limit?: string;
  sort?: string;
  category?: string;
  tags?: string;
};

type PostQueryContextType = {
  query: PostQueryParams;
  setQuery: (key: string, value: string) => void;
};

const PostQueryContext = createContext<PostQueryContextType | undefined>(undefined);

export const PostQueryProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQueryState] = useState<PostQueryParams>({});

  const setQuery = (key: string, value: string) => {
    setQueryState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <PostQueryContext.Provider value={{ query, setQuery }}>
      {children}
    </PostQueryContext.Provider>
  );
};

export const usePostQuery = () => {
  const context = useContext(PostQueryContext);
  if (!context) {
    throw new Error("usePostQuery must be used within a PostQueryProvider");
  }
  return context;
};
