"use client";

import { useEffect } from "react";
import { usePlayerDetails } from "@/utils/UserSession";
import MyPoemsList from "./MyPoemsList";
import Loader from "../ui/Loader";
import { useModal } from "@/context/ModalContext";

const MyPoems = () => {
  const { playerDetails, loading } = usePlayerDetails();
  const { openLogin } = useModal();

  useEffect(() => {
    if (!loading && !playerDetails?.id) {
      openLogin();
    }
  }, [loading, playerDetails, openLogin]);

  if (loading || !playerDetails?.id) {
    return (
      <div className="m-4 p-4 bg-app min-h-[78vh] rounded-xl flex items-center justify-center overflow-hidden">
        <Loader />
      </div>
    );
  }

  return (
    <div className="m-4 p-4 bg-app min-h-[78vh] rounded-xl overflow-hidden">
      <MyPoemsList userId={playerDetails.id} />
    </div>
  );
};

export default MyPoems;
