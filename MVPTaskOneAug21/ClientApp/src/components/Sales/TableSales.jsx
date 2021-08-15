import _ from "lodash";
import React, { Component } from "react";
import DeleteSales from "./DeleteSales";
import EditSales from "./EditSales";
import { Table, Button } from "semantic-ui-react";
import axios from "axios";
import "../../custom.css";

export default class TableSales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteSalesModal: false,
      deleteSalesId: null,
      editSalesModal: false,
      editSalesId: 0,
      editSalesDateSold: "",
      editSalesCustomerId: 0,
      editSalesProductId: 0,
      editSalesStoreId: 0,
      editSalesCustomerName: "",
      editSalesProductName: "",
      editSalesStoreName: "",
    };
  }

  handleDelete = (id) => {
    axios
      .delete(`/api/Sales/${id}`)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggleDeleteSalesModal = (value, id) => {
    this.setState({ deleteSalesModal: value });
    this.setState({ deleteSalesId: id });
  };

  toggleEditSalesModal = (
    value,
    id,
    dateSold,
    customerId,
    productId,
    storeId,
    customerName,
    productName,
    storeName
  ) => {
    this.setState({ editSalesModal: value });
    this.setState({ editSalesId: id });
    this.setState({ editSalesDateSold: dateSold });
    this.setState({ editSalesCustomerId: customerId });
    this.setState({ editSalesProductId: productId });
    this.setState({ editSalesStoreId: storeId });
    this.setState({ editSalesCustomerName: customerName });
    this.setState({ editSalesProductName: productName });
    this.setState({ editSalesStoreName: storeName });
  };

  render() {
    const {
      deleteSalesModal,
      deleteSalesId,
      editSalesModal,
      editSalesId,
      editSalesDateSold,
      editSalesCustomerId,
      editSalesProductId,
      editSalesStoreId,
      editSalesCustomerName,
      editSalesProductName,
      editSalesStoreName
      
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
      const { items, requestSort, sortConfig } = useSortableData(props.sales);
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
                  onClick={() => requestSort("Customer")}
                  className={getClassNamesFor("Customer")}
                >
                  Customer
                </Table.HeaderCell>
                <Table.HeaderCell
                  onClick={() => requestSort("Product")}
                  className={getClassNamesFor("Product")}
                >
                  Product
                </Table.HeaderCell>
                <Table.HeaderCell
                  onClick={() => requestSort("Store")}
                  className={getClassNamesFor("Store")}
                >
                  Store
                </Table.HeaderCell>
                <Table.HeaderCell
                  onClick={() => requestSort("Date Sold")}
                  className={getClassNamesFor("Date Sold")}
                >
                  Date Sold
                </Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {items.map((sales) => (
                <Table.Row key={sales.id}>
                  <Table.Cell>{sales.customer.name}</Table.Cell>
                  <Table.Cell>{sales.product.name}</Table.Cell>
                  <Table.Cell>{sales.store.name}</Table.Cell>
                  <Table.Cell>
                    {new Date(sales.dateSold).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Table.Cell>

                  <Table.Cell>
                    <Button
                      color="yellow"
                      onClick={() =>
                        this.toggleEditSalesModal(
                          true,
                          sales.id,
                          sales.dateSold,
                          sales.customerID,
                          sales.productID,
                          sales.storeID,
                          sales.customer.name,
                          sales.product.name,
                          sales.store.name
                        )
                      }
                    >
                      EDIT
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      color="red"
                      onClick={() => this.toggleDeleteSalesModal(true, sales.id)}
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
        <DisplayTable sales={this.props.posts} />
        <DeleteSales
          open={deleteSalesModal}
          id={deleteSalesId}
          toggleDeleteSalesModal={this.toggleDeleteSalesModal}
          fetchSales={this.props.fetchSales}
        />
        <EditSales
          open={editSalesModal}
          editSalesId={editSalesId}
          editSalesDateSold={editSalesDateSold}
          editSalesCustomerId={editSalesCustomerId}
          editSalesProductId={editSalesProductId}
          editSalesStoreId={editSalesStoreId}
          editSalesCustomerName={editSalesCustomerName}
          editSalesProductName={editSalesProductName}
          editSalesStoreName={editSalesStoreName}
          toggleEditSalesModal={this.toggleEditSalesModal}
          fetchSales={this.props.fetchSales}
        />
      </div>
    );
  }
}
