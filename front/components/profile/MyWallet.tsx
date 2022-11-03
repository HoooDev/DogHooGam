import Image from "next/image";
// import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "./MyWallet.module.scss";
import walletLogo from "../../public/icons/walletLogo.png";
import addImg from "../../public/icons/addImg.svg";
import { createAccount, getBalance } from "../../pages/api/web3/Web3";
import createWallet from "../../pages/api/user/createWallet";

function MyWallet() {
  const storeUser = useSelector((state: any) => state.user.userInfo);
  // const dummy = false;
  const walletAddress = storeUser.userWallerAddress;
  const [walletBalance, setWalletBalance] = useState(0);

  const getWalletBalance = async () => {
    const balance = await getBalance(walletAddress);
    setWalletBalance(balance);
  };
  useEffect(() => {
    if (storeUser) {
      getWalletBalance();
    }
  }, []);

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);

      // eslint-disable-next-line no-alert
      alert("지갑 주소가 복사 되었습니다.");
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert("복사에 실패했습니다.");
    }
  };

  const createUserWallet = async () => {
    const [userWalletAddress, userWalletKey] = await createAccount();
    console.log(userWalletAddress, userWalletKey);
    createWallet(userWalletAddress, userWalletKey);
  };

  return (
    <div className={`${styles.myWalletBox}`}>
      <div className={`${styles.walletIcon}`}>
        <Image src={walletLogo} />
      </div>
      {storeUser.userWallerAddress ? (
        <div className={`${styles.walletTextBox}`}>
          <p
            className={`${styles.walletCoin}`}
          >{`보유코인 : ${walletBalance} INK`}</p>
          <div className={`${styles.walletAddressBox}`}>
            <p className={`${styles.walletAddress1}`}>지갑주소 : </p>
            <p className={`${styles.walletAddress2}`}>
              {storeUser.userWallerAddress}
              <button
                type="button"
                className={`${styles.copyBtn}`}
                onClick={() => handleCopyClipBoard(walletAddress)}
              >
                복사
              </button>
            </p>
          </div>
        </div>
      ) : (
        // <div className={`${styles.walletTextBox}`}>
        <div>
          <button
            type="button"
            className={`${styles.addWalletBtnBox}`}
            onClick={() => {
              createUserWallet();
            }}
          >
            <div className={`${styles.addWalletBtn}`}>
              <Image src={addImg} />
            </div>
            <p className={`${styles.addWalletBtnText}`}>
              지갑을 등록 해주세요!
            </p>
          </button>
        </div>
      )}
    </div>
  );
}

export default MyWallet;
