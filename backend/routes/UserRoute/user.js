const User = require("./.././../models/User");
const CryptoJS = require("crypto-js");
const router = require("express").Router();
const nodemailer = require("nodemailer");
const JWT = require("jsonwebtoken");
const {
  verifyTokenAndAdmin,
  verifyToken,
  verifyTokenAndAuthorization,
} = require("./verifyToken");
// Send Email
const sendEmail = (receiverName, receiverEmail, recieverOtp) => {
  // Step 1
  // let transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: process.env.USER, // TODO: your gmail account
  //     pass: process.env.PASS, // TODO: your gmail password
  //   },
  // });

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    requireTLS: true,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  // let transporter = nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  //   port: 587,
  //   secure: false, // true for 587, false for other ports
  //   requireTLS: true,
  //   auth: {
  //     user: process.env.USER,
  //     pass: process.env.PASS,
  //   },
  // });

  // let mailOptions = {
  //     from: 'from@gmail.com',
  //     to: 'to@gmail.com',
  //     subject: 'Sending Email using Node.js',
  //     text: 'That was easy!'
  // };

  // transporter.sendMail(mailOptions, function(error, info){
  //     if (error) {
  //        console.log(error);
  //     } else {
  //         console.log('Email sent: ' + info.response);
  //     }
  // });
  // Step 2
  let mailOptions = {
    from: "abbilearn019@gmail.com", //  email sender
    to: receiverEmail, // email receiver
    subject: "SERB Confirmation",
    html: `Dear ${receiverName}, your OTP for <b>SERB</b> Verification is:  <h1>${recieverOtp}</h1>
    <br /> Please provide the same OTP you got here in the verification form to confirm that this account belongs to you. Thanks`,
  };
  //  Step 3
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return console.log(err);
    }
    return console.log("Email sent successfully");
  });
};

// Register a new User

router.post("/register", async (req, res) => {
  const { profileImage, fullName, email, password, dob, gender } = req.body;
  // Check if user already exist
  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    res.status(409).json("User is already exist");
    return;
  } else {
    let encryptPassword =
      password &&
      CryptoJS.AES.encrypt(password, process.env.CRYPTO_SEC).toString();
    try {
      const newUser = new User({
        profileImage,
        fullName,
        email,
        password: encryptPassword,
        dob,
        gender,
        otpCode: Math.floor(1000 + Math.floor(Math.random() * 9000)),
      });
      const savedUser = await newUser.save();
      // Send Verification Email
      res
        .status(200)
        .json({ message: "User Succssfully Registered", usr: savedUser });
      // savedUser &&
      //   sendEmail(savedUser.fullName, savedUser.email, savedUser.otpCode);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
});

// Before login a registered user, make sure to verify the OTP sent to his Email

// router.post("/verification", async (req, res) => {
//   const { email, otpCode } = req.body;

//   try {
//     const checkUserWithOtp = await User.findOne({ email });
//     if (checkUserWithOtp.otpCode === otpCode) {
//       const verifiedUser = await checkUserWithOtp.updateOne({
//         $set: {
//           verified: true,
//         },
//       });
//       res.status(201).json({ message: "Verified Successfully", verifiedUser });
//     } else {
//       res.status(300).json("Invalid OTP");
//     }
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// });

// Login a registered User

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // Check if user exist or not
    if (!user) {
      res.status(401).json("user not found");
      return false;
    } else {
      // Decrypt the password which is stored in Encryption form in database
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.CRYPTO_SEC
      );
      const realPassword = await hashedPassword.toString(CryptoJS.enc.Utf8);
      if (realPassword !== req.body.password) {
        res.status(401).json(" Password is Incorrect");
        return false;
      }
      // else if (realPassword === req.body.password && !user.verified) {
      //   res.status(401).json("User is not verified");
      //   return false;
      // }
      else if (realPassword === req.body.password) {
        // Create Token
        const token = JWT.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SEC,
          { expiresIn: "3d" }
        );
        const { password, otpCode, ...others } = user._doc;
        res.header("token", token).send({ ...others, token });
      }
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Forgotten password
router.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: req.body.email });

    // Check if the user exist with the same email or not
    if (user.email === email) {
      // Fresh OTP
      let freshOtp = Math.floor(1000 + Math.floor(Math.random() * 9000));
      await User.updateOne({
        email,
        $set: {
          otpCode: freshOtp,
        },
      });
      res.status(200).json(freshOtp + " OTP Updated Successfully") &&
        (await sendEmail(user.fullName, user.email, freshOtp));
    } else {
      res.status(400).json({ message: "Email does not exist" });
    }
  } catch (err) {
    res.status(500).json({ message: "Email not exist" });
  }
});

// Verify fresh OTP after forgotton password
router.post("/forgotpassword/verification", async (req, res) => {
  const { email, otpCode } = req.body;

  try {
    const checkUserWithOtp = await User.findOne({ email });
    if (checkUserWithOtp.otpCode === otpCode) {
      res.status(201).json({ message: "Updated OTP Verified Successfully" });
    } else {
      res.status(300).json({ message: "Invalid Updated OTP" });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Resend fresh OTP after forgotton password
router.post("/resend/verification", async (req, res) => {
  const freshOtp = Math.floor(1000 + Math.floor(Math.random() * 9000));
  try {
    const find = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        $set: {
          otpCode: freshOtp,
        },
      },
      { new: true }
    );
    res.status(200).json(find + " OTP Updated Successfully") &&
      (await sendEmail(find.fullName, find.email, freshOtp));
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// New Password
router.post("/forgotpassword/newpassword", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    await User.updateOne({
      email,
      $set: {
        password: CryptoJS.AES.encrypt(
          newPassword,
          process.env.CRYPTO_SEC
        ).toString(),
      },
    });

    res.status(201).json({ message: "Passwored changed successfulyy" });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get all Users
router.get("/all", verifyTokenAndAdmin, async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// get single user Details
router.get("/details/singleuser/:userId", async (req, res) => {
  try {
    const getUser = await User.findById(req.params.userId);
    res.status(200).json(getUser);
  } catch (err) {
    res.status(400).json("User not found");
  }
});

// Get all Users
router.get("/profile/:userId", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Delete a User
router.delete("/delete/:userId", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    res.status(201).json("User Deleted Successfully!!!");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Update a User
// TODO: Add this token again. Resolve the issue with the token
router.put(
  "/edit/:userId",
  /*verifyTokenAndAuthorization, */ async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(201).json(updatedUser);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
);

// export router
module.exports = router;
