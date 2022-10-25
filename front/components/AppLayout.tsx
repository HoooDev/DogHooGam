import { useRouter } from "next/router";
import styles from "./AppLayout.module.scss";

import Navbar from "./common/Navbar";
import Footer from "./common/Footer";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const router = useRouter();

  if (router.pathname === "/") {
    return (
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.main}`}>{children}</div>
      </div>
    );
  }
  return (
    <div className={`${styles.wrapper}`}>
      <Navbar />
      <div className={`${styles.children}`}>{children}</div>
      <Footer />
    </div>
  );
};

export default AppLayout;
