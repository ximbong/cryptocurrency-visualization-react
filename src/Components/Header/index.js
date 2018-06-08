import React from "react";
import Input from "../Input";
import Button from "../Button";

const Header = () => {
  return (
    <div className="buttons">
      <Input />
      <div className="sort-buttons">
        <Button id="name" />
        <Button id="price" />
        <Button id="name" />
      </div>
    </div>
  );
};

export default Header;
