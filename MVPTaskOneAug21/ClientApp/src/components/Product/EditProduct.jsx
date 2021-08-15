import React, { Component } from "react";
import axios from "axios";
import { Button, Modal, Form, Header } from "semantic-ui-react";

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProductName: "",
      newProductPrice: 0,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      newProductName: props.name,
      newProductPrice: props.price,
    });
  }

  handleProductNameChange = (name) => {
    this.setState({ newProductName: name });
  };

  handleProductPriceChange = (price) => {
    this.setState({ newProductPrice: price });
  };

  handleUpdate = (id, name, price) => {
    axios
      .put(`/api/product/${id}`, {
        id: id,
        name: name,
        price: price,
      })
      .then(({ data }) => {
        console.log(data);
        this.props.fetchProduct();
        this.props.toggleEditProductModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <Modal open={this.props.open}>
          <Modal.Header>Edit Product</Modal.Header>
          <Modal.Content>
            <Header color="red">Items marked * are mandatory</Header>
            <Form>
              <Form.Field required>
                <label>Name</label>
                <input
                  defaultValue={this.props.name}
                  onChange={(e) => this.handleProductNameChange(e.target.value)}
                />
              </Form.Field>
              <Form.Field required>
                <label>Price</label>
                <input
                  type="number"
                  min="0"
                  defaultValue={this.props.price}
                  onChange={(e) =>
                    this.handleProductPriceChange(e.target.value)
                  }
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="black"
              onClick={() => this.props.toggleEditProductModal(false)}
            >
              Cancel
            </Button>
            <Button
              content="Edit"
              labelPosition="right"
              icon="checkmark"
              onClick={() =>
                this.handleUpdate(
                  this.props.id,
                  this.state.newProductName,
                  parseFloat(this.state.newProductPrice)
                )
              }
              positive
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default EditProduct;
