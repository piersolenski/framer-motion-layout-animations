import { InferGetStaticPropsType } from "next";
import { useEffect } from "react";
import { useGlobalState } from "../../hooks/useGlobalState";
import styled from "styled-components";
import { MotionTitle } from "@/components/motion/MotionTitle";
import { Centered } from "@/components/Centered";
import { transition } from "@/theme/animations";
import { imagesAndVimeoIds } from "@/data/imagesAndVimeoVideos";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { MotionMedia } from "@/components/motion/MotionMedia";

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

export async function getStaticPaths() {
  return {
    paths: imagesAndVimeoIds.map((media) => ({
      params: { slug: `item-${media._id}` },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context: { params: { slug: string } }) {
  const { slug = "" } = context.params;
  function getId(str: string): number {
    const match = str.match(/item-(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  const id = getId(slug);
  const currentIdx = imagesAndVimeoIds.findIndex((media) => media._id === id);
  const nextIdx = (currentIdx + 1) % imagesAndVimeoIds.length;
  const nextProject = imagesAndVimeoIds[nextIdx];

  return {
    props: {
      data: {
        slug,
        item: imagesAndVimeoIds[currentIdx],
        nextProject: {
          id: nextProject._id,
          item: nextProject,
        },
      },
    },
  };
}

interface Props extends InferGetStaticPropsType<typeof getStaticProps> {}

export default function Work({ data }: Props) {
  const { state } = useGlobalState();
  const nextProjectHref = `/work/item-${data.nextProject.id}`;

  useEffect(() => {
    /* PAGE ENTER FROM ANOTHER PROJECT */
    if (state.previousRoute !== "/" && state.pageTransition === "done") {
      /* Scrolling has been disabled when coming from another porject,
       * so do the scrolling */
      window.scrollTo(0, 0);
    }
  }, [state.pageTransition, state.previousRoute]);

  return (
    <Wrapper>
      <Centered>
        <TransitionLink id={data.item._id} href="/">
          <MotionTitle
            initial={
              state.previousRoute === "/"
                ? { opacity: 0 }
                : { y: state.previousFooterTop }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >{`/work/item-${data.item._id}`}</MotionTitle>
        </TransitionLink>
      </Centered>

      <Centered>
        <MotionMedia
          item={data.item}
          layoutId={`item-${data.item._id}`}
          initial={
            state.previousRoute === "/"
              ? { opacity: 0 }
              : { y: state.previousFooterTop }
          }
          animate={{ opacity: 1, y: 0 }}
        />
      </Centered>

      <Content
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0, transition: { ...transition, delay: 1 } }}
        exit={{ opacity: 0, x: 100 }}
        transition={transition}
      />

      <Centered>
        <TransitionLink id={data.nextProject.id} href={nextProjectHref}>
          <MotionTitle>{nextProjectHref}</MotionTitle>
        </TransitionLink>
        <MotionMedia item={data.nextProject.item} />
      </Centered>
    </Wrapper>
  );
}
