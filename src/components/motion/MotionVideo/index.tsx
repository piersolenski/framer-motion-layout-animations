import { MotionProps } from "framer-motion";
import { forwardRef, useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import styled from "styled-components";
import { VideoMedia } from "@/data/imagesAndVimeoVideos";
import dynamic from "next/dynamic";

import { LayoutWrapper } from "../LayoutWrapper";
import { VideoPlayerProps } from "./VideoPlayer";
import { useGlobalState } from "@/hooks/useGlobalState";
import { usePathname } from "next/navigation";

const VideoPlayer = dynamic<VideoPlayerProps>(
  () => import("./VideoPlayer").then((mod) => mod.VideoPlayer),
  {
    ssr: false,
  },
);

const Wrapper = styled(LayoutWrapper)`
  position: relative;
`;

const Image = styled(NextImage)``;

const Video = styled.video<{ $active: boolean }>`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 3;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  pointer-events: ${({ $active }) => ($active ? "auto" : "none")};
  transition: opacity 0.5s ease;
`;

export interface Props extends MotionProps {
  media: VideoMedia["media"];
  width?: number;
  height?: number;
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

    const pathname = usePathname();
    const projectPage = pathname !== "/";

    const { state } = useGlobalState();
    useEffect(() => {
      if (ref.current) {
        ref.current.currentTime = state.videoTime;
        ref.current.play();
      }
    }, [ref, state.videoTime]);

    function handleClick() {
      setHideThumbnail(!error && projectPage);
    }

    function handleError() {
      setHideThumbnail(false);
      setError(true);
    }

    return (
      <Wrapper ref={wrapperRef} layoutId={layoutId} {...props}>
        {state.pageTransition === "done" && !error && projectPage && (
          <VideoPlayer
            playerRef={videoPlayerRef}
            media={media}
            onError={handleError}
          />
        )}
        <Video
          ref={ref}
          $active={!hideThumnail}
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
        <Image src={media.thumbnail} alt="Bum" width={width} height={height} />
      </Wrapper>
    );
  },
);

MotionVideo.displayName = "MotionVideo";
