import styles from "./Navbar.module.scss";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/icons/logo.png";

import profileimg from "../../public/icons/profile.svg";

function Navbar() {
  return (
    <nav
      className={`${styles.wrapper} flex justify-space-between align-center`}
    >
      <Link href="/">
        <div className={`${styles.icon}`}>
          <Image src={logo} alt="#" />
        </div>
      </Link>
      <Link href="/profile">
<<<<<<< HEAD
        <a className={`${styles.link}`}>마이페이지</a>
=======
        <div className={`${styles.profileimg}`}>
          <Image width="30px" height="30px" src={profileimg} alt="#" />
        </div>
>>>>>>> a87eef3cc99c5ab4f8ed337616fd2f94f23d8cbd
      </Link>
    </nav>
  );
}

export default Navbar;
