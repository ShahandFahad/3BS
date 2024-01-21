import React, { useState } from "react";
import { useSelector } from "react-redux";
import { loader } from "../../loader";
import CloseIcon from "@mui/icons-material/Close";
import Details from "./Details";
import Edit from "./Edit";
function EditContainer({ setShow }) {
  const user = useSelector((state) => state.user);

  // user data
  const [fullName, setFullName] = useState(user.fullName);
  const [password, setPassword] = useState(user.password);
  //   detail or edit
  const [details, setDetails] = useState(true);

  // error
  const [error, setError] = useState("");
  // loading
  const [loading, setLoading] = useState(false);
  return (
    <>
      {/* Edit container */}
      <div className="edit__container">
        <div className="container__content mt-10 mb-4">
          <div className="register__form">
            {/* Close btn */}
            <div
              className="register__form__close mt-4"
              onClick={() => setShow(false)}
            >
              <CloseIcon />
            </div>

            <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4 m-4 ">
              {details ? (
                <h2>
                  <pre className="text-white text-center">Your Details</pre>
                </h2>
              ) : (
                <h2 className="text-center text-white text-2xl">
                  <pre className="text-white text-center"> Edit Profile </pre>
                </h2>
              )}
            </div>
            {/* <h2 className="logo">
              {details ? "Your Details" : "Edit Profile"}
            </h2> */}
            {error && (
              <div className="error__box">
                <p>{error}</p>
              </div>
            )}

            {/* Details or Edit */}
            <div className="show__details">
              <p
                onClick={() => setDetails(true)}
                className={details ? "active" : ""}
              >
                <span className="uppercase">Details</span>
              </p>
              <p
                onClick={() => setDetails(false)}
                className={!details ? "active" : ""}
              >
                <span className="uppercase">Edit</span>
              </p>
            </div>

            {
              // Details or Edit
              details ? <Details /> : <Edit />
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default EditContainer;
