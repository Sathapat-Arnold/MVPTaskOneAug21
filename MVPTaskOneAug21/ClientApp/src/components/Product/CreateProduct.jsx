import React, { Component } from "react";
import axios from "axios";
import { Button, Modal, Form, Header } from "semantic-ui-react";

export default class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
    };
  }

  handleProductNameChange = (name) => {
    this.setState({ name: name });
    console.log(name);
    console.log("current state name is --> " + this.state.name);
  };

  handleProductPriceChange = (price) => {
    this.setState({ price: price });
    console.log(price);
    console.log("current state price is --> " + this.state.price);
  };

  createProduct = (name, price) => {
    console.log("name " + name + "id " + price);
    axios
      .post("api/Product", {
        name: name,
        price: price,
      })
      .then(({ data }) => {
        console.log();
        this.props.fetchProduct();
        this.props.toggleCreateProductModal(false);
        this.setState({ name: "" });
        this.setState({ price: 0 });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <Modal open={this.props.open}>
          <Modal.Header>Create Product</Modal.Header>
          <Modal.Content>
            <Header color="red">Items marked * are mandatory</Header>
            <Form>
              <Form.Field required>
                <label>Name</label>
                <input
                  placeholder="Name"
                  onChange={(e) => this.handleProductNameChange(e.target.value)}
                />
              </Form.Field>
              <Form.Field required>
                <label>Price</label>
                <input
                  type="number"
                  min="0"
                  placeholder="Price"
                  onChange={(e) =>
                    this.handleProductPriceChange(parseFloat(e.target.value))
                  }
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="black"
              onClick={() => this.props.toggleCreateProductModal(false)}
            >
              Cancel
            </Button>
            <Button
              content="Create"
              labelPosition="right"
              icon="checkmark"
              onClick={() =>
                this.createProduct(this.state.name, this.state.price)
              }
              positive
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
