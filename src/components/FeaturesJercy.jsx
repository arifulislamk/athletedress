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

  console.log(jerseys, "1111");
  if (isLoading) {
    return (
      <div className=" mt-6 flex justify-center">
        <span className="loading w-20 text-yellow-400 loading-spinner "></span>
      </div>
    );
  }

  return (
    <div className="border mt-10 rounded-lg">
      <h2 className="font-poppins font-medium  text-center text-2xl md:text-3xl  lg:text-5xl mb-10">
        Featured Jerseys{" "}
      </h2>

      <Fade cascade duration={3000}>
        <motion.div
          initial={{ y: -500 }}
          animate={{ y: 0 }}
          transition={{ delay: 4, type: "spring", stiffness: 120 }}
          className=" grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5"
        >
          {jerseys?.map((jersey) => (
            <div
              key={jersey._id}
              className="card font-open-sans card-compact bg-base-100 shadow-xl"
            >
              <div className="w-[100] mx-auto m-1">
                <img
                  className=" rounded-lg  w-96 h-96 object-cover  "
                  src={jersey.jerseyImage}
                  alt={jersey.jerseyName}
                />
              </div>
              <div className="card-body space-y-3">
                <h2 className="font-poppins font-bold card-title">
                  {jersey.jerseyName}
                </h2>
                <p> Quantity : {jersey.jerseyQuantity}</p>
                <p> Pickup : {jersey.pickupLocation}</p>
                <p>
                  {" "}
                  Expired Date/Time :{" "}
                  {new Date(jersey.expiredDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
                {/* s */}

                <div className="card-actions mt-14 justify-between">
                  <div className=" flex items-center gap-5">
                    <img
                      className="w-1/6 rounded-full"
                      src={jersey.donatorImage}
                      alt="Donator Image"
                    />
                    <p className=" text-xl">{jersey.donatorName}</p>
                  </div>
                  <Link to={`/jerseyDetails/${jersey._id}`}>
                    <button className="btn bg-orange-400  ">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        <div className=" text-center mt-10">
          <Link to="/availablejerseys">
            <button className="btn btn-warning text-white ">Show All</button>
          </Link>
        </div>
      </Fade>
    </div>
  );
};

export default FeaturesJercy;
