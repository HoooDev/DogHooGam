import styles from "./AppLayout.module.scss";
import Navbar from '../components/common/Navbar';

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return <div className={`${styles.wrapper}`}>
    <Navbar />
    <div className={`${styles.children}`}>{children}</div>
    
    <footer>aaa</footer>
    </div>;
};

export default AppLayout;
