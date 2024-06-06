import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import DatabaseInstance from "@/lib/server/prisma.server";
import { FriendType } from "@/lib/types/friend";

import LinkCard from "./components/LinkCard";

export const loader: LoaderFunction = async () => {
  const friends = await DatabaseInstance.friends.findMany({
    select: {
      id: true,
      name: true,
      link: true,
      description: true,
      avatar_url: true,
      type: true,
    },
    orderBy: [
      {
        sort: "desc",
      },
    ],
  });

  return json({
    data: {
      friends,
    },
  });
};

export default function LinksPage() {
  const { data } = useLoaderData<{
    data: {
      friends: FriendType[];
    };
  }>();

  return (
    <>
      <div>综合类</div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {data.friends
          .filter((friend) => friend.type === 0)
          .map((friend) => (
            <LinkCard
              data={friend}
              key={friend.id}
            />
          ))}
      </div>
      <div>生活类</div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {data.friends
          .filter((friend) => friend.type === 1)
          .map((friend) => (
            <LinkCard
              data={friend}
              key={friend.id}
            />
          ))}
      </div>
      <div>技术类</div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {data.friends
          .filter((friend) => friend.type === 2)
          .map((friend) => (
            <LinkCard
              data={friend}
              key={friend.id}
            />
          ))}
      </div>
    </>
  );
}
