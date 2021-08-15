import React, { Component } from "react";
import TableSales from "./TableSales";
import CreateSales from "./CreateSales";
import SalesPagination from "./SalesPagination";
import SalesRowOptionsDropDown from "./SalesRowOptionsDropDown";
import axios from "axios";
import { Button } from "semantic-ui-react";
import "../../custom.css";

export class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: [],
      createSalesModal: false,
      currentPage: 1,
      postsPerPage: 5,
      customer: [],
      product: [],
      store: []
    };
  }

  fetchSales = () => {
    axios
      .get("/api/Sales")
      .then(({ data }) => {
        console.log(data);
        this.setState({
          sales: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchCustomer = () => {
    axios
      .get("/api/Customer")
      .then(({ data }) => {
        const c = data.map((customer) => {
          return {
            key: customer.id,
            text: customer.name,
            value: customer.id
          }
        })
        console.log(data);
        this.setState({
          customer: c,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchProduct = () => {
    axios
      .get("/api/Product")
      .then(({ data }) => {
        const p = data.map((product) => {
          return {
            key: product.id,
            text: product.name,
            value: product.id
          }
        })
        console.log(data);
        this.setState({
          product: p,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchStore = () => {
    axios
      .get("/api/Store")
      .then(({ data }) => {
        const s = data.map((store) => {
          return {
            key: store.id,
            text: store.name,
            value: store.id
          }
        })
        console.log(data);
        this.setState({
          store: s,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    console.log("Component Did mount");
    this.fetchSales();
    this.fetchCustomer();
    this.fetchProduct();
    this.fetchStore();
  }

  componentDidUpdate() {
    console.log("Component Did Update");
  }

  componentWillUnmount() {
    console.log("Component Will Unmount");
  }

  toggleCreateSalesModal = (value) => {
    this.setState({ createSalesModal: value });
  };

  handleRowOptionsDropDown = (value) => {
    this.setState({ postsPerPage: value });
  };

  render() {
    const { sales, createSalesModal, currentPage, postsPerPage } =
      this.state;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = sales.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

    return (
      <div>
        <CreateSales
          open={createSalesModal}
          toggleCreateSalesModal={this.toggleCreateSalesModal}
          fetchSales={this.fetchSales}
          customer={this.state.customer}
          product={this.state.product}
          store={this.state.store}
        />

        <h1>Sales</h1>

        <Button
          className="create-button"
          primary
          onClick={() => this.toggleCreateSalesModal(true)}
        >
          Create Sales
        </Button>

        <TableSales
          salesData={sales}
          posts={currentPosts}
          fetchSales={this.fetchSales}
        />

        <SalesPagination
          postsPerPage={postsPerPage}
          totalPosts={sales.length}
          paginate={paginate}
        />

        <SalesRowOptionsDropDown
          handleRowOptionsDropDown={this.handleRowOptionsDropDown}
          fetchSales={this.fetchSales}
        />
      </div>
    );
  }
}
