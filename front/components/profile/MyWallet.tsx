import Image from "next/image";
// import axios from "axios";
// import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MyWallet.module.scss";
import walletLogo from "../../public/icons/walletLogo.png";
import addImg from "../../public/icons/addImg.svg";
// import { createAccount, getBalance } from "";
import { createAccount, getBalance } from "../../pages/api/web3/Web3";
import createWallet from "../../pages/api/user/createWallet";
// import NftModal from "../common/NftModal";
// import loading from "../../public/icons/loading.svg";
import { getInfo } from "../../redux/slice/userSlice";
import { setIsLoading } from "../../redux/slice/calendarSlice";
import { RootState } from "../../redux/store";
import Loading from "../../public/images/Spinner.gif";

function MyWallet() {
  // const router = useRouter();
  const dispatch = useDispatch();
  const storeUser = useSelector((state: any) => state.user.userInfo);
  // const dummy = false;
  const walletAddress = storeUser.userWalletAddress;
  const [walletBalance, setWalletBalance] = useState(0);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  const isLoading = useSelector((state: RootState) => state.calendar.isLoading);
  // const toggleModal = () => setIsModalOpen(!isModalOpen);

  const getWalletBalance = async () => {
    const balance = await getBalance(storeUser.userWalletAddress);
    setWalletBalance(balance);
  };
  useEffect(() => {
    if (storeUser.userWalletAddress) {
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

  useEffect(() => {
    if (flag) {
      // toggleModal();
      getWalletBalance();
    }
  }, [flag]);

  const createUserWallet = async () => {
    dispatch(setIsLoading(true));
    const Token = window.localStorage.getItem("AccessToken");
    const [userWalletAddress, userWalletKey] = await createAccount();
    console.log(userWalletAddress, userWalletKey);
    const getAxios = createWallet(userWalletAddress, userWalletKey);
    // router.push("/profile");
    getAxios
      .then((res) => {
        if (res.status === 200) {
          axios({
            url: `https://dog-hoogam.site:8000/api/user-service/user`,
            method: "get",
            headers: { Authorization: `Bearer ${Token}` }
          })
            .then((rres) => {
              if (rres.status === 200) {
                dispatch(getInfo(rres.data));
                // return res.data;
                console.log("토글");
                alert("지갑이 생성되었습니다.");
                dispatch(setIsLoading(false));
                // toggleModal();
                setFlag(true);
              }
              return [];
            })
            .catch((err) => {
              console.log(err);
            });
        }
        return [];
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={`${styles.myWalletBox}`}>
      {/* <NftModal isOpen={isModalOpen}>
        <Image src={loading} />
        <p className={`${styles.loadingFont} notoBold fs-20`}>
          지갑을 생성 중입니다.
        </p>
        <br />
        <p className={`${styles.loadingFont} notoMid fs-14`}>
          생성 시 지급되는 100 INK로
        </p>
        <p className={`${styles.loadingFont} notoMid fs-14`}>
          첫 피드를 작성해보세요!
        </p>
      </NftModal> */}
      <div className={`${styles.walletIcon}`}>
        <Image src={walletLogo} />
      </div>
      {storeUser.userWalletAddress ? (
        <div className={`${styles.walletTextBox}`}>
          <p
            className={`${styles.walletCoin} notoReg fs-18`}
          >{`보유코인 : ${walletBalance} INK`}</p>
          <div className={`${styles.walletAddressBox} notoReg fs-18`}>
            <p className={`${styles.walletAddress1}`}>지갑주소 : </p>
            <div>
              <p className={`${styles.walletAddress2} fs-12`}>
                {storeUser.userWalletAddress}
              </p>
              <button
                type="button"
                className={`${styles.copyBtn} fs-10`}
                onClick={() => handleCopyClipBoard(walletAddress)}
              >
                복사
              </button>
            </div>
          </div>
        </div>
      ) : (
        // <div className={`${styles.walletTextBox}`}>
        <div style={{ height: "100%" }}>
          {isLoading ? (
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
