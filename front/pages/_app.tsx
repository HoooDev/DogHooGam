import "../styles/reset.css";
import "../styles/_typography.scss";
import "../styles/font.css";
import "../styles/_common.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store, { persistor, wrapper } from "../redux/store";
import AppLayout from "../components/AppLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppLayout>
          <Head>
            <script async src="https://developers.kakao.com/sdk/js/kakao.js" />
          </Head>
          <Component {...pageProps} />
        </AppLayout>
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
