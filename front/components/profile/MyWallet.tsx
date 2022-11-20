/* eslint-disable jsx-a11y/no-static-element-interactions */
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MyWallet.module.scss";
import walletLogo from "../../public/icons/walletLogo.png";
import addImg from "../../public/icons/addImg.svg";
import { createAccount, getBalance } from "../../pages/api/web3/Web3";
import createWallet from "../../pages/api/user/createWallet";
import { getInfo } from "../../redux/slice/userSlice";
import { setIsWallet } from "../../redux/slice/calendarSlice";
import { RootState } from "../../redux/store";
import Loading from "../../public/images/Spinner.gif";
import copy from "../../public/icons/copy.svg";

function MyWallet() {
  const dispatch = useDispatch();
  const storeUser = useSelector((state: any) => state.user.userInfo);
  const walletAddress = storeUser.userWalletAddress;
  const [walletBalance, setWalletBalance] = useState(0);
  const [flag, setFlag] = useState(false);
  const isWallet = useSelector((state: RootState) => state.calendar.isWallet);
  const [walletHash, setWalletHash] = useState<string>("");
  const getWalletBalance = async () => {
    const balance = await getBalance(storeUser.userWalletAddress);
    setWalletBalance(balance);
  };
  useEffect(() => {
    if (storeUser.userWalletAddress) {
      getWalletBalance();
      setWalletHash(`${storeUser.userWalletAddress.slice(0, 13)}...`);
    }
  }, [storeUser]);

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("지갑 주소가 복사 되었습니다.");
    } catch (error) {
      alert("복사에 실패했습니다.");
    }
  };

  useEffect(() => {
    if (flag) {
      getWalletBalance();
    }
  }, [flag]);

  const createUserWallet = async () => {
    try {
      dispatch(setIsWallet(true));
      const Token = window.localStorage.getItem("AccessToken");
      const [userWalletAddress, userWalletKey] = await createAccount();
      const getAxios = createWallet(userWalletAddress, userWalletKey);
      await getAxios;
      const res = await axios({
        url: `https://dog-hoogam.site:8000/api/user-service/user`,
        method: "get",
        headers: { Authorization: `Bearer ${Token}` }
      });
      setFlag(true);
      dispatch(getInfo(res.data));
      dispatch(setIsWallet(false));
      alert("지갑 생성 성공했습니다.");
    } catch (error) {
      console.log(error);
      dispatch(setIsWallet(false));
      alert("지갑 생성 실패했습니다.");
    }
  };

  const onClickHash = () => {
    setWalletHash(storeUser.userWalletAddress);
  };

  return (
    <div className={`${styles.myWalletBox}`}>
      <div className={`${styles.walletIcon}`}>
        <Image src={walletLogo} />
      </div>
      {storeUser.userWalletAddress ? (
        <div className={`${styles.walletTextBox}`}>
          <p
            className={`${styles.walletCoin} notoReg fs-16`}
          >{`보유코인 : ${walletBalance
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} INK`}</p>
          <div className={`${styles.walletAddressBox} flex notoReg fs-16`}>
            <div className={`${styles.walletAddress1}`}>지갑주소 : </div>
            <div
              className={`${styles.walletAddress2} fs-16`}
              onClick={onClickHash}
            >
              {walletHash}
            </div>
            <div
              className={`${styles.copyBtn} fs-10`}
              onClick={() => handleCopyClipBoard(walletAddress)}
            >
              <Image src={copy} alt="copy" />
            </div>
          </div>
        </div>
      ) : (
        <div style={{ height: "100%" }}>
          {isWallet ? (
            <div
              className={`${styles.Loading} flex column justify-center align-center`}
            >
              <div className={`${styles.img} `}>
                <Image src={Loading} alt="#" />
              </div>
              <h1 className="notoMid fs-18">지갑이 생성 중입니다...</h1>
            </div>
          ) : (
            <button
              type="button"
              className={`${styles.addWalletBtnBox}`}
              onClick={createUserWallet}
            >
              <div className={`${styles.addWalletBtn}`}>
                <Image src={addImg} />
              </div>
              <p className={`${styles.addWalletBtnText}`}>
                지갑을 등록 해주세요!
              </p>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default MyWallet;
