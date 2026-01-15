"use client";
import { useState } from "react";
import PostSettings from "./PostSettings";
import WriteKavidhai from "./WriteKavidhai";
import AppBgLayout from "../layouts/AppBgLayout";

const Post = () => {
  const [allowCollab, setAllowCollab] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  return (
    <AppBgLayout
      layout="9fr_16px_3fr"
      left={
        <div className="p-4">
          <WriteKavidhai allowCollab={allowCollab} isPrivate={isPrivate} />
        </div>
      }
      right={
        <div className="p-4">
          <PostSettings
            allowCollab={allowCollab}
            setAllowCollab={setAllowCollab}
            isPrivate={isPrivate}
            setIsPrivate={setIsPrivate}
          />
        </div>
      }
    />
  );
};

export default Post;
