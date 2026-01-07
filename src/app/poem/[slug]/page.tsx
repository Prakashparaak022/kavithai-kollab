"use client";
import Layout from "@/components/layouts";
import Collaborations from "@/components/poem/Collaborations";
import InviteModal from "@/components/poem/InviteModal";
import PoemDetailCard from "@/components/poem/PoemDetailCard";
import PoemMotion from "@/components/poem/PoemMotion";
import AboutPoem from "@/components/poemDetails/AboutPoem";
import Notifications from "@/components/poemDetails/Notifications";
import { poems } from "@/data/poem";
import { notFound } from "next/navigation";
import { useState } from "react";

type Props = {
  params: { slug: string };
};

const PoemDetailPage = ({ params }: Props) => {
  const poem = poems.find((p) => p.slug === params.slug);
  const [showInviteModal, setShowInviteModal] = useState(false);

  if (!poem) notFound();

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
          <Notifications showNotification={true} />
          <AboutPoem />
        </div>
      </div>
      {showInviteModal && (
        <InviteModal onClose={() => setShowInviteModal(false)} />
      )}
    </Layout>
  );
};

export default PoemDetailPage;
