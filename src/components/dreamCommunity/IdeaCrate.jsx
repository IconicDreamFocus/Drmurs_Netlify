import { useState } from "react";
import { useDispatch } from "react-redux";
import LightModeIcon from "@mui/icons-material/LightMode";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { addIdeaCreate } from "../../slices/ideaCreate";
import { useHistory } from "react-router-dom";
import * as React from "react";
import DialogActions from "@mui/material/DialogActions";
import { endpoint, token, config } from "../../endpoint";
import axios from "axios";

const PurpleTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    color: "#a11cf9",
    backgroundColor: "#ffffff",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

export default function IdeaCrate({ setOpen }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [events, setEvents] = useState(false);

  const [userData, setUserData] = useState({
    query: "",
  });

  function handleSubmit() {
    let noofErrors = 0;
    Object.values(userData).forEach((val) => {
      if (val === "") {
        noofErrors++;
      }
    });

    const data = {
      text: userData.query,
      topic: 1,
    };
    if (noofErrors === 0) {
      dispatch(
        addIdeaCreate({
          query: userData.query,
        })
      );
      axios.post(`${endpoint}/question`, { data }, config);
    }
  }
  return (
    <>
      <div className="rounded-4 bg-purple vh-40 position-relative pt-1">
        <div>
          <div className="d-flex justify-content-between m-4 align-items-center">
            <div className="form-floating m-3 w-100 ">
              <input
                type="text"
                className="form-control curve no-out"
                id="floatingInput"
                onChange={(e) =>
                  setUserData({ ...userData, query: e.target.value })
                }
              />
              <label className="text-dark" for="floatingInput">
                Query
              </label>
            </div>
          </div>
          <div className="divide"></div>
          <div className="align-items-right justify-content-end mx-5 mt-md-3">
            <DialogActions>
              <Button
                className="bg-white purple mx-1 mb-3 my-2"
                variant="contained"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-white purple mb-3 my-2"
                variant="contained"
                onClick={handleSubmit}
              >
                Post
              </Button>
            </DialogActions>
          </div>
        </div>
      </div>
    </>
  );
}
