import { Carousel } from "../components/Carousel";
import { imagesAndVimeoIds } from "@/data/imagesAndVimeoVideos";

export default function Home() {
  return <Carousel items={imagesAndVimeoIds} />;
}
