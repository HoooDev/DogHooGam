/* eslint-disable prefer-template */
/* eslint-disable no-bitwise */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  Polyline
} from "react-kakao-maps-sdk";

import gps from "../../public/icons/gps.svg";
import styles from "./KakaoMap.module.scss";
import Modal from "../common/Modal";
import { nowWalking } from "../../redux/slice/walkSlice";
import DistanceInfo from "./DistanceInfo";

let kakao;

if (typeof window !== "undefined") {
  kakao = window.kakao;
}

const positions = [
  {
    title: "카카오",
    latlng: { lat: 33.450705, lng: 126.570677 }
  },
  {
    title: "생태연못",
    latlng: { lat: 33.450936, lng: 126.569477 }
  },
  {
    title: "텃밭",
    latlng: { lat: 33.450879, lng: 126.56994 }
  },
  {
    title: "근린공원",
    latlng: { lat: 33.451393, lng: 126.570738 }
  }
];

const KakaoMap = () => {
  // console.log(process.env.NEXT_PUBLIC_KAKAO_KEY);
  const interval = useRef(null);
  const dispatch = useDispatch();
  // const [lat, setLat] = useState(0);
  // const [lng, setLng] = useState(0);
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0
  });
  const [paths, setPaths] = useState([]);
  const [distances, setDistances] = useState([]);
  const [clickLine, setClickLine] = useState();
  const [clickedArr, setClickedArr] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const { others } = useSelector((state) => state.walk);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleClick = ({ lat, lng }) => {
    setPaths((prev) => [...prev, { lat, lng }]);
    if (clickLine) {
      setDistances((prev) => [
        ...prev,
        Math.round(
          clickLine.getLength() + clickedArr[clickedArr.length - 2].getLength()
        )
      ]);
    }
    setClickedArr((prev) => [...prev, clickLine]);
  };

  const init = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude; // 위도
        const lng = position.coords.longitude; // 경도
        setCenter({ lat, lng });
        setPaths((prev) => [...prev, { lat, lng }]);
        handleClick({ lat, lng });
      });
    } else {
      alert("지도 정보를 허용해주세요!");
    }
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude; // 위도
        const lng = position.coords.longitude; // 경도
        map.setCenter(new kakao.maps.LatLng(lat, lng));
        setCenter({ lat, lng });
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    interval.current = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude; // 위도
          const lng = position.coords.longitude; // 경도
          setCenter({ lat, lng });
          dispatch(nowWalking({ lat, lng }));
          handleClick({ lat, lng });
        });
      }
    }, 3000);
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <div>강쥐</div>
      </Modal>

      <Map
        className={styles.map}
        center={center}
        level={5}
        onCreate={(map) => setMap(map)}
      >
        <Polyline
          path={paths}
          strokeWeight={3} // 선의 두께입니다
          strokeColor="#db4040" // 선의 색깔입니다
          strokeOpacity={1} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
          strokeStyle="solid" // 선의 스타일입니다
          onCreate={setClickLine}
        />
        {paths.length > 0 &&
          paths.map((path, index) => (
            <CustomOverlayMap
              key={`dot-${path.lat},${path.lng},${index + 1}`}
              position={path}
              zIndex={1}
            >
              <span className="dot" />
            </CustomOverlayMap>
          ))}
        {paths.length > 1 &&
          distances.slice(1, distances.length).map((distance, index) => (
            <CustomOverlayMap
              key={`distance-${paths[index + 1].lat},${paths[index + 1].lng},${
                index + 1
              }`}
              position={paths[index + 1]}
              yAnchor={1}
              zIndex={2}
            >
              {distances.length === index + 2 ? (
                <DistanceInfo distance={distance} />
              ) : (
                <div className="dotOverlay">
                  거리 <span className="number">{distance}</span>m
                </div>
              )}
            </CustomOverlayMap>
          ))}

        <div className={styles.map__marker}>
          <MapMarker
            position={center}
            onClick={toggleModal}
            image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 마커이미지의 주소입니다
              size: {
                width: 64,
                height: 69
              }, // 마커이미지의 크기입니다
              options: {
                offset: {
                  x: 27,
                  y: 69
                } // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              }
            }}
          />
        </div>

        {positions.map((position, index) => (
          <MapMarker
            key={`${position.title}-${position.latlng},${index + 1}`}
            position={position.latlng} // 마커를 표시할 위치
            image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
              size: {
                width: 24,
                height: 35
              } // 마커이미지의 크기입니다
            }}
            title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          />
        ))}
      </Map>

      <div
        className={styles.curLocation}
        onClick={fetchLocation}
        aria-hidden="true"
      >
        <Image src={gps} alt="gps" />
      </div>
    </div>
  );
};

export default KakaoMap;
