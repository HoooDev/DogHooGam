import axios from "axios";

const getUser = () => {
  const Token = window.localStorage.getItem("AccessToken");
  axios({
    url: `https://dog-hoogam.site/api/user-service/user`,
    method: "get",
    headers: { Authorization: `Bearer ${Token}` }
  })
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
      return [];
    })
    .catch((err) => {
      console.log(err);
    });
};

export default getUser;
