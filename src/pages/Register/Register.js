import React, { useState, useEffect } from "react";
import { publicRequest } from "../../requestMethods";
import { profileImages } from "./profileImage";
import "./Register.css";
import { useLocation, useNavigate } from "react-router";
import { loader } from "../../loader";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN } from "../../redux/User/userTypes";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logo from "./3BS-logo.jpg";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [gender, setGender] = useState("");
  // loading
  const [loading, setLoading] = useState(false);

  // Error
  const [error, setError] = useState("");
  // Navigate Hook
  const navigate = useNavigate();
  const { state } = useLocation();

  // Message on success registeration
  const [userRegistered, setUserRegistered] = useState(false);
  const [failedRegistered, setFailedRegistered] = useState(false);
  const notify = () => {
    if (userRegistered)
      return toast.info("🦄 Registeration Successfull !!!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    if (failedRegistered)
      return toast.warn("🦄 Registeration Failed !!!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
  };

  // User Registration
  const handleRegistration = async () => {
    if (
      !fullName ||
      !email ||
      !password ||
      !cpassword ||
      !birthDay ||
      !birthMonth ||
      !birthYear ||
      !gender
    ) {
      setError("Please Fill The Required Fields");
      return false;
    } else if (password !== cpassword) {
      setError("Confirm password does not match");
      return false;
    } else {
      try {
        setLoading(true);
        const newUser = await publicRequest.post("/user/register", {
          // Setting Default Profile image: Last index imndex image
          // profileImage: profileImages[Math.floor(Math.random(0, 19) * 19)],
          profileImage: profileImages[profileImages.length - 1],
          fullName,
          email,
          password,
          dob: birthDay + " " + birthMonth + ", " + birthYear,
          gender,
        });
        // navigate("/verifyotp", { state: { Email: newUser.data.email } });
        // Set user register status for toast display
        if (newUser.status === 200) {
          setUserRegistered(true);
          // notify();
          // navigate("/login");
        } else {
          // navigate("/");
          setFailedRegistered(true);
        }

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err.response.data);
        setError(err.response.data);
      }
    }
  };

  // Display toast based on registeration status
  useEffect(() => {
    // Display Success or Warninig Toast: and Then Wait for 1.5 Sec the naviagate to other route
    if (userRegistered) {
      notify();
      // wait 1.6 sec
      const timer = setTimeout(() => {
        navigate("/login"); //goto
      }, 1600);

      return () => clearTimeout(timer);
    }

    if (failedRegistered) {
      notify();
      // Wait 1.6sec
      const timer = setTimeout(() => {
        navigate("/"); // goto
      }, 1600);

      return () => clearTimeout(timer);
    }
  }, [userRegistered, failedRegistered]);

  const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const years = [];
  for (var i = 1990; i <= 2022; i++) {
    years.push(i);
  }
  return (
    <div className="register">
      <div className="overlay">
        <div className="register__form">
          {error && (
            <div className="error__box">
              <p>{error}</p>
            </div>
          )}
          {/* <h2 className="logo">SERB</h2>
          <p className="desc">
            Register Yourself to Sell, Exchange or Buy Products
          </p> */}

          <div className="logo border shadow-lg sm:flex items-center justify-center">
            <img
              className="border rounded-full boxsh shadow-lg sm:w-24 sm:h-24 w-16 h-16 md:w-42 md:h-42 overflow-hidden"
              src={logo}
              alt="logo"
            />
            <p className="text-sm mt-4 sm:mt-0 md:ml-4">
              Register Yourself to Sell, Exchange, or Buy Products
            </p>
          </div>

          {/* inputs */}
          <div className="inputs">
            <div className="w-full">
              <div className="inputs__box">
                <p>Full Name</p>
                <input
                  type="text"
                  placeholder="Example"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="inputs__box">
                <p>Email</p>
                <input
                  type="text"
                  placeholder="someone@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="inputs__box">
                <p>Password</p>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="inputs__box">
                <p>Confirm Password</p>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                />
              </div>
            </div>
            {/* DOB */}
            <div className="inputs__box" style={{ width: "100%" }}>
              <p>Date of Birth</p>
              <div className="flex justify-between flex-wrap">
                <select onChange={(e) => setBirthDay(e.target.value)}>
                  <option hidden>DD</option>
                  {days.map((d) => (
                    <option value={d < 10 ? `0${d}` : d}>
                      {d < 10 ? `0${d}` : d}
                    </option>
                  ))}
                </select>
                <select onChange={(e) => setBirthMonth(e.target.value)}>
                  <option hidden>MM</option>
                  {months.map((m) => (
                    <option value={m}>{m}</option>
                  ))}
                </select>
                <select onChange={(e) => setBirthYear(e.target.value)}>
                  <option hidden>YY</option>
                  {years.map((y) => (
                    <option value={y}>{y}</option>
                  ))}
                </select>

                {/* Gender */}
                {/* <div className="inputs__box" style={{ width: "100%" }}> */}
                {/* <p>Gender</p> */}
                <select onChange={(e) => setGender(e.target.value)}>
                  <option hidden>Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {/* </div> */}
              </div>
            </div>

            {/* Form Footer */}
            <div className="w-full flex flex-col gap-3 items-center justify-center">
              <button
                className="w-64 px-4 py-2 inline-flex items-center justify-center rounded-md bg-gray-800 font-semibold text-white shadow-lg hover:shadow-gray-500/50 mt-3"
                onClick={handleRegistration}
              >
                {loading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Register Now"
                )}
              </button>

              <p className="text-base">
                Already have an account?{" "}
                <Link to="/login" style={{ color: "dodgerblue" }}>
                  Login
                </Link>{" "}
                here.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* Toast to be displayed on user registeration: fail or success */}
        <ToastContainer />
      </div>
    </div>
  );
}

export default Register;
