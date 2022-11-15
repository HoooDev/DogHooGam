import axios from "axios";

const getUser = () => {
  const Token = window.localStorage.getItem("AccessToken");
  axios({
    url: `https://dog-hoogam.site:8000/api/user-service/user`,
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

export default getUser;
