import { ReactNode, forwardRef } from "react";
import { MotionProps } from "framer-motion";
import styled from "styled-components";
import { LayoutWrapper } from "./LayoutWrapper";

const Wrapper = styled(LayoutWrapper)({
  background: "lightblue",
  border: `20px skyblue solid`,
  padding: "5em",
  width: `100%`,
  margin: `0 auto`,
  height: `10em`,
  fontFamily: "Arial",
  position: "relative",
});

interface Props extends MotionProps {
  children: ReactNode;
}

export const MotionTitle = forwardRef<HTMLDivElement, Props>(
  ({ children, ...props }, ref) => {
    return (
      <Wrapper ref={ref} {...props}>
        <h1>Title: {children}</h1>
      </Wrapper>
    );
  },
);

MotionTitle.displayName = "MotionTitle";
