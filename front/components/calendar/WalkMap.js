import { StaticMap } from "react-kakao-maps-sdk";

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

const WalkMap = (positions, center) => {
  return (
    <StaticMap // 지도를 표시할 Container
      center={center}
      style={{
        // 지도의 크기
        width: "100%",
        height: "450px"
      }}
      marker={positions}
      level={3} // 지도의 확대 레벨
    />
  );
};

export default WalkMap;
