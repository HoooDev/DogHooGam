import Link from "next/link";
import Image from "next/image";
import logo from "../../public/icons/logo.png";
import styles from "./Navbar.module.scss";

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
        <div className={`${styles.profileimg}`}>
          <Image width="30px" height="30px" src={profileimg} alt="#" />
        </div>
      </Link>
    </nav>
  );
}

export default Navbar;
