import { Link } from "react-router-dom";
const FeaturesJercy = () => {
  return (
    <div>
      <div>
        <h2 className="font-poppins font-medium  text-center text-2xl md:text-3xl  lg:text-5xl mb-10">
          Featured Jersy
        </h2>

        <div className="card font-open-sans card-compact bg-base-100 shadow-xl">
          <figure>
            <img className="w-full" />
          </figure>
          <div className="card-body space-y-3">
            <h2 className="font-poppins font-bold card-title">foodName</h2>
            <p> Quantity : </p>
            <p> Pickup : </p>
            <p>
              {" "}
              Expired Date/Time :{" "}
              
            </p>
            <p> Additional Notes </p>

            <div className="card-actions mt-14 justify-between">
              <div className=" flex items-center gap-5">
                <img className="w-1/6 rounded-full" alt="Donator Image" />
                <p className=" text-xl">donatorName</p>
              </div>
              <Link>
                <button className="btn bg-orange-400  ">View Details</button>
              </Link>
            </div>
          </div>
        </div>
        <div className=" text-center mt-10">
          <Link>
            <button className="btn btn-warning text-white ">Show All</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturesJercy;
