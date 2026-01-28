"use client";

import { Heart, MessageCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { FeedType, FilterType } from "./index";
import { poems } from "@/data/poem";
import { Poem } from "@/types/poem";
import Link from "next/link";
import Image from "next/image";
import ApiFeedCardList from "./ApiFeedCardList";
import useRequireAuth from "@/hooks/useRequireAuth";

type Props = {
  filter: FilterType;
  feedType: FeedType;
};

const FeedCardList = ({ filter, feedType }: Props) => {
  const { requireAuth } = useRequireAuth();

  const [poemsList, setPoemsList] = useState<Poem[]>(
    poems.map((poem) => ({ ...poem, isLiked: false }))
  );

  const filteredPoems = useMemo(() => {
    let list = [...poemsList];

    if (filter === "liked") {
      list.sort((a, b) => b.likes - a.likes);
    }

    if (filter === "recent") {
      list.reverse();
    }

    if (feedType === "public") {
      list = list.filter((p) => p.isPublish === true);
    }

    if (feedType === "private") {
      list = list.filter((p) => p.isPublish === false);
    }

    return list;
  }, [filter, poemsList, feedType]);

  const handleLike = (e: React.MouseEvent, id: number) => {
    if (!requireAuth(e)) return;
    setPoemsList((prev) =>
      prev.map((poem) =>
        poem.id === id
          ? {
              ...poem,
              isLiked: !poem.isLiked,
              likes: poem.isLiked ? poem.likes - 1 : poem.likes + 1,
            }
          : poem
      )
    );
  };

  return (
    <>
      {/* Cards */}
      <div className="grid grid-cols-12 gap-5">
        {filteredPoems.map((poem, index) => (
          <Link
            href={`/poem/${poem.slug}`}
            key={poem.id}
            className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 bg-card rounded-2xl flex flex-col">
            <div className="relative h-44 w-full">
              <Image
                src={poem.imageUrl}
                alt={poem.title}
                fill
                sizes="(max-width: 640px) 100vw,
                       (max-width: 1024px) 50vw,
                       25vw"
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
                  src={poem.authorImage || "/avatar-placeholder.png"}
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

              <div className="mt-auto flex items-center justify-between text-gray-500">
                <button
                  onClick={(e) => handleLike(e, poem.id)}
                  className={`flex items-center gap-1 text-xs transition ${
                    poem.isLiked
                      ? "text-red-500"
                      : "text-gray-500 hover:text-red-500"
                  }`}>
                  <Heart
                    size={16}
                    fill={poem.isLiked ? "currentColor" : "none"}
                  />
                  {poem.likes}
                </button>

                <div className="flex items-center gap-1 text-xs hover:text-blue-500 transition">
                  <MessageCircle size={16} />
                  {poem.comments?.length ?? 0}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default FeedCardList;
