import NextImage from "next/image";
import { motion } from "framer-motion";
import { useGlobalState } from "@/hooks/useGlobalState";
import { transition } from "@/pages/work/[slug]";

interface Props {
  src: string;
  layoutId: string;
  exit?: boolean;
}

export const Image = ({ src, layoutId, exit }: Props) => {
  const { state } = useGlobalState();

  return (
    <motion.div
      transition={transition}
      layoutId={layoutId} /* Carousel.tsx:78 */
      initial={false}
      animate={{ opacity: 1 }}
      exit={exit ? { opacity: 1 } : { opacity: 0 }}
    >
      <NextImage src={src} alt={src} width={500} height={500} priority />
    </motion.div>
  );
};
