import { forwardRef } from "react";
import { MotionVideo } from "./MotionVideo";
import { MotionImage } from "./MotionImage";
import type { PhotoMedia, VideoMedia } from "@/data/imagesAndVimeoVideos";
import type { MotionProps } from "framer-motion";
import { useGlobalState } from "@/hooks/useGlobalState";

interface Props extends MotionProps {
  item: VideoMedia | PhotoMedia;
}

export const MotionMedia = forwardRef<HTMLDivElement, Props>(
  ({ item, ...props }, ref) => {
    const { state } = useGlobalState();

    switch (item.media._type) {
      case "video":
        return <MotionVideo ref={ref} media={item.media} {...props} />;
      case "photo":
        return (
          <MotionImage
            ref={ref}
            media={item.media}
            priority={state.projectId === item._id}
            {...props}
          />
        );
    }
  },
);

MotionMedia.displayName = "MotionMedia";
