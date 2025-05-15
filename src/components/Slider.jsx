import { Fade, Slide } from "react-awesome-reveal";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

import animation2 from "../../public/animation.json";

const Slider = () => {
  return (
    <div>
      {/* <!-- slider or curosal  --> */}
      <Fade cascade duration={3000}>
        <div className="font-open-sans lg:mb-20  rounded-2xl carousel w-full lg:h-[550px] ">
          <div id="slide1" className="carousel-item relative w-full">
            <div className="flex flex-col lg:flex-row-reverse p-4 lg:p-20 md:gap-14">
              <motion.div
                initial={{ y: -500 }}
                animate={{ y: 0 }}
                transition={{ delay: 1, type: "spring", stiffness: 10 }}
                className="space-y-3 border border-red-600 flex-1"
              >
                <h2 className="font-poppins  md:text-4xl font-medium md:font-bold">
                  Bercelona Premium Quality Home Kit 24/25 Jersey Circle Nicks
                </h2>
                <p className="  md:text-xl font-medium text-error ">
                  Regular Price : 1499 Taka <br />
                  Discount Price :{" "}
                  <span className=" text-green-600 font-bold md:text-2xl ">
                    1299 Taka
                  </span>
                </p>
                <div className=" flex gap-10 items-center">
                  <div>
                    <Link to="/jerseyDetails/681f8ce48523b1e91b92fe13">
                      <Slide triggerOnce>
                        <button className="btn lg:mt-10 text-white w-16 md:w-20 md:font-bold bg-cyan-500 rounded-xl md:p-1">
                          View Details
                        </button>
                      </Slide>
                    </Link>
                  </div>
                  <div>
                    <Lottie
                      className="md:w-[70%]"
                      loop={true}
                      animationData={animation2}
                    ></Lottie>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ y: 500 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 10 }}
                className="flex-1 justify-center items-center border border-red-600 relative"
              >
                {" "}
                <div className=" flex justify-center items-center">
                  <img
                    src="https://i.ibb.co.com/tMJvNGmV/494816128-695283886691944-4772800413708119016-n.jpg"
                    className="w-[55%] md:w-[60%] rounded-2xl"
                  />
                </div>
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
              className="flex flex-col lg:flex-row-reverse p-4 lg:p-20 md:gap-14"
            >
              <div className="space-y-7 flex-1">
                <h2 className="font-poppins  md:text-4xl font-medium md:font-bold">
                  Real Madrid Premium Quality Home Kit 24/25 Circle Nicks
                </h2>
                <p className=" md:text-xl font-medium text-error ">
                  Regular Price : 550 Taka <br />
                  Discount Price :{" "}
                  <span className=" text-green-600 font-bold ">450 Taka</span>
                </p>
                <Link to="/jerseyDetails/68209700402b4ebeb420a4da">
                  <Slide triggerOnce>
                    <button className="btn lg:mt-10  text-white text-xl font-medium bg-cyan-500 rounded-xl p-2">
                      View Details
                    </button>
                  </Slide>
                </Link>
              </div>
              <div className="flex-1 relative">
                <div className=" flex justify-center items-center"></div>
                <Slide direction="right" cascade delay={100} triggerOnce>
                  <img
                    src="https://i.ibb.co.com/Q74Kw3hk/Mens-Home-Authentic-Shirt-2425-White.webp"
                    className="w-[72%] rounded-2xl"
                  />
                </Slide>
                <div />
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
              className="flex flex-col lg:flex-row-reverse p-4 lg:p-20 md:gap-14"
            >
              <div className="space-y-7 flex-1">
                <h2 className="font-poppins  md:text-4xl font-medium md:font-bold">
                  Inter Milan Premium Quality Home Kit 24/25 Circle Nicks, Mesh
                  Febricks
                </h2>
                <p className=" md:text-xl font-medium text-error ">
                  Regular Price : 550 Taka <br />
                  Discount Price :{" "}
                  <span className=" text-green-600 font-bold ">450 Taka</span>
                </p>
                <Link to="/jerseyDetails/681f8e5b8523b1e91b92fe16">
                  <Slide cascade duration={3000} triggerOnce>
                    <button className="btn lg:mt-10 text-white text-xl font-bold bg-cyan-500 rounded-xl p-2">
                      View Details
                    </button>
                  </Slide>
                </Link>
              </div>
              <div className="flex-1 relative">
                <div className="flex justify-center items-center">
                  <img
                    src="https://i.ibb.co.com/jP0dtBXt/Inter-milan-home-2425-1.webp"
                    className="w-[72%] rounded-2xl"
                  />
                </div>
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
