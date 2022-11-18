/* eslint-disable @next/next/no-img-element */
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useRouter } from "next/router";
// import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./[memoryPk].module.scss";
// import testimg from "../../public/images/test.png";
import getOneFeed from "../api/feed/getOneFeed";
import back from "../../public/icons/back.svg";

function Detail() {
  const [feed, setFeed] = useState<any>({});
  const router = useRouter();
  const Id = router.query.memoryPk;

  useEffect(() => {
    if (!Id) return;
    getOneFeed(Id)
      .then((res) => {
        if (res.status === 200) {
          setFeed(res.data);
          console.log(res.data);
        }
        return [];
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Id]);

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);

      // eslint-disable-next-line no-alert
      alert("트랜잭션이 복사 되었습니다.");
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert("복사에 실패했습니다.");
    }
  };

  return (
    <div className={`${styles.wrapper}`}>
      {/* <h1 className={`${styles.Nav} fs-20 notoBold`}>추억 남기기</h1> */}
      <div className={`${styles.detail}`}>
        <div className={`${styles.imgBox}`}>
          <div className="flex justify-space-between">
            <Link href="/memory">
              <div className={`${styles.backicon}`}>
                <Image src={back} alt="#" />
              </div>
            </Link>
            <button
              className={`${styles.copyBtn}`}
              type="button"
              onClick={() => handleCopyClipBoard(feed.transactionHash)}
            >
              트랜잭션 해쉬 복사
            </button>
          </div>
          <img className={`${styles.img}`} src={feed.feedImg} alt="#" />
        </div>

        {/* <p>{feed.transactionHash}</p> */}

        <h1 className={`${styles.content} fs-20 notoBold`}>{feed.content}</h1>
        <h1 className={`${styles.time} fs-16 notoBold`}>{feed.createDate}</h1>
      </div>
      {feed?.pk && (
        <div className={`${styles.map}`}>
          <Map // 지도를 표시할 Container
            center={{
              // 지도의 중심좌표
              lat: feed.lat,
              lng: feed.lng
            }}
            style={{
              // 지도의 크기
              width: "100%-vw(40px)",
              height: "350px"
            }}
            level={4} // 지도의 확대 레벨
          >
            <MapMarker // 마커를 생성합니다
              position={{
                // 마커가 표시될 위치입니다
                lat: feed.lat,
                lng: feed.lng
              }}
              image={{
                src: "https://lab.ssafy.com/s07-final/S07P31C103/uploads/b4c5e7861b0c4ecf37e46427200d1663/star.png", // 마커이미지의 주소입니다
                size: {
                  width: 34,
                  height: 34
                }, // 마커이미지의 크기입니다
                options: {
                  offset: {
                    x: 27,
                    y: 69
                  } // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                }
              }}
            />
          </Map>
        </div>
      )}
    </div>
  );
}

export default Detail;
