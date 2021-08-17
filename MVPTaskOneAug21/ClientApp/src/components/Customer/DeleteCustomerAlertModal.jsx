import React, { Component } from "react";
import { Button, Header, Modal } from "semantic-ui-react";

class DeleteCustomerAlertModal extends Component {
  render() {
    return (
      <div>
        <Modal open={this.props.open}>
          <Modal.Header>Warning</Modal.Header>
          <Modal.Content>
            <Header color="red">
              *Cannot delete customer. There is at least one sales order for
              this customer.
            </Header>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="green"
              onClick={() => this.props.toggleDeleteCustomerAlertModal(false)}
            >
              Ok
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default DeleteCustomerAlertModal;
