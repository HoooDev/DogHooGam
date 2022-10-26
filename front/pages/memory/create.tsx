/* eslint-disable jsx-a11y/label-has-associated-control */
import Image from "next/image";
import styles from "./create.module.scss";
import back from "../../public/icons/back.svg";
import arrowRight from "../../public/icons/arrowRight.svg";

function create() {
  return (
    <div className={`${styles.wrapper}`}>
      <div>
        <div className={`${styles.memoryNav} flex justify-space-between`}>
          <button className={`${styles.backbutton}`} type="button">
            <Image src={back} alt="#" />
          </button>
          <button
            className={`${styles.createbutton} notoMid fs-16`}
            type="button"
          >
            발행하기
          </button>
        </div>
        <div className={`${styles.inputForm} flex justify-space-around`}>
          <input
            className={`${styles.image}`}
            id="uploadimg"
            type="file"
            accept="image/gif, image/jpeg, image/png"
            hidden
          />
          <label className={`${styles.image}`} htmlFor="uploadimg">
            이미지 업로드
          </label>
          <textarea
            className={`${styles.text} fs-20 notoMid`}
            placeholder="문구 입력..."
          />
        </div>
      </div>
      <div className={`${styles.place} flex justify-space-around align-center`}>
        <h1 className={`${styles.space} fs-16 notoMid`}>위치</h1>
        <div className={`${styles.btn} flex justify-end`}>
          <button className={`${styles.button}`} type="button">
            <Image src={arrowRight} alt="#" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default create;
