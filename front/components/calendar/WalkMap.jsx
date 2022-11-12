/* eslint-disable react/prop-types */
import { Polyline, Map } from "react-kakao-maps-sdk";

// const positions = [
//   {
//     position: {
//       lat: 33.450701,
//       lng: 126.570667
//     }
//   },
//   {
//     position: {
//       lat: 33.450001,
//       lng: 126.570467
//     }
//   }
// ]

// const center = {
//   // 지도의 중심좌표
//   lat: 33.450701,
//   lng: 126.570667
// }

// 여기부터 여기여기여기여기 해보자~~~~~~!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// const beforeCapture = (positions) => {
//   const center = { lat: 0, lng: 0 };
//   let maxLat = 0;
//   let maxLng = 0;
//   let minLat = 100;
//   let minLng = 1000;
//   positions.forEach((pos) => {
//     if (maxLat < pos.lat) {
//       maxLat = pos.lat;
//     }
//     if (maxLng < pos.lng) {
//       maxLng = pos.lng;
//     }
//     if (minLat > pos.lat) {
//       minLat = pos.lat;
//     }
//     if (minLng > pos.lng) {
//       minLng = pos.lng;
//     }
//   });
//   center.lat = (minLat + maxLat) / 2;
//   center.lng = (minLng + maxLng) / 2;
//   return center;
// };

const WalkMap = ({ positions, center }) => {
  return (
    <Map // 지도를 표시할 Container
      center={center}
      style={{
        // 지도의 크기
        width: "100%",
        height: "450px"
      }}
      // marker={positions}
      level={3} // 지도의 확대 레벨
    >
      <Polyline
        path={positions}
        strokeWeight={5} // 선의 두께입니다
        strokeColor="#db4040" // 선의 색깔입니다
        strokeOpacity={1} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
        strokeStyle="solid" // 선의 스타일입니다
      />
    </Map>
  );
};

export default WalkMap;
