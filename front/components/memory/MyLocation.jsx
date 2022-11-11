import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useDispatch } from "react-redux";
import { getLocation } from "../../redux/slice/locationSlice";

const MyLocation = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude; // 위도
          const lng = position.coords.longitude; // 경도
          setState({
            level: 3,
            center: {
              lat,
              lng
            }
          });
          setFlag(true);
        },
        () => console.error,
        {
          enableHighAccuracy: true
        }
      );
    }
  }, []);

  useEffect(() => {
    if (flag) {
      dispatch(getLocation(state));
    }
  }, [state]);

  return (
    <div>
      {!!state && (
        <Map // 지도를 표시할 Container
          center={state.center}
          style={{
            width: "100%",
            height: "450px"
          }}
          level={state.level} // 지도의 확대 레벨
          onCenterChanged={(map) =>
            setState({
              level: map.getLevel(),
              center: {
                lat: map.getCenter().getLat(),
                lng: map.getCenter().getLng()
              }
            })
          }
        >
          <MapMarker position={state.center} />
        </Map>
      )}
    </div>
  );
};

export default MyLocation;
