"use client";

import { Heart, MessageCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { FilterType } from "./index";
import { poems } from "@/data/poem";
import { Poem } from "@/types/poem";
import Link from "next/link";
import Image from "next/image";

const FeedCardList = ({ filter }: { filter: FilterType }) => {
  const [poemsList, setPoemsList] = useState<Poem[]>(
    poems.map((poem) => ({ ...poem, isLiked: false }))
  );

  const filteredPoems = useMemo(() => {
    if (filter === "liked") {
      return [...poemsList].sort((a, b) => b.likes - a.likes);
    }
    if (filter === "recent") {
      return [...poemsList].reverse();
    }
    return poemsList;
  }, [filter, poemsList]);

  const handleLike = (id: number) => {
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
    <div className="grid grid-cols-12 gap-5">
      {filteredPoems.map((poem, index) => (
        <Link
          href={`/poem/${poem.slug}`}
          key={poem.id}
          className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 bg-[#f8f5e4] rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
          <div className="relative h-44 w-full">
            <Image
              src={poem.imageUrl}
              alt={poem.title}
              fill
              sizes="(max-width: 640px) 100vw,
                     (max-width: 1024px) 50vw,
                     25vw"
              className="p-2 object-cover rounded-2xl"
              priority={index === 0}
            />
          </div>

          <div className="p-4 flex flex-col h-40">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-800 line-clamp-1">
                {poem.title}
              </h3>
              <span className="text-xs text-gray-500">{poem.author}</span>
            </div>

            <p className="text-sm text-gray-600 line-clamp-3 mt-2">
              {poem.content}
            </p>

            <div className="mt-auto flex items-center justify-between text-gray-500">
              <button
                onClick={() => handleLike(poem.id)}
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

              <button className="flex items-center gap-1 text-xs hover:text-blue-500 transition">
                <MessageCircle size={16} />
                {poem.comments?.length ?? 0}
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FeedCardList;
