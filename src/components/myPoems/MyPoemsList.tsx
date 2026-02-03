"use client";

import useRequireAuth from "@/hooks/useRequireAuth";
import { RootState, useAppDispatch } from "@/store";
import { loadMyPoems, togglePoemLike } from "@/store/poems";
import { usePlayerDetails } from "@/utils/UserSession";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PoemCard from "../common/PoemCard";
import CommentsList from "../poem/CommentsList";
import { PoemCardSkeleton } from "../poem/PoemCardSkeleton";
import CustomModal from "../ui/CustomModal";

const MyPoemsList = () => {
  const dispatch = useAppDispatch();
  const {
    myPoems: { items: myPoems, loading, hasMore, page },
    likeLoading,
  } = useSelector((state: RootState) => state.poems);

  const { withAuth } = useRequireAuth();
  const { playerDetails } = usePlayerDetails();
  const [activePoemId, setActivePoemId] = useState<number | null>(null);
  const [commentsOpen, setCommentsOpen] = useState(false);

  useEffect(() => {
    if (!playerDetails?.id) return;
    dispatch(loadMyPoems({ userId: playerDetails?.id }));
  }, [dispatch, playerDetails?.id]);

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
        {myPoems.map((poem, index) => (
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

export default MyPoemsList;
