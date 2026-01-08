"use client";
import Layout from "@/components/layouts";
import Collaborations from "@/components/poem/Collaborations";
import InviteModal from "@/components/poem/InviteModal";
import Notifications from "@/components/poem/Notifications";
import PoemDetailCard from "@/components/poem/PoemDetailCard";
import PoemMotion from "@/components/poem/PoemMotion";
import AboutPoem from "@/components/poemDetails/AboutPoem";
import { Notification } from "@/types/notification";
import type { Poem } from "@/types/poem";
import { useState } from "react";

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
    <Layout>
      <div className="grid grid-cols-12 p-4 gap-6">
        {/* Left bar */}
        <div className="col-span-12 lg:col-span-9 space-y-4">
          {/* Dynamic Poem Card */}
          <PoemMotion motionKey={poem.slug}>
            <PoemDetailCard
              title={poem.title}
              username={poem.author}
              content={poem.content || "No content available"}
              onInvite={() => setShowInviteModal(true)}
            />
          </PoemMotion>
          {/* Collaboration List */}
          <Collaborations collaborations={poem.collaborations ?? []} />
        </div>

        {/* Notifications */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
          <Notifications
            notifications={notifications}
            setNotifications={setNotifications}
          />
          <AboutPoem />
        </div>
      </div>
      {showInviteModal && (
        <InviteModal onClose={() => setShowInviteModal(false)} />
      )}
    </Layout>
  );
};

export default Poem;
// feature: home, poem
// home: cards, filters
// poem: collaborations list ui, add line, approve & reject, invite button
// feature: invite modal
// notifications