/* eslint-disable jsx-a11y/label-has-associated-control */
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "axios";
import styles from "./create.module.scss";
import back from "../../public/icons/back.svg";
// import arrowRight from "../../public/icons/arrowRight.svg";
import addimg from "../../public/icons/addImg2.png";
import sendFileToIPFS, { getBalance } from "../api/web3/Web3";
import addFeed from "../api/memory/addFeed";
import NftModal from "../../components/common/NftModal";
import loading from "../../public/icons/loading.svg";
import MyLocation from "../../components/memory/MyLocation";

function Create() {
  const storeUser = useSelector((state: any) => state.user.userInfo);
  const storeLocation = useSelector(
    (state: any) => state.location.locationInfo
  );
  const [userKey, setUserKey] = useState("");
  const [flag, setFlag] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [uploadimg, setUploadimg] = useState<any>(null);
  const [nftFeed, setNftFeed] = useState({
    content: ""
  });

  const [apiFeed, setApiFeed] = useState<any>({
    content: "",
    feedImg: "",
    lat: "",
    lng: "",
    transactionHash: ""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);

  const router = useRouter();

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const getWalletBalance = async () => {
    const balance = await getBalance(storeUser.userWalletAddress);
    setWalletBalance(balance);
  };

  useEffect(() => {
    if (storeUser.userWalletAddress) {
      getWalletBalance();
    }
  }, []);
  useEffect(() => {
    if (storeLocation) {
      setApiFeed({
        ...apiFeed,
        lat: storeLocation.center.lat,
        lng: storeLocation.center.lng
      });
    }
  }, [storeLocation]);

  useEffect(() => {
    const Token = window.localStorage.getItem("AccessToken");

    axios({
      url: "https://dog-hoogam.site/api/user-service/user/wallet",
      method: "get",
      headers: { Authorization: `Bearer ${Token}` }
    })
      .then((res) => {
        if (res.status === 200) {
          setUserKey(res.data.userPersonalKey);
          return res.data;
        }
        return [];
      })
      .catch((err) => {
        console.log(err);
      });
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
  console.log(walletBalance);
  const makeNFT = async (e: any) => {
    if (walletBalance < 100) {
      alert("잉크가 모자랍니다. 산책으로 잉크를 모아주세요!");
    } else if (nftFeed.content === "") {
      alert("내용을 입력해주세요");
    } else if (window.confirm("100INK를 사용하여 피드를 작성하시겠습니까?")) {
      toggleModal();
      const feedNft = await sendFileToIPFS(
        e,
        imgFile,
        nftFeed,
        100,
        storeUser.userWalletAddress,
        userKey
      );
      console.log(feedNft[0], feedNft[1], "이미지, 트랜해쉬");
      setApiFeed({
        ...apiFeed,
        feedImg: feedNft[0],
        transactionHash: feedNft[1]
      });
      setFlag(true);
    }
  };

  useEffect(() => {
    if (flag) {
      addFeed(apiFeed, imgFile);
      router.push("/memory");
    }
  }, [flag, apiFeed]);

  // console.log(storeLocation, "스토어로케이션");
  console.log(apiFeed);
  return (
    <div className={`${styles.wrapper}`}>
      <NftModal isOpen={isModalOpen}>
        <Image src={loading} />
        <p className={`${styles.loadingFont} notoBold`}>NFT 발행 중입니다.</p>
      </NftModal>
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
            onClick={(e) => {
              makeNFT(e);
            }}
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
            onChange={(e) => {
              setNftFeed({ ...nftFeed, content: e.target.value });
              setApiFeed({ ...apiFeed, content: e.target.value });
            }}
          />
        </div>
      </div>
      <div className={`${styles.place} flex justify-start align-center`}>
        <h1 className={`${styles.space} fs-16 notoMid`}>
          추억 남길 위치를 지정해주세요!
        </h1>
      </div>
      <MyLocation />
    </div>
  );
}

export default Create;
