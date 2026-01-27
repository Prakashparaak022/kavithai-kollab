"use client";

import { X } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

const CustomModal = ({ title, children, onClose }: Props) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-secondary rounded-2xl p-4 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white">
          <X size={20} />
        </button>
        <h2 className="font-semibold text-gray-200 text-center text-2xl pb-3">
          {title}
        </h2>
        <div className="bg-app p-4 rounded-xl max-h-[80vh] overflow-y-auto">{children}</div>
      </motion.div>
    </div>
  );
};

export default CustomModal;
