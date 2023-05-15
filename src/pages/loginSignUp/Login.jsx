import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Img from "../../assets/images/zd.jpg";
import Img1 from "../../assets/images/logo3.png";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import {
  InputAdornment,
  IconButton,
  TextField,
  InputBase,
  Dialog,
  DialogContent,
  Button,
} from "@mui/material";
// import IconButton from "@mui/material/IconButton";
// import InputBase from "@mui/material/InputBase";
// import Dialog from "@mui/material/Dialog";
// import DialogContent from "@mui/material/DialogContent";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
import { login } from "../../slices/userSlice";
import { useDispatch } from "react-redux";
import { Loader } from "../../components/Common";
// import bg from "../../assets/images/bg_img.jpeg";
//import bg from "../../assets/images/bg.mp4";
import bg from "../../assets/images/finalBg.mp4";
// import bg from "../../assets/images/zd-round.gif";
// import zd__round from "../../assets/images/zd__round.gif";
// import { io } from "socket.io-client";
import roundzd from "../../assets/images/roundzd.gif";
import Box from "@mui/material/Box";
import { endpoint, token, config, chatpoint, roomId } from "../../endpoint";
//import zdroundfinal from "../../assets/images/zdroundfinal.gif";
import zdroundfinal1 from "../../assets/images/drmursRound.jpg";
import Modal from "@mui/material/Modal";
import axios from "axios";
import invalidgif from "../../assets/images/invalid.gif";
import notactivate from "../../assets/images/notactivated.gif";
import loaderW from "../../assets/images/loader-white.gif";
import loaderP from "../../assets/images/loader-color.gif";
import { NetworkErr } from "../../components/Common";
import { AnimatePresence, motion } from "framer-motion";
import { ModalAnimation } from "../../endpoint";

const line1 = "Hello User!";
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

const LoginbuttonVariants = {
  hover: {
    scale: 1.1,
    // textShadow: "0px 0px 8px rgb(255,255,255)",
    // boxShadow: "0px 0px 6px rgb(0,0,0)",
    backgroundImage: "linear-gradient(to right, #9c18f5, #7402cb)",
    transition: {
      yoyo: 1,
    },
  },
};

