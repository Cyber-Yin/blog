import { FriendType } from "@/lib/types/friend";

const LinkCard: React.FC<{
  data: FriendType;
}> = ({ data }) => {
  return (
    <a
      href={data.link}
      target="_blank"
      key={data.id}
      className="group flex h-20 w-full items-center space-x-3 rounded-lg border border-primary bg-secondary px-4 hover:border-secondary sm:h-24 sm:space-x-4"
    >
      <img
        src={data.avatar_url}
        alt={data.name}
        className="h-12 w-12 rounded-full bg-comment sm:h-16 sm:w-16"
      />
      <div className="flex h-11 flex-col justify-between sm:h-14">
        <div className="text-base transition-colors group-hover:text-theme sm:text-lg">
          {data.name}
        </div>
        <div className="line-clamp-1 text-xs text-secondary transition-colors group-hover:text-primary sm:text-sm">
          {data.description}
        </div>
      </div>
    </a>
  );
};

export default LinkCard;
