import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSelectedDogs } from "../../redux/slice/walkSlice";

import { AppDispatch, RootState } from "../../redux/store";
import styles from "./DogSelectCard.module.scss";
import FootprintSvg from "./FootprintSvg";

const DogSelectCard = ({ id, name }: { id: number; name: string }) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { selectedDogs } = useSelector((state: RootState) => state.walk);
  const onDogSelectedClick = () => {
    dispatch(toggleSelectedDogs({ id, name }));
  };

  useEffect(() => {
    if (selectedDogs.find((dog) => dog.id === id)) {
      iconRef.current?.classList.add(`${styles.borderColor__MAIN}`);
    } else {
      iconRef.current?.classList.remove(`${styles.borderColor__MAIN}`);
    }
  }, [selectedDogs]);

  return (
    <div
      className={`${styles.wrapper} flex column justify-center align-center`}
      onClick={onDogSelectedClick}
      aria-hidden="true"
    >
      <div ref={iconRef} className={styles.dogSelectCard__icon}>
        <FootprintSvg fill="#d9d9d9" />
      </div>
      <div
        className={`${styles.dogSelectCard__name} flex justify-center fs-12`}
      >
        {name.length > 5 ? `${name.slice(0, 5)}..` : name}
      </div>
    </div>
  );
};

export default DogSelectCard;
