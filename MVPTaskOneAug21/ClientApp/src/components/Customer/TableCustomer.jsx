import _ from "lodash";
import React, { Component } from "react";
import DeleteCustomer from "./DeleteCustomer";
import DeleteCustomerAlertModal from "./DeleteCustomerAlertModal";
import EditCustomer from "./EditCustomer";
import { Table, Button } from "semantic-ui-react";
import axios from "axios";
import "../../custom.css";

export default class TableCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteCustomerModal: false,
      deleteCustomerAlertModal: false,
      deleteCustomerId: null,
      editCustomerModal: false,
      editCustomerId: null,
      editCustomerName: "",
      editCustomerAddress: "",
    };
  }

  componentDidUpdate() {
    console.log("I have updated");
  }

  handleDelete = (id) => {
    axios
      .delete(`/api/Customer/${id}`)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggleDeleteCustomerAlertModal = (value) => {
    this.setState({ deleteCustomerAlertModal: value });
  };

  toggleDeleteCustomerModal = (value, id, soldCustomerId) => {
    if (soldCustomerId == "") {
      this.setState({ deleteCustomerModal: value });
      this.setState({ deleteCustomerId: id });
    } else {
      this.setState({ deleteCustomerModal: false });
      this.toggleDeleteCustomerAlertModal(value);
    }
  };

  toggleEditCustomerModal = (value, id, name, address) => {
    this.setState({ editCustomerModal: value });
    this.setState({ editCustomerId: id });
    this.setState({ editCustomerName: name });
    this.setState({ editCustomerAddress: address });
  };

  render() {
    const {
      deleteCustomerModal,
      deleteCustomerAlertModal,
      deleteCustomerId,
      editCustomerModal,
      editCustomerId,
      editCustomerName,
      editCustomerAddress,
    } = this.state;

    const useSortableData = (items, config = null) => {
      const [sortConfig, setSortConfig] = React.useState(config);

      const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
          sortableItems.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
              return sortConfig.direction === "ascending" ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
              return sortConfig.direction === "ascending" ? 1 : -1;
            }
            return 0;
          });
        }
        return sortableItems;
      }, [items, sortConfig]);

      const requestSort = (key) => {
        let direction = "ascending";
        if (
          sortConfig &&
          sortConfig.key === key &&
          sortConfig.direction === "ascending"
        ) {
          direction = "descending";
        }
        setSortConfig({ key, direction });
      };

      return { items: sortedItems, requestSort, sortConfig };
    };

    const DisplayTable = (props) => {
      const { items, requestSort, sortConfig } = useSortableData(
        props.customers
      );
      const getClassNamesFor = (name) => {
        if (!sortConfig) {
          return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
      };
      return (
        <div>
          <Table celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  onClick={() => requestSort("name")}
                  className={getClassNamesFor("name")}
                >
                  Name
                </Table.HeaderCell>
                <Table.HeaderCell
                  onClick={() => requestSort("address")}
                  className={getClassNamesFor("address")}
                >
                  Address
                </Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {items.map((customer) => (
                <Table.Row key={customer.id}>
                  <Table.Cell>{customer.name}</Table.Cell>
                  <Table.Cell>{customer.address}</Table.Cell>
                  <Table.Cell>
                    <Button
                      color="yellow"
                      onClick={() =>
                        this.toggleEditCustomerModal(
                          true,
                          customer.id,
                          customer.name,
                          customer.address
                        )
                      }
                    >
                      EDIT
                    </Button>
                  </Table.Cell>

                  <Table.Cell>
                    <Button
                      color="red"
                      onClick={() =>
                        this.toggleDeleteCustomerModal(
                          true,
                          customer.id,
                          customer.productSold.map((c) => c.customerID)
                        )
                      }
                    >
                      DELETE
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      );
    };

    return (
      <div>
        <DisplayTable customers={this.props.posts} />
        <DeleteCustomer
          open={deleteCustomerModal}
          id={deleteCustomerId}
          toggleDeleteCustomerModal={this.toggleDeleteCustomerModal}
          fetchCustomer={this.props.fetchCustomer}
        />
        <DeleteCustomerAlertModal
          open={deleteCustomerAlertModal}
          toggleDeleteCustomerAlertModal={this.toggleDeleteCustomerAlertModal}
        />
        <EditCustomer
          open={editCustomerModal}
          id={editCustomerId}
          name={editCustomerName}
          address={editCustomerAddress}
          toggleEditCustomerModal={this.toggleEditCustomerModal}
          fetchCustomer={this.props.fetchCustomer}
        />
      </div>
    );
  }
}
