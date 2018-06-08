import React, { Component } from "react";

import Coins from "../Coins";

const Main = ({ data }) => {
  const listCoins = data.map((e, i) => <Coins data={e} key={i} />);
  return <div className="container">{listCoins}</div>;
};

export default Main;
