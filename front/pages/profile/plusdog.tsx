/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./plusdog.module.scss";
import dogDummy from "../../public/icons/dogDummy.jpg";
import defaultDog from "../../public/icons/defaultDog.svg";

function Plusdog() {
  const walletRef = useRef<HTMLInputElement>(null);
  const walletAddress =
    "0xa06989ee6270d06b5f00e9a4b3374460276bf6e83edcbe432e4f509fcad061fe";
  const [uploadimg, setUploadimg] = useState<any>(null);
  const [nftDog, setNftDog] = useState({
    dogName: "",
    dogNumber: "",
    dogSpecies: "",
    dogBirth: "",
    dogChar: ""
  });

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

  const getWalletAdd = () => {
    if (walletRef.current) {
      walletRef.current.value = walletAddress;
      // eslint-disable-next-line no-alert
      alert("지갑 주소를 불러왔습니다.");
    }
  };

  function maxLengthChk(object: any) {
    setNftDog({ ...nftDog, dogBirth: `${object.value}년` });

    if (object.value.length > object.maxLength) {
      // eslint-disable-next-line no-param-reassign
      object.value = object.value.slice(0, object.maxLength);
    }
  }
  console.log(nftDog);
  return (
    <div className={`${styles.plusDog}`}>
      <div className={`${styles.dogProfileBox}`}>
        <div className={`${styles.dogImgBox}`}>
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
              <div className={`${styles.dogImg} `}>
                <img className={`${styles.dogImg} `} src={uploadimg} alt="#" />
              </div>
            ) : (
              <div className={`${styles.dogImg}`}>
                <Image src={defaultDog} />
              </div>
            )}
            {/* <div className={`${styles.dogImg}`}>
              <Image src={dogDummy} />
            </div> */}
          </label>
        </div>
        <p className={`${styles.dogProfileTitle}  notoBold`}>강아지 프로필</p>
      </div>
      <div className={`${styles.dogInputForm} notoMid`}>
        <p className={`${styles.dogInputTitle}`}>강아지 이름</p>
        <input
          type="text"
          className={`${styles.dogInput} notoReg`}
          onChange={(e) => {
            setNftDog({ ...nftDog, dogName: e.target.value });
          }}
        />{" "}
        <hr />
        <p className={`${styles.dogInputTitle}`}>등록번호</p>
        <input
          type="number"
          className={`${styles.dogInput} notoReg`}
          onChange={(e) => {
            setNftDog({ ...nftDog, dogNumber: e.target.value });
          }}
        />{" "}
        <hr />
        <p className={`${styles.dogInputTitle}`}>견종</p>
        <input
          type="text"
          className={`${styles.dogInput} notoReg`}
          onChange={(e) => {
            setNftDog({ ...nftDog, dogSpecies: e.target.value });
          }}
        />{" "}
        <hr />
        <p className={`${styles.dogInputTitle}`}>생년월일</p>
        <div className={`${styles.dogBirthInputForm} notoReg`}>
          <input
            type="date"
            placeholder="연도 ex) 2022"
            maxLength={4}
            className={`${styles.dogBirthInput} notoReg`}
            onChange={(e) => {
              setNftDog({ ...nftDog, dogBirth: e.target.value });
            }}
          />
          <hr />
        </div>
        <p className={`${styles.dogInputTitle}`}>성격</p>
        <input
          type="text"
          className={`${styles.dogInput} notoReg`}
          onChange={(e) => {
            setNftDog({ ...nftDog, dogChar: e.target.value });
          }}
        />{" "}
        <hr />
        <div className={`${styles.walletTitleBox}`}>
          <p className={`${styles.dogInputTitle}`}>지갑주소</p>
          <button
            type="button"
            className={`${styles.walletAdd}`}
            onClick={() => {
              getWalletAdd();
            }}
          >
            불러오기
          </button>
        </div>
        <input
          type="text"
          // name="walletAdd"
          ref={walletRef}
          className={`${styles.dogInput} notoReg`}
        />
        <hr />
      </div>
      <div className="flex justify-center">
        <button type="button" className={`${styles.AddBtn}`}>
          등록하기
        </button>
      </div>
    </div>
  );
}

export default Plusdog;
