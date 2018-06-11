import React, { Component } from "react";

import Header from "./Components/Header";
import Coins from "./Components/Coins";
import Loader from "./Components/Loader";
import LoadMoreButton from "./Components/LoadMoreButton";
import Title from "./Components/Title";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      input: "",
      sortType: "rank",
      lastIndex: 100, //lastIndex describes the number of coins on the page
      loader: true
    };
  }

  handleInput = e => {
    this.setState({
      input: e.target.value
    });
  };

  handleSort = e => {
    this.setState({
      sortType: e.target.id
    });
  };

  resetIndex = () => {
    this.setState({
      lastIndex: 100
    });
  };

  increaseIndex = () => {
    this.setState(prevState => ({
      lastIndex: prevState.lastIndex + 100
    }));
  };

  generatePromises = () => {
    const urlArray = [];
    const baseUrl =
      "https://api.coinmarketcap.com/v2/ticker/?limit=100&structure=array&sort=rank";

    for (let i = 0; i < 16; i++) {
      //generate 1600 coins
      urlArray.push(baseUrl + `&start=${i * 100 + 1}`); //customize URLs
    }

    return urlArray.map(url => fetch(url));
  };

  sort = (array, category) => {
    let renderData = [...array];

    switch (category) {
      case "price": {
        renderData.sort(function(a, b) {
          return b.quotes.USD.price - a.quotes.USD.price;
        });
        break;
      }
      case "name": {
        // eslint-disable-next-line
        renderData.sort(function(a, b) {
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
        renderData.sort(function(a, b) {
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

  componentDidMount() {
    Promise.all(this.generatePromises())
      .then(response => {
        return Promise.all(response.map(response => response.json()));
      })
      .then(response => {
        return response.reduce(
          (acc, element) => acc.concat(...element.data),
          []
        );
      })
      .then(response => {
        setTimeout(() => {
          this.setState({
            data: response,
            loader: false
          });
        }, 2000);
      });
  }

  render() {
    const { data, input, sortType, lastIndex, loader } = this.state;

    const renderData = this.sort(data, sortType);
    const filterArray = this.filter(renderData, input);

    const listCoins = filterArray
      .slice(0, lastIndex)
      .map((e, i) => <Coins data={e} key={i} />);

    return (
      <div>
        <Header
          handleSort={this.handleSort}
          handleInput={this.handleInput}
          resetIndex={this.resetIndex}
        />
        <div className="container">
          {loader && <Loader />}
          <Title length={filterArray.length} />
          {listCoins}
          {filterArray.length > lastIndex && (
            <LoadMoreButton increaseIndex={this.increaseIndex} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
