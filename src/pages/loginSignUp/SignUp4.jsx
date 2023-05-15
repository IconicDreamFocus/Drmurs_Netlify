import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Avatar from "@mui/material/Avatar";
import avatarImg from "../../assets/images/no_profile.png";
import Button from "@mui/material/Button";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { styled } from "@mui/material/styles";
import logo from "../../assets/images/zd.jpg";
import IconButton from "@mui/material/IconButton";
import { signup4 } from "../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import bgVideo from "../../assets/images/bg.mp4";
import EditIcon from "@mui/icons-material/Edit";
import { endpoint, config } from "../../endpoint";
import axios from "axios";
import zdroundfinal from "../../assets/images/zdroundfinal.gif";
import loaderW from "../../assets/images/loader-white.gif";
import loaderP from "../../assets/images/loader-color.gif";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

import bg from "../../assets/images/bg_img.jpeg";
import Img1 from "../../assets/images/logo3.png";

const line = "Way to ZD !";
const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      yoyo: 20,
    },
  },
};

const NextbuttonVariants = {
  hover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255,255,255)",
    boxShadow: "0px 0px 6px rgb(0,0,0)",
    transition: {
      yoyo: 1,
    },
  },
};

const backarrow = {
  hover: {
    scale: 1.2,
    transition: {
      yoyo: 10,
    },
  },
};

const Input = styled("input")({
  display: "none",
});

