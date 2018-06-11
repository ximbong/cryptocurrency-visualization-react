import React, { Component } from "react";

import LoadMoreButton from "../LoadMoreButton";
import Coins from "../Coins";
import Loader from "../Loader";

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
        // eslint-disable-next-line
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
    const { dataArray, inputValue, sortType, lastIndex } = this.props;

    const renderData = this.sort(dataArray, sortType);
    const filterArray = this.filter(renderData, inputValue);

    const listCoins = filterArray
      .slice(0, lastIndex)
      .map(e => <Coins data={e} key={e.id} />);

    return (
      <div className="container">
        {this.props.loader && <Loader />}
        <div className="title">
          There are {filterArray.length} coin(s) in the list
        </div>
        {listCoins}
        {filterArray.length > this.props.lastIndex && (
          <LoadMoreButton increaseIndex={this.props.increaseIndex} />
        )}
      </div>
    );
  }
}

export default Main;
