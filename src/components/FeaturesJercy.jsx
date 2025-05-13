import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";

const FeaturesJercy = () => {
  const { isLoading, data: jerseys } = useQuery({
    queryKey: ["jerseys"],
    queryFn: async () => {
      return await fetch(`${import.meta.env.VITE_API_URL}/alljerseys`).then(
        (res) => res.json()
      );
    },
  });

  // console.log(jerseys, "1111");
  if (isLoading || !jerseys) {
    return (
      <div className=" mt-6 flex justify-center">
        <span className="loading w-20 text-yellow-400 loading-spinner "></span>
      </div>
    );
  }
  const quantity = jerseys?.reduce((sum, jersey) => sum + jersey?.m + jersey?.l + jersey?.xl + jersey?.xl2, 0);
  return (
    <div className="border mt-10 rounded-lg">
      <h2 className="font-poppins font-medium  text-center text-2xl md:text-3xl  lg:text-5xl mb-10">
        Featured Jerseys
      </h2>
      <Fade cascade duration={1000}>
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.001, type: "spring", stiffness: 120 }}
          className=" grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5"
        >
          {jerseys?.slice(0, 6).map((jersey) => { 
            const jerseyQuantity = parseInt(jersey?.m) + parseInt(jersey?.l) +parseInt(jersey?.xl) +parseInt(jersey?.xl2);
            return (
            <div
              key={jersey?._id}
              className="card font-open-sans card-compact text-cyan-950 bg-slate-300 shadow-md"
            >
              <div className="w-[100] mx-auto m-1">
                <img
                  className=" rounded-lg  w-96 h-96 object-cover  "
                  src={jersey?.jerseyImage}
                  alt={jersey?.jerseyName}
                />
              </div>
              <div className="card-body space-y-3">
                <h2 className="font-poppins font-bold card-title">
                  {jersey?.jerseyName}
                </h2>

                <div className="card-actions text-xl mt-14 justify-between items-center ">
                  <p> Quantity : {jerseyQuantity}</p>
                  <p>
                    Price : <span className=" font-bold">{jersey?.price}</span>
                  </p>
                  <Link to={`/jerseyDetails/${jersey?._id}`}>
                      <button className=" bg-green-500 text-cyan-50 text-xl font-bold p-2 rounded-lg ">BUY NOW</button>
                  </Link>
                </div>
              </div>
            </div>
          )})} 
        </motion.div>
        <div className=" text-center mt-10">
          <Link to="/availablejerseys">
            <button className="btn text-white text-xl font-medium bg-cyan-600 rounded-xl p-2 ">Show All</button>
          </Link>
        </div>
      </Fade>
    </div>
  );
};

export default FeaturesJercy;
