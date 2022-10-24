import styles from "./AppLayout.module.scss";
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';


type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return <div className={`${styles.wrapper}`}>
    <Navbar />
    <div className={`${styles.children}`}>{children}</div>
    
    <Footer />
    </div>;
};

export default AppLayout;
