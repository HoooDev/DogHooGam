import Image from "next/image";
import styles from "./WalkRecord.module.scss";

// 더미이미지
import map from "../../public/image/map.png";

function WalkRecord() {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.map}`}>
        <Image src={map} alt="지도더미" width={360} height={400} />
      </div>
      <div className={`${styles.bottom} flex`}>
        <div className={`${styles.sub1} notoBold fs-24`}>시간</div>
        <div className={`${styles.sub2} notoBold fs-24`}>거리</div>
        <div className={`${styles.sub3} notoBold fs-24`}>획득 코인</div>
      </div>
      <div className={`${styles.content} flex`}>
        <div className={`${styles.con1} notoMid fs-18`}>00 : 57 : 27</div>
        <div className={`${styles.con2} notoMid fs-18`}>3.27 KM</div>
        <div className={`${styles.con3} notoMid fs-18`}>5 코인</div>
      </div>
    </div>
  );
}

export default WalkRecord;
