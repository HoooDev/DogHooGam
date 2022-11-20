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
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
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
        <Map
          center={state.center}
          style={{
            width: "100%",
            height: "450px"
          }}
          level={state.level}
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
