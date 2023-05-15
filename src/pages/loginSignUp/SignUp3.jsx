import logo from "../../assets/images/zd.jpg";
import { motion } from "framer-motion";
import { makeStyles } from "@mui/styles";
import {
  TextField,
  Link,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import { createTheme } from "@mui/material/styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup3 } from "../../slices/userSlice";
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
  const classes = useStyles();
  const [reLoad, setReLoad] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const [data, setData] = useState([
    {
      name: "Artainment",
      selected: false,
      img: require("../../assets/icons/artainment.svg").default,
    },
    {
      name: "Education",
      selected: false,
      img: require("../../assets/icons/education.svg").default,
    },
    {
      name: "Entrepreneur",
      selected: false,
      img: require("../../assets/icons/entrepreneur.svg").default,
    },
    {
      name: "Food",
      selected: false,
      img: require("../../assets/icons/food.svg").default,
    },
    {
      name: "Sports",
      selected: false,
      img: require("../../assets/icons/sports.svg").default,
    },
    {
      name: "Tourism",
      selected: false,
      img: require("../../assets/icons/tourism.svg").default,
    },
  ]);

  const [interests, setInterests] = useState([]);

  const handleChangeDrop = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    setInterests(typeof value === "string" ? value.split(",") : value);
  };

  const [error, setError] = useState({
    interestError: "",
  });

  const handleSubmit = () => {
    data.map((data, index) => {
      data.selected && interests.push(index + 1);
    });
    console.log(interests);
    let noofErrors = 0;
    let errorMessage = { ...error };

    if (interests.length === 0) {
      errorMessage.interestError = "Select your Interests";
      noofErrors += 1;
    }

    setError(errorMessage);

    setTimeout(() => {
      setError({
        interestError: "",
      });
    }, 2000);

    if (noofErrors === 0) {
      const storeData = {
        interest: interests,
      };
      dispatch(signup3(storeData));

      history.push("/signup4");
    }
  };
  setTimeout(() => setReLoad(true), 1000);

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
          <motion.h3
            className="w-100 p-1 mb-0"
            style={{ letterSpacing: "0.5 rem" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            <motion.p
              className="py-2 text-center bg-linearlr text-white rounded-3 w-100"
              variants={sentence}
              style={{ fontSize: "30px" }}
              initial="hidden"
              animate="visible"
            >
              {line1.split("").map((char, index) => {
                return (
                  <motion.span
                    key={char + "-" + index}
                    variants={letter}
                    className="py-4"
                  >
                    {char}
                  </motion.span>
                );
              })}
            </motion.p>
          </motion.h3>
          <div
            className="input w-100 p-2
          d-flex flex-column justify-content-between align-items-left
          text-left"
          >
            <div className="email-phone pb-2 d-flex flex-column">
              <FormControl className="col-12 mb-1 ">
                <motion.h6
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.8, ease: "easeInOut" }}
                  className="step-into col-12 purple mt-2"
                >
                  FIELD OF INTEREST
                </motion.h6>
                {/* <Select
                    className=" d-none col-12 "
                    multiple
                    value={interests ? interests : ""}
                    onChange={handleChangeDrop}
                    // input={<OutlinedInput label="Name" />}
                    // MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, interests, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select> */}
                <div className="row align-justify-center mt-2">
                  {data.map((interest, index) => (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.7 + index / 10 }}
                      className="col-4 m-2 rounded align-justify-center cursor-pointer"
                      data-value={interest.name}
                      style={
                        interest.selected
                          ? { boxShadow: "0px 0px 10px #a11cf9" }
                          : {}
                      }
                      onClick={() => {
                        let duplicate = [...data];
                        duplicate[index].selected = !duplicate[index].selected;
                        setData(duplicate);
                      }}
                    >
                      <img
                        className=""
                        width="100%"
                        height="60%"
                        style={{ transform: "scale(1)" }}
                        src={interest.img}
                      />
                      <div className="interest purple text-center">
                        {interest.name}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </FormControl>

              {error.interestError !== "" && (
                <p className="val-error text-start text-danger">
                  {error.interestError}
                </p>
              )}
            </div>
          </div>
          <motion.button
            initial={{ opacity: 0, y: 500 }}
            animate={{ opacity: 1, y: 5 }}
            transition={{ delay: 4.5, ease: "circOut" }}
            className="create-acc btn rounded-pill bg-linearlr text-white px-4"
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
                onClick={() => history.push("/SignUp2")}
              >
                <ArrowBackIosNewIcon
                  className="arrow-icon"
                  style={{ color: "#A11CF9", fontSize: "20px" }}
                />
              </IconButton>
            </motion.div>
            <div className="SignUp2-input-login purple fw-bold ">
              <motion.div
                className="create-acc purple text-decoration-none"
                style={{ fontSize: "15px" }}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 5 }}
                transition={{ delay: 4.7 }}
              >
                STEP 3/4
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
