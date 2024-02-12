import Link from "next/link";
import useHorizontalScroll from "../hooks/useHorizontalScroll";
import { createRef, useLayoutEffect, useRef } from "react";
import { images } from "../data/images";
import { motion } from "framer-motion";
import { useGlobalState } from "@/hooks/useGlobalState";

const WrappedLink = motion(Link);

const transition = {
  duration: 1,
};

export default function Home() {
  const child = {
    background: "red",
    border: `20px green solid`,
    width: `30em`,
    height: `30em`,
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  useHorizontalScroll(scrollRef);
  const { state, dispatch } = useGlobalState();

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
    <main
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      <motion.div
        ref={scrollRef}
        layoutScroll
        style={{
          overflowX: "scroll",
          overflowY: "hidden",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <motion.div
          layout
          layoutRoot
          style={{ display: `inline-grid`, gridAutoFlow: "column" }}
        >
          {images.map((image, i) => (
            <WrappedLink
              key={i}
              href={`/work/item-${i}`}
              onClick={() => dispatch({ type: "projectIndex", value: i })}
              initial={{ opacity: state.projectIndex === i ? 1 : 0 }}
              transition={transition}
              animate={{ opacity: 1 }}
              exit={{ opacity: state.projectIndex === i ? 1 : 0 }}
            >
              <motion.img
                ref={(itemRefs.current[i] = itemRefs.current[i] || createRef())}
                transition={transition}
                layout
                layoutId={`item-${i}`}
                src={image}
                style={child}
                alt="Poo"
              />
            </WrappedLink>
          ))}
        </motion.div>
      </motion.div>
    </main>
  );
}
