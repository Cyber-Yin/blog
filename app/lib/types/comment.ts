export type CommentType = {
  id: number;
  created_at: number;
  nick: string;
  email_md5: string;
  link: string;
  content: string;
};

export type ReplyType = CommentType & {
  reply_id: number;
  reply_nick: string;
};

export type CommentResponseSchema = CommentType & {
  replys: ReplyType[];
};
