import { useRef, useState } from "react";
import axios from "axios";
import styles from "./chat.module.scss";
// import { getChatbot1 } from "./api/chat/chat";

function Chat() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [msg, setmsg] = useState<string>("");

  const startDate = new Date();
  const startday = `${startDate.getFullYear()}년 ${
    startDate.getMonth() + 1
  }월 ${startDate.getDate()}일`;

  function getNowTime() {
    const nowDate = new Date();
    let AMPM = "오전";
    let nowHours = nowDate.getHours();
    if (nowHours > 12) {
      nowHours -= 12;
      AMPM = "오후";
    }
    return `${AMPM} ${nowHours}시 ${nowDate.getMinutes()}분`;
  }

  const [chatbox, setChatbox] = useState([
    {
      id: 1,
      sender: "noti",
      content: startday,
      ICD: ""
    },
    {
      id: 2,
      sender: "you",
      content: "무엇을 도와드릴까요?",
      time: getNowTime(),
      ICD: ""
    }
  ]);

  function getSelectResult(e: any) {
    console.log(e);

    axios({
      url: `https://dog-hoogam.site/chatbot/indata`,
      method: "get",
      params: { data: e }
    })
      .then((res) => {
        if (res.data[0].symptom === "분류불가") {
          setChatbox((prev) => [
            ...prev,
            {
              id: Date.now(),
              sender: "you",
              content: "질문을 잘 이해하지 못했습니다. \n다시 질문해주세요!",
              time: getNowTime(),
              ICD: ""
            }
          ]);
        } else {
          setChatbox((prev) => [
            ...prev,
            {
              id: Date.now(),
              sender: "you",
              content: `현재 강아지는 ${res.data[0].symptom} 증상이 의심됩니다!`,
              time: getNowTime(),
              ICD: res.data[0].ICD
            }
          ]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function goMessage(e: any) {
    e.preventDefault();
    setChatbox((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "me",
        content: msg,
        time: getNowTime(),
        ICD: ""
      }
    ]);
    getSelectResult(msg);

    if (textareaRef.current) {
      textareaRef.current.value = "";
      setmsg("");
    }
  }

  function checkEnter(e: any) {
    if (e.key === "Enter") {
      goMessage(e);
    }
  }

  return (
    <div className={`${styles.wrapper}`}>
      {chatbox.map((message) => {
        if (message.sender === "you") {
          const ICDlist = message.ICD;
          console.log(ICDlist);
          return (
            <div
              className={`${styles.botmessage} flex align-center`}
              key={message.id}
            >
              <h1 className={`${styles.text} notoMid fs-14`}>
                {message.content}
                {ICDlist.length > 2 ? (
                  <div>
                    <h1>더 자세한 내용을 알고 싶으면 항목을 선택해주세요!</h1>
                    {ICDlist}

                    {/* {ICDlist.map((item) => {
                      console.log(item);
                      return <div key={item}>테스트</div>;
                    })} */}
                  </div>
                ) : null}
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
          onKeyUp={(e) => checkEnter(e)}
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
