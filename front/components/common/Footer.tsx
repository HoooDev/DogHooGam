/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import * as React from "react";
import { SVGProps } from "react";
import { useRouter } from "next/router";
import styles from "./Footer.module.scss";

const SvgHome = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30px"
    height="30px"
    viewBox="0 0 491.969 491.969"
    style={{
      enableBackground: "new 0 0 512 512"
    }}
    xmlSpace="preserve"
    {...props}
  >
    <path
      data-original="#000000"
      d="M412.654 51.687h-80.615V86.06l80.615 65.584zM412.654 307.131v-34.086l-80.615-65.693-86.055-70.125L79.312 273.045V458.4h105.074V275.879h123.196V458.4h105.072z"
    />
    <path
      data-original="#000000"
      d="m79.312 255.517 166.672-135.819 86.055 70.125 80.615 65.694 36.971 30.126 42.344-51.964-79.315-64.522-80.615-65.584-86.055-70.005L0 233.679l42.343 51.964z"
    />
  </svg>
);

const SvgCalendar = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    style={{
      enableBackground: "new 0 0 512 512"
    }}
    xmlSpace="preserve"
    width="30px"
    height="30px"
    {...props}
  >
    <path d="M472.178 54.613h-69.404V40.96c0-9.425-7.641-17.067-17.067-17.067S368.64 31.535 368.64 40.96v13.653H143.36V40.96c0-9.425-7.641-17.067-17.067-17.067s-17.067 7.641-17.067 17.067v13.653H39.822C17.829 54.613 0 72.442 0 94.436v45.511a5.69 5.69 0 0 0 5.689 5.689h500.622a5.69 5.69 0 0 0 5.689-5.689V94.436c0-21.994-17.829-39.823-39.822-39.823zM506.311 179.769H5.689A5.69 5.69 0 0 0 0 185.458v262.838c0 21.986 17.824 39.811 39.811 39.811h432.378c21.988 0 39.811-17.824 39.811-39.811V185.458a5.689 5.689 0 0 0-5.689-5.689zM129.707 391.396h-40.96c-9.425 0-17.067-7.641-17.067-17.067s7.641-17.067 17.067-17.067h40.96c9.425 0 17.067 7.641 17.067 17.067s-7.642 17.067-17.067 17.067zm0-80.783h-40.96c-9.425 0-17.067-7.641-17.067-17.067s7.641-17.067 17.067-17.067h40.96c9.425 0 17.067 7.641 17.067 17.067s-7.642 17.067-17.067 17.067zm97.849 80.783h-40.96c-9.425 0-17.067-7.641-17.067-17.067s7.641-17.067 17.067-17.067h40.96c9.425 0 17.067 7.641 17.067 17.067s-7.642 17.067-17.067 17.067zm0-80.783h-40.96c-9.425 0-17.067-7.641-17.067-17.067s7.641-17.067 17.067-17.067h40.96c9.425 0 17.067 7.641 17.067 17.067s-7.642 17.067-17.067 17.067zm97.848 80.783h-40.96c-9.425 0-17.067-7.641-17.067-17.067s7.641-17.067 17.067-17.067h40.96c9.425 0 17.067 7.641 17.067 17.067s-7.641 17.067-17.067 17.067zm0-80.783h-40.96c-9.425 0-17.067-7.641-17.067-17.067s7.641-17.067 17.067-17.067h40.96c9.425 0 17.067 7.641 17.067 17.067s-7.641 17.067-17.067 17.067zm97.849 80.783h-40.96c-9.425 0-17.067-7.641-17.067-17.067s7.641-17.067 17.067-17.067h40.96c9.425 0 17.067 7.641 17.067 17.067s-7.641 17.067-17.067 17.067zm0-80.783h-40.96c-9.425 0-17.067-7.641-17.067-17.067s7.641-17.067 17.067-17.067h40.96c9.425 0 17.067 7.641 17.067 17.067s-7.641 17.067-17.067 17.067z" />
  </svg>
);

