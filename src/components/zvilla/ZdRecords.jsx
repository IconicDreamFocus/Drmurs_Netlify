import { Button } from "@mui/material";
import FutureStudio from "./FutureStudio";
import Brainstorming from "./Brainstorming";
import Zillionevents from "./Zillionevents";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useRef } from "react";
import empty from "../../assets/images/Empty.mp4";
import full from "../../assets/images/Full.mp4";
import Slider from "@mui/material/Slider";

const theme = createTheme({
  palette: {
    primary: {
      main: "#a11cf9",
    },
  },
});

export default function ZdRecords() {
  const videoRef = useRef(null);
  const [money, setMoney] = useState(false);

  function handlePlay() {
    videoRef.current.play();
  }
  const [task, setTask] = useState(false);
  const [activity, setActivity] = useState(false);
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="row">
          <div className="col-12 col-md-4">
            <h3 className="purple py-2">ZD Wallet</h3>
            {money ? (
              <video
                ref={videoRef}
                width="100%"
                height="auto"
                onClick={handlePlay}
              >
                <source src={full} type="video/mp4" />
              </video>
            ) : (
              <video
                ref={videoRef}
                width="100%"
                height="auto"
                onClick={handlePlay}
              >
                <source src={empty} type="video/mp4" />
              </video>
            )}
            <div
              className="bg-grey rounded-3 p-2"
              style={{ border: "3px solid #a11cf9" }}
            >
              <h6 className="purple">ZD Coins</h6>
              <Slider
                disabled
                defaultValue={50}
                style={{ color: "#fadc60" }}
                aria-label="Disabled slider"
              />
            </div>
          </div>
          <div className="col-12 col-md-8">
            <h3 className="purple py-2">Zillion Records</h3>
            <div>
              <Button
                className="btn me-4 mb-4"
                variant="outlined"
                onClick={() => {
                  setActivity(false);
                  setTask(false);
                }}
              >
                Brainstorming Family
              </Button>
              <Button
                className="btn me-4 mb-4"
                variant="outlined"
                onClick={() => {
                  setActivity(true);
                  setTask(false);
                }}
              >
                Zillion Events
              </Button>
              <Button
                className="btn mb-4 justify-content-end"
                variant="outlined"
                onClick={() => {
                  setActivity(false);
                  setTask(true);
                }}
              >
                Future Studio
              </Button>
            </div>

            {activity ? (
              <Zillionevents />
            ) : task ? (
              <FutureStudio />
            ) : (
              <Brainstorming />
            )}
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
