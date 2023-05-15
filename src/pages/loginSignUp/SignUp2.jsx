import logo from "../../assets/images/zd.jpg";
import { motion } from "framer-motion";
import { makeStyles } from "@mui/styles";
import { TextField, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup2 } from "../../slices/userSlice";
import { useHistory } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import bgVideo from "../../assets/images/bg.mp4";
import zdroundfinal from "../../assets/images/zdroundfinal.gif";

import bg from "../../assets/images/bg_img.jpeg";
import Img1 from "../../assets/images/logo3.png";

const line1 = "Way to ZD !";
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

const next = {
  backgroundColor: "#a11cf9",
  color: "white",
  borderRadius: "10px",
  justifyContent: "center",
  border: "none",
};

const names = [
  "Arts",
  "Science",
  "Music",
  "Business and Management",
  "Computer Science and Information Technology",
  "Education",
  "Environmental, Agricultural, and Physical Sciences",
  "Government and Law",
  "Library and Information Science",
  "Media and Communications",
  "Medical, Healthcare, and Life Sciences",
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    // marginTop: theme.spacing(2),
  },
  root: {
    "& .MuiTextField-root": {
      //   marginTop: theme.spacing(1),
      //   marginBottom: theme.spacing(2),
      width: "100%",
      color: "#a11cf9",
    },
  },
}));

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

function getStyles(name, interests, theme) {
  const theme1 = createTheme({
    palette: {
      primary: {
        main: "#A11CF9",
      },
      white: {
        main: "#ffffff",
      },
      black: {
        main: "#000000",
      },
    },
  });
  return {
    fontWeight:
      interests.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightBold,
    backgroundColor:
      interests.indexOf(name) === -1
        ? theme.palette.white
        : theme1.palette.primary.main,
    color:
      interests.indexOf(name) === -1
        ? theme1.palette.black.main
        : theme1.palette.white.main,
  };
}

