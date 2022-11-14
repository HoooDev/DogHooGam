import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "../../public/icons/logo.png";
import styles from "./Navbar.module.scss";
import createlogo from "../../public/icons/create.svg";

const SvgProfile = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 248.349 248.349"
    style={{
      enableBackground: "new 0 0 248.349 248.349"
    }}
    xmlSpace="preserve"
    width="32px"
    height="32px"
    {...props}
  >
    <path d="M9.954 241.305h228.441c3.051 0 5.896-1.246 7.805-3.416 1.659-1.882 2.393-4.27 2.078-6.723-5.357-41.734-31.019-76.511-66.15-95.053-14.849 14.849-35.348 24.046-57.953 24.046s-43.105-9.197-57.953-24.046C31.09 154.65 5.423 189.432.071 231.166c-.315 2.453.424 4.846 2.078 6.723 1.909 2.17 4.754 3.416 7.805 3.416z" />
    <path d="M72.699 127.09a72.826 72.826 0 0 0 4.166 4.019c12.586 11.259 29.137 18.166 47.309 18.166s34.723-6.913 47.309-18.166a72.838 72.838 0 0 0 4.166-4.019c1.327-1.398 2.622-2.828 3.84-4.329 9.861-12.211 15.8-27.717 15.8-44.6 0-39.216-31.906-71.116-71.116-71.116S53.059 38.95 53.059 78.16c0 16.883 5.939 32.39 15.8 44.6 1.213 1.502 2.507 2.927 3.84 4.33z" />
  </svg>
);

function Navbar() {
  const router = useRouter();
  return (
    <nav
      className={`${styles.wrapper} flex justify-space-between align-center`}
    >
      <Link href="/home">
        <div className={`${styles.icon}`}>
          <Image src={logo} alt="#" />
        </div>
      </Link>
      <div className={`${styles.imgbox}`}>
        {router.pathname === "/memory" ? (
          <Link href="/memory/create">
            <div className={`${styles.profileimg}`}>
              <Image width="40px" height="40px" src={createlogo} alt="#" />
            </div>
          </Link>
        ) : null}
        <Link href="/profile">
          <div className={`${styles.profileimg}`}>
            {router.pathname.startsWith("/profile") ? (
              <SvgProfile fill="#9E7676" />
            ) : (
              <SvgProfile fill="#787878" />
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
