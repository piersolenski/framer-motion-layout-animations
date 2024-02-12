import Link from "next/link";
import router from "next/router";
import { InferGetStaticPropsType } from "next";
import { MouseEvent } from "react";
import { animate, motion } from "framer-motion";
import { images } from "../../data/images";
import { useGlobalState } from "../../hooks/useGlobalState";

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
      data: { slug, image: images[number], number },
    },
  };
}

export default function Work({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { state } = useGlobalState();

  async function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const href = event.currentTarget.getAttribute("href");

    event.preventDefault();

    await animate(document.documentElement.scrollTop, 0, {
      duration: 1,
      ease: [0.645, 0.045, 0.355, 1],
      onUpdate: (v) => {
        window.scrollTo(0, v);
      },
    }).then(() => href && router.push(href));
  }

  return (
    <div>
      <Link href="/" onClick={(e) => handleClick(e)}>
        <motion.img
          transition={transition}
          src={data.image}
          layoutId={data.slug}
          initial={state.previousRoute !== "/" && { opacity: 0 }}
          animate={state.previousRoute !== "/" && { opacity: 1 }}
          style={{
            background: "red",
            border: `20px green solid`,
            width: `30em`,
            left: "20%",
            top: "20%",
            height: `30em`,
          }}
        />
      </Link>
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
          background: "red",
          border: `20px pink solid`,
          width: `90%`,
          margin: `0 auto`,
          padding: "20em",
          height: `130em`,
        }}
      />
    </div>
  );
}
