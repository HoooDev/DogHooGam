/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import gps from "../../public/icons/gps.svg";
import styles from "./KakaoMap.module.scss";
import { nowWalking, startWalking } from "../../redux/slice/walkSlice";
import { AppDispatch } from "../../redux/store";
import Modal from "../common/Modal";

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
  const dispatch = useDispatch<AppDispatch>();
  const [map, setMap] = useState<any>(null);
  const [isFirst, setIsFirst] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [latitude, setLatitude] = useState(35.2056221);
  // const [longitude, setLongitude] = useState(126.8115104);
  const containerRef = useRef<HTMLDivElement>(null);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude; // 위도
        const lon = position.coords.longitude; // 경도
        setLatitude(lat);
        setLongitude(lon);
        setIsFirst(true);
        console.log(lat, lon);
      });
    }
  };

  // 지도에 마커와 인포윈도우를 표시하는 함수입니다
  const displayMarker = (map: any) => {
    kakao.maps.load(() => {
      // 마커를 생성합니다
      const imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png"; // 마커이미지의 주소입니다
      const imageSize = new kakao.maps.Size(64, 69); // 마커이미지의 크기입니다
      const imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );
      const markerPosition = new kakao.maps.LatLng(latitude, longitude); // 마커가 표시될 위치입니다

      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage // 마커이미지 설정
      });
      marker.setMap(map);

      // 마커에 마우스오버 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", () => {
        // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
        setIsModalOpen(true);
      });
    });
  };

  const initMap = () => {
    kakao.maps.load(() => {
      const firstMap = new kakao.maps.Map(containerRef.current, {
        center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
        level: 10 // 지도의 확대 레벨
      }); // 지도를 생성합니다
      setMap(firstMap);
      displayMarker(firstMap);
    });
  };

  const moveMap = () => {
    kakao.maps.load(() => {
      // 이동할 위도 경도 위치를 생성합니다
      const moveLatLon = new kakao.maps.LatLng(latitude, longitude);
      // 지도 중심을 부드럽게 이동시킵니다
      // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
      map.panTo(moveLatLon);
    });
  };
  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    if (isFirst) {
      initMap();
    }
  }, [isFirst]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchLocation();
      displayMarker(map);
      dispatch(
        nowWalking({
          lat: latitude,
          lon: longitude
        })
      );
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const onCurLocationClick = () => {
    fetchLocation();
    moveMap();
  };

  return (
    <div className={styles.wrapper}>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <div>강쥐</div>
      </Modal>
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
