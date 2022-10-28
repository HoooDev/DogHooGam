import Image from "next/image";
import styles from "./MyWallet.module.scss";
import walletLogo from "../../public/icons/walletLogo.png";
import addImg from "../../public/icons/addImg.svg";

function MyWallet() {
  const dummy = false;
  const walletAddress =
    "0xa06989ee6270d06b5f00e9a4b3374460276bf6e83edcbe432e4f509fcad061fe";
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
  return (
    <div className={`${styles.myWalletBox}`}>
      <div className={`${styles.walletIcon}`}>
        <Image src={walletLogo} />
      </div>
      {dummy ? (
        <div className={`${styles.walletTextBox}`}>
          <p className={`${styles.walletCoin}`}>보유코인 : 100 coin</p>
          <div className={`${styles.walletAddressBox}`}>
            <p className={`${styles.walletAddress1}`}>지갑주소 : </p>
            <p className={`${styles.walletAddress2}`}>
              0xa06989ee6270d06b5f00e9a4b3374460276bf6e83edcbe432e4f509fcad061fe
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
          <div className={`${styles.addWalletBtn}`}>
            <Image src={addImg} />
          </div>
          <p className={`${styles.addWalletBtnText}`}>지갑을 등록 해주세요!</p>
        </div>
      )}
    </div>
  );
}

export default MyWallet;
