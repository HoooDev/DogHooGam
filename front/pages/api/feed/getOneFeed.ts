import axios from "axios";

const getOneFeed = (pk: any) => {
  const Token = window.localStorage.getItem("AccessToken");
  console.log(pk);
  return axios({
    url: `https://dog-hoogam.site:8000/api/business-service/feed/${pk}`,
    method: "get",
    headers: { Authorization: `Bearer ${Token}` }
  });
};

export default getOneFeed;
