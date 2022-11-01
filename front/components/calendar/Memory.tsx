import Image from "next/image";
import styles from "./Memory.module.scss";

// 더미 이미지
import dog from "../../public/image/dog.jpeg";

function Memory() {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.image}`}>
        <Image
          width={320}
          height={300}
          src={dog}
          alt="추억이미지"
          objectFit="cover"
        />
      </div>
      <div className={`${styles.text} notoMid fs-16`}>오늘은 백두산 회식^^</div>
    </div>
  );
}

export default Memory;