export default function SignUp2() {
  const theme = useTheme();
  const [reLoad, setReLoad] = useState(false);
  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();

  const [values, setValues] = useState({
    gender: "",
    phone: "",
    hobby: "",
  });

  const [error, setError] = useState({
    genderError: "",
    phoneError: "",
    hobbyError: "",
  });

  const handleSubmit = () => {
    let noofErrors = 0;
    let errorMessage = { ...error };

    if (values.gender === null || values.gender === "") {
      errorMessage.genderError = "Select your gender";
      noofErrors += 1;
    }

    if (values.phone === "" || values.phone.length !== 10) {
      errorMessage.phoneError = "Phone Number is invalid";
      noofErrors += 1;
    }

    if (values.hobby === "" || values.hobby === "") {
      errorMessage.hobbyError = "Fill something about you";
      noofErrors += 1;
    }

    setError(errorMessage);

    setTimeout(() => {
      setError({
        genderError: "",
        phoneError: "",
        hobbyError: "",
      });
    }, 2000);

    if (noofErrors === 0) {
      dispatch(
        signup2({
          gender: values.gender,
          phone: values.phone,
          hobby: values.hobby,
        })
      );
      history.push("/signup3");
    }
  };
  setTimeout(() => setReLoad(true), 1000);

    const handleEnter = (event) => {
      if (event.key.toLowerCase() === "enter") {
        const form = event.target.form;
        const index = [...form].indexOf(event.target);
        form.elements[index + 1].focus();
        event.preventDefault();
      }
    };

  return (
    <>
      {/* // <div style={{ background: `url("${bg}")no-repeat center/cover` }}> */}
      <video className="bg-login" id="video" autoPlay="autoplay" muted loop>
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
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
      <div className="d-flex justify-content-center justify-content-lg-end align-items-center min-vh-100 mx-3 pe-lg-5">
        <motion.div
          className="white-box d-flex bg-body flex-column mr-3 justify-content-between align-items-center rounded-4"
          // style={{ height: "90vh", width: "24rem" }}
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 60, delay: 1.5 }}
        >
          <div className="text-center d-lg-none mb-1">
            <img width="85%" src={logo} alt="logo" />
          </div>
          <motion.div
            className="w-100 p-1"
            style={{ letterSpacing: "0.5 rem" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            <motion.p
              className="py-2 text-center bg-linearlr text-white rounded-3 w-100"
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
            </motion.p>
          </motion.div>
          <motion.p
            className="step-into purple text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, ease: "easeInOut" }}
          >
            SECOND STEP
          </motion.p>
          <form
            className="input w-100 p-2 
          d-flex flex-column justify-content-evenly h-50 align-items-left
          text-left"
          >
            <motion.div
              className="create-acc py-sm-1 purple"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.8, ease: "easeInOut" }}
            >
              GENDER
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4, ease: "easeInOut" }}
              >
                <div>
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    onKeyDown={handleEnter}
                    value={values.gender ? values.gender : ""}
                    className="d-flex flex-row"
                    onChange={(e) =>
                      setValues((pre) => ({ ...pre, gender: e.target.value }))
                    }
                  >
                    <div className="col-12 col-sm-6">
                      <FormControlLabel
                        className="gender-radio purple col-12 col-sm-6"
                        value="0"
                        control={<Radio style={{ color: "#7201c8" }} />}
                        label="Male"
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <FormControlLabel
                        id="f-radio-button"
                        className="gender-radio purple col-12 col-sm-6"
                        value="1"
                        // style={{fontSize:"25rem"}}
                        control={<Radio style={{ color: "#7201c8" }} />}
                        label="Female"
                      />
                    </div>
                  </RadioGroup>
                  {error.genderError !== "" && (
                    <p className="val-error mt-1 text-start text-danger">
                      {error.genderError}
                    </p>
                  )}
                </div>
              </motion.div>
            </motion.div>

            <div className="email-phone py-2 d-flex flex-column">
              <motion.div
                className="create-acc purple mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.8, ease: "easeInOut" }}
              >
                PHONE NUMBER
              </motion.div>
              <div
                className={classes.root}
                autoComplete="off"
                style={{ color: "#a11cf9" }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4, ease: "easeInOut" }}
                >
                  <TextField
                    color="secondary"
                    variant="standard"
                    onKeyDown={handleEnter}
                    type="number"
                    value={values.phone ? values.phone : ""}
                    onChange={(e) =>
                      setValues((pre) => ({ ...pre, phone: e.target.value }))
                    }
                  />
                  {error.phoneError !== "" && (
                    <p className="val-error mt-1 text-start text-danger">
                      {error.phoneError}
                    </p>
                  )}
                </motion.div>
              </div>
            </div>
            <div className="email-phone py-2 d-flex flex-column">
              <motion.div
                className="create-acc purple mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.8, ease: "easeInOut" }}
              >
                ABOUT
              </motion.div>
              <div
                className={classes.root}
                autoComplete="off"
                style={{ color: "#a11cf9" }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4, ease: "easeInOut" }}
                >
                  <TextField
                    color="secondary"
                    variant="standard"
                    onKeyPress={(e) => {
                      e.key === "Enter" && handleSubmit();
                    }}
                    type="text"
                    value={values.hobby ? values.hobby : ""}
                    onChange={(e) =>
                      setValues((pre) => ({ ...pre, hobby: e.target.value }))
                    }
                  />
                  {error.hobbyError !== "" && (
                    <p className="val-error mt-1 text-start text-danger">
                      {error.hobbyError}
                    </p>
                  )}
                </motion.div>
              </div>
            </div>
          </form>

          <motion.button
            initial={{ opacity: 0, y: 500 }}
            animate={{ opacity: 1, y: 5 }}
            transition={{ delay: 4.5, ease: "circOut" }}
            className=" create-acc btn rounded-pill bg-linearlr text-white px-4 h6"
            type="button"
            variants={NextbuttonVariants}
            whileHover="hover"
            onClick={handleSubmit}
          >
            Next
          </motion.button>

          <div className="col-12 d-flex justify-content-between mt-3">
            <motion.div
              className="back-button1"
              variants={backarrow}
              whileHover="hover"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 5 }}
              transition={{ delay: 4.6 }}
            >
              <IconButton
                aria-label="delete"
                onClick={() => history.push("/SignUp1")}
              >
                <ArrowBackIosNewIcon
                  className="arrow-icon"
                  style={{ color: "#A11CF9" }}
                />
              </IconButton>
            </motion.div>
            <div className="purple fw-bold ">
              <motion.a
                href="#"
                className="create-acc purple text-decoration-none"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 5 }}
                transition={{ delay: 4.7 }}
              >
                STEP 2/4
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
