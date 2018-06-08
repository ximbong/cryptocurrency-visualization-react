import React, { Component } from "react";

class Input extends Component {
  handleChange = event => {
    const value = event.target.value;
    this.props.onChange(value);
  };
  render() {
    return (
      <div className="input">
        <input type="text" onInput={this.handleChange} />
      </div>
    );
  }
}

export default Input;
