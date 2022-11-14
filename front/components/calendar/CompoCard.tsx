import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import Todo from "./Todo";
import WalkRecord from "./WalkRecord";

function CompoCard() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div>
      <Slider {...settings}>
        <Todo isUpdated={false} />
        <WalkRecord />
      </Slider>
    </div>
  );
}

export default CompoCard;
