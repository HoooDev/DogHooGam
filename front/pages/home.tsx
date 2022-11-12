import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import styles from "./home.module.scss";
import MainCalendar from "../components/home/MainCalendar";
import MainWalk from "../components/home/MainWalk";
import MainMemory from "../components/home/MainMemory";
import MainChatbot from "../components/home/MainChatbot";
import { getInfo } from "../redux/slice/userSlice";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    const Token = window.localStorage.getItem("AccessToken");
    // console.log(Token);

    axios({
      url: `https://dog-hoogam.site:8000/api/user`,
      method: "get",
      headers: { Authorization: `Bearer ${Token}` }
    })
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data);
          dispatch(getInfo(res.data));
          // return res.data;
        }
        return [];
      })
      .catch((err) => {
        console.log(err);
      });

    axios({
      url: `https://dog-hoogam.site:8000/api/memo/today`,
      method: "get",
      headers: { Authorization: `Bearer ${Token}` }
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={`${styles.wrapper}`}>
      <MainCalendar />
      <div
        className={`${styles.mainTab} flex column align-center justify-center`}
      >
        <MainWalk />
        <MainMemory />
        <MainChatbot />
      </div>
    </div>
  );
}

export default Home;
