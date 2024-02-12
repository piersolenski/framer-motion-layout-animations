import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { StateProvider } from "../state/global";
import { AnimatePresence } from "framer-motion";
import { usePreviousRoute } from "@/hooks/usePreviousRoute";

export default function App({ Component, router, pageProps }: AppProps) {
  const previousRoute = usePreviousRoute();

  return (
    <StateProvider>
      <AnimatePresence mode="wait">
        <Component
          key={router.asPath}
          {...pageProps}
          previousRoute={previousRoute}
        />
      </AnimatePresence>
    </StateProvider>
  );
}
