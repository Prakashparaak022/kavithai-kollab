"use client";

import { useEffect, useMemo, useState } from "react";
import { FilterType } from "./index";
import { Poem } from "@/types/poem";
import Link from "next/link";
import Image from "next/image";
import { API_URLS } from "@/services/apiUrls";

type ApiResponse = {
  content: PoemWithImage[];
};

type PoemWithImage = Poem & {
  image?: string;
};

const TempFeedCardList = ({ filter }: { filter: FilterType }) => {
  const [poemsList, setPoemsList] = useState<PoemWithImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const res = await fetch(API_URLS.KAVITHAI_ALL);

        if (!res.ok) {
          throw new Error("Failed to fetch poems");
        }

        const data: ApiResponse = await res.json();

        setPoemsList(
          data.content.map((poem) => ({
            ...poem,
            isLiked: poem.isLiked ?? false,
            imageUrl: poem.image ? `data:image/jpeg;base64,${poem.image}` : "",
          }))
        );
      } catch (error) {
        console.error("Error while fetching Feed List:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoems();
  }, []);

  const displayList = useMemo(() => {
    if (filter === "liked") {
      return [...poemsList].sort((a, b) => b.likes - a.likes);
    }

    if (filter === "recent") {
      return [...poemsList].reverse();
    }

    return poemsList;
  }, [filter, poemsList]);

  if (loading) {
    return <div className="text-center py-10">Loading poems...</div>;
  }

  return (
    <>
      {displayList.map((poem, index) => (
        <Link
          href={`/poem/${poem.slug}`}
          key={poem.id}
          className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 bg-[#f8f5e4] rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
          <div className="relative h-44 w-full">
            <Image
              src={poem.imageUrl || "/placeholder.png"}
              alt={poem.title}
              fill
              unoptimized
              className="p-2 object-cover rounded-2xl"
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
          </div>
        </Link>
      ))}
    </>
  );
};

export default TempFeedCardList;
