import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { StateProvider } from "../state/global";
import { RouteTracker } from "../components/RouteTracker";
import Page from "@/components/Page";

export default function App({ Component, router, pageProps }: AppProps) {
  return (
    <StateProvider>
      <RouteTracker>
        <Page>
          <Component key={router.asPath} {...pageProps} />
        </Page>
      </RouteTracker>
    </StateProvider>
  );
}
