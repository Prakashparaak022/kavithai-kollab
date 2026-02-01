"use client";
import { myCollaborations } from "@/data/myCollaborations";
import AboutPoem from "../poem/AboutPoem";
import Collaborations from "./Collaborations";
import AppBgLayout from "../layouts/AppBgLayout";
import { usePlayerDetails } from "@/utils/UserSession";
import { useEffect } from "react";
import { RootState, useAppDispatch } from "@/store";
import { loadMyCollaborations } from "@/store/collaborations";
import { useSelector } from "react-redux";

const MyCollaborations = () => {
  const { collabs, loading } = useSelector((state: RootState) => state.collabs);
  const { displayName, playerDetails } = usePlayerDetails();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (playerDetails?.id) {
      dispatch(loadMyCollaborations({ userId: playerDetails.id }));
    }
  }, [playerDetails?.id]);

  return (
    <AppBgLayout
      layout="9/3"
      left={
        <div className="p-4 flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-green">
            Pending Contibutions
          </h3>
          <Collaborations
            collaborations={collabs.filter((c) => c.status === "PENDING")}
            loading={loading}
          />
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
