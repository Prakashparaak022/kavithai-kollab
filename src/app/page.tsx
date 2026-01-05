"use client";

import { useState } from "react";
import PoemCard from "@/components/home/PoemCard";
import PoemCommentsList from "@/components/home/PoemCommentsList";
import Notifications from "@/components/home/Notifications";
import PoemDetails from "@/components/home/PoemDetails";
import { AnimatePresence, motion } from "framer-motion";
import InviteModal from "@/components/home/InviteModal";
import Layout from "@/components/layouts/Layout";

type Poem = {
  title: string;
  author: string;
  image: string;
  content?: string;
  comments?: Comment[];
};

type Comment = {
  name: string;
  text: string;
};

const poems: Poem[] = [
  {
    title: "மழை வருகை",
    content: "மழை வந்து என் மனதை சுத்தம் செய்தது",
    author: "@arunpoet",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=100&h=100&fit=crop",
    comments: [
      { name: "@user1", text: "அற்புதம்!" },
      { name: "@poetrylover", text: "சுகமான வரிகள்!" },
      { name: "@rainyfan", text: "மழை நினைவுகளைத் தூண்டியது" },
    ],
  },
  {
    title: "நட்சத்திரம்",
    content: "நட்சத்திரங்கள் கண்ணில் விழும் பொழுது, நினைவுகள் சிரித்தன",
    author: "@kaviirathi",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    comments: [
      { name: "@stargazer", text: "இனிமையான கவிதை!" },
      { name: "@dreamer", text: "நட்சத்திரங்கள் உண்மையில் அழகானவை" },
    ],
  },
  {
    title: "காற்றின் கதை",
    content: "காற்றின் தென் வாசல் எங்கள் கதையை சொன்னது",
    author: "@herondhi",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    comments: [
      { name: "@breezy", text: "அற்புதமான உவமை!" },
      { name: "@listener", text: "காற்றின் குரல் உணர்வூட்டும்" },
      { name: "@naturefan", text: "இது என் மனதுக்கு ஓர் அமைதி" },
    ],
  },
  {
    title: "மௌன சூரியன்",
    content: "அழகான சூரியன் மறைந்து போகும் போது, மனசே ஆழ்ந்து மூழ்கும்",
    author: "@user13",
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop",
    comments: [
      { name: "@sunsetlover", text: "மிக அழகான காட்சி!" },
      { name: "@poetfriend", text: "சில வார்த்தைகள் மனம் நிமிர்த்தின" },
    ],
  },
];

export default function Home() {
  const [selectedComment, setSelectedComment] = useState(poems[0]);
  const [showNotification, setShowNotification] = useState(true);

  return (
    <div className="min-h-screen flex justify-center p-8">
      <div className="w-full max-w-8xl">
        <div className="rounded-2xl shadow-xl overflow-hidden relative">
          <Layout>
            <div className="grid grid-cols-11 p-2 gap-3">
              {/* Left bar */}
              <div className="col-span-12 lg:col-span-4 space-y-4">
                {/* Dynamic Poem Card */}
                <AnimatePresence mode="wait">
                  {selectedComment && (
                    <motion.div
                      key={selectedComment.author}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}>
                      <PoemCard
                        title={selectedComment.title}
                        username={selectedComment.author}
                        content={
                          selectedComment.content || "No content available"
                        }
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Comments List */}
                <PoemCommentsList
                  poems={poems}
                  onSelectPoem={(poem) => setSelectedComment(poem)}
                />
              </div>

              {/* Collaborator */}
              <div className="col-span-12 lg:col-span-4">
                <InviteModal />
              </div>

              {/* Notifications */}
              <div className="col-span-12 lg:col-span-3 space-y-4">
                <Notifications showNotification={showNotification} />
                <PoemDetails />
              </div>
            </div>
          </Layout>
        </div>
      </div>
    </div>
  );
}
