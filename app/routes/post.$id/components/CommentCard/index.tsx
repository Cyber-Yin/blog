import { useParams } from "@remix-run/react";
import dayjs from "dayjs";
import { MessageSquare } from "lucide-react";

import {
  CommentResponseSchema,
  CommentType,
  ReplyType,
} from "@/lib/types/comment";
import { cn } from "@/lib/utils";

import { useCommentContext } from "@/components/CommentProvider/hooks";

const CommentCard: React.FC<{
  comments: CommentResponseSchema[];
}> = ({ comments }) => {
  return (
    <div className="w-full space-y-6 rounded-lg bg-secondary p-4 sm:p-5">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentContent
            key={comment.id}
            comment={{
              ...comment,
              reply_id: 0,
              reply_nick: "",
            }}
            isReply={false}
          >
            {comment.replys.map((reply) => (
              <CommentContent
                key={reply.id}
                comment={reply}
                isReply={true}
              ></CommentContent>
            ))}
          </CommentContent>
        ))
      ) : (
        <div className="text-center text-base font-bold text-secondary sm:text-lg">
          暂无评论
        </div>
      )}
    </div>
  );
};

const CommentContent: React.FC<{
  comment: ReplyType;
  isReply: boolean;
  children?: React.ReactNode;
}> = ({ comment, isReply, children }) => {
  const { id } = useParams();

  const { setSelectedComment, setOpen, setPostId } = useCommentContext();

  const handleCommentClick = (comment: CommentType) => {
    setSelectedComment(comment);
    setOpen(true);
    setPostId(parseInt(id!));
  };

  return (
    <div
      className={cn("w-full space-y-6", {
        "pl-14": isReply,
      })}
    >
      <div className="group relative flex w-full space-x-3 sm:space-x-4">
        <div className="h-8 w-8 shrink-0 overflow-hidden rounded-md bg-comment sm:h-10 sm:w-10">
          <img
            className="h-full w-full"
            src={`https://cravatar.cn/avatar/${comment.email_md5}`}
            alt="avatar"
          />
        </div>
        <div className="w-full space-y-4">
          <div className="flex h-8 items-center space-x-4 sm:h-10">
            {comment.link ? (
              <a
                href={comment.link}
                target="_blank"
                className="text-base transition-colors hover:text-theme sm:text-lg"
              >
                {comment.nick}
              </a>
            ) : (
              <div className="text-base sm:text-lg">{comment.nick}</div>
            )}
            <div className="text-xs text-secondary sm:text-sm">
              {dayjs.unix(comment.created_at).format("YYYY-MM-DD HH:mm:ss")}
            </div>
          </div>
          <div className="overflow-hidden whitespace-pre rounded-md bg-comment p-3 text-justify text-sm/8 sm:p-4 sm:text-base/8">
            {comment.content}
          </div>
        </div>
        <div className="absolute right-0 top-0 flex h-8 items-center opacity-100 transition-opacity group-hover:opacity-100 sm:h-10 sm:opacity-0">
          <MessageSquare
            onClick={() => handleCommentClick(comment)}
            className="h-4 w-4 cursor-pointer text-secondary transition-colors hover:text-theme sm:h-5 sm:w-5"
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default CommentCard;
