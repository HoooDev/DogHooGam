/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
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
  const { records, selectDay } = useSelector(
    (state: RootState) => state.calendar
  );
  const dummy = { time: "00:34:27", dist: "3.27", coin: 5 };
  const [poss, setPoss] = useState<any[]>([]);
  useEffect(() => {
    if (records.length > 0) {
      const tmp = records.map((records) => {
        if (records.length === 0) {
          return [];
        }
        const tmp = records.map((positions: any) => {
          return positions.walkPath;
        });
        return tmp;
      });
      setPoss(tmp);
      console.log(tmp);
    }
  }, [records]);

  return (
    <div className={`${styles.wrapper}`} id="산책기록">
      <div className={`${styles.map}`}>
        {poss[selectDay.day]?.map((walk: any, index: number) => {
          const center: { lat: number; lng: number } = getCenter(walk);
          return (
            <WalkMap key={`${index * 1}`} positions={walk} center={center} />
          );
        })}
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
