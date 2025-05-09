import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setuser] = useState();
  const [showdropdown, setShowdropdown] = useState(false);
  useEffect(() => {
    const email = localStorage.getItem("email");
    const userType = localStorage.getItem("userType");
    const info = { email, userType };
    setuser(info);
    // console.log(info);
  }, []);

  const logout = () => {
    localStorage.clear();
    setuser(false);
    reloadPage();
  };

  // console.log(user, "user ache");

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/newArrival">New Arrival</NavLink>
      </li>
      {user && (
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
    <div>
      <div className="navbar text-cyan-950 shadow-lg bg-slate-300">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div>
            <img
              className="w-36 border-2 border-cyan-400 rounded-md"
              src="/src/assets/logo.jpg"
              alt=""
            />
          </div>
          <Link to={"/"} className="btn btn-ghost text-xl">
            AthleteDress
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal text-xl px-1">
            {links}
            {/* <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/newArrival"}>New Arrival</Link>
            </li>
            <li>
              <Link to={"/contactUs"}>Contact Us</Link>
            </li> */}
          </ul>
        </div>
        <div></div>
        <div className="navbar-end">
          <div className=" lg:mr-5">
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
                        className="lg:h-12 w-10 md:w-[50px] rounded-3xl "
                        src={user.photoURL}
                        alt=""
                      />
                    ) : (
                      <img
                        className="lg:h-12 w-10 md:w-[50px] rounded-3xl "
                        src='https://i.ibb.co.com/5gQKsL1m/images.jpg'
                        alt=""
                      />
                    )}
                  </div>

                  {showdropdown && (
                    <div className="flex flex-col absolute left-[20%] md:left-[70%] lg:left-[80%]  lg:right-2  bg-blue-300 w-52 shadow-md p-5 rounded-md">
                      <p className=" border-b-2 border-black mb-4 text-center font-bold">
                        {user.displayName ? user.displayName : "Name Not Found"}
                      </p>
                      <Link to="/profile">
                        {" "}
                        <button className=" hover:underline">Profile</button>
                      </Link>
                      <button onClick={logout} className="hover:underline ">
                        LogOut
                      </button>
                    </div>
                  )}
                </div>
              )}
              <button
                onClick={logout}
                className="btn  btn-xs md:btn-md bg-orange-400  "
              >
                LogOut
              </button>
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
    </div>
  );
};

export default Navbar;
