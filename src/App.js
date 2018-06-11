import React, { Component } from "react";

import Main from "./Components/Main";
import Header from "./Components/Header";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      input: "",
      sortType: "rank",
      lastIndex: 100 //lastIndex describes the number of coins on the page
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
      counter: prevState.lastIndex + 100
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
        this.setState({ data: response });
      });
  }

  render() {
    return (
      <div>
        <Header
          handleSort={this.handleSort}
          handleInput={this.handleInput}
          resetIndex={this.resetIndex}
        />
        <Main
          increaseIndex={this.increaseIndex}
          dataArray={this.state.data}
          sortType={this.state.sortType}
          inputValue={this.state.input}
          lastIndex={this.state.lastIndex}
        />
      </div>
    );
  }
}

export default App;
