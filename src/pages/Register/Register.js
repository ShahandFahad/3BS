import React, { useState } from "react";
import { publicRequest } from "../../requestMethods";
import { profileImages } from "./profileImage";
import "./Register.css";
import { useLocation, useNavigate } from "react-router";
import { loader } from "../../loader";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN } from "../../redux/User/userTypes";
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
          profileImage: profileImages[Math.floor(Math.random(0, 19) * 19)],
          fullName,
          email,
          password,
          dob: birthDay + " " + birthMonth + ", " + birthYear,
          gender,
        });
        navigate("/verifyotp", { state: { Email: newUser.data.email } });
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err.response.data);
        setError(err.response.data);
      }
    }
  };

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
          <h2 className="logo">SERB</h2>
          <p className="desc">
            Register Yourself to Sell, Exchange or Buy Products
          </p>
          {/* inputs */}
          <div className="inputs">
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
            {/* DOB */}
            <div className="inputs__box" style={{ width: "100%" }}>
              <p>Date of Birth</p>
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
            </div>

            {/* Gender */}
            <div className="inputs__box" style={{ width: "100%" }}>
              <p>Gender</p>
              <select onChange={(e) => setGender(e.target.value)}>
                <option hidden>Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <p style={{ fontSize: "13px", color: "var(--primary-color)" }}>
              By clicking Sign Up, you agree to our Terms, Privacy Policy and
              Cookies Policy. You may receive SMS notifications from us and can
              opt out at any time.
            </p>
            {/* Form Footer */}
            <div className="form__footer">
              <button onClick={handleRegistration}>
                {loading ? (
                  <img src={loader} width={15} height={15} />
                ) : (
                  "Register Now"
                )}
              </button>
              <p>
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
    </div>
  );
}

export default Register;
