import React from "react";
import pagenot from "../assets/images/pagenot.gif";

function PageNotFound() {
  return (
    <div className="vh-100 bg-white">
      <div className="bg-white text-center col-12">
        <div
          className="h3 col-12 col-sm-8 col-md-6 col-lg-4 p-4 fw-bold mx-auto text-white bg-linearlr text-center"
          style={{
            borderRadius: "0px 0px 15px 15px",
            boxShadow: "0px 0px 10px #000000",
          }}
        >
          Page not Found
        </div>
      </div>
      <div className="text-center h-75 d-flex align-justify-center">
        <img className="" src={pagenot} width="400px" height="400px" />
      </div>
    </div>
  );
}

export default PageNotFound;
