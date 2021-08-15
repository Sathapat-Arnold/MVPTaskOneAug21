import React, { Component } from "react";
import axios from "axios";
import { Button, Header, Modal} from "semantic-ui-react";

class DeleteCustomer extends Component {
  handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`/api/Customer/${id}`)
      .then(({ data }) => {
        console.log(data);
        this.props.fetchCustomer();
        this.props.toggleDeleteCustomerModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <Modal open={this.props.open}>
          <Modal.Header>Delete Customer</Modal.Header>
          <Modal.Content>
            <Header>Are you sure?</Header>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="black"
              onClick={() => this.props.toggleDeleteCustomerModal(false)}
            >
              Cancel
            </Button>
            <Button
              content="Delete"
              labelPosition="right"
              icon="checkmark"
              onClick={() => this.handleDelete(this.props.id)}
              negative
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default DeleteCustomer;
