import React, { Component } from "react";

import LoadMoreButton from "../LoadMoreButton";
import Coins from "../Coins";

class Main extends Component {
  sort = (array, category) => {
    let renderData = [];

    switch (category) {
      case "price": {
        renderData = array.sort(function(a, b) {
          return b.quotes.USD.price - a.quotes.USD.price;
        });
        break;
      }
      case "name": {
        renderData = array.sort(function(a, b) {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        });
        break;
      }
      default: {
        renderData = array.sort(function(a, b) {
          return a.rank - b.rank;
        });
      }
    }

    return renderData;
  };

  filter = (array, value) => {
    const filterArray = array.filter(function(element) {
      return element.name.toLowerCase().includes(value.toLowerCase());
    });
    return filterArray;
  };

  render() {
    const { dataArray, inputValue, sortType } = this.props;

    const renderData = this.sort(dataArray, sortType);
    const filterArray = this.filter(renderData, inputValue);

    const listCoins = filterArray
      .slice(0, this.props.lastIndex)
      .map((e, i) => <Coins data={e} key={i} />);

    return (
      <div className="container">
        {listCoins}
        {filterArray.length > this.props.lastIndex && (
          <LoadMoreButton increaseIndex={this.props.increaseIndex} />
        )}
      </div>
    );
  }
}

export default Main;
