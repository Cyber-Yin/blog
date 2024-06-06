import { useContext } from "react";

import { CommentContext } from "./provider";

export const useCommentContext = () => {
  const context = useContext(CommentContext);

  if (!context) {
    throw new Error("useCommentContext must be used within a CommentProvider");
  }

  return context;
};
