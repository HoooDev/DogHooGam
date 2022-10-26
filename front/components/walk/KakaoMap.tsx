import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import gps from "../../public/icons/gps.svg";
import styles from "./KakaoMap.module.scss";
import { startWalking } from "../../redux/slice/walkSlice";

declare global {
  interface Window {
    kakao: any;
  }
}

let kakao: any;

if (typeof window !== "undefined") {
  kakao = (window as any).kakao;
}

// 지도에 마커와 인포윈도우를 표시하는 함수입니다
function displayMarker(locPosition: any, message: string, map: any) {
  // 마커를 생성합니다
  const marker = new kakao.maps.Marker({
    map,
    position: locPosition
  });

  const iwContent = message; // 인포윈도우에 표시할 내용
  const iwRemoveable = true;

  // 인포윈도우를 생성합니다
  const infowindow = new kakao.maps.InfoWindow({
    content: iwContent,
    removable: iwRemoveable
  });

  // 인포윈도우를 마커위에 표시합니다
  infowindow.open(map, marker);

  // 지도 중심좌표를 접속위치로 변경합니다
  map.setCenter(locPosition);
}

const KakaoMap = () => {
  const dispatch = useDispatch();
  const [map, setMap] = useState<unknown>(null);
  // const [latitude, setLatitude] = useState(35.2059392);
  // const [longitude, setLongitude] = useState(126.8154368);
  const containerRef = useRef<HTMLDivElement>(null);
  const fetchMap = useCallback(() => {
    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude; // 위도
        const lon = position.coords.longitude; // 경도
        console.log(lat, lon);
        // const locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
        // const message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

        // 마커와 인포윈도우를 표시합니다
        // displayMarker(locPosition, message, map);

        // dispatch(startWalking(locPosition));
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

      const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
      const message = "geolocation을 사용할수 없어요..";

      displayMarker(locPosition, message, map);
    }
  }, [map]);

  const initMap = useCallback(() => {
    if (containerRef.current) {
      kakao.maps.load(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude; // 위도
          const lon = position.coords.longitude; // 경도
        });

        const mapOption = {
          center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 10 // 지도의 확대 레벨
        };
        const firstMap = new kakao.maps.Map(containerRef.current, mapOption); // 지도를 생성합니다

        const locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
        const message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message, map);
      });
    }
  }, []);

  useEffect(() => {
    if (kakao) {
      initMap();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (kakao) {
        fetchMap();
      }
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [map]);

  const onCurLocationClick = () => {
    if (kakao) {
      fetchMap();
    }
  };

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
