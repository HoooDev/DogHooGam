import Link from "next/link";
import styles from "./MemoryList.module.scss";

function MemoryList() {
  const dummys = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 }
  ];
  return (
    <div className={`${styles.wrapper}`}>
      {dummys.map((item) => {
        return (
          <div className={`${styles.item}`} key={item.id}>
            <Link href={`/memory/${item.id}`}>
              <div className={`${styles.img}`} />
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default MemoryList;
