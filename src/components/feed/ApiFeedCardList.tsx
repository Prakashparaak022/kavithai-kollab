"use client";

import { useEffect, useMemo, useState } from "react";
import { FeedType, FilterType } from "./index";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store";
import { Heart, MessageCircle } from "lucide-react";
import { usePlayerDetails } from "@/utils/UserSession";
import useRequireAuth from "@/hooks/useRequireAuth";
import { loadPoems, togglePoemLike } from "@/store/poems";
import CustomModal from "../ui/CustomModal";
import CommentsList from "./CommentsList";
import { getUserImageSrc } from "@/utils/imageUtils";
import Loader from "../ui/Loader";

type Props = {
  filter: FilterType;
  feedType: FeedType;
};
const ApiFeedCardList = ({ filter, feedType }: Props) => {
  const dispatch = useAppDispatch();
  const { poems, loading, likeLoading } = useSelector(
    (state: RootState) => state.poems
  );
  const { withAuth } = useRequireAuth();
  const {
    playerDetails,
    loading: playerLoading,
    displayName,
  } = usePlayerDetails();
  const [activePoemId, setActivePoemId] = useState<number | null>(null);
  const [commentsOpen, setCommentsOpen] = useState(false);

  useEffect(() => {
    if (playerLoading) return;
    dispatch(loadPoems({ userId: playerDetails?.id }));
  }, [dispatch, playerDetails?.id, playerLoading]);

  const handleLike = (id: number, isLiked: boolean) => {
    if (!playerDetails?.id) return;

    if (likeLoading === id) return;

    dispatch(
      togglePoemLike({
        poemId: id,
        userId: playerDetails.id,
        isLiked: !isLiked,
      })
    );
  };

  const filteredPoems = useMemo(() => {
    let list = [...poems];

    if (filter === "liked") {
      list.sort((a, b) => b.likesCount - a.likesCount);
    }

    if (filter === "recent") {
      list.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
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
      <div className="w-full flex flex-col items-center justify-center py-6">
        <Loader />
        <p className="text-green text-sm font-semibold">Loading poems...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-5">
      {filteredPoems.map((poem, index) => {
        return (
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

              <div className="mt-auto flex items-center justify-between text-gray-500">
                <button
                  onClick={withAuth(() => handleLike(poem.id, poem.isLiked))}
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

                <div
                  className="flex items-center gap-1 text-xs hover:text-blue-500 transition"
                  onClick={withAuth(() => {
                    setActivePoemId(poem.id);
                    setCommentsOpen(true);
                  })}>
                  <MessageCircle size={16} />
                  {poem.commentsCount}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {commentsOpen && activePoemId && (
        <CustomModal
          title="Add a comment"
          onClose={() => setCommentsOpen(false)}>
          <CommentsList postId={activePoemId} />
        </CustomModal>
      )}
    </div>
  );
};

export default ApiFeedCardList;
