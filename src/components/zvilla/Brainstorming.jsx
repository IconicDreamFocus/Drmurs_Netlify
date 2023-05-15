import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function Brainstorming() {
  return (
    <>
      <div className="p-3 row d-flex justify-content-around col-12 px-2 m-0 mb-5 ">
        <Card elevation={4} className=" p-1 bg-purple">
          <CardContent>
            <section id="profile">
              <div className="row">
                <div className="d-flex justify-content-between col-12 "></div>
                <p className="p-2 text-white">No.of Ideas Completed:</p>
                <p className="p-2 text-white">No.of Queries Posted:</p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
