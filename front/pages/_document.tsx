import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const { NEXT_PUBLIC_KAKAO_KEY } = process.env;

export default function Document() {
  return (
    <Html>
      <Head>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${NEXT_PUBLIC_KAKAO_KEY}&libraries=services,clusterer&autoload=false`}
          strategy="beforeInteractive"
          defer
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
