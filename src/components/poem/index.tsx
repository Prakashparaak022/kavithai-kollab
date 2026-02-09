"use client";
import InviteModal from "@/components/poem/InviteModal";
import PoemDetailCard from "@/components/poem/PoemDetailCard";
import PoemMotion from "@/components/poem/PoemMotion";
import { useState } from "react";
import AboutPoem from "./AboutPoem";
import AppBgLayout from "../layouts/AppBgLayout";
import { ApiPoem } from "@/types/api";
import CommentsList from "./CommentsList";
import CollaborationsList from "./CollabList";
import { useAppDispatch } from "@/store";
import { updatePoem } from "@/store/poems";
import { toast } from "react-toastify";
import { usePlayerDetails } from "@/utils/UserSession";
import Loader from "../ui/Loader";
import { useModal } from "@/context/ModalContext";

type Props = {
  poem: ApiPoem;
};

const Poem = ({ poem: initialPoem }: Props) => {
  const dispatch = useAppDispatch();
  const [poem, setPoem] = useState<ApiPoem>(initialPoem);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const { openLogin } = useModal();
  const { playerDetails, loading: playerLoading } = usePlayerDetails();

  const handlePublish = () => {
    const formData = new FormData();
    formData.append("isPublish", "true");
    formData.append("isPrivate", "false");

    dispatch(
      updatePoem({
        id: poem.id,
        formData,
      })
    )
      .unwrap()
      .then((updatedPoem) => {
        setPoem(updatedPoem);
        () => toast.success("Poem updated");
      })
      .catch(() => toast.error("Update failed"));
  };

  if (playerLoading) {
    return (
      <div className="m-4 p-4 bg-app min-h-[78vh] rounded-xl flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!playerDetails?.id) {
    return (
      <div className="m-4 p-4 bg-app min-h-[78vh] rounded-xl flex flex-col items-center justify-center text-center">
        <p className="mb-4 text-lg text-green">
          You must be logged in to view your profile.
        </p>
        <button
          onClick={openLogin}
          className="rounded-full bg-secondary px-6 py-2 text-white hover:bg-teal-800">
          Login
        </button>
      </div>
    );
  }

  const isPoemOwner = poem.userId === playerDetails.id;

  return (
    <AppBgLayout
      layout="9/3"
      left={
        <div className="p-4 space-y-4">
          {/* Dynamic Poem Card */}
          <PoemMotion motionKey={String(poem.id)}>
            <PoemDetailCard
              title={poem.title || ""}
              username={poem.author}
              content={poem.content || "No content available"}
              imageUrl={poem.imageUrl}
            />
          </PoemMotion>
          {/* Collaboration List */}
          {poem.isPublish ? (
            <CommentsList postId={poem.id} />
          ) : (
            <CollaborationsList
              poem={poem}
              onInvite={() => setShowInviteModal(true)}
              onPoemRefresh={(updatedPoem) => setPoem(updatedPoem)}
            />
          )}
        </div>
      }
      right={
        <div className="p-4 space-y-4">
          <AboutPoem
            isPoemOwner={isPoemOwner}
            participants={poem.collaborationCount}
            poetName={poem.author}
            handlePublish={handlePublish}
          />
          {showInviteModal && (
            <InviteModal
              poem={poem}
              onClose={() => setShowInviteModal(false)}
            />
          )}
        </div>
      }
    />
  );
};

export default Poem;
