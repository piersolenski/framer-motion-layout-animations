import { Media } from "@/data/imagesAndVimeoVideos";
import { useGlobalState } from "@/hooks/useGlobalState";
import { animate } from "framer-motion";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, ReactNode, forwardRef } from "react";
import styled from "styled-components";

const WrappedLink = styled(Link)`
  width: 100%;
`;

interface Props extends LinkProps {
  id: number;
  children?: ReactNode;
  className?: string;
  media?: Media;
}

/* TransitionLink hijacks the router and performs releveant page scrolling
 * and state management before the page transition occurs. */
export const TransitionLink = forwardRef<HTMLAnchorElement, Props>(
  ({ id, href, children, className, media, ...props }, ref) => {
    const router = useRouter();
    const { dispatch } = useGlobalState();

    const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      dispatch({ type: "projectId", value: id });
      dispatch({ type: "pageTransition", value: "transitioning" });

      const { currentTarget } = e;
      const href = currentTarget.getAttribute("href");

      if (href === "/") {
        /* Scroll back to top of window */
        await animate(document.documentElement.scrollTop, 0, {
          duration: 1,
          ease: [0.645, 0.045, 0.355, 1],
          onUpdate: (v) => {
            window.scrollTo(0, v);
          },
        }).then(() => (href ? router.push(href) : null));
      } else {
        /* If going to next project */
        const rect = currentTarget.getBoundingClientRect();
        /* Store the current footer's top position */
        dispatch({ type: "previousFooterTop", value: rect.top });
        /* Keep track of the state of the transition */
        dispatch({ type: "pageTransition", value: "transitioning" });

        const videoEl = currentTarget.querySelector("video");

        if (videoEl) {
          videoEl.pause();
          const { currentTime } = videoEl;
          dispatch({ type: "videoTime", value: currentTime || 0 });
        }

        if (href) router.push(href, undefined, { scroll: false });
      }
    };

    return (
      <WrappedLink
        ref={ref}
        href={href}
        onClick={handleClick}
        className={className}
        {...props}
      >
        {children}
      </WrappedLink>
    );
  },
);

TransitionLink.displayName = "LayoutTransition";
