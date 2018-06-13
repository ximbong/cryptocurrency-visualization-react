import React from "react";
import "font-awesome/css/font-awesome.min.css";

const Percentage = ({ percent, name }) => {
  let element;
  if (percent === 0) {
    element = <span>0%</span>;
  } else if (percent > 0) {
    element = (
      <span className="increase">
        {percent}% <i className="fa fa-caret-up" />
      </span>
    );
  } else if (percent < 0) {
    element = (
      <span className="decrease">
        {percent}% <i className="fa fa-caret-down" />
      </span>
    );
  }
  return (
    <div>
      <span>Change last {name}: </span>
      <span>{element}</span>
    </div>
  );
};

export default Percentage;
