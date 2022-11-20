/* eslint-disable react/prop-types */
import { Polyline, Map } from "react-kakao-maps-sdk";

const WalkMap = ({ positions, center }) => {
  return (
    <Map
      center={center}
      style={{
        // 지도의 크기
        width: "100%",
        height: "450px"
      }}
      level={3}
    >
      <Polyline
        path={positions}
        strokeWeight={5}
        strokeColor="#db4040"
        strokeOpacity={1}
        strokeStyle="solid"
      />
    </Map>
  );
};

export default WalkMap;
