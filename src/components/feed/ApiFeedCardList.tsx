"use client";

import useRequireAuth from "@/hooks/useRequireAuth";
import { RootState, useAppDispatch } from "@/store";
import { loadPoems, togglePoemLike } from "@/store/poems";
import { usePlayerDetails } from "@/utils/UserSession";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import PoemCard from "../common/PoemCard";
import { PoemCardSkeleton } from "../poem/PoemCardSkeleton";
import CustomModal from "../ui/CustomModal";
import CommentsList from "./CommentsList";
import { FeedType, FilterType } from "./index";

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
      <div className="grid grid-cols-12 gap-5">
        {Array.from({ length: 8 }).map((_, index) => (
          <PoemCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-5">
        {filteredPoems.map((poem, index) => (
          <PoemCard
            key={poem.id}
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
      </div>

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
