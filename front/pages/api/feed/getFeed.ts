import axios from "axios";

const getFeed = () => {
  const Token = window.localStorage.getItem("AccessToken");

  return axios({
    url: "https://dog-hoogam.site:8000/api/feed",
    method: "get",
    headers: { Authorization: `Bearer ${Token}` }
  });
};

export default getFeed;
