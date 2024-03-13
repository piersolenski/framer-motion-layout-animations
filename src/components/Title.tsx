import { ReactNode, forwardRef } from "react";
import { MotionProps, motion } from "framer-motion";
import styled from "styled-components";
import { transition } from "@/theme/animations";

interface Props extends MotionProps {
  children: ReactNode;
}

const Wrapper = styled(motion.div)({
  background: "lightblue",
  border: `20px skyblue solid`,
  padding: "5em",
  width: `100%`,
  margin: `0 auto`,
  height: `10em`,
  fontFamily: "Arial",
  position: "relative",
});

export const Title = forwardRef<HTMLDivElement, Props>(
  ({ children, ...props }, ref) => {
    return (
      <Wrapper ref={ref} transition={transition} {...props}>
        <h1>Title: {children}</h1>
      </Wrapper>
    );
  },
);

Title.displayName = "Title";
