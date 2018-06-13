import React from "react";

const Title = ({ length }) => {
  return (
    <div className="title">
      <span>Number of coins on the list: </span>
      <span>{length}</span>
    </div>
  );
};

export default Title;
