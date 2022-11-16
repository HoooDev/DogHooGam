/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import styles from "./MemoryList.module.scss";
import getFeed from "../../pages/api/feed/getFeed";
import { RootState } from "../../redux/store";

function MemoryList() {
  const [feeds, setFeeds] = useState<any>([]);
  const isLoading = useSelector((state: RootState) => state.calendar.isLoading);
  useEffect(() => {
    getFeed()
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          const memoryList = res.data;
          if (isLoading) {
            memoryList.push({
              content: "발행중입니다.",
              createDate: "2022-11-16 14:22",
              feedImg: "발행중",
              hide: false,
              lat: 35.2059392,
              lng: 126.81216,
              pk: 9999,
              transactionHash: "##"
            });
          }
          setFeeds(res.data.reverse());
        }
        return [];
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLoading]);

  // const dummys = [
  //   { id: 1 },
  //   { id: 2 },
  //   { id: 3 },
  //   { id: 4 },
  //   { id: 5 },
  //   { id: 6 },
  //   { id: 7 }
  // ];
  console.log(feeds);
  return (
    <div className={`${styles.wrapper}`}>
      {feeds.map((feed: { pk: any; feedId: any; feedImg: any }) => {
        if (feed.pk === 9999) {
          return (
            <div className={`${styles.item}`} key={v4()}>
              <div>
                <div
                  className={`${styles.imgBox} flex column justify-center align-center`}
                >
                  <h1 className="notoBold fs-14">새로운 피드를</h1>
                  <h1 className="notoBold fs-14">발행 중입니다.</h1>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className={`${styles.item}`} key={v4()}>
            <Link href={`/memory/${feed.pk}`}>
              <div className={`${styles.imgBox}`}>
                <img className={`${styles.img}`} src={feed.feedImg} alt="#" />
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default MemoryList;
