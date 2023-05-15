import zd from "../assets/images/liquidLogo.gif";
//import zd from "../assets/images/zillion-dreamz-logo.mov";
import zdlogoM from "../assets/images/liquidLogo.gif";
import { Modal, Box } from "@mui/material";
import notactivate from "../assets/images/notactivated.gif";
import EditIcon from "@mui/icons-material/Edit";
import angrygif from "../assets/images/angry.gif";
import freezegif from "../assets/images/freeze.gif";
import heartgif from "../assets/images/heart.gif";
import laughgif from "../assets/images/laugh.gif";
import mindblowngif from "../assets/images/mindblown.gif";
import blankFace from "../assets/images/blank-face.gif";
import { checkVideo, ModalAnimation, months } from "../endpoint";
import InfiniteScroll from "react-infinite-scroll-component";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import loaderP from "../assets/images/loader-color.gif";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const emojies = [laughgif, angrygif, heartgif, freezegif, mindblowngif];

const style = {
  count: {
    fontSize: "1.4rem",
    color: "#671ca0",
    fontWeight: "bolder",
  },
  follow: {
    fontSize: "1rem",
    color: "#671ca0",
    fontWeight: "800",
  },
  count1: {
    fontSize: "1rem",
    color: "#671ca0",
    fontWeight: "bolder",
  },
  follow1: {
    fontSize: "0.8rem",
    color: "#671ca0",
    fontWeight: "800",
  },
  box: {
    border: " 1px solid #000000",
    height: "25vh",
    bordeRradius: "10px",
  },
  grey: {
    color: "#7e7e7e",
    fontSize: "17px",
  },
  clr: {
    color: "#b7c4c3",
  },
  box: {
    width: "100%",
    height: 225,
    borderRadius: "10px",
    color: "white",
    backgroundColor: "#7201c8",
    "&:hover": {
      backgroundColor: "#7402cb",
      opacity: [0.9, 0.8, 0.7],
    },
  },
};

