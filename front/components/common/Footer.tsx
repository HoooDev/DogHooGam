import Link from "next/link";
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer
      className={`${styles.wrapper} flex justify-space-around align-center`}
    >
      <Link href="/walk">산책</Link>
      <Link href="/memory">사진</Link>
      <Link href="/home">홈</Link>
      <Link href="/calendar">달력</Link>
      <Link href="/chat">챗봇</Link>
    </footer>
  );
}
export default Footer;
