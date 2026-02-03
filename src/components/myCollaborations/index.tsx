"use client";
import AboutPoem from "../poem/AboutPoem";
import Collaborations from "./MyCollabList";
import AppBgLayout from "../layouts/AppBgLayout";
import { usePlayerDetails } from "@/utils/UserSession";
import useRequireAuth from "@/hooks/useRequireAuth";
const MyCollaborations = () => {
  const { displayName, playerDetails } = usePlayerDetails();
  const { withAuth } = useRequireAuth();

  return (
    <AppBgLayout
      layout="9/3"
      left={
        <div className="p-4 flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-green">
            Pending Contibutions
          </h3>
          {playerDetails?.id && <Collaborations userId={playerDetails?.id} />}
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
