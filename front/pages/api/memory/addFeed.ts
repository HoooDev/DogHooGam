import axios from "axios";

const addFeed = (data: any, imagefile: any) => {
  const Token = window.localStorage.getItem("AccessToken");
  console.log(imagefile);
  const formData = new FormData();
  formData.append("file", imagefile);
  formData.append(
    "feedReq",
    new Blob([JSON.stringify(data)], { type: "application/json" })
  );
  axios({
    url: "https://dog-hoogam.site/api/business-service/feed",
    method: "post",
    headers: { Authorization: `Bearer ${Token}` },
    data: formData
  })
    .then((res) => {
      if (res.status === 200) {
        alert("피드가 등록되었습니다.");
      }
      return [];
    })
    .catch((err) => {
      console.log(err);
    });
};

export default addFeed;
