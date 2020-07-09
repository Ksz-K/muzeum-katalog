import React, { Fragment } from "react";
import spinner from "./spinner.gif";

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{
        width: "75vw",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 0,
        display: "block",
      }}
      alt="Loading..."
    />
  </Fragment>
);
