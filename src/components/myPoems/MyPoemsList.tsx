"use client";

import useRequireAuth from "@/hooks/useRequireAuth";
import { RootState, useAppDispatch } from "@/store";
import { loadMyPoems, resetMyPoems, togglePoemLike } from "@/store/poems";
import { usePlayerDetails } from "@/utils/UserSession";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PoemCard from "../common/PoemCard";
import CommentsList from "../poem/CommentsList";
import { PoemCardSkeleton } from "../poem/PoemCardSkeleton";
import CustomModal from "../ui/CustomModal";
import InfiniteScroll from "../common/InfiniteScroll";
import { useInfiniteLoader } from "@/hooks/useInfiniteLoader";

type Props = {
  userId: number;
};

const PAGE_SIZE = 10;

const MyPoemsList = ({ userId }: Props) => {
  const dispatch = useAppDispatch();
  const {
    myPoems: { items: myPoems, loading, hasMore, page },
    likeLoading,
  } = useSelector((state: RootState) => state.poems);

  const { withAuth } = useRequireAuth();
  const { playerDetails, loading: playerLoading } = usePlayerDetails();
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [activePoemId, setActivePoemId] = useState<number | null>(null);
  const [commentsOpen, setCommentsOpen] = useState(false);

  // Initial load
  useEffect(() => {
    if (!userId) return;
    dispatch(resetMyPoems());
    dispatch(
      loadMyPoems({
        userId,
        isPrivate: isPrivate,
        page: 0,
        size: PAGE_SIZE,
      })
    );
  }, [dispatch, userId, playerLoading, isPrivate]);

  const loadMoreMyPoems = useInfiniteLoader(
    (page, size) => {
      dispatch(
        loadMyPoems({
          userId,
          isPrivate,
          page,
          size,
        })
      );
    },
    page,
    PAGE_SIZE
  );

  const handleLike = (id: number, isLiked: boolean) => {
    if (!userId) return;

    if (likeLoading === id) return;

    dispatch(
      togglePoemLike({
        poemId: id,
        userId,
        isLiked: !isLiked,
      })
    );
  };

  return (
    <div className="space-y-2">
      {/* Publish filter badges */}
      {playerLoading ? (
        <div className="flex gap-2 mb-4 animate-pulse">
          <div className="h-6 w-17 rounded-full bg-secondary" />
          <div className="h-6 w-17 rounded-full bg-gray-200" />
        </div>
      ) : (
        playerDetails && (
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setIsPrivate(false)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition
              ${
                !isPrivate
                  ? "bg-secondary text-white"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}>
              PUBLIC
            </button>

            <button
              onClick={() => setIsPrivate(true)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition
              ${
                isPrivate
                  ? "bg-secondary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}>
              PRIVATE
            </button>
          </div>
        )
      )}

      <InfiniteScroll
        className="grid grid-cols-12 gap-5"
        loading={loading}
        hasMore={hasMore}
        list={myPoems}
        onLoadMore={loadMoreMyPoems}
        loader={Array.from({ length: 8 }).map((_, index) => (
          <PoemCardSkeleton key={index} />
        ))}
        emptyMessage={<p className="text-center text-green">No poems found</p>}>
        {myPoems.map((poem, index) => (
          <PoemCard
            key={poem.id}
            poem={poem}
            index={index}
            userId={userId}
            onLike={(id, liked) => withAuth(() => handleLike(id, liked))()}
            onComment={(id) =>
              withAuth(() => {
                setActivePoemId(id);
                setCommentsOpen(true);
              })()
            }
          />
        ))}
      </InfiniteScroll>

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

export default MyPoemsList;
