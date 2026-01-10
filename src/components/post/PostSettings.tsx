"use client";
import { useState } from "react";
import { CustomSwitch } from "../ui/CustomSwitch";

const PostSettings = () => {
  const [allowCollab, setAllowCollab] = useState(true);
  const [isPrivate, setIsPrivate] = useState(true);

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-green">Post Settings</h3>

      <div className="bg-[#f8f5e4] rounded-xl p-6 shadow-lg space-y-4">
        <h4 className="text-md font-semibold text-green">Collaboration</h4>
        <div className="flex justify-between items-center">
          <p className="text-[#6a7a78] text-sm">Allow Collaboration</p>
          <CustomSwitch
            checked={allowCollab}
            onChange={() => setAllowCollab((prev) => !prev)}
          />
        </div>

        <div className="flex justify-between items-center">
          <p className="text-[#6a7a78] text-sm">Make Private</p>
          <CustomSwitch
            checked={isPrivate}
            onChange={() => setIsPrivate((prev) => !prev)}
          />
        </div>
      </div>
    </div>
  );
};

export default PostSettings;
