import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import { Button, Alert, Typography } from "@mui/material";
import { createEvent } from "../../slices/eventSlice";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { endpoint, config, token } from "../../endpoint";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function CreateEvents({ setSuccess, setEvents }) {
  const dispatch = useDispatch();
  const [poster, setPoster] = useState(null);
  const [postFile, setPostFile] = useState(null);
  const [postResult, setPostResult] = useState(null);
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState(false);
  const [locData, setLocData] = useState({
    title: "",
    name: "",
    mail: "",
    contact: "",
    description: "",
    rules: "",
    ad: "",
    link: "",
    date: "",
    field: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(locData);
    if (postResult && !alert) {
      const {
        title,
        name,
        mail,
        contact,
        description,
        rules,
        ad,
        date,
        link,
        field,
      } = locData;

      const data = {
        title: title,
        description: description,
        link,
        rules: rules ? rules : "No rules",
        banner_pic_id: postResult.id,
        register_link: link,
        event_date: date,
        organizer_name: name,
        organizer_mobile: contact,
        organizer_email: mail,
        field: field,
      };
      console.log(data);
      e.preventDefault();
      dispatch(createEvent(locData));
      axios
        .post(`${endpoint}/event`, { data }, config)
        .then((res) => {
          console.log(res.data);
          setSuccess(true);
          setEvents(false);
        })
        .catch((err) => console.log(err));
    } else {
      setAlert(true);
    }
  };

  const handlePosterChange = (e) => {
    setError(false);
    const selected = e.target.files[0];
    const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
    // if (selected && ALLOWED_TYPES.includes(selected.type)) {
    //   let reader = new FileReader();
    //   reader.onload = () => {
    //     setPoster(reader.result);
    //     setAlert(false);
    //     setLocData({ ...locData, ad: reader.result });
    //   };
    //   reader.readAsDataURL(selected);
    // } else {
    //   setError(true);
    // }

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    var formdata = new FormData();
    formdata.append("content", e.target.files[0], postFile);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${endpoint}/content`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setPostResult(result.data);
        setAlert(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div
        className=" mb-2 col-11 mx-auto d-flex pe-4"
        // style={{ borderTop: "2px solid #7201c8" }}
      >
        <ArrowBackIcon
          className="bg-purple rounded-circle p-1 me-3 mt-2 cursor-pointer li-shadow"
          sx={{ fontSize: 30 }}
          onClick={() => setEvents(false)}
        />
        <p
          className="fw-bold bg-linearlr col-6 col-md-2 mx-auto text-center p-2 mt-0"
          style={{
            borderRadius: "0px 0px 10px 10px",
            boxShadow: "0px 5px 10px #0000005e",
          }}
        >
          Create Events
        </p>
      </div>
      <div className="py-3 px-0 px-sm-1 px-md-2 px-lg-3 m-0 row">
        <form onSubmit={handleSubmit}>
          <div className="row align-items-center m-md-0 m-2 justify-content-center">
            <div className="col-md-8 py-3 px-0 px-sm-1 px-md-2 m-0 px-lg-3">
              <div className="my-2 col-md-9">
                {alert && (
                  <Alert severity="error">
                    Your Event Banner is not added!
                  </Alert>
                )}
              </div>
              <Box
                id="ePoster"
                className={` d-flex flex-column li-shadow position-relative 
                  ${
                    poster
                      ? "justify-content-end align-items-end"
                      : "justify-content-center align-items-center"
                  }`}
                style={{
                  height: 300,
                  borderRadius: "20px",
                  background: postResult
                    ? `url("${postResult.url}")no-repeat center/cover`
                    : "linear-gradient(to right, #a11cf9, #7201c8)",
                }}
              >
                <input
                  id="poster"
                  type="file"
                  className="d-none"
                  onChange={(e) => {
                    setPostFile(URL.createObjectURL(e.target.files[0]));
                    handlePosterChange(e);
                  }}
                />
                {postResult ? (
                  <label
                    for="poster"
                    className="col-1 bg-white fw-bold py-2 text-center cursor-pointer position-absolute"
                    style={{
                      borderRadius: "25px",
                      right: 0,
                      bottom: 0,
                    }}
                  >
                    <EditIcon style={{ fontSize: "18px", color: "#a11cf9" }} />
                  </label>
                ) : (
                  <label
                    for="poster"
                    className="col-7 col-sm-5 col-md-4 col-lg-3 bg-white fw-bold purple py-2 text-center li-shadow br-10 cursor-pointer"
                  >
                    Add Poster
                  </label>
                )}
              </Box>
            </div>
            <div className="col-md-4 py-3 px-0 px-sm-1 px-md-2 px-lg-3">
              <div className="fw-bold purple mb-0">Event Registration Link</div>
              <input
                type="text"
                className="col-12 p-3 rounded li-y-shadow border-0 mb-4 no-out"
                onChange={(e) =>
                  setLocData({ ...locData, link: e.target.value })
                }
                required
              />
              <div className="fw-bold purple mb-2">Event Category</div>
              <FormControl fullWidth>
                {/* {!locData.field && (
                  <InputLabel id="demo-simple-select-label">
                    Select the Category
                  </InputLabel>
                )} */}
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  sx={{ border: 0 }}
                  required
                  value={locData.field}
                  label="Field"
                  onChange={(e) =>
                    setLocData({ ...locData, field: e.target.value })
                  }
                >
                  <MenuItem value={1}>Artainment</MenuItem>
                  <MenuItem value={2}>Education</MenuItem>
                  <MenuItem value={3}>Entrepreneur</MenuItem>
                  <MenuItem value={4}>Food</MenuItem>
                  <MenuItem value={5}>Sports</MenuItem>
                  <MenuItem value={6}>Tourism</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div
            className="col-12 pb-2 px-0 px-sm-1 px-md-2 px-lg-3 li-shadow"
            style={{
              borderRadius: "20px",
              background: "linear-gradient(to right, #a11cf9, #7201c8)",
            }}
          >
            {/* <div className="d-flex flex-wrap justify-content-center mt-0 mb-3"> */}
            <div className="d-flex align-items-center mb-3 justify-content-center position-relative">
              <div
                className="bg-white purple p-1 px-3 fw-600 li-shadow"
                style={{ fontSize: 20, borderRadius: "0px 0px 10px 10px" }}
              >
                Fill Event Details
              </div>
              <Button
                type="submit"
                variant="contained"
                onClick={handleSubmit}
                className="bg-white purple br-10 position-absolute d-none d-sm-block"
                style={{
                  textTransform: "initial",
                  fontWeight: "600",
                  right: 10,
                  top: 10,
                  boxShadow: "0px 8px 10px #0000005e",
                }}
              >
                Create Event
              </Button>
              {/* </div> */}
            </div>
            <div className="row m-2 m-md-0 pt-4 align-items-start justify-content-evenly">
              <div className="col-md-5 p-0">
                <div className="fw-bold text-white mb-1">Event Name</div>
                <input
                  type="text"
                  maxLength="20"
                  className="col-12 p-3 br-10 li-shadow purple-border mb-4 no-out"
                  onChange={(e) =>
                    setLocData({ ...locData, title: e.target.value })
                  }
                  required
                />
                <div className="bg-white px-4 pb-4 purple br-10 li-shadow">
                  <div className="d-flex flex-wrap justify-content-center mt-0 mb-3">
                    <div
                      className="bg-purple p-1 px-3 li-shadow"
                      style={{
                        borderRadius: "0px 0px 10px 10px",
                      }}
                    >
                      <div style={{ fontSize: 18 }}>Organizer Details</div>
                    </div>
                  </div>
                  <div className="fw-bold purple mb-1">Organizer Name</div>
                  <input
                    type="text"
                    className="col-12 p-3 rounded li-y-shadow border-0 mb-4  no-out"
                    onChange={(e) =>
                      setLocData({ ...locData, name: e.target.value })
                    }
                    required
                  />
                  <div className="fw-bold purple mb-1">Email ID</div>
                  <input
                    type="email"
                    className="col-12 p-3 rounded li-y-shadow border-0 mb-4 no-out"
                    onChange={(e) =>
                      setLocData({ ...locData, mail: e.target.value })
                    }
                    required
                  />
                  <div className="fw-bold purple mb-1">Contact Number</div>
                  <input
                    type="number"
                    className="col-12 p-3 rounded li-y-shadow border-0 no-out"
                    onChange={(e) =>
                      setLocData({ ...locData, contact: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* <div className="col-md-5 bg-dark "> */}
              <div className="mt-4 bg-white px-4 pt-3 pb-4 br-10 li-shadow purple col-md-5">
                <div className="fw-bold purple mb-1">Event Date</div>
                <input
                  type="date"
                  className="col-12 p-3 rounded li-y-shadow border-0 mb-4 no-out"
                  onChange={(e) =>
                    setLocData({ ...locData, date: e.target.value })
                  }
                  required
                />
                <div className="fw-bold purple mb-1">Event Description</div>
                <textarea
                  className="col-12 li-y-shadow border-0 rounded p-2 mb-4 no-out"
                  rows="4"
                  onChange={(e) =>
                    setLocData({ ...locData, description: e.target.value })
                  }
                  required
                />
                <div className="fw-bold purple mb-1">
                  Event Rules (optional)
                </div>
                <textarea
                  className="col-12 li-y-shadow border-0 rounded p-2 no-out"
                  rows="4"
                  onChange={(e) =>
                    setLocData({ ...locData, rules: e.target.value })
                  }
                  // required
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                onClick={handleSubmit}
                className="bg-white purple br-10 d-sm-none mt-4 mb-2 col-4 mx-auto li-shadow"
                style={{
                  textTransform: "initial",
                  fontWeight: "600",
                  boxShadow: "0px 8px 10px #0000005e",
                }}
              >
                Create Event
              </Button>
              {/* </div> */}

              {/* <div className="my-2 mx-auto">
                {alert && (
                  <Alert severity="error">Event poster is not added!</Alert>
                )}
              </div> */}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
