import styles from "./DogSelectCard.module.scss";
import FootprintSvg from "./FootprintSvg";

const DogSelectCard = ({ name }: { name: string }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.dogSelectCard__icon}>
        <FootprintSvg fill="#d9d9d9" />
      </div>
      <div
        className={`${styles.dogSelectCard__name} flex justify-center fs-14`}
      >
        {name}
      </div>
    </div>
  );
};

export default DogSelectCard;
