import { useState } from "react";
import Button from "@mui/material/Button";
import QueryMaker from "./QueryMaker";
import YourQueries from "./YourQueries";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import zvillasoon from "../../assets/images/zson.gif";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#a11cf9",
    },
  },
});

export default function BrainstormingFamily({ setBrainstroming, mob }) {
  const [idea, setIdea] = useState(false);
  const [menu, setMenu] = useState("");

  const handleChange = (event) => {
    setMenu(event.target.value);
  };

  return (
    <div className={`vh-100 bg-white ${mob && "z-villa"}`}>
      <div
        className=" mb-2 col-11 mx-auto d-flex pe-4"
        // style={{ borderTop: "2px solid #7201c8" }}
      >
        <ArrowBackIcon
          className="bg-purple rounded-circle p-1 me-3 mt-2 cursor-pointer li-shadow"
          sx={{ fontSize: 30 }}
          onClick={() => setBrainstroming(false)}
        />
        <p
          className="fw-bold bg-linearlr col-6 col-md-3 col-xl-2 mx-auto text-center p-2 mt-0"
          style={{
            borderRadius: "0px 0px 10px 10px",
            boxShadow: "0px 5px 10px #0000005e",
          }}
        >
          ZD Brainwave
        </p>
      </div>
      <div
        className="bg-white position-absolute z-villa d-flex flex-column align-justify-center ps-4 ps-md-0"
        style={{ marginLeft: "-12px" }}
      >
        <img
          src={zvillasoon}
          // height="30%"
          // width="50%"
          className="rounded-circle launching-gif mt-md-0 pt-md-0 mt-5 pt-5"
        />
        <div className="bg-white text-center col-12">
          <div
            className="modal-text col-10 col-sm-8 col-md-6 col-lg-4 p-3 fw-bold mx-auto text-white bg-linearlr text-center"
            style={{
              borderRadius: 15,
              boxShadow: "0px 0px 10px #000000",
            }}
          >
            Launching Soon..
          </div>
        </div>
      </div>
    </div>
  );
}
{
  /* <ThemeProvider theme={theme}>
  <section className="bg-white d-flex justify-items-center">
    <div className="container my-4">
      <div className="d-flex justify-content-start justify-content-md-between">
        <div>
          <Button
            className="btn me-4 mb-4"
            variant="outlined"
            onClick={() => {
              setIdea(false);
            }}
          >
            Query Maker
          </Button>
          <Button
            className="btn mb-4"
            variant="outlined"
            onClick={() => {
              setIdea(true);
            }}
          >
            Your queries
          </Button>
        </div>
        <FormControl variant="filled" sx={{ minWidth: 150 }}>
          <InputLabel id="demo-simple-select-filled-label">
            ZD Menu
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            className="mb-4"
            value={menu}
            label="menu"
            onChange={handleChange}
          >
            <MenuItem value={10}>General</MenuItem>
            <MenuItem value={20}>Business</MenuItem>
            <MenuItem value={30}>Education</MenuItem>
          </Select>
        </FormControl>
      </div>
      {idea ? <YourQueries /> : <QueryMaker />}
    </div>
  </section>
</ThemeProvider> */
}
