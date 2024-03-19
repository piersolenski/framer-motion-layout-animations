import useHorizontalScroll from "../hooks/useHorizontalScroll";
import { SyntheticEvent, createRef, useLayoutEffect, useRef } from "react";
import { useGlobalState } from "@/hooks/useGlobalState";
import styled from "styled-components";
import Link from "next/link";
import { MotionImage } from "./MotionImage";
import { MotionVideo } from "./MotionVideo";
import { Media, PhotoMedia, VideoMedia } from "@/data/imagesAndVimeoVideos";
import { useRouter } from "next/router";

const Wrapper = styled.div({
  overflowX: "scroll",
  overflowY: "hidden",
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "100vh",
});

const Inner = styled.div({
  display: `inline-grid`,
  columnGap: "5vw",
  padding: `0 calc(50vw - (var(--card-size) / 2))`,
  gridAutoFlow: "column",
});

const WrappedLink = styled(Link)`
  width: var(--card-size);
`;

export function Carousel({ items }: { items: Array<{ media: Media }> }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { state, dispatch } = useGlobalState();
  useHorizontalScroll(scrollRef);
  const router = useRouter();

  const itemRefs = useRef<
    React.RefObject<HTMLImageElement | HTMLVideoElement>[]
  >([]);

  useLayoutEffect(() => {
    const targetElementRef = itemRefs.current[state.projectIndex];

    if (scrollRef.current && targetElementRef.current) {
      const container = scrollRef.current;
      const targetElement = targetElementRef.current;

      // Calculate the target element's offsetLeft relative to the container
      const targetOffsetLeft = targetElement.offsetLeft;
      // Calculate the center position of the target element
      const targetCenter = targetOffsetLeft + targetElement.offsetWidth / 2;
      // Calculate the scroll position needed to center the target element
      const containerCenter = container.offsetWidth / 2;
      const scrollPosition = targetCenter - containerCenter;

      // Set the container's scrollLeft to center the target element
      container.scrollLeft = scrollPosition;
    }
    // NOTE: We only want this to run once, as to not scroll the container
    // again after the first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = async (
    e: SyntheticEvent<HTMLAnchorElement>,
    i: number,
  ) => {
    e.preventDefault();
    dispatch({ type: "projectIndex", value: i });
    dispatch({ type: "pageTransition", value: "transitioning" });

    const transitionType = e.currentTarget.dataset.type;
    const { currentTarget } = e;
    const href = currentTarget.getAttribute("href");

    if (transitionType === "video") {
      const videoEl = currentTarget.querySelector("video");
      if (videoEl) {
        videoEl.pause();
        const { currentTime } = videoEl;
        dispatch({ type: "videoTime", value: currentTime || 0 });
      }
    }

    if (href) router.push(href, undefined, { scroll: false });
  };

  const animationProps = (i: number) => ({
    ref: (itemRefs.current[i] = itemRefs.current[i] || createRef()),
    layoutId: `item-${i}`,
    initial: state.projectIndex !== i && { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: state.projectIndex !== i ? 0 : 1 },
  });

  return (
    <Wrapper ref={scrollRef}>
      <Inner>
        {items.map(({ media }, i) => (
          <WrappedLink
            key={i}
            href={`/work/item-${i}`}
            onClick={(e) => handleClick(e, i)}
            data-type={media._type}
          >
            {media._type === "video" && (
              <MotionVideo
                media={media as VideoMedia}
                active={false}
                {...animationProps(i)}
              />
            )}

            {media._type === "photo" && (
              <MotionImage
                media={media as PhotoMedia}
                priority={state.projectIndex === i}
                {...animationProps(i)}
              />
            )}
          </WrappedLink>
        ))}
      </Inner>
    </Wrapper>
  );
}
