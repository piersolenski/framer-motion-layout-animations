import useHorizontalScroll from "../hooks/useHorizontalScroll";
import { createRef, useLayoutEffect, useRef } from "react";
import { useGlobalState } from "@/hooks/useGlobalState";
import styled from "styled-components";
import type { Media } from "@/data/imagesAndVimeoVideos";
import { TransitionLink } from "./motion/TransitionLink";
import { MotionMedia } from "./motion/MotionMedia";

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

const StyledTransitionLink = styled(TransitionLink)`
  width: var(--card-size);
`;

interface Props {
  items: Media[];
}

export function Carousel({ items }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { state } = useGlobalState();
  useHorizontalScroll(scrollRef);

  const itemRefs = useRef<React.RefObject<HTMLAnchorElement>[]>([]);

  useLayoutEffect(() => {
    const idx = Math.max(
      0,
      items.findIndex((item) => item._id === state.projectId),
    );
    const targetElementRef = itemRefs.current[idx];

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

  return (
    <Wrapper ref={scrollRef}>
      <Inner>
        {items.map((item, i) => (
          <StyledTransitionLink
            ref={(itemRefs.current[i] = itemRefs.current[i] || createRef())}
            key={item._id}
            id={item._id}
            href={`/work/item-${item._id}`}
          >
            <MotionMedia
              item={item}
              layoutId={`item-${item._id}`}
              initial={state.projectId !== item._id && { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: state.projectId !== item._id ? 0 : 1 }}
            />
          </StyledTransitionLink>
        ))}
      </Inner>
    </Wrapper>
  );
}
