import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useHistory, useParams } from "react-router-dom";
import { endpoint, ModalAnimation } from "../../endpoint";
import logo from "../../assets/images/zd-logo.gif";
import verify from "../../assets/images/mailverify.gif";
import verifiedImg from "../../assets/images/verified.gif";
import invalidgif from "../../assets/images/invalid.gif";
import { AnimatePresence, motion } from "framer-motion";

export default function ActivateToken() {
  const [verified, setVerified] = useState(false);
  const [invalid, setInvaild] = useState(false);
  const { activateToken } = useParams();
  const history = useHistory();

  const handleActivation = () => {
    axios
      .post(`${endpoint}/activate/${activateToken}`)
      .then((res) => {
        console.log(res.data.msg);
        setVerified(true);
        setTimeout(() => {
          history.push("/");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setInvaild(true);
        setTimeout(() => {
          history.push("/signup1");
        }, 3000);
      });
  };

  const ModalBody = () => {
    return (
      <Modal
        open={verified || invalid}
        onClose={() => {}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="d-flex justify-content-center align-items-center py-sm-5 mx-2 mx-md-3 mx-lg-4 mx-lg-5"
      >
        <Box
          component={motion.div}
          {...ModalAnimation}
          className="bg-white pop-modal"
          sx={{
            // position: "absolute",
            // top: "50%",
            // left: "50%",
            // transform: "translate(-50%, -50%)",
            // width: "40vw",
            // height: "60vh",
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
              className="fw-600 bg-linearlr col-5 col-md-6 col-xl-4 mx-auto text-center p-2 mt-0"
              style={{
                borderRadius: "0px 0px 10px 10px",
                boxShadow: "0px 5px 10px #0000005e",
              }}
            >
              {invalid ? "Invalid Token" : " Successful"}
            </p>
            <img
              className="mx-auto bg-white modal-gif"
              src={invalid ? invalidgif : verifiedImg}
            />
            <div className="mx-auto fw-600 purple modal-text mt-2">
              {invalid
                ? "Please try again later!"
                : " Your account verified succesfully!"}
            </div>
          </div>
        </Box>
      </Modal>
    );
  };

  return (
    <div className="bg-linearlr vh-100 w-100 d-flex align-justify-center">
      {/* <div className="bg-purple col-12 pt-3 d-flex align-items-center br-15 position-relative">
        <img
          src={logo}
          className="p-2 bg-white position-absolute"
          style={{
            borderTopLeftRadius: "70% 70%",
            borderTopRightRadius: "70% 70%",
            width: 200,
            height: 200,
            top: 10,
            left: 0,
          }}
        />
        <div className="my-4 py-4 w-100 text-center fw-bold text-white h3">
          Mail Verfication
        </div>
      </div> */}
      <div className="d-flex flex-column align-justify-center col-md-10">
        <div className="text-dark pb-5 col-11 my-4 bg-white px-md-3 fw-600 bg-white br-15 li-shadow col-md-10 d-flex flex-column align-justify-center position-relative">
          <img
            className="position-absolute d-none d-sm-block zd-log"
            style={{
              left: 0,
              top: 0,
              // width: "30%",
              // height: "20%",
              marginLeft: "-50px",
              marginTop: "-20px",
            }}
            src={logo}
          />
          <p
            className="fw-600 bg-linearlr col-7 col-md-3 mx-auto text-center p-2 mt-0"
            style={{
              borderRadius: "0px 0px 10px 10px",
              boxShadow: "0px 5px 10px #0000005e",
            }}
          >
            Confirm Your Mail
          </p>
          <img
            className=" my-3 mx-auto activate-gif"
            src={verify}
            // width="30%"
            // height="30%"
          />
          <div className="fw-600 activate-text purple mt-5 mb-3 col-10 my-4">
            <div className="mb-4">Welcome to Zillion Dreamz!</div>We're excited
            to have you as one of our Zillion family member.<br></br>To start as
            a Zillionaire, click the given button below to verify your email ID.
          </div>
          <div
            className="br-10 bg-linearlr mt-5 mb-2 li-shadow fw-700 py-2 px-4 text-center cursor-pointer"
            onClick={handleActivation}
          >
            Verify your account
          </div>
        </div>
      </div>
      <AnimatePresence>
        {(verified || invalid) && <ModalBody />}
      </AnimatePresence>
    </div>
  );
}
