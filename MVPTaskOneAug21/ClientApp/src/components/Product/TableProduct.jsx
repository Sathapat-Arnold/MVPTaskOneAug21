import _ from "lodash";
import React, { Component } from "react";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";
import { Table, Button } from "semantic-ui-react";
import axios from "axios";
import '../../custom.css';

export default class TableProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteProductModal: false,
      deleteProductId: null,
      editProductModal: false,
      editProductId: null,
      editProductName: "",
      editProductPrice: "",
    };
  }

 
  handleDelete = (id) => {
    axios
      .delete(`/api/Product/${id}`)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggleDeleteProductModal = (value, id) => {
    this.setState({ deleteProductModal: value });
    this.setState({ deleteProductId: id });
  };

  toggleEditProductModal = (value, id, name, price) => {
    this.setState({ editProductModal: value });
    this.setState({ editProductId: id });
    this.setState({ editProductName: name });
    this.setState({ editProductPrice: price });
  };

  render() {
    const {
      deleteProductModal,
      deleteProductId,
      editProductModal,
      editProductId,
      editProductName,
      editProductPrice,
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
        props.products
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
                  onClick={() => requestSort("price")}
                  className={getClassNamesFor("price")}
                >
                  Price
                </Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {items.map((product) => (
                <Table.Row key={product.id}>
                  <Table.Cell>{product.name}</Table.Cell>
                  <Table.Cell>${product.price}</Table.Cell>
                  <Table.Cell>
                    <Button
                      className="delete-button"
                      color="yellow"
                      onClick={() =>
                        this.toggleEditProductModal(
                          true,
                          product.id,
                          product.name,
                          product.price
                        )
                      }
                    >
                      EDIT
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      className="delete-button"
                      color="red"
                      onClick={() =>
                        this.toggleDeleteProductModal(true, product.id)
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
        <DisplayTable products={this.props.posts} />
        <DeleteProduct
          open={deleteProductModal}
          id={deleteProductId}
          toggleDeleteProductModal={this.toggleDeleteProductModal}
          fetchProduct={this.props.fetchProduct}
        />
        <EditProduct
          open={editProductModal}
          id={editProductId}
          name={editProductName}
          price={editProductPrice}
          toggleEditProductModal={this.toggleEditProductModal}
          fetchProduct={this.props.fetchProduct}
        />
      </div>
    );
  }
}
