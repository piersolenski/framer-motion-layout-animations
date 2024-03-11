import Link from "next/link";
import router from "next/router";
import { InferGetStaticPropsType } from "next";
import { MouseEvent, useState } from "react";
import { animate, motion } from "framer-motion";
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
  height: `10em`,
});

const NextProject = styled(Centered)({
  minHeight: "100vh",
  justifyContent: "flex-start",
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
  const { state } = useGlobalState();
  const nextProjectHref = `/work/item-${data.nextProject.id}`;
  const [imgSrc, setImgSrc] = useState(data.image);
  const [title, setTitle] = useState(`/work/${data.slug}`);
  const [nextRoute, setNextRoute] = useState<string | null>(null);
  const [hideContent, setHideContent] = useState(false);
  const [hideFooter, setHideFooter] = useState(false);

  async function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const { currentTarget } = event;
    const href = currentTarget.getAttribute("href");

    setNextRoute(href);

    event.preventDefault();

    const rect = event.currentTarget.getBoundingClientRect();
    const scrollTo = rect.top + window.scrollY;

    setHideContent(true);
    /* Scroll back to top of window */
    await animate(document.documentElement.scrollTop, scrollTo, {
      duration: 1,
      ease: [0.645, 0.045, 0.355, 1],
      onUpdate: (v) => {
        window.scrollTo(0, v);
      },
    })
      .then(() => {
        /* Hide/change things before route change */
        setHideFooter(true);
        if (currentTarget.dataset.type === "nextProject") {
          setImgSrc(data.nextProject.image);
          setTitle(nextProjectHref);
        }
      })
      .then(() => (href ? router.push(href) : null));
  }

  return (
    <Wrapper>
      <Centered as={Link} href="/" onClick={handleClick}>
        <Title doEnter={state.previousRoute === "/"} doExit={nextRoute === "/"}>
          {title}
        </Title>
        <MotionImage
          src={imgSrc}
          layoutId={`image-${data.id}`}
          doEnter={false}
          doExit={false}
          priority
        />
      </Centered>

      <Content
        as={motion.div}
        initial="hidden"
        animate={hideContent ? "hidden" : "enter"}
        exit="exit"
        variants={{
          hidden: { opacity: 0, x: -200 },
          enter: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 100 },
        }}
        transition={transition}
      />
      <NextProject
        as={Link}
        href={nextProjectHref}
        onClick={handleClick}
        data-type="nextProject"
      >
        {!hideFooter && (
          <>
            <Title doEnter={true} doExit={false}>
              {nextProjectHref}
            </Title>
            <MotionImage
              src={data.nextProject.image}
              doEnter={true}
              doExit={false}
            />
          </>
        )}
      </NextProject>
    </Wrapper>
  );
}
