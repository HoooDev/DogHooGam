/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
// import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./[memoryPk].module.scss";
// import testimg from "../../public/images/test.png";
import getOneFeed from "../api/feed/getOneFeed";

function Detail() {
  const [feed, setFeed] = useState<any>({});
  const router = useRouter();
  const Id = router.query.memoryPk;

  useEffect(() => {
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

  return (
    <div className={`${styles.wrapper}`}>
      {/* <h1 className={`${styles.Nav} fs-20 notoBold`}>추억 남기기</h1> */}
      <div className={`${styles.detail}`}>
        <div className={`${styles.imgBox}`}>
          <img className={`${styles.img}`} src={feed.feedImg} alt="#" />
        </div>
        {/* <p>{feed.transactionHash}</p> */}

        <h1 className={`${styles.content} fs-20 notoBold`}>{feed.content}</h1>
        <h1 className={`${styles.time} fs-16 notoBold`}>{feed.createDate}</h1>
      </div>
    </div>
  );
}

export default Detail;
