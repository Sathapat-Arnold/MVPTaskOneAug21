import React, { Component } from "react";
import { Button, Header, Modal } from "semantic-ui-react";

class DeleteStoreAlertModal extends Component {
  render() {
    return (
      <div>
        <Modal open={this.props.open}>
          <Modal.Header>Warning</Modal.Header>
          <Modal.Content>
            <Header color="red">
              *Cannot delete store. There is at least one sales order for
              this store.
            </Header>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="green"
              onClick={() => this.props.toggleDeleteStoreAlertModal(false)}
            >
              Ok
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default DeleteStoreAlertModal;
