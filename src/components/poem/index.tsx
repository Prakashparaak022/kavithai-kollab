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

type Props = {
  poem: ApiPoem;
};

const Poem = ({ poem: initialPoem }: Props) => {
  const [poem, setPoem] = useState<ApiPoem>(initialPoem);
  const [showInviteModal, setShowInviteModal] = useState(false);

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
            participants={poem.collaborationCount}
            poetName={poem.author}
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
