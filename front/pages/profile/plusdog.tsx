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
  walletAddress: string;
}

function Plusdog() {
  const router = useRouter();
  const storeUser = useSelector((state: any) => state.user.userInfo);
  const walletRef = useRef<HTMLInputElement>(null);
  const [uploadimg, setUploadimg] = useState<any>(null);
  const [imgFile, setImgFile] = useState(null);
  const dispatch = useDispatch();
  const [nftDog, setNftDog] = useState<nftDogType>({
    dogName: "",
    dogNumber: "",
    dogBreed: "",
    birthday: "",
    dogCharacter: "",
    walletAddress: ""
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
    if (storeUser.userWalletAddress === "") {
      alert("지갑이 없습니다. 지갑을 생성 해주세요.");
      router.push("/profile");
    }
    if (storeUser.userWalletAddress && walletRef.current) {
      walletRef.current.value = storeUser.userWalletAddress;
      setNftDog({ ...nftDog, walletAddress: storeUser.userWalletAddress });
      // eslint-disable-next-line no-alert
      alert("지갑 주소를 불러왔습니다.");
    }
  };

  const makeNFT = async (e: any) => {
    if (nftDog.walletAddress === "") {
      alert("지갑 주소를 입력 해주세요!");
    } else if (nftDog.walletAddress.length !== 42) {
      alert("지갑 주소가 틀렸습니다. 다시입력해주세요");
    } else {
      try {
        dispatch(setIsDogProfile(true));
        router.push("/profile");
        const dogNft = await sendFileToIPFS(
          e,
          imgFile,
          nftDog,
          0,
          storeUser.userWalletAddress
        );

        await addDog(
          {
            ...apiDog,
            dogImg: dogNft[0],
            transactionHash: dogNft[1]
          },
          imgFile
        );
        alert("강아지가 등록되었습니다.");
        dispatch(setIsDogProfile(false));
      } catch (error) {
        console.error(error);
        dispatch(setIsDogProfile(false));
        alert("강아지가 등록이 실패했습니다.");
      }
    }
  };
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
            ref={walletRef}
            className={`${styles.dogInput} notoReg`}
            onChange={(e) => {
              setNftDog({ ...nftDog, walletAddress: e.target.value });
            }}
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
