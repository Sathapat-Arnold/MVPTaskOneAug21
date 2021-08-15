import React, { Component } from "react";
import axios from "axios";
import { Button, Modal, Form, Header } from "semantic-ui-react";

export default class CreateCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
    };
  }

  handleCustomerNameChange = (name) => {
    this.setState({ name: name });
  };

  handleCustomerAddressChange = (address) => {
    this.setState({ address: address });
  };

  createCustomer = (name, address) => {
    axios
      .post("api/Customer", {
        name: name,
        address: address,
      })
      .then(({ data }) => {
        console.log();
        this.props.fetchCustomer();
        this.props.toggleCreateCustomerModal(false);
        this.setState({ name: "" });
        this.setState({ address: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <Modal open={this.props.open}>
          <Modal.Header>Create Customer</Modal.Header>
          <Modal.Content>
          <Header color="red">Items marked * are mandatory</Header>
            <Form>
              <Form.Field required>
                <label>Name</label>
                <input
                  placeholder="Name"
                  errorMessages={["this field is required"]}
                  onChange={(e) =>
                    this.handleCustomerNameChange(e.target.value)
                  }
                />
              </Form.Field>
              <Form.Field required>
                <label>Address</label>
                <input
                  placeholder="Address"
                  onChange={(e) =>
                    this.handleCustomerAddressChange(e.target.value)
                  }
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="black"
              onClick={() => this.props.toggleCreateCustomerModal(false)}
            >
              Cancel
            </Button>
            <Button
              content="Create"
              labelPosition="right"
              icon="checkmark"
              //onClick={() => this.props.toggleCreateCustomerModal(false)}
              onClick={() =>
                this.createCustomer(this.state.name, this.state.address)
              }
              positive
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
