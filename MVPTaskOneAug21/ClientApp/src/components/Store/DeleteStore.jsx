import React, { Component } from "react";
import axios from "axios";
import { Button, Header, Modal} from "semantic-ui-react";

class DeleteStore extends Component {
  handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`/api/Store/${id}`)
      .then(({ data }) => {
        console.log(data);
        this.props.fetchStore();
        this.props.toggleDeleteStoreModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <Modal open={this.props.open}>
          <Modal.Header>Delete Store</Modal.Header>
          <Modal.Content>
            <Header>Are you sure?</Header>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="black"
              onClick={() => this.props.toggleDeleteStoreModal(false)}
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

export default DeleteStore;
