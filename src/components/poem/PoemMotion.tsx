"use client";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  children: React.ReactNode;
  motionKey: string;
};

export default function PoemMotion({ children, motionKey }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={motionKey}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.3, ease: "easeOut" }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
