import _ from "lodash";
import React, { Component } from "react";
import DeleteStore from "./DeleteStore";
import EditStore from "./EditStore";
import { Table, Button } from "semantic-ui-react";
import axios from "axios";
import "../../custom.css";

export default class TableStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteStoreModal: false,
      deleteStoreId: null,
      editStoreModal: false,
      editStoreId: null,
      editStoreName: "",
      editStoreAddress: "",
    };
  }

  
  handleDelete = (id) => {
    axios
      .delete(`/api/Store/${id}`)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggleDeleteStoreModal = (value, id) => {
    this.setState({ deleteStoreModal: value });
    this.setState({ deleteStoreId: id });
  };

  toggleEditStoreModal = (value, id, name, address) => {
    this.setState({ editStoreModal: value });
    this.setState({ editStoreId: id });
    this.setState({ editStoreName: name });
    this.setState({ editStoreAddress: address });
  };

  render() {
    const {
      deleteStoreModal,
      deleteStoreId,
      editStoreModal,
      editStoreId,
      editStoreName,
      editStoreAddress,
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
        props.stores
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
              {items.map((store) => (
                <Table.Row key={store.id}>
                  <Table.Cell>{store.name}</Table.Cell>
                  <Table.Cell>{store.address}</Table.Cell>
                  <Table.Cell>
                    <Button
                      color="yellow"
                      onClick={() =>
                        this.toggleEditStoreModal(
                          true,
                          store.id,
                          store.name,
                          store.address
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
                        this.toggleDeleteStoreModal(true, store.id)
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
        <DisplayTable stores={this.props.posts} />
        <DeleteStore
          open={deleteStoreModal}
          id={deleteStoreId}
          toggleDeleteStoreModal={this.toggleDeleteStoreModal}
          fetchStore={this.props.fetchStore}
        />
        <EditStore
          open={editStoreModal}
          id={editStoreId}
          name={editStoreName}
          address={editStoreAddress}
          toggleEditStoreModal={this.toggleEditStoreModal}
          fetchStore={this.props.fetchStore}
        />
      </div>
    );
  }
}
