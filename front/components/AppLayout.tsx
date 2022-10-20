import styles from "./AppLayout.module.scss";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return <div className={`${styles.wrapper}`}>{children}</div>;
};

export default AppLayout;
