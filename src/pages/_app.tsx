import type { AppProps } from "next/app";
import "../core/ui/styles/global.scss";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
