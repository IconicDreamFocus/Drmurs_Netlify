import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { purple } from "@mui/material/colors";
import Img from "../../assets/images/goalsgif.gif";
import { Box } from "@mui/system";
import {
  Dialog,
  DialogContent,
  Snackbar,
  Checkbox,
  Button,
  Slide,
  ButtonGroup,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  endpoint,
  token,
  config,
  formatDate,
  ModalAnimation,
  ModalAnimation1,
} from "../../endpoint";
import Modal from "@mui/material/Modal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReportRoundedIcon from "@mui/icons-material/ReportRounded";
import { AnimatePresence, motion } from "framer-motion";

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

export default function YourActivities({ activityData }) {
  const { goals } = useSelector((state) => state.futureStudio);
  const { loggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [activityGoals, setActivityGoals] = useState(null);
  const [currentGoal, setCurrentGoal] = useState(null);
  const [currentMilestone, setCurrentMilestone] = useState(0);

  const [postSuccess, setPostSuccess] = useState(false);
  const [patchParams, setPatchParams] = useState(null);

  useEffect(() => {
    setActivityGoals(activityData);
  }, []);

  function checkCompleted() {
    let tasksNotCompleted = 0;

    activityGoals[currentGoal].milestones.forEach((val2) => {
      val2.activities.forEach((val3) => {
        if (val3.is_complete === false) {
          tasksNotCompleted++;
        }
      });
    });

    if (tasksNotCompleted === 0) {
      console.log("pass!");
      setPostSuccess(true);
      setOpenWarning(true);
      setOpen(false);
    }
  }

  const handleClose = () => {
    setOpen(false);
    setCurrentMilestone(0);
  };
  const handleWarningClose = () => {
    setOpenWarning(false);
    setPostSuccess(false);
  };
  const handleSnackbarClose = () => setPostSuccess(false);

  function handleCheck() {
    let newActivityGoals = [...activityGoals];
    newActivityGoals[currentGoal].milestones[
      patchParams.milestoneId
    ].activities[patchParams.activityId].is_complete = patchParams.value;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${endpoint}/goal/${activityGoals[currentGoal].id}/milestone/${patchParams.milestoneId}/activity/${patchParams.activityId}/complete`,
      requestOptions
    )
      .then((response) => response.json())
      .then(
        (result) => setActivityGoals(newActivityGoals),
        setOpenWarning(false)
      )
      .catch((error) => console.log("error", error));
  }

  function ModalView() {
    // const checkPreviousMile = () => {
    let allow = true;
    if (currentMilestone == 0) allow = true;
    else {
      // console.log("1-4");
      activityGoals[currentGoal].milestones[
        currentMilestone - 1
      ].activities.forEach((tk) => {
        allow = allow && tk.is_complete;
      });
    }
    // return allow
    //     };

    return (
      <>
        <Modal
          // className={classes.modalStyle1}
          // sx={{ overflow: "scroll" }}
          open={open}
          onClose={handleClose}
          className="d-flex justify-content-center align-items-center  mx-md-3 mx-lg-4 mx-lg-5"
        >
          <Box
            // component={motion.div}
            // {...ModalAnimation}
            className="overflow-hidden bg-linearlr no-out goal-modal"
            sx={{
              // backgroundColor: "#7201c8 !important",
              // position: "absolute",
              // top: "50%",
              // left: "50%",
              // transform: "translate(-50%, -50%)",
              overflowY: "scroll",
              // border: "3px solid #fff",
              borderRadius: 5,
              boxShadow: 24,
              // height: "80vh",
              // width: "70vw",
              // px: 4,
              // py: 2,
            }}
          >
            <div className="d-flex justify-content-between align-items-start">
              <ArrowBackIcon
                className="bg-white purple rounded-circle p-1 me-3 mt-2 ms-3 cursor-pointer li-shadow"
                sx={{ fontSize: 30 }}
                onClick={handleClose}
              />
            </div>
            <div className="pt-3">
              <div
                className={`d-flex ${
                  activityGoals[currentGoal].milestones.length < 4
                    ? "col-11 col-md-10"
                    : "col-12 px-md-4"
                } mx-auto align-items-md-center align-items-end justify-content-md-center justify-content-between overflow-auto`}
              >
                {activityGoals[currentGoal].milestones.map((slide, index) => (
                  <div
                    key={index}
                    className={` ${
                      currentMilestone == index
                        ? "bg-linearlr "
                        : "bg-white purple "
                    } ${
                      activityGoals[currentGoal].milestones.length < 4
                        ? "mx-1 mx-md-3 col-3"
                        : " mx-2 col-2"
                    } px-3 py-2 br-10 text-center fw-600 cursor-pointer li-shadow word-break-all`}
                    // style={{
                    //   boxShadow:
                    //     currentMilestone == index ? "0px 0px 10px #fff" : "",
                    // }}
                    // className={`bg-white ${index > 0 && "ms-2"} mb-2`}
                    onClick={() => setCurrentMilestone(index)}
                  >
                    {slide.title}
                  </div>
                ))}
              </div>
              <div
                className="li-shadow bg-white py-3 mx-3 br-10 overflow-auto"
                style={{ height: 450 }}
              >
                <p
                  className="li-shadow bg-linearlr white p-3 mt-4 col-5 col-md-3 text-center"
                  style={{ borderRadius: "0px 10px 10px 0px" }}
                >
                  Your Tasks
                </p>

                {currentMilestone !== null &&
                  activityGoals[currentGoal].milestones[
                    currentMilestone
                  ].activities.map((task, keyy) => (
                    <div className="d-flex align-items-center justify-content-between p-3 row">
                      <p className="purple mb-1 me-3 me-md-0 p-3 col-10 col-md-8 rounded-3 li-y-shadow">
                        {task.dsasadasd}
                      </p>

                      {allow ? (
                        !task.is_complete ? (
                          <div className="d-flex align-items-center bg-linearlr p-2 rounded-3 col-7 col-md-3 ms-3 ms-md-0">
                            <Checkbox
                              disabled={task.is_complete}
                              checked={task.is_complete}
                              sx={{
                                color: "white",
                                "&.Mui-checked": {
                                  color: "white",
                                  backgroundColor: purple[500],
                                },
                              }}
                              onChange={(e) => {
                                if (!task.is_complete) {
                                  setPatchParams({
                                    milestoneId: currentMilestone,
                                    activityId: keyy,
                                    value: e.target.checked,
                                  });
                                  setOpenWarning(true);
                                }
                              }}
                            />
                            <p className="mb-0 ms-2 text-white">
                              Mark as complete
                            </p>
                          </div>
                        ) : (
                          <div className="text-success fw-600 col-7 col-md-3">
                            <CheckCircleIcon className="me-2" />
                            Completed
                          </div>
                        )
                      ) : (
                        <div className="text-danger fw-600 col-10 col-md-4 d-flex align-justify-center">
                          <ReportRoundedIcon className="me-2" />
                          Complete previous milestone
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
            <div className="d-flex justify-content-end col-10 ms-auto pe-4">
              <div
                className="col-6 col-md-3 bg-white text-center purple mt-3 px-3 py-2 rounded-3 cursor-pointer li-shadow br-10"
                onClick={checkCompleted}
              >
                Goal Achieved
              </div>
            </div>
          </Box>
        </Modal>
      </>
    );
  }

  const Alert = () => (
    <Modal
      // className={classes.modalStyle1}
      // sx={{ overflow: "scroll" }}
      open={openWarning}
      onClose={handleWarningClose}
      className="d-flex justify-content-center align-items-center mx-md-3 mx-lg-4 mx-lg-5"
    >
      <Box
        // component={motion.div}
        // {...ModalAnimation1}
        className="edit-prof overflow-hidden bg-linearlr no-out d-flex flex-column align-justify-center complete-modal"
        sx={{
          // backgroundColor: "#7201c8 !important",
          // position: "absolute",
          // top: "50%",
          // left: "50%",
          // transform: "translate(-50%, -50%)",
          overflowY: "scroll",
          // border: "3px solid #fff",
          borderRadius: 5,
          boxShadow: 24,
          // height: "20vh",
          // width: "30vw",
          px: 4,
          py: 2,
        }}
      >
        {!postSuccess ? (
          <>
            <div className="fw-bold ">
              Alert! You can't redo this operation.
            </div>
            <div className="p-3">
              <Button
                className="bg-white li-shadow"
                onClick={handleWarningClose}
              >
                Cancel
              </Button>
              <Button
                className="bg-white ms-3 li-shadow"
                onClick={handleCheck}
                autoFocus
              >
                Yes
              </Button>
            </div>
          </>
        ) : (
          <div className="fw-bold h5 ">
            Congrats!! you have successfully acheived your goal 🎖️
          </div>
        )}
      </Box>
    </Modal>
  );

  return (
    <>
      {activityGoals ? (
        <>
          <div className="px-md-4">
            <h3 className="purple">Select your goal</h3>
            {/* <div className="purple d-flex-column justify-content-center px-md-4 w-100 bg-dark"> */}
            {activityGoals.map((val, index1) => (
              <div
                className="d-flex flex-column justify-content-evenly px-md-4 col-11 col-lg-10 mx-auto"
                key={index1}
                onClick={() => {
                  setCurrentGoal(index1);
                  setOpen(true);
                }}
              >
                <div className="mt-4 mt-md-2 p-md-3">
                  <div className="br-15 bg-linearlr li-shadow p-1 p-md-2 cursor-pointer d-flex justify-content-between row">
                    <div className="col-md-4 d-flex justify-content-start align-items-start">
                      <div className="h6 bg-white br-10 py-2 px-4 purple text-center fw-600 li-shadow">
                        {val.title}
                      </div>
                    </div>
                    <div className="text-center py-3 col-11 mx-auto col-md-7 me-md-4">
                      <div className="h-5 fw-600 bg-white p-3 purple text-center br-15 li-shadow">
                        {val.description
                          ? val.description
                          : "sample discription!!"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* </div> */}
          </div>
          <AnimatePresence>{open && <ModalView />}</AnimatePresence>
          <AnimatePresence>{openWarning && <Alert />}</AnimatePresence>
        </>
      ) : (
        <h1>No data</h1>
      )}
    </>
  );
}
