/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import { useSelector } from "react-redux";
import styles from "./WalkRecord.module.scss";
import WalkMap from "./WalkMap.jsx";

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

  return (
    <div className={`${styles.wrapper}`} id="산책기록">
      {records && records[selectDay.day]?.length > 0 ? (
        <div className={`${styles.map}`}>
          {records[selectDay.day]?.map((record: any, index: number) => {
            const center: { lat: number; lng: number } = getCenter(
              record.walkPath
            );
            return (
              <div key={`${index * 1}`}>
                <WalkMap positions={record.walkPath} center={center} />
                <div className={`${styles.bottom} flex`}>
                  <div className={`${styles.sub1} notoBold fs-18`}>시간</div>
                  <div className={`${styles.sub2} notoBold fs-18`}>거리</div>
                  <div className={`${styles.sub3} notoBold fs-18`}>
                    획득 코인
                  </div>
                </div>
                <div className={`${styles.content} flex`}>
                  <div className={`${styles.con1} notoMid fs-18`}>
                    {record.time}
                  </div>
                  <div className={`${styles.con2} notoMid fs-18`}>
                    {record.distance} km
                  </div>
                  <div className={`${styles.con3} notoMid fs-18`}>
                    {record.coin} INK
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={`${styles.nomap} notoMid fs-16`}>
          <div className={`${styles.nomaptxt}`}>산책기록이 없습니다.</div>
          <div className={`${styles.nomaptxt}`}>
            강아지와 산책을 하면 이곳에 기록됩니다:)
          </div>
          <div className={`${styles.nomaptxt}`}>산책을 즐기세요!</div>
        </div>
      )}
    </div>
  );
}

export default WalkRecord;
