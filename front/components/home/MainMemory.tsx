import Link from "next/link";
import Image from "next/image";
import styles from "./MainMemory.module.scss";
import memory from "../../public/images/memory.svg";

function MainMemory() {
  return (
    <div className={`${styles.wrapper} flex justify-space-around align-center`}>
      <Link href="/memory">
        <button
          type="button"
          className={`${styles.MainTabButton} fs-10 notoMid`}
        >
          추억남기기
        </button>
      </Link>

      <div className={`${styles.MainTabText}`}>
        <h1 className="fs-13 notoBold text-end">독후감으로</h1>
        <h1 className="fs-13 notoBold text-end">
          강아지와 함께 추억 만들어보세요
        </h1>
      </div>
      <div className={`${styles.MainTabImg}`}>
        <Image src={memory} alt="#" />
      </div>
    </div>
  );
}

export default MainMemory;
