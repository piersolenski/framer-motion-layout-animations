import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { StateProvider } from "../state/global";
import { AnimatePresence } from "framer-motion";
import { RouteTracker } from "../components/RouteTracker";

export default function App({ Component, router, pageProps }: AppProps) {
  return (
    <StateProvider>
      <RouteTracker>
        <AnimatePresence mode="wait">
          <Component key={router.asPath} {...pageProps} />
        </AnimatePresence>
      </RouteTracker>
    </StateProvider>
  );
}
