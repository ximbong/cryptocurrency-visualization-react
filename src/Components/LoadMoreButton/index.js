import React from "react";

const LoadMoreButton = ({ increaseIndex }) => {
  return (
    <div className="load-more" onClick={increaseIndex}>
      Load more
    </div>
  );
};

export default LoadMoreButton;
