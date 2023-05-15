import { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  Select,
  IconButton,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import * as React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { styled, Box } from "@mui/system";
// import ModalUnstyled from "@mui/base/ModalUnstyled";
import Modal from "@mui/material/Modal";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Typography from "@mui/material/Typography";
import { addMilestones } from "../../slices/futureStudioSlice";
import { useDispatch } from "react-redux";
import { endpoint, token, config, ModalAnimation } from "../../endpoint";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AnimatePresence, motion } from "framer-motion";

export default function Goal({ setGoal, setActivity, setCreated }) {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    goal: "",
    description: "",
  });

  const [error, setError] = useState({
    goal: "",
    description: "",
  });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [milestones, setMilestones] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleSnackbarClose = () => setOpenSnackbar(false);

  const [textBox, setTextBox] = useState([
    [
      {
        title: "",
        target_date: null,
        activities: [""],
      },
    ],
    [
      {
        title: "",
        target_date: null,
        activities: [""],
      },
    ],
    [
      {
        title: "",
        target_date: null,
        activities: [""],
      },
    ],
  ]);

  function handleSelectChange(e) {
    const datata = [
      {
        title: "",
        target_date: null,
        activities: [""],
      },
    ];
    const datata1 = [
      {
        title: "",
        target_date: null,
        activities: [""],
      },
    ];
    let initialBoxes = [...textBox];

    if (e.target.value === 3) {
      if (initialBoxes.length === 4) {
        initialBoxes.splice(initialBoxes.length - 1, 1);
      } else if (initialBoxes.length === 5) {
        initialBoxes.splice(initialBoxes.length - 1, 2);
      }
    } else if (e.target.value === 4) {
      if (initialBoxes.length === 3) {
        initialBoxes.push(datata);
      } else if (initialBoxes.length === 5) {
        initialBoxes.splice(initialBoxes.length - 1, 1);
      }
    } else if (e.target.value === 5) {
      if (initialBoxes.length === 3) {
        initialBoxes.push(datata, datata1);
      } else if (initialBoxes.length === 4) {
        initialBoxes.push(datata);
      }
    }
    setTextBox(initialBoxes);
    // console.log(textBox);
    setMilestones(0);
  }

  const handleSubmit = () => {
    setOpen(false);
    let noofErrors = 0;
    let errorMessage = { ...error };

    if (values.goal === null || values.goal === "") {
      errorMessage.goal = "Goal cannot be empty";
      noofErrors += 1;
    }

    if (values.description === null || values.description === "") {
      errorMessage.description = "Goal Description cannot be empty";
      noofErrors += 1;
    }

    setError(errorMessage);

    let milestoneArray = [];

    textBox.forEach((item) => {
      item.forEach((datetask) => {
        milestoneArray.push(datetask);
        if (datetask.target_date === null || datetask.title === "") {
          noofErrors += 1;
        }
        datetask.activities.forEach((val) => {
          console.log(val);
          if (val === "") {
            noofErrors += 1;
          }
        });
      });
    });

    if (noofErrors === 0) {
      const data = {
        title: values.goal,
        description: values.description,
        milestones: milestoneArray,
      };

      setError({
        goal: "",
        description: "",
      });
      setTextBox([
        [
          {
            title: "",
            target_date: null,
            activities: [""],
          },
        ],
        [
          {
            title: "",
            target_date: null,
            activities: [""],
          },
        ],
        [
          {
            title: "",
            target_date: null,
            activities: [""],
          },
        ],
      ]);
      setValues({
        goal: "",
        description: "",
      });
      setMilestones(0);

      dispatch(
        addMilestones({
          goal: values.goal,
          description: values.description,
          milestones: milestoneArray,
        })
      );

      axios
        .post(`${endpoint}/goal`, { data }, config)
        .then((res) => {
          console.log(res.data);
          setActivity(true);
          setCreated(true);
          // setRefresh(true);
        })
        .catch((err, config) => console.log(err, config));
    } else {
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <div
        className=" mb-2 mt-1 mt-md-2 col-11 mx-auto d-flex pe-4"
        // style={{ borderTop: "2px solid #7201c8" }}
      >
        <ArrowBackIcon
          className="bg-purple rounded-circle p-1 me-3 mt-2 cursor-pointer li-shadow"
          sx={{ fontSize: 30 }}
          onClick={() => setGoal(false)}
        />
        <p
          className="fw-bold bg-linearlr col-6 col-md-3 col-xl-2 mx-auto text-center p-2 mt-0"
          style={{
            borderRadius: "0px 0px 10px 10px",
            boxShadow: "0px 5px 10px #0000005e",
          }}
        >
          Create Goals
        </p>
      </div>
      <div className="purple mx-2 py-3">
        <div className="bg-linearlr p-3 my-4 li-shadow br-20">
          <div className="d-md-flex justify-content-between align-items-start my-3 mx-2">
            <div className="w-100">
              <p className="mb-1">Your Goal</p>
              <div className="w-md-100">
                <input
                  type="text"
                  className="form-control py-3 li-y-shadow border-0"
                  value={values.goal}
                  onChange={(e) =>
                    setValues((pre) => ({
                      ...pre,
                      goal: e.target.value,
                    }))
                  }
                  maxlength="30"
                />
                {error.goal !== "" && (
                  <p className="text-danger">{error.goal}</p>
                )}
              </div>
            </div>
            <div className="w-100 mx-md-3 my-3 my-md-0">
              <p className="mb-1">Goal Description</p>
              <div className="w-md-100">
                <textarea
                  rows="2"
                  className="form-control li-y-shadow border-0 "
                  value={values.description}
                  onChange={(e) =>
                    setValues((pre) => ({
                      ...pre,
                      description: e.target.value,
                    }))
                  }
                  maxlength="50"
                ></textarea>
                {error.goaldescription !== "" && (
                  <p className="text-danger">{error.goaldescription}</p>
                )}
              </div>
            </div>
            <div className="w-100">
              <p className="mb-1">No. of Milestones</p>
              <FormControl
                variant="filled"
                className="w-100"
                style={{ backgroundColor: "white", height: 60 }}
              >
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={textBox.length}
                  className=""
                  onChange={(e) => {
                    handleSelectChange(e);
                  }}
                >
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <div
          className="mt-5 mb-4 col-11 mx-auto"
          style={{ borderTop: "2px solid #7201c8" }}
        >
          <p
            className="fw-bold bg-linearlr col-6 col-md-3 col-xl-2 mx-auto text-center p-2 mt-0"
            style={{
              borderRadius: "0px 0px 10px 10px",
              boxShadow: "0px 5px 10px #7d7d7d",
            }}
          >
            Activity Box
          </p>
        </div>
        <div className="li-shadow br-20 bg-linearlr px-3 min-vh-50">
          <div
            className="bg-white px-3 py-2 col-6 col-md-3 text-center mx-auto purple fw-600 li-shadow"
            style={{ borderRadius: "0 0 10px 10px" }}
          >
            Milestone {milestones + 1}
          </div>
          {(textBox[milestones] != [] || textBox[milestones]) &&
            textBox[milestones].map((val, index) => (
              <div key={index}>
                <div className="d-md-flex justify-content-between align-items-center w-100 py-3">
                  <input
                    type="text"
                    maxLength="40"
                    placeholder="Title"
                    className="form-control li-y-shadow border-0 py-3 mx-3 mb-4 mb-md-0 w-75 w-md-50"
                    value={val.title}
                    onChange={(e) => {
                      let initialBoxes = [...textBox];
                      initialBoxes[milestones][0].title = e.target.value;
                      setTextBox(initialBoxes);
                    }}
                  />
                  {/* <h5 className="fw-bold ms-3 mb-4 mb-md-0 ms-md-4">
                    Milestone {milestones + 1}
                  </h5> */}
                  <div className="ms-3 ms-md-0">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Deadline Date"
                        value={val.target_date}
                        onChange={(e) => {
                          let initialBoxes = [...textBox];
                          initialBoxes[milestones][0].target_date =
                            e.toDateString();
                          setTextBox(initialBoxes);
                        }}
                        renderInput={(params) => (
                          <TextField
                            variant="filled"
                            sx={{ bgcolor: "#ffffff", mr: "30px" }}
                            {...params}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
                <div className="overflow-auto" style={{ maxHeight: "40vh" }}>
                  {val.activities.map((task, keyy) => (
                    <div
                      className="d-flex flex-column justify-content-between align-items-center mx-3"
                      key={keyy}
                    >
                      <div className="d-flex align-items-center w-100">
                        <div className="form-floating my-3 w-100">
                          <input
                            type="text"
                            value={task}
                            className="form-control li-y-shadow border-0 curve no-out"
                            id="floatingInput"
                            onChange={(e) => {
                              let theB = [...textBox];
                              theB[milestones][0].activities[keyy] =
                                e.target.value;
                              setTextBox(theB);
                            }}
                          />
                          <label className="text-dark" htmlFor="floatingInput">
                            Task {keyy + 1}
                          </label>
                        </div>
                        {keyy ===
                        textBox[milestones][0].activities.length - 1 ? (
                          <IconButton
                            sx={{ color: "white" }}
                            aria-label="add textbox"
                            component="span"
                            onClick={() => {
                              if (
                                textBox[milestones][0].activities.length < 10
                              ) {
                                const newBox = [...textBox];
                                newBox[milestones][0].activities.push("");
                                setTextBox(newBox);
                              }
                            }}
                          >
                            <AddCircleIcon />
                          </IconButton>
                        ) : (
                          <IconButton
                            sx={{ color: "#ff7070" }}
                            aria-label="add textbox"
                            component="span"
                            onClick={() => {
                              const newBox = [...textBox];
                              newBox[milestones][0].activities.splice(keyy, 1);
                              setTextBox(newBox);
                            }}
                          >
                            <CancelIcon />
                          </IconButton>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <div
                    className="d-flex justify-content-end align-items-center mt-3"
                    style={{ "&:hover": { transform: " scale(1.5) " } }}
                  >
                    {milestones !== 0 && (
                      <Button
                        className="bg-linearlr text-white  mx-2 mb-3"
                        variant="contained"
                        style={{
                          textTransform: "initial",
                          borderRadius: 10,
                          fontWeight: 600,
                        }}
                        onClick={() => {
                          if (milestones !== 0) {
                            setMilestones((pre) => pre - 1);
                          }
                        }}
                      >
                        Back
                      </Button>
                    )}
                    {milestones < textBox.length - 1 && (
                      <Button
                        className="bg-white purple mx-3 mb-3"
                        variant="contained"
                        style={{
                          textTransform: "initial",
                          borderRadius: 10,
                          fontWeight: 600,
                        }}
                        onClick={() => {
                          setMilestones(milestones + 1);
                        }}
                      >
                        Next
                      </Button>
                    )}
                    {milestones === textBox.length - 1 && (
                      <Button
                        variant="contained"
                        className="bg-white purple mx-3 mb-3"
                        style={{
                          textTransform: "initial",
                          borderRadius: 10,
                          fontWeight: 600,
                        }}
                        onClick={handleClickOpen}
                      >
                        Submit
                      </Button>
                    )}
                    <div className="bg-linearlr br-10"></div>
                  </div>
                </div>
              </div>
            ))}
          <AnimatePresence>
            {open && (
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="d-flex justify-content-center align-items-center  py-sm-5 mx-2 mx-md-3 mx-lg-4 mx-lg-5"
              >
                <Box
                  component={motion.div}
                  {...ModalAnimation}
                  className="bg-linearlr px-2 px-md-4 goal-alert"
                  sx={{
                    // position: "absolute",
                    // top: "50%",
                    // left: "50%",
                    // transform: "translate(-50%, -50%)",
                    // width: "60vw",
                    // maxHeight: "100vh",
                    overflowY: "scroll",
                    // border: "3px solid #ffffff",
                    borderRadius: 5,
                    boxShadow: 24,
                    pb: 3,
                  }}
                >
                  <h3
                    className="text-center bg-white purple p-2 col-6 col-md-4 mx-auto li-shadow mb-4"
                    style={{ borderRadius: "0px 0px 10px 10px" }}
                  >
                    ZD Alert!!
                  </h3>
                  <div
                    className="br-10 li-shadow p-3"
                    style={{ backgroundColor: "white" }}
                  >
                    <h5 className="fw-500" style={{ color: "#7201c8" }}>
                      You agree that the given details are fixed? If not, please
                      make corrections in your tasks. You will not be able to
                      edit again once you have submitted. Edit option will be
                      updated soon!
                    </h5>
                  </div>

                  <div className=" p-2 col-12 d-flex align-justify-center my-2">
                    <Button
                      variant="contained"
                      className="bg-white purple px-4 mx-3 "
                      onClick={handleClose}
                      style={{
                        textTransform: "initial",
                        fontWeight: 600,
                        borderRadius: 10,
                      }}
                    >
                      Close
                    </Button>
                    <Button
                      variant="contained"
                      className="bg-linearlr white px-4 mx-3  "
                      onClick={handleSubmit}
                      style={{
                        textTransform: "initial",
                        fontWeight: 600,
                        borderRadius: 10,
                      }}
                      // onClick={handleClickOpen}
                    >
                      Submit
                    </Button>
                  </div>
                </Box>
              </Modal>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Snackbar
        sx={{ ml: { md: "100px" } }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Please fill in all details
        </Alert>
      </Snackbar>
    </>
  );
}
