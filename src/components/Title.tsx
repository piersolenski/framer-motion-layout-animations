import { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  layoutId?: string;
  children: ReactNode;
}

const transition = {
  duration: 1,
};

export const Title = ({ layoutId, children }: Props) => (
  <motion.div
    layoutId={layoutId}
    initial="hidden"
    animate="enter"
    transition={transition}
    exit="exit"
    variants={{
      hidden: { opacity: 0, x: -200 },
      enter: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 100 },
    }}
    style={{
      gridColumn: "4 / 11",
      background: "lightblue",
      border: `20px skyblue solid`,
      padding: "5em",
      width: `100%`,
      margin: `0 auto`,
      height: `20em`,
      fontFamily: "Arial",
    }}
  >
    <h1>Title: {children}</h1>
  </motion.div>
);
