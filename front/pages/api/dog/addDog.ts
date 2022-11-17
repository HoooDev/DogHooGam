import axios from "axios";

const addDog = async (data: any, image: any) => {
  const Token = window.localStorage.getItem("AccessToken");
  console.log(data);
  const formData = new FormData();
  formData.append("file", image);
  formData.append(
    "dog",
    new Blob([JSON.stringify(data)], { type: "application/json" })
  );
  const res = await axios({
    url: "https://dog-hoogam.site/api/business-service/dog",
    method: "post",
    headers: { Authorization: `Bearer ${Token}` },
    data: formData
  });
  return res;
};

export default addDog;
