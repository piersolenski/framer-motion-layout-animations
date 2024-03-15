import Link from "next/link";
import router from "next/router";
import { InferGetStaticPropsType } from "next";
import { MouseEvent, useEffect, useRef } from "react";
import { animate } from "framer-motion";
import { images } from "../../data/images";
import { useGlobalState } from "../../hooks/useGlobalState";
import styled from "styled-components";
import { Title } from "@/components/Title";
import { Centered } from "@/components/Centered";
import { MotionImage } from "@/components/Image";
import { transition } from "@/theme/animations";

const Wrapper = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
});

const Content = styled(Centered)({
  background:
    "repeating-linear-gradient(#e66465, #e66465 200px, pink 200px, pink 220px)",
  border: `20px pink solid`,
  paddingInline: "20em",
  height: `100em`,
  zIndex: 0,
});

const Heading = styled(Centered)({
  justifyContent: "flex-start",
  zIndex: 1,
});

export async function getStaticPaths() {
  return {
    paths: images.map((_, i) => ({
      params: { slug: `item-${i + 0}` },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context: { params: { slug: string } }) {
  const { slug = "" } = context.params;
  function getNumberFromString(str: string): number {
    const match = str.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  const id = getNumberFromString(slug);
  const nextId = (id + 1) % images.length;
  return {
    props: {
      data: {
        id,
        slug,
        image: images[id],
        nextProject: {
          id: nextId,
          image: images[nextId],
        },
      },
    },
  };
}

interface Props extends InferGetStaticPropsType<typeof getStaticProps> {}

export default function Work({ data }: Props) {
  const { state, dispatch } = useGlobalState();
  const nextProjectHref = `/work/item-${data.nextProject.id}`;
  const headingRef = useRef<HTMLAnchorElement>(null!);

  useEffect(() => {
    /* PAGE ENTER */
    if (
      state.previousRoute !== "/" &&
      state.pageTransition === "done" &&
      headingRef.current
    ) {
      /* Scrolling has been disabled when coming from another porject,
       * so do the scrolling */
      window.scrollTo(0, 0);
      animate(
        headingRef.current,
        {
          /* Animate new heading FROM position of old footer TO the top of page */
          y: [state.previousFooterTop, 0],
        },
        {
          ease: [0.645, 0.045, 0.355, 1],
          duration: 1,
        },
      );
    }
    dispatch({ type: "pageTransition", value: "idle" });
  }, [
    state.pageTransition,
    state.previousRoute,
    state.previousFooterTop,
    dispatch,
    headingRef,
  ]);

  async function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    /* PAGE EXIT */
    event.preventDefault();

    const { currentTarget } = event;
    const href = currentTarget.getAttribute("href");

    dispatch({ type: "projectIndex", value: data.id });

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
      const rect = event.currentTarget.getBoundingClientRect();
      /* Store the current footer's top position */
      dispatch({ type: "previousFooterTop", value: rect.top });
      /* Keep track of the state of the transition */
      dispatch({ type: "pageTransition", value: "transitioning" });

      if (href) router.push(href, undefined, { scroll: false });
    }
  }

  return (
    <Wrapper>
      <Heading ref={headingRef} as={Link} href="/" onClick={handleClick}>
        <Title
          initial={state.previousRoute === "/" && { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >{`/work/item-${data.id}`}</Title>
        <MotionImage src={data.image} layoutId={`image-${data.id}`} priority />
      </Heading>

      <Content
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0, transition: { ...transition, delay: 1 } }}
        exit={{ opacity: 0, x: 100 }}
        transition={transition}
      />

      <Heading as={Link} href={nextProjectHref} onClick={handleClick}>
        <Title>{nextProjectHref}</Title>
        <MotionImage src={data.nextProject.image} />
      </Heading>
    </Wrapper>
  );
}