const SvgChatbot = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30px"
    height="30px"
    viewBox="0 0 30.743 30.744"
    style={{
      enableBackground: "new 0 0 512 512"
    }}
    xmlSpace="preserve"
    {...props}
  >
    <path
      d="M28.585 9.67h-.842v9.255c0 1.441-.839 2.744-2.521 2.744H8.743v.44c0 1.274 1.449 2.56 2.937 2.56h12.599l4.82 2.834-.699-2.834h.185c1.487 0 2.158-1.283 2.158-2.56V11.867c0-1.274-.671-2.197-2.158-2.197z"
      data-original="#000000"
    />
    <path
      d="M22.762 3.24H3.622C1.938 3.24 0 4.736 0 6.178v11.6c0 1.328 1.642 2.287 3.217 2.435l-1.025 3.891L8.76 20.24h14.002c1.684 0 3.238-1.021 3.238-2.462v-11.6c0-1.442-1.555-2.938-3.238-2.938zm-16.22 9.792a1.729 1.729 0 1 1 0-3.458 1.729 1.729 0 0 1 0 3.458zm6.458 0a1.729 1.729 0 1 1 0-3.458 1.729 1.729 0 0 1 0 3.458zm6.459 0a1.73 1.73 0 1 1 0-3.46 1.73 1.73 0 0 1 0 3.46z"
      data-original="#000000"
    />
  </svg>
);
const SvgMemory = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30px"
    height="30px"
    viewBox="0 0 36.174 36.174"
    style={{
      enableBackground: "new 0 0 512 512"
    }}
    xmlSpace="preserve"
    {...props}
  >
    <path
      d="M23.921 20.528c0 3.217-2.617 5.834-5.834 5.834s-5.833-2.617-5.833-5.834 2.616-5.834 5.833-5.834 5.834 2.618 5.834 5.834zm12.253-8.284v16.57a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4v-16.57a4 4 0 0 1 4-4h4.92V6.86a3.5 3.5 0 0 1 3.5-3.5h11.334a3.5 3.5 0 0 1 3.5 3.5v1.383h4.92c2.209.001 4 1.792 4 4.001zm-9.253 8.284c0-4.871-3.963-8.834-8.834-8.834-4.87 0-8.833 3.963-8.833 8.834s3.963 8.834 8.833 8.834c4.871 0 8.834-3.963 8.834-8.834z"
      data-original="#000000"
    />
  </svg>
);

const SvgWalk = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30px"
    height="30px"
    viewBox="0 0 464.866 464.866"
    style={{
      enableBackground: "new 0 0 512 512"
    }}
    xmlSpace="preserve"
    {...props}
  >
    <path
      d="M464.287 144.557a8.997 8.997 0 0 0-5.054-5.17l-39.207-15.818c-2.436-12.666-12.056-22.81-24.436-26.008l-2.115-24.363a9 9 0 0 0-15.634-5.267L367.779 79.03l-6.219-21.766a9.001 9.001 0 0 0-17.115-.594l-46.469 128.196-171.982 8.029-.216.01c-35.304 2.12-68.734-16.766-85.167-48.119-2.308-4.403-7.748-6.103-12.149-3.794a9 9 0 0 0-3.794 12.149c14.602 27.861 40.393 47.517 70 54.804a78.614 78.614 0 0 0-3.168 2.951c-11.295 11.142-24.777 31.506-26.736 66.093l-38.965 17.114a9 9 0 0 0-4.866 5.239L.516 357.071a9 9 0 0 0 3.995 10.801l9.804 5.643a8.994 8.994 0 0 0 7.603.645 9.001 9.001 0 0 0 5.366-5.425l14.499-40.702 34.982-2.895-10.63 14.438a8.998 8.998 0 0 0-1.603 6.968l11.105 60.217a9 9 0 0 0 8.851 7.368H95.8a9.003 9.003 0 0 0 8.855-10.612l-7.739-42.508 75.108-51.97c.232-.16-.216.181 0 0 7.114-5.975 12.278-12.556 15.972-19.323 37.819 6.639 90.655 16.078 124.726 21.598.455.209-.492-.132 0 0l70.599 96.525a8.997 8.997 0 0 0 11.384 2.689l8.274-4.261a9.002 9.002 0 0 0 3.881-12.122l-36.604-71.082 37.519 7.635-.904 12.991a9.003 9.003 0 0 0 4.175 8.236l5.521 3.484a9.005 9.005 0 0 0 7.547.961 9 9 0 0 0 5.586-5.164l12.897-31.528a9 9 0 0 0-5.512-11.955l-67.772-23.32 20.217-93.312c3.762.627 7.561.957 11.388.957 26.357 0 50.493-15.431 62.988-40.271a8.997 8.997 0 0 0 .381-7.22z"
      data-original="#000000"
    />
  </svg>
);

function Footer() {
  const router = useRouter();
  return (
    <footer
      className={`${styles.wrapper} flex justify-space-around align-center`}
    >
      <Link href="/walk">
        <a>
          {router.pathname.startsWith("/walk") ? (
            <SvgWalk fill="#9E7676" />
          ) : (
            <SvgWalk fill="#787878" />
          )}
        </a>
      </Link>
      <Link href="/memory">
        <a>
          {router.pathname.startsWith("/memory") ? (
            <SvgMemory fill="#9E7676" />
          ) : (
            <SvgMemory fill="#787878" />
          )}
        </a>
      </Link>
      <Link href="/home">
        <a>
          {router.pathname.startsWith("/home") ? (
            <SvgHome fill="#9E7676" />
          ) : (
            <SvgHome fill="#787878" />
          )}
        </a>
      </Link>
      <Link href="/calendar">
        <a>
          {router.pathname.startsWith("/calendar") ? (
            <SvgCalendar fill="#9E7676" />
          ) : (
            <SvgCalendar fill="#787878" />
          )}
        </a>
      </Link>
      <Link href="/chat">
        <a>
          {router.pathname.startsWith("/chat") ? (
            <SvgChatbot fill="#9E7676" />
          ) : (
            <SvgChatbot fill="#787878" />
          )}
        </a>
      </Link>
    </footer>
  );
}
export default Footer;
