import { useState, useEffect } from "react";
import YourActivities from "./YourActivities";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { endpoint, token, config } from "../../endpoint";
import Img from "../../assets/images/goalsbg.gif";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import loaderW from "../../assets/images/loader-white.gif";
import loaderP from "../../assets/images/loader-color.gif";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#a11cf9",
    },
  },
});

export default function ActivityStudio({ setActivity }) {
  const [task, setTask] = useState(false);
  const [load, setLoad] = useState(true);
  const [activityData, setActivityData] = useState(null);
  useEffect(() => {
    axios
      .get(`${endpoint}/goals`, config)
      .then((res) => {
        console.log(res.data.data);
        setActivityData(res.data.data);
        setTask(true);
        setLoad(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div
        className=" mb-2 mt-1 mt-md-2 col-11 mx-auto d-flex pe-4"
        // style={{ borderTop: "2px solid #7201c8" }}
      >
        <ArrowBackIcon
          className="bg-purple rounded-circle p-1 me-3 mt-2 cursor-pointer li-shadow"
          sx={{ fontSize: 30 }}
          onClick={() => setActivity(false)}
        />
        <p
          className="fw-bold bg-linearlr col-6 col-md-3 col-xl-2 mx-auto text-center p-2 mt-0"
          style={{
            borderRadius: "0px 0px 10px 10px",
            boxShadow: "0px 5px 10px #0000005e",
          }}
        >
          Activity Studio
        </p>
      </div>
      <ThemeProvider theme={theme}>
        <section className="d-flex justify-items-center">
          <div className="container my-4">
            <div className="d-flex justify-content-start justify-content-md-between">
              <div>
                {/* <Button
                  className="btn me-4 mb-4"
                  variant="outlined"
                  onClick={() => {
                    setTask(false);
                  }}
                >
                  Your Activities
                </Button>
                <Button
                  className="btn mb-4 justify-content-end"
                  variant="outlined"
                  onClick={() => {
                    setTask(true);
                  }}
                >
                  Task Manager
                </Button> */}
              </div>
            </div>
            {load ? (
              <div className="col-12 d-flex align-justify-center vh-75">
                <div className="col-12 d-flex align-justify-center my-5">
                  <img
                    className="my-5"
                    src={loaderP}
                    width="10%"
                    height="10%"
                  />
                </div>
              </div>
            ) : activityData.length == 0 ? (
              // <Box sx={{ width: "100%" }}>{/* <h1>no</h1> */}</Box>
              <div
                className="bg-blur position-absolute z-villa d-flex flex-column align-justify-center"
                style={{ marginLeft: "-12px" }}
              >
                <img
                  src={Img}
                  // height="30%"
                  // width="50%"
                  className="rounded-circle mb-4 launching-gif"
                />
                <h6 className="p-3 bg-linearlr fw-500 br-10 li-shadow">
                  Oops! Please create your goal!
                </h6>
              </div>
            ) : (
              <YourActivities activityData={activityData} />
            )}
          </div>
        </section>
      </ThemeProvider>
    </>
  );
}
