import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { StateProvider } from "../state/global";
import { AnimatePresence } from "framer-motion";

export default function App({ Component, router, pageProps }: AppProps) {
  return (
    <StateProvider>
      <AnimatePresence mode="wait">
        <Component key={router.asPath} {...pageProps} />
      </AnimatePresence>
    </StateProvider>
  );
}
