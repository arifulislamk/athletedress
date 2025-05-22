import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthFire from "../hooks/useAuthFire";
import { FaShoppingCart } from "react-icons/fa";
import useCommonAxios from "../hooks/useCommonAxios";
import useAdmin from "../hooks/useAdmin";

const Navbar = () => {
  const { user, logOut } = useAuthFire();
  const [showdropdown, setShowdropdown] = useState(false);
  const commonAxios = useCommonAxios();
  const [isAdmin, isAdminLoading] = useAdmin();
  const logout = () => {
    logOut();
  };
  const [carts, setcarts] = useState([]);
  useEffect(() => {
    if (!user?.email) return;
    const getData = async () => {
      const { data } = await commonAxios(`/carts/${user?.email}`);
      // console.log(data, "data get");
      setcarts(data);
    };
    getData();
  }, [user?.email]);
  const cartList = JSON.parse(localStorage.getItem("cartList")) || [];
  // console.log(carts,user?.email, "ccartsss pailam");

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/newArrival">New Arrival</NavLink>
      </li>
      {user && isAdmin && (
        <>
          {" "}
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/addJersey">Add Jersey</NavLink>
          </li>
          <li>
            <NavLink to="/allStock">All Stock</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/contactUs">Contact Us</NavLink>
      </li>
    </>
  );
  return (
    <>
      <div className="navbar text-cyan-950 shadow-lg bg-slate-300">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn w-6 p-0 btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content text-cyan-950 bg-slate-300 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div>
            <img
              className="w-36 hidden md:block border-2 border-cyan-400 rounded-md"
              src="/logo.jpg"
              alt=""
            />
          </div>
          <Link to={"/"} className="md:py-1 px-2 btn-ghost md:text-xl">
            AthleteDress
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal text-xl px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <div className=" hidden md:block lg:mr-5">
            <label className="flex cursor-pointer md:gap-2">
              <svg
                className="hidden md:inline-block"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <input
                type="checkbox"
                value="synthwave"
                className="toggle theme-controller"
              />
              <svg
                className="hidden md:inline-block"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </label>
          </div>
          {carts?.length > 0 ? (
            <Link to="/cart">
              <button className="btn w-10 p-0 h-10 mr-0.5 md:mr-2 rounded-full btn-sm">
                <FaShoppingCart className="" />
                <div className="">+{carts?.length}</div>
              </button>
            </Link>
          ) : cartList?.length > 0 ? (
            <Link to="/cart">
              <button className="btn w-10 p-0 h-10 mr-0.5 md:mr-2 rounded-full btn-sm">
                <FaShoppingCart className="" />
                <div className="">+{cartList?.length}</div>
              </button>
            </Link>
          ): ""}
          {user ? (
            <>
              {user && (
                <div
                  onMouseEnter={() => setShowdropdown(true)}
                  onMouseLeave={() => setShowdropdown(false)}
                  className="mr-2  z-10"
                >
                  <div>
                    {user?.photoURL ? (
                      <img
                        className="h-12 w-12 md:w-[58px] rounded-full "
                        src={user?.photoURL}
                        alt=""
                      />
                    ) : (
                      <img
                        className="h-12 md:h-14 w-12 md:w-[58px] rounded-full "
                        src="https://i.ibb.co.com/5gQKsL1m/images.jpg"
                        alt=""
                      />
                    )}
                  </div>

                  {showdropdown && (
                    <div className="flex flex-col absolute left-[20%] md:left-[70%] lg:left-[86%]  lg:right-2  bg-blue-300 w-52 shadow-md p-5 rounded-md">
                      <p className=" border-b-2 border-black mb-4 text-center font-bold">
                        {user?.displayName
                          ? user?.displayName
                          : "Name Not Found"}
                      </p>
                      <p className=" border-b-2 border-black mb-4 text-center font-semibold">
                        {user?.email ? user?.email : "email Not Found"}
                      </p>
                      <Link to="/profile">
                        <button className=" hover:underline">Profile</button>
                      </Link>
                      <Link to="/cart">
                        <button className=" hover:underline">My Cart</button>
                      </Link>
                      <Link to="/purchaseHistory">
                        <button className=" hover:underline">
                          Purchase History
                        </button>
                      </Link>
                      <button
                        onClick={logout}
                        className="hover:underline mt-2 md:mt-4 font-bold bg-red-500 md:w-36 rounded-xl text-white "
                      >
                        LogOut
                      </button>
                    </div>
                  )}
                </div>
              )}
              {/* <button
                onClick={logout}
                className="btn  btn-xs md:btn-md  text-white text-xl font-medium bg-cyan-500 rounded-xl  "
              >
                LogOut
              </button> */}
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="btn">Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
