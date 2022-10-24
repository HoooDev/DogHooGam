import { useRouter } from "next/router";
import styles from "./AppLayout.module.scss";

import Navbar from "./common/Navbar";
import Footer from "./common/Footer";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const router = useRouter();

  return (
    <div className={`${styles.wrapper}`}>
      {router.pathname === "/" ? null : <Navbar />}
      <div className={`${styles.children}`}>{children}</div>
      {router.pathname === "/" ? null : <Footer />}
    </div>
  );
};

export default AppLayout;
