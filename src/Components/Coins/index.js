import React from "react";

const Coins = props => {
  const baseImgUrl = "https://s2.coinmarketcap.com/static/img/coins/16x16/";
  const {
    id,
    name,
    rank,
    quotes: {
      USD: { percent_change_1h, percent_change_7d, percent_change_24h, price }
    }
  } = props.data;
  return (
    <div className="coin">
      <div className="coin-name" id={id}>
        <img src={baseImgUrl + id + ".png"} alt={name + " icon"} />
        {name}
      </div>
      <div className="rank">
        Rank: <span>{rank}</span>
      </div>
      <div className="price">
        Price: <span>{price}$</span>
      </div>
      <div className="price_change">
        <div className="percentage_change_1h">
          Change last hour: <span>{percent_change_1h}%</span>
        </div>
        <div className="percentage_change_24h">
          Change last day: <span>{percent_change_24h}%</span>
        </div>
        <div className="percentage_change_7d">
          Change last week: <span>{percent_change_7d}%</span>
        </div>
      </div>
    </div>
  );
};

export default Coins;
