"use client";
import AboutPoem from "../poem/AboutPoem";
import AppBgLayout from "../layouts/AppBgLayout";
import MyCollaborationsList from "./MyCollabList";
import { useSelector } from "react-redux";
import { selectDisplayName, selectPlayerDetails } from "@/store/selectors";

const MyCollaborations = () => {
  const playerDetails = useSelector(selectPlayerDetails);
  const displayName = useSelector(selectDisplayName);

  return (
    <AppBgLayout
      layout="9/3"
      left={
        <div className="p-4 flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-green">
            Pending Contibutions
          </h3>
          {playerDetails?.id && (
            <MyCollaborationsList userId={playerDetails?.id} />
          )}
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
