import { createTheme, ThemeProvider } from "@mui/material/styles";
import ZdRecords from "../components/zvilla/ZdRecords";
import gif from "../assets/images/unborn-egg.gif";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Slider from "@mui/material/Slider";
import zvillasoon from "../assets/images/zson.gif";

const theme = createTheme({
  palette: {
    primary: {
      main: "#a11cf9",
    },
  },
});

export default function ZillionVilla() {
  return (
    // <div>
    <div
      className="h-100 bg-white position-absolute z-villa d-flex flex-column align-justify-start mt-md-3"
      style={{ zIndex: 4 }}
    >
      <div className="bg-white text-center col-12">
        <div
          className="h4 col-12 col-sm-8 col-md-6 col-xl-4 p-3 fw-bold mx-auto text-white bg-linearlr text-center"
          style={{
            borderRadius: "0px 0px 15px 15px",
            boxShadow: "0px 0px 10px #000000",
          }}
        >
          Launching Soon..
        </div>
      </div>
      <img
        src={zvillasoon}
        className=" mx-auto my-md-auto mt-5  pt-5 pt-md-0 launch-gif"
      />
    </div>
  );
}
{
  /* <ThemeProvider theme={theme}>
  <section className="bg-white m-3">
    <h3 className="purple  mb-4">ZD V-Room</h3>
    <div className="row">
      <div className="col-12 col-md-6">
        <Card elevation={4} className=" p-1 bg-purple">
          <CardContent>
            <section id="profile">
              <div className="row">
                <h5 className="px-2 fw-bold text-white">UNBORN EGG</h5>
                <h6 className="text-white">Level 1</h6>
                <div
                  className="bg-grey rounded-3 m-2 p-2"
                  style={{ width: "95%" }}
                >
                  <h6 className="purple">Your Progress</h6>
                  <Slider
                    disabled
                    defaultValue={50}
                    className="purple"
                    aria-label="Disabled slider"
                  />
                </div>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
      <div className="col-12 col-md-6">
        <img
          src={gif}
          width="100%"
          height="auto"
          className="m-0"
          alt="loading..."
        />
      </div>
    </div>
    <ZdRecords />
  </section>
</ThemeProvider> */
}
{
  /* </div> */
}
