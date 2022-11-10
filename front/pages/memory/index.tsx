// import Link from "next/link";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import getFeed from "../api/feed/getFeed";
// import axios from "axios";
import styles from "./index.module.scss";
// import createlogo from "../../public/icons/create.svg";
import MemoryList from "../../components/memory/MemoryList";

function Index() {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.memoryNav} flex justify-space-between`} />
      <MemoryList />
    </div>
  );
}

export default Index;
