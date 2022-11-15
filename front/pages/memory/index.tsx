import styles from "./index.module.scss";
import MemoryList from "../../components/memory/MemoryList";

function Index() {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.memoryNav} flex justify-space-between`} />
      <MemoryList />
    </div>
  );
}

export default Index;
