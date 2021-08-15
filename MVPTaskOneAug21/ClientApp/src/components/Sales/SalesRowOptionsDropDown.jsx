import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

export default class SalesRowOptionsDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowNumber: 5,
    };
  }

  rowOptions = [
    {
      key: "1",
      text: " 1",
      value: "1",
    },
    {
      key: "5",
      text: " 5",
      value: "5",
    },
    {
      key: "10",
      text: " 10",
      value: "10",
    },
  ];

  setRow = (event, { value }) => {
    this.props.handleRowOptionsDropDown(value);
  };

  render() {
    return (
      <div>
        <span>
          Show rows:{" "}
          <Dropdown
            className="MVPTask1DropDown"
            inline
            options={this.rowOptions}
            defaultValue={this.rowOptions[1].value}
            onChange={this.setRow}
          />
        </span>
      </div>
    );
  }
}
