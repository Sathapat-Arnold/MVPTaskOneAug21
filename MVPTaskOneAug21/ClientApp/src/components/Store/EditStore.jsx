import React, { Component } from "react";
import axios from "axios";
import { Button, Modal, Form, Header} from "semantic-ui-react";

class EditStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newStoreName: "",
      newStoreAddress: "",
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      newStoreName: props.name,
      newStoreAddress: props.address,
    });
  }

  handleStoreNameChange = (name) => {
    this.setState({ newStoreName: name });
  };

  handleStoreAddressChange = (address) => {
    this.setState({ newStoreAddress: address });
  };

  handleUpdate = (id, name, address) => {
    axios
      .put(`/api/Store/${id}`, {
        id: id,
        name: name,
        address: address,
      })
      .then(({ data }) => {
        console.log(data);
        this.props.fetchStore();
        this.props.toggleEditStoreModal(false);
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
          <Modal.Header>Edit Store</Modal.Header>
          <Modal.Content>
          <Header color="red">Items marked * are mandatory</Header>
            <Form>
              <Form.Field required>
                <label>Name</label>
                <input
                  defaultValue={this.props.name}
                  onChange={(e) =>
                    this.handleStoreNameChange(e.target.value)
                  }
                />
              </Form.Field >
              <Form.Field required>
                <label>Address</label>
                <input
                  defaultValue={this.props.address}
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
              onClick={() => this.props.toggleEditStoreModal(false)}
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
                  this.state.newStoreName,
                  this.state.newStoreAddress
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

export default EditStore;
