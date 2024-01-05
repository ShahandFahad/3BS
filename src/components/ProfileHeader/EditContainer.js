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
        <div className="container__content">
          <div className="register__form">
            {/* Close btn */}
            <div
              className="register__form__close"
              onClick={() => setShow(false)}
            >
              <CloseIcon />
            </div>

            <h2 className="logo">
              {details ? "Your Details" : "Edit Profile"}
            </h2>
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
                Details
              </p>
              <p
                onClick={() => setDetails(false)}
                className={!details ? "active" : ""}
              >
                Edit
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
