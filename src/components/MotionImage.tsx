import NextImage from "next/image";
import { MotionProps } from "framer-motion";
import { forwardRef } from "react";
import { LayoutWrapper } from "./LayoutWrapper";

interface Props extends MotionProps {
  src: string;
  priority?: boolean;
}

export const MotionImage = forwardRef<HTMLDivElement, Props>(
  ({ src, priority = false, ...props }, ref) => {
    return (
      <LayoutWrapper ref={ref} {...props}>
        <NextImage
          src={src}
          alt="Bum"
          width={500}
          height={500}
          priority={priority}
        />
      </LayoutWrapper>
    );
  },
);

MotionImage.displayName = "Image";
