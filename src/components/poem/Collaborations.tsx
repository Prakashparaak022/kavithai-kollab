"use client";

import { useState } from "react";
import { Collaboration } from "@/types/poem";
import { motion } from "framer-motion";
import { Check, ChevronDown, X } from "lucide-react";
import { usePlayerDetails } from "@/utils/UserSession";

type Props = {
  collaborations: Collaboration[];
};

const Collaborations = ({ collaborations }: Props) => {
  const [selectedCollab, setSelectedCollab] = useState<Collaboration | null>(
    null
  );
  const [collaborationsList, setCollaborationsList] =
    useState<Collaboration[]>(collaborations);
  const [showInput, setShowInput] = useState(false);
  const [newLine, setNewLine] = useState("");

  const { playerDetails } = usePlayerDetails();

  const handleToggle = (collab: Collaboration) => {
    setSelectedCollab((prev) => (prev?.id === collab.id ? null : collab));
  };

  const handleAddCollaboration = () => {
    if (!newLine.trim()) return;

    const newCollab: Collaboration = {
      id: Date.now(),
      author: "@you",
      content: newLine,
      imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    };

    setCollaborationsList((prev) => [newCollab, ...prev]);
    setNewLine("");
    setShowInput(false);
  };

  const handleReject = (id: number) => {
    setCollaborationsList((prev) => prev.filter((c) => c.id !== id));
    setSelectedCollab(null);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-green">Collaboration Lines</h3>

      <div className="space-y-3">
        {collaborationsList.map((collab) => {
          const isOpen = selectedCollab?.id === collab.id;

          return (
            <div
              key={collab.id}
              onClick={() => handleToggle(collab)}
              role="button"
              tabIndex={0}
              className="p-3 rounded-lg bg-[#f8f5e4] cursor-pointer
                 hover:shadow-md transition-shadow
                 focus:outline-none focus:ring-2 focus:ring-blue-300">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <img
                      src={collab.imageUrl}
                      alt={collab.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-blue-500">
                      {collab.author}
                    </span>
                  </div>

                  {/* TEXT */}
                  <motion.p
                    initial={false}
                    animate={{ opacity: 1 }}
                    className={`text-sm mt-2 text-gray-700
                      ${isOpen ? "" : "line-clamp-1"}`}>
                    {collab.content}
                  </motion.p>
                </div>

                {/* ARROW */}
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="w-6 h-6 bg-[#e7e1c7] rounded-full
                     flex items-center justify-center shrink-0">
                  <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
                </motion.div>
              </div>
            </div>
          );
        })}
        <div
          className="p-3 rounded-lg bg-[#f8f5e4] cursor-pointer
                 hover:shadow-md transition-shadow">
          {!showInput ? (
            <button
              onClick={() => setShowInput(true)}
              className="text-sm text-blue-500 hover:underline">
              + Add your line to this poem
            </button>
          ) : (
            <div className="space-y-3">
              <textarea
                value={newLine}
                onChange={(e) => setNewLine(e.target.value)}
                rows={3}
                placeholder="Write your line..."
                className="w-full text-sm text-gray-700 p-3 rounded-md border-primary
                   focus:outline-none focus:ring-1 focus:ring-green-700"
              />

              <div className="flex gap-2">
                <button
                  onClick={handleAddCollaboration}
                  className="px-4 py-1.5 text-sm rounded-md
                     bg-secondary text-white">
                  Submit
                </button>

                <button
                  onClick={() => {
                    setShowInput(false);
                    setNewLine("");
                  }}
                  className="px-4 py-1.5 text-sm rounded-md
                     bg-highlight text-white">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collaborations;
