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
        <SwiperSlide className=" gap-3">
          <img
            src="https://i.ibb.co.com/tMJvNGmV/494816128-695283886691944-4772800413708119016-n.jpg"
            alt="f"
          />
          <img
            src="https://i.ibb.co.com/PZWyQN8k/494816183-1685037712887920-6878957444167832696-n.jpg"
            alt="f"
          />
        </SwiperSlide>
        <SwiperSlide className=" gap-3">
          <img
            className=" rounded-md "
            src="https://i.ibb.co.com/Q74Kw3hk/Mens-Home-Authentic-Shirt-2425-White.webp"
            alt="f"
          />
          <img src="https://i.ibb.co.com/WvX5msXj/Mens-Home-Long-Sleeve-Shirt-2425-White.webp" alt="f" />
        </SwiperSlide>
        <SwiperSlide className=" gap-3">
          <img src="https://i.ibb.co.com/jP0dtBXt/Inter-milan-home-2425-1.webp" alt="f" />
          <img src="https://i.ibb.co.com/ZR3rK9hG/Inter-milan-away-2425-1.jpg" alt="f" />
        </SwiperSlide>
        <SwiperSlide className=" gap-3">
          <img src="https://i.ibb.co.com/GfTbv7Yv/25200-C-1-88fba747-c277-4eab-8296-7a9b78b7d4b8.jpg" alt="f" />
          <img src="https://i.ibb.co.com/RG0362b6/ber-back-black.webp" alt="f" />
        </SwiperSlide>

        <SwiperSlide className=" gap-3 rounded-md">
          <img src="https://i.ibb.co.com/QjHnWRxQ/Mens-Third-Authentic-Shirt-2425-Charcoal.webp" alt="f" />
          <img src="https://i.ibb.co.com/ZR2vSL5P/PSG-Nike-Home-Stadium-Shirt-2024-25.jpg" alt="f" />
        </SwiperSlide>
        <SwiperSlide className=" gap-3 rounded-md">
          <img src="https://i.ibb.co.com/p6htkFB4/3rd-kit-bercelona.webp" alt="f" />
          <img src="https://i.ibb.co.com/p6htkFB4/3rd-kit-bercelona.webp" alt="f" />
        </SwiperSlide>
        <SwiperSlide className=" gap-3 rounded-md">
          <img src="https://i.ibb.co.com/hFypbCWg/bayers-font.jpg" alt="f" />
          <img src="https://i.ibb.co.com/TMgSPdqd/bayaer-read.jpg" alt="f" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