export const NetworkErr = ({ netErr }) => {
  return (
    <Modal
      open={netErr}
      onClose={() => {}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="d-flex justify-content-center align-items-center py-sm-5 mx-2 mx-md-3 mx-lg-4 mx-lg-5"
    >
      <Box
        component={motion.div}
        {...ModalAnimation}
        className="bg-purple pop-modal"
        sx={{
          // position: "absolute",
          // top: "50%",
          // left: "50%",
          // transform: "translate(-50%, -50%)",
          // width: mob ? "90vw" : "40vw",
          // height: mob ? "40vh" : "60vh",
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
            className="fw-600 col-7 col-md-6 col-xl-4 mx-auto text-center p-2 mt-0 bg-white purple"
            style={{
              borderRadius: "0px 0px 10px 10px",
              boxShadow: "0px 5px 10px #0000005e",
            }}
          >
            Network Issue
          </p>
          <img
            className="mx-auto bg-white rounded-circle li-shadow modal-gif"
            src={notactivate}
          />
          <div className="mx-auto fw-600 text-white col-12 text-center mt-4 modal-text">
            Please try again later!
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export function Loader() {
  return (
    <>
      <div
        className="d-none d-md-flex align-items-center w-100"
        style={{ height: "100vh", background: "white" }}
      >
        <img
          src={zd}
          alt="Logo"
          width="100%"
          height="auto"
          className="mx-auto"
        />
        {/* //  <video width="100%" height="auto" autoPlay="autoplay" muted>
          // <source src={zd} type="video/mp4" />
        // </video>  */}
      </div>
      <div
        className="d-flex d-md-none align-items-center w-100"
        style={{ height: "100vh", background: "white" }}
      >
        <img src={zdlogoM} alt="Logo" width="100%" height="auto" />
      </div>
    </>
  );
}

export function ProfileBox({ userData, mob, setModal, edit }) {
  return (
    <div
      className="col-12 col-xl-10 mx-auto bg-linearlr
            position-relative overflow-hidden px-1 d-flex justify-content-md-evenly justify-content-between align-item-start"
      style={{
        borderRadius: "0px 0px 20px 20px",
        boxShaow: "0px 5px 15px #000",
      }}
    >
      {userData && (
        <div className="position-absolute h-100 w-100">
          <img
            src={userData.profile_pic.public_url}
            alt={userData.username}
            width="100%"
            // heigth={!mob && "100%"}
            // className="obj-contain h-100"
            style={{
              opacity: 0.2,
              // top: "50%",
              // left: "50%",
              // transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      )}
      <div
        className="bg-white h-100 p-2 p-md-3 col-3 col-md-2 text-center ms-1 ms-md-0"
        style={{
          borderRadius: "0px 0px 15px 15px",
          zIndex: 2,
          boxShadow: "0px 5px 15px #000",
        }}
      >
        <h3 className="my-0" style={mob ? style.count1 : style.count}>
          {userData.followers_count}
        </h3>
        <h1 className="my-0" style={style.follow}>
          Followers
        </h1>
      </div>
      <div
        className="col-5 col-md-6 d-flex flex-column justify-content-center pt-3"
        style={{
          zIndex: 2,
        }}
      >
        <div
          className=" mx-auto d-flex align-items-end p-0 overflow-hidden"
          style={{
            border: "1px solid #f8f8f8",
            height: " 140px",
            width: " 140px",
            borderRadius: "50%",
            boxShadow: "0px 0px 10px #000",
            background: userData
              ? `url("${userData.profile_pic.public_url}")no-repeat center/cover`
              : "#860cdd",
          }}
        ></div>
        <div className="mt-2 p-1 rounded text-center">
          <div
            className="mx-auto col-12 d-flex align-items-center justify-content-between
                position-relative"
          >
            <div className=" mx-auto d-flex align-items-center justify-content-start">
              <div
                className="text-uppercase fw-bold add-diary"
                style={{
                  textShadow: "0px 0px 10px #000",
                }}
              >
                {userData.username}
              </div>
            </div>
            {edit && (
              <EditIcon
                className="purple cursor-pointer bg-white p-1 rounded-circle position-absolute"
                style={{
                  fontSize: mob ? 25 : 30,
                  right: mob ? -5 : 10,
                  top: mob ? -30 : 0,
                  boxShadow: "0px 0px 10px #000",
                }}
                onClick={() => setModal(true)}
              />
            )}
          </div>
          <p
            className="purple col-10 mt-2 mx-auto bg-white p-2 py-3"
            style={{ borderRadius: 15, boxShadow: "0px 0px 10px #000" }}
          >
            {userData.hobbies}
          </p>
        </div>
      </div>
      <div
        className="bg-white h-100 p-2 p-md-3 col-3 col-md-2 text-center me-1 me-md-0"
        style={{
          borderRadius: "0px 0px 15px 15px",
          zIndex: 2,
          boxShadow: "0px 5px 15px #000",
        }}
      >
        <h3 className="my-0" style={mob ? style.count1 : style.count}>
          {userData.following_count}
        </h3>
        <h1 className="my-0" style={style.follow}>
          Following
        </h1>
      </div>
    </div>
  );
}

export function TimelineUI({
  timeline,
  nodata,
  isMore,
  setPage,
  page,
  mob,
  setTimeline,
}) {
  return (
    <>
      <div className="mt-5 " style={{ borderTop: "2px solid #7201c8" }}>
        <p
          className="fw-bold bg-linearlr col-5 col-md-2 mx-auto text-center p-2 mt-0"
          style={{
            borderRadius: "0px 0px 10px 10px",
            boxShadow: "0px 5px 10px #0000005e",
          }}
        >
          ZD WALL
        </p>
      </div>
      <div className=" col-12 px-xxl-2">
        {/* <div className="d-flex align-items-between justify-content-around row"> */}
        {timeline.length == 0 ? (
          <div className=" d-flex flex-column align-justify-center">
            <img src={nodata} width="30%" />
            <div className="purple">No posts added!</div>
          </div>
        ) : (
          <InfiniteScroll
            className="col-12 row d-flex align-items-between justify-content-around mx-auto"
            dataLength={timeline.length}
            hasMore={isMore}
            // hasMore={true}
            next={() => {
              console.log("next");
              setPage(page + 1); // paginate
            }}
            loader={
              <div className="col-12 d-flex align-justify-center my-5 py-5 h-100">
                <img src={loaderP} width="10%" height="10%" className="my-5" />
              </div>
            }
            // endMessage={
            //   <div className="col-12 d-flex flex-column align-justify-center">
            //     {/* <img src={nodata} width="40%" /> */}
            //     <div className="purple">Caught up</div>
            //   </div>
            // }
          >
            {timeline.map((abc, index) => {
              const d = new Date(abc.posted_at);
              const postedDate = d.getDate();
              const postedMonth = months[d.getMonth()];
              if (abc.attachment) {
                return (
                  <div
                    className={`col-12 py-4 position-relative pb-4 bg-white
                    ${
                      abc.max ? "col-lg-10 mx-auto my-4" : "col-lg-5 px-0 my-2"
                    }`}
                  >
                    {/* <div> */}
                    {(abc.max || mob) && (
                      <div className="ms-2 ms-md-5 mb-1 ps-1 purple fw-bold purple">
                        {abc.text}
                      </div>
                    )}
                    <div
                      className={`col-12 d-flex align-items-start jusitify-content-between jusitify-content-md-center 
                      ${abc.max ? "ms-5" : "ms-0 ms-md-2"}`}
                    >
                      <div
                        className="d-flex col-10 ms-3 ms-md-0 shadow cursor-pointer overflow-hidden position-relative"
                        style={{
                          height: abc.max ? 400 : 255,
                          borderRadius: "10px",
                        }}
                        onClick={() => {
                          if (!mob) {
                            let dup = [...timeline];
                            dup[index].max = !dup[index].max;
                            setTimeline(dup);
                          }
                        }}
                        // style={{ border: "1px solid #000" }}
                      >
                        <Box
                          className="position-absolute col-12"
                          style={{
                            background: abc.attachment
                              ? `url("${abc.attachment.public_url}")no-repeat center/cover`
                              : "",
                            borderRadius: "10px",
                            opacity: 0.3,
                            zIndex: 0,
                            filter: "blur(2px)",
                            height: abc.max && !mob ? 400 : 255,
                          }}
                        ></Box>
                        <Box
                          className="position-absolute col-12 d-flex align-items-end "
                          style={{
                            background: abc.attachment
                              ? `url("${abc.attachment.public_url}")no-repeat center/contain`
                              : "",
                            borderRadius: "10px",
                            zIndex: 1,
                            height: abc.max && !mob ? 400 : 255,
                            // left: 0,
                            // opacity: 0.3,
                            // zIndex: 0,
                            // filter: "blur(2px)",
                          }}
                        >
                          {abc.attachment &&
                            checkVideo.includes(abc.attachment.mimetype) && (
                              <video
                                className="position-absolute"
                                width="100%"
                                height="100%"
                                id="video"
                                autoPlay="autoPlay"
                                muted={abc.max ? "" : "muted"}
                                loop
                                style={{ borderRadius: 25 }}
                              >
                                <source
                                  src={
                                    abc.attachment
                                      ? abc.attachment.public_url
                                      : ""
                                  }
                                  type={abc.attachment.mimetype}
                                />
                                Your browser does not support the video tag.
                              </video>
                            )}
                        </Box>
                        {/* mobile view box*/}
                        {/* <Box
                    className="col-10 bg-linearbt ms-2 d-sm-none"
                    sx={{
                      height: 225,
                      borderRadius: "10px",
                    }}
                  ></Box> */}
                      </div>
                      {abc.emote_count != [] && (
                        <div className=" shadow mb-5 ms-2 ms-lg-4 me-0 mt-2 rounded bg-grey d-flex flex-column justify-content-center align-items-center">
                          <div
                            className={
                              abc.max && abc.emojiOpen
                                ? "mt-2 mb-0 d-flex flex-column align-items-center"
                                : "d-flex flex-column align-items-center"
                            }
                            style={{
                              height: abc.emojiOpen
                                ? abc.max
                                  ? 280
                                  : 160
                                : 50,
                              overflowY: "scroll",
                            }}
                          >
                            {/* <img
                        src={emojies[0]}
                        className="col-12 p-0"
                        style={{ width: "40px", height: "40px" }}
                      />
                      <div
                        className="m-0 purple fw-bold"
                        style={{ fontSize: "8px" }}
                      > 
                        {abc.emote_count[0]}
                      </div>*/}
                            {
                              // abc.emojiOpen &&
                              emojies.map((emoji, ind) => (
                                <>
                                  {/* {ind != 0 && (
                              <> */}
                                  <img
                                    src={emoji}
                                    className="col-12 p-0"
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                    }}
                                  />
                                  <div
                                    className="m-0 purple fw-bold"
                                    style={{ fontSize: "8px" }}
                                  >
                                    {abc.emote_count[ind]
                                      ? abc.emote_count[ind]
                                      : "0"}
                                  </div>
                                  {/* </> 
                            )}*/}
                                </>
                              ))
                            }
                          </div>
                          {!abc.emojiOpen ? (
                            <KeyboardArrowDownIcon
                              className="purple cursor-pointer"
                              onClick={() => {
                                let dup = [...timeline];
                                dup[index].emojiOpen = true;
                                setTimeline(dup);
                              }}
                              style={{ fontSize: 20 }}
                            />
                          ) : (
                            <KeyboardArrowUpIcon
                              className="purple cursor-pointer"
                              onClick={() => {
                                let dup = [...timeline];
                                dup[index].emojiOpen = false;
                                setTimeline(dup);
                              }}
                              style={{ fontSize: 20 }}
                            />
                          )}
                        </div>
                      )}
                      {/* </div> */}
                    </div>

                    {abc.max && (
                      <div className="col-10 mx-auto pe-3 text-right d-flex justify-content-end">
                        <div
                          className=""
                          style={{ opacity: 0.7, fontSize: 10 }}
                        >
                          {postedMonth + " " + postedDate}
                        </div>
                      </div>
                    )}
                  </div>
                );
              } else return null;
              // </>
            })}
          </InfiniteScroll>
        )}
      </div>
    </>
  );
}

export function WelcomePage() {
  const history = useHistory();
  const [change, setChange] = useState(false);
  const [change1, setChange1] = useState(false);
  // useEffect(() => , []);
  setTimeout(() => setChange(true), 2500);
  // setTimeout(() => setChange1(true), 3000);
  setTimeout(() => setChange1(true), 5000);
  setTimeout(() => history.push("/news-feed"), 5800);
  return (
    <div className=" bg-white vh-100 vw-100 d-flex align-justify-center">
      {/* <div
        // initial={{ opacity: 0, x: 30 }}
        // animation={{ opacity: 1, x: 0 }}
        // transition={{ duration: 0.3 }}
        className=" purple fw-600 bg-primary col-10 py-4 "
      >
        Hello Zillionaire!
      </div> */}
      <AnimatePresence>
        {!change && (
          <motion.div
            key="box"
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            exit={{ opacity: 0, x: 0 }}
            className=" purple fw-600 text-wel "
          >
            Hello Zillionaire!
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {change && !change1 && (
          // setTimeout(() => (
          <motion.div
            key="box"
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 1.2 }}
            exit={{ opacity: 0, x: 0 }}
            className=" purple fw-600 position-absolute text-wel"
          >
            Zillion family welcomes you!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
