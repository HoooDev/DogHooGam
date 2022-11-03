import { useRef, useState } from "react";
import axios from "axios";
import styles from "./chat.module.scss";

function Chat() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [msg, setmsg] = useState<string>("");

  const startDate = new Date();
  let startAMPM = "오전";
  let startHours = startDate.getHours();
  if (startHours > 12) {
    startHours -= 12;
    startAMPM = "오후";
  }

  const startday = `${startDate.getFullYear()}년 ${
    startDate.getMonth() + 1
  }월 ${startDate.getDate()}일`;
  const starttime = `${startAMPM} ${startHours}시 ${startDate.getMinutes()}분`;
  const [chatbox, setChatbox] = useState([
    {
      id: 1,
      sender: "noti",
      content: startday
    },
    { id: 2, sender: "you", content: "무엇을 도와드릴까요?", time: starttime }
  ]);

  function getSelectResult(e: any) {
    console.log(e);
    axios({
      url: `https://dog-hoogam.site/chatbot/indata/`,
      method: "get",
      data: { data: e }
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function goMessage(e: any) {
    e.preventDefault();
    console.log(msg);
    const nowDate = new Date();
    let AMPM = "오전";
    let nowHours = nowDate.getHours();
    if (nowHours > 12) {
      nowHours -= 12;
      AMPM = "오후";
    }
    const nowTime = `${AMPM} ${nowHours}시 ${nowDate.getMinutes()}분`;
    console.log(nowTime);
    const newChatbox = [...chatbox];
    newChatbox.push({
      id: chatbox.length + 1,
      sender: "me",
      content: msg,
      time: nowTime
    });
    setChatbox(newChatbox);
    getSelectResult(msg);
    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
  }

  return (
    <div className={`${styles.wrapper}`}>
      {chatbox.map((message) => {
        if (message.sender === "you") {
          return (
            <div
              className={`${styles.botmessage} flex align-center`}
              key={message.id}
            >
              <h1 className={`${styles.text} notoMid fs-14`}>
                {message.content}
              </h1>
              <h1 className={`${styles.time} fs-10 notoReg`}>{message.time}</h1>
            </div>
          );
        }
        if (message.sender === "me") {
          return (
            <div
              className={`${styles.mymessage} flex align-center`}
              key={message.id}
            >
              <h1 className={`${styles.text} notoMid fs-14`}>
                {message.content}
              </h1>
              <h1 className={`${styles.time} fs-10 notoReg`}>{message.time}</h1>
            </div>
          );
        }
        return (
          <div
            className={`${styles.notimessage} flex align-center justify-center`}
            key={message.id}
          >
            <h1 className={`${styles.text} notoMid fs-10`}>
              {message.content}
            </h1>
            <h1 className={`${styles.time} fs-10 notoReg`}>{message.time}</h1>
          </div>
        );
      })}
      <div className={`${styles.inputForm} flex`}>
        <textarea
          ref={textareaRef}
          className={`${styles.input} notoMid fs-12`}
          placeholder="질문을 입력해주세요."
          id="chatInput"
          onChange={(e) => setmsg(e.target.value)}
        />
        <button
          className={`${styles.button}`}
          onClick={(e) => goMessage(e)}
          type="button"
        >
          전송
        </button>
      </div>
    </div>
  );
}

export default Chat;
