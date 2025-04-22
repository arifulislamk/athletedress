import React from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';
const Banner = () => {
  return (
    <div>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide ><div className="w-1/2 rounded-lg  ">
        <img className=" rounded-lg" src="https://i.ibb.co.com/N6LGVTb/IMG20241122173422.jpg" alt="f" /></div>
        </SwiperSlide>
        <SwiperSlide ><div className="w-1/2 rounded-md">
        <img src="https://i.ibb.co.com/N6LGVTb/IMG20241122173422.jpg" alt="f" /></div>
        </SwiperSlide>
        <SwiperSlide ><div className="w-1/2 rounded-md">
        <img src="https://i.ibb.co.com/N6LGVTb/IMG20241122173422.jpg" alt="f" /></div>
        </SwiperSlide>
        <SwiperSlide ><div className="w-1/2 rounded-md">
        <img src="https://i.ibb.co.com/N6LGVTb/IMG20241122173422.jpg" alt="f" /></div>
        </SwiperSlide>
        <SwiperSlide ><div className="w-1/2 rounded-md">
        <img src="https://i.ibb.co.com/N6LGVTb/IMG20241122173422.jpg" alt="f" /></div>
        </SwiperSlide>
        <SwiperSlide ><div className="w-1/2 rounded-md">
        <img src="https://i.ibb.co.com/N6LGVTb/IMG20241122173422.jpg" alt="f" /></div>
        </SwiperSlide>
        <SwiperSlide ><div className="w-1/2 rounded-md">
        <img src="https://i.ibb.co.com/N6LGVTb/IMG20241122173422.jpg" alt="f" /></div>
        </SwiperSlide>
        <SwiperSlide ><div className="w-1/2 rounded-md">
        <img src="https://i.ibb.co.com/N6LGVTb/IMG20241122173422.jpg" alt="f" /></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
