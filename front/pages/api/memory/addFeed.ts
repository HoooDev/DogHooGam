import axios from "axios";

const addFeed = async (data: any, imagefile: any) => {
  const Token = window.localStorage.getItem("AccessToken");
  const formData = new FormData();
  formData.append("file", imagefile);
  formData.append(
    "feedReq",
    new Blob([JSON.stringify(data)], { type: "application/json" })
  );
  const res = await axios({
    url: "https://dog-hoogam.site/api/business-service/feed",
    method: "post",
    headers: { Authorization: `Bearer ${Token}` },
    data: formData
  });
  return res;
};

export default addFeed;
