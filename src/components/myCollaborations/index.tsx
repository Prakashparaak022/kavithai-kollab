"use client";
import { myCollaborations } from "@/data/myCollaborations";
import AboutPoem from "../poem/AboutPoem";
import Collaborations from "./Collaborations";
import AppBgLayout from "../layouts/AppBgLayout";
import { usePlayerDetails } from "@/utils/UserSession";

const MyCollaborations = () => {
  const { displayName } = usePlayerDetails();

  return (
    <AppBgLayout
      layout="9/3"
      left={
        <div className="p-4">
          <Collaborations collaborations={myCollaborations ?? []} />
        </div>
      }
      right={
        <div className="p-4">
          <AboutPoem poetName={displayName || ""} />
        </div>
      }
    />
  );
};

export default MyCollaborations;
