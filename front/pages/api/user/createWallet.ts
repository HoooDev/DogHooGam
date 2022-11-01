import axios from "axios";

const createWallet = (userWallerAddress: any, userPersonalKey: any) => {
  console.log(userWallerAddress);
  console.log(userPersonalKey);
  const Token = window.localStorage.getItem("AccessToken");

  axios({
    url: `https://k7c103.p.ssafy.io:8000/user/wallet`,
    method: "post",
    headers: { Authorization: `Bearer ${Token}` },
    params: {
      userWallerAddress,
      userPersonalKey
    }
  })
    .then((res) => {
      if (res.status === 200) {
        return alert("지갑이 생성되었습니다.");
      }
      return [];
    })
    .catch((err) => {
      console.log(err);
    });
};

export default createWallet;
