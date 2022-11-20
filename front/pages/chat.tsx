import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

import ResultSlider from "../components/chat/ResultSlider";

import styles from "./chat.module.scss";
import yellowBell from "../public/icons/yellowBell.svg";
import orangeBell from "../public/icons/orangeBell.svg";
import redBell from "../public/icons/redBell.svg";
import chatbotDog from "../public/images/chatbotDog.svg";

function Chat() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [msg, setmsg] = useState<string>("");
  const dangerLevel = [0, yellowBell, orangeBell, redBell];
  const startDate = new Date();
  const startday = `${startDate.getFullYear()}년 ${
    startDate.getMonth() + 1
  }월 ${startDate.getDate()}일`;

  function getNowTime() {
    const nowDate = new Date();
    let AMPM = "오전";
    let nowHours = nowDate.getHours();
    let nowMinutes;
    if (nowDate.getMinutes() < 10) {
      nowMinutes = `0${nowDate.getMinutes()}`;
    } else {
      nowMinutes = nowDate.getMinutes();
    }
    if (nowHours > 12) {
      nowHours -= 12;
      AMPM = "오후";
    }
    return `${AMPM} ${nowHours}:${nowMinutes}`;
  }

  const [chatbox, setChatbox] = useState([
    {
      id: 1,
      sender: "noti",
      content: startday,
      ICD: [],
      symtptom: "",
      disease: [],
      symptomexplane: [],
      symptomdata: [],
      symptomprevent: [],
      symptomdanger: []
    },
    {
      id: 2,
      sender: "you",
      content:
        "현재 강아지 상태를 입력해보세요! \n \n관련된 질병정보를 알려드릴게요. \n \n(ex. 강아지가 열이나요)",
      time: getNowTime(),
      ICD: [],
      symtptom: "",
      disease: [],
      symptomexplane: [],
      symptomdata: [],
      symptomprevent: [],
      symptomdanger: []
    }
  ]);

  const scrollRef = useRef<any>();
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, [chatbox]);

  function getSelectResult(e: any) {
    axios({
      url: `https://dog-hoogam.site/chatbot/indata`,
      method: "get",
      params: { data: e }
    })
      .then((res) => {
        if (res.data.length === 1 && res.data[0].symptom === "분류불가") {
          setChatbox((prev) => [
            ...prev,
            {
              id: Date.now(),
              sender: "you",
              content: "질문을 잘 이해하지 못했습니다. \n다시 질문해주세요!",
              time: getNowTime(),
              ICD: [],
              symtptom: "",
              disease: [],
              symptomexplane: [],
              symptomdata: [],
              symptomprevent: [],
              symptomdanger: []
            }
          ]);
        } else {
          for (let i = 0; i < res.data.length; i += 1) {
            if (res.data[i].symptom !== "분류불가") {
              setChatbox((prev) => [
                ...prev,
                {
                  id: Date.now(),
                  sender: "you",
                  content: `현재 강아지는 ${res.data[i].symptom} 증상이 의심됩니다!`,
                  time: getNowTime(),
                  ICD: JSON.parse(res.data[i].ICD),
                  symtptom: res.data[i].symptom,
                  disease: [],
                  symptomexplane: [],
                  symptomdata: [],
                  symptomprevent: [],
                  symptomdanger: []
                }
              ]);
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function goMessage(e: any) {
    e.preventDefault();
    if (msg.trim()) {
      setChatbox((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "me",
          content: msg,
          time: getNowTime(),
          ICD: [],
          symtptom: "",
          disease: [],
          symptomexplane: [],
          symptomdata: [],
          symptomprevent: [],
          symptomdanger: []
        }
      ]);
      getSelectResult(msg);
    }
    if (textareaRef.current) {
      textareaRef.current.value = "";
      setmsg("");
    }
  }

  function checkEnter(e: any) {
    if (e.key === "Enter") {
      goMessage(e);
    } else {
      setmsg(e.target.value);
    }
  }

  function selectSymptom(e: any) {
    setChatbox((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "me",
        content: `'${e.target.id}'에 대한 \n'${e.target.innerText}'에 대해 궁금해요`,
        time: getNowTime(),
        ICD: [],
        symtptom: "",
        disease: [],
        symptomexplane: [],
        symptomdata: [],
        symptomprevent: [],
        symptomdanger: []
      }
    ]);
    axios({
      url: `https://dog-hoogam.site/chatbot/select`,
      method: "get",
      params: { symptom: e.target.id, icd: e.target.innerText }
    })
      .then((res) => {
        setChatbox((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: "you",
            content: `'${e.target.id}'에 대한 \n'${e.target.innerText}'으로는`,
            time: getNowTime(),
            ICD: [],
            symtptom: "",
            disease: JSON.parse(res.data[0].disease),
            symptomexplane: JSON.parse(res.data[0].symptomexplane),
            symptomdata: JSON.parse(res.data[0].symptomdata),
            symptomprevent: JSON.parse(res.data[0].symptomprevent),
            symptomdanger: JSON.parse(res.data[0].symptomdanger)
          }
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.chatBox}`}>
        {chatbox.map((message) => {
          if (message.sender === "you") {
            const ICDlist = message.ICD;
            const DiseaseList: any[] = [];
            if (message.disease.length > 0) {
              for (let i = 0; i < message.disease.length; i += 1) {
                DiseaseList.push([
                  message.disease[i],
                  message.symptomdanger[i],
                  message.symptomexplane[i],
                  message.symptomdata[i],
                  message.symptomprevent[i]
                ]);
              }
            }
            return (
              <div key={message.id} className="flex">
                <div
                  className={`${styles.botprofile} flex justify-center align-center`}
                >
                  <div className={`${styles.img}`}>
                    <Image src={chatbotDog} />
                  </div>
                </div>

                <div className={`${styles.botmessage} flex align-center`}>
                  <h1 className={`${styles.text} notoMid fs-14`}>
                    {message.content}
                    {ICDlist.length > 0 ? (
                      <div>
                        <h1>자세한 내용을 알고 싶으면 항목을 선택해주세요!</h1>
                        <div className="flex column align-center">
                          {ICDlist.map((item) => {
                            return (
                              <button
                                className={`${styles.selectbutton} fs-13 notoMid`}
                                onClick={(e) => selectSymptom(e)}
                                type="button"
                                key={item}
                                id={message.symtptom}
                              >
                                {item}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}
                    {message.disease.length > 0 ? (
                      <div>
                        <h1>다음과 같은 질병 정보가 있습니다. </h1>
                        <div>
                          {DiseaseList.map((item) => {
                            function openDisease(e: any) {
                              const Target =
                                e.currentTarget.parentElement.children[1];
                              if (Target?.hidden) {
                                Target.hidden = false;
                                e.currentTarget.parentElement.children[0].scrollIntoView(
                                  {
                                    behavior: "smooth",
                                    block: "start",
                                    inline: "nearest"
                                  }
                                );
                              } else {
                                (Target as HTMLElement).hidden = true;
                              }
                            }
                            return (
                              <div key={DiseaseList.indexOf(item)}>
                                <button
                                  className={`${styles.resultButton} flex align-center`}
                                  type="button"
                                  name={item[0]}
                                  onClick={(e) => openDisease(e)}
                                >
                                  <div className={`${styles.dangerIcon}`}>
                                    <Image src={dangerLevel[item[1]]} alt="#" />
                                  </div>
                                  <h1
                                    className={`${styles.diseaseTitle} fs-16 notoBold`}
                                  >
                                    {item[0]}
                                  </h1>
                                </button>

                                <div
                                  className={`${styles.diseaseContent} fs-14 notoBold`}
                                  id={`result${item[0]}`}
                                  hidden
                                >
                                  <div>
                                    <ResultSlider
                                      p1={item[2]}
                                      p2={item[3]}
                                      p3={item[4]}
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex" style={{ marginTop: "20px" }}>
                          <h1 className="fs-14 notoMid">건의사항은 </h1>
                          <a
                            className={`${styles.help} fs-14 notoMid`}
                            href="https://docs.google.com/forms/d/1fqRdtbBkbUj9qr3P-JzJUZz_SX2oAgyJi89sBLqJ964/edit"
                            target="_blanck"
                          >
                            여기
                          </a>
                          <h1 className="fs-14 notoMid">를 눌러주세요</h1>
                        </div>
                      </div>
                    ) : null}
                  </h1>
                  <h1 className={`${styles.time} fs-10 notoReg`}>
                    {message.time}
                  </h1>
                </div>
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
                <h1 className={`${styles.time} fs-10 notoReg`}>
                  {message.time}
                </h1>
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
        <div ref={scrollRef} />
      </div>

      <div className={`${styles.inputForm} flex`}>
        <textarea
          ref={textareaRef}
          className={`${styles.input} notoMid fs-12`}
          placeholder="질문을 입력해주세요."
          onKeyUp={(e) => checkEnter(e)}
          id="chatInput"
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
