import axios from "axios";

const addFeed = (data: any) => {
  const Token = window.localStorage.getItem("AccessToken");

  axios({
    url: "https://dog-hoogam.site:8000/api/feed",
    method: "post",
    headers: { Authorization: `Bearer ${Token}` },
    data
  })
    .then((res) => {
      if (res.status === 200) {
        return alert("피드가 등록되었습니다.");
      }
      return [];
    })
    .catch((err) => {
      console.log(err);
    });
};

export default addFeed;
