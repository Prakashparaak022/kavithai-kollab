"use client";

import { useEffect, useMemo } from "react";
import { FeedType, FilterType } from "./index";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { addPoemLike, loadPoems } from "@/store/slices/poemsSlice";
import { Heart, MessageCircle } from "lucide-react";
import { usePlayerDetails } from "@/utils/UserSession";

type Props = {
  filter: FilterType;
  feedType: FeedType;
};
const ApiFeedCardList = ({ filter, feedType }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { poems, loading } = useSelector((state: RootState) => state.poems);
  const { playerDetails } = usePlayerDetails();

  useEffect(() => {
    if (!poems.length) {
      dispatch(loadPoems());
    }
  }, [dispatch, poems.length]);

  const handleLike = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addPoemLike({ id, playerDetails }));
  };

  const filteredPoems = useMemo(() => {
    let list = [...poems];

    if (filter === "liked") {
      list.sort((a, b) => b.likesCount - a.likesCount);
    }

    if (filter === "recent") {
      list.reverse();
    }

    if (feedType === "public") {
      list = list.filter((p) => p.isPublish === true);
    }

    if (feedType === "private") {
      list = list.filter((p) => p.isPrivate === true);
    }

    return list;
  }, [filter, poems, feedType]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">Loading poems...</div>
    );
  }

  return (
    <>
      {filteredPoems.map((poem, index) => (
        <div
          key={poem.id}
          className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 bg-card rounded-2xl flex flex-col">
          <div className="relative h-44 w-full">
            <Image
              src={`data:image/jpeg;base64,${poem.imageUrl}`}
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

            <p className="text-sm text-gray-600 line-clamp-2">{poem.content}</p>

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
                {poem.likesCount}
              </button>

              <div className="flex items-center gap-1 text-xs hover:text-blue-500 transition">
                <MessageCircle size={16} />
                {poem.comments?.length ?? 0}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ApiFeedCardList;