export default function Sign_Up_4() {
  const fileRef = useRef(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [reLoad, setReLoad] = useState(false);
  const [fileInput, setFileInput] = useState(null);
  const [signUpDp, setSignUpDp] = useState({});
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  setTimeout(() => {
    setError(false);
  }, 3000);

  useEffect(() => {
    console.log(signUpDp.id);
  }, [signUpDp]);

  const {
    loggedIn,
    user,
    username,
    gender,
    phone,
    password,
    hobby,
    email,
    interest,
    avatar,
  } = useSelector((state) => state.user);

  const handlePicFile = () => {
    if (uploadFile !== null) {
      // const data = {
      //   display_picture: uploadFile,
      // };

      dispatch(
        signup4({
          avatar: uploadFile,
        })
      );

      var formdata = new FormData();
      formdata.append("display_picture", fileInput.files[0], uploadFile);

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch(
        "https://zilliondreamz.com/api/signup_display_picture",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setSignUpDp(result.data);
        })
        .catch((err) => console.log(err));

      // axios
      //   .post(`${endpoint}/signup_display_picture`, data, {
      //     headers: {
      //       "content-type": "multipart/form-data",
      //     },
      //   })
      // .then((response, result) => {
      //   console.log(response);
      //   console.log(result);
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    }
  };

  const handleSubmit = () => {
    if (uploadFile === null || uploadFile === "") {
      setError(true);
    } else {
      const data = {
        //user: user,
        gender: parseInt(gender) + 1,
        phone: phone,
        hobbies: hobby,
        foi: interest,
        username,
        email,
        password,
        profile_pic_id: signUpDp.id,
      };
      dispatch(
        signup4({
          loggedIn: true,
          data,
        })
      );
      // console.log(data);
      console.log(data);
      axios
        .post(
          `${endpoint}/signup`,
          { data },
          config
          // {
          //   headers: {
          //     "Content-Type": "application/form-data",
          //   },
          // }
        )
        .then((res) => {
          console.log(res);
          if (res.status == 201) {
            setTimeout(() => history.push("/"), 10000);
            setSuccess(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    handlePicFile();
  }, [uploadFile]);
  setTimeout(() => setReLoad(true), 1000);

  return (
    <>
    {/* <div style={{ background: `url("${bg}")no-repeat center/cover` }}> */}
      <video className="bg-login" id="video" autoPlay="autoplay" muted loop>
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}> */}
      <img
        src={zdroundfinal}
        width="60%"
        className="d-none d-md-block position-absolute zd-logo"
        style={{ left: "-30px", transform: "scale(1.5)" }}
      />
      {/* <div className="d-none d-md-block position-absolute zd-logo">
        <img
          src={Img1}
          width="40%"
          className=""
          style={{ transform: "scale(1.5)" }}
        />
      </div> */}
      {/* </motion.div> */}
      <motion.section
        className="d-flex justify-content-center justify-content-lg-end align-items-center min-vh-100 mx-3 pe-lg-5"
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 60, delay: 1 }}
      >
        <div className="white-box d-flex bg-body flex-column mr-3 justify-content-between rounded-4">
          <div className="text-center d-lg-none mb-1">
            <img width="85%" src={logo} alt="logo" />
          </div>
          {/* <div className="d-flex bg-primary flex-column justify-content-around h-75"> */}
          <motion.div
            className="hel-zil mb-5 bg-linearlr text-white rounded-3 p-2 text-center"
            style={{ letterSpacing: "0.5 rem" }}
            variants={sentence}
            initial="hidden"
            animate="visible"
          >
            {line.split("").map((char, index) => {
              return (
                <motion.span key={char + "-" + index} variants={letter}>
                  {char}
                </motion.span>
              );
            })}
          </motion.div>
          {success && (
            <div className="mx-auto col-12 my-2">
              <Box>
                <Collapse in={success}>
                  <Alert
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setSuccess(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2, backgroundColor: "#9effe2" }}
                  >
                    Please check your entered mail for verification
                  </Alert>
                </Collapse>
              </Box>
            </div>
          )}
          <motion.p
            className="step-into purple text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, ease: "easeInOut" }}
          >
            LAST STEP
          </motion.p>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            className="d-flex flex-column justify-content-evenly align-items-center pb-5"
            animate={{ opacity: 1, x: 5 }}
            transition={{ delay: 3.3 }}
          >
            <div>
              {!signUpDp.url && uploadFile ? (
                <div className="col-12 d-flex align-justify-center">
                  <img
                    className="my-3"
                    src={loaderP}
                    width="20%"
                    height="20%"
                  />
                </div>
              ) : (
                <Avatar
                  alt="uploaded"
                  src={signUpDp.url ? signUpDp.url : avatarImg}
                  sx={{ width: 75, height: 75, margin: "0 auto" }}
                />
              )}
              <motion.p
                className="create-acc text-center mt-3 purple"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, ease: "easeInOut" }}
              >
                CHOOSE YOUR AVATAR
              </motion.p>
            </div>
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={(e) => {
                  setUploadFile(URL.createObjectURL(e.target.files[0]));
                  // setUploadFile(e.target.files[0]);
                  setFileInput(e.target);
                }}
                ref={fileRef}
              />
              <Button
                variant="contained"
                className=" create-acc bg-linearlr text-white "
                component="span"
                endIcon={signUpDp.url ? <EditIcon /> : <CameraAltIcon />}
              >
                {signUpDp.url ? "Change" : "Upload From Gallery"}
              </Button>
            </label>
            {error && (
              <p className="val-error ms-2 mt-1 text-danger">
                Please Upload Image
              </p>
            )}
          </motion.div>
          {/* </div> */}

          {/* <div className="text-center"> */}
          <motion.button
            className="create-acc btn mt-4 rounded-pill mx-auto bg-linearlr text-white px-3"
            type="button"
            initial={{ opacity: 0, y: 300 }}
            animate={{ opacity: 1, y: 5 }}
            transition={{ delay: 4.5, ease: "circOut" }}
            variants={NextbuttonVariants}
            whileHover="hover"
            onClick={handleSubmit}
          >
            Finish
          </motion.button>
          {/* </div> */}
          <div className="justify-content-between d-flex">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 5 }}
              transition={{ delay: 4.6 }}
              variants={backarrow}
              whileHover="hover"
            >
              <IconButton
                aria-label="delete"
                onClick={() => history.push("/SignUp3")}
              >
                <ArrowBackIosNewIcon
                  className="arrow-icon"
                  style={{ color: "#A11CF9", fontSize: "20px" }}
                />
              </IconButton>
            </motion.div>
            <motion.div
              className="create-acc purple text-decoration-none p-2"
              style={{ fontSize: "15px" }}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 5 }}
              transition={{ delay: 4.7 }}
            >
              STEP 4/4
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
