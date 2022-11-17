import axios from "axios";

const addDog = async (data: any) => {
  const Token = window.localStorage.getItem("AccessToken");
  console.log(data);
  const res = await axios({
    url: "https://dog-hoogam.site/api/business-service/dog",
    method: "post",
    headers: { Authorization: `Bearer ${Token}` },
    data
  });
  return res;
};

export default addDog;
