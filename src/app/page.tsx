"use client";

import { useState } from "react";
import PoemCard from "@/components/home/PoemCard";
import PoemCommentsList from "@/components/home/PoemCommentsList";
import Notifications from "@/components/home/Notifications";
import PoemDetails from "@/components/home/PoemDetails";
import { AnimatePresence, motion } from "framer-motion";
import InviteModal from "@/components/home/InviteModal";
import Layout from "@/components/layouts/Layout";
import { PoemCommentSection } from "@/components/home/PoemCommentSection";
import { CommentsList } from "@/components/home/CommentsList";

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
  image: string;
};

const poems: Poem[] = [
  {
    title: "மழை வருகை",
    content: "மழை வந்து என் மனதை சுத்தம் செய்தது",
    author: "@arunpoet",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=100&h=100&fit=crop",
    comments: [
      {
        name: "@user1",
        text: "அற்புதம்!",
        image: "https://randomuser.me/api/portraits/men/11.jpg",
      },
      {
        name: "@poetrylover",
        text: "சுகமான வரிகள்!",
        image: "https://randomuser.me/api/portraits/women/21.jpg",
      },
      {
        name: "@rainyfan",
        text: "மழை நினைவுகளைத் தூண்டியது",
        image: "https://randomuser.me/api/portraits/men/31.jpg",
      },
    ],
  },
  {
    title: "பார்வை துளிகள்",
    content:
      "கண்ணில் விழும் துளிகளுக்கு, நாங்கள் மறந்த பந்தங்களை மீண்டும் சுவாசிக்கிறோம்.",
    author: "@kavivisionary",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    comments: [
      {
        name: "@poetess",
        text: "உயர்ந்த கவிதை!",
        image: "https://randomuser.me/api/portraits/women/7.jpg",
      },
      {
        name: "@wordsmith",
        text: "அழகான காட்சிகள்!",
        image: "https://randomuser.me/api/portraits/men/5.jpg",
      },
    ],
  },
  {
    title: "உயிரின் ஓசை",
    content:
      "உயிரின் ஓசை, உயிரின் செவிகளுக்குக் கேட்டும், சுவாசத்தைத் திரும்பப் பெறுகிறது.",
    author: "@soul_poet",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    comments: [
      {
        name: "@soulsearcher",
        text: "என்றும் உணர்ச்சி மிகுந்த கவிதை!",
        image: "https://randomuser.me/api/portraits/men/19.jpg",
      },
      {
        name: "@heartfelt",
        text: "மிக அழகான சொற்கள்!",
        image: "https://randomuser.me/api/portraits/women/24.jpg",
      },
    ],
  },
  {
    title: "எழுதாத நவில்கள்",
    content: "எழுதாத கவிதைகள், மனசின் அடிப்படையில் பதிந்து நிற்கின்றன.",
    author: "@unwritten_poet",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    comments: [
      {
        name: "@writer",
        text: "மனதில் எத்தனை எழுத்துகள்!",
        image: "https://randomuser.me/api/portraits/men/3.jpg",
      },
      {
        name: "@scribbler",
        text: "சில வார்த்தைகள் மனதில் ஊசலாடுகிறது!",
        image: "https://randomuser.me/api/portraits/women/19.jpg",
      },
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
                  selectedPoem={selectedComment}
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
