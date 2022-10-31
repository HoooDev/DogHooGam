import axios from "axios";

const createWallet = (walletAddress: any, walletKey: any) =>
  axios({
    url: `http://k7c103.p.ssafy.io:8000/user/wallet`,
    method: "post",
    headers: { Authorization: "Bearer +accessToken" },
    params: {
      walletAddress,
      walletKey
    }
  })
    .then((res) => {
      if (res.status === 200) {
        return res.data.getLeagues;
      }
      return [];
    })
    .catch((err) => {
      console.log(err);
    });

export default createWallet;
