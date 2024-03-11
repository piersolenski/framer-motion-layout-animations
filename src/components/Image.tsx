import NextImage from "next/image";
import { motion } from "framer-motion";
import { forwardRef } from "react";
import { conditionalEnterExit, transition } from "@/theme/animations";
import styled from "styled-components";

interface Props {
  src: string;
  layoutId?: string;
  doEnter?: boolean;
  doExit?: boolean;
  priority?: boolean;
}

const Wrapper = styled(motion.div)({
  width: "var(--card-size)",
  height: "var(--card-size)",
});

export const MotionImage = forwardRef<HTMLDivElement, Props>(
  ({ src, layoutId, doExit = true, doEnter = true, priority = false }, ref) => {
    return (
      <Wrapper
        ref={ref}
        transition={transition}
        variants={conditionalEnterExit}
        custom={doExit}
        layout
        layoutId={layoutId}
        initial={doEnter && "initial"}
        animate="animate"
        exit="exit"
      >
        <NextImage
          src={src}
          alt="Bum"
          width={500}
          height={500}
          priority={priority}
        />
      </Wrapper>
    );
  },
);

MotionImage.displayName = "Image";
