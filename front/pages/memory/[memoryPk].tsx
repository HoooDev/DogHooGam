/* eslint-disable @next/next/no-img-element */
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./[memoryPk].module.scss";
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
        <h1 className={`${styles.content} fs-20 notoBold`}>{feed.content}</h1>
        <h1 className={`${styles.time} fs-16 notoBold`}>{feed.createDate}</h1>
      </div>
      {feed?.pk && (
        <div className={`${styles.map}`}>
          <Map
            center={{
              lat: feed.lat,
              lng: feed.lng
            }}
            style={{
              width: "100%-vw(40px)",
              height: "350px"
            }}
            level={4}
          >
            <MapMarker
              position={{
                lat: feed.lat,
                lng: feed.lng
              }}
              image={{
                src: "https://lab.ssafy.com/s07-final/S07P31C103/uploads/b4c5e7861b0c4ecf37e46427200d1663/star.png",
                size: {
                  width: 34,
                  height: 34
                },
                options: {
                  offset: {
                    x: 27,
                    y: 69
                  }
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
