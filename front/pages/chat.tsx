import styles from "./chat.module.scss";

function chat() {
  const dummy: Array<any> = [
    { id: 1, sender: "you", content: "무엇을 도와드릴까요?", time: "11시30분" },
    { id: 2, sender: "me", content: "강아지가 아파요", time: "11시31분" }
  ];
  console.log(dummy);
  return (
    <div className={`${styles.wrapper}`}>
      {dummy.map((message) => {
        console.log(message);
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
      })}
      <div className={`${styles.inputForm}`}>
        <input className={`${styles.input}`} type="text" />
        <button className={`${styles.button}`} type="button">
          전송
        </button>
      </div>
    </div>
  );
}

export default chat;
