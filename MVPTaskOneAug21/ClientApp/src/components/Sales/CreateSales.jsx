import React, { Component } from "react";
import axios from "axios";
import { Button, Modal, Form, Header, Dropdown } from "semantic-ui-react";

export default class CreateSales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateSold: "",
      customerId: 0,
      productId: 0,
      storeId: 0,
    };
  }

  handleDateSoldChange = (value) => {
    this.setState({ dateSold: value });
  };

  handleCustomerIdChange = (event, { value }) => {
    this.setState({ customerId: value });
  };

  handleProductIdChange = (event, { value }) => {
    this.setState({ productId: value });
  };

  handleStoreIdChange = (event, { value }) => {
    this.setState({ storeId: value });
  };

  createSales = (dateSold, customerID, productID, storeID) => {
    axios
      .post("api/Sales", {
        dateSold: dateSold,
        customerID: customerID,
        productID: productID,
        storeID: storeID,
      })
      .then(({ data }) => {
        console.log();
        this.props.fetchSales();
        this.props.toggleCreateSalesModal(false);
        this.setState({ dateSold: {} });
        this.setState({ customerID: 0 });
        this.setState({ productID: 0 });
        this.setState({ storeID: 0 });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <Modal open={this.props.open}>
          <Modal.Header>Create Sales</Modal.Header>
          <Modal.Content>
            <Header color="red">Items marked * are mandatory</Header>
            <Form>
              <Form.Field required>
                <label>Date sold (dd/mm/yyyy)</label>

                <input
                  type="date"
                  min="1000-01-01"
                  max="2060-12-31"
                  placeholder="dd/mm/yyyy"
                  onChange={(e) => this.handleDateSoldChange(e.target.value)}
                />
              </Form.Field>
              <Form.Field required>
                <label>Customer</label>
                <Dropdown
                  placeholder="Select Customer"
                  fluid
                  selection
                  options={this.props.customer}
                  onChange={this.handleCustomerIdChange}
                />
                <label>Product</label>
                <Dropdown
                  placeholder="Select Product"
                  fluid
                  selection
                  options={this.props.product}
                  onChange={this.handleProductIdChange}
                />
                <label>Store</label>
                <Dropdown
                  placeholder="Select Store"
                  fluid
                  selection
                  options={this.props.store}
                  onChange={this.handleStoreIdChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="black"
              onClick={() => this.props.toggleCreateSalesModal(false)}
            >
              Cancel
            </Button>
            <Button
              content="Create"
              labelPosition="right"
              icon="checkmark"
              onClick={() =>
                this.createSales(
                  this.state.dateSold,
                  this.state.customerId,
                  this.state.productId,
                  this.state.storeId
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
