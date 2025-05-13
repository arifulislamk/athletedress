import { useContext, useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Helmet } from "react-helmet";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useCommonAxios from "../hooks/useCommonAxios";
import { toast } from "react-toastify";

const JerseyDetails = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useContext(AuthContext);
  const jerseys = useLoaderData();
  const navigate = useNavigate();
  const commonAxios = useCommonAxios()

  const { register, handleSubmit } = useForm();

  const { id } = useParams();
  // // const intId = parseInt(id)
  // console.log(jerseys, id, "dfdfs");
  // const spots = jerseys.find(spot => spot._id == id);

  const { _id, jerseyName, price, jerseyImage, expiredDate, additionalNotes } =
    jerseys;

  const [count, setCount] = useState(1);
  //   const handleIncrement = () => {
  //     if (quantity > 0) {
  //       setCount(count + 1);
  //     }
  //   };
  const handleDicrement = () => {
    if (count > 1) setCount(count - 1);
  };

  const { mutateAsync} = useMutation({
    mutationFn: async (info) => {
      const { data } = await commonAxios.post("/cart", info);
      console.log(data, "cart data");
      return data;
    },
    onSuccess: () => {
      console.log("cart add");
      toast.success("cart Succesful");
    },
  });
  const handleBuy = async(data,action = "buy") => {
    const { _id, ...restjerseys } = jerseys;
    const jersey = {
      ...restjerseys,
      cartaddDate: startDate,
      purchaseEmail: user.email,
      size: data.size,
      count: count
    };
    // mutateAsync(jersey)
    // console.log("buy okkk",data.size,count, jersey);
     try {
    await mutateAsync(jersey);
    toast.success(
      action === "buy" ? "Proceeding to checkout..." : "Added to cart"
    );

    if (action === "buy") {
      navigate("/cart"); // replace with your desired route
    }
  } catch (err) {
    toast.error("Action failed");
  }
  };
  return (
    <div className="font-open-sans space-y-5 mx-4 lg:mx-12 ">
      <Helmet className="text-sm">
        <title className="">{`Athlete Dress | ${jerseyName}`}</title>
      </Helmet>
      <Fade cascade duration={2000}>
        <div className=" mt-5 flex flex-col items-center gap-3 md:flex-row">
          <div className="  md:w-2/3">
            <img className="w-1/2  rounded-lg" src={jerseyImage} alt="" />
          </div>
          <div className=" flex flex-col md:flex-row items-center lg:gap-10">
            <form
              onSubmit={handleSubmit(handleBuy)}
              className="space-y-6 ng-untouched ng-pristine ng-valid"
            >
              <div>
                <h1 className=" font-bold text-2xl ">{jerseyName}</h1>
                <p className=" text-xl font-medium ">Price : {price}</p>
              </div>
              <div>
                <select
                  type="text"
                   {...register("size")}
                  defaultValue="XL"
                  name="size"
                  className="select font-bold text-xl rounded-lg bg-cyan-300 select-md"
                >
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                  <option>2XL</option>
                </select>
              </div>
              <div className=" flex gap-6">
                <div className="flex divide-x-2 rounded text-gray-100 dark:text-gray-800 divide-gray-700 dark:divide-gray-300">
                  <button
                  type="button"
                    onClick={handleDicrement}
                    className="px-3 font-bold text-xl py-1"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    className="px-3 font-semibold text-xl py-1"
                  >
                    {count}
                  </button>
                  <button
                    onClick={() => setCount(count + 1)}
                    type="button"
                    className="px-3 font-bold text-xl py-1"
                  >
                    +
                  </button>
                </div>
                <button className=" text-xl font-bold bg-cyan-500 rounded-xl p-2">
                  Add Cart
                </button>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={handleSubmit((data) => handleBuy(data, "buy"))}
                  className=" bg-green-600 text-xl font-bold p-3 rounded-lg "
                >
                  BUY NOW
                </button>
              </div>
            </form>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default JerseyDetails;
