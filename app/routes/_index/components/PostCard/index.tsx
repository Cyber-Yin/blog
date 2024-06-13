import { useNavigate } from "@remix-run/react";
import dayjs from "dayjs";
import { CalendarDays, Tag } from "lucide-react";

import { PostSummary } from "@/lib/types/post";

const PostCard: React.FC<{
  post: PostSummary;
}> = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/post/${post.id}`)}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-lg border border-primary bg-secondary transition-colors hover:border-secondary"
    >
      <div className="flex h-48 w-full items-center justify-center overflow-hidden">
        <img
          src={post.cover_url}
          alt={post.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-125"
        />
      </div>
      <div className="flex h-48 w-full flex-col justify-between space-y-5 p-4">
        <h2 className="line-clamp-1 text-xl font-bold transition-colors group-hover:text-theme">
          {post.title}
        </h2>
        <p className="line-clamp-3 grow text-justify text-sm/6 text-secondary transition-colors">
          {post.description}
        </p>
        <div className="flex items-center space-x-2 truncate">
          <div className="flex items-center space-x-1">
            <CalendarDays className="h-4 w-4" />
            <time className="text-sm font-semibold">
              {dayjs(post.created_at).format("YYYY-MM-DD HH:mm")}
            </time>
          </div>
          <div className="flex items-center space-x-1">
            <Tag className="h-4 w-4" />
            <span className="text-sm font-semibold">{post.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
