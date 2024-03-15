import { MotionProps, motion } from "framer-motion";
import { forwardRef } from "react";
import { transition } from "@/theme/animations";
import styled from "styled-components";

/* Extracted out so default transition props can be applied here */

const Wrapper = styled(motion.div)``;

interface Props extends MotionProps {}

export const LayoutWrapper = forwardRef<HTMLDivElement, Props>(
  ({ children, ...props }, ref) => {
    return (
      <Wrapper ref={ref} transition={transition} {...props}>
        {children}
      </Wrapper>
    );
  },
);

LayoutWrapper.displayName = "LayoutWrapper";
