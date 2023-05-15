import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import { endpoint, token, config } from "../../endpoint";
import axios from "axios";
import { useParams } from "react-router-dom";
import loaderW from "../../assets/images/loader-white.gif";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import logo from "../../assets/images/zd-logo.gif";
import forgot from "../../assets/images/forgot.gif";
import pass from "../../assets/images/pass.gif";
import invalidgif from "../../assets/images/invalid.gif";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { AnimatePresence, motion } from "framer-motion";
import { ModalAnimation } from "../../endpoint";

export default function ForgotPassword() {
  const history = useHistory();
  const [verified, setVerified] = useState(false);
  const [modal, setModal] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [fail, setFail] = useState(false);

  const { resetToken } = useParams();

  useEffect(() => {
    axios
      .get(`${endpoint}/reset_token?token=${resetToken}`)
      .then((res) => {
        console.log(res.data.msg);
        setVerified(true);
        // setTimeout(() => {
        //   history.push("/");
        // }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setModal(true);
        setInvalid(true);
        setTimeout(() => {
          history.push("/");
        }, 3000);
      });
  }, []);

  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  function handleSubmit() {
    // const data = {
    //   password: newPassword.password,
    //   new_password: newPassword.confirmPassword,
    // };

    // axios.post(`${endpoint}/password`, { data }, config);

    if (
      newPassword.password === "" ||
      newPassword.password !== newPassword.confirmPassword
    ) {
      setPasswordError("Password doesn't match");
    } else if (newPassword.password.length < 8) {
      setPasswordError("Password should be 8 characters long");
    } else {
      let data = {
        token: resetToken,
        password: newPassword.password,
      };
      console.log(data);
      axios
        .post(`${endpoint}/password/reset/token`, { data })
        .then((res) => {
          console.log(res.data.msg);
          setModal(true);
          setTimeout(() => {
            history.push("/");
          }, 3000);
          setVerified(true);
        })
        .catch((err) => {
          console.log(err);
          setFail(false);
        });
    }
  }
  setTimeout(() => {
    setPasswordError("");
  }, 3000);

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
          className={`${invalid ? "bg-purple" : "bg-white"} pop-modal`}
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
              className={`fw-600 ${
                invalid ? "bg-white purple" : "bg-linearlr"
              }   col-5 col-md-6 col-xl-4 mx-auto text-center p-2 mt-0`}
              style={{
                borderRadius: "0px 0px 10px 10px",
                boxShadow: "0px 5px 10px #0000005e",
              }}
            >
              {invalid ? "Invalid Token" : "Successful!"}
            </p>
            <img
              className={`mx-auto bg-white rounded-circle modal-gif ${
                invalid && "li-shadow"
              }`}
              src={invalid ? invalidgif : pass}
            />
            <div
              className={`mx-auto fw-600 activate-text text-center ${
                invalid ? "white mt-3" : "purple"
              }`}
            >
              {invalid
                ? "Please try again!"
                : "Your password changed succesfully!"}
            </div>
          </div>
        </Box>
      </Modal>
    );
  };

  return (
    <>
      {verified ? (
        <>
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
              <div className="text-dark pb-5 col-11 my-4 bg-white px-3 fw-600 bg-white br-15 li-shadow col-md-10 d-flex flex-column align-justify-center position-relative">
                <img
                  className="position-absolute d-none d-sm-block zd-log"
                  style={{
                    left: 0,
                    top: 0,
                    // width: "20%",
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
                  Forgot password?
                </p>
                <img className=" my-3 mx-auto forgot-gif" src={forgot} />{" "}
                <div className="bg-white rounded">
                  <div class="mb-3">
                    <label
                      for="exampleFormControlInput1"
                      class="form-label purple"
                    >
                      New password
                    </label>
                    <input
                      type="password"
                      className="form-control no-out"
                      id="exampleFormControlInput1"
                      onChange={(e) =>
                        setNewPassword({
                          ...newPassword,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div class="mb-3">
                    <label
                      for="exampleFormControlInput1"
                      class="form-label purple"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control no-out"
                      id="exampleFormControlInput1"
                      onChange={(e) =>
                        setNewPassword({
                          ...newPassword,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                  {passwordError !== "" && (
                    <p className="text-danger">{passwordError}</p>
                  )}
                </div>
                <div
                  className="br-10 bg-linearlr mb-2 li-shadow fw-700 py-2 px-4 text-center cursor-pointer"
                  // onClick={handleActivation}
                  onClick={handleSubmit}
                >
                  Change password
                </div>
                {fail && (
                  <div className="mx-auto col-19 my-2">
                    <Box>
                      <Collapse in={fail}>
                        <Alert
                          severity="error"
                          action={
                            <IconButton
                              aria-label="close"
                              color="inherit"
                              size="small"
                              onClick={() => {
                                setFail(false);
                              }}
                            >
                              <CloseIcon fontSize="inherit" />
                            </IconButton>
                          }
                          sx={{ mb: 2, backgroundColor: "#ff9494" }}
                        >
                          Error changing password! Try again after sometime.
                        </Alert>
                      </Collapse>
                    </Box>
                  </div>
                )}
              </div>
            </div>
            <AnimatePresence> {modal && <ModalBody />}</AnimatePresence>
          </div>
        </>
      ) : (
        <div className="d-flex flex-column align-justify-center vh-100">
          <div className="h-25 d-flex align-justify-center ">
            <img src={loaderW} className="" width="90%" height="90%" />
          </div>
          <div className="h1 text-white fw-bold">Verifiying...</div>
          <AnimatePresence> {modal && <ModalBody />}</AnimatePresence>
        </div>
      )}
    </>
  );
}
