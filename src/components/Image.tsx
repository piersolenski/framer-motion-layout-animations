import NextImage from "next/image";
import { MotionProps, motion } from "framer-motion";
import { forwardRef } from "react";
import { transition } from "@/theme/animations";
import styled from "styled-components";

interface Props extends MotionProps {
  src: string;
  priority?: boolean;
}

const Wrapper = styled(motion.div)({});

export const MotionImage = forwardRef<HTMLDivElement, Props>(
  ({ src, priority = false, ...props }, ref) => {
    return (
      <Wrapper ref={ref} transition={transition} {...props}>
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
