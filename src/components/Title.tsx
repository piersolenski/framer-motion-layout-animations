import { ReactNode } from "react";
import { Centered } from "@/components/Centered";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useGlobalState } from "@/hooks/useGlobalState";
import { transition } from "@/pages/work/[slug]";

interface Props {
  layoutId?: string;
  children: ReactNode;
  exit?: boolean;
}

const Wrapper = styled(Centered)({
  background: "lightblue",
  border: `20px skyblue solid`,
  padding: "5em",
  width: `100%`,
  margin: `0 auto`,
  height: `10em`,
  fontFamily: "Arial",
});

export const Title = ({ layoutId, exit = true, children }: Props) => {
  const { state } = useGlobalState();
  return (
    <Wrapper
      as={motion.div}
      layout
      layoutId={layoutId}
      initial={state.previousRoute !== "/" ? false : "hidden"}
      animate="enter"
      transition={transition}
      exit="exit"
      variants={{
        hidden: { opacity: 0 },
        enter: { opacity: 1 },
        exit: { opacity: 1 },
      }}
    >
      <h1>Title: {children}</h1>
    </Wrapper>
  );
};
