import React from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";
const Banner = () => {
  return (
    <div className=" mt-10">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className=" gap-3" >
        <img
              src="https://i.ibb.co.com/fY9ZH4KW/miami-black-font.jpg"
              alt="f"
            />
            <img
              src="https://i.ibb.co.com/VcGpdxqh/miami-black-back.jpg"
              alt="f"
            />
         
        </SwiperSlide>
        <SwiperSlide className=" gap-3">
            <img className=" rounded-md " src="https://i.ibb.co.com/8ndPZ7vX/miami.jpg" alt="f" />
            <img src="https://i.ibb.co.com/8ndPZ7vX/miami.jpg" alt="f" />
        </SwiperSlide>
        <SwiperSlide className=" gap-3">
            <img src="https://i.ibb.co.com/Y4RxZqpG/real-fonts.jpg" alt="f" />
            <img src="https://i.ibb.co.com/Q37gKdcR/real-font.jpg" alt="f" />
        </SwiperSlide>
        
        <SwiperSlide className=" gap-3 rounded-md">
        <img src="https://i.ibb.co.com/hFypbCWg/bayers-font.jpg" alt="f" />
            <img src="https://i.ibb.co.com/TMgSPdqd/bayaer-read.jpg" alt="f" />
   
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-1/2 rounded-lg  ">
            <img
              className=" rounded-lg"
              src="https://i.ibb.co.com/SD7FYMNt/Al-naser.jpg
"
              alt="f"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-1/2 rounded-md">
            <img src="https://i.ibb.co.com/wFmvHWjd/chelse-font.jpg" alt="f" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-1/2 rounded-md">
            <img src="https://i.ibb.co.com/21PN39yc/man-uni.jpg" alt="f" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
