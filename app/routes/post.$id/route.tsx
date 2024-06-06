import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkUnwrapImages from "remark-unwrap-images";
import { unified } from "unified";

import DatabaseInstance from "@/lib/server/prisma.server";
import { CommentResponseSchema } from "@/lib/types/comment";

import { Button } from "@/components/Button";
import { useCommentContext } from "@/components/CommentProvider/hooks";

import CommentCard from "./components/CommentCard";
import styles from "./style.css?url";

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;

  if (!id) {
    throw new Response("Not Found", { status: 404 });
  }

  const file = await axios.get<string>(
    `https://cdn.zengjunyin.com/blog/posts/${id}/post.md`,
  );

  const formatted = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkUnwrapImages)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(file.data);

  const comments = await DatabaseInstance.comments.findMany({
    select: {
      id: true,
      created_at: true,
      nick: true,
      email_md5: true,
      link: true,
      content: true,
      parent_id: true,
      reply_id: true,
      reply_nick: true,
    },
    where: {
      is_hidden: 0,
      post_id: parseInt(id),
    },
  });

  const commentResponse: CommentResponseSchema[] = [];

  comments.forEach((comment) => {
    const isReply = comment.parent_id;

    if (isReply) {
      const exist = commentResponse.find((c) => c.id === comment.parent_id);

      if (!exist) return;

      exist.replys.push({
        id: comment.id,
        created_at: comment.created_at,
        nick: comment.nick,
        email_md5: comment.email_md5,
        link: comment.link || "",
        content: comment.content,
        reply_id: comment.reply_id!,
        reply_nick: comment.reply_nick!,
      });
    } else {
      const exist = commentResponse.find((c) => c.id === comment.id);

      if (exist) return;

      commentResponse.push({
        id: comment.id,
        created_at: comment.created_at,
        nick: comment.nick,
        email_md5: comment.email_md5,
        link: comment.link || "",
        content: comment.content,
        replys: [],
      });
    }
  });

  commentResponse.sort((a, b) => b.created_at - a.created_at);

  commentResponse.forEach((comment) => {
    comment.replys.sort((a, b) => a.created_at - b.created_at);
  });

  return json({
    data: {
      markdown: formatted.value,
      comments: commentResponse,
    },
  });
};

export default function PostPage() {
  const { data } = useLoaderData<{
    data: {
      markdown: string;
      comments: CommentResponseSchema[];
    };
  }>();

  const { id } = useParams();
  const { setOpen, setPostId } = useCommentContext();

  const handleCommentClick = () => {
    setOpen(true);
    setPostId(parseInt(id!));
  };

  return (
    <div className="space-y-6 py-8">
      <div
        className="markdown space-y-6"
        dangerouslySetInnerHTML={{ __html: data.markdown }}
      ></div>
      <div className="space-y-6">
        <div className="text-2xl font-bold">评论</div>
        <CommentCard comments={data.comments} />
      </div>
      <div
        onClick={handleCommentClick}
        className="fixed bottom-10 right-6 z-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-theme p-2.5 text-white opacity-100 transition-opacity hover:opacity-75"
      >
        <MessageSquare />
      </div>
    </div>
  );
}
