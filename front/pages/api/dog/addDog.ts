import axios from "axios";

const addDog = (data: any) => {
  const Token = window.localStorage.getItem("AccessToken");
  console.log(data);
  axios({
    url: "https://dog-hoogam.site:8000/api/dog",
    method: "post",
    headers: { Authorization: `Bearer ${Token}` },
    data
  })
    .then((res) => {
      if (res.status === 200) {
        return alert("강아지가 등록되었습니다.");
      }
      return [];
    })
    .catch((err) => {
      console.log(err);
    });
};

export default addDog;
