import { useState } from "react";
import Goal from "../components/futureStudio/Goal";
import ActivityStudio from "../components/futureStudio/ActivityStudio";
import Diary from "../components/futureStudio/Diary";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import future from "../assets/images/fs.gif";
import { motion } from "framer-motion";
import fstudio from "../assets/images/fstudio.gif";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Snackbar, Slide, Alert } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#a11cf9",
    },
  },
});

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

export default function FutureStudio({ mob, tab }) {
  const [loader, setLoader] = useState(true);
  const [activity, setActivity] = useState(false);
  const [diary, setDiary] = useState(false);
  const [created, setCreated] = useState(false);
  const [goal, setGoal] = useState(false);

  setTimeout(() => {
    setLoader(false);
  }, [1700]);

  const Welcome = () => (
    <div
      className="overflow-hidden"
      style={{ height: (!mob || tab) && "95.2vh" }}
    >
      <div className="d-md-flex justify-content-between h-100 ">
        <div className="col-12 col-md-6">
          <div
            className="fw-bold purple-gradient ms-3 mt-4 welcome1 "
            // style={{ fontSize: 50 }}
          >
            Select your goal,<br></br>
            Write Down,<br></br> Follow it!
          </div>
          <div className="pt-5 mx-auto ms-xl-5 px-5 col-10 col-md-12 col-xl-10 pb-md-5 pb-xl-0">
            <div
              className="d-flex mb-2 align-items-start cursor-pointer"
              onClick={() => {
                setActivity(false);
                setDiary(false);
                setGoal(true);
              }}
            >
              <div
                className="py-3 px-4 bg-linearlr li-shadow text-white fw-600 h4 col-10 col-md-11 col-xl-10 text-center"
                style={{
                  borderRadius: "10px 0px 0px 10px",
                }}
              >
                Create Goals
              </div>
              <div
                className="bg-white ps-3 pe-2 py-3"
                style={{
                  borderRadius: "0px 10px 10px 0px",
                  boxShadow: "0px 0px 10px #0000005e",
                }}
              >
                <ArrowForwardIcon
                  className="text-dark bg-white"
                  style={{ fontSize: 30 }}
                />
              </div>
            </div>
            <div
              className="d-flex my-2 align-items-start cursor-pointer"
              onClick={() => {
                setActivity(true);
              }}
            >
              <div
                className="py-3 px-4 bg-linearlr li-shadow text-white fw-600 h4 col-10 col-md-11 col-xl-10 text-center"
                style={{
                  borderRadius: "10px 0px 0px 10px",
                }}
              >
                Activity Studio
              </div>
              <div
                className="bg-white ps-3 pe-2 py-3"
                style={{
                  borderRadius: "0px 10px 10px 0px",
                  boxShadow: "0px 0px 10px #0000005e",
                }}
              >
                <ArrowForwardIcon
                  className="text-dark bg-white"
                  style={{ fontSize: 30 }}
                />
              </div>
            </div>
            <div
              className="d-flex mt-2 align-items-start cursor-pointer"
              onClick={() => {
                setActivity(false);
                setDiary(true);
              }}
            >
              <div
                className="py-3 px-4 bg-linearlr li-shadow text-white fw-600 h4 col-10 col-md-11 col-xl-10 text-center"
                style={{
                  borderRadius: "10px 0px 0px 10px",
                }}
              >
                ZD Diary
              </div>
              <div
                className="bg-white ps-3 pe-2 py-3"
                style={{
                  borderRadius: "0px 10px 10px 0px",
                  boxShadow: "0px 0px 10px #0000005e",
                }}
              >
                <ArrowForwardIcon
                  className="text-dark bg-white"
                  style={{ fontSize: 30 }}
                />
              </div>
            </div>
          </div>
          <div
            className="bg-da-purple col-6 mt-5 pt-5 li-up-shadow d-none d-md-block"
            style={{ height: 500, borderTopRightRadius: 200 }}
          >
            <div
              className="bg-li-purple col-9 li-up-shadow"
              style={{ height: 500, borderTopRightRadius: 150 }}
            ></div>
          </div>
        </div>
        <div className="col-md-6 d-flex flex-column align-items-end">
          <div
            className="bg-li-purple col-xl-6 col-md-7 pb-5 mb-5 d-flex flex-column align-items-end li-shado d-none d-md-flex"
            style={{ height: tab ? 232 : 252, borderBottomLeftRadius: 200 }}
          >
            <div
              className="bg-da-purple col-9 li-shadow"
              style={{
                height: tab ? 190 : 220,
                borderBottomLeftRadius: "70% 70%",
              }}
            ></div>
          </div>
          <div className="col-12 ms-5 mt-3">
            <img className="" src={fstudio} width="100%" height="100%" />
          </div>
          {/* <div className="py-5 my-5 col-12 "></div> */}
          {/* <div className="py-5 my-5 col-12 "></div> */}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {
        loader ? (
          <div className="vh-100 col-12 bg-white d-flex flex-column align-justify-center">
            <img src={future} width="40%" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "spring", stiffness: 60, duration: 0.5 }}
              className="h4 fw-600 purple text-uppercase"
            >
              Future Studio
            </motion.div>
          </div>
        ) : (
          // <ThemeProvider theme={theme}>
          //   <section className="bg-white d-flex justify-items-center min-vh-100">
          //     <div className="container my-4">
          <div className="">
            {activity ? (
              <ActivityStudio setActivity={setActivity} />
            ) : diary ? (
              <Diary setDiary={setDiary} mob={mob} tab={tab} />
            ) : goal ? (
              <Goal
                setGoal={setGoal}
                setActivity={setActivity}
                setCreated={setCreated}
              />
            ) : (
              <Welcome />
            )}
          </div>
        )
        //   </section>
        // </ThemeProvider>
      }
      <Snackbar
        sx={{ ml: { md: "100px" } }}
        open={created}
        autoHideDuration={6000}
        onClose={() => setCreated(false)}
        TransitionComponent={TransitionUp}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={() => setCreated(false)}
          severity="success"
          sx={{ width: "100%", backgroundColor: "#9bf8cf" }}
        >
          Your <strong>Goal</strong> was created successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
