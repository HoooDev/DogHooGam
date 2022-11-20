import React, { useRef } from "react";

import styles from "./NftModal.module.scss";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const NftModal: React.FunctionComponent<ModalProps> = ({
  children,
  isOpen
}) => {
  const overlayRef = useRef(null);

  if (!isOpen) {
    return null;
  }
  return (
    <div className={`${styles.modal} flex align-center justify-center`}>
      <div
        className={styles.modal__overlay}
        ref={overlayRef}
        aria-hidden="true"
      />
      <div className={`${styles.modal__box} flex column`}>
        <div className={`${styles.children}`}>{children}</div>
      </div>
    </div>
  );
};

export default NftModal;
