import Link from "next/link";
import router from "next/router";
import { InferGetStaticPropsType } from "next";
import { MouseEvent } from "react";
import { animate, motion } from "framer-motion";
import { images } from "../../data/images";
import { useGlobalState } from "../../hooks/useGlobalState";
import styled from "styled-components";
import { Title } from "@/components/Title";

const Wrapper = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
});

const transition = {
  duration: 1,
};

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

  const number = getNumberFromString(slug);
  return {
    props: {
      data: {
        slug,
        nextProjectId: (number + 1) % images.length,
        image: images[number],
        number,
      },
    },
  };
}

interface Props extends InferGetStaticPropsType<typeof getStaticProps> {}

export default function Work({ data }: Props) {
  const { state } = useGlobalState();
  const nextProjectHref = `/work/item-${data.nextProjectId}`;

  async function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const href = event.currentTarget.getAttribute("href");

    event.preventDefault();

    /* Scroll back to top of window */
    await animate(document.documentElement.scrollTop, 0, {
      duration: 1,
      ease: [0.645, 0.045, 0.355, 1],
      onUpdate: (v) => {
        window.scrollTo(0, v);
      },
      /* Then trigger the route change */
    }).then(() => href && router.push(href));
  }

  return (
    <Wrapper>
      <Link
        style={{ gridColumn: "2 / 7" }}
        href="/"
        onClick={(e) => handleClick(e)}
      >
        <motion.img
          transition={transition}
          src={data.image}
          layoutId={data.slug} /* Carousel.tsx:78 */
          initial={state.previousRoute !== "/" && { opacity: 0 }}
          animate={state.previousRoute !== "/" && { opacity: 1 }}
        />
      </Link>
      <Title>{data.slug}</Title>
      <motion.div
        initial="hidden"
        animate="enter"
        transition={transition}
        exit="exit"
        variants={{
          hidden: { opacity: 0, x: -200 },
          enter: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 100 },
        }}
        style={{
          gridColumn: "4 / 11",
          background:
            "repeating-linear-gradient(#e66465, #e66465 200px, pink 200px, pink 220px)",
          border: `20px pink solid`,
          width: `90%`,
          margin: `0 auto`,
          padding: "20em",
          height: `130em`,
        }}
      />
      <Link style={{ gridColumn: "4 / 11" }} href={nextProjectHref}>
        <Title layoutId={nextProjectHref}>{nextProjectHref}</Title>
      </Link>
    </Wrapper>
  );
}
