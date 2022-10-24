import Link from "next/link";
import Image from "next/image";
import logo from "../../public/icons/logo.png";
import styles from "./Navbar.module.scss";

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
      <Link href="/profile">마이페이지</Link>
    </nav>
  );
}

export default Navbar;
