/* eslint-disable react/prop-types */
/* eslint-disable no-bitwise */
const DistanceInfo = ({ distance }) => {
  const walkkTime = (distance / 67) | 0;
  const bycicleTime = (distance / 227) | 0;

  return (
    <ul className="dotOverlay distanceInfo">
      <li>
        <span className="label">총거리</span>{" "}
        <span className="number">{distance}</span>m
      </li>
      <li>
        <span className="label">도보</span>{" "}
        {walkkTime > 60 && (
          <>
            <span className="number">{Math.floor(walkkTime / 60)}</span> 시간{" "}
          </>
        )}
        <span className="number">{walkkTime % 60}</span> 분
      </li>
      <li>
        <span className="label">자전거</span>{" "}
        {bycicleTime > 60 && (
          <>
            <span className="number">{Math.floor(bycicleTime / 60)}</span> 시간{" "}
          </>
        )}
        <span className="number">{bycicleTime % 60}</span> 분
      </li>
    </ul>
  );
};

export default DistanceInfo;
