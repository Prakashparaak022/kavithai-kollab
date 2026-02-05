"use client";

import { useEffect, useState } from "react";
import UpdateProfile from "./UpdateProfile";
import { useModal } from "@/context/ModalContext";
import { fetchUserProfileById } from "@/services/api/userProfile.service";
import Loader from "../ui/Loader";
import { ApiUserProfile } from "@/types/api";
import { usePlayerDetails } from "@/utils/UserSession";

const Profile = () => {
  const { playerDetails, loading: playerLoading } = usePlayerDetails();
  const { openLogin } = useModal();
  const [userProfile, setUserProfile] = useState<ApiUserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const playerId = playerDetails?.id;

  const loadProfile = async () => {
    if (!playerId) return;
    try {
      const profile = await fetchUserProfileById({ userId: playerId });
      setUserProfile(profile);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (playerLoading) return;
    if (!playerId) {
      openLogin();
      return;
    }
    loadProfile();
  }, [playerId, playerLoading]);

  if (loading || playerLoading) {
    return (
      <div className="m-4 p-4 bg-app min-h-[78vh] rounded-xl flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="m-4 p-4 bg-app min-h-[78vh] rounded-xl flex flex-col items-center justify-center text-center">
        <p className="mb-4 text-lg text-green">
          You must be logged in to view your profile.
        </p>
        <button
          onClick={openLogin}
          className="rounded-full bg-secondary px-6 py-2 text-white hover:bg-teal-800">
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="m-4 p-4 bg-app min-h-[78vh] rounded-xl overflow-hidden">
      <UpdateProfile userProfile={userProfile} profileRefresh={loadProfile} />
    </div>
  );
};

export default Profile;
