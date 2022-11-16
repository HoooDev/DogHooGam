/* eslint-disable react/self-closing-comp */
import styles from "./DogImage.module.scss";

const DogImage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.dog}>
        <div className={`${styles.heart} ${styles.heart__1}`}></div>
        <div className={`${styles.heart} ${styles.heart__2}`}></div>
        <div className={`${styles.heart} ${styles.heart__3}`}></div>
        <div className={`${styles.heart} ${styles.heart__4}`}></div>
        <div className={styles.head}>
          <div className={`${styles.year} ${styles.year__left}`}></div>
          <div className={`${styles.year} ${styles.year__right}`}></div>
          <div className={styles.nose}></div>
          <div className={styles.face}>
            <div className={`${styles.eye} ${styles.eye__left}`}></div>
            <div className={`${styles.eye} ${styles.eye__right}`}></div>
            <div className={styles.mouth}></div>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.cheast}></div>
          <div className={styles.back}></div>
          <div className={styles.legs}>
            <div
              className={`${styles.legs__front} ${styles.legs__front__left}`}
            ></div>
            <div
              className={`${styles.legs__front} ${styles.legs__front__right}`}
            ></div>
            <div
              className={`${styles.legs__back} ${styles.legs__back__left}`}
            ></div>
            <div
              className={`${styles.legs__back} ${styles.legs__back__right}`}
            ></div>
          </div>
          <div className={styles.tail}></div>
        </div>
      </div>
    </div>
  );
};

export default DogImage;
