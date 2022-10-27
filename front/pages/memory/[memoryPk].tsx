import { useRouter } from "next/router";

import Image from "next/image";
import styles from "./[memoryPk].module.scss";
import testimg from "../../public/images/test.png";

function Detail() {
  const router = useRouter();
  const Id = Number(router.query.params);
  console.log(Id);

  const dummy = {
    id: Id,
    img: testimg,
    content: "테스트 문구입니다.",
    time: "2022년 10월 27일"
  };
  return (
    <div className={`${styles.wrapper}`}>
      <h1 className={`${styles.Nav} fs-20 notoBold`}>추억 남기기</h1>
      <div className={`${styles.detail}`}>
        <div className={`${styles.img}`}>
          <Image width="420px" height="300px" src={dummy.img} alt="#" />
        </div>

        <h1 className={`${styles.content} fs-22 notoBold`}>{dummy.content}</h1>
        <h1 className={`${styles.time} fs-16 notoBold`}>{dummy.time}</h1>
      </div>
    </div>
  );
}

export default Detail;
