import React, { Component } from "react";

import Main from "./Components/Main";
import Header from "./Components/Header";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      input: ""
    };
  }

  generatePromises = () => {
    const urlArray = [];
    const baseUrl =
      "https://api.coinmarketcap.com/v2/ticker/?limit=100&structure=array&sort=rank";

    for (let i = 0; i < 16; i++) {
      urlArray.push(baseUrl + `&start=${i * 100 + 1}`);
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
        <Header />
        <Main data={this.state.data} />
      </div>
    );
  }
}

export default App;
