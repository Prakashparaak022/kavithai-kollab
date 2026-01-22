"use client";
import Collaborations from "@/components/poem/Collaborations";
import InviteModal from "@/components/poem/InviteModal";
import Notifications from "@/components/poem/Notifications";
import PoemDetailCard from "@/components/poem/PoemDetailCard";
import PoemMotion from "@/components/poem/PoemMotion";
import { Notification } from "@/types/notification";
import type { Poem } from "@/types/poem";
import { useState } from "react";
import AboutPoem from "./AboutPoem";
import Comments from "./Comments";
import AppBgLayout from "../layouts/AppBgLayout";

type Props = {
  poem: Poem;
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: "INVITE",
    message: 'You were invited to collaborate on "Paarvai thuligal"',
    poemSlug: "paarvai-thuligal",
    createdAt: new Date().toISOString(),
    read: false,
  },
];

const Poem = ({ poem }: Props) => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
    

  return (
    <AppBgLayout
      layout="9/3"
      left={
        <div className="p-4 space-y-4">
          {/* Dynamic Poem Card */}
          <PoemMotion motionKey={poem.slug}>
            <PoemDetailCard
              title={poem.title}
              username={poem.author}
              content={poem.content || "No content available"}
              imageUrl={poem.imageUrl}
            />
          </PoemMotion>
          {/* Collaboration List */}
          {poem.isPublish ? (
            <Comments comments={poem.comments ?? []} />
          ) : (
            <Collaborations
              collaborations={poem.collaborations ?? []}
              onInvite={() => setShowInviteModal(true)}
            />
          )}
        </div>
      }
      right={
        <div className="p-4 space-y-4">
          <AboutPoem />
          {showInviteModal && (
            <InviteModal onClose={() => setShowInviteModal(false)} />
          )}
        </div>
      }
    />
  );
};

export default Poem;
