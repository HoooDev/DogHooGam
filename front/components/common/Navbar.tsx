import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "../../public/icons/logo.png";
import styles from "./Navbar.module.scss";
import createlogo from "../../public/icons/create.svg";

import profileimg from "../../public/icons/profile.svg";

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
            <Image width="30px" height="30px" src={profileimg} alt="#" />
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
