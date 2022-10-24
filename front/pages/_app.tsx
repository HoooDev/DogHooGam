import "../styles/reset.css";
import "../styles/_typography.scss";
import "../styles/font.css";
import "../styles/_common.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import { wrapper } from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Head>
        <script async src="https://developers.kakao.com/sdk/js/kakao.js" />
      </Head>
      <Component {...pageProps} />
    </AppLayout>
  );
}

export default wrapper.withRedux(MyApp);
