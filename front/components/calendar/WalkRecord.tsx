/* eslint-disable no-param-reassign */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./WalkRecord.module.scss";
import WalkMap from "./WalkMap.jsx";

// import KakaoMap from "../walk/KakaoMap"; // 산책하기 카카오맵 일단 넣었습니당

// 더미이미지
// import map from "../../public/image/map.png";
import { RootState } from "../../redux/store";

const getCenter = (paths: any[]) => {
  let maxLat = 0;
  let maxLng = 0;
  let minLat = 100;
  let minLng = 1000;
  paths.forEach((path: any) => {
    if (maxLat < path.lat) {
      maxLat = path.lat;
    }
    if (maxLng < path.lng) {
      maxLng = path.lng;
    }
    if (minLat > path.lat) {
      minLat = path.lat;
    }
    if (minLng > path.lng) {
      minLng = path.lng;
    }
  });
  return {
    lat: (minLat + maxLat) / 2,
    lng: (minLng + maxLng) / 2
  };
};

function WalkRecord() {
  const { positions } = useSelector((state: RootState) => state.calendar);
  console.log(positions);
  const dummy = { time: "00:34:27", dist: "3.27", coin: 5 };
  const [poss, setPoss] = useState<any[]>([]);
  const [center, setCenter] = useState<any>();
  useEffect(() => {
    console.log(positions);
    if (positions.length === 0) {
      return;
    }
    positions.forEach((pos) => {
      const tmp = {};
      pos.position = {
        lat: pos.lat,
        lng: pos.lng
      };
      setPoss((prev) => [...prev, tmp]);
    });
  }, [positions]);

  useEffect(() => {
    setCenter(getCenter(poss));
  }, [poss]);
  return (
    <div className={`${styles.wrapper}`} id="산책기록">
      <div className={`${styles.map}`}>
        <WalkMap positions={poss} center={center} />
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
