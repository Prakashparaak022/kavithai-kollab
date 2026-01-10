"use client";
import { useState } from "react";
import PostSettings from "./PostSettings";
import WriteKavidhai from "./WriteKavidhai";

const Post = () => {
  const [allowCollab, setAllowCollab] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  return (
    <div className="bg-secondary p-4">
      <div className="bg-secondary grid grid-cols-12 gap-4 rounded-xl overflow-hidden">
        {/* Left bar */}
        <div className="bg-primary col-span-12 lg:col-span-9 space-y-4 p-4">
          {/* Create Post */}
          <WriteKavidhai allowCollab={allowCollab} isPrivate={isPrivate} />
        </div>

        {/* Notifications */}
        <div className="bg-primary col-span-12 lg:col-span-3 p-4">
          <PostSettings
            allowCollab={allowCollab}
            setAllowCollab={setAllowCollab}
            isPrivate={isPrivate}
            setIsPrivate={setIsPrivate}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
