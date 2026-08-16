import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useCommonAxios from "../hooks/useCommonAxios";
import useAuthFire from "../hooks/useAuthFire";
import Swal from "sweetalert2";
import axios from "axios";
import EachCart from "../components/EachCart";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
  // console.log(cartList?.length, "cart length");
  // console.log(cartList, "cart lengthd");
  // setInterval(() => {
  //   if (cartList?.length < 1) navigate("/newArrival");
  // }, 3000);

  useEffect(() => {
    if (!user?.email) return;
    const getData = async () => {
      const { data } = await commonAxios(`/carts/${user?.email}`);
      // console.log(data, "data get");
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
          (item) => item.productId !== _id,
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
  // console.log( cartList,'dfsasdf sa') ;

  const { mutate } = useMutation({
    mutationFn: async (customer) => {
      return await commonAxios.post("/oderconfirm", customer);
    },
    onSuccess: () => {
      navigate("/payment/success");
      Swal.fire({
        title: "Thank You For Oder",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
    onError: () => {
      toast.error("error paise");
    },
  });
  const product = carts?.length ? carts : cartList;
  const totalPrice = product.reduce((total, p) => {
    return total + Number(p.price || 0) * Number(p.count || 0);
  }, 0);
  console.log(product, "price", totalPrice);
  const handlecheckout = async (event) => {
    event.preventDefault();
    const form = event.target;
    const customerName = form.name.value;
    const phone = form.phone.value;
    const anothernumber = form.anothernumber.value;
    const fulladdress1 = form.fulladdress1.value;
    const DelivaryInstraction = form.DelivaryInstraction.value;
    const deliveryArea = form.deliveryArea.value;
    const paymentMethod = form.paymentMethod.value;

    console.log(
      "  name",
      customerName,
      "phone:",
      phone,
      "anotpp:",
      anothernumber,
      "add:",
      fulladdress1,
      "deli:",
      DelivaryInstraction,
      product,
      "paisi chekout11",
      deliveryArea,
      paymentMethod,
    );
    const customer = {
      customerName,
      phone,
      anothernumber,
      fulladdress1,
      DelivaryInstraction,
      deliveryArea,
      paymentMethod,
      product,
      totalPrice
    };

    if (paymentMethod=="ক্যাশ অন ডেলিভারি") {
      console.log(paymentMethod,"pailam viteore")
      mutate(customer);
    }else if(paymentMethod=="অনলাইন পেমেন্ট"){
      // navigate("/onlinepayment");
      fetch(`${import.meta.env.VITE_API_URL}/onlinepayment`, {
        method: "POST",
        headers: { "content-type": "application/json"},
        body : JSON.stringify(customer)
      })
      .then((res)=> res.json())
      .then((result) =>{
        window.location.replace(result.url)
        console.log(result)
      })
    }
  };
  return (
    <div className=" flex flex-col md:flex-row md:gap-5 p-2 md:px-20 md:py-3  ">
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
      <div className="p-1 md:p-6 rounded-md">
        <form
          onSubmit={handlecheckout}
          noValidate=""
          action=""
          className="container flex flex-col mx-auto rounded-md "
        >
          <fieldset className="p-2 rounded-md shadow-sm  dark:bg-gray-50">
            <div className="space-y-2 mb-4 md:mb-10 col-span-full lg:col-span-1">
              <p className="text-xl ">
                অর্ডার <span className=" text-green-600">কনফার্ম </span> করতে,
                অনুগ্রহ করে নিচের ফর্মটি সম্পূর্ণভাবে পূরণ করুন।
              </p>
            </div>
            <div className="grid grid-cols-6 gap-3 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label
                  htmlFor="name"
                  className="text-sm md:text-xl md:font-medium"
                >
                  নাম*
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="আপনার নাম"
                  className="w-full md:p-3 rounded-md bg-white border border-cyan-950 focus:ring focus:ring-opacity-5"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label
                  htmlFor="phone"
                  className="text-sm md:text-xl md:font-medium"
                >
                  মোবাইল নম্বর*
                </label>
                <input
                  required
                  id="phone"
                  type="text"
                  name="phone"
                  placeholder="নম্বর"
                  className="w-full md:p-3 bg-white border border-cyan-950 rounded-md focus:ring focus:ring-opacity-5"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label
                  htmlFor="anothernumber"
                  className="text-sm md:text-xl md:font-medium"
                >
                  বিকল্প মোবাইল নম্বর (যদি থাকে):
                </label>
                <input
                  id="anothernumber"
                  type="anothernumber"
                  name="anothernumber"
                  placeholder="নম্বর"
                  className="w-full bg-white border border-cyan-950 md:p-3 rounded-md focus:ring focus:ring-opacity-5"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label
                  htmlFor="fulladdress1"
                  className="text-sm md:text-xl md:font-medium"
                >
                  ডেলিভারির সম্পূর্ণ ঠিকানা*
                </label>
                <input
                  required
                  id="fulladdress1"
                  type="text"
                  name="fulladdress1"
                  placeholder="গ্রাম/ওয়ার্ড, স্থানীয় বাজার, ইউনিয়ন/পৌরসভা, থানা, জেলা"
                  className="w-full bg-white border border-cyan-950 md:p-3 rounded-md focus:ring focus:ring-opacity-5"
                />
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="DelivaryInstraction"
                  className=" md:text-xl md:font-medium "
                >
                  ডেলিভারি ম্যানের জন্য অতিরিক্ত নির্দেশনা:
                </label>
                <input
                  id="DelivaryInstraction"
                  type="text"
                  name="DelivaryInstraction"
                  placeholder="না লিখলেও সমস্যা নেই"
                  className="w-full bg-white border border-cyan-950 md:p-3 rounded-md focus:ring focus:ring-opacity-5"
                />
              </div>
            </div>
            <div className=" space-y-3 mt-4">
              <div className="space-y-1 text-left mr-4">
                <p className="text-sm dark:text-gray-600">
                  ডেলিভারি চার্জ: ঢাকার মধ্যে ৬০ টাকা, সারা বাংলাদেশ ১২০ টাকা
                </p>
              </div>
              <div className="space-y-1 text-right mr-4 ">
                <select
                  name="deliveryArea"
                  defaultValue="ঢাকার বাইরে"
                  className="select select-neutral bg-white"
                >
                  <option value="ঢাকার মধ্যে">ঢাকার মধ্যে</option>
                  <option value="ঢাকার বাইরে">ঢাকার বাইরে (অন্য জেলা)</option>
                </select>
              </div>
              <div className="space-y-1 text-start">
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="ক্যাশ অন ডেলিভারি"
                    className="radio radio-primary"
                    defaultChecked
                  />
                  ক্যাশ অন ডেলিভারি
                </label>

                <br />

                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="অনলাইন পেমেন্ট"
                    className="radio radio-primary"
                  />
                  অনলাইন পেমেন্ট
                </label>
              </div>
            </div>

            <div className=" mt-4">
              <p>
                সর্বমোট :
                <span className="font-semibold"> {totalPrice} টাকা</span>
              </p>
            </div>
            <div className="flex justify-center mt-6 space-x-4">
              <button className=" btn px-6 py-2 border rounded-md dark:bg-green-600 dark:text-gray-50 dark:border-violet-600">
                <span className=" text-white">অর্ডার কনফার্ম</span>
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Cart;
