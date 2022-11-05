/* eslint-disable consistent-return */
/* eslint-disable prefer-template */
/* eslint-disable no-bitwise */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";

import gps from "../../public/icons/gps.svg";
import styles from "./KakaoMap.module.scss";
import Modal from "../common/Modal";
import {
  saveDistance,
  pushPaths,
  nowWalkingApi
} from "../../redux/slice/walkSlice";

let kakao;

if (typeof window !== "undefined") {
  kakao = window.kakao;
}

// const positions = [
//   {
//     title: "카카오",
//     latlng: { lat: 33.450705, lng: 126.570677 }
//   },
//   {
//     title: "생태연못",
//     latlng: { lat: 33.450936, lng: 126.569477 }
//   },
//   {
//     title: "텃밭",
//     latlng: { lat: 33.450879, lng: 126.56994 }
//   },
//   {
//     title: "근린공원",
//     latlng: { lat: 33.451393, lng: 126.570738 }
//   }
// ];

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
  const { isPaused, paths, personId } = useSelector((state) => state.walk);
  const timeout = useRef(null);
  const dispatch = useDispatch();
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0
  });
  // const [paths, setPaths] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOtherModalOpen, setIsOtherModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleOtherModal = () => setIsOtherModalOpen(!isOtherModalOpen);

  const handleClick = ({ lat, lng }) => {
    dispatch(pushPaths({ lat, lng }));
    if (paths?.length > 1) {
      // 누적 총 거리
      const dist = calculateDistance(
        paths[paths.length - 1].lat,
        paths[paths.length - 1].lng,
        paths[paths.length - 2].lat,
        paths[paths.length - 2].lng
      );
      dispatch(saveDistance(dist.toString()));
    }
  };

  const init = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude; // 위도
        const lng = position.coords.longitude; // 경도
        dispatch(pushPaths({ lat, lng }));
        setCenter({ lat, lng });
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

  const walking = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude; // 위도
        const lng = position.coords.longitude; // 경도
        console.log("산책중 api");
        nowWalkingApi({ lat, lng, personId })
          .then((res) => {
            const newPositions = [];
            res.forEach((element) => {
              const tmp = {
                title: element.dogPk,
                latlng: { lat: element.lat, lng: element.lng }
              };
              newPositions.push(tmp);
            });
            setPositions(newPositions);
            dispatch(pushPaths({ lat, lng }));
            setCenter({ lat, lng });
            handleClick({ lat, lng });
          })
          .catch((err) => {
            console.error(err);
          });
      });
    }
  };

  useEffect(() => {
    if (isSending) return;
    walking();
    setIsSending(true);
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      setIsSending(false);
    }, 3000);
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [isSending, handleClick]);

  useEffect(() => {
    if (isSending) return;
    if (!isPaused) {
      walking();
      setIsSending(true);
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      timeout.current = setTimeout(() => {
        setIsSending(false);
      }, 3000);
    } else if (isPaused) {
      setIsSending(true);
    }
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [isSending, isPaused, handleClick, walking]);

  return (
    <div className={styles.wrapper}>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <div>내정보</div>
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
        />

        <div className={styles.map__marker}>
          <MapMarker
            position={center}
            onClick={toggleModal}
            image={{
              src: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Red_Point.gif", // 마커이미지의 주소입니다
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
          <div key={`${position.title}-${position.latlng},${index + 1}`}>
            <MapMarker
              onClick={toggleOtherModal}
              position={position.latlng} // 마커를 표시할 위치
              image={{
                src: "https://cdn-icons-png.flaticon.com/128/2171/2171990.png", // 마커이미지의 주소입니다
                size: {
                  width: 36,
                  height: 36
                } // 마커이미지의 크기입니다
              }}
              title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            />
            <Modal isOpen={isOtherModalOpen} onClose={toggleOtherModal}>
              <div>{position.title}</div>
            </Modal>
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
