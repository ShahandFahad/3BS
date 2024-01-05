import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { loader } from "../../loader";
import { publicRequest } from "../../requestMethods";
import "./VerifyOtp.css";
function VerifyOtp() {
  const { state } = useLocation();
  const { Email } = state;
  const numOfFields = 3;
  const [completeCode, setCompleteCode] = useState([]);
  const [error, setError] = useState("");
  const [resend, setResend] = useState("");
  // Navigate
  const navigate = useNavigate();
  // loading
  const [loading, setLoading] = useState(false);
  // handleChange
  const handleChange = (e) => {
    const { maxLength, value, name } = e.target;
    const [fieldName, fieldIndex] = name.split("-");
    console.log(value);
    setCompleteCode([...completeCode, value]);

    // Check if they hit the max character length
    if (value.length >= maxLength) {
      // Check if it's not the last input field
      if (parseInt(fieldIndex, 10) < 4) {
        // Get the next input field
        const nextSibling = document.querySelector(
          `input[name=ssn-${parseInt(fieldIndex, 10) + 1}]`
        );

        // If found, focus the next field
        if (nextSibling !== null) {
          nextSibling.focus();
        }
      }
    }
  };
  // count stars
  const count = Email.length - 13;

  // handle Resend
  const handleResend = async () => {
    try {
      const resendOtp = await publicRequest.post("/user/resend/verification", {
        email: Email,
      });
      setResend("Otp has been sent again");
      navigate("/verifyotp", { state: { Email } });
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };

  // handleVerification
  const handleVerification = async () => {
    setLoading(true);
    try {
      const verifyOtp = await publicRequest.post("/user/verification", {
        email: Email,
        otpCode: parseInt(completeCode.join("")),
      });
      navigate("/login");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response.data);
    }
  };

  return (
    <div className="verify">
      <div className="overlay">
        <div className="verify__form">
          {error && (
            <div className="error__box">
              <p>{error}</p>
            </div>
          )}

          <h2 className="logo">SERB</h2>
          <p className="desc">
            Please enter the 4 digits verification code sent to
          </p>
          <p style={{ fontWeight: "bold", color: "var(--primary-color)" }}>
            {Email.slice(0, 2) +
              Array(count).fill("*").join("") +
              Email.slice(Email.length - 11, Email.length)}
          </p>

          {/* inputs */}
          <div className="inputs">
            <div className="inputs__box">
              <input
                type="text"
                name="ssn-1"
                maxLength={1}
                onChange={handleChange}
                autoFocus
              />

              <input
                type="text"
                name="ssn-2"
                onChange={handleChange}
                maxLength={1}
              />
              <input
                type="text"
                name="ssn-3"
                onChange={handleChange}
                maxLength={1}
              />
              <input
                type="text"
                maxLength={1}
                name="ssn-4"
                onChange={handleChange}
              />
            </div>
            {/* Didn't recieve */}

            {/* Form Footer */}
            <div style={{ color: "var(--primary-color)", margin: "20px 0" }}>
              <p style={{ color: "var(--primary-color)" }}>
                Didn’t recieve an OTP?
              </p>
              <p
                style={{
                  color: "var(--primary-color)",
                  textAlign: "center",
                  fontWeight: "bold",
                  textDecoration: "underline",
                  cursor: "pointer",
                  margin: "5px 0",
                }}
                onClick={handleResend}
              >
                Resend OTP
              </p>
              {resend && <p>{resend}</p>}
            </div>
            <div className="form__footer">
              <button onClick={handleVerification}>
                {loading ? (
                  <img src={loader} width={15} height={15} />
                ) : (
                  "Verify"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;
