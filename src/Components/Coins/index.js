import React, { Component } from "react";

import Percentage from "../Percentage";

class Coins extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.data.id === nextProps.data.id) return false;
    return true;
  }
  render() {
    const baseImgUrl = "https://s2.coinmarketcap.com/static/img/coins/32x32/";
    const {
      id,
      name,
      rank,
      quotes: {
        USD: { percent_change_1h, percent_change_7d, percent_change_24h, price }
      }
    } = this.props.data;
    return (
      <div className="coin">
        <div className="coin-name" id={id}>
          <img src={baseImgUrl + id + ".png"} alt={name + " icon"} />
          {name}
        </div>
        <div className="rank">
          <span>Rank: </span>
          <span>{rank}</span>
        </div>
        <div className="price">
          <span>Price: </span>
          <span>{price}$</span>
        </div>
        <div className="price_change">
          <Percentage percent={percent_change_1h} name="hour" />
          <Percentage percent={percent_change_24h} name="day" />
          <Percentage percent={percent_change_7d} name="week" />
        </div>
      </div>
    );
  }
}

export default Coins;
