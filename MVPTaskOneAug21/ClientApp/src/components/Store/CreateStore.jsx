import React, { Component } from "react";
import axios from "axios";
import { Button, Modal, Form, Header } from "semantic-ui-react";

export default class CreateStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
    };
  }

  handleStoreNameChange = (name) => {
    this.setState({ name: name });
  };

  handleStoreAddressChange = (address) => {
    this.setState({ address: address });
  };

  createStore = (name, address) => {
    axios
      .post("api/Store", {
        name: name,
        address: address,
      })
      .then(({ data }) => {
        console.log();
        this.props.fetchStore();
        this.props.toggleCreateStoreModal(false);
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
          <Modal.Header>Create Store</Modal.Header>
          <Modal.Content>
          <Header color="red">Items marked * are mandatory</Header>
            <Form>
              <Form.Field required>
                <label>Name</label>
                <input
                  placeholder="Name"
                  errorMessages={["this field is required"]}
                  onChange={(e) =>
                    this.handleStoreNameChange(e.target.value)
                  }
                />
              </Form.Field>
              <Form.Field required>
                <label>Address</label>
                <input
                  placeholder="Address"
                  onChange={(e) =>
                    this.handleStoreAddressChange(e.target.value)
                  }
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="black"
              onClick={() => this.props.toggleCreateStoreModal(false)}
            >
              Cancel
            </Button>
            <Button
              content="Create"
              labelPosition="right"
              icon="checkmark"
              
              onClick={() =>
                this.createStore(this.state.name, this.state.address)
              }
              positive
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
