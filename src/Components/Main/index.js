import React, { Component } from "react";

import LoadMoreButton from "../LoadMoreButton";
import Coins from "../Coins";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: "rank",
      lastIndex: 100
    };
  }
  render() {
    const renderData = this.props.data.slice(0, this.state.lastIndex);
    const listCoins = renderData.map((e, i) => <Coins data={e} key={i} />);
    return (
      <div className="container">
        {listCoins}
        <LoadMoreButton />
      </div>
    );
  }
}

export default Main;
