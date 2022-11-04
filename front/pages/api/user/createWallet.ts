import axios from "axios";

const createWallet = (userWalletAddress: any, userPersonalKey: any) => {
  console.log(userWalletAddress);
  console.log(userPersonalKey);
  const Token = window.localStorage.getItem("AccessToken");

  const data = {
    userWalletAddress,
    userPersonalKey
  };

  axios({
    url: `https://dog-hoogam.site:8000/api/user/wallet`,
    method: "post",
    headers: { Authorization: `Bearer ${Token}` },
    data
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
