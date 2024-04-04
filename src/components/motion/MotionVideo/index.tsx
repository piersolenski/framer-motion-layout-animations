import { MotionProps } from "framer-motion";
import { forwardRef, useRef, useState } from "react";
import NextImage from "next/image";
import styled from "styled-components";
import { VideoMedia } from "@/data/imagesAndVimeoVideos";
import dynamic from "next/dynamic";

import { LayoutWrapper } from "../LayoutWrapper";
import { VideoPlayerProps } from "./VideoPlayer";

const VideoPlayer = dynamic<VideoPlayerProps>(
  () => import("./VideoPlayer").then((mod) => mod.VideoPlayer),
  {
    ssr: false,
  },
);

const Wrapper = styled(LayoutWrapper)<{ active: boolean }>`
  position: relative;
`;

const Image = styled(NextImage)``;

const Video = styled.video<{ active: boolean }>`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 3;
  opacity: ${({ active }) => (active ? 1 : 0)};
  pointer-events: ${({ active }) => (active ? "auto" : "none")};
  transition: opacity 0.5s ease;
`;

interface Props extends MotionProps {
  width?: number;
  height?: number;
  media: VideoMedia;
  active: boolean;
  imageSrc?: string;
  videoRef?: React.RefObject<HTMLVideoElement>;
}

export const MotionVideo = forwardRef<HTMLDivElement, Props>(
  (
    {
      media,
      videoRef,
      imageSrc,
      layoutId,
      active,
      width = 640,
      height = 360,
      ...props
    },
    wrapperRef,
  ) => {
    const _videoRef = useRef<HTMLVideoElement>(null);
    const ref = videoRef ?? _videoRef;

    const videoPlayerRef = useRef(null);
    const [hideThumnail, setHideThumbnail] = useState(false);
    const [error, setError] = useState(false);

    function handleClick() {
      setHideThumbnail(!error && true);
    }

    function handleError() {
      setHideThumbnail(false);
      setError(true);
    }

    return (
      <Wrapper ref={wrapperRef} layoutId={layoutId} active={active} {...props}>
        {!error && active && (
          <VideoPlayer
            playerRef={videoPlayerRef}
            media={media}
            onError={handleError}
          />
        )}
        <Image src={media.thumbnail} alt="Bum" width={width} height={height} />
        <Video
          ref={ref}
          active={!hideThumnail}
          autoPlay
          muted
          loop
          playsInline
          onClick={handleClick}
        >
          <source
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
            type="video/webm"
          />
          <source
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            type="video/mp4"
          />
        </Video>
      </Wrapper>
    );
  },
);

MotionVideo.displayName = "MotionVideo";
