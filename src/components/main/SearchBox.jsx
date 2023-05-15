import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { endpoint, config } from "../../endpoint";
import axios from "axios";
import { Avatar } from "@mui/material";
import { useHistory } from "react-router-dom";
import nodata from "../../assets/images/noresult.gif";

function SearchBox({ results, setResults }) {
  const [searchValue, setSearchValue] = useState(null);
  const [searchData, setSearchData] = useState([]);

  const history = useHistory();

  // const classes = styles();

  // results &&
  //   searchValue != "" &&
  useEffect(() => {
    console.log(searchData);
  }, [searchData]);

  useEffect(() => {
    if (searchValue != "") {
      axios
        .get(`${endpoint}/users?name=${searchValue}`, config)
        .then((res) => {
          setSearchData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [searchValue]);

  return (
    <div
      className="col-9 col-sm-10 rounded-pill search-box position-relative"
      //   onClick={()=>{searchValue!="" && setResults(true)}}
    >
      {/* <Box
        className="overflow-hidden d-flex"
        sx={{
          display: "flex",
          alignItems: "flex-end",
          height: "4.3vh",
        }}
      > */}
      {/* <SearchIcon className="my-auto me-0" sx={{ color: "action.active" }} /> */}
      <input
        type="text"
        className=" bg-transparent col-12 my-auto rounded py-1 px-2 no-out"
        placeHolder="Search friends"
        style={{ border: "2px solid #7201c8", fontSize: 14, height: "4.3vh" }}
        // variant="standard"
        // color="secondary"
        onChange={(e) => {
          setResults(true);
          setSearchValue(e.target.value);
        }}
        // sx={{ height: "4vh", p: 0 }}
        // className={classes.textField}
        // margin="normal"
        // InputProps={{
        //   className: classes.input,
        // }}
      />
      {/* </Box> */}
      {results && searchValue != "" && (
        <div
          className="bg-search-box col-12 position-absolute p-3 mt-1"
          style={{
            maxHeight: "95vh",
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}
        >
          {searchData.length == 0 ? (
            <div className="col-12 d-flex flex-column align-justify-center">
              <img
                className="rounded-circle li-shadow"
                src={nodata}
                width="40%"
              />
              <div className="purple fw-600 mt-1">User not Found!</div>
            </div>
          ) : (
            searchData.map((dum, ind) => (
              <div
                key={ind}
                className="p-2 d-flex justify-content-between align-items-center bg-white my-2 cursor-pointer"
                style={{ borderRadius: 10, border: "2px solid #7201c8" }}
                onClick={() => history.push(`/user-profile/${dum.id}`)}
              >
                <div className="d-flex justify-content-start align-items-center">
                  <Avatar
                    alt={dum.profile_pic ? dum.profile_pic.id : dum.username}
                    src={
                      dum.profile_pic
                        ? dum.profile_pic.public_url
                        : dum.username
                    }
                    className="bg-linearlr"
                  />
                  <div className="purple ms-2 search-fs">{dum.username}</div>
                </div>
                {/* {dum.relation && dum.relation.is_accepted ? (
                <div
                  className="bg-linearlr p-1 me-2 col-3 text-center"
                  style={{ borderRadius: 7, fontSize: 12 }}
                  onClick={() => history.push(`/user-profile/${dum.id}`)}
                >
                  Visit
                </div>
              ) : (
                <div
                  className="bg-white p-1 me-2 col-3 text-center purple search-fol"
                  style={{
                    borderRadius: 7,
                    border: "2px solid #7201c8",
                  }}
                  onClick={() => {
                    axios
                      .post(
                        `${endpoint}/follow`,
                        {
                          user_id: dum.id,
                        },
                        config
                      )
                      .then((res) => {
                        console.log(dum.username);
                        console.log(res.data.msg);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  Follow
                </div>
              )} */}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
