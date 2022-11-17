/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "./plusdog.module.scss";
import defaultDog from "../../public/icons/defaultDog.svg";
import sendFileToIPFS from "../api/web3/Web3";
import addDog from "../api/dog/addDog";

import { setIsDogProfile } from "../../redux/slice/calendarSlice";

export interface nftDogType {
  dogName: string;
  dogNumber: string;
  dogBreed: string;
  birthday: string;
  dogCharacter: string;
}

function Plusdog() {
  const router = useRouter();
  const storeUser = useSelector((state: any) => state.user.userInfo);
  const walletRef = useRef<HTMLInputElement>(null);
  const walletAddress =
    "0xa06989ee6270d06b5f00e9a4b3374460276bf6e83edcbe432e4f509fcad061fe";
  const [uploadimg, setUploadimg] = useState<any>(null);
  const [imgFile, setImgFile] = useState(null);
  const dispatch = useDispatch();
  const [nftDog, setNftDog] = useState<nftDogType>({
    dogName: "",
    dogNumber: "",
    dogBreed: "",
    birthday: "",
    dogCharacter: ""
  });
  const [apiDog, setApiDog] = useState<any>({
    birthday: "",
    dogBreed: "",
    dogCharacter: "",
    dogImg: "",
    dogName: "",
    transactionHash: "",
    dogNumber: ""
  });

  function handleImageUpload(e: any) {
    const fileArr = e.target.files;
    setImgFile(e.target.files[0]);
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
  // const addDogInfo = () => {
  //   addDog(apiDog);
  // };

  const makeNFT = async (e: any) => {
    dispatch(setIsDogProfile(true));
    router.push("/profile");
    const dogNft = await sendFileToIPFS(
      e,
      imgFile,
      nftDog,
      0,
      storeUser.userWalletAddress
    );
    console.log(dogNft[0], dogNft[1], "이미지, 트랜해쉬");

    addDog({
      ...apiDog,
      dogImg: dogNft[0],
      transactionHash: dogNft[1]
    })
      .then((res) => {
        if (res.status === 200) {
          alert("강아지가 등록되었습니다.");
          dispatch(setIsDogProfile(false));
        }
      })
      .catch((err) => {
        console.log(err);
        alert("강아지가 등록이 실패했습니다.");
        dispatch(setIsDogProfile(false));
      });
  };
  // console.log(nftDog);
  return (
    <div className={`${styles.plusDog}`}>
      <form
        onSubmit={(e: any) => {
          makeNFT(e);
        }}
      >
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
                  <img
                    className={`${styles.dogImg} `}
                    src={uploadimg}
                    alt="#"
                  />
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
            maxLength={6}
            onChange={(e) => {
              setNftDog({ ...nftDog, dogName: e.target.value });
              setApiDog({ ...apiDog, dogName: e.target.value });
            }}
          />{" "}
          <hr />
          <p className={`${styles.dogInputTitle}`}>등록번호</p>
          <input
            type="number"
            className={`${styles.dogInput} notoReg`}
            onChange={(e) => {
              setNftDog({ ...nftDog, dogNumber: e.target.value });
              setApiDog({ ...apiDog, dogNumber: e.target.value });
            }}
          />{" "}
          <hr />
          <p className={`${styles.dogInputTitle}`}>견종</p>
          <input
            type="text"
            className={`${styles.dogInput} notoReg`}
            maxLength={10}
            onChange={(e) => {
              setNftDog({ ...nftDog, dogBreed: e.target.value });
              setApiDog({ ...apiDog, dogBreed: e.target.value });
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
                setNftDog({ ...nftDog, birthday: e.target.value });
                setApiDog({ ...apiDog, birthday: e.target.value });
              }}
            />
            <hr />
          </div>
          <p className={`${styles.dogInputTitle}`}>성격</p>
          <input
            type="text"
            className={`${styles.dogInput} notoReg`}
            maxLength={10}
            onChange={(e) => {
              setNftDog({ ...nftDog, dogCharacter: e.target.value });
              setApiDog({ ...apiDog, dogCharacter: e.target.value });
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
          <button type="submit" className={`${styles.AddBtn}`}>
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default Plusdog;
