import { Fade, Slide } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

import animation2 from "../assets/Animation - 1746686798758.json";

const Slider = () => {
  return (
    <div>
      {/* <!-- slider or curosal  --> */}
      <Fade cascade duration={3000}>
        <div className="font-open-sans lg:mb-20  rounded-2xl carousel w-full lg:h-[550px] ">
          <div id="slide1" className="carousel-item relative w-full">
            <div className="flex flex-col lg:flex-row-reverse p-4 lg:p-20 gap-14">
              <motion.div
                initial={{ y: -500 }}
                animate={{ y: 0 }}
                transition={{ delay: 1, type: "spring", stiffness: 10 }}
                className="space-y-3 flex-1"
              >
                <h2 className="font-poppins  text-xl  md:text-4xl font-bold">
                  Bercelona Premium Quality Home Kit 24/25 Jersey Circle Nicks
                </h2>
                <p className=" text-2xl , md:text-xl font-medium text-error ">
                  Regular Price : 550 Taka <br />
                  Discount Price :{" "}
                  <span className=" text-green-600 font-bold text-2xl ">450 Taka</span>
                </p>
                <div className=" flex gap-10 items-center">
                  <div>
                    <Link to="/jerseyDetails/681c4e89461c0c23d72e9ace">
                      <Slide triggerOnce>
                        <button className="btn lg:mt-10 bg-orange-400  text-white">
                          View Details
                        </button>
                      </Slide>
                    </Link>
                  </div>
                  <div>
                    <Lottie
                      className="w-[70%]"
                      loop={true}
                      animationData={animation2}
                    ></Lottie>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ y: 500 }}
                animate={{ y: 0 }}
                transition={{ delay: 1, type: "spring", stiffness: 10 }}
                className="flex-1 relative"
              >
                <img
                  src="https://i.ibb.co.com/tMJvNGmV/494816128-695283886691944-4772800413708119016-n.jpg"
                  className="w-[60%] rounded-2xl"
                />
              </motion.div>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide3" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide2" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <motion.div
              initial={{ y: -500 }}
              animate={{ y: 0 }}
              transition={{ delay: 1, type: "spring", stiffness: 10 }}
              className="flex flex-col lg:flex-row-reverse p-4 lg:p-24 gap-20"
            >
              <div className="space-y-7 flex-1">
                <h2 className="font-poppins   text-xl  lg:text-4xl font-bold">
                Real Madrid Premium Quality Home Kit 24/25 Circle Nicks</h2>
                <p className=" text-2xl lg:text-3xl font-medium text-error ">
                  Regular Price : 550 Taka <br />
                  Discount Price :{" "}
                  <span className=" text-green-600 font-bold ">450 Taka</span>
                </p>
                <Link to="/jerseyDetails/681b82fa04c7421a46f69c11">
                  <Slide triggerOnce>
                    <button className="btn lg:mt-10 bg-orange-400  text-white">
                      View Details
                    </button>
                  </Slide>
                </Link>
              </div>
              <div className="flex-1 relative">
                <Slide direction="right" cascade delay={100} triggerOnce>
                  <img
                    src="https://i.ibb.co.com/Q74Kw3hk/Mens-Home-Authentic-Shirt-2425-White.webp"
                    className="w-[72%] rounded-2xl"
                  />
                </Slide>
              </div>
            </motion.div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide1" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide3" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <motion.div
              initial={{ y: -500 }}
              animate={{ y: 0 }}
              transition={{ delay: 1, type: "spring", stiffness: 10 }}
              className="flex flex-col lg:flex-row-reverse p-4 lg:p-24 gap-20"
            >
              <div className="space-y-7 flex-1">
                <h2 className="font-poppins text-xl  lg:text-4xl font-bold">
                Inter Milan Premium Quality Home Kit 24/25 Circle Nicks, Mesh
                Febricks
                </h2>
                <p className=" text-2xl lg:text-4xl font-medium text-error ">
                <p className=" text-2xl lg:text-3xl font-medium text-error ">
                  Regular Price : 550 Taka <br />
                  Discount Price :{" "}
                  <span className=" text-green-600 font-bold ">450 Taka</span>
                </p>
                </p>
                <Link to="/jerseyDetails/663f4a4e442329bb0c45555e">
                  <Slide cascade duration={3000} triggerOnce>
                    <button className="btn lg:mt-10 bg-orange-400  text-white">
                      View Details
                    </button>
                  </Slide>
                </Link>
              </div>
              <div className="flex-1 relative">
                <Slide direction="right" cascade delay={200} triggerOnce>
                  <img
                    src="https://i.ibb.co.com/jP0dtBXt/Inter-milan-home-2425-1.webp"
                    className="w-[72%] rounded-2xl"
                  />
                </Slide>
              </div>
            </motion.div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide2" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide1" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default Slider;
