/* eslint-disable consistent-return */
/* eslint-disable prefer-template */
/* eslint-disable no-bitwise */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Map, MapMarker, Polyline, ZoomControl } from "react-kakao-maps-sdk";

import gps from "../../public/icons/gps.svg";
import styles from "./KakaoMap.module.scss";
import Modal from "../common/Modal";
import {
  saveDistance,
  pushPaths,
  nowWalkingApi,
  getOtherDogs
} from "../../redux/slice/walkSlice";

let kakao;

if (typeof window !== "undefined") {
  kakao = window.kakao;
}

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  }
  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  return dist * 1.609344;
};

const KakaoMap = () => {
  // console.log(process.env.NEXT_PUBLIC_KAKAO_KEY);
  const [positions, setPositions] = useState([]);
  const { isPaused, paths, personId, myDogs } = useSelector(
    (state) => state.walk
  );
  const timeout = useRef(null);
  const dispatch = useDispatch();
  const [map, setMap] = useState(null);
  const [level, setLevel] = useState(1);
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOtherModalOpen, setIsOtherModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [other, setOther] = useState({});
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleOtherModal = (pk) => {
    setIsOtherModalOpen(!isOtherModalOpen);
    if (pk) {
      setOther(pk);
    }
  };

  useEffect(() => {
    if (isOtherModalOpen) {
      if (!other) return;
      getOtherDogs(other)
        .then((res) => {
          setOther(res);
        })
        .catch(() => console.log);
    }
  }, [isOtherModalOpen, other]);

  const handleClick = ({ lat, lng }) => {
    if (paths?.length > 1) {
      // 최근 움직인 거리
      const dist = calculateDistance(
        paths[paths.length - 1].lat,
        paths[paths.length - 1].lng,
        lat,
        lng
      );
      if (dist > 0.05) {
        return;
      }
      dispatch(saveDistance(dist));
    }

    const lastPos = paths[paths.length - 1];
    if (paths.length > 1 && lastPos.lat === lat && lastPos.lng) return;
    let xDiff = 0;
    let yDiff = 0;
    if (lastPos) {
      xDiff = lat - lastPos.lat;
      yDiff = lng - lastPos.lng;
    }
    const tmp = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    if (tmp > 0.00004) {
      dispatch(pushPaths({ lat, lng }));
    }
  };

  const init = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude; // 위도
        const lng = position.coords.longitude; // 경도
        // const lat = parseFloat(position.coords.latitude.toFixed(5)); // 위도
        // const lng = parseFloat(position.coords.longitude.toFixed(5));
        dispatch(pushPaths({ lat, lng }));
        setCenter({ lat, lng });
        // handleClick({ lat, lng });
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
        // const lat = parseFloat(position.coords.latitude.toFixed(5)); // 위도
        // const lng = parseFloat(position.coords.longitude.toFixed(5));
        map.setCenter(new kakao.maps.LatLng(lat, lng));
        setCenter({ lat, lng });
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  const walking = () => {
    if (isSending) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude; // 위도
          const lng = position.coords.longitude; // 경도
          // const lat = parseFloat(position.coords.latitude.toFixed(5)); // 위도
          // const lng = parseFloat(position.coords.longitude.toFixed(5));
          console.log(lat, lng);
          nowWalkingApi({ lat, lng, personId })
            .then((res) => {
              const newPositions = [];
              res.forEach((element) => {
                newPositions.push({
                  title: element.dogPk,
                  latlng: { lat: element.lat, lng: element.lng },
                  dogState: element.dogState
                });
              });
              setPositions(newPositions);
              // dispatch(pushPaths({ lat, lng }));
              setCenter({ lat, lng });
              handleClick({ lat, lng });
            })
            .catch((err) => {
              console.error(err);
            });
        },
        () => console.error,
        {
          enableHighAccuracy: true
        }
      );
    }
  };

  useEffect(() => {
    if (!isPaused) {
      walking(); // api 호출
      setIsSending(true); // API 플래그
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      timeout.current = setTimeout(() => {
        setIsSending(false);
      }, 3000);
    } else if (isPaused) {
      setIsSending(true);
    }
  }, [isPaused, walking]);

  return (
    <div className={styles.wrapper}>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        {myDogs?.map((dog) => (
          <div key={dog.pk}>
            <div>생일 : {dog.birthday}</div>
            <div>견종 : {dog.dogBreed}</div>
            <div>성격 : {dog.dogCharacter}</div>
            {/* <div><Image /></div> */}
            <div>이름 : {dog.dogName}</div>
          </div>
        ))}
      </Modal>

      <Modal isOpen={isOtherModalOpen} onClose={toggleOtherModal}>
        <div>{other}</div>
      </Modal>

      <Map
        className={styles.map}
        center={center}
        level={level}
        onCreate={(map) => setMap(map)}
        onZoomChanged={(map) => setLevel(map.getLevel())}
      >
        <ZoomControl />
        <Polyline
          path={paths}
          strokeWeight={5} // 선의 두께입니다
          strokeColor="#db4040" // 선의 색깔입니다
          strokeOpacity={1} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
          strokeStyle="solid" // 선의 스타일입니다
        />

        <div className={styles.map__marker}>
          <MapMarker
            position={center}
            onClick={toggleModal}
            image={{
              src:
                // dogState === 0
                //   ? "https://lab.ssafy.com/s07-final/S07P31C103/uploads/bd9a02e70f2fa3d9f84a7fd9ab8b7b0c/realGreen.png"
                //   : "https://lab.ssafy.com/s07-final/S07P31C103/uploads/b8d28a189b358bfedc97693c18c51a3d/realRed.png", // 마커이미지의 주소입니다
                "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
              size: {
                width: 40,
                height: 40
              }, // 마커이미지의 크기입니다
              options: {
                offset: {
                  x: 20,
                  y: 40
                } // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              }
            }}
          />
        </div>

        {positions.map((position, index) => (
          <div key={`${position.dogName}-${position.latlng},${index + 1}`}>
            <MapMarker
              onClick={() => toggleOtherModal(position.dogPk)}
              position={position.latlng} // 마커를 표시할 위치
              image={{
                src:
                  position.dogState === 0
                    ? "https://lab.ssafy.com/s07-final/S07P31C103/uploads/bd9a02e70f2fa3d9f84a7fd9ab8b7b0c/realGreen.png"
                    : "https://lab.ssafy.com/s07-final/S07P31C103/uploads/b8d28a189b358bfedc97693c18c51a3d/realRed.png", // 마커이미지의 주소입니다
                size: {
                  width: 40,
                  height: 40
                } // 마커이미지의 크기입니다
              }}
              // title={position.dogName} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            />
          </div>
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
