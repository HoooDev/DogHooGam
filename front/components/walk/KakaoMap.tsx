import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

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
  const [latitude, setLatitude] = useState(35.2059392);
  const [longitude, setLongitude] = useState(126.8154368);
  const containerRef = useRef<HTMLDivElement>(null);
  const initMap = useCallback(() => {
    if (containerRef.current) {
      kakao.maps.load(() => {
        const options = {
          center: new kakao.maps.LatLng(latitude, longitude),
          level: 3
        };
        const map = new kakao.maps.Map(containerRef.current, options);
      });
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (kakao) {
      initMap();
    }
  }, [initMap]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  const onCurLocationClick = () => {
    if (kakao) {
      initMap();
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      kakao.maps.load(() => {
        const mapOption = {
          center: new kakao.maps.LatLng(latitude, longitude),
          level: 3 // 지도의 확대 레벨
        };
        const map = new kakao.maps.Map(containerRef.current, mapOption);
        const markerPosition = new kakao.maps.LatLng(latitude, longitude);
        const marker = new kakao.maps.Marker({
          position: markerPosition
        });
        marker.setMap(map);
      });
    }
  }, [latitude, longitude]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} id="map" ref={containerRef} />
      <div
        className={styles.curLocation}
        onClick={onCurLocationClick}
        aria-hidden="true"
      >
        <Image src={gps} alt="gps" />
      </div>
    </div>
  );
};

export default KakaoMap;
