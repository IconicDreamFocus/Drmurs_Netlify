import React, { useState } from "react";
import { useSelector } from "react-redux";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Link, useHistory } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import { config, endpoint, socket } from "../../../endpoint";
import { Button, Snackbar, Slide, Alert } from "@mui/material";

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

export default function Settings() {
  const { loggedIn, user, username, password, avatar, gender, email } =
    useSelector((state) => state.user);

  const [opErr, setOpErr] = useState(false);
  const [npErr, setNpErr] = useState(false);
  const [cpErr, setCpErr] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [severity, setSeverity] = useState(null);
  const history = useHistory();

  // function Snack(type, msg) {
  //   let err = type == "error" ? 1 : 0;
  //   return (
  //   );
  // }

  const handleChangePassword = () => {
    const { oldPass, newPass, conPass } = passFields;
    if (oldPass == "") {
      setOpErr(true);
    }
    if (newPass == "") {
      setNpErr(true);
    }
    if (conPass == "" || conPass != newPass) {
      setCpErr(true);
    }

    // change password api
    if (oldPass != "" && newPass != "" && conPass != "" && conPass == newPass) {
      const data = {
        password: oldPass,
        new_password: newPass,
      };
      axios
        .post(`${endpoint}/password`, { data }, config)
        .then((res) => {
          console.log(res.data);
          // window.alert("Password changed successfully!!");
          setSnackOpen(true);
          setMsg(
            "Password changed successfully!!\n Redirecting to login page.."
          );
          setSeverity(true);
          // Snack("success", msg);
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("dp");
          setTimeout(() => history.push("/"), 2000);
          socket.disconnect();
          socket.on("offline", (data) => console.log(data));
        })
        .catch((err) => {
          console.log(err);
          if (err == "Error: Request failed with status code 401") {
            setSnackOpen(true);
            setMsg(
              "Incorrect Old password!\nTry the correct password or re-login!!"
            );
            setSeverity(false);
          } else {
            setSnackOpen(true);
            setMsg("Error occured in changing the password!");
            setSeverity(false);
          }
        });
    }
  };

  setTimeout(() => {
    setOpErr(false);
    setNpErr(false);
    setCpErr(false);
  }, 3000);

  const [passFields, setPassFields] = useState({
    oldPass: "",
    newPass: "",
    conPass: "",
  });
  // const [storeData, setStoreData] = {
  //   oldPass: passwordFields[0],
  //   newPass: passwordFields[1],
  //   confirmPass: passwordFields[2],
  // };

  const options = [
    // ["General milieu"],
    ["Change password"],
    // ["QR code"],
    // ["Account Milieu"],
    // ["Security & Privacy"],
    [" ZD Centre"],
  ];

  // Snack("error", "msg");

  return (
    <>
      <div
        className="mt-md-3 mb-2 col-11 mx-auto"
        // style={{ borderTop: "2px solid #7201c8" }}
      >
        <p
          className="fw-bold bg-linearlr col-5 col-md-2 mx-auto text-center p-2 mt-0"
          style={{
            borderRadius: "0px 0px 10px 10px",
            boxShadow: "0px 5px 10px #0000005e",
          }}
        >
          Settings
        </p>
      </div>
      <div className=" ps-2  ps-md-4 pe-2 pe-sm-2 pe-md-3 pe-lg-5 pt-2 pb-4 col-12">
        {options.map((option, index) => (
          <div className="col-12 p-0 bg-white li-y-shadow br-10 my-3">
            <div key={index}>
              <div className="d-md-flex col-12 me-lg-5 p-0">
                <div className="col-7 col-md-3 py-3 ">
                  <div
                    className="mt-2 bg-linearlr text-white fw-bold p-2 text-center col-12 col-sm-11"
                    style={{
                      borderRadius: "0px 10px 10px 0px",
                      boxShadow: "0px 0px 10px #0000005e",
                    }}
                  >
                    {option}
                  </div>
                </div>
                <div
                  className={`col-12 col-md-9 py-2 ps-2 ps-sm-2 ps-lg-4 pe-0 pe-sm-2 ${
                    index != 0 && "ps-4"
                  }`}
                >
                  {index == 0 && (
                    <form className="pt-2 mb-4 pe-3 pe-md-0">
                      <div className="row mb-2 mx-auto mx-md-0 col-10 col-md-12">
                        <div className="col-12 mx-auto mx-md-0 col-md-5 col-lg-4 col-xxl-3 light-grey fw-bold my-2">
                          Old Password
                        </div>
                        <div className="col-12 mx-auto mx-md-0 col-sm-6 col-xl-4">
                          <input
                            type="text"
                            className="col-12 px-4 ms-md-3 ms-lg-1 input-style no-out"
                            // placeHolder="Old password"
                            name="old_pass"
                            onChange={(e) => {
                              let dupPassData = { ...passFields };
                              dupPassData.oldPass = e.target.value;
                              setPassFields(dupPassData);
                            }}
                          />
                          {opErr && (
                            <div
                              className="text-danger mb-2 col-12 text-center"
                              style={{ fontSize: 12 }}
                            >
                              Please enter your Old password
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row mb-2 mx-auto mx-md-0 col-10 col-md-12 ">
                        <div className="col-12 mx-auto mx-md-0 col-md-5 col-lg-4 col-xxl-3 light-grey fw-bold my-2">
                          New Password
                        </div>
                        <div className="col-12 mx-auto mx-md-0 col-sm-6 col-xl-4">
                          <input
                            type="text"
                            className="col-12 px-4 ms-md-3 ms-lg-1 input-style no-out"
                            // placeHolder="New password"
                            name="new_pass"
                            onChange={(e) => {
                              let dupPassData = { ...passFields };
                              dupPassData.newPass = e.target.value;
                              setPassFields(dupPassData);
                            }}
                          />
                          {npErr && (
                            <div
                              className="text-danger mb-2 col-12 text-center"
                              style={{ fontSize: 12 }}
                            >
                              Please enter your New password
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row mb-2 mx-auto mx-md-0 col-10 col-md-12 ">
                        <div className="col-12 mx-auto mx-md-0 col-md-5 col-lg-4 col-xxl-3 light-grey fw-bold my-2">
                          Confirm Password
                        </div>
                        <div className="col-12 mx-auto mx-md-0 col-sm-6 col-xl-4">
                          <input
                            type="text"
                            className="col-12 px-4 ms-md-3 ms-lg-1 input-style no-out"
                            // placeHolder="Confirm password"
                            name="confirm_pass"
                            onChange={(e) => {
                              let dupPassData = { ...passFields };
                              dupPassData.conPass = e.target.value;
                              setPassFields(dupPassData);
                            }}
                          />
                          {cpErr && (
                            <div
                              className="text-danger mb-2 col-12 text-center"
                              style={{ fontSize: 12 }}
                            >
                              Password mismatch!
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mb-3 d-flex align-items-center justify-content-xl-start justify-content-center justify-content-md-end col-9 col-md-10 col-xl-6 mx-auto pe-md-1 px-3 pe-md-4 pe-xl-0">
                        {/* <div
                            type="submit"
                            className="py-1 pe-3 mt-3 mb-2 purple text-underline mx-xxl-2 fw-bold col-12 col-md-5 col-lg-4 col-xxl-3 "
                            style={{
                              borderRadius: "5px",
                            }}
                          >
                            <u>Forgot Password ?</u>
                          </div> */}
                        <div
                          type="submit"
                          className="py-1 px-3 mx-md-3 me-0 mt-3 mb-2 text-center li-shadow text-white fw-bold col-9 col-md-7 bg-linearlr"
                          style={{
                            borderRadius: "5px",
                          }}
                          onClick={handleChangePassword}
                        >
                          Change password
                        </div>
                      </div>
                    </form>
                  )}
                  {/* {index == 1 && (
                  <div className="light-grey col-12 col-6 fw-bold mb-3 ">
                    Your Account Privacy
                    <div>
                      <RadioGroup
                        aria-label="Accont Type"
                        defaultValue="public "
                        name="radio-buttons-group"
                        Button-color="secondary"
                      >
                        <FormControlLabel
                          value="private"
                          control={<Radio style={{ color: "#7201c8" }} />}
                          label="private "
                        />
                        <FormControlLabel
                          value="public"
                          control={<Radio style={{ color: "#7201c8" }} />}
                          label="Public"
                        />
                      </RadioGroup>
                    </div>
                  </div>
                )} */}
                  {index == 1 && (
                    <div className=" pt-2 mb-4 col-12">
                      <div className="light-grey fw-bold mb-2">
                        Manage Your Account
                      </div>
                      <Link
                        to="/create"
                        style={{ color: "#7201c8", fontSize: "17px" }}
                      >
                        Creating an User Account
                      </Link>
                    </div>
                  )}
                  {index == 1 && (
                    <div className=" pt-2 mb-4 col-12">
                      <div className="light-grey fw-bold mb-2">
                        Navigation Map of ZD
                      </div>
                      <Link
                        to="/navigationmap"
                        style={{ color: "#7201c8", fontSize: "17px" }}
                      >
                        ZD Feature
                      </Link>
                    </div>
                  )}
                  {index == 1 && (
                    <div className=" pt-2 mb-4 col-12">
                      <div className="light-grey fw-bold mb-2">
                        Privacy Policy & Security
                      </div>
                      <Link
                        to="/tips"
                        style={{ color: "#7201c8", fontSize: "17px" }}
                      >
                        ZD Parent's Guide
                      </Link>
                      <div className="pt-4 mb-4 col-12">
                        <Link
                          to="/datapolicy"
                          style={{ color: "#7201c8", fontSize: "17px" }}
                        >
                          ZD Data Policy
                        </Link>
                      </div>
                      <div className=" mb-4 col-12">
                        <Link
                          to="/Help"
                          style={{ color: "#7201c8", fontSize: "17px" }}
                        >
                          ZD Community Guideliness
                        </Link>
                      </div>
                      <div className=" mb-4 col-12">
                        <Link
                          to="/terms-of-use"
                          style={{ color: "#7201c8", fontSize: "17px" }}
                        >
                          Terms Of Use
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Snackbar
        sx={{ ml: { md: "100px" } }}
        open={snackOpen}
        autoHideDuration={6000}
        onClose={() => setSnackOpen(false)}
        TransitionComponent={TransitionUp}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity={severity ? "success" : "error"}
          sx={{
            width: "100%",
            backgroundColor: !severity ? "#f7c4c0" : "#9bf8cf",
          }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </>
  );
}
