import Link from "next/link";
import router from "next/router";
import { InferGetStaticPropsType } from "next";
import { MouseEvent, useEffect, useState } from "react";
import NextImage from "next/image";
import { animate, motion } from "framer-motion";
import { images } from "../../data/images";
import { useGlobalState } from "../../hooks/useGlobalState";
import styled from "styled-components";
import { Title } from "@/components/Title";
import { Centered } from "@/components/Centered";
import { Image } from "@/components/Image";

const Wrapper = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(12, 1fr)",
});

const Content = styled(Centered)({
  background:
    "repeating-linear-gradient(#e66465, #e66465 200px, pink 200px, pink 220px)",
  border: `20px pink solid`,
  paddingInline: "20em",
  height: `10em`,
});

const NextProject = styled(Centered)({
  minHeight: "100vh",
});

export const transition = {
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
  const nextNumber = (number + 1) % images.length;
  return {
    props: {
      data: {
        slug,
        image: images[number],
        number,
        nextProject: {
          id: nextNumber,
          image: images[nextNumber],
        },
      },
    },
  };
}

interface Props extends InferGetStaticPropsType<typeof getStaticProps> {}

export default function Work({ data }: Props) {
  const { state } = useGlobalState();
  const nextProjectHref = `/work/item-${data.nextProject.id}`;
  const [imgSrc, setImgSrc] = useState(data.image);
  const [title, setTitle] = useState(`/work/${data.slug}`);

  async function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const href = event.currentTarget.getAttribute("href");

    event.preventDefault();

    const rect = event.currentTarget.getBoundingClientRect();
    const scrollTo = rect.top + window.scrollY;

    /* Scroll back to top of window */
    await animate(document.documentElement.scrollTop, scrollTo, {
      duration: 1,
      ease: [0.645, 0.045, 0.355, 1],
      onUpdate: (v) => {
        window.scrollTo(0, v);
      },
      /* Then trigger the route change */
    })
      .then(() => {
        /* Change the image before page transition... doesn't feel good */
        setImgSrc(data.nextProject.image);
        setTitle(nextProjectHref);
      })
      .then(() => href && router.push(href));
  }

  return (
    <Wrapper>
      <Centered as={Link} href="/" onClick={handleClick}>
        <Image src={imgSrc} layoutId={`image-${data.slug}`} exit />
      </Centered>
      <Title layoutId={`title-${data.slug}`}>{title}</Title>
      <Content
        as={motion.div}
        initial="hidden"
        animate="enter"
        transition={transition}
        exit="exit"
        variants={{
          hidden: { opacity: 0, x: -200 },
          enter: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 100 },
        }}
      />
      <NextProject
        as={Link}
        href={nextProjectHref}
        onClick={handleClick}
        data-type="nextProject"
      >
        <Image
          src={data.nextProject.image}
          layoutId={`image-${nextProjectHref}`}
          exit={false}
        />
        <Title layoutId={`title-${nextProjectHref}`} exit={false}>
          {nextProjectHref}
        </Title>
      </NextProject>
    </Wrapper>
  );
}
