import React, { Component } from "react";
import Input from "../Input";
import Button from "../Button";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
  }
  handleChange = value => {
    this.setState({
      input: value
    });
  };
  render() {
    return (
      <div className="buttons">
        <Input onChange={this.handleChange} />
        <div className="sort-buttons">
          <Button id="name" />
          <Button id="price" />
          <Button id="name" />
        </div>
      </div>
    );
  }
}

export default Header;
