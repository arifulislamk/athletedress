import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCommonAxios from "../hooks/useCommonAxios";
import useAuthFire from "../hooks/useAuthFire";
import Swal from "sweetalert2";
import axios from "axios";
import EachCart from "../components/EachCart";

const Cart = () => {
  const { user } = useAuthFire();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const commonAxios = useCommonAxios();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const [carts, setcarts] = useState([]);

  const cartList = JSON.parse(localStorage.getItem("cartList")) || [];
  console.log(cartList.length, "cart locald");
  if (cartList.length < 1) navigate("/newArrival");

  useEffect(() => {
    if (!user?.email) return;
    const getData = async () => {
      const { data } = await commonAxios(`/carts/${user?.email}`);
      console.log(data, "data get");
      setcarts(data);
      if (!data || data?.length == 0) {
        navigate("/newArrival");
        if (cartList.length > 0 && !user) {
          navigate("/cart");
        }
      }
    };
    getData();
  }, [user?.email]);
  const handleDeleteCart = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("delete", _id);
        axios
          .delete(`${import.meta.env.VITE_API_URL}/allcartsdelete/${_id}`)
          .then((res) => {
            // console.log(res.data);
            if (res.data.deletedCount > 0) {
              const remeningCart = carts.filter((cart) => cart._id !== _id);
              setcarts(remeningCart);
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
            location.reload();
          });
        const existingCart = JSON.parse(localStorage.getItem("cartList")) || [];
        const updatedCart = existingCart.filter(
          (item) => item.productId !== _id
        );
        localStorage.setItem("cartList", JSON.stringify(updatedCart));
        location.reload();
      }
    });
  };

  // console.log(carts?.length, "ksdfssdfs");
  // if (carts?.length == 0 && carts?.length !== undefined)
  // console.log(carts, user?.email, "cartsss pailam");
  if ((cartList.length < 1 && carts?.length < 1) || !carts) {
    return (
      <div className=" mt-6 flex justify-center">
        <span className="loading w-20 text-yellow-400 loading-spinner "></span>
      </div>
    );
  }
  const handlecheckout = async (event) => {
    event.preventDefault();
    const form = event.target;
    const customerName = form.name.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const city = form.city.value;
    const fullAddress = form.address.value;
    console.log(customerName, phone, email, city, fullAddress, "paisi chekout");
  };
  return (
    <div className=" flex flex-col md:flex-row gap-5 p-2 md:px-20 md:py-3  ">
      <div className="flex flex-col border w-full rounded-md border-red-200 mx-auto items-center max-w-3xl p-6 space-y-4 sm:p-10 dark:bg-gray-50 dark:text-gray-800">
        <h2 className="md:text-xl font-semibold">Your cart</h2>
        <ul className="flex flex-col divide-y dark:divide-gray-300">
          {carts && carts.length > 0 ? (
            carts.map((cart) => (
              <EachCart
                key={cart?._id}
                cart={cart}
                handleDeleteCart={handleDeleteCart}
              />
            ))
          ) : cartList.length > 0 ? (
            cartList.map((cart, idx) => (
              <EachCart
                key={cart?._id}
                cart={cart}
                handleDeleteCart={handleDeleteCart}
                user={user}
              />
              // Optionally use: <EachCart cart={cart} />
            ))
          ) : (
            <p className="text-center text-gray-500">Cart is empty.</p>
          )}
        </ul>
      </div>
      <div className="p-6 rounded-md">
        <form
          onSubmit={handlecheckout}
          noValidate=""
          action=""
          className="container flex flex-col mx-auto rounded-md "
        >
          <fieldset className="p-2 rounded-md shadow-sm  dark:bg-gray-50">
            <div className="space-y-2 mb-4 md:mb-10 col-span-full lg:col-span-1">
              <p className="font-medium md:text-xl">Personal Inormation</p>
              <p className="text-sm ">
                Please Enter the full form And
                <span className=" text-green-600"> confrim purchase.</span>
              </p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label
                  htmlFor="firstname"
                  className="text-sm md:text-xl md:font-medium"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="First name"
                  className="w-full md:p-3 rounded-md bg-white border border-cyan-950 focus:ring focus:ring-opacity-5"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label
                  htmlFor="number"
                  className="text-sm md:text-xl md:font-medium"
                >
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  className="w-full md:p-3 bg-white border border-cyan-950 rounded-md focus:ring focus:ring-opacity-5"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label
                  htmlFor="email"
                  className="text-sm md:text-xl md:font-medium"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full bg-white border border-cyan-950 md:p-3 rounded-md focus:ring focus:ring-opacity-5"
                />
              </div>

              <div className="col-span-full sm:col-span-3">
                <label
                  htmlFor="city"
                  className="text-sm md:text-xl md:font-medium"
                >
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  placeholder="city"
                  className="w-full bg-white border border-cyan-950 md:p-3 rounded-md focus:ring focus:ring-opacity-5"
                />
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="address"
                  className=" md:text-xl md:font-medium "
                >
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  placeholder="address"
                  className="w-full bg-white border border-cyan-950 md:p-3 rounded-md focus:ring focus:ring-opacity-5"
                />
              </div>
            </div>

            <div className="space-y-1 text-right mr-4">
              <p>
                Total amount:
                <span className="font-semibold"> 357 Taka</span>
              </p>
              <p className="text-sm dark:text-gray-600">
                Not including taxes and shipping costs
              </p>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-2 border rounded-md dark:border-violet-600"
              >
                Back
                <span className="sr-only sm:not-sr-only"> to shop</span>
              </button>
              <button
                className=" btn px-6 py-2 border rounded-md dark:bg-violet-600 dark:text-gray-50 dark:border-violet-600"
              >
                <span className="sr-only sm:not-sr-only">Continue to </span>{" "}
                 Checkout
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Cart;
