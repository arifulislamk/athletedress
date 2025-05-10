import { useContext, useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Helmet } from "react-helmet";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const JerseyDetails = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useContext(AuthContext);
  const jerseys = useLoaderData();
  const navigate = useNavigate();

  const { id } = useParams();
  // // const intId = parseInt(id)
  console.log(jerseys, id, "dfdfs");
  // const spots = jerseys.find(spot => spot._id == id);

  const {
    _id,
    jerseyName,
    jerseyQuantity,
    price,
    jerseyImage,
    pickupLocation,
    expiredDate,
    additionalNotes,
    donatorName,
    donatorEmail,
    donatorImage,
  } = jerseys;

  const [count, setCount] = useState(1);
  //   const handleIncrement = () => {
  //     if (quantity > 0) {
  //       setCount(count + 1);
  //     }
  //   };
  const handleDicrement = () => {
    if (count > 1) setCount(count - 1);
  };
  const handleRequest = (e) => {
    e.preventDefault();
    const { _id, additionalNotes, jerseyStatus, ...restjerseys } = jerseys;
    const jersey = {
      jerseyStatus: "requested",
      ...restjerseys,
      additionalNotes: e.target.additionalnotes.value,
      requestDate: startDate,
      requestEmail: user.email,
    };
    console.log("delete okkk", _id, jerseyStatus, jersey, additionalNotes);

    axios
      .put(`${import.meta.env.VITE_URL}/alljerseysupdate/${_id}`, jersey)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          console.log("updatejersey done");

          axios
            .post(`${import.meta.env.VITE_URL}/requestjerseys`, jersey)
            .then((res) => {
              console.log(res.data, "post done");
              if (res.data.insertedId) {
                navigate("/myjerseyRequest");
              }
            });

          // const remeningjersey = jerseys.filter(jersey => jersey._id !== _id);
          // setMyjerseys(remeningjersey)
        }
      });
  };
  return (
    <div className="font-open-sans space-y-5 mx-4 lg:mx-12 ">
      <Helmet className="text-sm">
        <title className="">{`Athlete Dress | ${jerseyName}`}</title>
      </Helmet>
      <Fade cascade duration={2000}>
        <div className=" mt-5 flex flex-col items-center gap-3 md:flex-row">
          <div className="  md:w-2/3">
            <img
              className="w-1/2  rounded-lg"
              src={jerseyImage}
              alt=""
            />
          </div>
            <div className=" flex flex-col md:flex-row items-center lg:gap-10">
              <div className=" space-y-3 lg:space-y-5">
                <h1 className=" font-bold text-2xl ">{jerseyName}</h1>
                <p className=" text-xl font-medium ">Price : {price}</p>
                <div>
                  <select
                    defaultValue="XL"
                    className="select font-bold text-xl rounded-lg bg-cyan-300 select-md"
                  >
                    {/* <option disabled={true}>M</option> */}
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                    <option>2XL</option>
                  </select>
                </div>
                <div className=" flex gap-6">
                  <div className="flex divide-x-2 rounded text-gray-100 dark:text-gray-800 divide-gray-700 dark:divide-gray-300">
                    <button onClick={handleDicrement} className="px-3 py-1">
                      -
                    </button>
                    <button type="button" className="px-3 py-1">
                      {count}
                    </button>
                    <button
                      onClick={() => setCount(count + 1)}
                      type="button"
                      className="px-3 py-1"
                    >
                      +
                    </button>
                  </div>
                  <button className=" text-xl bg-cyan-500 rounded-xl p-2 font-medium">Add Cart</button>
                </div>
                <button className=" bg-green-600 font-bold p-3 rounded-lg ">BUY NOW</button>
              </div>
            </div>
        </div>
      </Fade>
    </div>
  );
};

export default JerseyDetails;
