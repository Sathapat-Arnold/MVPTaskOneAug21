import React, { Component } from "react";
import axios from "axios";
import { Button, Header, Modal} from "semantic-ui-react";

class DeleteProduct extends Component {
  handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`/api/Product/${id}`)
      .then(({ data }) => {
        console.log(data);
        this.props.fetchProduct();
        this.props.toggleDeleteProductModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <Modal open={this.props.open}>
          <Modal.Header>Delete Product</Modal.Header>
          <Modal.Content>
            <Header>Are you sure?</Header>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="black"
              onClick={() => this.props.toggleDeleteProductModal(false)}
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

export default DeleteProduct;
