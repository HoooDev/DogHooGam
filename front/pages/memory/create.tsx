/* eslint-disable jsx-a11y/label-has-associated-control */
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "axios";
import styles from "./create.module.scss";
import back from "../../public/icons/back.svg";
import arrowRight from "../../public/icons/arrowRight.svg";
import addimg from "../../public/icons/addImg2.png";
import sendFileToIPFS from "../api/web3/Web3";
import addFeed from "../api/memory/addFeed";
import NftModal from "../../components/common/NftModal";
import loading from "../../public/icons/loading.svg";

function Create() {
  const storeUser = useSelector((state: any) => state.user.userInfo);
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
    lat: null,
    lng: null,
    transactionHash: ""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    const Token = window.localStorage.getItem("AccessToken");

    axios({
      url: "https://dog-hoogam.site:8000/api/user/wallet",
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

  const makeNFT = async (e: any) => {
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
  };

  useEffect(() => {
    if (flag) {
      addFeed(apiFeed);
      router.push("/memory");
    }
  }, [flag, apiFeed]);

  // console.log(apiFeed, "에이피아이피드");
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
              toggleModal();
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
