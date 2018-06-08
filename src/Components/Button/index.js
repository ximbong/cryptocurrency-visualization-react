import React from "react";

const Button = ({ id }) => {
  return (
    <button className="sort" id={id}>
      Sort by {id}
    </button>
  );
};

export default Button;
