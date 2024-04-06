import { MotionProps, motion } from "framer-motion";
import { forwardRef } from "react";
import { transition } from "@/theme/animations";
import styled from "styled-components";

/* Extracted out so default transition props can be applied here */

const MotionDiv = styled(motion.div)``;

interface Props extends MotionProps {}

export const LayoutWrapper = forwardRef<HTMLDivElement, Props>(
  ({ layoutId, children, ...props }, ref) => {
    return (
      <MotionDiv
        ref={ref}
        layout
        layoutId={layoutId}
        transition={transition}
        {...props}
      >
        {children}
      </MotionDiv>
    );
  },
);

LayoutWrapper.displayName = "LayoutWrapper";
