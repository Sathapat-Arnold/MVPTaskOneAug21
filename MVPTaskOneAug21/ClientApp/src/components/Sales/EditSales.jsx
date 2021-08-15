import React, { Component } from "react";
import axios from "axios";
import { Button, Modal, Form, Header, Dropdown } from "semantic-ui-react";

class EditSales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newDate: "",
      newCustomerId: 0,
      newProductId: 0,
      newStoreId: 0,
      customerName: "",
      productName: "",
      storeName: "",
    };
  }

  fetchCustomer = () => {
    axios
      .get("/api/Customer")
      .then(({ data }) => {
        const c = data.map((customer) => {
          return {
            key: customer.id,
            text: customer.name,
            value: customer.id,
          };
        });
        console.log(data);
        this.setState({
          customerName: c,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchProduct = () => {
    axios
      .get("/api/Product")
      .then(({ data }) => {
        const p = data.map((product) => {
          return {
            key: product.id,
            text: product.name,
            value: product.id,
          };
        });
        console.log(data);
        this.setState({
          productName: p,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchStore = () => {
    axios
      .get("/api/Store")
      .then(({ data }) => {
        const s = data.map((store) => {
          return {
            key: store.id,
            text: store.name,
            value: store.id,
          };
        });
        console.log(data);
        this.setState({
          storeName: s,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentWillReceiveProps(props) {
    this.setState({
      newDate: props.editSalesDateSold,
      newCustomerId: props.editSalesCustomerId,
      newProductId: props.editSalesProductId,
      newStoreId: props.editSalesStoreId,
    });
  }

  componentDidMount() {
    console.log("Component Did mount");
    this.fetchCustomer();
    this.fetchProduct();
    this.fetchStore();
  }

  handleSalesDateSoldChange = (value) => {
    this.setState({ newDate: value });
  };

  handleCustomerIdChange = (event, { value }) => {
    this.setState({ newCustomerId: value });
  };

  handleProductIdChange = (event, { value }) => {
    this.setState({ newProductId: value });
  };

  handleStoreIdChange = (event, { value }) => {
    this.setState({ newStoreId: value });
  };

  handleUpdate = (saleId, dateSold, customerId, productId, storeId) => {
    axios
      .put(`/api/sales/${saleId}`, {
        id: saleId,
        dateSold: dateSold,
        customerID: customerId,
        productID: productId,
        storeID: storeId,
      })
      .then(({ data }) => {
        console.log(data);
        this.props.fetchSales();
        this.props.toggleEditSalesModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <Modal open={this.props.open}>
          <Modal.Header>Edit Sales</Modal.Header>
          <Modal.Content>
            <Header color="red">Items marked * are mandatory</Header>
            <Form>
              <Form.Field required>
                <label>Date Sold</label>
                <input
                  type="date"
                  min="1000-01-01"
                  max="2060-12-31"
                  defaultValue={this.props.editSalesDateSold}
                  onChange={(e) =>
                    this.handleSalesDateSoldChange(e.target.value)
                  }
                />
              </Form.Field>
              <Form.Field required>
                <label>Customer</label>
                <Dropdown
                  fluid
                  selection
                  placeholder={this.props.editSalesCustomerName}
                  options={this.state.customerName}
                  onChange={this.handleCustomerIdChange}
                />
                <label>Product</label>
                <Dropdown
                  fluid
                  selection
                  placeholder={this.props.editSalesProductName}
                  options={this.state.productName}
                  onChange={this.handleProductIdChange}
                />
                <label>Store</label>
                <Dropdown
                  fluid
                  selection
                  placeholder={this.props.editSalesStoreName}
                  options={this.state.storeName}
                  onChange={this.handleStoreIdChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="black"
              onClick={() => this.props.toggleEditSalesModal(false)}
            >
              Cancel
            </Button>
            <Button
              content="Edit"
              labelPosition="right"
              icon="checkmark"
              onClick={() =>
                this.handleUpdate(
                  this.props.editSalesId,
                  this.state.newDate,
                  this.state.newCustomerId,
                  this.state.newProductId,
                  this.state.newStoreId
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

export default EditSales;
