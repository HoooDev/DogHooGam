import "../styles/reset.css";
import "../styles/_variables.scss";
import "../styles/_typography.scss";
import "../styles/font.css";
import type { AppProps } from "next/app";

import AppLayout from "../components/AppLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}

export default MyApp;
