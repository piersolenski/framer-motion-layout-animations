import { ReactNode } from "react";
import { Centered } from "@/components/Centered";
import { motion } from "framer-motion";
import styled from "styled-components";
import { conditionalEnterExit, transition } from "@/theme/animations";

interface Props {
  layoutId?: string;
  children: ReactNode;
  doEnter?: boolean;
  doExit?: boolean;
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

export const Title = ({
  layoutId,
  doEnter = true,
  doExit = true,
  children,
}: Props) => {
  return (
    <Wrapper
      as={motion.div}
      layout
      layoutId={layoutId}
      transition={transition}
      variants={conditionalEnterExit}
      custom={doExit}
      initial={doEnter && "initial"}
      animate="animate"
      exit="exit"
    >
      <h1>Title: {children}</h1>
    </Wrapper>
  );
};
