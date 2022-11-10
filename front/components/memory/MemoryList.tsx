/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import styles from "./MemoryList.module.scss";
import getFeed from "../../pages/api/feed/getFeed";

function MemoryList() {
  const [feeds, setFeeds] = useState<any>([]);
  useEffect(() => {
    getFeed()
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setFeeds(res.data);
        }
        return [];
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
