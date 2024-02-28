import { images } from "../data/images";
import { Carousel } from "../components/Carousel";

export default function Home() {
  return <Carousel items={images} />;
}
