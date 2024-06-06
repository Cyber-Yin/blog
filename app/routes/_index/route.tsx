import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import DatabaseInstance from "@/lib/server/prisma.server";
import { PostSummary } from "@/lib/types/post";

import PostCard from "./components/PostCard";

export const loader: LoaderFunction = async ({ request }) => {
  const response: {
    posts: PostSummary[];
  } = {
    posts: [],
  };

  const posts = await DatabaseInstance.posts.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      cover_url: true,
      created_at: true,
      updated_at: true,
    },
    where: {
      is_hidden: 0,
    },
    orderBy: [
      {
        sort: "desc",
      },
    ],
  });

  posts.forEach((post) => {
    response.posts.push({
      ...post,
      created_at: post.created_at.getTime(),
      updated_at: post.updated_at.getTime(),
    });
  });

  return json({
    data: response,
  });
};

export default function IndexPage() {
  const { data } = useLoaderData<{
    data: {
      posts: PostSummary[];
    };
  }>();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {data.posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
}
