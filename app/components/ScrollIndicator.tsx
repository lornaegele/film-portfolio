"use client";

import { motion } from "framer-motion";

const ScrollIndicator = () => {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <motion.div
        className="w-[1px] h-8 bg-cinema-smoke/50"
        animate={{ scaleY: [0, 1, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "top" }}
      />
    </motion.div>
  );
};

export default ScrollIndicator;
