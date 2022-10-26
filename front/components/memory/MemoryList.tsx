import Image from "next/image";
import styles from "./MemoryList.module.scss";
import dummyimg from "../../public/icons/dummy.svg";

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
            <div className={`${styles.img}`} />
          </div>
        );
      })}
    </div>
  );
}

export default MemoryList;
