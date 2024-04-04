import NextImage from "next/image";
import { MotionProps } from "framer-motion";
import { forwardRef } from "react";
import { LayoutWrapper } from "./LayoutWrapper";
import styled from "styled-components";
import { PhotoMedia } from "@/data/imagesAndVimeoVideos";
import { useGlobalState } from "@/hooks/useGlobalState";

const Wrapper = styled(LayoutWrapper)``;

export interface Props extends MotionProps {
  media: PhotoMedia;
  width?: number;
  height?: number;
  priority?: boolean;
}

export const MotionImage = forwardRef<HTMLDivElement, Props>(
  ({ media, priority = false, width = 500, height = 500, ...props }, ref) => {
    const { state } = useGlobalState();
    return (
      <Wrapper ref={ref} {...props}>
        <NextImage
          src={media.image.asset}
          alt="Bum"
          width={width}
          height={height}
          priority={priority ?? state.projectId === media._id}
        />
      </Wrapper>
    );
  },
);

MotionImage.displayName = "MotionImage";