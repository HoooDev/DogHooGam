import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";

import gps from "../../public/icons/gps.svg";
import styles from "./KakaoMap.module.scss";

declare global {
  interface Window {
    kakao: any;
  }
}

let kakao: any;

if (typeof window !== "undefined") {
  kakao = (window as any).kakao;
}

const KakaoMap = () => {
  const containerRef = useRef<HTMLDivElement>(null); // 지도 ref
  const initMap = useCallback(() => {
    if (containerRef.current) {
      kakao.maps.load(() => {
        const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 3
        };
        const map = new kakao.maps.Map(containerRef.current, options);
      });
    }
  }, []);
  useEffect(() => {
    if (kakao) {
      initMap();
    }
  }, [initMap]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} id="map" ref={containerRef} />
      <div className={styles.curLocation}>
        <Image src={gps} alt="gps" />
      </div>
    </div>
  );
};

export default KakaoMap;
