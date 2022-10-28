import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.scss";
import logo from "../../public/icons/logo.png";

import profileimg from "../../public/icons/profile.svg";

function Navbar() {
  return (
    <nav
      className={`${styles.wrapper} flex justify-space-between align-center`}
    >
      <Link href="/home">
        <div className={`${styles.icon}`}>
          <Image src={logo} alt="#" />
        </div>
      </Link>
      <Link href="/profile">
        <a className={`${styles.link}`}>마이페이지</a>
      </Link>
    </nav>
  );
}

export default Navbar;
