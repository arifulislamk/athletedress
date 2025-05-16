import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { Link, useLocation } from "react-router-dom";

const NewArrival = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const { isLoading, data: jerseys } = useQuery({
    queryKey: ["jerseys"],
    queryFn: async () => {
      return await fetch(`${import.meta.env.VITE_API_URL}/alljerseys`).then(
        (res) => res.json()
      );
    },
  });

  console.log(jerseys, "1111");
  if (isLoading || !jerseys) {
    return (
      <div className=" mt-6 flex justify-center">
        <span className="loading w-20 text-yellow-400 loading-spinner "></span>
      </div>
    );
  }
  return (
    <div className="border md:mt-3 rounded-lg">
      <h2 className="font-poppins font-medium  text-center text-2xl md:text-3xl  lg:text-5xl md:mb-10">
        All Jerseys
      </h2>
      <Fade cascade duration={1000}>
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.001, type: "spring", stiffness: 120 }}
          className=" grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5"
        >
          {jerseys?.map((jersey) => {
            const jerseyQuantity =
              parseInt(jersey?.m) +
              parseInt(jersey?.l) +
              parseInt(jersey?.xl) +
              parseInt(jersey?.xl2);
            return (
              <div
                key={jersey?._id}
                className="card font-open-sans card-compact text-cyan-950 bg-slate-300 shadow-md"
              >
                <div className="flex justify-center mx-auto m-1">
                  <img
                    className=" rounded-lg w-2/3 md:w-96 md:h-96 object-cover  "
                    src={jersey?.jerseyImage}
                    alt={jersey?.jerseyName}
                  />
                </div>
                <div className="card-body space-y-3">
                  <h2 className="ont-poppins font-semibold md:font-bold md:card-title">
                    {jersey?.jerseyName}
                  </h2>

                  <div className="card-actions md:text-xl mt-14 justify-between items-center ">
                    <p> Quantity : {jerseyQuantity}</p>
                    <p>
                      Price :
                      <span className=" font-bold">{jersey?.price}</span>
                    </p>
                    <Link to={`/jerseyDetails/${jersey?._id}`}>
                      <button className=" bg-green-500 text-cyan-50 md:text-xl md:font-bold p-1 md:p-2 rounded-lg ">
                        BUY NOW
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </Fade>
    </div>
  );
};

export default NewArrival;
