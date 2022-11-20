import axios from "axios";

const getOneFeed = (pk: any) => {
  const Token = window.localStorage.getItem("AccessToken");
  return axios({
    url: `https://dog-hoogam.site/api/business-service/feed/${pk}`,
    method: "get",
    headers: { Authorization: `Bearer ${Token}` }
  });
};

export default getOneFeed;
