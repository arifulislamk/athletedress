import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import useCommonAxios from "../hooks/useCommonAxios";
import { toast } from "react-toastify";

const SignUp = () => {
  const commonAxios = useCommonAxios() ;
  const navigate = useNavigate();
  const { register , handleSubmit } = useForm()
  const { createuser } = useContext(AuthContext);


  const { mutateAsync } = useMutation({
    mutationFn : async (info) => {
      const {data} = await commonAxios.post("/register",info) ;
      console.log(data,"ddd")
      if(data.token){
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", data.usertype);
        localStorage.setItem("email", data.email);
      }
      return data ;
    },
    onSuccess : () => {
      console.log("User create Succesfull")
      toast.success("User Create Succesful");
      navigate("/");
      location.reload()
    }
  })
  const handleSignupBtn = data => {
    const { name, email, password,number} = data ;
    console.log(name, email, password)

      try {
        const info = { name ,number, email, password , usertype: "Customer"} ;
        mutateAsync(info)
      } catch(err) {
        console.log(err) ;
      }

      //  createuser(email, password)
      //  .then( res => {
      //   console.log(res.user,'Registration Done')
      //  })
      //  .catch(error => {
      //   console.log(error) ;
      //  })
    }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to Athlete Dress</p>
        </div>
        <form
          onSubmit={handleSubmit(handleSignupBtn)}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                {...register("name")}
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Number
              </label>
              <input
                type="text"
                name="number"
                {...register("number")}
                placeholder="Enter Your Phone number"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            {/* <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Select Image:
              </label>
              <input
                required
                type="file"
                id="image"
                name="image"
                accept="image/*"
              />
            </div> */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                { ...register("email")}
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                {...register("password")}
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-rose-500 w-full rounded-md py-3 text-white"
            >
                continue
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Signup with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <button
          className=" disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </button>
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-rose-500 text-gray-600"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
