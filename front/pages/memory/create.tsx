/* eslint-disable jsx-a11y/label-has-associated-control */
import Image from "next/image";
import { useState } from "react";
import Router, { useRouter } from "next/router";
import styles from "./create.module.scss";
import back from "../../public/icons/back.svg";
import arrowRight from "../../public/icons/arrowRight.svg";
import addimg from "../../public/icons/addImg.png";

function Create() {
  const [uploadimg, setUploadimg] = useState<any>(null);

  const router = useRouter();

  function handleImageUpload(e: any) {
    const fileArr = e.target.files;
    console.log(fileArr);
    const file = fileArr[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setUploadimg(reader.result);
    };
  }

  return (
    <div className={`${styles.wrapper}`}>
      <div>
        <div className={`${styles.memoryNav} flex justify-space-between`}>
          <button
            className={`${styles.backbutton}`}
            onClick={() => router.back()}
            type="button"
          >
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
            onChange={(e) => handleImageUpload(e)}
            id="uploadimg"
            type="file"
            accept="image/gif, image/jpeg, image/png"
            hidden
          />
          <label className={`${styles.image}`} htmlFor="uploadimg">
            {uploadimg ? (
              <img className={`${styles.preview}`} src={uploadimg} alt="#" />
            ) : (
              <div
                className={`${styles.noimg} flex justify-center align-center`}
              >
                <Image src={addimg} alt="#" />
              </div>
            )}
          </label>
          <textarea
            className={`${styles.text} fs-16 notoMid`}
            placeholder="문구 입력..."
          />
        </div>
      </div>
      <div className={`${styles.place} flex justify-space-around align-center`}>
        <h1 className={`${styles.space} fs-16 notoMid`}>위치</h1>
        <div className={`${styles.btn} flex justify-end align-center`}>
          <button
            className={`${styles.button} flex justify-end align-center`}
            type="button"
          >
            <Image src={arrowRight} alt="#" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Create;
