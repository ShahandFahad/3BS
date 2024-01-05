import { CameraAltOutlined } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { logDOM } from "@testing-library/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loader } from "../../loader";
import { LOG_IN } from "../../redux/User/userTypes";
import { userRequest } from "../../../src/requestMethods";
import { storage } from "../../firebase";
function Edit() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log(user);
  // user data
  const [fullName, setFullName] = useState(user.fullName);
  const [password, setPassword] = useState(user.password);
  const [description, setDescription] = useState(user?.description);
  //   detail or edit
  const [details, setDetails] = useState(true);
  const dispatch = useDispatch();
  // error
  const [error, setError] = useState("");
  // loading
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  //  Set image

  const [image, setImage] = useState(null);
  const [updateImage, setUpdateImage] = useState(user?.profileImage);
  // handle Change
  const handleChange = (e) => {
    setLoadingProfile(true);
    setImage(URL.createObjectURL(e.target.files[0]));
    const uploadTask = storage
      .ref(`/profilePhotos/${e.target.files[0].name}`)
      .put(e.target.files[0]);
    uploadTask.on(
      "state_changes",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (err) => {
        console.log(err);
      },
      async () => {
        const updatedUser = await uploadTask.snapshot.ref.getDownloadURL();
        setUpdateImage(updatedUser);
        setLoadingProfile(false);
        // setLoading(false);
      }
    );
  };

  // Update User
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const finalResult = await userRequest.put(`/user/edit/${user._id}`, {
        fullName,
        description,
        profileImage: updateImage,
      });

      const saveUser = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...saveUser,
          fullName: finalResult.data.fullName,
          description: finalResult.data.description,
          profileImage: finalResult.data.profileImage,
        })
      ) &&
        dispatch({
          type: LOG_IN,
          user: JSON.parse(localStorage.getItem("user")),
        });
      setLoading(false);
      window.location.reload();
      // setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <label htmlFor="profileImg" className="profileImg">
        <input type="file" id="profileImg" onChange={handleChange} />

        {!image ? (
          <img src={user.profileImage} />
        ) : (
          <img src={!loadingProfile ? image : loader} />
        )}
        <CameraAltOutlined />
      </label>

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
        {/* Description */}
        <div className="inputs__box">
          <p>Add Description</p>
          <textarea
            placeholder="Add some description about yourself..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="inputs__box">
          <p>Current Password</p>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="inputs__box">
          <p>New Password</p>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Form Footer */}
        <div className="form__footer">
          <button onClick={handleUpdate}>
            {loading ? "Updating..." : "Update Now"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Edit;
