import React, { Component } from "react";
import axios from "axios";
import { Button, Modal, Form, Header} from "semantic-ui-react";

class EditCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCustomerName: "",
      newCustomerAddress: "",
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      newCustomerName: props.name,
      newCustomerAddress: props.address,
    });
  }

  handleCustomerNameChange = (name) => {
    this.setState({ newCustomerName: name });
  };

  handleCustomerAddressChange = (address) => {
    this.setState({ newCustomerAddress: address });
  };

  handleUpdate = (id, name, address) => {
    axios
      .put(`/api/Customer/${id}`, {
        id: id,
        name: name,
        address: address,
      })
      .then(({ data }) => {
        console.log(data);
        this.props.fetchCustomer();
        this.props.toggleEditCustomerModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    console.log("The init sate is" + this.props.name);

    return (
      <div>
        <Modal open={this.props.open}>
          <Modal.Header>Edit Customer</Modal.Header>
          <Modal.Content>
          <Header color="red">Items marked * are mandatory</Header>
            <Form>
              <Form.Field required>
                <label>Name</label>
                <input
                  defaultValue={this.props.name}
                  onChange={(e) =>
                    this.handleCustomerNameChange(e.target.value)
                  }
                />
              </Form.Field >
              <Form.Field required>
                <label>Address</label>
                <input
                  defaultValue={this.props.address}
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
              onClick={() => this.props.toggleEditCustomerModal(false)}
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
                  this.state.newCustomerName,
                  this.state.newCustomerAddress
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

export default EditCustomer;