export default function Login({ setAuthToken }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [activateErr, setActivateErr] = useState(false);
  const [userToken, setUserToken] = useState(token);
  const [modal, setModal] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [netErr, setNetErr] = useState(false);
  const [forgotMail, setForgotMail] = useState({
    mailId: "",
    isMailSet: false,
  });

  // useEffect(() => {
  //   const tok = localStorage.getItem("token");
  //   if (tok)
  //     setTimeout(() => {
  //     history.push("/news-feed");
  //   }, 2000);
  // }, [userToken]);

  const handleClose = () => {
    setOpen(false);
  };

  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const [error, setError] = useState({
    usernameError: "",
    passwordError: "",
  });

  const resetModal = () => {
    setTimeout(() => {
      setModal(false);
    }, 3000);
  };

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === "enter") {
      const form = event.target.form;
      const index = [...form].indexOf(event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  };

  const handleSubmit = () => {
    setActivateErr(false);

    let noofErrors = 0;
    let errorMessage = { ...error };

    if (values.username === null || values.username === "") {
      errorMessage.usernameError = "Username cannot be empty";
    }

    if (values.password === null || values.password === "") {
      errorMessage.passwordError = "Password cannot be empty";
    }

    setError(errorMessage);

    setTimeout(() => {
      setError({
        usernameError: "",
        passwordError: "",
      });
    }, 3000);

    Object.values(errorMessage).map((val) => {
      if (val !== "") {
        noofErrors += 1;
      }
    });

    if (noofErrors === 0) {
      const data = {
        email_username: values.username,
        password: values.password,
      };
      axios
        .post(`${endpoint}/login`, { data })
        .then((res) => {
          console.log(res);
          // console.log(res.headers["x-auth-token"]);
          window.localStorage.setItem("token", res.headers["x-auth-token"]);
          window.localStorage.setItem("dp", res.data.data.public_url);
          // var soc = io.connect(chatpoint, roomId);
          // sessionStorage.setItem("chatSocket", soc);
          // sessionStorage.setItem("chatSocket", JSON.stringify(soc));
          // setTimeout(() => {
          window.location = "/welcome";
          // }, 2000);
          setUserToken(res.headers["x-auth-token"]);
          setTimeout(() => setAuthToken(res.headers["x-auth-token"]), 1000);
        })
        .catch((err) => {
          // console.log(err.err);
          console.log(err);
          if (
            err == "Error: Request failed with status code 401" ||
            err == "Error: Request failed with status code 403"
          ) {
            setModal(true);
            resetModal();
          } else if (err == "Error: Request failed with status code 400") {
            setModal(true);
            setActivateErr(true);
            resetModal();
          } else if (err == "Error: Network Error") setNetErr(true);
          else console.log(err);
          // }
        });
      const dispatchData = {
        user: values.username,
        password: values.password,
      };
      dispatch(login(dispatchData));
    }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  setTimeout(() => {
    setLoading(false);
  }, 3200);

  function handleForgotSubmit() {
    // const data = {
    //   token: tok,
    //   password: confirmPassword,
    // };

    // axios.post(`${endpoint}/password/reset/token`, { data }, config);

    if (forgotMail.mailId.includes("@")) {
      let data = { email_username: forgotMail.mailId };

      axios
        .post(`${endpoint}/reset_token`, { data })
        .then((res) => {
          console.log(res.data.msg);
          resetError();
          setForgotMail({ ...forgotMail, isMailSet: true });
        })
        .catch((err) => {
          console.log(err);
          setForgotError("Enter the verified email address!!");
          resetError();
        });
    } else {
      setForgotError("Invalid Email");
      resetError();
    }
  }

  const resetError = () => {
    setTimeout(() => setForgotError(""), 4000);
  };

  const ModalBody = () => {
    return (
      <Modal
        open={modal}
        onClose={() => {}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="d-flex justify-content-center align-items-center py-sm-5 mx-2 mx-md-3 mx-lg-4 mx-lg-5"
      >
        <Box
          component={motion.div}
          {...ModalAnimation}
          className={`${activateErr ? "bg-purple" : "bg-white"} pop-modal`}
          sx={{
            // position: "absolute",
            // top: "50%",
            // left: "50%",
            // transform: "translate(-50%, -50%)",
            overflowY: "scroll",
            // border: "3px solid #fff",
            outline: "none",
            borderRadius: 10,
            boxShadow: 24,
            px: 4,
          }}
        >
          <div className="d-flex flex-column justify-content-center">
            <p
              className={`fw-600 col-8 col-md-6 col-xl-4 mx-auto text-center p-2 mt-0 ${
                activateErr ? "bg-white purple" : " bg-linearlr"
              }`}
              style={{
                borderRadius: "0px 0px 10px 10px",
                boxShadow: "0px 5px 10px #0000005e",
              }}
            >
              {activateErr ? "Not Activated" : "Invalid Credentials"}
            </p>
            <img
              className={`mx-auto bg-white rounded-circle modal-gif ${
                activateErr ? "li-shadow" : ""
              }`}
              src={activateErr ? notactivate : invalidgif}
              width={activateErr && "70%"}
              height={activateErr && "70%"}
            />
            <div
              className={`mx-auto fw-600 modal-text  ${
                activateErr ? "text-white mt-4" : "purple"
              }`}
            >
              {activateErr
                ? "Email account not Verified"
                : "Enter valid username and password!"}
            </div>
          </div>
        </Box>
      </Modal>
    );
  };

  const vRef = useRef();
  const setPlayBack = () => {
    vRef.current.playbackRate = 0.5;
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* // <div style={{ background: `url("${bg}")no-repeat center/cover` }}> */}
          <AnimatePresence>
            {netErr && <NetworkErr netErr={netErr} />}
          </AnimatePresence>
          <video
            className="bg-login"
            // width="100vw"
            // height="100vh"
            id="video"
            autoPlay="autoplay"
            muted
            ref={vRef}
            onCanPlay={() => setPlayBack()}
            loop
          >
            <source src={bg} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* <div className="position-absolute overflow-hidden"> */}
          {/* <img
            src={bg}
            // height="100%"
            style={{width:"100%",height:"100%"}}
            // width="100%"
            className="position-absolute"
            // style={{ left: "-30px", transform: "scale(1.5)" }}
          /> */}
          {/* </div> */}
          <div className="loginLogo" style={{overflow : "hidden", backgroundColor: "blue"}}>
            <img
              src={zdroundfinal1}
              width="10%"
              className="d-none d-md-block position-absolute zd-logo"
              style={{ right: "30px", top: "40%", transform: "scale(2.2)", borderRadius: "50%",objectFit: "cover",
              opacity: "0.9" }}
            />
          </div>
          {/* <div className="d-none d-md-block position-absolute zd-logo">
            <img
              src={Img1}
              width="40%"
              className=""
              style={{ transform: "scale(1.5)" }}
            />
          </div> */}
          <form>
            <div
              className="d-flex justify-content-center justify-content-md-end align-items-center min-vh-100 mx-3 pe-md-5"
              style={{ overflowY: "auto" }}
            >
              <motion.div
                className="white-box d-flex bg-body flex-column justify-content-between overflow-auto rounded-4 flex-shrink"
                initial={{ x: "100vw" }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 60, delay: 0.5 }}
              >
                {/* <div
                className="d-flex flex-column justify-content-between bg-body px-5 me-lg-4 pt-5 rounded-4 h-md-25 w-100 w-md-50 w-lg-25"
                style={{ height: "36rem", width: "21rem" }}
              > */}
                {/* <img src={Img} className="d-md-none" alt="logo" /> */}
                <motion.div
                  className=" mb-5 mt-1 text-white bg-linearlr rounded-3 p-2 text-center"
                  variants={sentence}
                  initial="hidden"
                  animate="visible"
                >
                  {line1.split("").map((char, index) => {
                    return (
                      <motion.span
                        key={char + "-" + index}
                        variants={letter}
                        className="hel-zil"
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </motion.div>
                <motion.p
                  className="step-into purple m-0 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3, ease: "easeInOut" }}
                >
                  STEP INTO YOUR DREAMS
                </motion.p>
                <div className="d-flex flex-column justify-content-evenly h-50">
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 5 }}
                    transition={{ delay: 3.3 }}
                  >
                    <InputBase
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 5 }}
                      transition={{ delay: 3.3 }}
                      id="outlined-adornment"
                      type={"text"}
                      style={{
                        borderColor: "#b442ff",
                      }}
                      value={values.username}
                      onKeyDown={handleEnter}
                      onChange={(e) =>
                        setValues((pre) => ({
                          ...pre,
                          username: e.target.value,
                        }))
                      }
                      className="form-control mb-1 rounded-pill p-2 create-acc"
                      placeholder="Username"
                      endAdornment={
                        <InputAdornment>
                          <PersonIcon
                            style={{
                              color: "C0C0C0",
                              fontSize: "1.5rem",
                            }}
                          />
                        </InputAdornment>
                      }
                    />
                    {error.usernameError !== "" && (
                      <p className="val-error text-danger">
                        {error.usernameError}
                      </p>
                    )}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 5 }}
                    transition={{ delay: 3.6 }}
                  >
                    <InputBase
                      id="outlined-adornment"
                      type={values.showPassword ? "text" : "password"}
                      className="form-control mb-1 rounded-pill p-2 create-acc"
                      style={{ borderColor: "#b442ff" }}
                      value={values.password}
                      onChange={(e) =>
                        setValues((pre) => ({
                          ...pre,
                          password: e.target.value,
                        }))
                      }
                      onKeyPress={(e) => {
                        e.key === "Enter" && handleSubmit();
                      }}
                      placeholder="Password"
                      endAdornment={
                        <InputAdornment>
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <VisibilityIcon
                                style={{ color: "C0C0C0", fontSize: "1.5rem" }}
                              />
                            ) : (
                              <VisibilityOffIcon
                                style={{ color: "C0C0C0", fontSize: "1.5rem" }}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {error.passwordError !== "" && (
                      <p className="val-error text-danger">
                        {error.passwordError}
                      </p>
                    )}
                  </motion.div>
                  <motion.button
                    initial={{ opacity: 0, y: 300 }}
                    animate={{ opacity: 1, y: 5 }}
                    transition={{ delay: 3, ease: "circOut" }}
                    variants={LoginbuttonVariants}
                    whileHover="hover"
                    type="button"
                    className="create-acc btn mb-3 px-4 rounded-pill bg-linearlr text-white mx-auto mb-lg-3"
                    onClick={handleSubmit}
                  >
                    Login
                  </motion.button>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3 }}
                    onClick={() => setOpen(true)}
                    className="create-acc cursor-pointer purple text-center"
                  >
                    Forgot Password?
                  </motion.p>
                </div>
                {/* </div> */}
                <motion.div
                  initial={{ opacity: 0, y: 300 }}
                  animate={{ opacity: 1, y: 5 }}
                  transition={{ delay: 3, ease: "circOut" }}
                >
                  <Box
                    initial={{ opacity: 0, y: 300 }}
                    animate={{ opacity: 1, y: 5 }}
                    transition={{ delay: 3, ease: "circOut" }}
                    className="create-acc cursor-pointer mb-5 col-12 text-center p-2 rounded-4"
                    sx={{
                      "&:hover": {
                        color: "white",
                        backgroundImage:
                          "linear-gradient(to right, #a11cf9, #7201c8)",
                      },
                    }}
                    onClick={() => history.push("/signup1")}
                  >
                    Create Account
                  </Box>
                </motion.div>
              </motion.div>
              <AnimatePresence>{modal && <ModalBody />}</AnimatePresence>
            </div>
          </form>
        </>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          {forgotMail.isMailSet ? (
            <div className="purple activate-text">
              Verification mail is sent to your Email
            </div>
          ) : (
            <>
              <TextField
                id="outlined-basic"
                label="Enter your Email"
                variant="standard"
                sx={{ width: "100%", mb: "20px" }}
                onChange={(e) =>
                  setForgotMail({ ...forgotMail, mailId: e.target.value })
                }
              />
              {forgotError !== "" && (
                <p className="text-danger">{forgotError}</p>
              )}
              <Button
                variant="contained"
                className="bg-linearlr text-white white"
                onClick={handleForgotSubmit}
              >
                Submit
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
