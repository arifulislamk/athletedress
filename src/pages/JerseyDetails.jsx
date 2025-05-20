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
  const commonAxios = useCommonAxios();

  const { register, handleSubmit } = useForm();

  const { id } = useParams();
  // // const intId = parseInt(id)
  // console.log(jerseys, id, "dfdfss");
  // const spots = jerseys.find(spot => spot._id == id);

  const {
    _id,
    jerseyName,
    productId,
    price,
    jerseyImage,
    expiredDate,
    additionalNotes,
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

  const { mutateAsync } = useMutation({
    mutationFn: async (info) => {
      const { data } = await commonAxios.post("/cart", info);
      console.log(data, "cart data");
      return data;
    },
    onSuccess: () => {
      // console.log("cart add");
      toast.success("cart added Succesful");
    },
  });
  const handleBuy = async (data, action = "buy") => {
    const { _id, ...restjerseys } = jerseys;
    const jersey = {
      ...restjerseys,
      cartaddDate: startDate,
      purchaseEmail: user?.email,
      size: data.size,
      count: count,
      productId: productId,
    };
    // mutateAsync(jersey)
    console.log("buy okkk", data.size, count, jersey);
    try {
      if (!user) {
        const existingCart = JSON.parse(localStorage.getItem("cartList")) || [];
        // Check for same productId and size
        const existingItemIndex = existingCart.findIndex(
          (item) => item?.productId === jersey?.productId
        );
        if (existingItemIndex !== -1) {
          // ✅ Same item exists — update count
          existingCart[existingItemIndex].count += count;
        } else {
          // ✅ New item — push to cart
          existingCart.push(jersey);
        }
        localStorage.setItem("cartList", JSON.stringify(existingCart));
        toast.success("Item added to local cart!");
        if (action === "buy") {
          navigate("/cart"); // replace with your desired route
        }
      } else {
        await mutateAsync(jersey);
        if (action === "buy") {
          navigate("/cart"); // replace with your desired route
        }
      }
      location.reload();
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
          <div className=" flex justify-center md:justify-normal  md:w-2/3">
            <img className="w-1/2  rounded-lg" src={jerseyImage} alt="" />
          </div>
          <div className=" flex flex-col md:flex-row items-center lg:gap-10">
            <form
              onSubmit={handleSubmit(handleBuy)}
              className="space-y-6 ng-untouched ng-pristine ng-valid"
            >
              <div>
                <h1 className=" font-bold md:text-2xl ">{jerseyName}</h1>
                <p className=" md:text-xl font-medium ">Price : {price}</p>
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
              <div className=" flex justify-center items-center md:justify-normal md:items-natural gap-2 md:gap-6">
                <div className="flex divide-x-2 rounded">
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
                <button className=" md:text-xl font-medium md:font-bold bg-cyan-500 rounded-xl p-1 md:p-2">
                  Add Cart
                </button>
                <div>
                  <button
                    type="submit"
                    onClick={handleSubmit((data) => handleBuy(data, "buy"))}
                    className=" inline-block md:hidden bg-green-600 md:text-xl font-medium  md:font-bold p-1 md:p-3 rounded-lg "
                  >
                    BUY NOW
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={handleSubmit((data) => handleBuy(data, "buy"))}
                  className=" hidden md:inline-block bg-green-600 md:text-xl font-medium  md:font-bold p-1 md:p-3 rounded-lg "
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
