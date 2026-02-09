"use client";

import { useEffect } from "react";
import MyPoemsList from "./MyPoemsList";
import Loader from "../ui/Loader";
import { useModal } from "@/context/ModalContext";
import { useSelector } from "react-redux";
import { selectPlayerDetails, selectPlayerLoading } from "@/store/selectors";

const MyPoems = () => {
  
    const playerDetails = useSelector(selectPlayerDetails);
    const playerLoading = useSelector(selectPlayerLoading);

  const { openLogin } = useModal();

  useEffect(() => {
    if (!playerLoading && !playerDetails?.id) {
      openLogin();
    }
  }, [playerLoading, playerDetails, openLogin]);

  if (playerLoading || !playerDetails?.id) {
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
