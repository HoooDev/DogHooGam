import "../styles/reset.css";
import "../styles/_variables.scss";
import "../styles/_typography.scss";
import "../styles/font.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
