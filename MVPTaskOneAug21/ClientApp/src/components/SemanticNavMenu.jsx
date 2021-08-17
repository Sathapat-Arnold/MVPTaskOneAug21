import React, { Component } from "react";
import { Input, Menu } from "semantic-ui-react";
import { NavLink, withRouter } from "react-router-dom";
import "./NavMenu.css";

export class SemanticNavMenu extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu inverted>
        <Menu.Item
          as={NavLink}
          header
          to="/"
          name="home"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
        >
          MVPTaskOneAug21
        </Menu.Item>
        

        <Menu.Item
          as={NavLink}
          to="/customer"
          name="Customers"
          active={activeItem === "customer"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={NavLink}
          to="/product"
          name="Products"
          active={activeItem === "product"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={NavLink}
          to="/store"
          name="Stores"
          active={activeItem === "store"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={NavLink}
          to="/sales"
          name="Sales"
          active={activeItem === "sales"}
          onClick={this.handleItemClick}
        />
      </Menu>
    );
  }
}
