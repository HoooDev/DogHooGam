import styles from "./WalkRecord.module.scss";

import KakaoMap from "../walk/KakaoMap"; // 산책하기 카카오맵 일단 넣었습니당

// 더미이미지
// import map from "../../public/image/map.png";

function WalkRecord() {
  const dummy = { time: "00:34:27", dist: "3.27", coin: 5 };

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.map}`}>
        <KakaoMap />
      </div>
      <div className={`${styles.bottom} flex`}>
        <div className={`${styles.sub1} notoBold fs-24`}>시간</div>
        <div className={`${styles.sub2} notoBold fs-24`}>거리</div>
        <div className={`${styles.sub3} notoBold fs-24`}>획득 코인</div>
      </div>
      <div className={`${styles.content} flex`}>
        <div className={`${styles.con1} notoMid fs-18`}>{dummy.time}</div>
        <div className={`${styles.con2} notoMid fs-18`}>{dummy.dist} KM</div>
        <div className={`${styles.con3} notoMid fs-18`}>{dummy.coin} 코인</div>
      </div>
    </div>
  );
}

export default WalkRecord;
