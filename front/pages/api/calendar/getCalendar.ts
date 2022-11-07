import axios from "axios";

const getCalendar = () => {
  const Token = window.localStorage.getItem("AccessToken");
  const month = 11;
  const year = 2022;
  axios({
    url: `https://dog-hoogam.site:8000/api/calendar/memo?month=${month}&year=${year}`,
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

export default getCalendar;
