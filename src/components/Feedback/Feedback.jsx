import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { Button, TextField, Typography } from "@mui/material";
import { publicRequest, userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";
import { loader } from "../../loader";
import { useNavigate } from "react-router";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function HoverRating({ userToId }) {
  const [value, setValue] = React.useState(0.5);
  const [hover, setHover] = React.useState(-1);
  const user = useSelector((state) => state.user);
  const [desc, setDesc] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate("/");

  // add new rating
  const addRating = async () => {
    try {
      setLoading(true);
      const all = publicRequest.post(`/feedback/add`, {
        userId: userToId,
        feedbackById: user._id,
        feedbackByUsername: user.fullName,
        feedbackByPic: user.profileImage,
        rating: value,
        description: desc,
      });
      setLoading(false);
      console.log(all);
      navigate("/currentuserprofile");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Box
        sx={{
          width: 200,
          display: "flex",
        }}
      >
        <Rating
          name="hover-feedback"
          value={value}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {value !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
        )}
      </Box>
      <div style={{ width: "100%" }}>
        <TextField
          id="outlined-multiline-static"
          label="Description..."
          multiline
          rows={4}
          style={{
            width: "100%",
            margin: "10px 0",
          }}
          onChange={(e) => setDesc(e.target.value)}
        />

        <Button variant="contained" onClick={addRating}>
          {!loading ? "Submit Review" : "loading..."}
        </Button>
      </div>
    </>
  );
}
