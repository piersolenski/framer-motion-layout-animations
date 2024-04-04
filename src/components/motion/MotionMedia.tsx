import { forwardRef } from "react";
import { MotionVideo, type Props as MotionVideoProps } from "./MotionVideo";
import { MotionImage, type Props as MotionImageProps } from "./MotionImage";

type Props = MotionVideoProps | MotionImageProps;

export const MotionMedia = forwardRef<HTMLDivElement, Props>((props, ref) => {
  switch (props.media._type) {
    case "video":
      return <MotionVideo ref={ref} {...props} />;
    case "photo":
      return <MotionImage ref={ref} {...props} />;
  }
});

MotionMedia.displayName = "MotionMedia";
