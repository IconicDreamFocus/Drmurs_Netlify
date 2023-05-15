import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { motion } from "framer-motion";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { endpoint, config } from "../../endpoint";

const style = {
  active: {
    backgroundColor: "white",
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  },
  inactive: {
    backgroundColor: "transparent",
  },
  divTop: {
    borderBottomRightRadius: "20% 100%",
    backgroundImage: "linear-gradient(to right,#a11cf9,#7201c8)",
    width: "100%",
    height: "5px",
  },
  divBottom: {
    borderTopRightRadius: "20% 100%",
    backgroundImage: "linear-gradient(to right,#a11cf9,#7201c8)",
    width: "100%",
    height: "5px",
  },
  mainDiv: {
    initial: {
      x: "2vw",
    },
    animation: {
      x: 0,
    },
    transition: { type: "spring", stiffness: 30, delay: 0.25 },
  },
};

const endDivs = {
  hidden: {
    x: "100w",
  },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 30, delay: 0.5 },
  },
};

const PurpleTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    color: "#fff",
    background: "linear-gradient(to right, #a11cf9, #7201c8)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

export default function Navbar({ active, logUser, tab }) {
  // const [logUser, setLogUser] = useState(null);
  const { loggedIn, user, username, avatar } = useSelector(
    (state) => state.user
  );
  // useEffect(() => {
  //   axios
  //     .get(`${endpoint}/me`, config)
  //     .then((res) => {
  //       console.log(res.data.data);
  //       setLogUser(res.data.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const [data, setData] = useState([
    {
      path: "/my-profile",
      src1: require("../../assets/images/profilepurp.svg").default,
      src2: require("../../assets/images/profile.svg").default,
      name: "Profile",
      height: 55,
      width: 55,
      className: "ms-1 rounded-circle",
    },
    {
      path: "/news-feed",
      src1: require("../../assets/images/homepurp.svg").default,
      src2: require("../../assets/images/home.svg").default,
      name: "Memoir",
      width: 45,
      height: 50,
      className: "",
    },
    {
      path: "/future-studio",
      src1: require("../../assets/images/future studio purp.svg").default,
      src2: require("../../assets/images/future studio white.svg").default,
      name: "Future Studio",
      width: 45,
      height: 50,
      className: "",
    },
    {
      path: "/dream-community",
      src1: require("../../assets/images/dream community purp.svg").default,
      src2: require("../../assets/images/dream community.svg").default,
      name: "Dream Community",
      width: 45,
      height: 42,
      className: "ms-1",
    },
    {
      path: "/zillion-villa",
      src1: require("../../assets/images/villapurp.svg").default,
      src2: require("../../assets/images/villa white.svg").default,
      name: "Zillion Villa",
      width: 45,
      height: 50,
      className: "",
    },
    {
      path: "/settings",
      src1: require("../../assets/images/settingspurp.svg").default,
      src2: require("../../assets/images/settings.svg").default,
      name: "Settings",
      width: 45,
      height: 50,
      className: "",
    },
  ]);
  // console.log(dp);

  // useEffect(() => {
  //   console.log(logUser.attachment.url);
  // }, [logUser]);
  // useEffect(() => {
  //   axios
  //     .get(`${endpoint}/me`, config)
  //     .then((res) => {
  //       console.log(res.data.data);
  //       setLogUser(res.data.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const history = useHistory();

  return (
    <>
      {/* {logUser ? ( */}
      <div
        className="py-5 d-flex flex-column text-center overflow-hidden justify-content-evenly align-items-center position-fixed"
        style={{
          height: "100vh",
          backgroundImage: "linear-gradient(to right,#a11cf9,#7201c8)",
          width: "5.5vw",
        }}
      >
        {data.map((data, index) => (
          <motion.div
            key={index}
            className={`d-flex flex-column justify-content-start`}
            style={{ width: "100%" }}
          >
            {active == index ? (
              <motion.div className="bg-white">
                <motion.div className="py-2" style={style.divTop}></motion.div>
              </motion.div>
            ) : (
              <div className="">
                <Box className="py-2"></Box>
              </div>
            )}
            <motion.div
              className={`py-3 pe-4 ${
                index != 0
                  ? "ps-xl-2 ps-xxl-3 ps-md-1 ms-xxl-2 ms-1 "
                  : "ps-xl-1 ms-xl-2"
              } cursor-pointer`}
              style={active == index ? style.active : style.inactive}
              onClick={() => {
                history.push(data.path);
                // window.location = data.path;
              }}
              initial={active == index && style.mainDiv.initial}
              animate={active == index && style.mainDiv.animation}
              transition={active == index && style.mainDiv.transition}
            >
              <PurpleTooltip title={data.name} placement="right">
                <motion.img
                  height={`${tab ? data.height - 5 : data.height}vw`}
                  width={`${tab ? data.width - 5 : data.width}vw`}
                  className={data.className}
                  src={active == index ? data.src1 : data.src2}
                  style={{ scale: index == 4 ? 1.2 : 1 }}
                  alt={data.name}
                  initial={active != index && { x: "-10vw", opacity: 0 }}
                  animate={active != index && { x: 0, opacity: 1 }}
                  transition={
                    active != index && {
                      type: "spring",
                      stiffness: 50,
                      delay: 0.25 + index / 10,
                      duration: 2,
                    }
                  }
                  whileHover={{
                    scale: index != 4 ? 1.2 : 1.4,
                    transition: {
                      delay: 0,
                    },
                  }}
                />
              </PurpleTooltip>
            </motion.div>
            {active == index ? (
              <motion.div className="bg-white">
                <motion.div
                  className="py-2"
                  style={style.divBottom}
                ></motion.div>
              </motion.div>
            ) : (
              <div className="">
                <Box className="py-2"></Box>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      {/* ) : (
        <div>Load..</div>
      )} */}
    </>
  );
}
