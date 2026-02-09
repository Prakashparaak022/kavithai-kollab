"use client";

import useRequireAuth from "@/hooks/useRequireAuth";
import { RootState, useAppDispatch } from "@/store";
import { loadPoems, resetPoems, togglePoemLike } from "@/store/poems";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import PoemCard from "../common/PoemCard";
import { PoemCardSkeleton } from "../poem/PoemCardSkeleton";
import CustomModal from "../ui/CustomModal";
import CommentsList from "../poem/CommentsList";
import { FilterType } from "./index";
import InfiniteScroll from "../common/InfiniteScroll";
import { useInfiniteLoader } from "@/hooks/useInfiniteLoader";
import { selectPlayerDetails } from "@/store/selectors";

type Props = {
  filter: FilterType;
  isPrivate: boolean;
};

const PAGE_SIZE = 10;

const ApiFeedCardList = ({ filter, isPrivate }: Props) => {
  const dispatch = useAppDispatch();
  const {
    poems: { items: poems, loading, hasMore, page },
    likeLoading,
  } = useSelector((state: RootState) => state.poems);
  const { withAuth } = useRequireAuth();
  const playerDetails = useSelector(selectPlayerDetails);
  const playerLoading = useSelector(
    (state: RootState) => state.auth.playerLoading,
  );
  const [activePoemId, setActivePoemId] = useState<number | null>(null);
  const [commentsOpen, setCommentsOpen] = useState(false);

  // Initial load
  useEffect(() => {
    if (playerLoading) return;
    dispatch(resetPoems());
    dispatch(
      loadPoems({
        userId: playerDetails?.id,
        isPrivate: isPrivate,
        page: 0,
        size: PAGE_SIZE,
      }),
    );
  }, [dispatch, playerDetails?.id, playerLoading, isPrivate]);

  const loadMorePoems = useInfiniteLoader(
    (page, size) => {
      dispatch(
        loadPoems({
          userId: playerDetails?.id,
          isPrivate,
          page,
          size,
        }),
      );
    },
    page,
    PAGE_SIZE,
  );

  const handleLike = (id: number, isLiked: boolean) => {
    if (!playerDetails?.id) return;

    if (likeLoading === id) return;

    dispatch(
      togglePoemLike({
        poemId: id,
        userId: playerDetails.id,
        isLiked: !isLiked,
      }),
    );
  };

  const filteredPoems = useMemo(() => {
    const list = [...poems];

    if (filter === "liked") {
      list.sort((a, b) => b.likesCount - a.likesCount);
    }

    if (filter === "recent") {
      list.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }
    return list;
  }, [filter, poems]);

  return (
    <>
      <InfiniteScroll
        className="grid grid-cols-12 gap-5"
        loading={loading}
        hasMore={hasMore}
        list={filteredPoems}
        onLoadMore={loadMorePoems}
        loader={Array.from({ length: 8 }).map((_, index) => (
          <PoemCardSkeleton key={index} />
        ))}
        emptyMessage={<p className="text-center text-green">No poems found</p>}>
        {filteredPoems.map((poem, index) => (
          <PoemCard
            key={index}
            poem={poem}
            index={index}
            userId={playerDetails?.id}
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
    </>
  );
};

export default ApiFeedCardList;
