import axios from "axios";

const getDogList = () => {
  const Token = window.localStorage.getItem("AccessToken");
  axios({
    url: "https://dog-hoogam.site/api/business-service/dog",
    method: "get",
    headers: { Authorization: `Bearer ${Token}` }
  })
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        return res.data;
      }
      return [];
    })
    .catch((err) => {
      console.log(err);
    });
};

export default getDogList;
