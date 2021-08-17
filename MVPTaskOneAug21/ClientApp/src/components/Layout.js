import React, { Component } from "react";
import { Container } from "reactstrap";
import { SemanticNavMenu } from "./SemanticNavMenu";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <SemanticNavMenu />
        <Container>{this.props.children}</Container>
      </div>
    );
  }
}
