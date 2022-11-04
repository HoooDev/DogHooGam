/* eslint-disable jsx-a11y/label-has-associated-control */
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./create.module.scss";
import back from "../../public/icons/back.svg";
import arrowRight from "../../public/icons/arrowRight.svg";
import addimg from "../../public/icons/addImg2.png";
import sendFileToIPFS from "../api/web3/Web3";
import addFeed from "../api/memory/addFeed";

function Create() {
  const [flag, setFlag] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [uploadimg, setUploadimg] = useState<any>(null);
  // const [nftImg, setNftImg] = useState<any>(null);
  // const [tranHash, setTranHash] = useState<any>(null);
  const [nftFeed, setNftFeed] = useState({
    content: ""
    // dogPk: null,
    // dogName: ""
  });
  const [apiFeed, setApiFeed] = useState<any>({
    content: "",
    dogPk: 16,
    feedImg: "",
    lat: null,
    lng: null,
    transactionHash: ""
  });
  const router = useRouter();

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
    const feedNft = await sendFileToIPFS(e, imgFile, nftFeed);
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
    }
  }, [flag, apiFeed]);

  // console.log(apiFeed, "에이피아이피드");
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
