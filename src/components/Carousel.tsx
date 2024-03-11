import useHorizontalScroll from "../hooks/useHorizontalScroll";
import { createRef, useLayoutEffect, useRef } from "react";
import { useGlobalState } from "@/hooks/useGlobalState";
import styled from "styled-components";
import Link from "next/link";
import { MotionImage } from "./Image";

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

const WrappedLink = styled(Link)({
  width: "var(--card-size)",
  height: "var(--card-size)",
});

export function Carousel({ items }: { items: string[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { state, dispatch } = useGlobalState();
  useHorizontalScroll(scrollRef);

  const itemRefs = useRef<React.RefObject<HTMLImageElement>[]>([]);

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

  return (
    <Wrapper ref={scrollRef}>
      <Inner>
        {items.map((item, i) => (
          <WrappedLink
            key={i}
            href={`/work/item-${i}`}
            onClick={() => dispatch({ type: "projectIndex", value: i })}
          >
            <MotionImage
              ref={(itemRefs.current[i] = itemRefs.current[i] || createRef())}
              src={item}
              layoutId={`image-${i}`}
              priority={state.projectIndex === i}
              doEnter={state.projectIndex !== i}
              doExit={state.projectIndex !== i}
            />
          </WrappedLink>
        ))}
      </Inner>
    </Wrapper>
  );
}
