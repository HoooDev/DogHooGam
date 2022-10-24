import "../styles/reset.css";
import "../styles/_typography.scss";
import "../styles/font.css";
import "../styles/_common.scss";
import type { AppProps } from "next/app";
import AppLayout from "../components/AppLayout";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../redux/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
