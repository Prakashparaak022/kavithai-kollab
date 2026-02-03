import Image from "next/image";
import Link from "next/link";
import { getBase64ImageSrc, getUserImageSrc } from "@/utils/imageUtils";
import PoemCardActions from "./PoemCardActions";
import { ApiPoem } from "@/types/api";

type Props = {
  poem: ApiPoem;
  index: number;
  userId?: number;
  onLike: (id: number, isLiked: boolean) => void;
  onComment: (id: number) => void;
};

const PoemCard = ({ poem, index, userId, onLike, onComment }: Props) => {
  return (
    <Link
      href={
        poem.isPublish
          ? `/poem/${poem.id}`
          : `/poem/${poem.id}?userId=${userId}`
      }
      className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 bg-card rounded-2xl flex flex-col"
    >
      <div className="relative h-44 w-full">
        <Image
          src={getBase64ImageSrc(poem.imageUrl ?? "")}
          alt={poem.title || ""}
          fill
          unoptimized
          className="object-cover rounded-t-2xl p-2"
          priority={index === 0}
        />
      </div>

      <div className="pt-2 px-4 pb-4 flex flex-col h-40 space-y-1">
        <h3 className="text-base font-semibold text-gray-800 line-clamp-1">
          {poem.title}
        </h3>

        <div className="flex items-center gap-1">
          <Image
            src={getUserImageSrc(poem.authorImage)}
            alt={poem.author}
            width={20}
            height={20}
            className="rounded-full object-cover"
          />
          <span className="text-xs text-blue-500 font-medium line-clamp-1">
            {poem.author}
          </span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">
          {poem.content}
        </p>

        <PoemCardActions
          poem={poem}
          onLike={onLike}
          onComment={onComment}
        />
      </div>
    </Link>
  );
};

export default PoemCard;
