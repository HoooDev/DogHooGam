import Image from "next/image";
import styles from "./MyWallet.module.scss";
import walletLogo from "../../public/icons/walletLogo.png";

function MyWallet() {
  return (
    <div className={`${styles.myWalletBox}`}>
      <div className={`${styles.walletIcon}`}>
        <Image src={walletLogo} />
      </div>
    </div>
  );
}

export default MyWallet;
