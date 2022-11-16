import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import logo from "../../public/icons/Logo.svg";
import styles from "./Navbar.module.scss";
import createlogo from "../../public/icons/create.svg";
import { RootState } from "../../redux/store";

import Loading from "../../public/images/Spinner.gif";

const SvgProfile = (props: any) => (
  <svg
    height="40px"
    viewBox="0 0 100 100"
    width="40px"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M49.999 5c-24.813 0-45 20.187-45 45s20.187 45 45 45 45-20.188 45-45c0-24.813-20.186-45-45-45zM80.27 75.684c.168-1.789-.093-3.742-.418-4.707-1.754-5.227-8.754-8.498-13.742-10.689-1.957-.857-7.371-2.309-8.021-4.771-1.021-3.894 2.856-6.86 4.583-9.926 1.816-3.232 3.332-7.606 3.627-11.262 1.063-13.123-6.982-20.8-18.517-19.471-8.386.965-13.396 7.217-13.938 15.269-.549 8.205 2.494 14.264 5.728 18.708 1.415 1.943 2.9 3.195 2.673 5.536-.267 2.771-3.227 3.54-5.344 4.392-2.511 1.008-5.213 2.539-6.491 3.246-4.396 2.43-9.223 5.354-10.309 9.354a12.833 12.833 0 0 0-.442 4.242c-5.84-6.912-9.366-15.842-9.366-25.602 0-21.93 17.777-39.706 39.706-39.706 21.931 0 39.706 17.776 39.706 39.706 0 9.793-3.555 18.755-9.435 25.681z" />
  </svg>
);

function Navbar() {
  const router = useRouter();
  const { isLoading } = useSelector((state: RootState) => state.calendar);
  return (
    <nav
      className={`${styles.wrapper} flex justify-space-between align-center`}
    >
      <Link href="/home">
        <div className={`${styles.icon}`}>
          <Image src={logo} alt="#" />
        </div>
      </Link>
      <div className={`${styles.imgbox} flex`}>
        {router.pathname === "/memory" ? (
          <div className="flex justify-center align-center">
            {!isLoading ? (
              <Link href="/memory/create">
                <div
                  className={`${styles.profileimg} flex justify-center align-center`}
                >
                  <Image src={createlogo} alt="#" />
                </div>
              </Link>
            ) : (
              <div
                className={`${styles.loading} flex justify-center align-center`}
              >
                <Image src={Loading} alt="#" />
              </div>
            )}
          </div>
        ) : null}
        <Link href="/profile">
          <div
            className={`${styles.profileimg} flex justify-center align-center`}
            style={{ marginTop: "2px" }}
          >
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
