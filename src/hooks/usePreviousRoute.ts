import { useRouter } from "next/router";
import { useRef } from "react";

export const usePreviousRoute = () => {
  const router = useRouter();

  const ref = useRef<string | null>(null);

  router.events?.on("routeChangeStart", () => {
    ref.current = router.asPath;
  });

  return ref.current;
};
